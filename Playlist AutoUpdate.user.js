// ==UserScript==
// @name Playlist AutoUpdate
// @version 1.0
// @description Auto Update Plug Playlist
// @author Mrcl

// @include https://plug.dj/*
// @include https://*.plug.dj/*
// @exclude https://plug.dj/_/*
// @exclude https://plug.dj/@/*
// @exclude https://plug.dj/ba
// @exclude https://plug.dj/plot
// @exclude https://plug.dj/press
// @exclude https://plug.dj/partners
// @exclude https://plug.dj/team
// @exclude https://plug.dj/about
// @exclude https://plug.dj/jobs
// @exclude https://plug.dj/purchase
// @exclude https://plug.dj/subscribe
// @exclude https://*.plug.dj/_/*
// @exclude https://*.plug.dj/@/*
// @exclude https://*.plug.dj/ba
// @exclude https://*.plug.dj/plot
// @exclude https://*.plug.dj/press
// @exclude https://*.plug.dj/partners
// @exclude https://*.plug.dj/team
// @exclude https://*.plug.dj/about
// @exclude https://*.plug.dj/jobs
// @exclude https://*.plug.dj/purchase
// @exclude https://*.plug.dj/subscribe

// @grant GM_addStyle
// ==/UserScript==

var playlistID = '123456789';
var ytKey = 'XXXXXXXXXXXXXXXXXXXXXX';
var days = 14;

/////////////////////////////////////////////////Channels
//UCe55Gy-hFDvLZp8C8BZhBnw - NightBlue
//UCa10nxShhzNrCE1o2ZOPztg - Trap Nation
//UCJ6td3C9QlPO9O_J5dF4ZzA - Monstercat: Uncaged
//UC7tD6Ifrwbiy-BoaAHEinmQ - Diversity
//UCMOgdURr7d8pOVlc-alkfRg - xKito
//UC_aEa8K-EOJ3D6gOs7HcyNg - NCS
//UCSa8IUd1uEjlREMa21I3ZPQ - CloudKid
//UC3ifTl5zKiCAhHIBQYcaTeg - Proximity
//UCp8OOssjSjGZRVYK6zWbNLg - Monstercat: Instinct
//UCqolymr8zonJzC08v2wXNrQ - Kyra
//UC65afEgL62PGFWXY7n6CUbA - Trap City
//UCwIgPuUJXuf2nY-nKsEvLOg - AirwaveMusicTV
//UCj_Y-xJ2DRDGP4ilfzplCOQ - House Nation
//UCSXm6c-n6lsjtyjvdD0bFVw - Liquicity
//UC5nc_ZtjKW1htCVZVRxlQAQ - MrSuicideSheep
//UCaAlh3Iy7rAcO3MgD_O3Kkg - Nik Cooper
//UC0n9yiP-AD2DpuuYCDwlNxQ - Tasty
var channels = [
    'UCe55Gy-hFDvLZp8C8BZhBnw',
    'UCa10nxShhzNrCE1o2ZOPztg',
    'UCJ6td3C9QlPO9O_J5dF4ZzA',
    'UC7tD6Ifrwbiy-BoaAHEinmQ',
    'UCMOgdURr7d8pOVlc-alkfRg',
    'UC_aEa8K-EOJ3D6gOs7HcyNg',
    'UCSa8IUd1uEjlREMa21I3ZPQ',
    'UC3ifTl5zKiCAhHIBQYcaTeg',
    'UCp8OOssjSjGZRVYK6zWbNLg',
    'UCqolymr8zonJzC08v2wXNrQ',
    'UC65afEgL62PGFWXY7n6CUbA',
    'UCwIgPuUJXuf2nY-nKsEvLOg',
    'UCj_Y-xJ2DRDGP4ilfzplCOQ',
    'UCSXm6c-n6lsjtyjvdD0bFVw',
    'UC5nc_ZtjKW1htCVZVRxlQAQ',
    'UCaAlh3Iy7rAcO3MgD_O3Kkg',
    'UC0n9yiP-AD2DpuuYCDwlNxQ'
];

var countWaits = 0;
var waitsDone = 0;

(function() {
    var loaded = false;

    var a = {
        b: function() {
            if (typeof API !== 'undefined' && API.enabled) {
                this.c();
            }
            else if (!loaded) {
                setTimeout(function() { a.b(); }, 2000);
            }
        },
        c: function() {
            loaded = true;

            var input=document.createElement("input");
            input.type="button";
            input.value="Update Playlist";
            input.onclick = playlistButtonClickAction;
            input.setAttribute ('id', 'myplaylistContainer');
            document.body.appendChild(input);
        }
    };
    a.b();
})();

