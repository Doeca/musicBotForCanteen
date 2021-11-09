const m163 = new RegExp('http(s|):\/\/.*music.163.com\/.*id=([0-9]{1,})');
const mqq = new RegExp('http(s|):\/\/.*qq.com\/v.*songmid=([0-9a-zA-Z]{1,})');



function handle() {
    var endTime, maxAmount, personalMax; //结束点歌时间，歌单数量上限，个人点歌数量上限
    const musicLists = Array()
    const usersLists = Array()

    this.updateSetting = (p_endTime, p_max, p_personalMax) => {
        endTime = p_endTime, maxAmount = p_max, personalMax = p_personalMax, musicLists = Array(), usersLists = Array()
    }


    this.administrator = (uin, msg) => {
        if (uin != 1124468334) return;
        if (msg == 'print') this.getMusicList();
    }

    this.orderMusic = (uin, msg) => {

        let music = matchMsg(msg);
        if (music == null) return '';
        if (new Date().getTime() > endTime) {
            return '当前时段不可点歌哦😯';
        } else if (musicLists.length > maxAmount) {
            return '当前时段点歌数量已达上限🧎‍♂️';
        }

        let i = usersLists.findIndex(obj => obj.uin == uin);
        if (i == -1) usersLists.push({ 'uin': uin, 'num': 0 }), i = usersLists.length - 1;
        if (usersLists[i].num >= 3) return '每时段内每人仅可点三首歌哦！';

        usersLists[i].num += 1;
        let id = musicLists.length + 1;
        musicLists.push({ 'id': id, 'music': music, 'uin': uin, 'fetched': false, 'played': false })

        return `点歌成功，点歌序号：${id}`;
    }

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

    this.getMusicList = (erase = false, onlyNew = true) => {
        //获取所有歌 或 获取没有播放的歌
        console.log(musicLists);
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

    this.setMusicStatus = (id = 1) => {
        let i = musicLists.findIndex(obj => obj.id == id);
        musicLists[i].played = true;
    }

}


module.exports = handle;


//点歌人、点歌次数、点歌时间区间、点歌数量上限
//可以刷新状态（how？定时刷新？命令刷新？）