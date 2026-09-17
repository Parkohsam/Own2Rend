const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/add-Cno_7IFb.js","assets/index-CNVB7XA4.js","assets/index-XFsx_mLR.css","assets/all-wallets-1s3KddMG.js","assets/arrow-bottom-circle-CCtgs278.js","assets/app-store-B_xBr48c.js","assets/apple-DWNV_QfK.js","assets/arrow-bottom-ChWcIleU.js","assets/arrow-left-Cwgb30bZ.js","assets/arrow-right-eX-QrY2l.js","assets/arrow-top-BkfYMP1N.js","assets/bank-Dqdne5_G.js","assets/browser-B3t-Q2vO.js","assets/card-BDig2iqg.js","assets/checkmark-CNZE3hMv.js","assets/checkmark-bold-UF47j-YG.js","assets/chevron-bottom-D_4R8AoJ.js","assets/chevron-left-D-hdLS9T.js","assets/chevron-right-DNoz5o5i.js","assets/chevron-top-iazbC5Wd.js","assets/chrome-store-C4xrT5j0.js","assets/clock-CKT6couQ.js","assets/close-xXChp3m1.js","assets/compass-DkM7qklI.js","assets/coinPlaceholder-OifvfqZB.js","assets/copy-Bpn0i_u0.js","assets/cursor-QtmGvz1q.js","assets/cursor-transparent-T177KvrV.js","assets/desktop-Bc8YiY0Q.js","assets/disconnect-_xKN0pT1.js","assets/discord-CqjwZeIZ.js","assets/etherscan-B5o1pewX.js","assets/extension-CZ7qN5y-.js","assets/external-link-CoWVutal.js","assets/facebook-37v1_UEi.js","assets/farcaster-Dd4Zb9ge.js","assets/filters-BDXjaoly.js","assets/github-Bz8D699b.js","assets/google-BDQ0QM8H.js","assets/help-circle-jxGT9fXx.js","assets/image-Wl-g2aI6.js","assets/id-B_LOCGsU.js","assets/info-circle-DRIgzEKh.js","assets/lightbulb-Chb6D0Lj.js","assets/mail-Dd00hOVZ.js","assets/mobile-B8KRrfbA.js","assets/more-Ch5s1xRr.js","assets/network-placeholder-DbwFBF8H.js","assets/nftPlaceholder-tn-c-Ny6.js","assets/off-P-K5v0dG.js","assets/play-store-vUEuxvpU.js","assets/plus-F45U2X8e.js","assets/qr-code-CUqJr1Dy.js","assets/recycle-horizontal-BnUAVep6.js","assets/refresh-Db2QhBiw.js","assets/search-WNfhQO-1.js","assets/send-DKfxPsyG.js","assets/swapHorizontal-hfqB31c7.js","assets/swapHorizontalMedium-DziwRA-4.js","assets/swapHorizontalBold-B-AUK1-V.js","assets/swapHorizontalRoundedBold-C9pvaR4w.js","assets/swapVertical-BSWGRlT9.js","assets/telegram-C7SnGMVD.js","assets/three-dots-CMRQlBRy.js","assets/twitch-BlGqTyki.js","assets/x-CoFs0Njo.js","assets/twitterIcon-yNiHJUk-.js","assets/verify-3ZhNbb_V.js","assets/verify-filled-CFdzBCGN.js","assets/wallet-BZyaqWM9.js","assets/walletconnect-U1he4Cce.js","assets/wallet-placeholder-DE7pyhXT.js","assets/warning-circle-Bmrmi8hu.js","assets/info-Db814ePf.js","assets/exclamation-triangle-CnxAxwNL.js","assets/reown-logo-BP_B0Mat.js"])))=>i.map(i=>d[i]);
import{cT as S,cL as l,cN as E,cO as f,ew as W,ex as H,ey as z,ez as F,ei as i,eA as G}from"./index-CNVB7XA4.js";import{r as b,c as j,e as M}from"./core-BEjvf6gy.js";const h={getSpacingStyles(t,e){if(Array.isArray(t))return t[e]?`var(--wui-spacing-${t[e]})`:void 0;if(typeof t=="string")return`var(--wui-spacing-${t})`},getFormattedDate(t){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t)},getHostName(t){try{return new URL(t).hostname}catch{return""}},getTruncateString({string:t,charsStart:e,charsEnd:r,truncate:a}){return t.length<=e+r?t:a==="end"?`${t.substring(0,e)}...`:a==="start"?`...${t.substring(t.length-r)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(r))}`},generateAvatarColors(t){const r=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),a=this.hexToRgb(r),n=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),s=100-3*Number(n==null?void 0:n.replace("px","")),c=`${s}% ${s}% at 65% 40%`,u=[];for(let _=0;_<5;_+=1){const w=this.tintColor(a,.15*_);u.push(`rgb(${w[0]}, ${w[1]}, ${w[2]})`)}return`
    --local-color-1: ${u[0]};
    --local-color-2: ${u[1]};
    --local-color-3: ${u[2]};
    --local-color-4: ${u[3]};
    --local-color-5: ${u[4]};
    --local-radial-circle: ${c}
   `},hexToRgb(t){const e=parseInt(t,16),r=e>>16&255,a=e>>8&255,n=e&255;return[r,a,n]},tintColor(t,e){const[r,a,n]=t,o=Math.round(r+(255-r)*e),s=Math.round(a+(255-a)*e),c=Math.round(n+(255-n)*e);return[o,s,c]},isNumber(t){return{number:/^[0-9]+$/u}.number.test(t)},getColorTheme(t){var e;return t||(typeof window<"u"&&window.matchMedia?(e=window.matchMedia("(prefers-color-scheme: dark)"))!=null&&e.matches?"dark":"light":"dark")},splitBalance(t){const e=t.split(".");return e.length===2?[e[0],e[1]]:["0","00"]},roundNumber(t,e,r){return t.toString().length>=e?Number(t).toFixed(r):t},formatNumberToLocalString(t,e=2){return t===void 0?"0.00":typeof t=="number"?t.toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e}):parseFloat(t).toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e})}};function U(t,e){const{kind:r,elements:a}=e;return{kind:r,elements:a,finisher(n){customElements.get(t)||customElements.define(t,n)}}}function N(t,e){return customElements.get(t)||customElements.define(t,e),e}function x(t){return function(r){return typeof r=="function"?N(t,r):U(t,r)}}const Y=S`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var g=function(t,e,r,a){var n=arguments.length,o=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,r):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,a);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(o=(n<3?s(o):n>3?s(e,r,o):s(e,r))||o);return n>3&&o&&Object.defineProperty(e,r,o),o};let d=class extends E{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&h.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&h.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&h.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&h.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&h.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&h.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&h.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&h.getSpacingStyles(this.margin,3)};
    `,f`<slot></slot>`}};d.styles=[b,Y];g([l()],d.prototype,"flexDirection",void 0);g([l()],d.prototype,"flexWrap",void 0);g([l()],d.prototype,"flexBasis",void 0);g([l()],d.prototype,"flexGrow",void 0);g([l()],d.prototype,"flexShrink",void 0);g([l()],d.prototype,"alignItems",void 0);g([l()],d.prototype,"justifyContent",void 0);g([l()],d.prototype,"columnGap",void 0);g([l()],d.prototype,"rowGap",void 0);g([l()],d.prototype,"gap",void 0);g([l()],d.prototype,"padding",void 0);g([l()],d.prototype,"margin",void 0);d=g([x("wui-flex")],d);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class q{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class X{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??(this.Y=new Promise(e=>this.Z=e))}resume(){var e;(e=this.Z)==null||e.call(this),this.Y=this.Z=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=t=>!F(t)&&typeof t.then=="function",k=1073741823;class K extends H{constructor(){super(...arguments),this._$Cwt=k,this._$Cbt=[],this._$CK=new q(this),this._$CX=new X}render(...e){return e.find(r=>!A(r))??z}update(e,r){const a=this._$Cbt;let n=a.length;this._$Cbt=r;const o=this._$CK,s=this._$CX;this.isConnected||this.disconnected();for(let c=0;c<r.length&&!(c>this._$Cwt);c++){const u=r[c];if(!A(u))return this._$Cwt=c,u;c<n&&u===a[c]||(this._$Cwt=k,n=0,Promise.resolve(u).then(async _=>{for(;s.get();)await s.get();const w=o.deref();if(w!==void 0){const I=w._$Cbt.indexOf(u);I>-1&&I<w._$Cwt&&(w._$Cwt=I,w.setValue(_))}}))}return z}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}const Z=W(K);class J{constructor(){this.cache=new Map}set(e,r){this.cache.set(e,r)}get(e){return this.cache.get(e)}has(e){return this.cache.has(e)}delete(e){this.cache.delete(e)}clear(){this.cache.clear()}}const D=new J,Q=S`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;var T=function(t,e,r,a){var n=arguments.length,o=n<3?e:a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,a);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(o=(n<3?s(o):n>3?s(e,r,o):s(e,r))||o);return n>3&&o&&Object.defineProperty(e,r,o),o};const B={add:async()=>(await i(async()=>{const{addSvg:t}=await import("./add-Cno_7IFb.js");return{addSvg:t}},__vite__mapDeps([0,1,2]))).addSvg,allWallets:async()=>(await i(async()=>{const{allWalletsSvg:t}=await import("./all-wallets-1s3KddMG.js");return{allWalletsSvg:t}},__vite__mapDeps([3,1,2]))).allWalletsSvg,arrowBottomCircle:async()=>(await i(async()=>{const{arrowBottomCircleSvg:t}=await import("./arrow-bottom-circle-CCtgs278.js");return{arrowBottomCircleSvg:t}},__vite__mapDeps([4,1,2]))).arrowBottomCircleSvg,appStore:async()=>(await i(async()=>{const{appStoreSvg:t}=await import("./app-store-B_xBr48c.js");return{appStoreSvg:t}},__vite__mapDeps([5,1,2]))).appStoreSvg,apple:async()=>(await i(async()=>{const{appleSvg:t}=await import("./apple-DWNV_QfK.js");return{appleSvg:t}},__vite__mapDeps([6,1,2]))).appleSvg,arrowBottom:async()=>(await i(async()=>{const{arrowBottomSvg:t}=await import("./arrow-bottom-ChWcIleU.js");return{arrowBottomSvg:t}},__vite__mapDeps([7,1,2]))).arrowBottomSvg,arrowLeft:async()=>(await i(async()=>{const{arrowLeftSvg:t}=await import("./arrow-left-Cwgb30bZ.js");return{arrowLeftSvg:t}},__vite__mapDeps([8,1,2]))).arrowLeftSvg,arrowRight:async()=>(await i(async()=>{const{arrowRightSvg:t}=await import("./arrow-right-eX-QrY2l.js");return{arrowRightSvg:t}},__vite__mapDeps([9,1,2]))).arrowRightSvg,arrowTop:async()=>(await i(async()=>{const{arrowTopSvg:t}=await import("./arrow-top-BkfYMP1N.js");return{arrowTopSvg:t}},__vite__mapDeps([10,1,2]))).arrowTopSvg,bank:async()=>(await i(async()=>{const{bankSvg:t}=await import("./bank-Dqdne5_G.js");return{bankSvg:t}},__vite__mapDeps([11,1,2]))).bankSvg,browser:async()=>(await i(async()=>{const{browserSvg:t}=await import("./browser-B3t-Q2vO.js");return{browserSvg:t}},__vite__mapDeps([12,1,2]))).browserSvg,card:async()=>(await i(async()=>{const{cardSvg:t}=await import("./card-BDig2iqg.js");return{cardSvg:t}},__vite__mapDeps([13,1,2]))).cardSvg,checkmark:async()=>(await i(async()=>{const{checkmarkSvg:t}=await import("./checkmark-CNZE3hMv.js");return{checkmarkSvg:t}},__vite__mapDeps([14,1,2]))).checkmarkSvg,checkmarkBold:async()=>(await i(async()=>{const{checkmarkBoldSvg:t}=await import("./checkmark-bold-UF47j-YG.js");return{checkmarkBoldSvg:t}},__vite__mapDeps([15,1,2]))).checkmarkBoldSvg,chevronBottom:async()=>(await i(async()=>{const{chevronBottomSvg:t}=await import("./chevron-bottom-D_4R8AoJ.js");return{chevronBottomSvg:t}},__vite__mapDeps([16,1,2]))).chevronBottomSvg,chevronLeft:async()=>(await i(async()=>{const{chevronLeftSvg:t}=await import("./chevron-left-D-hdLS9T.js");return{chevronLeftSvg:t}},__vite__mapDeps([17,1,2]))).chevronLeftSvg,chevronRight:async()=>(await i(async()=>{const{chevronRightSvg:t}=await import("./chevron-right-DNoz5o5i.js");return{chevronRightSvg:t}},__vite__mapDeps([18,1,2]))).chevronRightSvg,chevronTop:async()=>(await i(async()=>{const{chevronTopSvg:t}=await import("./chevron-top-iazbC5Wd.js");return{chevronTopSvg:t}},__vite__mapDeps([19,1,2]))).chevronTopSvg,chromeStore:async()=>(await i(async()=>{const{chromeStoreSvg:t}=await import("./chrome-store-C4xrT5j0.js");return{chromeStoreSvg:t}},__vite__mapDeps([20,1,2]))).chromeStoreSvg,clock:async()=>(await i(async()=>{const{clockSvg:t}=await import("./clock-CKT6couQ.js");return{clockSvg:t}},__vite__mapDeps([21,1,2]))).clockSvg,close:async()=>(await i(async()=>{const{closeSvg:t}=await import("./close-xXChp3m1.js");return{closeSvg:t}},__vite__mapDeps([22,1,2]))).closeSvg,compass:async()=>(await i(async()=>{const{compassSvg:t}=await import("./compass-DkM7qklI.js");return{compassSvg:t}},__vite__mapDeps([23,1,2]))).compassSvg,coinPlaceholder:async()=>(await i(async()=>{const{coinPlaceholderSvg:t}=await import("./coinPlaceholder-OifvfqZB.js");return{coinPlaceholderSvg:t}},__vite__mapDeps([24,1,2]))).coinPlaceholderSvg,copy:async()=>(await i(async()=>{const{copySvg:t}=await import("./copy-Bpn0i_u0.js");return{copySvg:t}},__vite__mapDeps([25,1,2]))).copySvg,cursor:async()=>(await i(async()=>{const{cursorSvg:t}=await import("./cursor-QtmGvz1q.js");return{cursorSvg:t}},__vite__mapDeps([26,1,2]))).cursorSvg,cursorTransparent:async()=>(await i(async()=>{const{cursorTransparentSvg:t}=await import("./cursor-transparent-T177KvrV.js");return{cursorTransparentSvg:t}},__vite__mapDeps([27,1,2]))).cursorTransparentSvg,desktop:async()=>(await i(async()=>{const{desktopSvg:t}=await import("./desktop-Bc8YiY0Q.js");return{desktopSvg:t}},__vite__mapDeps([28,1,2]))).desktopSvg,disconnect:async()=>(await i(async()=>{const{disconnectSvg:t}=await import("./disconnect-_xKN0pT1.js");return{disconnectSvg:t}},__vite__mapDeps([29,1,2]))).disconnectSvg,discord:async()=>(await i(async()=>{const{discordSvg:t}=await import("./discord-CqjwZeIZ.js");return{discordSvg:t}},__vite__mapDeps([30,1,2]))).discordSvg,etherscan:async()=>(await i(async()=>{const{etherscanSvg:t}=await import("./etherscan-B5o1pewX.js");return{etherscanSvg:t}},__vite__mapDeps([31,1,2]))).etherscanSvg,extension:async()=>(await i(async()=>{const{extensionSvg:t}=await import("./extension-CZ7qN5y-.js");return{extensionSvg:t}},__vite__mapDeps([32,1,2]))).extensionSvg,externalLink:async()=>(await i(async()=>{const{externalLinkSvg:t}=await import("./external-link-CoWVutal.js");return{externalLinkSvg:t}},__vite__mapDeps([33,1,2]))).externalLinkSvg,facebook:async()=>(await i(async()=>{const{facebookSvg:t}=await import("./facebook-37v1_UEi.js");return{facebookSvg:t}},__vite__mapDeps([34,1,2]))).facebookSvg,farcaster:async()=>(await i(async()=>{const{farcasterSvg:t}=await import("./farcaster-Dd4Zb9ge.js");return{farcasterSvg:t}},__vite__mapDeps([35,1,2]))).farcasterSvg,filters:async()=>(await i(async()=>{const{filtersSvg:t}=await import("./filters-BDXjaoly.js");return{filtersSvg:t}},__vite__mapDeps([36,1,2]))).filtersSvg,github:async()=>(await i(async()=>{const{githubSvg:t}=await import("./github-Bz8D699b.js");return{githubSvg:t}},__vite__mapDeps([37,1,2]))).githubSvg,google:async()=>(await i(async()=>{const{googleSvg:t}=await import("./google-BDQ0QM8H.js");return{googleSvg:t}},__vite__mapDeps([38,1,2]))).googleSvg,helpCircle:async()=>(await i(async()=>{const{helpCircleSvg:t}=await import("./help-circle-jxGT9fXx.js");return{helpCircleSvg:t}},__vite__mapDeps([39,1,2]))).helpCircleSvg,image:async()=>(await i(async()=>{const{imageSvg:t}=await import("./image-Wl-g2aI6.js");return{imageSvg:t}},__vite__mapDeps([40,1,2]))).imageSvg,id:async()=>(await i(async()=>{const{idSvg:t}=await import("./id-B_LOCGsU.js");return{idSvg:t}},__vite__mapDeps([41,1,2]))).idSvg,infoCircle:async()=>(await i(async()=>{const{infoCircleSvg:t}=await import("./info-circle-DRIgzEKh.js");return{infoCircleSvg:t}},__vite__mapDeps([42,1,2]))).infoCircleSvg,lightbulb:async()=>(await i(async()=>{const{lightbulbSvg:t}=await import("./lightbulb-Chb6D0Lj.js");return{lightbulbSvg:t}},__vite__mapDeps([43,1,2]))).lightbulbSvg,mail:async()=>(await i(async()=>{const{mailSvg:t}=await import("./mail-Dd00hOVZ.js");return{mailSvg:t}},__vite__mapDeps([44,1,2]))).mailSvg,mobile:async()=>(await i(async()=>{const{mobileSvg:t}=await import("./mobile-B8KRrfbA.js");return{mobileSvg:t}},__vite__mapDeps([45,1,2]))).mobileSvg,more:async()=>(await i(async()=>{const{moreSvg:t}=await import("./more-Ch5s1xRr.js");return{moreSvg:t}},__vite__mapDeps([46,1,2]))).moreSvg,networkPlaceholder:async()=>(await i(async()=>{const{networkPlaceholderSvg:t}=await import("./network-placeholder-DbwFBF8H.js");return{networkPlaceholderSvg:t}},__vite__mapDeps([47,1,2]))).networkPlaceholderSvg,nftPlaceholder:async()=>(await i(async()=>{const{nftPlaceholderSvg:t}=await import("./nftPlaceholder-tn-c-Ny6.js");return{nftPlaceholderSvg:t}},__vite__mapDeps([48,1,2]))).nftPlaceholderSvg,off:async()=>(await i(async()=>{const{offSvg:t}=await import("./off-P-K5v0dG.js");return{offSvg:t}},__vite__mapDeps([49,1,2]))).offSvg,playStore:async()=>(await i(async()=>{const{playStoreSvg:t}=await import("./play-store-vUEuxvpU.js");return{playStoreSvg:t}},__vite__mapDeps([50,1,2]))).playStoreSvg,plus:async()=>(await i(async()=>{const{plusSvg:t}=await import("./plus-F45U2X8e.js");return{plusSvg:t}},__vite__mapDeps([51,1,2]))).plusSvg,qrCode:async()=>(await i(async()=>{const{qrCodeIcon:t}=await import("./qr-code-CUqJr1Dy.js");return{qrCodeIcon:t}},__vite__mapDeps([52,1,2]))).qrCodeIcon,recycleHorizontal:async()=>(await i(async()=>{const{recycleHorizontalSvg:t}=await import("./recycle-horizontal-BnUAVep6.js");return{recycleHorizontalSvg:t}},__vite__mapDeps([53,1,2]))).recycleHorizontalSvg,refresh:async()=>(await i(async()=>{const{refreshSvg:t}=await import("./refresh-Db2QhBiw.js");return{refreshSvg:t}},__vite__mapDeps([54,1,2]))).refreshSvg,search:async()=>(await i(async()=>{const{searchSvg:t}=await import("./search-WNfhQO-1.js");return{searchSvg:t}},__vite__mapDeps([55,1,2]))).searchSvg,send:async()=>(await i(async()=>{const{sendSvg:t}=await import("./send-DKfxPsyG.js");return{sendSvg:t}},__vite__mapDeps([56,1,2]))).sendSvg,swapHorizontal:async()=>(await i(async()=>{const{swapHorizontalSvg:t}=await import("./swapHorizontal-hfqB31c7.js");return{swapHorizontalSvg:t}},__vite__mapDeps([57,1,2]))).swapHorizontalSvg,swapHorizontalMedium:async()=>(await i(async()=>{const{swapHorizontalMediumSvg:t}=await import("./swapHorizontalMedium-DziwRA-4.js");return{swapHorizontalMediumSvg:t}},__vite__mapDeps([58,1,2]))).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await i(async()=>{const{swapHorizontalBoldSvg:t}=await import("./swapHorizontalBold-B-AUK1-V.js");return{swapHorizontalBoldSvg:t}},__vite__mapDeps([59,1,2]))).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await i(async()=>{const{swapHorizontalRoundedBoldSvg:t}=await import("./swapHorizontalRoundedBold-C9pvaR4w.js");return{swapHorizontalRoundedBoldSvg:t}},__vite__mapDeps([60,1,2]))).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await i(async()=>{const{swapVerticalSvg:t}=await import("./swapVertical-BSWGRlT9.js");return{swapVerticalSvg:t}},__vite__mapDeps([61,1,2]))).swapVerticalSvg,telegram:async()=>(await i(async()=>{const{telegramSvg:t}=await import("./telegram-C7SnGMVD.js");return{telegramSvg:t}},__vite__mapDeps([62,1,2]))).telegramSvg,threeDots:async()=>(await i(async()=>{const{threeDotsSvg:t}=await import("./three-dots-CMRQlBRy.js");return{threeDotsSvg:t}},__vite__mapDeps([63,1,2]))).threeDotsSvg,twitch:async()=>(await i(async()=>{const{twitchSvg:t}=await import("./twitch-BlGqTyki.js");return{twitchSvg:t}},__vite__mapDeps([64,1,2]))).twitchSvg,twitter:async()=>(await i(async()=>{const{xSvg:t}=await import("./x-CoFs0Njo.js");return{xSvg:t}},__vite__mapDeps([65,1,2]))).xSvg,twitterIcon:async()=>(await i(async()=>{const{twitterIconSvg:t}=await import("./twitterIcon-yNiHJUk-.js");return{twitterIconSvg:t}},__vite__mapDeps([66,1,2]))).twitterIconSvg,verify:async()=>(await i(async()=>{const{verifySvg:t}=await import("./verify-3ZhNbb_V.js");return{verifySvg:t}},__vite__mapDeps([67,1,2]))).verifySvg,verifyFilled:async()=>(await i(async()=>{const{verifyFilledSvg:t}=await import("./verify-filled-CFdzBCGN.js");return{verifyFilledSvg:t}},__vite__mapDeps([68,1,2]))).verifyFilledSvg,wallet:async()=>(await i(async()=>{const{walletSvg:t}=await import("./wallet-BZyaqWM9.js");return{walletSvg:t}},__vite__mapDeps([69,1,2]))).walletSvg,walletConnect:async()=>(await i(async()=>{const{walletConnectSvg:t}=await import("./walletconnect-U1he4Cce.js");return{walletConnectSvg:t}},__vite__mapDeps([70,1,2]))).walletConnectSvg,walletConnectLightBrown:async()=>(await i(async()=>{const{walletConnectLightBrownSvg:t}=await import("./walletconnect-U1he4Cce.js");return{walletConnectLightBrownSvg:t}},__vite__mapDeps([70,1,2]))).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await i(async()=>{const{walletConnectBrownSvg:t}=await import("./walletconnect-U1he4Cce.js");return{walletConnectBrownSvg:t}},__vite__mapDeps([70,1,2]))).walletConnectBrownSvg,walletPlaceholder:async()=>(await i(async()=>{const{walletPlaceholderSvg:t}=await import("./wallet-placeholder-DE7pyhXT.js");return{walletPlaceholderSvg:t}},__vite__mapDeps([71,1,2]))).walletPlaceholderSvg,warningCircle:async()=>(await i(async()=>{const{warningCircleSvg:t}=await import("./warning-circle-Bmrmi8hu.js");return{warningCircleSvg:t}},__vite__mapDeps([72,1,2]))).warningCircleSvg,x:async()=>(await i(async()=>{const{xSvg:t}=await import("./x-CoFs0Njo.js");return{xSvg:t}},__vite__mapDeps([65,1,2]))).xSvg,info:async()=>(await i(async()=>{const{infoSvg:t}=await import("./info-Db814ePf.js");return{infoSvg:t}},__vite__mapDeps([73,1,2]))).infoSvg,exclamationTriangle:async()=>(await i(async()=>{const{exclamationTriangleSvg:t}=await import("./exclamation-triangle-CnxAxwNL.js");return{exclamationTriangleSvg:t}},__vite__mapDeps([74,1,2]))).exclamationTriangleSvg,reown:async()=>(await i(async()=>{const{reownSvg:t}=await import("./reown-logo-BP_B0Mat.js");return{reownSvg:t}},__vite__mapDeps([75,1,2]))).reownSvg};async function tt(t){if(D.has(t))return D.get(t);const r=(B[t]??B.copy)();return D.set(t,r),r}let m=class extends E{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `,f`${Z(tt(this.name),f`<div class="fallback"></div>`)}`}};m.styles=[b,j,Q];T([l()],m.prototype,"size",void 0);T([l()],m.prototype,"name",void 0);T([l()],m.prototype,"color",void 0);T([l()],m.prototype,"aspectRatio",void 0);m=T([x("wui-icon")],m);const et=S`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var L=function(t,e,r,a){var n=arguments.length,o=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,r):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,a);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(o=(n<3?s(o):n>3?s(e,r,o):s(e,r))||o);return n>3&&o&&Object.defineProperty(e,r,o),o};let y=class extends E{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const e={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,f`<slot class=${G(e)}></slot>`}};y.styles=[b,et];L([l()],y.prototype,"variant",void 0);L([l()],y.prototype,"color",void 0);L([l()],y.prototype,"align",void 0);L([l()],y.prototype,"lineClamp",void 0);y=L([x("wui-text")],y);const it=S`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;var p=function(t,e,r,a){var n=arguments.length,o=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,r):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,a);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(o=(n<3?s(o):n>3?s(e,r,o):s(e,r))||o);return n>3&&o&&Object.defineProperty(e,r,o),o};let v=class extends E{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const e=this.iconSize||this.size,r=this.size==="lg",a=this.size==="xl",n=r?"12%":"16%",o=r?"xxs":a?"s":"3xl",s=this.background==="gray",c=this.background==="opaque",u=this.backgroundColor==="accent-100"&&c||this.backgroundColor==="success-100"&&c||this.backgroundColor==="error-100"&&c||this.backgroundColor==="inverse-100"&&c;let _=`var(--wui-color-${this.backgroundColor})`;return u?_=`var(--wui-icon-box-bg-${this.backgroundColor})`:s&&(_=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${_};
       --local-bg-mix: ${u||s?"100%":n};
       --local-border-radius: var(--wui-border-radius-${o});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${this.borderColor==="wui-color-bg-125"?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,f` <wui-icon color=${this.iconColor} size=${e} name=${this.icon}></wui-icon> `}};v.styles=[b,M,it];p([l()],v.prototype,"size",void 0);p([l()],v.prototype,"backgroundColor",void 0);p([l()],v.prototype,"iconColor",void 0);p([l()],v.prototype,"iconSize",void 0);p([l()],v.prototype,"background",void 0);p([l({type:Boolean})],v.prototype,"border",void 0);p([l()],v.prototype,"borderColor",void 0);p([l()],v.prototype,"icon",void 0);v=p([x("wui-icon-box")],v);const rt=S`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var O=function(t,e,r,a){var n=arguments.length,o=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,r):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,a);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(o=(n<3?s(o):n>3?s(e,r,o):s(e,r))||o);return n>3&&o&&Object.defineProperty(e,r,o),o};let R=class extends E{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,f`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};R.styles=[b,j,rt];O([l()],R.prototype,"src",void 0);O([l()],R.prototype,"alt",void 0);O([l()],R.prototype,"size",void 0);R=O([x("wui-image")],R);const ot=S`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;var V=function(t,e,r,a){var n=arguments.length,o=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,r):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,a);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(o=(n<3?s(o):n>3?s(e,r,o):s(e,r))||o);return n>3&&o&&Object.defineProperty(e,r,o),o};let $=class extends E{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const e=this.size==="md"?"mini-700":"micro-700";return f`
      <wui-text data-variant=${this.variant} variant=${e} color="inherit">
        <slot></slot>
      </wui-text>
    `}};$.styles=[b,ot];V([l()],$.prototype,"variant",void 0);V([l()],$.prototype,"size",void 0);$=V([x("wui-tag")],$);const at=S`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;var C=function(t,e,r,a){var n=arguments.length,o=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,r):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,a);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(o=(n<3?s(o):n>3?s(e,r,o):s(e,r))||o);return n>3&&o&&Object.defineProperty(e,r,o),o};let P=class extends E{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: ${this.color==="inherit"?"inherit":`var(--wui-color-${this.color})`}`,this.dataset.size=this.size,f`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};P.styles=[b,at];C([l()],P.prototype,"color",void 0);C([l()],P.prototype,"size",void 0);P=C([x("wui-loading-spinner")],P);export{h as U,x as c};
