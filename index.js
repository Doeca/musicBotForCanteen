const websocketClient = require('websocket').client
const server = require('./server')
const Handle = require('./handle')
const miraiApi = require('./miraiApi')
const url = "ws://127.0.0.1:23663/"

// initialize server
let frontServer = new server()
frontServer.start()
    // Basic connection
console.log("Connecting")
let ws = new websocketClient()


ws.on('connect', (client) => {
    // initialize api module
    let api = new miraiApi(client)
    let handle = new Handle(0, 0, 0)
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
                    let ret = handle.orderMusic(inf.sender.user_id, inf.message)
                    if (ret != '') api.sendPrivateMsg(inf.sender.user_id, ret)
                    break;
                default:
                    console.log(`unrecognized type : ${inf.message_type}`)
            }
        }


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