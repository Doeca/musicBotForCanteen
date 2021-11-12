const json2str = (obj) => JSON.stringify(obj);
//const callbackLists = new Map();

function miraiApi(client) {
    let cl = client
    let createCallback;

    this.setResCreator = (address) => {
        createCallback = address;
    }

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

    this.getGroupMemberInfo = (gc, uin) => {
        let id = Math.random();
        //callbackLists.set(id + "data", (msg) => {});
        //callbackLists.set(id + "status", false);
        //callbackLists.
        cl.send(json2str({
            "action": "get_group_member_info",
            "params": {
                "group_id": gc,
                "user_id": uin,
                "no_cache": false
            },
            "echo": id
        }))

        return createCallback(id);

        /*
        while (true) {
            if (callbackLists.get(id + "status") == true) {
                let res = callbackLists.get(id + "data");
                callbackLists.delete(id + "status");
                callbackLists.delete(id + "data");
                return res;
            }
        }
        */

    }
}

module.exports = miraiApi