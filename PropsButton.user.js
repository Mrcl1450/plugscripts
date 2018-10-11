// ==UserScript==
// @name           Prop Button
// @version        1.2
// @description    Prop Button Script
// @author         Mrcl-
// API Check From RCS Load Script

// @include        https://plug.dj/*
// @include        https://*.plug.dj/*
// @exclude        https://plug.dj/_/*
// @exclude        https://plug.dj/@/*
// @exclude        https://plug.dj/ba
// @exclude        https://plug.dj/plot
// @exclude        https://plug.dj/press
// @exclude        https://plug.dj/partners
// @exclude        https://plug.dj/team
// @exclude        https://plug.dj/about
// @exclude        https://plug.dj/jobs
// @exclude        https://plug.dj/purchase
// @exclude        https://plug.dj/subscribe
// @exclude        https://*.plug.dj/_/*
// @exclude        https://*.plug.dj/@/*
// @exclude        https://*.plug.dj/ba
// @exclude        https://*.plug.dj/plot
// @exclude        https://*.plug.dj/press
// @exclude        https://*.plug.dj/partners
// @exclude        https://*.plug.dj/team
// @exclude        https://*.plug.dj/about
// @exclude        https://*.plug.dj/jobs
// @exclude        https://*.plug.dj/purchase
// @exclude        https://*.plug.dj/subscribe

// @grant          GM_addStyle
// ==/UserScript==

(function() {

    var loaded = false;

    var a = {
        b: function() {
            if (typeof API !== 'undefined' && API.enabled) {
                this.c();
            }
            else if (!loaded) {
                setTimeout(function() { a.b(); }, 1000);
            }
        },
        c: function() {
            loaded = true;
            
            var input=document.createElement("input");
            input.type="button";
            input.value="Props!";
            input.onclick = myPropButtonClickAction;
            input.setAttribute ('id', 'myProp');
            document.body.appendChild(input);
        }
    };
    a.b();
})();

function myPropButtonClickAction () {
    API.sendChat("!props");
}

GM_addStyle ( multilineStr ( function () {/*!
    #myProp {
        position:               absolute;
        top:                    837px;
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
    #myProp:hover, #myProp:active{
        border:1px solid #FFFFFF;
        color: #FFFFFF;
        box-shadow: inset 0 1px 0 0 #29748F,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D;
        -moz-box-shadow: inset 0 1px 0 0 #29748F,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D;
        -webkit-box-shadow: inset 0 1px 0 0 #29748F,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D;
        background-color: #29748F;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '')
        .replace (/\s*\*\/\s*\}\s*$/, '')
        .replace (/\/\/.+$/gm, '')
    ;
    return str;
}