function playlistButtonClickAction () {
    API.chatLog('Playlist AutoUpdate started!');

    var currentList = [];

    //Get Playlist
    $.ajax({
        type: 'GET',
        url: '/_/playlists/' + playlistID + '/media',
        contentType: 'application/json',
        async: false,
        success: function(playlist){
            forEach(playlist.data, function(index, media) {
                currentList.push(media.id);
            });

            API.chatLog('Playlist Retrieved!');
        },
        error: function(error){
            API.chatLog('Get Playlist Error!');
            console.log(error);
        }
    });

    //Remove Playlist Media
    $.ajax({
        type: 'POST',
        url: '/_/playlists/' + playlistID + '/media/delete',
        contentType: 'application/json',
        data: '{ "ids": ' + JSON.stringify(currentList) + ' }',
        async: false,
        success: function(){
            API.chatLog('Playlist Reseted!');
        },
        error: function(error){
            API.chatLog('Remove Playlist Media Error!');
            console.log(error);
        }
    });

    var d = new Date();
    d.setDate(d.getDate() - days);

    var i = 0;
    forEach(channels, function(index, channel) {
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channel + '&maxResults=30&order=date&publishedAfter=' + d.toISOString() + '&fields=items(id(videoId),snippet(channelId,channelTitle,title,thumbnails(default(url))))&key=' + ytKey,
            async: false,
            success: function(data){
                if (data.items.length > 0) {
                    API.chatLog(data.items[0].snippet.channelTitle + ' Retrieved ' + data.items.length + ' Results');

                    forEach(data.items, function(index, video) {
                        var fulltitle = video.snippet.title;

                        if (fulltitle.split(" - ")[1] != undefined) {
                            var duration = 0;
                            $.ajax({
                                type: 'GET',
                                url: 'https://www.googleapis.com/youtube/v3/videos?id=' + video.id.videoId + '&fields=items(contentDetails(duration))&key=' + ytKey + '&part=contentDetails',
                                contentType: 'application/json',
                                async: false,
                                success: function(videoInfo){
                                    duration = convertTimeToSeconds(videoInfo.items[0].contentDetails.duration);
                                },
                                error: function(error){
                                    API.chatLog('contentDetails Error!');
                                    console.log(error);
                                }
                            });

                            if (duration > 0 && duration < 600) {
                                var Item = JSON.stringify([{
                                    "id": i,
                                    "format": 1,
                                    "cid": video.id.videoId,
                                    "author": fulltitle.split(" - ")[0].trim(),
                                    "title": fulltitle.split(" - ")[1].trim(),
                                    "image": video.snippet.thumbnails.default.url,
                                    "duration": duration
                                }]);

                                addItem(Item, playlistID, i*3500);

                                countWaits++;
                                i++;
                            }
                        }
                    });
                } else {
                    API.chatLog(channel + ' Retrieved 0 Results');
                }
            },
            error: function(error){
                API.chatLog('channels Error!');
                console.log(error);
            }
        });
    });
}

GM_addStyle ( multilineStr ( function () {/*!
    #myplaylistContainer {
        position:               absolute;
        top:                    936px;
        left:                   1265px;
        font-size:              14px;
        border:                 1px solid #FFFFFF;
        padding:                5px 33px;
        display:                inline-block;
        color:                  #FFFFFF;
        border-radius:          3px 3px 3px 3px;
        -webkit-border-radius:  3px 3px 3px 3px;
        -moz-border-radius:     3px 3px 3px 3px;
        font-family:            Verdana;
        width:                  auto;
        height:                 auto;
        background-color:       #3C74E6;
    }
    #myplaylistContainer:hover, #myplaylistContainer:active{
        border:1px solid #FFFFFF;
        color: #FFFFFF;
        box-shadow: inset 0 1px 0 0 #29748F,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D;
        -moz-box-shadow: inset 0 1px 0 0 #29748F,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D;
        -webkit-box-shadow: inset 0 1px 0 0 #29748F,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D;
        background-color: #29748F;
    }
*/} ) );

function addItem(item, pID, a) {
    setTimeout(function() {
        $.ajax({
            type: 'POST',
            url: '/_/playlists/' + pID + '/media/insert',
            contentType: 'application/json',
            data: '{"media":' + item + ',"append":false}',
            async: false,
            success: function(){
                waitsDone++;

                API.chatLog('Loaded ' + waitsDone + ' of ' + countWaits);

                if(countWaits == waitsDone){
                    //Shuffle
                    $.ajax({
                        type: 'PUT',
                        url: '/_/playlists/' + playlistID + '/shuffle',
                        contentType: 'application/json',
                        async: false,
                        success: function(){
                            API.chatLog('Playlist AutoUpdate Finished!');
                        },
                        error: function(error){
                            API.chatLog('Shuffle Error!');
                            console.log(error);
                        }
                    });
                }
            },
            error: function(error){
                API.chatLog('addItem Error!');
                console.log(error);
            }
        });
    }, a);
};

function convertTimeToSeconds(time) {
    var a = time.match(/\d+H|\d+M|\d+S/g),
        result = 0;

    var d = { 'H': 3600, 'M': 60, 'S': 1 },
        num,
        type;

    for (var i = 0; i < a.length; i++) {
        num = a[i].slice(0, a[i].length - 1);
        type = a[i].slice(a[i].length - 1, a[i].length);

        result += parseInt(num) * d[type];
    }

    return result;
}

function forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '')
        .replace (/\s*\*\/\s*\}\s*$/, '')
        .replace (/\/\/.+$/gm, '')
    ;
    return str;
}
