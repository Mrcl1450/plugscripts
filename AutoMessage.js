// ==UserScript==
// @name           AutoMessage
// @version        1.0
// @description    Auto Message
// @author         Mrcl-

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

// @grant        none
// ==/UserScript==

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

            (function repeat() {
              API.sendChat('hello');
              setTimeout(repeat, 60000);
            })();
        }
    };
    a.b();
})();
