const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8080;

const server = http.createServer((req, res) => {
  const baseDir = __dirname; // 02Server folder

  // Clean and normalize the URL
  let requestedPath = decodeURI(req.url);

  // Remove /02Server prefix if present
  if (requestedPath.startsWith("/02Server")) {
    requestedPath = requestedPath.replace("/02Server", "") || "/";
  }

  if (requestedPath === "/") {
    requestedPath = "/index.html"; // Default to index.html
  }

  const filePath = path.join(baseDir, requestedPath);
  const extname = path.extname(filePath).toLowerCase();

  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404: File Not Found</h1>");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "ut-f8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
