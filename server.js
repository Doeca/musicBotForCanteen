/*
server part: to show the front page.
*/
const express = require('express');
const app = express()


app.use('/', express.static('newfront'));

function server(p_handle) {
    let handle = p_handle;

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
            res.send(handle.setMusicStatus(req.query.id)) //设置歌曲为播放完的
        })

        app.get("/loadError", (req, res) => {
            res.send(handle.notifyError(req.query.uin, req.query.id));
        })

        app.get("/reconnect", (req, res) => {
            res.send(handle.reconnectws())
        })
    }

    this.stop = function() {
        server.stop();
    }

}

module.exports = server;