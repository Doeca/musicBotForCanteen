const m163 = [
    /https:\/\/y\.music\.163\.com\/m\/song\?id=([0-9]{1,10})/g,
    /http:\/\/music.163.com\/song\?id=([0-9]{1,})/g
]

const mqq = [
    /https:\/\/i.y.qq.com\/n2\/m\/musiclite\/playsong\/index.html\?app_type=.*songmid=([0-9a-zA-z]{1,})/g,
    /http:\/\/c6.y.qq.com\/rsc\/fcgi-bin\/fcg_pyq_play\.fcg\?songid.*songmid=([0-9a-zA-Z]{1,})/g,
    /https:\/\/i.y.qq.com\/v8\/playsong.html\?platform.*songmid=([a-zA-Z0-9]{1,})/g
]

const lock = new(require('async-lock'))()
const axios = require("axios").default
const fs = require('fs')
const key = fs.readFileSync("./cache/.key")
const targetVotes = 7;
const qqType = 1;


function handle() {
    var canOrder = false,
        maxAmount = 40,
        personalMax = 1,
        g_gc, api, reconnect;
    var currentSong = 0;
    let musicLists = Array()
    let usersLists = Array()
    let operations = Array()
    let currentVotes = Array();


    async function getSongTitle(id, type) {

        let url = "https://api.i-meto.com/meting/api?server=" + (type == 1 ? 'netease' : "tencent") + "&type=song&id=" + id + "&r=" + Math.random();
        let val;
        await axios.get(url).then(res => {
            //console.log("url", url);
            //console.log("res", res);
            val = res.data
        });
        console.log("getSongTitle:", id, type, val);
        if (val.length == 0) return "";
        else return val[0].title + " - " + val[0].author;
    }

    function matchMsg(msg) {
        let res;
        //网易云判断
        for (let i = 0; i < m163.length; i++) {
            if ((res = m163[i].exec(msg)) !== null) {

                m163[i].lastIndex = 0;
                return { type: 1, id: res[1].toString(), title: "" }
            }
        }
        //QQ音乐判断
        for (let i = 0; i < mqq.length; i++) {
            if ((res = mqq[i].exec(msg)) !== null) {

                mqq[i].lastIndex = 0;
                return { type: 2, id: res[1].toString(), title: "" }
            }
        }
        //暂不支持的平台
        if (msg.indexOf("[CQ:json,data=") != -1 && msg.indexOf("音乐") != -1) {
            return 1; //告知不支持的平台信息而不是不响应
        } else {
            return null;
        }
    }

    function getUser(uin) {
        let i = usersLists.findIndex(obj => obj.uin == uin);
        if (i == -1) {
            lock.acquire("user", (realease) => {
                usersLists.push({ 'uin': uin, 'num': 0 });
                i = usersLists.length - 1;
                realease("[1]no error", "ok");
            }, (err, ret) => {}, null)
        };
        return usersLists[i];
    }

    function getMusic(id) {

        let i = musicLists.findIndex(obj => obj.id == id);
        if (i == -1) return;
        return musicLists[i];
    }

    this.setFuncAddress = (fun1, fun2, gc) => {
        reconnect = fun1;
        api = fun2;
        g_gc = gc;
    }

    this.reconnectws = () => {
        return reconnect();
    }

    this.switchType = (whether) => {
        canOrder = whether;
        console.log("[Status] Type switched to be" + canOrder);
        if (canOrder) {
            currentSong = 0;
            musicLists.length = 0;
            usersLists.length = 0;
        }
    }

    this.orderMusic = async(uin, msg, ignore) => {

        // judge if there is music url existing
        let music = matchMsg(msg);
        if (music == null) return '';
        // judge if it is ordering time
        if (!canOrder) {
            return '当前时段不可点歌哦😯';
        } else if (musicLists.length >= maxAmount) {
            return '当前时段点歌数量已达上限🥲';
        }
        if (music === 1) return '🥲暂时不支持该平台';
        // judge if the user is in the offical group and if the user order the excessive music.
        if (!ignore) {
            let memInf = await api.getGroupMemberInfo(g_gc, uin);
            if (memInf.data == null) return '不在群里无法点歌';
        }
        let user = getUser(uin);
        if (user.num >= personalMax) return `😗每时段内每人仅可点${personalMax}首歌哦！`;
        user.num += 1;

        //check the qq status
        if (qqType != 1 && music.type == 2)
            return '🥲QQ音乐目前故障中，请稍后再试';
        // add the music to the list
        let title = await getSongTitle(music.id, music.type);
        if (title == "") throw ("未找到该歌曲信息（可能是VIP歌曲）");

        music.title = title;
        let id;
        lock.acquire("music", (realease) => {
            id = musicLists.length + 1;
            musicLists.push({ 'id': id, 'music': music, 'uin': uin, 'fetched': false, 'played': false });
            try { fs.writeFileSync("./cache/musicLists.json", JSON.stringify(musicLists)); } catch (e) {}
            realease("[2]no error", 0)
        }, (err, ret) => {}, null)
        lock.acquire("user", (realease) => {
            try { fs.writeFileSync("./cache/usersLists.json", JSON.stringify(usersLists)); } catch (e) {}
            realease("[3]no error", 0)
        }, (err, ret) => {}, null)
        if (!ignore) api.sendGroupMsg(g_gc, `[CQ:at,qq=${uin}] 🎶点歌成功，No.${id}:【${music.title}】`);
        return `🎶点歌成功，点歌序号：${id}`;
    }

    this.getMusicList = (erase = false, onlyNew = true, pk) => {
        //获取所有歌 或 获取没有播放的歌
        //console.log(musicLists);
        if (pk != key) return;
        return musicLists;
    }

    this.setMusicStatus = (id) => {
        if (id < 1) return 'error';
        //set last music's played propety to be true
        //mark the current music
        currentSong = id;
        if (currentSong > 1) {
            getMusic(currentSong - 1).played = true;
        }
        // erase the votes array
        lock.acquire("votes", (done) => {
            currentVotes.length = 0;
            done("no error", 0)
        }, (res, ret) => {}, null)

        api.sendGroupMsg(g_gc, `🅿️正在播放第${id}首歌：` + getMusic(currentSong).music.title);
    }

    this.notifyError = (uin, id) => {
        api.sendPrivateMsg(uin, `😥抱歉，您点的歌曲【` + getMusic(id).music.title + `】加载失败，可稍后重新点歌`);
        api.sendGroupMsg(g_gc, `[CQ:at,qq=${uin}] 😥抱歉，您点的歌曲【` + getMusic(id).music.title + `】加载失败，可稍后重新点歌`);
        getUser(uin).num -= 1;
        return '200';
    }

    this.getOperations = (pk) => {
        if (pk != key) return;
        let ret;
        lock.acquire("operations", (done) => {
            ret = JSON.stringify(operations);
            operations.length = 0;
            done("[operations]no error", 0);
        }, (err, ret) => {}, null);
        return ret;
    }

    this.interaction = (uin, msg) => {
        //与群里的交互
        if (uin == 1124468334 || uin == 710813324) {
            switch (msg) {
                case `/st_order`:
                    if (canOrder) return 'Fail';
                    this.switchType(true);
                    try {
                        musicLists = JSON.parse(fs.readFileSync("./cache/musicLists.json"));
                        usersLists = JSON.parse(fs.readFileSync("./cache/usersLists.json"));
                    } catch (e) {
                        console.log(e);
                    }
                    return '♻️点歌状态切换为开启';
                case `/shut_order`:
                    this.switchType(false);
                    return '🆗点歌状态切换为关闭';
                case `/load`:
                    lock.acquire("operations", (done) => {
                        operations.push({ type: "load" });
                        done("[load]]no error", 0);
                    }, (err, ret) => {}, null);
                    return '✅加载历史歌曲';
                case `/play`:
                    lock.acquire("operations", (done) => {
                        operations.push({ type: "play" });
                        done("[play]no error", 0);
                    }, (err, ret) => {}, null);
                    return '✅播放歌曲';
                case `/pause`:
                    lock.acquire("operations", (done) => {
                        operations.push({ type: "pause" });
                        done("[pause]no error", 0);
                    }, (err, ret) => {}, null);
                    return '✅停止播放';
                case `/toggle`:
                    lock.acquire("operations", (done) => {
                        operations.push({ type: "toggle" });
                        done("[toggle]no error", 0);
                    }, (err, ret) => {}, null);
                    return '✅切换播放状态';
                case `/next`:
                    lock.acquire("operations", (done) => {
                        operations.push({ type: "next" });
                        done("[next]no error", 0);
                    }, (err, ret) => {}, null);
                    return '✅切换至下一首歌';
                case `/last`:
                    lock.acquire("operations", (done) => {
                        operations.push({ type: "last" });
                        done("[last]no error", 0);
                    }, (err, ret) => {}, null);

                    return '✅切换至上一首歌';
                case `/black`:
                    break;
                default:

            }

            if (msg.indexOf("/switch") == 0) {
                let id = msg.replace("/switch", "");
                lock.acquire("operations", (done) => {
                    operations.push({ type: "switch", para: id });
                    done("no error", 0);
                }, (err, ret) => {}, null);
                return '✅切换至第' + id + "首歌";
            }

            if (msg.indexOf("/volume") == 0) {
                let id = msg.replace("/volume", "");
                lock.acquire("operations", (done) => {
                    operations.push({ type: "volume", para: id });
                    done("no error", 0);
                }, (err, ret) => {}, null);
                return '✅音量调整为' + id + "%";
            }

        }

        switch (msg) {
            case '当前歌曲':
                if (currentSong == 0) return '👁‍🗨当前没有在播放歌曲';
                return "🅿️当前歌曲【" + getMusic(currentSong).music.title + "】";
            case '歌曲列表':
                if (musicLists.length == 0) return '😗当前歌曲列表为🈳️';
                let res = '🗒歌曲列表（🅿️正在播放）：';
                lock.acquire("music", (realease) => {
                    musicLists.forEach((val, i) => {
                        res += "\n";
                        if (val.played) res += '✅';
                        else if (val.id == currentSong) res += '🅿️';
                        else res += '💮'
                        res += `No.${val.id} ${val.music.title}`;
                    });
                    realease("[4]no error", 0)
                }, (err, ret) => {}, null)
                return res;
            case '正在播放':
                if (currentSong == 0) return '👁‍🗨当前没有在播放歌曲';
                return "🅿️当前歌曲【" + getMusic(currentSong).music.title + "】";
        }

        let response;
        if ((msg.indexOf("[CQ:at,qq=1687708097]") != -1 && msg.indexOf("切歌") != -1) || msg == `/vote`) {
            if (currentSong == 0) return `[CQ:at,qq=${uin}] 👁‍🗨当前没有在播放歌曲`;
            lock.acquire("votes", (done) => {
                for (i = 0; i < currentVotes.length; i++) {
                    if (currentVotes[i].uin == uin) {
                        done(`[CQ:at,qq=${uin}] 💬你已经投过票了`, 0);
                        return;
                    }
                }

                currentVotes.push({ 'uin': uin });
                if (currentVotes.length >= targetVotes) {
                    done(`[CQ:at,qq=${uin}] 💫已达到${targetVotes}票，进行切歌`, 1)
                } else {
                    done(`[CQ:at,qq=${uin}] ☄️投票成功，当前：${currentVotes.length}/${targetVotes}`, 0)
                }
            }, (res, ret) => {
                response = res;
                if (ret == 1) {
                    lock.acquire("operations", (done) => {
                        operations.push({ type: "next" });
                        done("[next]no error", 0);
                    }, (err, ret) => {}, null);
                }
            })
        }

        return response;
    }

    this.notifyLoginError = () => {
        api.sendPrivateMsg(1124468334, `😥网易云登陆失败，请手动处理！`);
        return '200';
    }


    this.notifyQQStatus = (status) => {
        qqType = status;
        if (qqType != 1)
            api.sendGroupMsg(g_gc, `🤥(悲)QQ音乐目前处于故障状态，请大家使用网易云点歌`);
        else
            api.sendGroupMsg(g_gc, `🫣(乐)QQ音乐已恢复正常`);
        return '200';
    }
}


module.exports = handle;


//点歌人、点歌次数、点歌时间区间、点歌数量上限
//可以刷新状态（how？定时刷新？命令刷新？）