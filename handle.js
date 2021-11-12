const m163 = new RegExp('http(s|):\/\/.*music.163.com\/.*id=([0-9]{1,})');
const mqq = new RegExp('http(s|):\/\/.*qq.com\/v.*songmid=([0-9a-zA-Z]{1,})');
const lock = new(require('async-lock'))()
const fs = require('fs')
const g_gc = 191894480;




function handle() {
    var canOrder = false,
        maxAmount = 50,
        personalMax = 3,
        api; //结束点歌时间，歌单数量上限，个人点歌数量上限
    var currentSong, currentSongTitle;
    const musicLists = Array()
    const usersLists = Array()


    function matchMsg(msg) {
        if (m163.test(msg)) {
            let res = m163.exec(msg)
            return { "type": 1, id: res[2].toString() }
        } else if (mqq.test(msg)) {
            let res = mqq.exec(msg)
            return { "type": 2, id: res[2].toString() }
        } else {
            return null;
        }
    }

    function getUser(uin) {
        let i = usersLists.findIndex(obj => obj.uin == uin);
        if (i == -1) {
            lock.acquire("addNewUser", () => {
                usersLists.push({ 'uin': uin, 'num': 0 });
                i = usersLists.length - 1;
            })
        };
        return usersLists[i];
    }

    function getMusic(id) {
        let i = musicLists.findIndex(obj => obj.id == id);
        if (i == -1) return;
        return musicLists[i];
    }


    this.setApiAddress = (p_api) => {
        api = p_api;
    }

    this.switchType = (whether) => {
        canOrder = whether;
        if (canOrder) {
            currentSong = 0;
            musicLists = Array();
            usersLists = Array();

        }
    }


    this.administrator = (uin, msg) => {
        if (uin != 1124468334) return;
        if (msg == 'print') this.getMusicList();
    }

    this.orderMusic = async(uin, msg) => {

        // judge if there is music url existing
        let music = matchMsg(msg);
        if (music == null) return '';
        // judge if it is ordering time
        if (canOrder) {
            return '当前时段不可点歌哦😯';
        } else if (musicLists.length > maxAmount) {
            return '当前时段点歌数量已达上限🧎‍♂️';
        }

        // judge if the user is in the offical group and if the user order the excessive music.
        let memInf = await api.getGroupMemberInfo(g_gc, uin);
        console.log('meminf', memInf);
        if (memInf.data == null) return '不在群里无法点歌';
        let user = getUser(uin);
        if (user.num >= personalMax) return `每时段内每人仅可点${personalMax}首歌哦！`;
        user.num += 1;

        // add the music to the list
        if (musicLists.length > maxAmount) return '当前时段点歌数量已达上限';
        lock.acquire("addNewMusic", () => {
            let id = musicLists.length + 1;
            musicLists.push({ 'id': id, 'music': music, 'uin': uin, 'fetched': false, 'played': false })
            fs.writeFileSync("./cache/musicLists.json", JSON.stringify(musicLists));
        })
        lock.acquire("addNewUser", () => {
            fs.writeFileSync("./cache/usersLists.json", JSON.stringify(usersLists));
        })
        return `点歌成功，点歌序号：${id}`;
    }

    this.getMusicList = (erase = false, onlyNew = true) => {
        //获取所有歌 或 获取没有播放的歌
        //console.log(musicLists);
        if (onlyNew) {
            let arr = Array();
            musicLists.forEach((val, index) => {
                if (!val.fetched) {
                    musicLists[index].fetched = true;
                    arr.push(val);
                }
            })
            return JSON.stringify(arr);
        } else {
            return musicLists;
        }

    }

    this.setMusicStatus = (id, title) => {
        if (id < 1) return 'error';
        //set last music's played propety to be true
        //mark the current music
        if (currentSong > 0) {
            getMusic(currentSong).played = true;
        }
        currentSong = id;
        api.sendGroupMsg(g_gc, `正在播放第${id}首歌：${title}`);
    }

    this.notifyError = (uin, title) => {
        api.sendPrivateMsg(uin, `歌曲【${title}】加载失败，可稍后重新点歌`);
        getUser(uin).num -= 1;
    }

    this.interaction = (uin, msg) => {
        if (uin == 1124468334) {
            switch (msg) {
                case `/st_order`:
                    musicLists = JSON.parse(fs.readFileSync("./cache/musicLists.json"));
                    usersLists = JSON.parse(fs.readFileSync("./cache/usersLists.json"));
                    break;
                case `/shut_order`:
                    this.switchType(false);
                    break;

            }
        }

        switch (msg) {
            case '当前歌曲':
                return `当前歌曲【${currentSongTitle}】`;
            case '':

        }
    }
}


module.exports = handle;


//点歌人、点歌次数、点歌时间区间、点歌数量上限
//可以刷新状态（how？定时刷新？命令刷新？）