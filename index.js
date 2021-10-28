const websocketClient = require('websocket').client
const server = require('./server')
const miraiApi = require('./constructor')
const url = "ws://127.0.0.1:23663/"

// initialize server
let frontServer = new server()
frontServer.start()


// Basic connection between func and mirai
console.log("Connecting")
let ws = new websocketClient()

ws.on('connect', (client) => {
    // initialize api module
    let api = new miraiApi(client)

    console.log("WebSocket Client Connected");
    client.on('message', (msg) => {
        let inf = JSON.parse(msg.utf8Data);
        if (inf.post_type == 'meta_event')
            return;
        // Debug : print the event
        console.log(msg.utf8Data)

        // Router Part
        if (inf.post_type == 'message') {
            //console.log(inf.message.replace(/\&#44;/g, ","))
            switch (inf.message_type) {
                case 'private':
                    break;
                default:
                    console.log(`unrecognized type : ${inf.message_type}`)
            }
        }

    })

})

ws.connect(url)