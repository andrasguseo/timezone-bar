// ==UserScript==
// @name         Timezone Bar
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://central.tri.be/*
// @match        https://calendar.google.com/*
// @downloadURL  https://github.com/andrasguseo/timezone-bar/raw/master/timezone-bar.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var timeZones = {
        "pacific":    { name: "Pacific",    offset: -7, people: "Barry" },
        "mountain":   { name: "Mountain",   offset: -6, people: "Brendan, Neill, Jeff" },
        "central":    { name: "Central",    offset: -5, people: "Rachel, Ali, LaToya, Mike, Sky" },
        "eastern":    { name: "Eastern",    offset: -4, people: "Zach, Courtney, Ed, Gustavo, LeGeoff, Jennifer, Shelby" },
        "argentina":  { name: "Argentina",  offset: -3, people: "Deblyn, Juan, Nico, Patricia, Santiago, Victor" },
        "utc":        { name: "UTC",        offset: 0,  people: "" },
        "canary":     { name: "Canary",     offset: 1,  people: "Shane" },
        "paris":      { name: "Paris",      offset: 2,  people: "Jeremy, Luca" },
        "cairo":      { name: "Cairo",      offset: 2,  people: "Alaa" },
        "bangladesh": { name: "Bangladesh", offset: 6,  people: "Rafsun" },
    };

    var html, html2;

    var myVar = setInterval(myFunction, 5000);

    var timezoneWrapper = document.createElement("div");
    timezoneWrapper.id = 'timezone-wrapper';

    var peopleDiv = document.createElement("div");
    peopleDiv.id = 'people-container';

    var div = document.createElement("div");
    div.id = 'timezone-container';
    var wrapper = document.getElementById("wrapper");

    //wrapper.appendChild( timezoneWrapper );
    document.body.appendChild( timezoneWrapper );
    timezoneWrapper.appendChild( peopleDiv );
    timezoneWrapper.appendChild( div );

    function myFunction() {
        html2 = '';
        var d = new Date();
        var hour = d.getUTCHours();
        var min = d.getUTCMinutes();
        var leadingZero = '';

        for( var zone in timeZones ) {
            var newHour = hour + timeZones[zone].offset;
            if ( newHour > 23 ) {
                newHour = newHour-24;
            }
            else if ( newHour < 0 ) {
                newHour = newHour+24;
            }
            html2 += '<div id="' + zone.toLowerCase() + '" class="timezone">';
            if ( min < 10 ) leadingZero = '0';
            html2 += timeZones[zone].name + ' - ' + newHour + ":" + leadingZero + min;
            html2 += '</div>';
        }

        document.getElementById("timezone-container").innerHTML = html2;
    }

    html  = '<div id="timezone-wrapper"><div id="people-container"></div>';
    html += '<div id="timezone-containter">';
    html += '<div id="geneva">asdfa</div>';
    html += '</div></div>';

    // ADDING STYLE
    var css = '#timezone-wrapper { cursor: pointer; position: fixed; bottom: 0; left: 0; width: 100%; z-index: 99; background-color: #15d590; text-align: center; font-weight: bold; color: #fff; } #timezone-container, #people-container {  } #people-container { bottom: 30px;} .timezone{ display: inline; padding-left: 10px; padding-right: 10px; }';
    var head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    console.log( html );

    document.getElementById( 'timezone-container' ).addEventListener( 'mouseover', function( e ) {
        var target = e.target;
        console.log(target.id);
        document.getElementById("people-container").style.display = 'block';
        document.getElementById("people-container").innerHTML = timeZones[target.id].people;
    } );
    document.getElementById( 'timezone-container' ).addEventListener( 'mouseout', function() {
        document.getElementById("people-container").style.display = 'none';
    } );

    /**
     * CHANGELOG
     * 0.3 - 2019-05-31
     * Added Santiago
     * Moved Gustavo
     * Removed Jen :(
     * Fixed hours lower than 0
     *
     * 0.2 - 2019-04-22
     * Updated with Deblyn
     * Fixed hours higher than 24
     *
     * 0.1
     * Initial release
     */
})();
