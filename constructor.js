const json2str = (obj) => JSON.stringify(obj);



function miraiApi(client) {
    let cl = client

    this.sendPrivateMsg = (uin, group_id = 0, msg) => {
        cl.send(json2str({
            "action": "send_private_msg",
            "params": {
                "user_id": uin,
                "group_id": group_id,
                "message": msg
            }
        }))
    }

    this.sendGroupMsg = (uin, group_id, msg) => {
        cl.send(json2str({
            "action": "send_group_msg",
            "params": {
                "group_id": group_id,
                "message": msg
            }
        }))
    }
}

module.exports = miraiApi


/*



*/