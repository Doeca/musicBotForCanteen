const websocketClient = require('websocket').client
const server = require('./server')
const miraiApi = require('./miraiApi')
const url = "ws://127.0.0.1:23663/"
const handle = new(require('./handle'))()
const cron = require('node-cron')
const fs = require('fs')

// initialize server
let frontServer = new server(handle)
frontServer.start()
    // Basic connection
console.log("Connecting")
let ws = new websocketClient()


ws.on('connect', (client) => {
    // initialize api module
    let api = new miraiApi(client);

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

    handle.setApiAddress(api);
    console.log("WebSocket Client Connected");

    client.on('message', (msg) => {
        let inf = JSON.parse(msg.utf8Data);
        if (inf.post_type == 'meta_event')
            return;
        console.log(msg.utf8Data)

        // Router Part
        if (inf.post_type == 'message') {
            //console.log(inf.message.replace(/\&#44;/g, ","))
            switch (inf.message_type) {
                case 'private':
                    handle.administrator(inf.sender.user_id, inf.message)

                    let ret = handle.orderMusic(inf.sender.user_id, inf.message);
                    ret.then(msg => {
                        if (msg != '') api.sendPrivateMsg(inf.sender.user_id, msg);
                    }).catch(() => {
                        api.sendPrivateMsg(inf.sender.user_id, '点歌失败');
                    });


                    break;
                default:
                    console.log(`unrecognized type : ${inf.message_type}`)
            }
        }

        //处理加好友请求
        if (inf.post_type == "request") {
            switch (inf.request_type) {
                case 'friend':
                    api.setFriendAddRequest(inf.flag, true, '')
                    break;
                default:
                    console.log(`unrecognized request : ${inf.message_type}`)
            }
        }

    })

})

ws.connect(url)


cron.schedule("* * 9,15 * * *", () => {
    handle.switchType(true);
    fs.rmSync('./cache/musicLists.json');
    fs.rmSync('./cache/usersLists.json');
})
cron.schedule("* * 13,19 * * *", () => {
    handle.switchType(false);
})