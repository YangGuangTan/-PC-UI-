const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT_DIR = '/home/z/my-project/out';
const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  
  // Remove trailing slash
  if (urlPath.endsWith('/') && urlPath.length > 1) {
    urlPath = urlPath.slice(0, -1);
  }
  
  // Try exact path first, then .html, then /index.html, then fallback to /index.html
  const tryPaths = [
    path.join(OUT_DIR, urlPath),
    path.join(OUT_DIR, urlPath + '.html'),
    path.join(OUT_DIR, urlPath, 'index.html'),
    path.join(OUT_DIR, 'index.html'),
  ];
  
  for (const filePath of tryPaths) {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      try {
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 
          'Content-Type': contentType,
          'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000',
        });
        res.end(content);
        return;
      } catch (err) {
        continue;
      }
    }
  }
  
  // 404 - serve index.html for SPA routing
  try {
    const content = fs.readFileSync(path.join(OUT_DIR, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running on http://0.0.0.0:${PORT}`);
});
