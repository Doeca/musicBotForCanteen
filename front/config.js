let apiUrl = 'https://music.doeca.cc/';
let str = window.location.href;
let key = str.substr(str.indexOf("?") + 1, 12);


docute.init({
    landing: 'landing.html',
    title: '小老虎食堂音乐播放器',
    nav: {},
    plugins: [
        evanyou(),
        player()
    ]
});


function player() {
    return function(context) {
        context.event.on('landing:updated', function() {
            aplayer1();
            loadPlayer();
            setInterval((handler) => {
                loadPlayer()
                console.log('fetch new songs');
            }, 10000);
            setInterval((handler) => {
                operatePlayer()
                console.log('fetch new operations');
            }, 1000);
        });
    };
}


function aplayer1() {
    window.ap1 = new APlayer({
        container: document.getElementById('aplayer1'),
        theme: '#F57F17',
        lrcType: 3,
        loop: 'none',
        order: 'list',
        preload: 'auto',
        audio: []
    });

    window.ap1.on('play', () => {
        let i = window.ap1.list.index;
        let val = window.ap1.list.audios[i];
        console.log(`Now playing : ${i}`, val);
        postInf(`setMusicStatus?id=${val.id}`, "do", "");
    })
}

function postInf(path, type, msg) {
    fetch(apiUrl + path)
}


function loadPlayer(onlyNew) {
    fetch(apiUrl + "getMusicList?key=" + key + "&erase=0").then((res) => {
        if (res.status != 200) {
            alert('获取歌曲列表失败，请重载网页！');
            return;
        }
        let arr = res.json();
        return arr;
    }).then(arr => {
        if (arr == undefined) return;
        let musicList = Array();
        let fetchList = Array(); // for sort
        let jsonList = Array();

        //path : fetch all the song urls and make a promise list to wait for
        //in every promise there is a promise waiting for the json text generated


        arr.forEach((val, index) => {
            let url = '';
            if (val.music.type == 1) {
                url = "https://m163.doeca.cc/song?id=" + val.music.id + "&key=" + key;
            } else if (val.music.type == 2) {
                url = "https://mqq.doeca.cc/song?id=" + val.music.id + "&key=" + key;
            }

            let fetchPromise = fetch(url, {
                mode: "cors"
            });

            fetchPromise.then(resp => {
                let jsonPromise = resp.json();
                jsonPromise.then(inf => {
                    //console.log(val.id, inf);
                    if (inf.length <= 0) {
                        postInf(`loadError?id=${val.id}&uin=${val.uin}`, "error", "song can't load");
                        return;
                    }

                    musicList.push({
                        "name": inf[0].title,
                        "artist": inf[0].author,
                        "url": inf[0].url + "&key=" + key,
                        "cover": inf[0].pic,
                        "lrc": inf[0].lrc + "&key=" + key,
                        "id": val.id
                    })

                });
                jsonList.push(jsonPromise);
            });
            fetchList.push(fetchPromise);
        });

        //fetchList make sure that all the json promise is pushed into jsonList
        //jsonList make sure that all the music is pushed into array
        if (fetchList.length != 0) {
            Promise.all(fetchList).then(arg => {
                if (jsonList.length != 0) {
                    Promise.all(jsonList).then(arg => {
                        musicList.sort((x, y) => {
                            if (x.id < y.id)
                                return -1;
                            else if (x.id > y.id)
                                return 1;
                            else
                                return 0;
                        });

                        musicList.forEach((val, index) => {
                            let res = 0;
                            try {
                                res = window.ap1.list.audios.filter((item) => item.id == val.id).length;
                            } catch (err) {}

                            if (res == 0)
                                window.ap1.list.add(val);
                        })
                    })
                }
            })
        }

    })
}


function operatePlayer() {
    fetch(apiUrl + "getOperations?key=" + key).then((res) => {
        res.json().then((arr) => {
            if (arr == null) return;
            if (arr.length != 0) {
                arr.forEach((v, i) => {
                    if (v.type == 'clear') window.ap1.clear();
                    if (v.type == 'toggle') window.ap1.toggle();
                    if (v.type == 'next') window.ap1.skipForward();
                    if (v.type == 'last') window.ap1.skipBack();
                    if (v.type == 'play') window.ap1.play();
                    if (v.type == 'pause') window.ap1.pause();
                    if (v.type == 'load') loadPlayer();
                    if (v.type == 'switch') window.ap1.list.switch(v.para - 1);
                })
            }
        })
    })
}