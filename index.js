const websocketClient = require('websocket').client
const server = require('./server')
const miraiApi = require('./miraiApi')
const url = "ws://127.0.0.1:23663/"
const handle = new(require('./handle'))()
const cron = require('node-cron')
const fs = require('fs')
const g_gc = parseInt(fs.readFileSync('./cache/.gc'));

// initialize server
let frontServer = new server(handle);
frontServer.start();
// Basic connection
let ws = new websocketClient()
let api;

function reconnect() {
    ws.connect(url);
    return "Over";
}
console.log(`Start connecting with group_id:${g_gc}`)
ws.on('connect', (client) => {
    // initialize api,handle module
    api = new miraiApi(client);
    api.setResCreator((id) => {
        return new Promise((resolve, rej) => {
            setTimeout(() => rej('timeout'), 1000);
            client.on('message', (msg) => {
                let val = JSON.parse(msg.utf8Data);
                if (val.echo == id) {
                    resolve(val);
                }
            })
        })
    })
    handle.setFuncAddress(reconnect, api, g_gc); //将Class句柄传入处理module

    console.log("WebSocket Client Connected");
    client.on('message', (msg) => {
        let inf = JSON.parse(msg.utf8Data);
        if (inf.post_type == 'meta_event')
            return;

        // Router Part
        if (inf.post_type == 'message') {
            inf.message = inf.message.replace(/\\\//g, "/");
            let ret;
            switch (inf.message_type) {
                case 'group':
                    if (inf.group_id != g_gc) return;
                    let res = handle.interaction(inf.sender.user_id, inf.message);
                    if (res != '') {
                        api.sendGroupMsg(g_gc, res);
                    }

                    ret = handle.orderMusic(inf.sender.user_id, inf.message, true);
                    ret.then(msg => {
                        if (msg != '') {
                            api.sendGroupMsg(g_gc, '[CQ:at,qq=' + inf.sender.user_id + '] ' + msg);
                        }
                    }).catch((err) => {
                        handle.getUser(inf.sender.user_id).num -= 1;
                        let msg = `Error caught\nerr:${err}`;
                        api.sendPrivateMsg(1124468334, msg);
                        api.sendGroupMsg(g_gc, '[CQ:at,qq=' + inf.sender.user_id + ']🤒点歌失败，请稍后再试\n失败原因：' + err);
                    });
                    break;
                case 'private':
                    ret = handle.orderMusic(inf.sender.user_id, inf.message, false);
                    ret.then(msg => {
                        if (msg != '') api.sendPrivateMsg(inf.sender.user_id, msg);
                    }).catch((err) => {
                        let msg = `Error caught\nerr:${err}`;
                        handle.getUser(inf.sender.user_id).num -= 1;
                        api.sendPrivateMsg(1124468334, msg);
                        api.sendPrivateMsg(inf.sender.user_id, '🤒点歌失败，请稍后再试\n失败原因：' + err);
                    });

                    if (inf.message.substr(0, 14) == 'heart_checking') {
                        api.sendPrivateMsg(inf.sender.user_id, inf.message);
                    }

                    break;
                default:
                    console.log(`unrecognized type : ${inf.message_type}`)
            }
        }

        //处理加好友请求
        if (inf.post_type == "request") {
            console.log(inf);
            switch (inf.request_type) {
                case 'friend':
                    api.setFriendAddRequest(inf.flag, true, '')
                    break;
                case `group`:
                    if (inf.group_id == g_gc) {
                        api.setGroupAddRequest(inf.flag, 'add', true, '');
                    }
                    break;
                default:
                    console.log(`unrecognized request : ${inf.message_type}`)
            }
        }

    })

})

ws.connect(url)


cron.schedule("0 30 11,17 * * *", () => {
    try {
        handle.switchType(true);
        api.sendGroupMsg(g_gc, "[CQ:at,qq=all]🥰开始点歌啦，分享歌曲到群中即可点歌！\n（支持音源：网易云音乐、QQ音乐，暂不支持会员歌曲）");
        handle.clearList();
        fs.rmSync('./cache/musicLists.json');
        fs.rmSync('./cache/usersLists.json');
    } catch (e) {
        console.log("starting order", e)
    }

})
cron.schedule("0 30 13,19 * * *", () => {
    handle.switchType(false);
})