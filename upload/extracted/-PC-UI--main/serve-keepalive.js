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
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath.endsWith('/') && urlPath.length > 1) urlPath = urlPath.slice(0, -1);

  const tryPaths = [
    path.join(OUT_DIR, urlPath),
    path.join(OUT_DIR, urlPath + '.html'),
    path.join(OUT_DIR, urlPath, 'index.html'),
    path.join(OUT_DIR, 'index.html'),
  ];

  for (const filePath of tryPaths) {
    try {
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 
          'Content-Type': contentType,
          'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000',
        });
        res.end(content);
        return;
      }
    } catch (err) { continue; }
  }

  try {
    const content = fs.readFileSync(path.join(OUT_DIR, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  } catch (err) {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

// Self-ping keepalive every 3 seconds
setInterval(() => {
  const req = http.get(`http://127.0.0.1:${PORT}/`, (res) => {
    res.resume();
  });
  req.on('error', () => {});
  req.setTimeout(2000, () => req.destroy());
}, 3000);
