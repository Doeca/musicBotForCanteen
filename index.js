const websocketClient = require('websocket').client
const url = "ws://127.0.0.1:23663/"

console.log("Connecting")
    // Basic connection
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

                default:
                    console.log(`unrecognized type : ${inf.message_type}`)
            }
        }

    })

})

ws.connect(url)