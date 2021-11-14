let apiUrl = 'https://music.doeca.cc/';

docute.init({
    landing: 'landing.html',
    title: '小老虎食堂音乐播放器',
    nav: {},
    plugins: [
        docsearch({
            apiKey: '',
            indexName: 'aplayer',
            url: 'https://aplayer.js.org'
        }),
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
            }, 10000);
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
    fetch(apiUrl + "getMusicList?erase=0&onlyNew=" + (onlyNew === 0 ? 0 : 1)).then((res) => {
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
        arr.forEach((val, index) => {
            let url = "https://api.i-meto.com/meting/api?server=" + (val.music.type == 1 ? 'netease' : "tencent") + "&type=song&id=" + val.music.id + "&r=" + Math.random();
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
                        "url": inf[0].url,
                        "cover": inf[0].pic,
                        "lrc": inf[0].lrc,
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
                            return x.id > y.id;
                        });
                        window.ap1.list.add(musicList);
                        window.ap1.list.show();
                    })
                }
            })
        }

    })
}

//待测试
function operatePlayer() {
    fetch(apiUrl + "getOperations").then((res) => {
        console.log("json:", res.json())
        res.json().then((arr) => {
            if (arr == null) return;
            if (arr.length != 0) {
                arr.forEach((v, i) => {
                    if (v.type == 'toggle') window.ap1.toggle();
                    if (v.type == 'next') window.ap1.skipForward();
                    if (v.type == 'last') window.ap1.skipBack();
                    if (v.type == 'play') window.ap1.play();
                    if (v.type == 'pause') window.ap1.pause();
                    if (v.type == 'switch') window.ap1.list.switch(v.para - 1);
                })
            }
        })
    })
}