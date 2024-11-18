(()=>{"use strict";var e,t,r,n={418:(e,t,r)=>{var n=r(440),s=r.n(n);class o extends s().GameObjects.Container{shadows=[];constructor(e,t,r){super(e,t,r),e.add.existing(this)}addShadow(e){this.shadows.push(e),this.add(e)}getShadows(){return this.shadows}disableAllShadows(){this.shadows.forEach((e=>e.setInteractiveState(!1)))}enableAllShadows(){this.shadows.forEach((e=>e.setInteractiveState(!0)))}}class a extends s().GameObjects.Image{isCorrect;color_mouseover="0x44ff44";color_disabled="555555ff";constructor(e,t,r,n,s=!1){super(e,t,r,n),this.setOrigin(.5),this.isCorrect=s,this.setInteractive(),this.setupEventListeners(),e.add.existing(this)}setupEventListeners(){this.on("pointerdown",this.handleButtonClick,this),this.on("pointerover",(()=>this.setTint(Number(this.color_mouseover)))),this.on("pointerout",(()=>this.clearTint()))}isAnswerCorrect(){return this.isCorrect}handleButtonClick(){const e=this.scene;e.guessShadow&&e.guessShadow(this.isCorrect)}setInteractiveState(e){e?(this.setInteractive(),this.on("pointerover",(()=>{this.active&&this.setScale(.16)})),this.on("pointerout",(()=>{this.active&&this.setScale(.13)})),this.clearTint()):(this.disableInteractive(),this.setTint(Number(this.color_disabled)))}}class i extends s().Scene{container_picture;gameInfo;gameState;userInfo;wrongGuessCount=0;gameOverText;shadowContainer;CONFIG={mainPicture:{scale:.15,width:400,height:300},shadows:{scale:.13,width:300,height:200}};constructor(){super({key:"Level"})}preload(){}create(){this.editorCreate(),window.addEventListener("message",this.handleMessage),this.requestUserInfo()}editorCreate(){this.add.image(this.scale.width/2,this.scale.height/2,"BG"),this.container_picture=this.add.image(this.scale.width/2,this.scale.height/4,"Pic_elephant"),this.container_picture.setScale(.15),this.shadowContainer=new o(this,0,0),[{x:150,y:570,texture:"shadow_elephant_f_1",isCorrect:!1},{x:450,y:570,texture:"shadow_elephant_f_2",isCorrect:!1},{x:750,y:570,texture:"shadow_elephant_t",isCorrect:!0},{x:1050,y:570,texture:"shadow_elephant_f_3",isCorrect:!1}].forEach((({x:e,y:t,texture:r,isCorrect:n})=>{const s=new a(this,e,t,r,n);this.CONFIG.shadows.scale?s.setScale(this.CONFIG.shadows.scale):s.setDisplaySize(this.CONFIG.shadows.width,this.CONFIG.shadows.height),this.shadowContainer.addShadow(s)})),this.events.emit("scene-awake"),this.shadowContainer.enableAllShadows()}guessShadow(e){e?(this.showMessage("Correct!","#00ff00"),this.shadowContainer.disableAllShadows()):(this.wrongGuessCount++,this.wrongGuessCount>=3?this.showGameOverScreen():this.showMessage("Incorrect, try again!","#ff0000"))}requestShadow(){this.postMessage({type:"requestParam",payload:{requestName:"startGuess",requestLocalization:"Please guess the shadow.",type:"string"}})}updateShadowAnswer(e){e>3?this.showGameOverScreen():console.info(`Wrong guesses: ${e}`)}showMessage(e,t){const r=this.add.text(this.scale.width/2,this.scale.height/2,e,{fontSize:"32px",color:t,backgroundColor:"#ffffff",padding:{x:10,y:5}}).setOrigin(.5);this.time.delayedCall(1e3,(()=>{r.destroy()}))}showGameOverScreen(){this.gameOverText?.destroy(),this.gameOverText=this.add.text(this.scale.width/2,this.scale.height/2,"Game Over\nClick to Retry",{fontSize:"32px",color:"#ff0000",align:"center",backgroundColor:"#ffffff",padding:{x:20,y:20}}).setOrigin(.5),this.gameOverText.setInteractive(),this.gameOverText.on("pointerdown",(()=>{this.resetGame()}))}resetGame(){this.wrongGuessCount=0,this.gameOverText?.destroy(),this.shadowContainer.enableAllShadows(),this.requestUserInfo(),this.events.emit("scene-awake")}requestUserInfo(){this.postMessage({type:"requestInit",payload:null})}handleMessage=e=>{try{const t="string"==typeof e.data?JSON.parse(e.data):e.data;switch(console.info("PHASER handleMessage:",JSON.stringify(t)),t.type){case"requestInit":{this.userInfo=t.payload.userInfo,this.gameInfo=t.payload.gameInfo;const e=this.gameInfo?.permissionList.find((e=>e.identity==this.userInfo?.preferred_username));e&&this.requestShadow();break}case"serverGameUndate":this.updateState(t.payload);break;case"requestParam":{const e=t.payload;"startGuess"===e.requestName&&this.postMessage({type:"clientGameUpdate",payload:{shadowAnswer:e.value}});break}case"restartGame":this.resetGame()}}catch(e){console.error("Error handling message:",e)}};postMessage(e){const t=JSON.stringify(e);window.parent!==window&&(console.info("PHASER(web) postMessage:",t),window.parent.postMessage(e,"*")),window.ReactNativeWebView&&(console.info("PHASER(native) postMessage:",t),window.ReactNativeWebView.postMessage(t))}updateState(e){if(!e)return;const t=this.gameState;this.gameState=e,this.gameState&&t?.shadowAnswer!==this.gameState.shadowAnswer&&this.initGame(this.gameState.shadowAnswer),this.updateShadowAnswer(this.gameState.wrongGuessCount)}initGame(e){this.wrongGuessCount=0,this.gameState={guessedShadow:[],shadowAnswer:e.trim().toUpperCase(),wrongGuessCount:0}}}const c=r.p+"asset-packs/preload-asset-pack-5d5850ae02ac4d00871d.json";class d{constructor(e){this.gameObject=e,e.__ActionTargetComp=this}static getComponent(e){return e.__ActionTargetComp}gameObject;target="GAME_OBJECT";targetName="";static getTargetGameObject(e,t){const r=d.getComponent(e);if(r)switch(r.target){case"GAME_OBJECT":return e.gameObject;case"ARG_1":return t[0];case"ARG_2":return t[1];case"ARG_3":return t[2];case"ARG_4":return t[3];case"ARG_5":return t[4];case"ARG_6":return t[5];case"ARG_7":return t[6];case"ARG_8":return t[7]}return e.gameObject}}class h{_scene;_gameObject;_parent;_children;constructor(e){this._parent=e,e instanceof h?(this._scene=e.scene,this._gameObject=e.gameObject,e.add(this)):e instanceof s().GameObjects.GameObject?(this._scene=e.scene,this._gameObject=e):this._scene=e;const t=this.awake!==h.prototype.awake,r=this.start!==h.prototype.start,n=this.update!==h.prototype.update,o=this.destroy!==h.prototype.destroy;if(t&&this.scene.events.once("scene-awake",this.awake,this),r&&this.scene.events.once(s().Scenes.Events.UPDATE,this.start,this),n&&this.scene.events.on(s().Scenes.Events.UPDATE,this.update,this),t||r||n||o){const e=()=>{this.scene.events.off("scene-awake",this.awake,this),this.scene.events.off(s().Scenes.Events.UPDATE,this.start,this),this.scene.events.off(s().Scenes.Events.UPDATE,this.update,this),o&&this.destroy()};this.gameObject?this.gameObject.on(s().GameObjects.Events.DESTROY,e):this.scene.events.on(s().Scenes.Events.SHUTDOWN,e)}}getActionTargetObject(e){return d.getTargetGameObject(this,e)}get scene(){return this._scene}get gameObject(){return this._gameObject}get parent(){return this._parent}get children(){return this._children||(this._children=[]),this._children}add(e){this.children.push(e)}executeChildren(...e){if(this._children)for(const t of this._children)t.execute(...e)}execute(...e){}awake(){}start(){}update(){}destroy(){}}class l extends h{constructor(e){super(e)}get gameObject(){return super.gameObject}awake(){const e=this.gameObject.width;this.scene.load.on(Phaser.Loader.Events.PROGRESS,(t=>{this.gameObject.width=e*t}))}}const u=r.p+"asset-packs/asset-pack-6aba98274c4b26dedecb.json";class p extends Phaser.Scene{constructor(){super("Preload")}editorCreate(){const e=this.add.rectangle(553.0120849609375,361,256,20);e.setOrigin(0,0),e.isFilled=!0,e.fillColor=14737632,new l(e);const t=this.add.rectangle(553.0120849609375,361,256,20);t.setOrigin(0,0),t.fillColor=14737632,t.isStroked=!0;const r=this.add.text(552.0120849609375,329,"",{});r.text="Loading...",r.setStyle({color:"#e0e0e0",fontFamily:"arial",fontSize:"20px"}),this.events.emit("scene-awake")}preload(){this.editorCreate(),this.load.pack("asset-pack",u),console.log("Assets are loading...")}create(){this.scene.start("Level"),console.log("Game is starting...")}}class f extends s().Scene{constructor(){super("Boot")}preload(){this.load.pack("pack",c)}create(){this.scene.start("Preload")}}window.addEventListener("load",(function(){new(s().Game)({width:1280,height:720,backgroundColor:"#2f2f2f",scale:{mode:s().Scale.ScaleModes.FIT,autoCenter:s().Scale.Center.CENTER_BOTH},scene:[f,p,i]}).scene.start("Boot")}))}},s={};function o(e){var t=s[e];if(void 0!==t){if(void 0!==t.error)throw t.error;return t.exports}var r=s[e]={exports:{}};try{var a={id:e,module:r,factory:n[e],require:o};o.i.forEach((function(e){e(a)})),r=a.module,a.factory.call(r.exports,r,r.exports,a.require)}catch(e){throw r.error=e,e}return r.exports}o.m=n,o.c=s,o.i=[],e=[],o.O=(t,r,n,s)=>{if(!r){var a=1/0;for(h=0;h<e.length;h++){for(var[r,n,s]=e[h],i=!0,c=0;c<r.length;c++)(!1&s||a>=s)&&Object.keys(o.O).every((e=>o.O[e](r[c])))?r.splice(c--,1):(i=!1,s<a&&(a=s));if(i){e.splice(h--,1);var d=n();void 0!==d&&(t=d)}}return t}s=s||0;for(var h=e.length;h>0&&e[h-1][2]>s;h--)e[h]=e[h-1];e[h]=[r,n,s]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.hu=e=>e+"."+o.h()+".hot-update.js",o.hmrF=()=>"main."+o.h()+".hot-update.json",o.h=()=>"50644c9f25c4882fc808",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),t={},r="phaser3-webpack-template:",o.l=(e,n,s,a)=>{if(t[e])t[e].push(n);else{var i,c;if(void 0!==s)for(var d=document.getElementsByTagName("script"),h=0;h<d.length;h++){var l=d[h];if(l.getAttribute("src")==e||l.getAttribute("data-webpack")==r+s){i=l;break}}i||(c=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,o.nc&&i.setAttribute("nonce",o.nc),i.setAttribute("data-webpack",r+s),i.src=e),t[e]=[n];var u=(r,n)=>{i.onerror=i.onload=null,clearTimeout(p);var s=t[e];if(delete t[e],i.parentNode&&i.parentNode.removeChild(i),s&&s.forEach((e=>e(n))),r)return r(n)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=u.bind(null,i.onerror),i.onload=u.bind(null,i.onload),c&&document.head.appendChild(i)}},(()=>{var e,t,r,n={},s=o.c,a=[],i=[],c="idle",d=0,h=[];function l(e){c=e;for(var t=[],r=0;r<i.length;r++)t[r]=i[r].call(null,e);return Promise.all(t).then((function(){}))}function u(){0==--d&&l("ready").then((function(){if(0===d){var e=h;h=[];for(var t=0;t<e.length;t++)e[t]()}}))}function p(e){if("idle"!==c)throw new Error("check() is only allowed in idle status");return l("check").then(o.hmrM).then((function(r){return r?l("prepare").then((function(){var n=[];return t=[],Promise.all(Object.keys(o.hmrC).reduce((function(e,s){return o.hmrC[s](r.c,r.r,r.m,e,t,n),e}),[])).then((function(){return t=function(){return e?g(e):l("ready").then((function(){return n}))},0===d?t():new Promise((function(e){h.push((function(){e(t())}))}));var t}))})):l(m()?"ready":"idle").then((function(){return null}))}))}function f(e){return"ready"!==c?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status (state: "+c+")")})):g(e)}function g(e){e=e||{},m();var n=t.map((function(t){return t(e)}));t=void 0;var s=n.map((function(e){return e.error})).filter(Boolean);if(s.length>0)return l("abort").then((function(){throw s[0]}));var o=l("dispose");n.forEach((function(e){e.dispose&&e.dispose()}));var a,i=l("apply"),c=function(e){a||(a=e)},d=[];return n.forEach((function(e){if(e.apply){var t=e.apply(c);if(t)for(var r=0;r<t.length;r++)d.push(t[r])}})),Promise.all([o,i]).then((function(){return a?l("fail").then((function(){throw a})):r?g(e).then((function(e){return d.forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e})):l("idle").then((function(){return d}))}))}function m(){if(r)return t||(t=[]),Object.keys(o.hmrI).forEach((function(e){r.forEach((function(r){o.hmrI[e](r,t)}))})),r=void 0,!0}o.hmrD=n,o.i.push((function(h){var g,m,v,w,y=h.module,b=function(t,r){var n=s[r];if(!n)return t;var o=function(o){if(n.hot.active){if(s[o]){var i=s[o].parents;-1===i.indexOf(r)&&i.push(r)}else a=[r],e=o;-1===n.children.indexOf(o)&&n.children.push(o)}else console.warn("[HMR] unexpected require("+o+") from disposed module "+r),a=[];return t(o)},i=function(e){return{configurable:!0,enumerable:!0,get:function(){return t[e]},set:function(r){t[e]=r}}};for(var h in t)Object.prototype.hasOwnProperty.call(t,h)&&"e"!==h&&Object.defineProperty(o,h,i(h));return o.e=function(e,r){return function(e){switch(c){case"ready":l("prepare");case"prepare":return d++,e.then(u,u),e;default:return e}}(t.e(e,r))},o}(h.require,h.id);y.hot=(g=h.id,m=y,w={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:v=e!==g,_requireSelf:function(){a=m.parents.slice(),e=v?void 0:g,o(g)},active:!0,accept:function(e,t,r){if(void 0===e)w._selfAccepted=!0;else if("function"==typeof e)w._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var n=0;n<e.length;n++)w._acceptedDependencies[e[n]]=t||function(){},w._acceptedErrorHandlers[e[n]]=r;else w._acceptedDependencies[e]=t||function(){},w._acceptedErrorHandlers[e]=r},decline:function(e){if(void 0===e)w._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)w._declinedDependencies[e[t]]=!0;else w._declinedDependencies[e]=!0},dispose:function(e){w._disposeHandlers.push(e)},addDisposeHandler:function(e){w._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=w._disposeHandlers.indexOf(e);t>=0&&w._disposeHandlers.splice(t,1)},invalidate:function(){switch(this._selfInvalidated=!0,c){case"idle":t=[],Object.keys(o.hmrI).forEach((function(e){o.hmrI[e](g,t)})),l("ready");break;case"ready":Object.keys(o.hmrI).forEach((function(e){o.hmrI[e](g,t)}));break;case"prepare":case"check":case"dispose":case"apply":(r=r||[]).push(g)}},check:p,apply:f,status:function(e){if(!e)return c;i.push(e)},addStatusHandler:function(e){i.push(e)},removeStatusHandler:function(e){var t=i.indexOf(e);t>=0&&i.splice(t,1)},data:n[g]},e=void 0,w),y.parents=a,y.children=[],a=[],h.require=b})),o.hmrC={},o.hmrI={}})(),(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&(!e||!/^http(s?):/.test(e));)e=r[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e,t,r,n,s,a=o.hmrS_jsonp=o.hmrS_jsonp||{792:0},i={};function c(t,r){return e=r,new Promise(((e,r)=>{i[t]=e;var n=o.p+o.hu(t),s=new Error;o.l(n,(e=>{if(i[t]){i[t]=void 0;var n=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;s.message="Loading hot update chunk "+t+" failed.\n("+n+": "+o+")",s.name="ChunkLoadError",s.type=n,s.request=o,r(s)}}))}))}function d(e){function i(e){for(var t=[e],r={},n=t.map((function(e){return{chain:[e],id:e}}));n.length>0;){var s=n.pop(),a=s.id,i=s.chain,d=o.c[a];if(d&&(!d.hot._selfAccepted||d.hot._selfInvalidated)){if(d.hot._selfDeclined)return{type:"self-declined",chain:i,moduleId:a};if(d.hot._main)return{type:"unaccepted",chain:i,moduleId:a};for(var h=0;h<d.parents.length;h++){var l=d.parents[h],u=o.c[l];if(u){if(u.hot._declinedDependencies[a])return{type:"declined",chain:i.concat([l]),moduleId:a,parentId:l};-1===t.indexOf(l)&&(u.hot._acceptedDependencies[a]?(r[l]||(r[l]=[]),c(r[l],[a])):(delete r[l],t.push(l),n.push({chain:i.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:r}}function c(e,t){for(var r=0;r<t.length;r++){var n=t[r];-1===e.indexOf(n)&&e.push(n)}}o.f&&delete o.f.jsonpHmr,t=void 0;var d={},h=[],l={},u=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var p in r)if(o.o(r,p)){var f=r[p],g=f?i(p):{type:"disposed",moduleId:p},m=!1,v=!1,w=!1,y="";switch(g.chain&&(y="\nUpdate propagation: "+g.chain.join(" -> ")),g.type){case"self-declined":e.onDeclined&&e.onDeclined(g),e.ignoreDeclined||(m=new Error("Aborted because of self decline: "+g.moduleId+y));break;case"declined":e.onDeclined&&e.onDeclined(g),e.ignoreDeclined||(m=new Error("Aborted because of declined dependency: "+g.moduleId+" in "+g.parentId+y));break;case"unaccepted":e.onUnaccepted&&e.onUnaccepted(g),e.ignoreUnaccepted||(m=new Error("Aborted because "+p+" is not accepted"+y));break;case"accepted":e.onAccepted&&e.onAccepted(g),v=!0;break;case"disposed":e.onDisposed&&e.onDisposed(g),w=!0;break;default:throw new Error("Unexception type "+g.type)}if(m)return{error:m};if(v)for(p in l[p]=f,c(h,g.outdatedModules),g.outdatedDependencies)o.o(g.outdatedDependencies,p)&&(d[p]||(d[p]=[]),c(d[p],g.outdatedDependencies[p]));w&&(c(h,[g.moduleId]),l[p]=u)}r=void 0;for(var b,_=[],O=0;O<h.length;O++){var E=h[O],S=o.c[E];S&&(S.hot._selfAccepted||S.hot._main)&&l[E]!==u&&!S.hot._selfInvalidated&&_.push({module:E,require:S.hot._requireSelf,errorHandler:S.hot._selfAccepted})}return{dispose:function(){var e;n.forEach((function(e){delete a[e]})),n=void 0;for(var t,r=h.slice();r.length>0;){var s=r.pop(),i=o.c[s];if(i){var c={},l=i.hot._disposeHandlers;for(O=0;O<l.length;O++)l[O].call(null,c);for(o.hmrD[s]=c,i.hot.active=!1,delete o.c[s],delete d[s],O=0;O<i.children.length;O++){var u=o.c[i.children[O]];u&&(e=u.parents.indexOf(s))>=0&&u.parents.splice(e,1)}}}for(var p in d)if(o.o(d,p)&&(i=o.c[p]))for(b=d[p],O=0;O<b.length;O++)t=b[O],(e=i.children.indexOf(t))>=0&&i.children.splice(e,1)},apply:function(t){for(var r in l)o.o(l,r)&&(o.m[r]=l[r]);for(var n=0;n<s.length;n++)s[n](o);for(var a in d)if(o.o(d,a)){var i=o.c[a];if(i){b=d[a];for(var c=[],u=[],p=[],f=0;f<b.length;f++){var g=b[f],m=i.hot._acceptedDependencies[g],v=i.hot._acceptedErrorHandlers[g];if(m){if(-1!==c.indexOf(m))continue;c.push(m),u.push(v),p.push(g)}}for(var w=0;w<c.length;w++)try{c[w].call(null,b)}catch(r){if("function"==typeof u[w])try{u[w](r,{moduleId:a,dependencyId:p[w]})}catch(n){e.onErrored&&e.onErrored({type:"accept-error-handler-errored",moduleId:a,dependencyId:p[w],error:n,originalError:r}),e.ignoreErrored||(t(n),t(r))}else e.onErrored&&e.onErrored({type:"accept-errored",moduleId:a,dependencyId:p[w],error:r}),e.ignoreErrored||t(r)}}}for(var y=0;y<_.length;y++){var O=_[y],E=O.module;try{O.require(E)}catch(r){if("function"==typeof O.errorHandler)try{O.errorHandler(r,{moduleId:E,module:o.c[E]})}catch(n){e.onErrored&&e.onErrored({type:"self-accept-error-handler-errored",moduleId:E,error:n,originalError:r}),e.ignoreErrored||(t(n),t(r))}else e.onErrored&&e.onErrored({type:"self-accept-errored",moduleId:E,error:r}),e.ignoreErrored||t(r)}}return h}}}self.webpackHotUpdatephaser3_webpack_template=(t,n,a)=>{for(var c in n)o.o(n,c)&&(r[c]=n[c],e&&e.push(c));a&&s.push(a),i[t]&&(i[t](),i[t]=void 0)},o.hmrI.jsonp=function(e,t){r||(r={},s=[],n=[],t.push(d)),o.o(r,e)||(r[e]=o.m[e])},o.hmrC.jsonp=function(e,i,h,l,u,p){u.push(d),t={},n=i,r=h.reduce((function(e,t){return e[t]=!1,e}),{}),s=[],e.forEach((function(e){o.o(a,e)&&void 0!==a[e]?(l.push(c(e,p)),t[e]=!0):t[e]=!1})),o.f&&(o.f.jsonpHmr=function(e,r){t&&o.o(t,e)&&!t[e]&&(r.push(c(e)),t[e]=!0)})},o.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(o.p+o.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))},o.O.j=e=>0===a[e];var h=(e,t)=>{var r,n,[s,i,c]=t,d=0;if(s.some((e=>0!==a[e]))){for(r in i)o.o(i,r)&&(o.m[r]=i[r]);if(c)var h=c(o)}for(e&&e(t);d<s.length;d++)n=s[d],o.o(a,n)&&a[n]&&a[n][0](),a[n]=0;return o.O(h)},l=self.webpackChunkphaser3_webpack_template=self.webpackChunkphaser3_webpack_template||[];l.forEach(h.bind(null,0)),l.push=h.bind(null,l.push.bind(l))})();var a=o.O(void 0,[418],(()=>o(418)));a=o.O(a)})();