!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=9)}({9:function(e,n,t){"use strict";var r={init:function(){this.checkStatus()},isEmpty:function(e){for(var n in e)if(e.hasOwnProperty(n))return!1;return!0},checkStatus:function(){var e=this;chrome.storage.sync.get(["enabled","font"],function(n){var t=n.enabled,o="opendyslexic-regular";try{!1===e.isEmpty(n.font)&&(o="opendyslexic-"+n.font.font),!0===t&&r.enableOpenDyslexic(o),!1===t&&r.disableOpenDyslexic()}catch(e){!0===t&&r.enableOpenDyslexic("opendyslexic-regular"),!1===t&&r.disableOpenDyslexic()}})},disableOpenDyslexic:function(){var e=document.getElementById("opendyslexic");e&&(e.parentNode.removeChild(e),(document.head||document.documentElement).removeChild(e))},enableOpenDyslexic:function(e){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.setAttribute("id","opendyslexic"),n.href=chrome.extension.getURL("styles/core/"+e.toLowerCase()+".css"),document.head.appendChild(n)}};r.init(),chrome.runtime.onMessage.addListener(function(e,n,t){return"reload"===e.message&&location.reload(),t({}),!0})}});