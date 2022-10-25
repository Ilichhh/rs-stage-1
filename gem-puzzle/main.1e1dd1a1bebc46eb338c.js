!function(){var t={668:function(t){t.exports='<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"></path></svg>'},750:function(t){t.exports='<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>'}},e={};function n(o){var s=e[o];if(void 0!==s)return s.exports;var r=e[o]={exports:{}};return t[o](r,r.exports,n),r.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var o=e.getElementsByTagName("script");o.length&&(t=o[o.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t}(),function(){"use strict";n.p;var t=n(750),e=n.n(t),o=n(668),s=n.n(o);window.addEventListener("DOMContentLoaded",(()=>{const t=new Audio("./assets/zapsplat_foley_brick_or_tile_scrape_on_concrete_001_70840.mp3"),n=[9,16,25,36,49,64],o=[];let r=[];const c={},a={};let i={countItems:16,seconds:0,minutes:0,moves:0},l=[],u=!1,d=null,v=!0;document.body.innerHTML=`\n    <main class="container">\n      <h1 class="header">Gem Puzzle</h1>\n      <button class="button sound-button">${e()}</button>\n      <div class="buttons-wrapper">\n        <button class="button save">SAVE</button>\n        <button class="button load">LOAD</button>\n        <button class="button show-results">RESULTS</button>\n      </div>\n      <div class="stats-wrapper">\n        <span class="time">00:00</span>\n        <span class="moves">Moves: ${i.moves}</span>\n      </div>\n      <div class="results">\n        <div class="results__table">\n          <div class="results__header">\n            <div>Position</div>\n            <div>Time</div>\n            <div>Moves</div>\n          </div>\n          <div class="results__stats"></div>\n        </div>\n      </div>\n      <div class="field"></div>\n      <div class="size-wrapper"></div>\n      <button class="button shuffle">NEW GAME</button>\n    </main>\n  `;const m=document.querySelector(".field"),p=document.querySelector(".shuffle"),f=document.querySelector(".save"),g=document.querySelector(".load"),h=document.querySelector(".show-results"),S=document.querySelector(".sound-button"),y=(document.querySelector(".stats-wrapper"),document.querySelector(".results")),b=document.querySelector(".moves"),M=document.querySelector(".time"),w=document.querySelector(".size-wrapper"),L=document.querySelector(".results__stats");function $(t){o.length=0;for(let e=1;e<=t;e++)o.push(e);m.innerHTML="",o.forEach((t=>{m.innerHTML+=`\n        <button class="piece" data-piece-id="${t}">${t}</button>\n      `}))}function x(){const t=document.querySelector(".size-wrapper");t.innerHTML="",n.forEach((e=>{t.innerHTML+=`\n        <label class="size">\n          <input type="radio" name="size" value="${e}"${e===i.countItems?" checked":""}>${Math.sqrt(e)}x${Math.sqrt(e)}\n        </label>\n      `}))}function _(){for(let t=0;t<r.length;t++)for(let e=0;e<r[t].length;e++){const n=document.querySelectorAll(".piece")[r[t][e]-1];n.style.transform=`translate(${100*e}%, ${100*t}%)`,n.style.width=`calc(100% / ${r[t].length})`,n.style.height=`calc(100% / ${r.length})`}}function I(t){for(let e=0;e<r.length;e++)for(let n=0;n<r[e].length;n++)r[e][n]===t&&(c.x=n,c.y=e),r[e][n]===o.length&&(a.x=n,a.y=e);const e=Math.abs(a.x-c.x),n=Math.abs(a.y-c.y);return a.x===c.x&&1===n||a.y===c.y&&1===e}function q(){L.innerHTML="";for(let t=0;t<10;t++){let e;l[t]&&(e=`${l[t].min.toString().padStart(2,0)}:${l[t].sec.toString().padStart(2,0)}`),L.innerHTML+=`\n        <div class="results__values">\n          <div>${t+1}</div>\n          <div>${l[t]?e:"..."}</div>\n          <div>${l[t]?l[t].moves:"..."}</div>\n        </div>\n      `}}function z(t){const e=o.filter((t=>I(t)));t[e[Math.floor(Math.random()*e.length)]-1].click()}function E(t){y.classList.remove("results_active"),document.querySelector(".congratulation")&&document.querySelector(".congratulation").remove(),clearInterval(d),i.moves=0,i.minutes=0,i.seconds=0,M.textContent="00:00",b.textContent="Moves: 0",function(t){u=!0;const e=[...document.querySelectorAll(".piece")];for(let n=0;n<20*t;n++)z(e);u=!1}(t),d=setInterval(T,1e3)}function H(t){i.countItems=t,$(i.countItems),function(t){const e=Math.sqrt(t.length);r.length=0;for(let t=1;t<=e;t++){r.push([]);for(let n=1;n<=e;n++)r[t-1].push(n+e*(t-1))}}(o),_()}function T(){i.seconds++,60===i.seconds&&(i.minutes++,i.seconds=0),M.textContent=`${i.minutes.toString().padStart(2,0)}:${i.seconds.toString().padStart(2,0)}`}q(),x(),H(16),y.addEventListener("click",(()=>y.classList.remove("results_active"))),m.addEventListener("click",(e=>{!function(e){if(!e)return null;const n=+e.dataset.pieceId;I(n)&&(r[c.y][c.x]=o.length,r[a.y][a.x]=n,_(),u||(i.moves++,b.textContent=`Moves: ${i.moves}`,v&&t.play(),r.join(",")===o.join(",")&&(function(t,e){m.insertAdjacentHTML("afterbegin",`\n      <div class="congratulation">Hooray!<br> You solved the puzzle in ${t} and ${e} moves!</div>\n    `)}(M.textContent,i.moves),console.log(i),function(t){const e={min:t.minutes,sec:t.seconds,moves:t.moves};l.push(e),l.sort(((t,e)=>60*t.min+t.sec-(60*e.min+e.sec))),l=l.slice(0,10),console.log(l),q()}(i),clearInterval(d))))}(e.target.closest(".piece"))})),p.addEventListener("click",(()=>E(i.countItems))),w.addEventListener("click",(t=>{const e=+t.target.value;e&&(H(e),E(i.countItems))})),E(i.countItems),window.addEventListener("load",(()=>{localStorage.getItem("top")&&(l=JSON.parse(localStorage.getItem("top")),q())})),window.addEventListener("beforeunload",(()=>localStorage.setItem("top",JSON.stringify(l)))),f.addEventListener("click",(function(){localStorage.setItem("savedState",JSON.stringify(i)),localStorage.setItem("savedMatrix",JSON.stringify(r)),localStorage.setItem("top",JSON.stringify(l))})),g.addEventListener("click",(function(){localStorage.getItem("savedState")&&(y.classList.remove("results_active"),i=JSON.parse(localStorage.getItem("savedState")),r=JSON.parse(localStorage.getItem("savedMatrix")),document.querySelector(".congratulation")&&document.querySelector(".congratulation").remove(),clearInterval(d),$(i.countItems),_(),M.textContent=`${i.minutes.toString().padStart(2,0)}:${i.seconds.toString().padStart(2,0)}`,b.textContent=`Moves: ${i.moves}`,d=setInterval(T,1e3),x())})),S.addEventListener("click",(function(){v=!v,S.innerHTML===e()?S.innerHTML=s():S.innerHTML=e()})),h.addEventListener("click",(function(){y.classList.add("results_active")}))}))}()}();