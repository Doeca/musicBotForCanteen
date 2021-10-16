/*
server part: to show the front page.
*/

const http = require('http');
const fs = require("fs")


function server() {
    this.start = function() {
        http.createServer(function(req, res) {
            //res.writeHead(200, { 'Content-Type': 'html' })
            if (req.url == '/') {
                res.end(fs.readFileSync('./front/index.html'));
            }
        }).listen(8080);
        console.log('Server running at http://127.0.0.1:8080/');
    }


    this.stop = function() {
        http.stop();
    }

}

module.exports = server;