const http = require('http');
const fs = require('fs');
const path = require('path');

// force port 3000 only
const port = 3000;
// resolve publicDir to absolute path
const publicDir = path.resolve(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  try {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    let reqPath = req.url.split('?')[0] || '/';
    if (reqPath === '/') reqPath = '/index.html';
    const safePath = path.normalize(decodeURI(reqPath)).replace(/^(\.\.[/\\])+/, '');
    const filePath = path.resolve(publicDir, '.' + path.sep + safePath);
    console.log('Resolved filePath:', filePath);
    console.log('Public dir:', publicDir);

    // safer startsWith check using resolved paths
    if (!filePath.startsWith(publicDir + path.sep) && filePath !== publicDir) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    if (!fs.existsSync(publicDir)) {
      try { fs.mkdirSync(publicDir, { recursive: true }); }
      catch (e) { /* ignore mkdir errors, will handle below */ }
    }

    // Helper to serve a file synchronously (used for fallbacks)
    function serveFileIfExistsSync(p) {
      try {
        const s = fs.statSync(p);
        if (s.isFile()) {
          const ext = path.extname(p).toLowerCase();
          const type = mimeTypes[ext] || 'application/octet-stream';
          res.writeHead(200, { 'Content-Type': type });
          fs.createReadStream(p).pipe(res);
          return true;
        }
      } catch (e) { /* not found */ }
      return false;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // Try fallbacks: public/index.html then project root index.html
        const fallback1 = path.join(publicDir, 'index.html');
        const fallback2 = path.join(__dirname, 'index.html');
        if (serveFileIfExistsSync(fallback1)) { return; }
        if (serveFileIfExistsSync(fallback2)) { return; }

        // When file is missing, return an informative HTML page and list public/ contents
        fs.readdir(publicDir, (readdirErr, files) => {
          const safeReq = reqPath.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const listing = (files || []).map(f => `<li>${f}</li>`).join('') || '<li>(empty)</li>';
          const attempted = filePath.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>File not found</title></head>
<body>
  <h1>Not found: ${safeReq}</h1>
  <p>Attempted absolute path: <pre>${attempted}</pre></p>
  <p>Place your index.html and assets in the <code>public</code> folder:</p>
  <pre>${publicDir}</pre>
  <p>Files currently in <code>public/</code>:</p>
  <ul>${listing}</ul>
  <hr>
  <p>Open: <a href="http://localhost:3000">http://localhost:3000</a></p>
</body>
</html>`;
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(html);
        });
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      const type = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': type });
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (e) {
    console.error('Server error', e);
    res.writeHead(500);
    res.end('Server error');
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the other process or pick a different port.`);
  } else {
    console.error('Server error on listen:', err);
  }
  process.exitCode = 1;
});

process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason);
});

// log filename at startup to help troubleshoot if npm cannot run this file name
console.log('Server script running as file:', __filename);

server.listen(port, () => {
  // list contents at startup to help debug missing index.html
  let list = '(empty)';
  try { list = fs.readdirSync(publicDir).join(', ') || '(empty)'; } catch (e) { list = '(missing)'; }
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`public/ contents: ${list}`);
});
