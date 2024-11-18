(()=>{"use strict";var e,t={320:(e,t,s)=>{var a=s(440),i=s.n(a);class r extends i().GameObjects.Container{shadows=[];constructor(e,t,s){super(e,t,s),e.add.existing(this)}addShadow(e){this.shadows.push(e),this.add(e)}getShadows(){return this.shadows}disableAllShadows(){this.shadows.forEach((e=>e.setInteractiveState(!1)))}enableAllShadows(){this.shadows.forEach((e=>e.setInteractiveState(!0)))}}class o extends i().GameObjects.Image{isCorrect;color_mouseover="0x44ff44";color_disabled="555555ff";constructor(e,t,s,a,i=!1){super(e,t,s,a),this.setOrigin(.5),this.isCorrect=i,this.setInteractive(),this.setupEventListeners(),e.add.existing(this)}setupEventListeners(){this.on("pointerdown",this.handleButtonClick,this),this.on("pointerover",(()=>this.setTint(Number(this.color_mouseover)))),this.on("pointerout",(()=>this.clearTint()))}isAnswerCorrect(){return this.isCorrect}handleButtonClick(){const e=this.scene;e.guessShadow&&e.guessShadow(this.isCorrect)}setInteractiveState(e){e?(this.setInteractive(),this.on("pointerover",(()=>{this.active&&this.setScale(.16)})),this.on("pointerout",(()=>{this.active&&this.setScale(.13)})),this.clearTint()):(this.disableInteractive(),this.setTint(Number(this.color_disabled)))}}class n extends i().Scene{container_picture;gameInfo;gameState;userInfo;wrongGuessCount=0;gameOverText;shadowContainer;CONFIG={mainPicture:{scale:.15,width:400,height:300},shadows:{scale:.13,width:300,height:200}};constructor(){super({key:"Level"})}preload(){}create(){this.editorCreate(),window.addEventListener("message",this.handleMessage),this.requestUserInfo()}editorCreate(){this.add.image(this.scale.width/2,this.scale.height/2,"BG"),this.container_picture=this.add.image(this.scale.width/2,this.scale.height/4,"Pic_elephant"),this.container_picture.setScale(.15),this.shadowContainer=new r(this,0,0);[{x:150,y:570,texture:"shadow_elephant_f_1",isCorrect:!1},{x:450,y:570,texture:"shadow_elephant_f_2",isCorrect:!1},{x:750,y:570,texture:"shadow_elephant_t",isCorrect:!0},{x:1050,y:570,texture:"shadow_elephant_f_3",isCorrect:!1}].forEach((({x:e,y:t,texture:s,isCorrect:a})=>{const i=new o(this,e,t,s,a);this.CONFIG.shadows.scale?i.setScale(this.CONFIG.shadows.scale):i.setDisplaySize(this.CONFIG.shadows.width,this.CONFIG.shadows.height),this.shadowContainer.addShadow(i)})),this.events.emit("scene-awake"),this.shadowContainer.enableAllShadows()}guessShadow(e){e?(this.showMessage("Correct!","#00ff00"),this.shadowContainer.disableAllShadows()):(this.wrongGuessCount++,this.wrongGuessCount>=3?this.showGameOverScreen():this.showMessage("Incorrect, try again!","#ff0000"))}requestShadow(){this.postMessage({type:"requestParam",payload:{requestName:"startGuess",requestLocalization:"Please guess the shadow.",type:"string"}})}updateShadowAnswer(e){e>3&&this.showGameOverScreen()}showMessage(e,t){const s=this.add.text(this.scale.width/2,this.scale.height/2,e,{fontSize:"32px",color:t,backgroundColor:"#ffffff",padding:{x:10,y:5}}).setOrigin(.5);this.time.delayedCall(1e3,(()=>{s.destroy()}))}showGameOverScreen(){this.gameOverText?.destroy(),this.gameOverText=this.add.text(this.scale.width/2,this.scale.height/2,"Game Over\nClick to Retry",{fontSize:"32px",color:"#ff0000",align:"center",backgroundColor:"#ffffff",padding:{x:20,y:20}}).setOrigin(.5),this.gameOverText.setInteractive(),this.gameOverText.on("pointerdown",(()=>{this.resetGame()}))}resetGame(){this.wrongGuessCount=0,this.gameOverText?.destroy(),this.shadowContainer.enableAllShadows(),this.requestUserInfo(),this.events.emit("scene-awake")}requestUserInfo(){this.postMessage({type:"requestInit",payload:null})}handleMessage=e=>{try{const t="string"==typeof e.data?JSON.parse(e.data):e.data;switch(t.type){case"requestInit":{this.userInfo=t.payload.userInfo,this.gameInfo=t.payload.gameInfo;const e=this.gameInfo?.permissionList.find((e=>e.identity==this.userInfo?.preferred_username));e&&this.requestShadow();break}case"serverGameUndate":this.updateState(t.payload);break;case"requestParam":{const e=t.payload;"startGuess"===e.requestName&&this.postMessage({type:"clientGameUpdate",payload:{shadowAnswer:e.value}});break}case"restartGame":this.resetGame()}}catch(e){}};postMessage(e){const t=JSON.stringify(e);window.parent!==window&&window.parent.postMessage(e,"*"),window.ReactNativeWebView&&window.ReactNativeWebView.postMessage(t)}updateState(e){if(!e)return;const t=this.gameState;this.gameState=e,this.gameState&&t?.shadowAnswer!==this.gameState.shadowAnswer&&this.initGame(this.gameState.shadowAnswer),this.updateShadowAnswer(this.gameState.wrongGuessCount)}initGame(e){this.wrongGuessCount=0,this.gameState={guessedShadow:[],shadowAnswer:e.trim().toUpperCase(),wrongGuessCount:0}}}const h=JSON.parse('{"section1":{"files":[]},"meta":{"app":"Phaser Editor 2D - Asset Pack Editor","contentType":"phasereditor2d.pack.core.AssetContentType","url":"https://phasereditor2d.com","version":2,"showAllFilesInBlocks":false}}');var d=s(102);class c extends d.c{constructor(e){super(e)}get gameObject(){return super.gameObject}awake(){const e=this.gameObject.width;this.scene.load.on(Phaser.Loader.Events.PROGRESS,(t=>{this.gameObject.width=e*t}))}}const l=JSON.parse('{"section1":{"files":[{"url":"https://i.imgur.com/eUFWfrZ.png","type":"image","key":"BG"},{"url":"https://i.imgur.com/69RCuPO.png","type":"image","key":"Pic_elephant"},{"url":"https://i.imgur.com/tzbttHq.png","type":"image","key":"shadow_elephant_t"},{"url":"https://i.imgur.com/VA5lQrg.png","type":"image","key":"shadow_elephant_f_1"},{"url":"https://i.imgur.com/7JRN7E7.png","type":"image","key":"shadow_elephant_f_2"},{"url":"https://i.imgur.com/Lvk13cy.png","type":"image","key":"shadow_elephant_f_3"}]},"meta":{"app":"Phaser Editor 2D - Asset Pack Editor","contentType":"phasereditor2d.pack.core.AssetContentType","url":"https://phasereditor2d.com","version":2,"showAllFilesInBlocks":false}}');class p extends Phaser.Scene{constructor(){super("Preload")}editorCreate(){const e=this.add.rectangle(553.0120849609375,361,256,20);e.setOrigin(0,0),e.isFilled=!0,e.fillColor=14737632,new c(e);const t=this.add.rectangle(553.0120849609375,361,256,20);t.setOrigin(0,0),t.fillColor=14737632,t.isStroked=!0;const s=this.add.text(552.0120849609375,329,"",{});s.text="Loading...",s.setStyle({color:"#e0e0e0",fontFamily:"arial",fontSize:"20px"}),this.events.emit("scene-awake")}preload(){this.editorCreate(),this.load.pack("asset-pack",l)}create(){this.scene.start("Level")}}class u extends i().Scene{constructor(){super("Boot")}preload(){this.load.pack("pack",h)}create(){this.scene.start("Preload")}}window.addEventListener("load",(function(){new(i().Game)({width:1280,height:720,backgroundColor:"#2f2f2f",scale:{mode:i().Scale.ScaleModes.FIT,autoCenter:i().Scale.Center.CENTER_BOTH},scene:[u,p,n]}).scene.start("Boot")}))}},s={};function a(e){var i=s[e];if(void 0!==i)return i.exports;var r=s[e]={exports:{}};return t[e].call(r.exports,r,r.exports,a),r.exports}a.m=t,e=[],a.O=(t,s,i,r)=>{if(!s){var o=1/0;for(c=0;c<e.length;c++){for(var[s,i,r]=e[c],n=!0,h=0;h<s.length;h++)(!1&r||o>=r)&&Object.keys(a.O).every((e=>a.O[e](s[h])))?s.splice(h--,1):(n=!1,r<o&&(o=r));if(n){e.splice(c--,1);var d=i();void 0!==d&&(t=d)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[s,i,r]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var s in t)a.o(t,s)&&!a.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={792:0};a.O.j=t=>0===e[t];var t=(t,s)=>{var i,r,[o,n,h]=s,d=0;if(o.some((t=>0!==e[t]))){for(i in n)a.o(n,i)&&(a.m[i]=n[i]);if(h)var c=h(a)}for(t&&t(s);d<o.length;d++)r=o[d],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(c)},s=self.webpackChunkphaser3_webpack_template=self.webpackChunkphaser3_webpack_template||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var i=a.O(void 0,[121,418],(()=>a(320)));i=a.O(i)})();