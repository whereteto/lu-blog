const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Only allow GET requests for security
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Method Not Allowed');
        return;
    }

    // Prevent Directory Traversal attacks
    let safeUrl = req.url === '/' ? 'web/dark.html' : req.url;
    safeUrl = safeUrl.split('?')[0].split('#')[0];

    let filePath = path.normalize(path.join(__dirname, safeUrl));
    if (!filePath.startsWith(path.normalize(__dirname))) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // Si el archivo no existe, probar en el directorio web/ para archivos HTML
            if (path.extname(safeUrl) === '.html') {
                const webPath = path.join(__dirname, 'web', safeUrl);
                fs.stat(webPath, (errWeb, statsWeb) => {
                    if (!errWeb && statsWeb.isFile()) {
                        filePath = webPath;
                        sendFile(filePath, res);
                        return;
                    }
                    // Si no está en web/, probar con 404.html
                    filePath = path.join(__dirname, '404.html');
                    fs.stat(filePath, (err404, stats404) => {
                        if (err404 || !stats404.isFile()) {
                            filePath = path.join(__dirname, 'web', '404.html');
                            fs.stat(filePath, (err404Web, stats404Web) => {
                                if (err404Web || !stats404Web.isFile()) {
                                    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                                    res.end('404 Not Found');
                                    return;
                                }
                                sendFile(filePath, res);
                            });
                            return;
                        }
                        sendFile(filePath, res);
                    });
                });
                return;
            }
            // Para archivos no HTML, usar el 404.html estándar
            filePath = path.join(__dirname, '404.html');
            fs.stat(filePath, (err404, stats404) => {
                if (err404 || !stats404.isFile()) {
                    filePath = path.join(__dirname, 'web', '404.html');
                    fs.stat(filePath, (err404Web, stats404Web) => {
                        if (err404Web || !stats404Web.isFile()) {
                            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                            res.end('404 Not Found');
                            return;
                        }
                        sendFile(filePath, res);
                    });
                    return;
                }
                sendFile(filePath, res);
            });
        } else {
            sendFile(filePath, res);
        }
    });
});

function sendFile(filePath, res) {
    const extname = path.extname(filePath).toLowerCase();
    let contentType = 'text/plain; charset=utf-8';

    switch (extname) {
        case '.html':
            contentType = 'text/html; charset=utf-8';
            break;
        case '.css':
            contentType = 'text/css; charset=utf-8';
            break;
        case '.js':
            contentType = 'application/javascript; charset=utf-8';
            break;
        case '.json':
            contentType = 'application/json; charset=utf-8';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

server.listen(8300, () => {
    console.log('Servidor corriendo en el puerto 8300');
});
