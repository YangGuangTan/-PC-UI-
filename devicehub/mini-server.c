#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <signal.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <errno.h>

#define PORT 3000
#define DOCROOT "/home/z/my-project/out"
#define BUFSIZE 8192

const char *get_mime(const char *path) {
    const char *ext = strrchr(path, '.');
    if (!ext) return "application/octet-stream";
    if (strcmp(ext, ".html") == 0 || strcmp(ext, ".htm") == 0) return "text/html; charset=utf-8";
    if (strcmp(ext, ".css") == 0) return "text/css; charset=utf-8";
    if (strcmp(ext, ".js") == 0) return "application/javascript; charset=utf-8";
    if (strcmp(ext, ".json") == 0) return "application/json";
    if (strcmp(ext, ".png") == 0) return "image/png";
    if (strcmp(ext, ".jpg") == 0 || strcmp(ext, ".jpeg") == 0) return "image/jpeg";
    if (strcmp(ext, ".svg") == 0) return "image/svg+xml";
    if (strcmp(ext, ".ico") == 0) return "image/x-icon";
    if (strcmp(ext, ".woff2") == 0) return "font/woff2";
    if (strcmp(ext, ".woff") == 0) return "font/woff";
    if (strcmp(ext, ".ttf") == 0) return "font/ttf";
    if (strcmp(ext, ".map") == 0) return "application/json";
    return "application/octet-stream";
}

void send_file(int client_fd, const char *filepath) {
    int fd = open(filepath, O_RDONLY);
    if (fd < 0) {
        const char *resp = "HTTP/1.1 404 Not Found\r\nContent-Length: 9\r\n\r\nNot Found";
        send(client_fd, resp, strlen(resp), 0);
        return;
    }
    
    struct stat st;
    fstat(fd, &st);
    long fsize = st.st_size;
    const char *mime = get_mime(filepath);
    
    char header[512];
    int hlen = snprintf(header, sizeof(header),
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: %s\r\n"
        "Content-Length: %ld\r\n"
        "Cache-Control: no-cache\r\n"
        "Connection: close\r\n\r\n",
        mime, fsize);
    
    send(client_fd, header, hlen, 0);
    
    char buf[BUFSIZE];
    ssize_t n;
    while ((n = read(fd, buf, BUFSIZE)) > 0) {
        send(client_fd, buf, n, 0);
    }
    
    close(fd);
}

int main() {
    signal(SIGPIPE, SIG_IGN);
    
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd < 0) { perror("socket"); return 1; }
    
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    
    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_addr.s_addr = INADDR_ANY,
        .sin_port = htons(PORT)
    };
    
    if (bind(server_fd, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("bind"); return 1;
    }
    
    if (listen(server_fd, 128) < 0) {
        perror("listen"); return 1;
    }
    
    fprintf(stderr, "C server running on port %d\n", PORT);
    
    // Keepalive: self-request thread
    if (fork() == 0) {
        while (1) {
            sleep(3);
            int s = socket(AF_INET, SOCK_STREAM, 0);
            struct sockaddr_in a = {
                .sin_family = AF_INET,
                .sin_addr.s_addr = inet_addr("127.0.0.1"),
                .sin_port = htons(PORT)
            };
            if (connect(s, (struct sockaddr*)&a, sizeof(a)) == 0) {
                const char *req = "GET / HTTP/1.0\r\n\r\n";
                send(s, req, strlen(req), 0);
                char buf[256];
                recv(s, buf, sizeof(buf), 0);
            }
            close(s);
        }
        _exit(0);
    }
    
    while (1) {
        struct sockaddr_in client_addr;
        socklen_t client_len = sizeof(client_addr);
        int client_fd = accept(server_fd, (struct sockaddr*)&client_addr, &client_len);
        if (client_fd < 0) continue;
        
        char buf[BUFSIZE];
        ssize_t n = recv(client_fd, buf, BUFSIZE - 1, 0);
        if (n <= 0) { close(client_fd); continue; }
        buf[n] = '\0';
        
        // Parse method and path
        char method[16], path[1024];
        sscanf(buf, "%s %s", method, path);
        
        // Remove query string
        char *qs = strchr(path, '?');
        if (qs) *qs = '\0';
        
        // Build filepath
        char filepath[2048];
        
        if (strcmp(path, "/") == 0) {
            snprintf(filepath, sizeof(filepath), "%s/index.html", DOCROOT);
            send_file(client_fd, filepath);
        } else {
            // Try exact path
            snprintf(filepath, sizeof(filepath), "%s%s", DOCROOT, path);
            struct stat st;
            if (stat(filepath, &st) == 0 && S_ISREG(st.st_mode)) {
                send_file(client_fd, filepath);
            } else {
                // Try path + .html
                snprintf(filepath, sizeof(filepath), "%s%s.html", DOCROOT, path);
                if (stat(filepath, &st) == 0 && S_ISREG(st.st_mode)) {
                    send_file(client_fd, filepath);
                } else {
                    // Try path/index.html
                    snprintf(filepath, sizeof(filepath), "%s%s/index.html", DOCROOT, path);
                    if (stat(filepath, &st) == 0 && S_ISREG(st.st_mode)) {
                        send_file(client_fd, filepath);
                    } else {
                        // SPA fallback
                        snprintf(filepath, sizeof(filepath), "%s/index.html", DOCROOT);
                        send_file(client_fd, filepath);
                    }
                }
            }
        }
        
        close(client_fd);
    }
    
    return 0;
}
