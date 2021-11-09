/*
server part: to show the front page.
*/
const express = require('express');
const handle = require('./handle');
const app = express()

app.get('/index.html', function(req, res) {
    res.sendFile("./front/index.html");
})
app.get('/', function(req, res) {
    res.sendFile("./front/index.html");
})

function server(p_handle) {
    handle = p_handle;

    this.start = function() {
        var server = app.listen(8080, function() {
            var host = server.address().address
            var port = server.address().port
            console.log("应用实例，访问地址为 http://%s:%s", host, port)
        })

        app.get("/getMusicList", (req, res) => {
            res.send(handle.getMusicList(req.query.erase == 1, req.query.onlyNew == 1)) //获取歌曲列表
        })

        app.get("/setMusicStatus", (req, res) => {

        })
    }

    this.stop = function() {
        server.stop();
    }

}

module.exports = server;