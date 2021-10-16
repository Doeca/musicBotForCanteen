const websocketClient = require('websocket').client
const server = require('./server')
const url = "ws://127.0.0.1:23663/"

// initialize server
let frontServer = new server()
frontServer.start()


// Basic connection between func and mirai
console.log("Connecting")
let ws = new websocketClient()

ws.on('connect', (client) => {
    console.log("WebSocket Client Connected");

    client.on('message', (msg) => {
        let inf = JSON.parse(msg.utf8Data);
        if (inf.post_type == 'meta_event')
            return;
        // Debug : print the event
        console.log(msg.utf8Data)

        // Router Part
        if (inf.post_type == 'message') {
            switch (inf.message_type) {
                case 'private':
                    if (inf.sender.user_id == 1124468334) {
                        client.send(JSON.stringify({
                            "action": "send_private_msg",
                            "params": {
                                "user_id": inf.sender.user_id,
                                "message": "hello world!"
                            },
                            "echo": "test"
                        }))
                    }

                    return;
                default:
                    console.log(`unrecognized type : ${inf.message_type}`)
            }
        }

    })

})

ws.connect(url)