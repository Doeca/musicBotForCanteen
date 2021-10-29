const m163 = new RegExp('http(s|):\/\/.*music.163.com\/.*id=([0-9]{1,})');
const mqq = new RegExp('http(s|):\/\/.*qq.com\/v.*songmid=([0-9a-zA-Z]{1,})');



function handle(p_endTime, p_max, p_personalMax) {
    var amount = p_endTime // current music amount
    var maxAmount = p_max
    var personalMax = p_personalMax
    const musicLists = Array()
    const usersLists = Array()

    this.updateSetting = (p_endTime, p_max, p_personalMax) => {
        amount = p_endTime, maxAmount = p_max, personalMax = p_personalMax, musicLists = Array(), usersLists = Array()
    }


    this.orderMusic = (uin, msg) => {
        let music = matchMsg(msg);
        if (music == null) return '';
        let i = usersLists.findIndex(obj => obj.uin == uin)
        if (usersLists[i].num >= 3) return '每时段内每人仅可点三首歌哦！';

        usersLists[i].num += 1;
        let id = musicLists.length + 1;
        musicLists.push({ 'id': id, 'music': music, 'uin': uin })

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

    this.getMusicList = () => {
        console.log(musicLists);
    }

}


module.exports = handle;


//点歌人、点歌次数、点歌时间区间、点歌数量上限
//可以刷新状态（how？定时刷新？命令刷新？）