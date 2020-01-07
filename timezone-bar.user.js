// ==UserScript==
// @name         Timezone Bar
// @namespace    http://tampermonkey.net/
// @version      0.5
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
        "pacific":    { name: "Pacific",    dst: "true",  offset: -8, people: "Barry" },
        "mountain":   { name: "Mountain",   dst: "true",  offset: -7, people: "Brendan, Sarah, Neill, Jeff" },
        "central":    { name: "Central",    dst: "true",  offset: -6, people: "Rachel, Ali, Jenny, LaToya, Mike, Sky" },
        "eastern":    { name: "Eastern",    dst: "true",  offset: -5, people: "Zach, Courtney, Gustavo, LeGeoff, Jaime, Jennifer" },
        "argentina":  { name: "S.America",  dst: "true",  offset: -4, people: "Deblyn, Patricia, Raul, Santiago, Victor" },
        "utc":        { name: "UTC",        dst: "true",  offset: 0,  people: "" },
        "canary":     { name: "Canary",     dst: "true",  offset: 0,  people: "Shane" },
        "paris":      { name: "Paris",      dst: "true",  offset: 1,  people: "Jeremy, Luca" },
        "cairo":      { name: "Cairo",      dst: "false", offset: 2,  people: "Alaa" },
        "bangladesh": { name: "Bangladesh", dst: "false", offset: 6,  people: "Rafsun" },
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

        var dstMod = 0;
        /* The getMonth() method returns the month of a date as a number from 0 to 11.
           To get the correct month, you must add 1. Or deduct a month...
         */
        /* DST times for 2020 */
        var dstDateSpring = new Date(2020,2,29);
        var dstDateFall = new Date(2020,9,25);

        /* If we're in summer time, we need to adjust the offset */
        if ( d > dstDateSpring && d < dstDateFall ) {
            dstMod = 1;
        }

        //console.log('time: ' + d + dstMod + dstDateSpring);

        for( var zone in timeZones ) {
            /* If location doesn't use DST then set offset modifyer to zero */
            if ( timeZones[zone].dst == "false" ) dstMod = 0;

            var newHour = hour + timeZones[zone].offset + dstMod;
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
     * 0.5 - 2020-01-07
     * Fixed DST offset bug
     *
     * 0.4 - 2019-10-09
     * Added Sarah and Raul
     * Removed Shelby
     *
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
