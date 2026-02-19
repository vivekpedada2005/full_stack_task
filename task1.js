const http = require("http");
const fs = require("fs");

const PORT = 3000;


function logRequest(method, url) {
    const time = new Date().toISOString();
    const log = `${time} | ${method} | ${url}\n`;
    fs.appendFile("requests.log", log, (err) => {
        if (err) console.error("Error writing log:", err);
    });
}


const server = http.createServer((req, res) => {
    const { method, url } = req;
    logRequest(method, url);
    if (url === "/" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to Home Page");
    } 
    else if (url === "/about" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is About Page");
    } 
    else if (url === "/contact" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is Contact Page");
    } 
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
