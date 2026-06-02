import http.server
import socketserver
import os
import urllib.request
import threading
import time

PORT = 3000
DIRECTORY = "/home/z/my-project/out"

os.chdir(DIRECTORY)

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Remove query string
        path = self.path.split('?')[0]
        
        # Try to serve the exact file first
        if path == '/':
            self.path = '/index.html'
        elif not os.path.exists(DIRECTORY + path):
            # SPA fallback: serve index.html for unknown routes
            self.path = '/index.html'
        
        return super().do_GET()
    
    def log_message(self, format, *args):
        pass  # Suppress logging

# Allow port reuse
socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("0.0.0.0", PORT), SPAHandler) as httpd:
    print(f"Server running on http://0.0.0.0:{PORT}", flush=True)
    
    # Keepalive: self-request every 3 seconds
    def keepalive():
        while True:
            try:
                req = urllib.request.urlopen(f"http://127.0.0.1:{PORT}/", timeout=3)
                req.close()
            except:
                pass
            time.sleep(3)
    
    ka_thread = threading.Thread(target=keepalive, daemon=True)
    ka_thread.start()
    
    httpd.serve_forever()
