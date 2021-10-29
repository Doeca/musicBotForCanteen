const json2str = (obj) => JSON.stringify(obj);



function miraiApi(client) {
    let cl = client

    this.sendPrivateMsg = (uin, msg, group_id = 0) => {
        cl.send(json2str({
            "action": "send_private_msg",
            "params": {
                "user_id": uin,
                "group_id": group_id,
                "message": msg
            }
        }))
    }

    this.sendGroupMsg = (group_id, msg) => {
        cl.send(json2str({
            "action": "send_group_msg",
            "params": {
                "group_id": group_id,
                "message": msg
            }
        }))
    }


    this.setFriendAddRequest = (flag, approve = false, remark) => {
        cl.send(json2str({
            "action": "set_friend_add_request",
            "params": {
                "flag": flag,
                "approve": approve,
                "remark": remark
            }
        }))
    }
}

module.exports = miraiApi


/*



*/