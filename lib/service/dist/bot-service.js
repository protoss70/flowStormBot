!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.botService=t():e.botService=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=37)}([function(e,t,n){"use strict";(function(e,r){n.d(t,"a",(function(){return k})),n.d(t,"b",(function(){return O})),n.d(t,"c",(function(){return C})),n.d(t,"d",(function(){return w})),n.d(t,"e",(function(){return a})),n.d(t,"f",(function(){return o})),n.d(t,"g",(function(){return B})),n.d(t,"h",(function(){return N})),n.d(t,"i",(function(){return A})),n.d(t,"j",(function(){return j})),n.d(t,"k",(function(){return R})),n.d(t,"l",(function(){return c})),n.d(t,"m",(function(){return F})),n.d(t,"n",(function(){return T})),n.d(t,"o",(function(){return _})),n.d(t,"p",(function(){return E})),n.d(t,"q",(function(){return S})),n.d(t,"r",(function(){return q})),n.d(t,"s",(function(){return u})),n.d(t,"t",(function(){return d})),n.d(t,"u",(function(){return f})),n.d(t,"v",(function(){return D})),n.d(t,"w",(function(){return m})),n.d(t,"x",(function(){return y})),n.d(t,"y",(function(){return l})),n.d(t,"z",(function(){return h})),n.d(t,"A",(function(){return p})),n.d(t,"B",(function(){return g})),n.d(t,"C",(function(){return L})),n.d(t,"D",(function(){return M})),n.d(t,"E",(function(){return v}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const i=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},s={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){const i=e[t],s=t+1<e.length,o=s?e[t+1]:0,a=t+2<e.length,c=a?e[t+2]:0,u=i>>2,l=(3&i)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,s||(h=64)),r.push(n[u],n[l],n[h],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(i(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(s>>10)),t[r++]=String.fromCharCode(56320+(1023&s))}else{const s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){const i=n[e.charAt(t++)],s=t<e.length?n[e.charAt(t)]:0;++t;const o=t<e.length?n[e.charAt(t)]:64;++t;const a=t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==s||null==o||null==a)throw Error();const c=i<<2|s>>4;if(r.push(c),64!==o){const e=s<<4&240|o>>2;if(r.push(e),64!==a){const e=o<<6&192|a;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},o=function(e){return function(e){const t=i(e);return s.encodeByteArray(t,!0)}(e).replace(/\./g,"")},a=function(e){try{return s.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=c(e[n],t[n]));return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function u(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function l(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(u())}function h(){try{return"[object process]"===Object.prototype.toString.call(e.process)}catch(e){return!1}}function d(){return"object"==typeof self&&self.self===self}function f(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function p(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function m(){const e=u();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function g(){return!h()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function y(){try{return"object"==typeof indexedDB}catch(e){return!1}}function v(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})}function w(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const b=()=>function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==e)return e;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,I=()=>{try{return b()||(()=>{if(void 0===r||void 0===r.env)return;const e=r.env.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&a(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info("Unable to get __FIREBASE_DEFAULTS__ due to: "+e)}},_=e=>{var t,n;return null===(n=null===(t=I())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},E=e=>{const t=_(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},T=()=>{var e;return null===(e=I())||void 0===e?void 0:e.config},S=e=>{var t;return null===(t=I())||void 0===t?void 0:t["_"+e]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class k{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s=Object.assign({iss:"https://securetoken.google.com/"+n,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[o(JSON.stringify({alg:"none",type:"JWT"})),o(JSON.stringify(s)),""].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,C.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,O.prototype.create)}}class O{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?function(e,t){return e.replace(x,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}(i,n):"Error",o=`${this.serviceName}: ${s} (${r}).`;return new C(r,o,n)}}const x=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function N(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function D(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function R(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],s=t[i];if(P(n)&&P(s)){if(!R(n,s))return!1}else if(n!==s)return!1}for(const e of r)if(!n.includes(e))return!1;return!0}function P(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function L(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function M(e){const t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function F(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(e,t){const n=new U(e,t);return n.subscribe.bind(n)}class U{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=V),void 0===r.error&&(r.error=V),void 0===r.complete&&(r.complete=V);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function V(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(e,t=1e3,n=2){const r=t*Math.pow(n,e),i=Math.round(.5*r*(Math.random()-.5)*2);return Math.min(144e5,r+i)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function q(e){return e&&e._delegate?e._delegate:e}}).call(this,n(19),n(27))},function(e,t,n){"use strict";var r=n(20);const{toString:i}=Object.prototype,{getPrototypeOf:s}=Object,o=(a=Object.create(null),e=>{const t=i.call(e);return a[t]||(a[t]=t.slice(8,-1).toLowerCase())});var a;const c=e=>(e=e.toLowerCase(),t=>o(t)===e),u=e=>t=>typeof t===e,{isArray:l}=Array,h=u("undefined");const d=c("ArrayBuffer");const f=u("string"),p=u("function"),m=u("number"),g=e=>null!==e&&"object"==typeof e,y=e=>{if("object"!==o(e))return!1;const t=s(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},v=c("Date"),w=c("File"),b=c("Blob"),I=c("FileList"),_=c("URLSearchParams");function E(e,t,{allOwnKeys:n=!1}={}){if(null==e)return;let r,i;if("object"!=typeof e&&(e=[e]),l(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{const i=n?Object.getOwnPropertyNames(e):Object.keys(e),s=i.length;let o;for(r=0;r<s;r++)o=i[r],t.call(null,e[o],o,e)}}const T=(S="undefined"!=typeof Uint8Array&&s(Uint8Array),e=>S&&e instanceof S);var S;const k=c("HTMLFormElement"),A=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),C=c("RegExp"),O=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};E(n,(n,i)=>{!1!==t(n,i,e)&&(r[i]=n)}),Object.defineProperties(e,r)};t.a={isArray:l,isArrayBuffer:d,isBuffer:function(e){return null!==e&&!h(e)&&null!==e.constructor&&!h(e.constructor)&&p(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>e&&("function"==typeof FormData&&e instanceof FormData||"[object FormData]"===i.call(e)||p(e.toString)&&"[object FormData]"===e.toString()),isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&d(e.buffer),t},isString:f,isNumber:m,isBoolean:e=>!0===e||!1===e,isObject:g,isPlainObject:y,isUndefined:h,isDate:v,isFile:w,isBlob:b,isRegExp:C,isFunction:p,isStream:e=>g(e)&&p(e.pipe),isURLSearchParams:_,isTypedArray:T,isFileList:I,forEach:E,merge:function e(){const t={},n=(n,r)=>{y(t[r])&&y(n)?t[r]=e(t[r],n):y(n)?t[r]=e({},n):l(n)?t[r]=n.slice():t[r]=n};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&E(arguments[e],n);return t},extend:(e,t,n,{allOwnKeys:i}={})=>(E(t,(t,i)=>{n&&p(t)?e[i]=Object(r.a)(t,n):e[i]=t},{allOwnKeys:i}),e),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let i,o,a;const c={};if(t=t||{},null==e)return t;do{for(i=Object.getOwnPropertyNames(e),o=i.length;o-- >0;)a=i[o],r&&!r(a,e,t)||c[a]||(t[a]=e[a],c[a]=!0);e=!1!==n&&s(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:o,kindOfTest:c,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(l(e))return e;let t=e.length;if(!m(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:k,hasOwnProperty:A,hasOwnProp:A,reduceDescriptors:O,freezeMethods:e=>{O(e,(t,n)=>{const r=e[n];p(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not read-only method '"+n+"'")}))})},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach(e=>{n[e]=!0})};return l(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>(e=+e,Number.isFinite(e)?e:t)}},function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return we})),n.d(t,"c",(function(){return Oe})),n.d(t,"d",(function(){return Re})),n.d(t,"e",(function(){return Le})),n.d(t,"f",(function(){return Pe})),n.d(t,"g",(function(){return Se})),n.d(t,"h",(function(){return De})),n.d(t,"i",(function(){return mn})),n.d(t,"j",(function(){return or})),n.d(t,"k",(function(){return c})),n.d(t,"l",(function(){return cn})),n.d(t,"m",(function(){return Me})),n.d(t,"n",(function(){return Fe})),n.d(t,"o",(function(){return je})),n.d(t,"p",(function(){return I})),n.d(t,"q",(function(){return pe})),n.d(t,"r",(function(){return g})),n.d(t,"s",(function(){return Vt})),n.d(t,"t",(function(){return S})),n.d(t,"u",(function(){return Fn})),n.d(t,"v",(function(){return xn})),n.d(t,"w",(function(){return Z})),n.d(t,"y",(function(){return ot})),n.d(t,"z",(function(){return Mt})),n.d(t,"A",(function(){return ir})),n.d(t,"B",(function(){return jt})),n.d(t,"C",(function(){return at})),n.d(t,"D",(function(){return st})),n.d(t,"E",(function(){return ge})),n.d(t,"G",(function(){return ut})),n.d(t,"H",(function(){return h})),n.d(t,"I",(function(){return pt})),n.d(t,"J",(function(){return At})),n.d(t,"K",(function(){return xt})),n.d(t,"L",(function(){return Mn})),n.d(t,"M",(function(){return X})),n.d(t,"N",(function(){return Jt})),n.d(t,"O",(function(){return dt})),n.d(t,"P",(function(){return Xe})),n.d(t,"Q",(function(){return hn})),n.d(t,"R",(function(){return Sn})),n.d(t,"S",(function(){return Ln})),n.d(t,"T",(function(){return Rt})),n.d(t,"U",(function(){return Ze})),n.d(t,"V",(function(){return dn})),n.d(t,"W",(function(){return Tn})),n.d(t,"X",(function(){return Pn})),n.d(t,"Y",(function(){return mt})),n.d(t,"Z",(function(){return it})),n.d(t,"ab",(function(){return ht})),n.d(t,"bb",(function(){return qe})),n.d(t,"cb",(function(){return Je})),n.d(t,"db",(function(){return et})),n.d(t,"eb",(function(){return lt})),n.d(t,"fb",(function(){return ft})),n.d(t,"gb",(function(){return ln})),n.d(t,"hb",(function(){return En})),n.d(t,"ib",(function(){return Rn})),n.d(t,"jb",(function(){return $e})),n.d(t,"kb",(function(){return vt})),n.d(t,"lb",(function(){return wt})),n.d(t,"mb",(function(){return pn})),n.d(t,"nb",(function(){return yt})),n.d(t,"ob",(function(){return gt})),n.d(t,"pb",(function(){return ct})),n.d(t,"x",(function(){return Ir})),n.d(t,"F",(function(){return wr}));var r=n(0),i=n(5),s=n(10);function o(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}Object.create;Object.create;var a=n(9);
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},u={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};function l(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const h=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance."}},d=l,f=new r.b("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),p=new s.b("@firebase/auth");function m(e,...t){p.logLevel<=s.a.ERROR&&p.error(`Auth (${i.SDK_VERSION}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g(e,...t){throw b(e,...t)}function y(e,...t){return b(e,...t)}function v(e,t,n){const i=Object.assign(Object.assign({},d()),{[t]:n});return new r.b("auth","Firebase",i).create(t,{appName:e.name})}function w(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&g(e,"argument-error"),v(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function b(e,...t){if("string"!=typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return f.create(e,...t)}function I(e,t,...n){if(!e)throw b(t,...n)}function _(e){const t="INTERNAL ASSERTION FAILED: "+e;throw m(t),new Error(t)}function E(e,t){e||_(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T=new Map;function S(e){E(e instanceof Function,"Expected a class definition");let t=T.get(e);return t?(E(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,T.set(e,t),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function k(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function A(){return"http:"===C()||"https:"===C()}function C(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class O{constructor(e,t){this.shortDelay=e,this.longDelay=t,E(t>e,"Short delay should be less than long delay!"),this.isMobile=Object(r.y)()||Object(r.A)()}get(){return"undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(A()||Object(r.u)()||"connection"in navigator)&&!navigator.onLine?Math.min(5e3,this.shortDelay):this.isMobile?this.longDelay:this.shortDelay}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(e,t){E(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void _("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void _("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void _("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"},R=new O(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function L(e,t,n,i,s={}){return M(e,s,async()=>{let s={},o={};i&&("GET"===t?o=i:s={body:JSON.stringify(i)});const a=Object(r.C)(Object.assign({key:e.config.apiKey},o)).slice(1),c=await e._getAdditionalHeaders();return c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode),N.fetch()(j(e,e.config.apiHost,n,a),Object.assign({method:t,headers:c,referrerPolicy:"no-referrer"},s))})}async function M(e,t,n){e._canInitEmulator=!1;const i=Object.assign(Object.assign({},D),t);try{const t=new U(e),r=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=await r.json();if("needConfirmation"in s)throw V(e,"account-exists-with-different-credential",s);if(r.ok&&!("errorMessage"in s))return s;{const t=r.ok?s.errorMessage:s.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw V(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw V(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw V(e,"user-disabled",s);const a=i[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw v(e,a,o);g(e,a)}}catch(t){if(t instanceof r.c)throw t;g(e,"network-request-failed")}}async function F(e,t,n,r,i={}){const s=await L(e,t,n,r,i);return"mfaPendingCredential"in s&&g(e,"multi-factor-auth-required",{_serverResponse:s}),s}function j(e,t,n,r){const i=`${t}${n}?${r}`;return e.config.emulator?x(e.config,i):`${e.config.apiScheme}://${i}`}class U{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(y(this.auth,"network-request-failed")),R.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function V(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=y(e,t,r);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function B(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(e){return 1e3*Number(e)}function G(e){const[t,n,i]=e.split(".");if(void 0===t||void 0===n||void 0===i)return m("JWT malformed, contained fewer than 3 sections"),null;try{const e=Object(r.e)(n);return e?JSON.parse(e):(m("Failed to decode base64 JWT payload"),null)}catch(e){return m("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function K(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof r.c&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}class z{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null==e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=B(this.lastLoginAt),this.creationTime=B(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W(e){var t;const n=e.auth,r=await e.getIdToken(),i=await K(e,async function(e,t){return L(e,"POST","/v1/accounts:lookup",t)}(n,{idToken:r}));I(null==i?void 0:i.users.length,n,"internal-error");const s=i.users[0];e._notifyReloadListener(s);const a=(null===(t=s.providerUserInfo)||void 0===t?void 0:t.length)?s.providerUserInfo.map(e=>{var{providerId:t}=e,n=o(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}}):[];const c=(u=e.providerData,l=a,[...u.filter(e=>!l.some(t=>t.providerId===e.providerId)),...l]);var u,l;const h=e.isAnonymous,d=!(e.email&&s.passwordHash||(null==c?void 0:c.length)),f=!!h&&d,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new $(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(e,p)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class H{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){I(e.idToken,"internal-error"),I(void 0!==e.idToken,"internal-error"),I(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):function(e){const t=G(e);return I(t,"internal-error"),I(void 0!==t.exp,"internal-error"),I(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return I(!this.accessToken||this.refreshToken,e,"user-token-expired"),t||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){const n=await M(e,{},async()=>{const n=Object(r.C)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:s}=e.config,o=j(e,i,"/v1/token","key="+s),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",N.fetch()(o,{method:"POST",headers:a,body:n})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new H;return n&&(I("string"==typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(I("string"==typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(I("number"==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new H,this.toJSON())}_performRefresh(){return _("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(e,t){I("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Y{constructor(e){var{uid:t,auth:n,stsTokenManager:r}=e,i=o(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new z(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new $(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await K(this,this.stsTokenManager.getToken(this.auth,e));return I(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=Object(r.r)(e),i=await n.getIdToken(t),s=G(i);I(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const o="object"==typeof s.firebase?s.firebase:void 0,a=null==o?void 0:o.sign_in_provider;return{claims:s,token:i,authTime:B(q(s.auth_time)),issuedAtTime:B(q(s.iat)),expirationTime:B(q(s.exp)),signInProvider:a||null,signInSecondFactor:(null==o?void 0:o.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=Object(r.r)(e);await W(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(I(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new Y(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){I(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await W(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await K(this,async function(e,t){return L(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,r,i,s,o,a,c,u;const l=null!==(n=t.displayName)&&void 0!==n?n:void 0,h=null!==(r=t.email)&&void 0!==r?r:void 0,d=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,f=null!==(s=t.photoURL)&&void 0!==s?s:void 0,p=null!==(o=t.tenantId)&&void 0!==o?o:void 0,m=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,g=null!==(c=t.createdAt)&&void 0!==c?c:void 0,y=null!==(u=t.lastLoginAt)&&void 0!==u?u:void 0,{uid:v,emailVerified:w,isAnonymous:b,providerData:_,stsTokenManager:E}=t;I(v&&E,e,"internal-error");const T=H.fromJSON(this.name,E);I("string"==typeof v,e,"internal-error"),Q(l,e.name),Q(h,e.name),I("boolean"==typeof w,e,"internal-error"),I("boolean"==typeof b,e,"internal-error"),Q(d,e.name),Q(f,e.name),Q(p,e.name),Q(m,e.name),Q(g,e.name),Q(y,e.name);const S=new Y({uid:v,auth:e,email:h,emailVerified:w,displayName:l,isAnonymous:b,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:T,createdAt:g,lastLoginAt:y});return _&&Array.isArray(_)&&(S.providerData=_.map(e=>Object.assign({},e))),m&&(S._redirectEventId=m),S}static async _fromIdTokenResponse(e,t,n=!1){const r=new H;r.updateFromServerResponse(t);const i=new Y({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await W(i),i}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}J.type="NONE";const X=J;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(e,t,n){return`firebase:${e}:${t}:${n}`}class ee{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=Z(this.userKey,r.apiKey,i),this.fullPersistenceKey=Z("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Y._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new ee(S(X),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let i=r[0]||S(X);const s=Z(n,e.config.apiKey,e.name);let o=null;for(const n of t)try{const t=await n._get(s);if(t){const r=Y._fromJSON(e,t);n!==i&&(o=r),i=n;break}}catch(e){}const a=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch(e){}})),new ee(i,e,n)):new ee(i,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(se(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(ne(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ae(t))return"Blackberry";if(ce(t))return"Webos";if(re(t))return"Safari";if((t.includes("chrome/")||ie(t))&&!t.includes("edge/"))return"Chrome";if(oe(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function ne(e=Object(r.s)()){return/firefox\//i.test(e)}function re(e=Object(r.s)()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ie(e=Object(r.s)()){return/crios\//i.test(e)}function se(e=Object(r.s)()){return/iemobile/i.test(e)}function oe(e=Object(r.s)()){return/android/i.test(e)}function ae(e=Object(r.s)()){return/blackberry/i.test(e)}function ce(e=Object(r.s)()){return/webos/i.test(e)}function ue(e=Object(r.s)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function le(e=Object(r.s)()){return ue(e)||oe(e)||ce(e)||ae(e)||/windows phone/i.test(e)||se(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function he(e,t=[]){let n;switch(e){case"Browser":n=te(Object(r.s)());break;case"Worker":n=`${te(Object(r.s)())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${i.SDK_VERSION}/${s}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{n(e(t))}catch(e){r(e)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){t.reverse();for(const e of t)try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e,t,n){this.app=e,this.heartbeatServiceProvider=t,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new me(this),this.idTokenSubscription=new me(this),this.beforeStateQueue=new de(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=f,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=S(t)),this._initializationPromise=this.queue(async()=>{var n,r;if(!this._deleted&&(this.persistenceManager=await ee.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUser(e){var t;const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,s=null==r?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);n&&n!==s||!(null==o?void 0:o.user)||(r=o.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(e){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return I(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await W(e)}catch(e){if("auth/network-request-failed"!==(null==e?void 0:e.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?Object(r.r)(e):null;return t&&I(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&I(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(S(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new r.b("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&S(e)||this._popupRedirectResolver;I(t,this,"argument-error"),this.redirectPersistenceManager=await ee.create(this,[S(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"==typeof t?t:t.next.bind(t),s=this._isInitialized?Promise.resolve():this._initializationPromise;return I(s,this,"internal-error"),s.then(()=>i(this.currentUser)),"function"==typeof t?e.addObserver(t,n,r):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return I(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=he(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());return n&&(t["X-Firebase-Client"]=n),t}}function pe(e){return Object(r.r)(e)}class me{constructor(e){this.auth=e,this.observer=null,this.addObserver=Object(r.j)(e=>this.observer=e)}get next(){return I(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function ge(e,t,n){const r=pe(e);I(r._canInitEmulator,r,"emulator-config-failed"),I(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=!!(null==n?void 0:n.disableWarnings),s=ye(t),{host:o,port:a}=function(e){const t=ye(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:ve(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:ve(t)}}}(t),c=null===a?"":":"+a;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function ye(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function ve(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class we{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return _("not implemented")}_getIdTokenResponse(e){return _("not implemented")}_linkToIdToken(e,t){return _("not implemented")}_getReauthenticationResolver(e){return _("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function be(e,t){return L(e,"POST","/v1/accounts:resetPassword",P(e,t))}async function Ie(e,t){return L(e,"POST","/v1/accounts:update",t)}async function _e(e,t){return L(e,"POST","/v1/accounts:sendOobCode",P(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ee extends we{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Ee(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Ee(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e,t){return F(e,"POST","/v1/accounts:signInWithPassword",P(e,t))}(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e,t){return F(e,"POST","/v1/accounts:signInWithEmailLink",P(e,t))}(e,{email:this._email,oobCode:this._password});default:g(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Ie(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return async function(e,t){return F(e,"POST","/v1/accounts:signInWithEmailLink",P(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:g(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Te(e,t){return F(e,"POST","/v1/accounts:signInWithIdp",P(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se extends we{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Se(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):g("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r}=t,i=o(t,["providerId","signInMethod"]);if(!n||!r)return null;const s=new Se(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){return Te(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Te(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Te(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Object(r.C)(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke={USER_NOT_FOUND:"user-not-found"};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ae extends we{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Ae({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Ae({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return async function(e,t){return F(e,"POST","/v1/accounts:signInWithPhoneNumber",P(e,t))}(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return async function(e,t){const n=await F(e,"POST","/v1/accounts:signInWithPhoneNumber",P(e,t));if(n.temporaryProof)throw V(e,"account-exists-with-different-credential",n);return n}(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return async function(e,t){return F(e,"POST","/v1/accounts:signInWithPhoneNumber",P(e,Object.assign(Object.assign({},t),{operation:"REAUTH"})),ke)}(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new Ae({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){var t,n,i,s,o,a;const c=Object(r.D)(Object(r.m)(e)),u=null!==(t=c.apiKey)&&void 0!==t?t:null,l=null!==(n=c.oobCode)&&void 0!==n?n:null,h=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(i=c.mode)&&void 0!==i?i:null);I(u&&l&&h,"argument-error"),this.apiKey=u,this.operation=h,this.code=l,this.continueUrl=null!==(s=c.continueUrl)&&void 0!==s?s:null,this.languageCode=null!==(o=c.languageCode)&&void 0!==o?o:null,this.tenantId=null!==(a=c.tenantId)&&void 0!==a?a:null}static parseLink(e){const t=function(e){const t=Object(r.D)(Object(r.m)(e)).link,n=t?Object(r.D)(Object(r.m)(t)).deep_link_id:null,i=Object(r.D)(Object(r.m)(e)).deep_link_id;return(i?Object(r.D)(Object(r.m)(i)).link:null)||i||n||t||e}(e);try{return new Ce(t)}catch(e){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Oe{constructor(){this.providerId=Oe.PROVIDER_ID}static credential(e,t){return Ee._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Ce.parseLink(t);return I(n,"argument-error"),Ee._fromEmailAndCode(e,n.code,n.tenantId)}}Oe.PROVIDER_ID="password",Oe.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Oe.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xe{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne extends xe{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class De extends Ne{static credentialFromJSON(e){const t="string"==typeof e?JSON.parse(e):e;return I("providerId"in t&&"signInMethod"in t,"argument-error"),Se._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return I(e.idToken||e.accessToken,"argument-error"),Se._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return De.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return De.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n,oauthTokenSecret:r,pendingToken:i,nonce:s,providerId:o}=e;if(!(n||r||t||i))return null;if(!o)return null;try{return new De(o)._credential({idToken:t,accessToken:n,nonce:s,pendingToken:i})}catch(e){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re extends Ne{constructor(){super("facebook.com")}static credential(e){return Se._fromParams({providerId:Re.PROVIDER_ID,signInMethod:Re.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Re.credentialFromTaggedObject(e)}static credentialFromError(e){return Re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Re.credential(e.oauthAccessToken)}catch(e){return null}}}Re.FACEBOOK_SIGN_IN_METHOD="facebook.com",Re.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pe extends Ne{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Se._fromParams({providerId:Pe.PROVIDER_ID,signInMethod:Pe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Pe.credentialFromTaggedObject(e)}static credentialFromError(e){return Pe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Pe.credential(t,n)}catch(e){return null}}}Pe.GOOGLE_SIGN_IN_METHOD="google.com",Pe.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Le extends Ne{constructor(){super("github.com")}static credential(e){return Se._fromParams({providerId:Le.PROVIDER_ID,signInMethod:Le.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Le.credentialFromTaggedObject(e)}static credentialFromError(e){return Le.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Le.credential(e.oauthAccessToken)}catch(e){return null}}}Le.GITHUB_SIGN_IN_METHOD="github.com",Le.PROVIDER_ID="github.com";class Me extends we{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){return Te(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Te(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Te(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,pendingToken:i}=t;return n&&r&&i&&n===r?new Me(n,i):null}static _create(e,t){return new Me(e,t)}buildRequest(){return{requestUri:"http://localhost",returnSecureToken:!0,pendingToken:this.pendingToken}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe extends xe{constructor(e){I(e.startsWith("saml."),"argument-error"),super(e)}static credentialFromResult(e){return Fe.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return Fe.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=Me.fromJSON(e);return I(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:n}=e;if(!t||!n)return null;try{return Me._create(n,t)}catch(e){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je extends Ne{constructor(){super("twitter.com")}static credential(e,t){return Se._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return je.credential(t,n)}catch(e){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Ue(e,t){return F(e,"POST","/v1/accounts:signUp",P(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */je.TWITTER_SIGN_IN_METHOD="twitter.com",je.PROVIDER_ID="twitter.com";class Ve{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const i=await Y._fromIdTokenResponse(e,n,r),s=Be(n);return new Ve({user:i,providerId:s,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=Be(n);return new Ve({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function Be(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qe(e){var t;const n=pe(e);if(await n._initializationPromise,null===(t=n.currentUser)||void 0===t?void 0:t.isAnonymous)return new Ve({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await Ue(n,{returnSecureToken:!0}),i=await Ve._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge extends r.c{constructor(e,t,n,r){var i;super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,Ge.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new Ge(e,t,n,r)}}function Ke(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw Ge._fromErrorAndOperation(e,n,t,r);throw n})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(e){return new Set(e.map(({providerId:e})=>e).filter(e=>!!e))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $e(e,t){const n=Object(r.r)(e);await He(!0,n,t);const{providerUserInfo:i}=await async function(e,t){return L(e,"POST","/v1/accounts:update",t)}(n.auth,{idToken:await n.getIdToken(),deleteProvider:[t]}),s=ze(i||[]);return n.providerData=n.providerData.filter(e=>s.has(e.providerId)),s.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function We(e,t,n=!1){const r=await K(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Ve._forOperation(e,"link",r)}async function He(e,t,n){await W(t);const r=!1===e?"provider-already-linked":"no-such-provider";I(ze(t.providerData).has(n)===e,t.auth,r)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qe(e,t,n=!1){const{auth:r}=e;try{const i=await K(e,Ke(r,"reauthenticate",t,e),n);I(i.idToken,r,"internal-error");const s=G(i.idToken);I(s,r,"internal-error");const{sub:o}=s;return I(e.uid===o,r,"user-mismatch"),Ve._forOperation(e,"reauthenticate",i)}catch(e){throw"auth/user-not-found"===(null==e?void 0:e.code)&&g(r,"user-mismatch"),e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ye(e,t,n=!1){const r=await Ke(e,"signIn",t),i=await Ve._fromIdTokenResponse(e,"signIn",r);return n||await e._updateCurrentUser(i.user),i}async function Je(e,t){return Ye(pe(e),t)}async function Xe(e,t){const n=Object(r.r)(e);return await He(!1,n,t.providerId),We(n,t)}async function Ze(e,t){return Qe(Object(r.r)(e),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function et(e,t){const n=pe(e),r=await async function(e,t){return F(e,"POST","/v1/accounts:signInWithCustomToken",P(e,t))}(n,{token:t,returnSecureToken:!0}),i=await Ve._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(i.user),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?nt._fromServerResponse(e,t):g(e,"internal-error")}}class nt extends tt{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new nt(t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(e,t,n){var r;I((null===(r=n.url)||void 0===r?void 0:r.length)>0,e,"invalid-continue-uri"),I(void 0===n.dynamicLinkDomain||n.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),t.continueUrl=n.url,t.dynamicLinkDomain=n.dynamicLinkDomain,t.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(I(n.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=n.iOS.bundleId),n.android&&(I(n.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=n.android.installApp,t.androidMinimumVersionCode=n.android.minimumVersion,t.androidPackageName=n.android.packageName)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function it(e,t,n){const i=Object(r.r)(e),s={requestType:"PASSWORD_RESET",email:t};n&&rt(i,s,n),await async function(e,t){return _e(e,t)}(i,s)}async function st(e,t,n){await be(Object(r.r)(e),{oobCode:t,newPassword:n})}async function ot(e,t){await async function(e,t){return L(e,"POST","/v1/accounts:update",P(e,t))}(Object(r.r)(e),{oobCode:t})}async function at(e,t){const n=Object(r.r)(e),i=await be(n,{oobCode:t}),s=i.requestType;switch(I(s,n,"internal-error"),s){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":I(i.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":I(i.mfaInfo,n,"internal-error");default:I(i.email,n,"internal-error")}let o=null;return i.mfaInfo&&(o=tt._fromServerResponse(pe(n),i.mfaInfo)),{data:{email:("VERIFY_AND_CHANGE_EMAIL"===i.requestType?i.newEmail:i.email)||null,previousEmail:("VERIFY_AND_CHANGE_EMAIL"===i.requestType?i.email:i.newEmail)||null,multiFactorInfo:o},operation:s}}async function ct(e,t){const{data:n}=await at(Object(r.r)(e),t);return n.email}async function ut(e,t,n){const r=pe(e),i=await Ue(r,{returnSecureToken:!0,email:t,password:n}),s=await Ve._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(s.user),s}function lt(e,t,n){return Je(Object(r.r)(e),Oe.credential(t,n))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ht(e,t,n){const i=Object(r.r)(e),s={requestType:"EMAIL_SIGNIN",email:t};I(n.handleCodeInApp,i,"argument-error"),n&&rt(i,s,n),await async function(e,t){return _e(e,t)}(i,s)}function dt(e,t){const n=Ce.parseLink(t);return"EMAIL_SIGNIN"===(null==n?void 0:n.operation)}async function ft(e,t,n){const i=Object(r.r)(e),s=Oe.credentialWithLink(t,n||k());return I(s._tenantId===(i.tenantId||null),i,"tenant-id-mismatch"),Je(i,s)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function pt(e,t){const n={identifier:t,continueUri:A()?k():"http://localhost"},{signinMethods:i}=await async function(e,t){return L(e,"POST","/v1/accounts:createAuthUri",P(e,t))}(Object(r.r)(e),n);return i||[]}async function mt(e,t){const n=Object(r.r)(e),i={requestType:"VERIFY_EMAIL",idToken:await e.getIdToken()};t&&rt(n.auth,i,t);const{email:s}=await async function(e,t){return _e(e,t)}(n.auth,i);s!==e.email&&await e.reload()}async function gt(e,t,n){const i=Object(r.r)(e),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await e.getIdToken(),newEmail:t};n&&rt(i.auth,s,n);const{email:o}=await async function(e,t){return _e(e,t)}(i.auth,s);o!==e.email&&await e.reload()}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function yt(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const i=Object(r.r)(e),s={idToken:await i.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},o=await K(i,async function(e,t){return L(e,"POST","/v1/accounts:update",t)}(i.auth,s));i.displayName=o.displayName||null,i.photoURL=o.photoUrl||null;const a=i.providerData.find(({providerId:e})=>"password"===e);a&&(a.displayName=i.displayName,a.photoURL=i.photoURL),await i._updateTokensIfNecessary(o)}function vt(e,t){return bt(Object(r.r)(e),t,null)}function wt(e,t){return bt(Object(r.r)(e),null,t)}async function bt(e,t,n){const{auth:r}=e,i={idToken:await e.getIdToken(),returnSecureToken:!0};t&&(i.email=t),n&&(i.password=n);const s=await K(e,Ie(r,i));await e._updateTokensIfNecessary(s,!0)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e,t,n={}){this.isNewUser=e,this.providerId=t,this.profile=n}}class _t extends It{constructor(e,t,n,r){super(e,t,n),this.username=r}}class Et extends It{constructor(e,t){super(e,"facebook.com",t)}}class Tt extends _t{constructor(e,t){super(e,"github.com",t,"string"==typeof(null==t?void 0:t.login)?null==t?void 0:t.login:null)}}class St extends It{constructor(e,t){super(e,"google.com",t)}}class kt extends _t{constructor(e,t,n){super(e,"twitter.com",t,n)}}function At(e){const{user:t,_tokenResponse:n}=e;return t.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:function(e){var t,n;if(!e)return null;const{providerId:r}=e,i=e.rawUserInfo?JSON.parse(e.rawUserInfo):{},s=e.isNewUser||"identitytoolkit#SignupNewUserResponse"===e.kind;if(!r&&(null==e?void 0:e.idToken)){const r=null===(n=null===(t=G(e.idToken))||void 0===t?void 0:t.firebase)||void 0===n?void 0:n.sign_in_provider;if(r){return new It(s,"anonymous"!==r&&"custom"!==r?r:null)}}if(!r)return null;switch(r){case"facebook.com":return new Et(s,i);case"github.com":return new Tt(s,i);case"google.com":return new St(s,i);case"twitter.com":return new kt(s,i,e.screenName||null);case"custom":case"anonymous":return new It(s,null);default:return new It(s,r,i)}}(n)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e,t,n){this.type=e,this.credential=t,this.auth=n}static _fromIdtoken(e,t){return new Ct("enroll",e,t)}static _fromMfaPendingCredential(e){return new Ct("signin",e)}toJSON(){return{multiFactorSession:{["enroll"===this.type?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var t,n;if(null==e?void 0:e.multiFactorSession){if(null===(t=e.multiFactorSession)||void 0===t?void 0:t.pendingCredential)return Ct._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(null===(n=e.multiFactorSession)||void 0===n?void 0:n.idToken)return Ct._fromIdtoken(e.multiFactorSession.idToken)}return null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e,t,n){this.session=e,this.hints=t,this.signInResolver=n}static _fromError(e,t){const n=pe(e),r=t.customData._serverResponse,i=(r.mfaInfo||[]).map(e=>tt._fromServerResponse(n,e));I(r.mfaPendingCredential,n,"internal-error");const s=Ct._fromMfaPendingCredential(r.mfaPendingCredential);return new Ot(s,i,async e=>{const i=await e._process(n,s);delete r.mfaInfo,delete r.mfaPendingCredential;const o=Object.assign(Object.assign({},r),{idToken:i.idToken,refreshToken:i.refreshToken});switch(t.operationType){case"signIn":const e=await Ve._fromIdTokenResponse(n,t.operationType,o);return await n._updateCurrentUser(e.user),e;case"reauthenticate":return I(t.user,n,"internal-error"),Ve._forOperation(t.user,t.operationType,o);default:g(n,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function xt(e,t){var n;const i=Object(r.r)(e),s=t;return I(t.customData.operationType,i,"argument-error"),I(null===(n=s.customData._serverResponse)||void 0===n?void 0:n.mfaPendingCredential,i,"argument-error"),Ot._fromError(i,s)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(t=>tt._fromServerResponse(e.auth,t)))})}static _fromUser(e){return new Nt(e)}async getSession(){return Ct._fromIdtoken(await this.user.getIdToken(),this.user.auth)}async enroll(e,t){const n=e,r=await this.getSession(),i=await K(this.user,n._process(this.user.auth,r,t));return await this.user._updateTokensIfNecessary(i),this.user.reload()}async unenroll(e){const t="string"==typeof e?e:e.uid,n=await this.user.getIdToken(),r=await K(this.user,(i=this.user.auth,s={idToken:n,mfaEnrollmentId:t},L(i,"POST","/v2/accounts/mfaEnrollment:withdraw",P(i,s))));var i,s;this.enrolledFactors=this.enrolledFactors.filter(({uid:e})=>e!==t),await this.user._updateTokensIfNecessary(r);try{await this.user.reload()}catch(e){if("auth/user-token-expired"!==(null==e?void 0:e.code))throw e}}}const Dt=new WeakMap;function Rt(e){const t=Object(r.r)(e);return Dt.has(t)||Dt.set(t,Nt._fromUser(t)),Dt.get(t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pt{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem("__sak","1"),this.storage.removeItem("__sak"),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt extends Pt{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=function(){const e=Object(r.s)();return re(e)||ue(e)}()&&function(){try{return!(!window||window===window.top)}catch(e){return!1}}(),this.fallbackToPolling=le(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const r=this.storage.getItem(n);if(e.newValue!==r)null!==e.newValue?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!t)return}const i=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},s=this.storage.getItem(n);Object(r.w)()&&10===document.documentMode&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,10):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Lt.type="LOCAL";const Mt=Lt;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends Pt{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ft.type="SESSION";const jt=Ft;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ut{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new Ut(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!(null==s?void 0:s.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map(async e=>e(t.origin,i)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}}))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Vt(e="",t=10){let n="";for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ut.receivers=[];class Bt{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((o,a)=>{const c=Vt("",20);r.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},n);s={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Gt(){return void 0!==qt().WorkerGlobalScope&&"function"==typeof qt().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Kt="firebaseLocalStorageDb";class zt{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function $t(e,t){return e.transaction(["firebaseLocalStorage"],t?"readwrite":"readonly").objectStore("firebaseLocalStorage")}function Wt(){const e=indexedDB.open(Kt,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore("firebaseLocalStorage",{keyPath:"fbase_key"})}catch(e){n(e)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains("firebaseLocalStorage")?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(Kt);return new zt(e).toPromise()}(),t(await Wt()))})})}async function Ht(e,t,n){const r=$t(e,!0).put({fbase_key:t,value:n});return new zt(r).toPromise()}function Qt(e,t){const n=$t(e,!0).delete(t);return new zt(n).toPromise()}class Yt{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await Wt()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Gt()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ut._getInstance(Gt()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}(),!this.activeServiceWorker)return;this.sender=new Bt(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Wt();return await Ht(e,"__sak","1"),await Qt(e,"__sak"),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Ht(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=$t(e,!1).get(t),r=await new zt(n).toPromise();return void 0===r?null:r.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Qt(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=$t(e,!1).getAll();return new zt(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Yt.type="LOCAL";const Jt=Yt;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(e){return new Promise((t,n)=>{const r=document.createElement("script");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var i,s;r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=y("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",(null!==(s=null===(i=document.getElementsByTagName("head"))||void 0===i?void 0:i[0])&&void 0!==s?s:document).appendChild(r)})}function Zt(e){return`__${e}${Math.floor(1e6*Math.random())}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e){this.auth=e,this.counter=1e12,this._widgets=new Map}render(e,t){const n=this.counter;return this._widgets.set(n,new tn(e,this.auth.name,t||{})),this.counter++,n}reset(e){var t;const n=e||1e12;null===(t=this._widgets.get(n))||void 0===t||t.delete(),this._widgets.delete(n)}getResponse(e){var t;const n=e||1e12;return(null===(t=this._widgets.get(n))||void 0===t?void 0:t.getResponse())||""}async execute(e){var t;const n=e||1e12;return null===(t=this._widgets.get(n))||void 0===t||t.execute(),""}}class tn{constructor(e,t,n){this.params=n,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const r="string"==typeof e?document.getElementById(e):e;I(r,"argument-error",{appName:t}),this.container=r,this.isVisible="invisible"!==this.params.size,this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),this.timerId||(this.timerId=window.setTimeout(()=>{this.responseToken=function(e){const t=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<e;r++)t.push(n.charAt(Math.floor(Math.random()*n.length)));return t.join("")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch(e){}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch(e){}this.isVisible&&this.execute()},6e4)},500))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}const nn=Zt("rcb"),rn=new O(3e4,6e4);class sn{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(null===(e=qt().grecaptcha)||void 0===e?void 0:e.render)}load(e,t=""){return I(function(e){return e.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(e)}(t),e,"argument-error"),this.shouldResolveImmediately(t)?Promise.resolve(qt().grecaptcha):new Promise((n,i)=>{const s=qt().setTimeout(()=>{i(y(e,"network-request-failed"))},rn.get());qt()[nn]=()=>{qt().clearTimeout(s),delete qt()[nn];const r=qt().grecaptcha;if(!r)return void i(y(e,"internal-error"));const o=r.render;r.render=(e,t)=>{const n=o(e,t);return this.counter++,n},this.hostLanguage=t,n(r)};Xt("https://www.google.com/recaptcha/api.js??"+Object(r.C)({onload:nn,render:"explicit",hl:t})).catch(()=>{clearTimeout(s),i(y(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(null===(t=qt().grecaptcha)||void 0===t?void 0:t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}class on{async load(e){return new en(e)}clearedOneInstance(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an={theme:"light",type:"image"};class cn{constructor(e,t=Object.assign({},an),n){this.parameters=t,this.type="recaptcha",this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=pe(n),this.isInvisible="invisible"===this.parameters.size,I("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment");const r="string"==typeof e?document.getElementById(e):e;I(r,this.auth,"argument-error"),this.container=r,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new on:new sn,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),n=t.getResponse(e);return n||new Promise(n=>{const r=e=>{e&&(this.tokenChangeListeners.delete(r),n(e))};this.tokenChangeListeners.add(r),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise||(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e})),this.renderPromise}_reset(){this.assertNotDestroyed(),null!==this.widgetId&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){I(!this.parameters.sitekey,this.auth,"argument-error"),I(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),I("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(e=>e(t)),"function"==typeof e)e(t);else if("string"==typeof e){const n=qt()[e];"function"==typeof n&&n(t)}}}assertNotDestroyed(){I(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){I(A()&&!Gt(),this.auth,"internal-error"),await function(){let e=null;return new Promise(t=>{"complete"!==document.readyState?(e=()=>t(),window.addEventListener("load",e)):t()}).catch(t=>{throw e&&window.removeEventListener("load",e),t})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e){return(await L(e,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}(this.auth);I(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return I(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}class un{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=Ae._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function ln(e,t,n){const i=pe(e),s=await fn(i,t,Object(r.r)(n));return new un(s,e=>Je(i,e))}async function hn(e,t,n){const i=Object(r.r)(e);await He(!1,i,"phone");const s=await fn(i.auth,t,Object(r.r)(n));return new un(s,e=>Xe(i,e))}async function dn(e,t,n){const i=Object(r.r)(e),s=await fn(i.auth,t,Object(r.r)(n));return new un(s,e=>Ze(i,e))}async function fn(e,t,n){var r;const i=await n.verify();try{let s;if(I("string"==typeof i,e,"argument-error"),I("recaptcha"===n.type,e,"argument-error"),s="string"==typeof t?{phoneNumber:t}:t,"session"in s){const t=s.session;if("phoneNumber"in s){I("enroll"===t.type,e,"internal-error");return(await function(e,t){return L(e,"POST","/v2/accounts/mfaEnrollment:start",P(e,t))}(e,{idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo}{I("signin"===t.type,e,"internal-error");const n=(null===(r=s.multiFactorHint)||void 0===r?void 0:r.uid)||s.multiFactorUid;I(n,e,"missing-multi-factor-info");return(await function(e,t){return L(e,"POST","/v2/accounts/mfaSignIn:start",P(e,t))}(e,{mfaPendingCredential:t.credential,mfaEnrollmentId:n,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}{const{sessionInfo:t}=await async function(e,t){return L(e,"POST","/v1/accounts:sendVerificationCode",P(e,t))}(e,{phoneNumber:s.phoneNumber,recaptchaToken:i});return t}}finally{n._reset()}}async function pn(e,t){await We(Object(r.r)(e),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){this.providerId=mn.PROVIDER_ID,this.auth=pe(e)}verifyPhoneNumber(e,t){return fn(this.auth,e,Object(r.r)(t))}static credential(e,t){return Ae._fromVerification(e,t)}static credentialFromResult(e){const t=e;return mn.credentialFromTaggedObject(t)}static credentialFromError(e){return mn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?Ae._fromTokenResponse(t,n):null}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function gn(e,t){return t?S(t):(I(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mn.PROVIDER_ID="phone",mn.PHONE_SIGN_IN_METHOD="phone";class yn extends we{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Te(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Te(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Te(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function vn(e){return Ye(e.auth,new yn(e),e.bypassAuthState)}function wn(e){const{auth:t,user:n}=e;return I(n,t,"internal-error"),Qe(n,new yn(e),e.bypassAuthState)}async function bn(e){const{auth:t,user:n}=e;return I(n,t,"internal-error"),We(n,new yn(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return vn;case"linkViaPopup":case"linkViaRedirect":return bn;case"reauthViaPopup":case"reauthViaRedirect":return wn;default:g(this.auth,"internal-error")}}resolve(e){E(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){E(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=new O(2e3,1e4);async function En(e,t,n){const r=pe(e);w(e,t,xe);const i=gn(r,n);return new kn(r,"signInViaPopup",t,i).executeNotNull()}async function Tn(e,t,n){const i=Object(r.r)(e);w(i.auth,t,xe);const s=gn(i.auth,n);return new kn(i.auth,"reauthViaPopup",t,s,i).executeNotNull()}async function Sn(e,t,n){const i=Object(r.r)(e);w(i.auth,t,xe);const s=gn(i.auth,n);return new kn(i.auth,"linkViaPopup",t,s,i).executeNotNull()}class kn extends In{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,kn.currentPopupAction&&kn.currentPopupAction.cancel(),kn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return I(e,this.auth,"internal-error"),e}async onExecution(){E(1===this.filter.length,"Popup operations only handle one event");const e=Vt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(y(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(y(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,kn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(y(this.auth,"popup-closed-by-user"))},2e3):this.pollId=window.setTimeout(e,_n.get())};e()}}kn.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const An=new Map;class Cn extends In{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=An.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=Dn(t),r=Nn(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}An.set(this.auth._key(),e)}return this.bypassAuthState||An.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function On(e,t){return Nn(e)._set(Dn(t),"true")}function xn(e,t){An.set(e._key(),t)}function Nn(e){return S(e._redirectPersistence)}function Dn(e){return Z("pendingRedirect",e.config.apiKey,e.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(e,t,n){return async function(e,t,n){const r=pe(e);w(e,t,xe);const i=gn(r,n);return await On(i,r),i._openRedirect(r,t,"signInViaRedirect")}(e,t,n)}function Pn(e,t,n){return async function(e,t,n){const i=Object(r.r)(e);w(i.auth,t,xe);const s=gn(i.auth,n);await On(s,i.auth);const o=await jn(i);return s._openRedirect(i.auth,t,"reauthViaRedirect",o)}(e,t,n)}function Ln(e,t,n){return async function(e,t,n){const i=Object(r.r)(e);w(i.auth,t,xe);const s=gn(i.auth,n);await He(!1,i,t.providerId),await On(s,i.auth);const o=await jn(i);return s._openRedirect(i.auth,t,"linkViaRedirect",o)}(e,t,n)}async function Mn(e,t){return await pe(e)._initializationPromise,Fn(e,t,!1)}async function Fn(e,t,n=!1){const r=pe(e),i=gn(r,t),s=new Cn(r,i,n),o=await s.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}async function jn(e){const t=Vt(e.uid+":::");return e._redirectEventId=t,await e.auth._setRedirectUser(e),await e.auth._persistUserIfCurrent(e),t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Bn(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Bn(e)){const r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(y(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Vn(e))}saveEventToCache(e){this.cachedEventUids.add(Vn(e)),this.lastProcessedEventTime=Date.now()}}function Vn(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function Bn({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}async function qn(e,t={}){return L(e,"GET","/v1/projects",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gn=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Kn=/^https?/;function zn(e){const t=k(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!Kn.test(n))return!1;if(Gn.test(e))return r===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=new O(3e4,6e4);function Wn(){const e=qt().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}let Hn=null;function Qn(e){return Hn=Hn||function(e){return new Promise((t,n)=>{var r,i,s;function o(){Wn(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Wn(),n(y(e,"network-request-failed"))},timeout:$n.get()})}if(null===(i=null===(r=qt().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else{if(!(null===(s=qt().gapi)||void 0===s?void 0:s.load)){const t=Zt("iframefcb");return qt()[t]=()=>{gapi.load?o():n(y(e,"network-request-failed"))},Xt("https://apis.google.com/js/api.js?onload="+t).catch(e=>n(e))}o()}}).catch(e=>{throw Hn=null,e})}(e),Hn}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yn=new O(5e3,15e3),Jn={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Xn=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Zn(e){const t=e.config;I(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?x(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,s={apiKey:t.apiKey,appName:e.name,v:i.SDK_VERSION},o=Xn.get(e.config.apiHost);o&&(s.eid=o);const a=e._getFrameworks();return a.length&&(s.fw=a.join(",")),`${n}?${Object(r.C)(s).slice(1)}`}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const er={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class tr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function nr(e,t,n,i=500,s=600){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let c="";const u=Object.assign(Object.assign({},er),{width:i.toString(),height:s.toString(),top:o,left:a}),l=Object(r.s)().toLowerCase();n&&(c=ie(l)?"_blank":n),ne(l)&&(t=t||"http://localhost",u.scrollbars="yes");const h=Object.entries(u).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=Object(r.s)()){var t;return ue(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(l)&&"_self"!==c)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t||"",c),new tr(null);const d=window.open(t||"",c,h);I(d,e,"popup-blocked");try{d.focus()}catch(e){}return new tr(d)}function rr(e,t,n,s,o,a){I(e.config.authDomain,e,"auth-domain-config-required"),I(e.config.apiKey,e,"invalid-api-key");const c={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:i.SDK_VERSION,eventId:o};if(t instanceof xe){t.setDefaultLanguage(e.languageCode),c.providerId=t.providerId||"",Object(r.v)(t.getCustomParameters())||(c.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(a||{}))c[e]=t}if(t instanceof Ne){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(c.scopes=e.join(","))}e.tenantId&&(c.tid=e.tenantId);const u=c;for(const e of Object.keys(u))void 0===u[e]&&delete u[e];return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/__/auth/handler`;return x(e,"emulator/auth/handler")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)}?${Object(r.C)(u).slice(1)}`}const ir=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=jt,this._completeRedirectFn=Fn,this._overrideRedirectResult=xn}async _openPopup(e,t,n,r){var i;E(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");return nr(e,rr(e,t,n,k(),r),Vt())}async _openRedirect(e,t,n,r){var i;return await this._originValidation(e),i=rr(e,t,n,k(),r),qt().location.href=i,new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(E(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await async function(e){const t=await Qn(e),n=qt().gapi;return I(n,e,"internal-error"),t.open({where:document.body,url:Zn(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Jn,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=y(e,"network-request-failed"),s=qt().setTimeout(()=>{r(i)},Yn.get());function o(){qt().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{r(i)})}))}(e),n=new Un(e);return t.register("authEvent",t=>{I(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send("webStorageSupport",{type:"webStorageSupport"},n=>{var r;const i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r.webStorageSupport;void 0!==i&&t(!!i),g(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=async function(e){if(e.config.emulator)return;const{authorizedDomains:t}=await qn(e);for(const e of t)try{if(zn(e))return}catch(e){}g(e,"unauthorized-domain")}(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return le()||re()||ue()}};class sr extends class{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return _("unexpected MultiFactorSessionType")}}}{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new sr(e)}_finalizeEnroll(e,t,n){return function(e,t){return L(e,"POST","/v2/accounts/mfaEnrollment:finalize",P(e,t))}(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return function(e,t){return L(e,"POST","/v2/accounts/mfaSignIn:finalize",P(e,t))}(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class or{constructor(){}static assertion(e){return sr._fromCredential(e)}}or.FACTOR_ID="phone";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ar{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){I(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object(r.q)("authIdTokenMaxAge");var cr;
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ur(){return window}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */cr="Browser",Object(i._registerComponent)(new a.a("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),{apiKey:i,authDomain:s}=n.options;return((e,n)=>{I(i&&!i.includes(":"),"invalid-api-key",{appName:e.name}),I(!(null==s?void 0:s.includes(":")),"argument-error",{appName:e.name});const r={apiKey:i,authDomain:s,clientPlatform:cr,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:he(cr)},o=new fe(e,n,r);return function(e,t){const n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(S);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(o,t),o})(n,r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Object(i._registerComponent)(new a.a("auth-internal",e=>(e=>new ar(e))(pe(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),Object(i.registerVersion)("@firebase/auth","0.21.0",function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(cr)),Object(i.registerVersion)("@firebase/auth","0.21.0","esm2017");async function lr(e,t,n){var r;const{BuildInfo:i}=ur();E(t.sessionId,"AuthEvent did not contain a session ID");const s=await async function(e){const t=function(e){if(E(/[0-9a-zA-Z]+/.test(e),"Can only convert alpha-numeric strings"),"undefined"!=typeof TextEncoder)return(new TextEncoder).encode(e);const t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let t=0;t<e.length;t++)n[t]=e.charCodeAt(t);return n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(e=>e.toString(16).padStart(2,"0")).join("")}(t.sessionId),o={};return ue()?o.ibi=i.packageName:oe()?o.apn=i.packageName:g(e,"operation-not-supported-in-this-environment"),i.displayName&&(o.appDisplayName=i.displayName),o.sessionId=s,rr(e,n,t.type,void 0,null!==(r=t.eventId)&&void 0!==r?r:void 0,o)}function hr(e){const{cordova:t}=ur();return new Promise(n=>{t.plugins.browsertab.isAvailable(i=>{let s=null;i?t.plugins.browsertab.openUrl(e):s=t.InAppBrowser.open(e,function(e=Object(r.s)()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(e)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(e)}()?"_blank":"_system","location=yes"),n(s)})})}class dr extends Un{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInialized(),this.passiveListeners.forEach(t=>t(e)),super.onEvent(e)}async initialized(){await this.initPromise}}async function fr(e){const t=await gr()._get(yr(e));return t&&await gr()._remove(yr(e)),t}function pr(e,t){var n,r;const i=function(e){const t=vr(e),n=t.link?decodeURIComponent(t.link):void 0,r=vr(n).link,i=t.deep_link_id?decodeURIComponent(t.deep_link_id):void 0;return vr(i).link||i||r||n||e}(t);if(i.includes("/__/auth/callback")){const t=vr(i),s=t.firebaseError?function(e){try{return JSON.parse(e)}catch(e){return null}}(decodeURIComponent(t.firebaseError)):null,o=null===(r=null===(n=null==s?void 0:s.code)||void 0===n?void 0:n.split("auth/"))||void 0===r?void 0:r[1],a=o?y(o):null;return a?{type:e.type,eventId:e.eventId,tenantId:e.tenantId,error:a,urlResponse:null,sessionId:null,postBody:null}:{type:e.type,eventId:e.eventId,tenantId:e.tenantId,sessionId:e.sessionId,urlResponse:i,postBody:null}}return null}function mr(){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<20;n++){const n=Math.floor(Math.random()*t.length);e.push(t.charAt(n))}return e.join("")}function gr(){return S(Mt)}function yr(e){return Z("authEvent",e.config.apiKey,e.name)}function vr(e){if(!(null==e?void 0:e.includes("?")))return{};const[t,...n]=e.split("?");return Object(r.D)(n.join("?"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wr=class{constructor(){this._redirectPersistence=jt,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=Fn,this._overrideRedirectResult=xn}async _initialize(e){const t=e._key();let n=this.eventManagers.get(t);return n||(n=new dr(e),this.eventManagers.set(t,n),this.attachCallbackListeners(e,n)),n}_openPopup(e){g(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,t,n,r){!function(e){var t,n,r,i,s,o,a,c,u,l;const h=ur();I("function"==typeof(null===(t=null==h?void 0:h.universalLinks)||void 0===t?void 0:t.subscribe),e,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),I(void 0!==(null===(n=null==h?void 0:h.BuildInfo)||void 0===n?void 0:n.packageName),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),I("function"==typeof(null===(s=null===(i=null===(r=null==h?void 0:h.cordova)||void 0===r?void 0:r.plugins)||void 0===i?void 0:i.browsertab)||void 0===s?void 0:s.openUrl),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),I("function"==typeof(null===(c=null===(a=null===(o=null==h?void 0:h.cordova)||void 0===o?void 0:o.plugins)||void 0===a?void 0:a.browsertab)||void 0===c?void 0:c.isAvailable),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),I("function"==typeof(null===(l=null===(u=null==h?void 0:h.cordova)||void 0===u?void 0:u.InAppBrowser)||void 0===l?void 0:l.open),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}(e);const i=await this._initialize(e);await i.initialized(),i.resetRedirect(),An.clear(),await this._originValidation(e);const s=function(e,t,n=null){return{type:t,eventId:n,urlResponse:null,sessionId:mr(),postBody:null,tenantId:e.tenantId,error:y(e,"no-auth-event")}}(e,n,r);await function(e,t){return gr()._set(yr(e),t)}(e,s);const o=await lr(e,s,t);return async function(e,t,n){const{cordova:r}=ur();let i=()=>{};try{await new Promise((s,o)=>{let a=null;function c(){var e;s();const t=null===(e=r.plugins.browsertab)||void 0===e?void 0:e.close;"function"==typeof t&&t(),"function"==typeof(null==n?void 0:n.close)&&n.close()}function u(){a||(a=window.setTimeout(()=>{o(y(e,"redirect-cancelled-by-user"))},2e3))}function l(){"visible"===(null===document||void 0===document?void 0:document.visibilityState)&&u()}t.addPassiveListener(c),document.addEventListener("resume",u,!1),oe()&&document.addEventListener("visibilitychange",l,!1),i=()=>{t.removePassiveListener(c),document.removeEventListener("resume",u,!1),document.removeEventListener("visibilitychange",l,!1),a&&window.clearTimeout(a)}})}finally{i()}}(e,i,await hr(o))}_isIframeWebStorageSupported(e,t){throw new Error("Method not implemented.")}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=async function(e){const{BuildInfo:t}=ur(),n={};ue()?n.iosBundleId=t.packageName:oe()?n.androidPackageName=t.packageName:g(e,"operation-not-supported-in-this-environment"),await qn(e,n)}(e)),this.originValidationPromises[t]}attachCallbackListeners(e,t){const{universalLinks:n,handleOpenURL:r,BuildInfo:i}=ur(),s=setTimeout(async()=>{await fr(e),t.onEvent(br())},500),o=async n=>{clearTimeout(s);const r=await fr(e);let i=null;r&&(null==n?void 0:n.url)&&(i=pr(r,n.url)),t.onEvent(i||br())};void 0!==n&&"function"==typeof n.subscribe&&n.subscribe(null,o);const a=r,c=i.packageName.toLowerCase()+"://";ur().handleOpenURL=async e=>{if(e.toLowerCase().startsWith(c)&&o({url:e}),"function"==typeof a)try{a(e)}catch(e){console.error(e)}}}};function br(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:y("no-auth-event")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ir(e,t){pe(e)._logFramework(t)}},function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return El})),n.d(t,"b",(function(){return Iu})),n.d(t,"c",(function(){return au})),n.d(t,"d",(function(){return Nc})),n.d(t,"e",(function(){return Al})),n.d(t,"f",(function(){return _u})),n.d(t,"g",(function(){return E})),n.d(t,"h",(function(){return Tu})),n.d(t,"i",(function(){return Cl})),n.d(t,"j",(function(){return Ol})),n.d(t,"k",(function(){return j})),n.d(t,"l",(function(){return Hl})),n.d(t,"m",(function(){return ye})),n.d(t,"n",(function(){return K})),n.d(t,"o",(function(){return G})),n.d(t,"p",(function(){return Sc})),n.d(t,"q",(function(){return b})),n.d(t,"r",(function(){return Te})),n.d(t,"s",(function(){return g})),n.d(t,"t",(function(){return Ic})),n.d(t,"u",(function(){return ql})),n.d(t,"v",(function(){return th})),n.d(t,"w",(function(){return eh})),n.d(t,"x",(function(){return pu})),n.d(t,"y",(function(){return Pc})),n.d(t,"z",(function(){return Lc})),n.d(t,"A",(function(){return xc})),n.d(t,"B",(function(){return Bl})),n.d(t,"C",(function(){return Xl})),n.d(t,"D",(function(){return yu})),n.d(t,"E",(function(){return Mc})),n.d(t,"F",(function(){return hu})),n.d(t,"G",(function(){return du})),n.d(t,"H",(function(){return gu})),n.d(t,"I",(function(){return yl})),n.d(t,"J",(function(){return gl})),n.d(t,"K",(function(){return uu})),n.d(t,"L",(function(){return zl})),n.d(t,"M",(function(){return Dl})),n.d(t,"N",(function(){return Pl})),n.d(t,"O",(function(){return Ll})),n.d(t,"P",(function(){return Ml})),n.d(t,"Q",(function(){return Fl})),n.d(t,"R",(function(){return jl})),n.d(t,"S",(function(){return nh})),n.d(t,"T",(function(){return ll})),n.d(t,"U",(function(){return hl})),n.d(t,"V",(function(){return vu})),n.d(t,"W",(function(){return wu})),n.d(t,"X",(function(){return Gl})),n.d(t,"Y",(function(){return Kl})),n.d(t,"Z",(function(){return cl})),n.d(t,"ab",(function(){return rl})),n.d(t,"bb",(function(){return jc})),n.d(t,"cb",(function(){return Fc})),n.d(t,"db",(function(){return Jl})),n.d(t,"eb",(function(){return Zl})),n.d(t,"fb",(function(){return Ul})),n.d(t,"gb",(function(){return f})),n.d(t,"hb",(function(){return Nl})),n.d(t,"ib",(function(){return pl})),n.d(t,"jb",(function(){return fl})),n.d(t,"kb",(function(){return Vl})),n.d(t,"lb",(function(){return mu})),n.d(t,"mb",(function(){return sl}));var r=n(5),i=n(9),s=n(10),o=n(0),a=n(11);const c="@firebase/firestore";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}u.UNAUTHENTICATED=new u(null),u.GOOGLE_CREDENTIALS=new u("google-credentials-uid"),u.FIRST_PARTY=new u("first-party-uid"),u.MOCK_USER=new u("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let l="9.15.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h=new s.b("@firebase/firestore");function d(){return h.logLevel}function f(e){h.setLogLevel(e)}function p(e,...t){if(h.logLevel<=s.a.DEBUG){const n=t.map(y);h.debug(`Firestore (${l}): ${e}`,...n)}}function m(e,...t){if(h.logLevel<=s.a.ERROR){const n=t.map(y);h.error(`Firestore (${l}): ${e}`,...n)}}function g(e,...t){if(h.logLevel<=s.a.WARN){const n=t.map(y);h.warn(`Firestore (${l}): ${e}`,...n)}}function y(e){if("string"==typeof e)return e;try{return t=e,JSON.stringify(t)}catch(t){return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(e="Unexpected state"){const t=`FIRESTORE (${l}) INTERNAL ASSERTION FAILED: `+e;throw m(t),new Error(t)}function w(e,t){e||v()}function b(e,t){e||v()}function I(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class E extends o.c{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization","Bearer "+e)}}class k{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(u.UNAUTHENTICATED))}shutdown(){}}class A{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class C{constructor(e){this.t=e,this.currentUser=u.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new T;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new T,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{p("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),s()};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(p("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new T)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(p("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(w("string"==typeof t.accessToken),new S(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return w(null===e||"string"==typeof e),new u(e)}}class O{constructor(e,t,n,r){this.h=e,this.l=t,this.m=n,this.g=r,this.type="FirstParty",this.user=u.FIRST_PARTY,this.p=new Map}I(){return this.g?this.g():(w(!("object"!=typeof this.h||null===this.h||!this.h.auth||!this.h.auth.getAuthHeaderValueForFirstParty)),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}}class x{constructor(e,t,n,r){this.h=e,this.l=t,this.m=n,this.g=r}getToken(){return Promise.resolve(new O(this.h,this.l,this.m,this.g))}start(e,t){e.enqueueRetryable(()=>t(u.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class N{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class D{constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}start(e,t){const n=e=>{null!=e.error&&p("FirebaseAppCheckTokenProvider","Error getting App Check token; using placeholder token instead. Error: "+e.error.message);const n=e.token!==this.A;return this.A=e.token,p("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{p("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.T.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.T.getImmediate({optional:!0});e?r(e):p("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(w("string"==typeof e.token),this.A=e.token,new N(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function R(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{static R(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const r=R(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%e.length))}return n}}function L(e,t){return e<t?-1:e>t?1:0}function M(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function F(e){return e+"\0"}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new E(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new E(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new E(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new E(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return j.fromMillis(Date.now())}static fromDate(e){return j.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new j(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?L(this.nanoseconds,e.nanoseconds):L(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.timestamp=e}static fromTimestamp(e){return new U(e)}static min(){return new U(new j(0,0))}static max(){return new U(new j(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e,t,n){void 0===t?t=0:t>e.length&&v(),void 0===n?n=e.length-t:n>e.length-t&&v(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===V.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof V?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.get(r),i=t.get(r);if(n<i)return-1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class B extends V{construct(e,t,n){return new B(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new E(_.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new B(t)}static emptyPath(){return new B([])}}const q=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class G extends V{construct(e,t,n){return new G(e,t,n)}static isValidIdentifier(e){return q.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),G.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new G(["__name__"])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new E(_.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let s=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new E(_.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new E(_.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new E(_.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new G(t)}static emptyPath(){return new G([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.path=e}static fromPath(e){return new K(B.fromString(e))}static fromName(e){return new K(B.fromString(e).popFirst(5))}static empty(){return new K(B.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===B.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return B.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new K(new B(e.slice()))}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function $(e){return e.fields.find(e=>2===e.kind)}function W(e){return e.fields.filter(e=>2!==e.kind)}z.UNKNOWN_ID=-1;class H{constructor(e,t){this.fieldPath=e,this.kind=t}}class Q{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Q(0,X.min())}}function Y(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=U.fromTimestamp(1e9===r?new j(n+1,0):new j(n,r));return new X(i,K.empty(),t)}function J(e){return new X(e.readTime,e.key,-1)}class X{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new X(U.min(),K.empty(),-1)}static max(){return new X(U.max(),K.empty(),-1)}}function Z(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=K.comparator(e.documentKey,t.documentKey),0!==n?n:L(e.largestBatchId,t.largestBatchId))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ee="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class te{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ne(e){if(e.code!==_.FAILED_PRECONDITION||e.message!==ee)throw e;p("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&v(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new re((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof re?t:re.resolve(t)}catch(e){return re.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):re.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):re.reject(t)}static resolve(e){return new re((t,n)=>{t(e)})}static reject(e){return new re((t,n)=>{n(e)})}static waitFor(e){return new re((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=re.resolve(!1);for(const n of e)t=t.next(e=>e?re.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new re((n,r)=>{const i=e.length,s=new Array(i);let o=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next(e=>{s[c]=e,++o,o===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new re((n,r)=>{const i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.P=new T,this.transaction.oncomplete=()=>{this.P.resolve()},this.transaction.onabort=()=>{t.error?this.P.reject(new ae(e,t.error)):this.P.resolve()},this.transaction.onerror=t=>{const n=de(t.target.error);this.P.reject(new ae(e,n))}}static open(e,t,n,r){try{return new ie(t,e.transaction(r,n))}catch(e){throw new ae(t,e)}}get v(){return this.P.promise}abort(e){e&&this.P.reject(e),this.aborted||(p("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}V(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new ue(t)}}class se{constructor(e,t,n){this.name=e,this.version=t,this.S=n,12.2===se.D(Object(o.s)())&&m("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return p("SimpleDb","Removing database:",e),le(window.indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!Object(o.x)())return!1;if(se.N())return!0;const e=Object(o.s)(),t=se.D(e),n=0<t&&t<10,r=se.k(e),i=0<r&&r<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static N(){var t;return void 0!==e&&"YES"===(null===(t=e.env)||void 0===t?void 0:t.O)}static M(e,t){return e.store(t)}static D(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static k(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async F(e){return this.db||(p("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{const n=e.target.result;t(n)},r.onblocked=()=>{n(new ae(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{const r=t.target.error;"VersionError"===r.name?n(new E(_.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new E(_.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new ae(e,r))},r.onupgradeneeded=e=>{p("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.S.$(t,r.transaction,e.oldVersion,this.version).next(()=>{p("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.B&&(this.db.onversionchange=e=>this.B(e)),this.db}L(e){this.B=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){const i="readonly"===t;let s=0;for(;;){++s;try{this.db=await this.F(e);const t=ie.open(this.db,e,i?"readonly":"readwrite",n),s=r(t).next(e=>(t.V(),e)).catch(e=>(t.abort(e),re.reject(e))).toPromise();return s.catch(()=>{}),await t.v,s}catch(e){const t=e,n="FirebaseError"!==t.name&&s<3;if(p("SimpleDb","Transaction failed with error:",t.message,"Retrying:",n),this.close(),!n)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}class oe{constructor(e){this.q=e,this.U=!1,this.K=null}get isDone(){return this.U}get G(){return this.K}set cursor(e){this.q=e}done(){this.U=!0}j(e){this.K=e}delete(){return le(this.q.delete())}}class ae extends E{constructor(e,t){super(_.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function ce(e){return"IndexedDbTransactionError"===e.name}class ue{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(p("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(p("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),le(n)}add(e){return p("SimpleDb","ADD",this.store.name,e,e),le(this.store.add(e))}get(e){return le(this.store.get(e)).next(t=>(void 0===t&&(t=null),p("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return p("SimpleDb","DELETE",this.store.name,e),le(this.store.delete(e))}count(){return p("SimpleDb","COUNT",this.store.name),le(this.store.count())}W(e,t){const n=this.options(e,t);if(n.index||"function"!=typeof this.store.getAll){const e=this.cursor(n),t=[];return this.H(e,(e,n)=>{t.push(n)}).next(()=>t)}{const e=this.store.getAll(n.range);return new re((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}}J(e,t){const n=this.store.getAll(e,null===t?void 0:t);return new re((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}Y(e,t){p("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.X=!1;const r=this.cursor(n);return this.H(r,(e,t,n)=>n.delete())}Z(e,t){let n;t?n=e:(n={},t=e);const r=this.cursor(n);return this.H(r,t)}tt(e){const t=this.cursor({});return new re((n,r)=>{t.onerror=e=>{const t=de(e.target.error);r(t)},t.onsuccess=t=>{const r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}H(e,t){const n=[];return new re((r,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{const i=e.target.result;if(!i)return void r();const s=new oe(i),o=t(i.primaryKey,i.value,s);if(o instanceof re){const e=o.catch(e=>(s.done(),re.reject(e)));n.push(e)}s.isDone?r():null===s.G?i.continue():i.continue(s.G)}}).next(()=>re.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.X?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function le(e){return new re((t,n)=>{e.onsuccess=e=>{const n=e.target.result;t(n)},e.onerror=e=>{const t=de(e.target.error);n(t)}})}let he=!1;function de(e){const t=se.D(Object(o.s)());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new E("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return he||(he=!0,setTimeout(()=>{throw e},0)),e}}return e}class fe{constructor(e,t){this.asyncQueue=e,this.et=t,this.task=null}start(){this.nt(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}nt(e){p("IndexBackiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{p("IndexBackiller","Documents written: "+await this.et.st())}catch(e){ce(e)?p("IndexBackiller","Ignoring IndexedDB error during index backfill: ",e):await ne(e)}await this.nt(6e4)})}}class pe{constructor(e,t){this.localStore=e,this.persistence=t}async st(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.it(t,e))}it(e,t){const n=new Set;let r=t,i=!0;return re.doWhile(()=>!0===i&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return p("IndexBackiller","Processing collection: "+t),this.rt(e,t,r).next(e=>{r-=e,n.add(t)});i=!1})).next(()=>t-r)}rt(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{const i=n.changes;return this.localStore.indexManager.updateIndexEntries(e,i).next(()=>this.ot(r,n)).next(n=>(p("IndexBackiller","Updating offset: "+n),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>i.size)}))}ot(e,t){let n=e;return t.changes.forEach((e,t)=>{const r=J(t);Z(r,n)>0&&(n=r)}),new X(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ut(e),this.ct=e=>t.writeSequenceNumber(e))}ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ct&&this.ct(e),e}}me.at=-1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ge{constructor(e,t,n,r,i,s,o,a){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class ye{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ye("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof ye&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function we(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function be(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(e){return null==e}function _e(e){return 0===e&&1/e==-1/0}function Ee(e){return"number"==typeof e&&Number.isInteger(e)&&!_e(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(){return"undefined"!=typeof atob}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.binaryString=e}static fromBase64String(e){const t=atob(e);return new Se(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new Se(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return L(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Se.EMPTY_BYTE_STRING=new Se("");const ke=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ae(e){if(w(!!e),"string"==typeof e){let t=0;const n=ke.exec(e);if(w(!!n),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Ce(e.seconds),nanos:Ce(e.nanos)}}function Ce(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Oe(e){return"string"==typeof e?Se.fromBase64String(e):Se.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Ne(e){const t=Ae(e.mapValue.fields.__local_write_time__.timestampValue);return new j(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Re={nullValue:"NULL_VALUE"};function Pe(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?xe(e)?4:We(e)?9007199254740991:10:v()}function Le(e,t){if(e===t)return!0;const n=Pe(e);if(n!==Pe(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Ne(e).isEqual(Ne(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=Ae(e.timestampValue),r=Ae(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return Oe(e.bytesValue).isEqual(Oe(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Ce(e.geoPointValue.latitude)===Ce(t.geoPointValue.latitude)&&Ce(e.geoPointValue.longitude)===Ce(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Ce(e.integerValue)===Ce(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Ce(e.doubleValue),r=Ce(t.doubleValue);return n===r?_e(n)===_e(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return M(e.arrayValue.values||[],t.arrayValue.values||[],Le);case 10:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(ve(n)!==ve(r))return!1;for(const e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!Le(n[e],r[e])))return!1;return!0}(e,t);default:return v()}}function Me(e,t){return void 0!==(e.values||[]).find(e=>Le(e,t))}function Fe(e,t){if(e===t)return 0;const n=Pe(e),r=Pe(t);if(n!==r)return L(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return L(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Ce(e.integerValue||e.doubleValue),r=Ce(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return je(e.timestampValue,t.timestampValue);case 4:return je(Ne(e),Ne(t));case 5:return L(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Oe(e),r=Oe(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){const t=L(n[e],r[e]);if(0!==t)return t}return L(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=L(Ce(e.latitude),Ce(t.latitude));return 0!==n?n:L(Ce(e.longitude),Ce(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){const n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){const t=Fe(n[e],r[e]);if(t)return t}return L(n.length,r.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===De.mapValue&&t===De.mapValue)return 0;if(e===De.mapValue)return 1;if(t===De.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let e=0;e<r.length&&e<s.length;++e){const t=L(r[e],s[e]);if(0!==t)return t;const o=Fe(n[r[e]],i[s[e]]);if(0!==o)return o}return L(r.length,s.length)}(e.mapValue,t.mapValue);default:throw v()}}function je(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return L(e,t);const n=Ae(e),r=Ae(t),i=L(n.seconds,r.seconds);return 0!==i?i:L(n.nanos,r.nanos)}function Ue(e){return function e(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(e){const t=Ae(e);return`time(${t.seconds},${t.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?Oe(t.bytesValue).toBase64():"referenceValue"in t?(r=t.referenceValue,K.fromName(r).toString()):"geoPointValue"in t?`geo(${(n=t.geoPointValue).latitude},${n.longitude})`:"arrayValue"in t?function(t){let n="[",r=!0;for(const i of t.values||[])r?r=!1:n+=",",n+=e(i);return n+"]"}(t.arrayValue):"mapValue"in t?function(t){const n=Object.keys(t.fields||{}).sort();let r="{",i=!0;for(const s of n)i?i=!1:r+=",",r+=`${s}:${e(t.fields[s])}`;return r+"}"}(t.mapValue):v();var n,r}(e)}function Ve(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function Be(e){return!!e&&"integerValue"in e}function qe(e){return!!e&&"arrayValue"in e}function Ge(e){return!!e&&"nullValue"in e}function Ke(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function ze(e){return!!e&&"mapValue"in e}function $e(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return we(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=$e(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=$e(e.arrayValue.values[n]);return t}return Object.assign({},e)}function We(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}function He(e){return"nullValue"in e?Re:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?Ve(ye.empty(),K.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?{mapValue:{}}:v()}function Qe(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?Ve(ye.empty(),K.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?{mapValue:{}}:"mapValue"in e?De:v()}function Ye(e,t){const n=Fe(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function Je(e,t){const n=Fe(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,t){this.position=e,this.inclusive=t}}function Ze(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const s=t[i],o=e.position[i];if(r=s.field.isKeyField()?K.comparator(K.fromName(o.referenceValue),n.key):Fe(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function et(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Le(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{}class nt extends tt{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new ht(e,t,n):"array-contains"===t?new mt(e,n):"in"===t?new gt(e,n):"not-in"===t?new yt(e,n):"array-contains-any"===t?new vt(e,n):new nt(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new dt(e,n):new ft(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(Fe(t,this.value)):null!==t&&Pe(this.value)===Pe(t)&&this.matchesComparison(Fe(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return v()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class rt extends tt{constructor(e,t){super(),this.filters=e,this.op=t,this.ht=null}static create(e,t){return new rt(e,t)}matches(e){return it(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.ht||(this.ht=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ht}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.lt(e=>e.isInequality());return null!==e?e.field:null}lt(e){for(const t of this.getFlattenedFilters())if(e(t))return t;return null}}function it(e){return"and"===e.op}function st(e){return"or"===e.op}function ot(e){return at(e)&&it(e)}function at(e){for(const t of e.filters)if(t instanceof rt)return!1;return!0}function ct(e,t){return e instanceof nt?function(e,t){return t instanceof nt&&e.op===t.op&&e.field.isEqual(t.field)&&Le(e.value,t.value)}(e,t):e instanceof rt?function(e,t){return t instanceof rt&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&ct(n,t.filters[r]),!0)}(e,t):void v()}function ut(e,t){const n=e.filters.concat(t);return rt.create(n,e.op)}function lt(e){return e instanceof nt?function(e){return`${e.field.canonicalString()} ${e.op} ${Ue(e.value)}`}(e):e instanceof rt?function(e){return e.op.toString()+" {"+e.getFilters().map(lt).join(" ,")+"}"}(e):"Filter"}class ht extends nt{constructor(e,t,n){super(e,t,n),this.key=K.fromName(n.referenceValue)}matches(e){const t=K.comparator(e.key,this.key);return this.matchesComparison(t)}}class dt extends nt{constructor(e,t){super(e,"in",t),this.keys=pt("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class ft extends nt{constructor(e,t){super(e,"not-in",t),this.keys=pt("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function pt(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map(e=>K.fromName(e.referenceValue))}class mt extends nt{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return qe(t)&&Me(t.arrayValue,this.value)}}class gt extends nt{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Me(this.value.arrayValue,t)}}class yt extends nt{constructor(e,t){super(e,"not-in",t)}matches(e){if(Me(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&!Me(this.value.arrayValue,t)}}class vt extends nt{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!qe(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Me(this.value.arrayValue,e))}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t="asc"){this.field=e,this.dir=t}}function bt(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e,t){this.comparator=e,this.root=t||Et.EMPTY}insert(e,t){return new It(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Et.BLACK,null,null))}remove(e){return new It(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Et.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new _t(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new _t(this.root,e,this.comparator,!1)}getReverseIterator(){return new _t(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new _t(this.root,e,this.comparator,!0)}}class _t{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Et{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:Et.RED,this.left=null!=r?r:Et.EMPTY,this.right=null!=i?i:Et.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new Et(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Et.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return Et.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Et.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Et.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw v();if(this.right.isRed())throw v();const e=this.left.check();if(e!==this.right.check())throw v();return e+(this.isRed()?0:1)}}Et.EMPTY=null,Et.RED=!0,Et.BLACK=!1,Et.EMPTY=new class{constructor(){this.size=0}get key(){throw v()}get value(){throw v()}get color(){throw v()}get left(){throw v()}get right(){throw v()}copy(e,t,n,r,i){return this}insert(e,t,n){return new Et(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tt{constructor(e){this.comparator=e,this.data=new It(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new St(this.data.getIterator())}getIteratorFrom(e){return new St(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof Tt))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Tt(this.comparator);return t.data=e,t}}class St{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function kt(e){return e.hasNext()?e.getNext():void 0}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.fields=e,e.sort(G.comparator)}static empty(){return new At([])}unionWith(e){let t=new Tt(G.comparator);for(const e of this.fields)t=t.add(e);for(const n of e)t=t.add(n);return new At(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return M(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e){this.value=e}static empty(){return new Ct({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!ze(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=$e(t)}setAll(e){let t=G.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=$e(e):r.push(i.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());ze(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Le(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];ze(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){we(t,(t,n)=>e[t]=n);for(const t of n)delete e[t]}clone(){return new Ct($e(this.value))}}function Ot(e){const t=[];return we(e.fields,(e,n)=>{const r=new G([e]);if(ze(n)){const e=Ot(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new At(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class xt{constructor(e,t,n,r,i,s,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(e){return new xt(e,0,U.min(),U.min(),U.min(),Ct.empty(),0)}static newFoundDocument(e,t,n,r){return new xt(e,1,t,U.min(),n,r,0)}static newNoDocument(e,t){return new xt(e,2,t,U.min(),U.min(),Ct.empty(),0)}static newUnknownDocument(e,t){return new xt(e,3,t,U.min(),U.min(),Ct.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ct.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ct.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof xt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new xt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t=null,n=[],r=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.ft=null}}function Dt(e,t=null,n=[],r=[],i=null,s=null,o=null){return new Nt(e,t,n,r,i,s,o)}function Rt(e){const t=I(e);if(null===t.ft){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>function e(t){if(t instanceof nt)return t.field.canonicalString()+t.op.toString()+Ue(t.value);{const n=t.filters.map(t=>e(t)).join(",");return`${t.op}(${n})`}}(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>function(e){return e.field.canonicalString()+e.dir}(e)).join(","),Ie(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>Ue(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>Ue(e)).join(",")),t.ft=e}return t.ft}function Pt(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!bt(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!ct(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!et(e.startAt,t.startAt)&&et(e.endAt,t.endAt)}function Lt(e){return K.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function Mt(e,t){return e.filters.filter(e=>e instanceof nt&&e.field.isEqual(t))}function Ft(e,t,n){let r=Re,i=!0;for(const n of Mt(e,t)){let e=Re,t=!0;switch(n.op){case"<":case"<=":e=He(n.value);break;case"==":case"in":case">=":e=n.value;break;case">":e=n.value,t=!1;break;case"!=":case"not-in":e=Re}Ye({value:r,inclusive:i},{value:e,inclusive:t})<0&&(r=e,i=t)}if(null!==n)for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){const e=n.position[s];Ye({value:r,inclusive:i},{value:e,inclusive:n.inclusive})<0&&(r=e,i=n.inclusive);break}return{value:r,inclusive:i}}function jt(e,t,n){let r=De,i=!0;for(const n of Mt(e,t)){let e=De,t=!0;switch(n.op){case">=":case">":e=Qe(n.value),t=!1;break;case"==":case"in":case"<=":e=n.value;break;case"<":e=n.value,t=!1;break;case"!=":case"not-in":e=De}Je({value:r,inclusive:i},{value:e,inclusive:t})>0&&(r=e,i=t)}if(null!==n)for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){const e=n.position[s];Je({value:r,inclusive:i},{value:e,inclusive:n.inclusive})>0&&(r=e,i=n.inclusive);break}return{value:r,inclusive:i}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,t=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.dt=null,this._t=null,this.startAt,this.endAt}}function Vt(e,t,n,r,i,s,o,a){return new Ut(e,t,n,r,i,s,o,a)}function Bt(e){return new Ut(e)}function qt(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Gt(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function Kt(e){for(const t of e.filters){const e=t.getFirstInequalityField();if(null!==e)return e}return null}function zt(e){return null!==e.collectionGroup}function $t(e){const t=I(e);if(null===t.dt){t.dt=[];const e=Kt(t),n=Gt(t);if(null!==e&&null===n)e.isKeyField()||t.dt.push(new wt(e)),t.dt.push(new wt(G.keyField(),"asc"));else{let e=!1;for(const n of t.explicitOrderBy)t.dt.push(n),n.field.isKeyField()&&(e=!0);if(!e){const e=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.dt.push(new wt(G.keyField(),e))}}}return t.dt}function Wt(e){const t=I(e);if(!t._t)if("F"===t.limitType)t._t=Dt(t.path,t.collectionGroup,$t(t),t.filters,t.limit,t.startAt,t.endAt);else{const e=[];for(const n of $t(t)){const t="desc"===n.dir?"asc":"desc";e.push(new wt(n.field,t))}const n=t.endAt?new Xe(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Xe(t.startAt.position,t.startAt.inclusive):null;t._t=Dt(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}return t._t}function Ht(e,t){t.getFirstInequalityField(),Kt(e);const n=e.filters.concat([t]);return new Ut(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Qt(e,t,n){return new Ut(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Yt(e,t){return Pt(Wt(e),Wt(t))&&e.limitType===t.limitType}function Jt(e){return`${Rt(Wt(e))}|lt:${e.limitType}`}function Xt(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>lt(e)).join(", ")}]`),Ie(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>Ue(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>Ue(e)).join(",")),`Target(${t})`}(Wt(e))}; limitType=${e.limitType})`}function Zt(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):K.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of $t(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=Ze(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,$t(e),t))&&!(e.endAt&&!function(e,t,n){const r=Ze(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,$t(e),t))}(e,t)}function en(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function tn(e){return(t,n)=>{let r=!1;for(const i of $t(e)){const e=nn(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function nn(e,t,n){const r=e.field.isKeyField()?K.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?Fe(r,i):v()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return v()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(e,t){if(e.wt){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_e(t)?"-0":t}}function sn(e){return{integerValue:""+e}}function on(e,t){return Ee(t)?sn(t):rn(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(){this._=void 0}}function cn(e,t,n){return e instanceof hn?function(e,t){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(n.fields.__previous_value__=t),{mapValue:n}}(n,t):e instanceof dn?fn(e,t):e instanceof pn?mn(e,t):function(e,t){const n=ln(e,t),r=yn(n)+yn(e.gt);return Be(n)&&Be(e.gt)?sn(r):rn(e.yt,r)}(e,t)}function un(e,t,n){return e instanceof dn?fn(e,t):e instanceof pn?mn(e,t):n}function ln(e,t){return e instanceof gn?Be(n=t)||function(e){return!!e&&"doubleValue"in e}(n)?t:{integerValue:0}:null;var n}class hn extends an{}class dn extends an{constructor(e){super(),this.elements=e}}function fn(e,t){const n=vn(t);for(const t of e.elements)n.some(e=>Le(e,t))||n.push(t);return{arrayValue:{values:n}}}class pn extends an{constructor(e){super(),this.elements=e}}function mn(e,t){let n=vn(t);for(const t of e.elements)n=n.filter(e=>!Le(e,t));return{arrayValue:{values:n}}}class gn extends an{constructor(e,t){super(),this.yt=e,this.gt=t}}function yn(e){return Ce(e.integerValue||e.doubleValue)}function vn(e){return qe(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e,t){this.field=e,this.transform=t}}class bn{constructor(e,t){this.version=e,this.transformResults=t}}class In{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new In}static exists(e){return new In(void 0,e)}static updateTime(e){return new In(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function _n(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class En{}function Tn(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Pn(e.key,In.none()):new On(e.key,e.data,In.none());{const n=e.data,r=Ct.empty();let i=new Tt(G.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new xn(e.key,r,new At(i.toArray()),In.none())}}function Sn(e,t,n){e instanceof On?function(e,t,n){const r=e.value.clone(),i=Dn(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof xn?function(e,t,n){if(!_n(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=Dn(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(Nn(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function kn(e,t,n,r){return e instanceof On?function(e,t,n,r){if(!_n(e.precondition,t))return n;const i=e.value.clone(),s=Rn(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof xn?function(e,t,n,r){if(!_n(e.precondition,t))return n;const i=Rn(e.fieldTransforms,r,t),s=t.data;return s.setAll(Nn(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):function(e,t,n){return _n(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function An(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=ln(r.transform,e||null);null!=i&&(null===n&&(n=Ct.empty()),n.set(r.field,i))}return n||null}function Cn(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&M(e,t,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof dn&&t instanceof dn||e instanceof pn&&t instanceof pn?M(e.elements,t.elements,Le):e instanceof gn&&t instanceof gn?Le(e.gt,t.gt):e instanceof hn&&t instanceof hn}(e.transform,t.transform)}(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class On extends En{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class xn extends En{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Nn(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function Dn(e,t,n){const r=new Map;w(e.length===n.length);for(let i=0;i<n.length;i++){const s=e[i],o=s.transform,a=t.data.field(s.field);r.set(s.field,un(o,a,n[i]))}return r}function Rn(e,t,n){const r=new Map;for(const i of e){const e=i.transform,s=n.data.field(i.field);r.set(i.field,cn(e,s,t))}return r}class Pn extends En{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ln extends En{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e){this.count=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fn,jn;function Un(e){switch(e){default:return v();case _.CANCELLED:case _.UNKNOWN:case _.DEADLINE_EXCEEDED:case _.RESOURCE_EXHAUSTED:case _.INTERNAL:case _.UNAVAILABLE:case _.UNAUTHENTICATED:return!1;case _.INVALID_ARGUMENT:case _.NOT_FOUND:case _.ALREADY_EXISTS:case _.PERMISSION_DENIED:case _.FAILED_PRECONDITION:case _.ABORTED:case _.OUT_OF_RANGE:case _.UNIMPLEMENTED:case _.DATA_LOSS:return!0}}function Vn(e){if(void 0===e)return m("GRPC error has no .code"),_.UNKNOWN;switch(e){case Fn.OK:return _.OK;case Fn.CANCELLED:return _.CANCELLED;case Fn.UNKNOWN:return _.UNKNOWN;case Fn.DEADLINE_EXCEEDED:return _.DEADLINE_EXCEEDED;case Fn.RESOURCE_EXHAUSTED:return _.RESOURCE_EXHAUSTED;case Fn.INTERNAL:return _.INTERNAL;case Fn.UNAVAILABLE:return _.UNAVAILABLE;case Fn.UNAUTHENTICATED:return _.UNAUTHENTICATED;case Fn.INVALID_ARGUMENT:return _.INVALID_ARGUMENT;case Fn.NOT_FOUND:return _.NOT_FOUND;case Fn.ALREADY_EXISTS:return _.ALREADY_EXISTS;case Fn.PERMISSION_DENIED:return _.PERMISSION_DENIED;case Fn.FAILED_PRECONDITION:return _.FAILED_PRECONDITION;case Fn.ABORTED:return _.ABORTED;case Fn.OUT_OF_RANGE:return _.OUT_OF_RANGE;case Fn.UNIMPLEMENTED:return _.UNIMPLEMENTED;case Fn.DATA_LOSS:return _.DATA_LOSS;default:return v()}}(jn=Fn||(Fn={}))[jn.OK=0]="OK",jn[jn.CANCELLED=1]="CANCELLED",jn[jn.UNKNOWN=2]="UNKNOWN",jn[jn.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",jn[jn.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",jn[jn.NOT_FOUND=5]="NOT_FOUND",jn[jn.ALREADY_EXISTS=6]="ALREADY_EXISTS",jn[jn.PERMISSION_DENIED=7]="PERMISSION_DENIED",jn[jn.UNAUTHENTICATED=16]="UNAUTHENTICATED",jn[jn.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",jn[jn.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",jn[jn.ABORTED=10]="ABORTED",jn[jn.OUT_OF_RANGE=11]="OUT_OF_RANGE",jn[jn.UNIMPLEMENTED=12]="UNIMPLEMENTED",jn[jn.INTERNAL=13]="INTERNAL",jn[jn.UNAVAILABLE=14]="UNAVAILABLE",jn[jn.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Bn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[t,r]of n)if(this.equalsFn(t,e))return r}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){we(this.inner,(t,n)=>{for(const[t,r]of n)e(t,r)})}isEmpty(){return be(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn=new It(K.comparator);function Gn(){return qn}const Kn=new It(K.comparator);function zn(...e){let t=Kn;for(const n of e)t=t.insert(n.key,n);return t}function $n(e){let t=Kn;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Wn(){return Qn()}function Hn(){return Qn()}function Qn(){return new Bn(e=>e.toString(),(e,t)=>e.isEqual(t))}const Yn=new It(K.comparator),Jn=new Tt(K.comparator);function Xn(...e){let t=Jn;for(const n of e)t=t.add(n);return t}const Zn=new Tt(L);function er(){return Zn}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,nr.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new tr(U.min(),r,er(),Gn(),Xn())}}class nr{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new nr(n,t,Xn(),Xn(),Xn())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e,t,n,r){this.It=e,this.removedTargetIds=t,this.key=n,this.Tt=r}}class ir{constructor(e,t){this.targetId=e,this.Et=t}}class sr{constructor(e,t,n=Se.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class or{constructor(){this.At=0,this.Rt=ur(),this.bt=Se.EMPTY_BYTE_STRING,this.Pt=!1,this.vt=!0}get current(){return this.Pt}get resumeToken(){return this.bt}get Vt(){return 0!==this.At}get St(){return this.vt}Dt(e){e.approximateByteSize()>0&&(this.vt=!0,this.bt=e)}Ct(){let e=Xn(),t=Xn(),n=Xn();return this.Rt.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:v()}}),new nr(this.bt,this.Pt,e,t,n)}xt(){this.vt=!1,this.Rt=ur()}Nt(e,t){this.vt=!0,this.Rt=this.Rt.insert(e,t)}kt(e){this.vt=!0,this.Rt=this.Rt.remove(e)}Ot(){this.At+=1}Mt(){this.At-=1}Ft(){this.vt=!0,this.Pt=!0}}class ar{constructor(e){this.$t=e,this.Bt=new Map,this.Lt=Gn(),this.qt=cr(),this.Ut=new Tt(L)}Kt(e){for(const t of e.It)e.Tt&&e.Tt.isFoundDocument()?this.Gt(t,e.Tt):this.Qt(t,e.key,e.Tt);for(const t of e.removedTargetIds)this.Qt(t,e.key,e.Tt)}jt(e){this.forEachTarget(e,t=>{const n=this.Wt(t);switch(e.state){case 0:this.zt(t)&&n.Dt(e.resumeToken);break;case 1:n.Mt(),n.Vt||n.xt(),n.Dt(e.resumeToken);break;case 2:n.Mt(),n.Vt||this.removeTarget(t);break;case 3:this.zt(t)&&(n.Ft(),n.Dt(e.resumeToken));break;case 4:this.zt(t)&&(this.Ht(t),n.Dt(e.resumeToken));break;default:v()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Bt.forEach((e,n)=>{this.zt(n)&&t(n)})}Jt(e){const t=e.targetId,n=e.Et.count,r=this.Yt(t);if(r){const e=r.target;if(Lt(e))if(0===n){const n=new K(e.path);this.Qt(t,n,xt.newNoDocument(n,U.min()))}else w(1===n);else this.Xt(t)!==n&&(this.Ht(t),this.Ut=this.Ut.add(t))}}Zt(e){const t=new Map;this.Bt.forEach((n,r)=>{const i=this.Yt(r);if(i){if(n.current&&Lt(i.target)){const t=new K(i.target.path);null!==this.Lt.get(t)||this.te(r,t)||this.Qt(r,t,xt.newNoDocument(t,e))}n.St&&(t.set(r,n.Ct()),n.xt())}});let n=Xn();this.qt.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.Yt(e);return!t||2===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.Lt.forEach((t,n)=>n.setReadTime(e));const r=new tr(e,t,this.Ut,this.Lt,n);return this.Lt=Gn(),this.qt=cr(),this.Ut=new Tt(L),r}Gt(e,t){if(!this.zt(e))return;const n=this.te(e,t.key)?2:0;this.Wt(e).Nt(t.key,n),this.Lt=this.Lt.insert(t.key,t),this.qt=this.qt.insert(t.key,this.ee(t.key).add(e))}Qt(e,t,n){if(!this.zt(e))return;const r=this.Wt(e);this.te(e,t)?r.Nt(t,1):r.kt(t),this.qt=this.qt.insert(t,this.ee(t).delete(e)),n&&(this.Lt=this.Lt.insert(t,n))}removeTarget(e){this.Bt.delete(e)}Xt(e){const t=this.Wt(e).Ct();return this.$t.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ot(e){this.Wt(e).Ot()}Wt(e){let t=this.Bt.get(e);return t||(t=new or,this.Bt.set(e,t)),t}ee(e){let t=this.qt.get(e);return t||(t=new Tt(L),this.qt=this.qt.insert(e,t)),t}zt(e){const t=null!==this.Yt(e);return t||p("WatchChangeAggregator","Detected inactive target",e),t}Yt(e){const t=this.Bt.get(e);return t&&t.Vt?null:this.$t.ne(e)}Ht(e){this.Bt.set(e,new or),this.$t.getRemoteKeysForTarget(e).forEach(t=>{this.Qt(e,t,null)})}te(e,t){return this.$t.getRemoteKeysForTarget(e).has(t)}}function cr(){return new It(K.comparator)}function ur(){return new It(K.comparator)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lr={asc:"ASCENDING",desc:"DESCENDING"},hr={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},dr={and:"AND",or:"OR"};class fr{constructor(e,t){this.databaseId=e,this.wt=t}}function pr(e,t){return e.wt?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function mr(e,t){return e.wt?t.toBase64():t.toUint8Array()}function gr(e,t){return pr(e,t.toTimestamp())}function yr(e){return w(!!e),U.fromTimestamp(function(e){const t=Ae(e);return new j(t.seconds,t.nanos)}(e))}function vr(e,t){return function(e){return new B(["projects",e.projectId,"databases",e.database])}(e).child("documents").child(t).canonicalString()}function wr(e){const t=B.fromString(e);return w(Ur(t)),t}function br(e,t){return vr(e.databaseId,t.path)}function Ir(e,t){const n=wr(t);if(n.get(1)!==e.databaseId.projectId)throw new E(_.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new E(_.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new K(Sr(n))}function _r(e,t){return vr(e.databaseId,t)}function Er(e){const t=wr(e);return 4===t.length?B.emptyPath():Sr(t)}function Tr(e){return new B(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Sr(e){return w(e.length>4&&"documents"===e.get(4)),e.popFirst(5)}function kr(e,t,n){return{name:br(e,t),fields:n.value.mapValue.fields}}function Ar(e,t,n){const r=Ir(e,t.name),i=yr(t.updateTime),s=t.createTime?yr(t.createTime):U.min(),o=new Ct({mapValue:{fields:t.fields}}),a=xt.newFoundDocument(r,i,s,o);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}function Cr(e,t){let n;if(t instanceof On)n={update:kr(e,t.key,t.value)};else if(t instanceof Pn)n={delete:br(e,t.key)};else if(t instanceof xn)n={update:kr(e,t.key,t.data),updateMask:jr(t.fieldMask)};else{if(!(t instanceof Ln))return v();n={verify:br(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof hn)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof dn)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof pn)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof gn)return{fieldPath:t.field.canonicalString(),increment:n.gt};throw v()}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:gr(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:v()}(e,t.precondition)),n}function Or(e,t){const n=t.currentDocument?function(e){return void 0!==e.updateTime?In.updateTime(yr(e.updateTime)):void 0!==e.exists?In.exists(e.exists):In.none()}(t.currentDocument):In.none(),r=t.updateTransforms?t.updateTransforms.map(t=>function(e,t){let n=null;if("setToServerValue"in t)w("REQUEST_TIME"===t.setToServerValue),n=new hn;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];n=new dn(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];n=new pn(e)}else"increment"in t?n=new gn(e,t.increment):v();const r=G.fromServerFormat(t.fieldPath);return new wn(r,n)}(e,t)):[];if(t.update){t.update.name;const i=Ir(e,t.update.name),s=new Ct({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=function(e){const t=e.fieldPaths||[];return new At(t.map(e=>G.fromServerFormat(e)))}(t.updateMask);return new xn(i,s,e,n,r)}return new On(i,s,n,r)}if(t.delete){const r=Ir(e,t.delete);return new Pn(r,n)}if(t.verify){const r=Ir(e,t.verify);return new Ln(r,n)}return v()}function xr(e,t){return{documents:[_r(e,t.path)]}}function Nr(e,t){const n={structuredQuery:{}},r=t.path;null!==t.collectionGroup?(n.parent=_r(e,r),n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(n.parent=_r(e,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const i=function(e){if(0!==e.length)return function e(t){return t instanceof nt?function(e){if("=="===e.op){if(Ke(e.value))return{unaryFilter:{field:Mr(e.field),op:"IS_NAN"}};if(Ge(e.value))return{unaryFilter:{field:Mr(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Ke(e.value))return{unaryFilter:{field:Mr(e.field),op:"IS_NOT_NAN"}};if(Ge(e.value))return{unaryFilter:{field:Mr(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Mr(e.field),op:Pr(e.op),value:e.value}}}(t):t instanceof rt?function(t){const n=t.getFilters().map(t=>e(t));return 1===n.length?n[0]:{compositeFilter:{op:Lr(t.op),filters:n}}}(t):v()}(rt.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const s=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:Mr(e.field),direction:Rr(e.dir)}}(e))}(t.orderBy);s&&(n.structuredQuery.orderBy=s);const o=function(e,t){return e.wt||Ie(t)?t:{value:t}}(e,t.limit);var a;return null!==o&&(n.structuredQuery.limit=o),t.startAt&&(n.structuredQuery.startAt={before:(a=t.startAt).inclusive,values:a.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),n}function Dr(e){let t=Er(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){w(1===r);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let s=[];n.where&&(s=function(e){const t=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Fr(e.unaryFilter.field);return nt.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Fr(e.unaryFilter.field);return nt.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Fr(e.unaryFilter.field);return nt.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Fr(e.unaryFilter.field);return nt.create(i,"!=",{nullValue:"NULL_VALUE"});default:return v()}}(t):void 0!==t.fieldFilter?function(e){return nt.create(Fr(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return v()}}(e.fieldFilter.op),e.fieldFilter.value)}(t):void 0!==t.compositeFilter?function(t){return rt.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return v()}}(t.compositeFilter.op))}(t):v()}(e);return t instanceof rt&&ot(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(e=>function(e){return new wt(Fr(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e)));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Ie(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new Xe(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new Xe(n,t)}(n.endAt)),Vt(t,i,o,s,a,"F",c,u)}function Rr(e){return lr[e]}function Pr(e){return hr[e]}function Lr(e){return dr[e]}function Mr(e){return{fieldPath:e.canonicalString()}}function Fr(e){return G.fromServerFormat(e.fieldPath)}function jr(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Ur(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=qr(t)),t=Br(e.get(n),t);return qr(t)}function Br(e,t){let n=t;const r=e.length;for(let t=0;t<r;t++){const r=e.charAt(t);switch(r){case"\0":n+="";break;case"":n+="";break;default:n+=r}}return n}function qr(e){return e+""}function Gr(e){const t=e.length;if(w(t>=2),2===t)return w(""===e.charAt(0)&&""===e.charAt(1)),B.emptyPath();const n=t-2,r=[];let i="";for(let s=0;s<t;){const t=e.indexOf("",s);switch((t<0||t>n)&&v(),e.charAt(t+1)){case"":const n=e.substring(s,t);let o;0===i.length?o=n:(i+=n,o=i,i=""),r.push(o);break;case"":i+=e.substring(s,t),i+="\0";break;case"":i+=e.substring(s,t+1);break;default:v()}s=t+2}return new B(r)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kr=["userId","batchId"];
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zr(e,t){return[e,Vr(t)]}function $r(e,t,n){return[e,Vr(t),n]}const Wr={},Hr=["prefixPath","collectionGroup","readTime","documentId"],Qr=["prefixPath","collectionGroup","documentId"],Yr=["collectionGroup","readTime","prefixPath","documentId"],Jr=["canonicalId","targetId"],Xr=["targetId","path"],Zr=["path","targetId"],ei=["collectionId","parent"],ti=["indexId","uid"],ni=["uid","sequenceNumber"],ri=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],ii=["indexId","uid","orderedDocumentKey"],si=["userId","collectionPath","documentId"],oi=["userId","collectionPath","largestBatchId"],ai=["userId","collectionGroup","largestBatchId"],ci=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],ui=[...ci,"documentOverlays"],li=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],hi=li,di=[...hi,"indexConfiguration","indexState","indexEntries"];
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi extends te{constructor(e,t){super(),this.se=e,this.currentSequenceNumber=t}}function pi(e,t){const n=I(e);return se.M(n.se,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const r=this.mutations[t];r.key.isEqual(e.key)&&Sn(r,e,n[t])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=kn(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=kn(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Hn();return this.mutations.forEach(r=>{const i=e.get(r.key),s=i.overlayedDocument;let o=this.applyToLocalView(s,i.mutatedFields);o=t.has(r.key)?null:o;const a=Tn(s,o);null!==a&&n.set(r.key,a),s.isValidDocument()||s.convertToNoDocument(U.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Xn())}isEqual(e){return this.batchId===e.batchId&&M(this.mutations,e.mutations,(e,t)=>Cn(e,t))&&M(this.baseMutations,e.baseMutations,(e,t)=>Cn(e,t))}}class gi{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){w(e.mutations.length===n.length);let r=Yn;const i=e.mutations;for(let e=0;e<i.length;e++)r=r.insert(i[e].key,n[e].version);return new gi(e,t,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,t,n,r,i=U.min(),s=U.min(),o=Se.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o}withSequenceNumber(e){return new vi(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new vi(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new vi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e){this.ie=e}}function bi(e,t){const n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:Ii(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())r.document=function(e,t){return{name:br(e,t.key),fields:t.data.value.mapValue.fields,updateTime:pr(e,t.version.toTimestamp()),createTime:pr(e,t.createTime.toTimestamp())}}(e.ie,t);else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:_i(t.version)};else{if(!t.isUnknownDocument())return v();r.unknownDocument={path:n.path.toArray(),version:_i(t.version)}}return r}function Ii(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function _i(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function Ei(e){const t=new j(e.seconds,e.nanoseconds);return U.fromTimestamp(t)}function Ti(e,t){const n=(t.baseMutations||[]).map(t=>Or(e.ie,t));for(let e=0;e<t.mutations.length-1;++e){const n=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){const r=t.mutations[e+1];n.updateTransforms=r.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}const r=t.mutations.map(t=>Or(e.ie,t)),i=j.fromMillis(t.localWriteTimeMs);return new mi(t.batchId,i,n,r)}function Si(e){const t=Ei(e.readTime),n=void 0!==e.lastLimboFreeSnapshotVersion?Ei(e.lastLimboFreeSnapshotVersion):U.min();let r;var i;return void 0!==e.query.documents?(w(1===(i=e.query).documents.length),r=Wt(Bt(Er(i.documents[0])))):r=function(e){return Wt(Dr(e))}(e.query),new vi(r,e.targetId,0,e.lastListenSequenceNumber,t,n,Se.fromBase64String(e.resumeToken))}function ki(e,t){const n=_i(t.snapshotVersion),r=_i(t.lastLimboFreeSnapshotVersion);let i;i=Lt(t.target)?xr(e.ie,t.target):Nr(e.ie,t.target);const s=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:Rt(t.target),readTime:n,resumeToken:s,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Ai(e){const t=Dr({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Qt(t,t.limit,"L"):t}function Ci(e,t){return new yi(t.largestBatchId,Or(e.ie,t.overlayMutation))}function Oi(e,t){const n=t.path.lastSegment();return[e,Vr(t.path.popLast()),n]}function xi(e,t,n,r){return{indexId:e,uid:t.uid||"",sequenceNumber:n,readTime:_i(r.readTime),documentKey:Vr(r.documentKey.path),largestBatchId:r.largestBatchId}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{getBundleMetadata(e,t){return Di(e).get(t).next(e=>{if(e)return{id:(t=e).bundleId,createTime:Ei(t.createTime),version:t.version};var t})}saveBundleMetadata(e,t){return Di(e).put({bundleId:(n=t).id,createTime:_i(yr(n.createTime)),version:n.version});var n}getNamedQuery(e,t){return Ri(e).get(t).next(e=>{if(e)return{name:(t=e).name,query:Ai(t.bundledQuery),readTime:Ei(t.readTime)};var t})}saveNamedQuery(e,t){return Ri(e).put(function(e){return{name:e.name,readTime:_i(yr(e.readTime)),bundledQuery:e.bundledQuery}}(t))}}function Di(e){return pi(e,"bundles")}function Ri(e){return pi(e,"namedQueries")}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(e,t){this.yt=e,this.userId=t}static re(e,t){const n=t.uid||"";return new Pi(e,n)}getOverlay(e,t){return Li(e).get(Oi(this.userId,t)).next(e=>e?Ci(this.yt,e):null)}getOverlays(e,t){const n=Wn();return re.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){const r=[];return n.forEach((n,i)=>{const s=new yi(t,i);r.push(this.oe(e,s))}),re.waitFor(r)}removeOverlaysForBatchId(e,t,n){const r=new Set;t.forEach(e=>r.add(Vr(e.getCollectionPath())));const i=[];return r.forEach(t=>{const r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);i.push(Li(e).Y("collectionPathOverlayIndex",r))}),re.waitFor(i)}getOverlaysForCollection(e,t,n){const r=Wn(),i=Vr(t),s=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Li(e).W("collectionPathOverlayIndex",s).next(e=>{for(const t of e){const e=Ci(this.yt,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){const i=Wn();let s;const o=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Li(e).Z({index:"collectionGroupOverlayIndex",range:o},(e,t,n)=>{const o=Ci(this.yt,t);i.size()<r||o.largestBatchId===s?(i.set(o.getKey(),o),s=o.largestBatchId):n.done()}).next(()=>i)}oe(e,t){return Li(e).put(function(e,t,n){const[r,i,s]=Oi(t,n.mutation.key);return{userId:t,collectionPath:i,documentId:s,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:Cr(e.ie,n.mutation)}}(this.yt,this.userId,t))}}function Li(e){return pi(e,"documentOverlays")}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(){}ue(e,t){this.ce(e,t),t.ae()}ce(e,t){if("nullValue"in e)this.he(t,5);else if("booleanValue"in e)this.he(t,10),t.le(e.booleanValue?1:0);else if("integerValue"in e)this.he(t,15),t.le(Ce(e.integerValue));else if("doubleValue"in e){const n=Ce(e.doubleValue);isNaN(n)?this.he(t,13):(this.he(t,15),_e(n)?t.le(0):t.le(n))}else if("timestampValue"in e){const n=e.timestampValue;this.he(t,20),"string"==typeof n?t.fe(n):(t.fe(""+(n.seconds||"")),t.le(n.nanos||0))}else if("stringValue"in e)this.de(e.stringValue,t),this._e(t);else if("bytesValue"in e)this.he(t,30),t.we(Oe(e.bytesValue)),this._e(t);else if("referenceValue"in e)this.me(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.he(t,45),t.le(n.latitude||0),t.le(n.longitude||0)}else"mapValue"in e?We(e)?this.he(t,Number.MAX_SAFE_INTEGER):(this.ge(e.mapValue,t),this._e(t)):"arrayValue"in e?(this.ye(e.arrayValue,t),this._e(t)):v()}de(e,t){this.he(t,25),this.pe(e,t)}pe(e,t){t.fe(e)}ge(e,t){const n=e.fields||{};this.he(t,55);for(const e of Object.keys(n))this.de(e,t),this.ce(n[e],t)}ye(e,t){const n=e.values||[];this.he(t,50);for(const e of n)this.ce(e,t)}me(e,t){this.he(t,37),K.fromName(e).path.forEach(e=>{this.he(t,60),this.pe(e,t)})}he(e,t){e.le(t)}_e(e){e.le(2)}}function Fi(e){if(0===e)return 8;let t=0;return e>>4==0&&(t+=4,e<<=4),e>>6==0&&(t+=2,e<<=2),e>>7==0&&(t+=1),t}function ji(e){const t=64-function(e){let t=0;for(let n=0;n<8;++n){const r=Fi(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}Mi.Ie=new Mi;class Ui{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Te(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ee(n.value),n=t.next();this.Ae()}Re(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.be(n.value),n=t.next();this.Pe()}ve(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Ee(e);else if(e<2048)this.Ee(960|e>>>6),this.Ee(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Ee(480|e>>>12),this.Ee(128|63&e>>>6),this.Ee(128|63&e);else{const e=t.codePointAt(0);this.Ee(240|e>>>18),this.Ee(128|63&e>>>12),this.Ee(128|63&e>>>6),this.Ee(128|63&e)}}this.Ae()}Ve(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.be(e);else if(e<2048)this.be(960|e>>>6),this.be(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.be(480|e>>>12),this.be(128|63&e>>>6),this.be(128|63&e);else{const e=t.codePointAt(0);this.be(240|e>>>18),this.be(128|63&e>>>12),this.be(128|63&e>>>6),this.be(128|63&e)}}this.Pe()}Se(e){const t=this.De(e),n=ji(t);this.Ce(1+n),this.buffer[this.position++]=255&n;for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=255&t[e]}xe(e){const t=this.De(e),n=ji(t);this.Ce(1+n),this.buffer[this.position++]=~(255&n);for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}Ne(){this.ke(255),this.ke(255)}Oe(){this.Me(255),this.Me(255)}reset(){this.position=0}seed(e){this.Ce(e.length),this.buffer.set(e,this.position),this.position+=e.length}Fe(){return this.buffer.slice(0,this.position)}De(e){const t=function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=0!=(128&t[0]);t[0]^=n?255:128;for(let e=1;e<t.length;++e)t[e]^=n?255:0;return t}Ee(e){const t=255&e;0===t?(this.ke(0),this.ke(255)):255===t?(this.ke(255),this.ke(0)):this.ke(t)}be(e){const t=255&e;0===t?(this.Me(0),this.Me(255)):255===t?(this.Me(255),this.Me(0)):this.Me(e)}Ae(){this.ke(0),this.ke(1)}Pe(){this.Me(0),this.Me(1)}ke(e){this.Ce(1),this.buffer[this.position++]=e}Me(e){this.Ce(1),this.buffer[this.position++]=~e}Ce(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class Vi{constructor(e){this.$e=e}we(e){this.$e.Te(e)}fe(e){this.$e.ve(e)}le(e){this.$e.Se(e)}ae(){this.$e.Ne()}}class Bi{constructor(e){this.$e=e}we(e){this.$e.Re(e)}fe(e){this.$e.Ve(e)}le(e){this.$e.xe(e)}ae(){this.$e.Oe()}}class qi{constructor(){this.$e=new Ui,this.Be=new Vi(this.$e),this.Le=new Bi(this.$e)}seed(e){this.$e.seed(e)}qe(e){return 0===e?this.Be:this.Le}Fe(){return this.$e.Fe()}reset(){this.$e.reset()}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t,n,r){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=r}Ue(){const e=this.directionalValue.length,t=0===e||255===this.directionalValue[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new Gi(this.indexId,this.documentKey,this.arrayValue,n)}}function Ki(e,t){let n=e.indexId-t.indexId;return 0!==n?n:(n=zi(e.arrayValue,t.arrayValue),0!==n?n:(n=zi(e.directionalValue,t.directionalValue),0!==n?n:K.comparator(e.documentKey,t.documentKey)))}function zi(e,t){for(let n=0;n<e.length&&n<t.length;++n){const r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e){this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.Ke=e.orderBy,this.Ge=[];for(const t of e.filters){const e=t;e.isInequality()?this.Qe=e:this.Ge.push(e)}}je(e){w(e.collectionGroup===this.collectionId);const t=$(e);if(void 0!==t&&!this.We(t))return!1;const n=W(e);let r=0,i=0;for(;r<n.length&&this.We(n[r]);++r);if(r===n.length)return!0;if(void 0!==this.Qe){const e=n[r];if(!this.ze(this.Qe,e)||!this.He(this.Ke[i++],e))return!1;++r}for(;r<n.length;++r){const e=n[r];if(i>=this.Ke.length||!this.He(this.Ke[i++],e))return!1}return!0}We(e){for(const t of this.Ge)if(this.ze(t,e))return!0;return!1}ze(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}He(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(e){if(0===e.getFilters().length)return[];const t=function e(t){if(w(t instanceof nt||t instanceof rt),t instanceof nt)return t;if(1===t.filters.length)return e(t.filters[0]);const n=t.filters.map(t=>e(t));let r=rt.create(n,t.op);return r=Zi(r),Yi(r)?r:(w(r instanceof rt),w(it(r)),w(r.filters.length>1),r.filters.reduce((e,t)=>Ji(e,t)))}(function e(t){var n,r;if(w(t instanceof nt||t instanceof rt),t instanceof nt){if(t instanceof gt){const e=(null===(r=null===(n=t.value.arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.map(e=>nt.create(t.field,"==",e)))||[];return rt.create(e,"or")}return t}const i=t.filters.map(t=>e(t));return rt.create(i,t.op)}(e));return w(Yi(t)),Hi(t)||Qi(t)?[t]:t.getFilters()}function Hi(e){return e instanceof nt}function Qi(e){return e instanceof rt&&ot(e)}function Yi(e){return Hi(e)||Qi(e)||function(e){if(e instanceof rt&&st(e)){for(const t of e.getFilters())if(!Hi(t)&&!Qi(t))return!1;return!0}return!1}(e)}function Ji(e,t){let n;return w(e instanceof nt||e instanceof rt),w(t instanceof nt||t instanceof rt),n=e instanceof nt?t instanceof nt?function(e,t){return rt.create([e,t],"and")}(e,t):Xi(e,t):t instanceof nt?Xi(t,e):function(e,t){if(w(e.filters.length>0&&t.filters.length>0),it(e)&&it(t))return ut(e,t.getFilters());const n=st(e)?e:t,r=st(e)?t:e,i=n.filters.map(e=>Ji(e,r));return rt.create(i,"or")}(e,t),Zi(n)}function Xi(e,t){if(it(t))return ut(t,e.getFilters());{const n=t.filters.map(t=>Ji(e,t));return rt.create(n,"or")}}function Zi(e){if(w(e instanceof nt||e instanceof rt),e instanceof nt)return e;const t=e.getFilters();if(1===t.length)return Zi(t[0]);if(at(e))return e;const n=t.map(e=>Zi(e)),r=[];return n.forEach(t=>{t instanceof nt?r.push(t):t instanceof rt&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:rt.create(r,e.op)
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class es{constructor(){this.Je=new ts}addToCollectionParentIndex(e,t){return this.Je.add(t),re.resolve()}getCollectionParents(e,t){return re.resolve(this.Je.getEntries(t))}addFieldIndex(e,t){return re.resolve()}deleteFieldIndex(e,t){return re.resolve()}getDocumentsMatchingTarget(e,t){return re.resolve(null)}getIndexType(e,t){return re.resolve(0)}getFieldIndexes(e,t){return re.resolve([])}getNextCollectionGroupToUpdate(e){return re.resolve(null)}getMinOffset(e,t){return re.resolve(X.min())}getMinOffsetFromCollectionGroup(e,t){return re.resolve(X.min())}updateCollectionGroup(e,t,n){return re.resolve()}updateIndexEntries(e,t){return re.resolve()}}class ts{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new Tt(B.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new Tt(B.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ns=new Uint8Array(0);class rs{constructor(e,t){this.user=e,this.databaseId=t,this.Ye=new ts,this.Xe=new Bn(e=>Rt(e),(e,t)=>Pt(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Ye.has(t)){const n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.Ye.add(t)});const i={collectionId:n,parent:Vr(r)};return is(e).put(i)}return re.resolve()}getCollectionParents(e,t){const n=[],r=IDBKeyRange.bound([t,""],[F(t),""],!1,!0);return is(e).W(r).next(e=>{for(const r of e){if(r.collectionId!==t)break;n.push(Gr(r.parent))}return n})}addFieldIndex(e,t){const n=os(e),r=function(e){return{indexId:e.indexId,collectionGroup:e.collectionGroup,fields:e.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])}}(t);delete r.indexId;const i=n.add(r);if(t.indexState){const n=as(e);return i.next(e=>{n.put(xi(e,this.user,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const n=os(e),r=as(e),i=ss(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}getDocumentsMatchingTarget(e,t){const n=ss(e);let r=!0;const i=new Map;return re.forEach(this.Ze(t),t=>this.tn(e,t).next(e=>{r&&(r=!!e),i.set(t,e)})).next(()=>{if(r){let e=Xn();const r=[];return re.forEach(i,(i,s)=>{var o;p("IndexedDbIndexManager",`Using index ${o=i,`id=${o.indexId}|cg=${o.collectionGroup}|f=${o.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`} to execute ${Rt(t)}`);const a=function(e,t){const n=$(t);if(void 0===n)return null;for(const t of Mt(e,n.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null}(s,i),c=function(e,t){const n=new Map;for(const r of W(t))for(const t of Mt(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(s,i),u=function(e,t){const n=[];let r=!0;for(const i of W(t)){const t=0===i.kind?Ft(e,i.fieldPath,e.startAt):jt(e,i.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new Xe(n,r)}(s,i),l=function(e,t){const n=[];let r=!0;for(const i of W(t)){const t=0===i.kind?jt(e,i.fieldPath,e.endAt):Ft(e,i.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new Xe(n,r)}(s,i),h=this.en(i,s,u),d=this.en(i,s,l),f=this.nn(i,s,c),m=this.sn(i.indexId,a,h,u.inclusive,d,l.inclusive,f);return re.forEach(m,i=>n.J(i,t.limit).next(t=>{t.forEach(t=>{const n=K.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return re.resolve(null)})}Ze(e){let t=this.Xe.get(e);return t||(t=0===e.filters.length?[e]:Wi(rt.create(e.filters,"and")).map(t=>Dt(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.Xe.set(e,t),t)}sn(e,t,n,r,i,s,o){const a=(null!=t?t.length:1)*Math.max(n.length,i.length),c=a/(null!=t?t.length:1),u=[];for(let l=0;l<a;++l){const a=t?this.rn(t[l/c]):ns,h=this.on(e,a,n[l%c],r),d=this.un(e,a,i[l%c],s),f=o.map(t=>this.on(e,a,t,!0));u.push(...this.createRange(h,d,f))}return u}on(e,t,n,r){const i=new Gi(e,K.empty(),t,n);return r?i:i.Ue()}un(e,t,n,r){const i=new Gi(e,K.empty(),t,n);return r?i.Ue():i}tn(e,t){const n=new $i(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(const r of e)n.je(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2;const r=this.Ze(t);return re.forEach(r,t=>this.tn(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new Tt(G.comparator),n=!1;for(const r of e.filters)for(const e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(const n of e.orderBy)n.field.isKeyField()||(t=t.add(n.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>function(e){return null!==e.limit}(t)&&r.length>1&&2===n?1:n)}cn(e,t){const n=new qi;for(const r of W(e)){const e=t.data.field(r.fieldPath);if(null==e)return null;const i=n.qe(r.kind);Mi.Ie.ue(e,i)}return n.Fe()}rn(e){const t=new qi;return Mi.Ie.ue(e,t.qe(0)),t.Fe()}an(e,t){const n=new qi;return Mi.Ie.ue(Ve(this.databaseId,t),n.qe(function(e){const t=W(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.Fe()}nn(e,t,n){if(null===n)return[];let r=[];r.push(new qi);let i=0;for(const s of W(e)){const e=n[i++];for(const n of r)if(this.hn(t,s.fieldPath)&&qe(e))r=this.ln(r,s,e);else{const t=n.qe(s.kind);Mi.Ie.ue(e,t)}}return this.fn(r)}en(e,t,n){return this.nn(e,t,n.position)}fn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].Fe();return t}ln(e,t,n){const r=[...e],i=[];for(const e of n.arrayValue.values||[])for(const n of r){const r=new qi;r.seed(n.Fe()),Mi.Ie.ue(e,r.qe(t.kind)),i.push(r)}return i}hn(e,t){return!!e.filters.find(e=>e instanceof nt&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const n=os(e),r=as(e);return(t?n.W("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.W()).next(e=>{const t=[];return re.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){const n=t?new Q(t.sequenceNumber,new X(Ei(t.readTime),new K(Gr(t.documentKey)),t.largestBatchId)):Q.empty(),r=e.fields.map(([e,t])=>new H(G.fromServerFormat(e),t));return new z(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:L(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){const r=os(e),i=as(e);return this.dn(e).next(e=>r.W("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(t=>re.forEach(t,t=>i.put(xi(t.indexId,this.user,e,n)))))}updateIndexEntries(e,t){const n=new Map;return re.forEach(t,(t,r)=>{const i=n.get(t.collectionGroup);return(i?re.resolve(i):this.getFieldIndexes(e,t.collectionGroup)).next(i=>(n.set(t.collectionGroup,i),re.forEach(i,n=>this._n(e,t,n).next(t=>{const i=this.wn(r,n);return t.isEqual(i)?re.resolve():this.mn(e,r,n,t,i)}))))})}gn(e,t,n,r){return ss(e).put({indexId:r.indexId,uid:this.uid,arrayValue:r.arrayValue,directionalValue:r.directionalValue,orderedDocumentKey:this.an(n,t.key),documentKey:t.key.path.toArray()})}yn(e,t,n,r){return ss(e).delete([r.indexId,this.uid,r.arrayValue,r.directionalValue,this.an(n,t.key),t.key.path.toArray()])}_n(e,t,n){const r=ss(e);let i=new Tt(Ki);return r.Z({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.an(n,t)])},(e,r)=>{i=i.add(new Gi(n.indexId,t,r.arrayValue,r.directionalValue))}).next(()=>i)}wn(e,t){let n=new Tt(Ki);const r=this.cn(t,e);if(null==r)return n;const i=$(t);if(null!=i){const s=e.data.field(i.fieldPath);if(qe(s))for(const i of s.arrayValue.values||[])n=n.add(new Gi(t.indexId,e.key,this.rn(i),r))}else n=n.add(new Gi(t.indexId,e.key,ns,r));return n}mn(e,t,n,r,i){p("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const s=[];return function(e,t,n,r,i){const s=e.getIterator(),o=t.getIterator();let a=kt(s),c=kt(o);for(;a||c;){let e=!1,t=!1;if(a&&c){const r=n(a,c);r<0?t=!0:r>0&&(e=!0)}else null!=a?t=!0:e=!0;e?(r(c),c=kt(o)):t?(i(a),a=kt(s)):(a=kt(s),c=kt(o))}}(r,i,Ki,r=>{s.push(this.gn(e,t,n,r))},r=>{s.push(this.yn(e,t,n,r))}),re.waitFor(s)}dn(e){let t=1;return as(e).Z({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>Ki(e,t)).filter((e,t,n)=>!t||0!==Ki(e,n[t-1]));const r=[];r.push(e);for(const i of n){const n=Ki(i,e),s=Ki(i,t);if(0===n)r[0]=e.Ue();else if(n>0&&s<0)r.push(i),r.push(i.Ue());else if(s>0)break}r.push(t);const i=[];for(let e=0;e<r.length;e+=2){if(this.pn(r[e],r[e+1]))return[];const t=[r[e].indexId,this.uid,r[e].arrayValue,r[e].directionalValue,ns,[]],n=[r[e+1].indexId,this.uid,r[e+1].arrayValue,r[e+1].directionalValue,ns,[]];i.push(IDBKeyRange.bound(t,n))}return i}pn(e,t){return Ki(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(cs)}getMinOffset(e,t){return re.mapArray(this.Ze(t),t=>this.tn(e,t).next(e=>e||v())).next(cs)}}function is(e){return pi(e,"collectionParents")}function ss(e){return pi(e,"indexEntries")}function os(e){return pi(e,"indexConfiguration")}function as(e){return pi(e,"indexState")}function cs(e){w(0!==e.length);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){const i=e[r].indexState.offset;Z(i,t)<0&&(t=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new X(t.readTime,t.documentKey,n)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const us={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class ls{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new ls(e,ls.DEFAULT_COLLECTION_PERCENTILE,ls.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hs(e,t,n){const r=e.store("mutations"),i=e.store("documentMutations"),s=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.Z({range:o},(e,t,n)=>(a++,n.delete()));s.push(c.next(()=>{w(1===a)}));const u=[];for(const e of n.mutations){const r=$r(t,e.key.path,n.batchId);s.push(i.delete(r)),u.push(e.key)}return re.waitFor(s).next(()=>u)}function ds(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw v();t=e.noDocument}return JSON.stringify(t).length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ls.DEFAULT_COLLECTION_PERCENTILE=10,ls.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ls.DEFAULT=new ls(41943040,ls.DEFAULT_COLLECTION_PERCENTILE,ls.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ls.DISABLED=new ls(-1,0,0);class fs{constructor(e,t,n,r){this.userId=e,this.yt=t,this.indexManager=n,this.referenceDelegate=r,this.In={}}static re(e,t,n,r){w(""!==e.uid);const i=e.isAuthenticated()?e.uid:"";return new fs(i,t,n,r)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return ms(e).Z({index:"userMutationsIndex",range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){const i=gs(e),s=ms(e);return s.add({}).next(o=>{w("number"==typeof o);const a=new mi(o,t,n,r),c=function(e,t,n){const r=n.baseMutations.map(t=>Cr(e.ie,t)),i=n.mutations.map(t=>Cr(e.ie,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:i}}(this.yt,this.userId,a),u=[];let l=new Tt((e,t)=>L(e.canonicalString(),t.canonicalString()));for(const e of r){const t=$r(this.userId,e.key.path,o);l=l.add(e.key.path.popLast()),u.push(s.put(c)),u.push(i.put(t,Wr))}return l.forEach(t=>{u.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.In[o]=a.keys()}),re.waitFor(u).next(()=>a)})}lookupMutationBatch(e,t){return ms(e).get(t).next(e=>e?(w(e.userId===this.userId),Ti(this.yt,e)):null)}Tn(e,t){return this.In[t]?re.resolve(this.In[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const n=e.keys();return this.In[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return ms(e).Z({index:"userMutationsIndex",range:r},(e,t,r)=>{t.userId===this.userId&&(w(t.batchId>=n),i=Ti(this.yt,t)),r.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return ms(e).Z({index:"userMutationsIndex",range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return ms(e).W("userMutationsIndex",t).next(e=>e.map(e=>Ti(this.yt,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=zr(this.userId,t.path),r=IDBKeyRange.lowerBound(n),i=[];return gs(e).Z({range:r},(n,r,s)=>{const[o,a,c]=n,u=Gr(a);if(o===this.userId&&t.path.isEqual(u))return ms(e).get(c).next(e=>{if(!e)throw v();w(e.userId===this.userId),i.push(Ti(this.yt,e))});s.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Tt(L);const r=[];return t.forEach(t=>{const i=zr(this.userId,t.path),s=IDBKeyRange.lowerBound(i),o=gs(e).Z({range:s},(e,r,i)=>{const[s,o,a]=e,c=Gr(o);s===this.userId&&t.path.isEqual(c)?n=n.add(a):i.done()});r.push(o)}),re.waitFor(r).next(()=>this.En(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1,i=zr(this.userId,n),s=IDBKeyRange.lowerBound(i);let o=new Tt(L);return gs(e).Z({range:s},(e,t,i)=>{const[s,a,c]=e,u=Gr(a);s===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):i.done()}).next(()=>this.En(e,o))}En(e,t){const n=[],r=[];return t.forEach(t=>{r.push(ms(e).get(t).next(e=>{if(null===e)throw v();w(e.userId===this.userId),n.push(Ti(this.yt,e))}))}),re.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return hs(e.se,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.An(t.batchId)}),re.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}An(e){delete this.In[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return re.resolve();const n=IDBKeyRange.lowerBound([this.userId]),r=[];return gs(e).Z({range:n},(e,t,n)=>{if(e[0]===this.userId){const t=Gr(e[1]);r.push(t)}else n.done()}).next(()=>{w(0===r.length)})})}containsKey(e,t){return ps(e,this.userId,t)}Rn(e){return ys(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function ps(e,t,n){const r=zr(t,n.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return gs(e).Z({range:s,X:!0},(e,n,r)=>{const[s,a,c]=e;s===t&&a===i&&(o=!0),r.done()}).next(()=>o)}function ms(e){return pi(e,"mutations")}function gs(e){return pi(e,"documentMutations")}function ys(e){return pi(e,"mutationQueues")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e){this.bn=e}next(){return this.bn+=2,this.bn}static Pn(){return new vs(0)}static vn(){return new vs(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e,t){this.referenceDelegate=e,this.yt=t}allocateTargetId(e){return this.Vn(e).next(t=>{const n=new vs(t.highestTargetId);return t.highestTargetId=n.next(),this.Sn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Vn(e).next(e=>U.fromTimestamp(new j(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Vn(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.Vn(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.Sn(e,r)))}addTargetData(e,t){return this.Dn(e,t).next(()=>this.Vn(e).next(n=>(n.targetCount+=1,this.Cn(t,n),this.Sn(e,n))))}updateTargetData(e,t){return this.Dn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>bs(e).delete(t.targetId)).next(()=>this.Vn(e)).next(t=>(w(t.targetCount>0),t.targetCount-=1,this.Sn(e,t)))}removeTargets(e,t,n){let r=0;const i=[];return bs(e).Z((s,o)=>{const a=Si(o);a.sequenceNumber<=t&&null===n.get(a.targetId)&&(r++,i.push(this.removeTargetData(e,a)))}).next(()=>re.waitFor(i)).next(()=>r)}forEachTarget(e,t){return bs(e).Z((e,n)=>{const r=Si(n);t(r)})}Vn(e){return Is(e).get("targetGlobalKey").next(e=>(w(null!==e),e))}Sn(e,t){return Is(e).put("targetGlobalKey",t)}Dn(e,t){return bs(e).put(ki(this.yt,t))}Cn(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.Vn(e).next(e=>e.targetCount)}getTargetData(e,t){const n=Rt(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return bs(e).Z({range:r,index:"queryTargetsIndex"},(e,n,r)=>{const s=Si(n);Pt(t,s.target)&&(i=s,r.done())}).next(()=>i)}addMatchingKeys(e,t,n){const r=[],i=_s(e);return t.forEach(t=>{const s=Vr(t.path);r.push(i.put({targetId:n,path:s})),r.push(this.referenceDelegate.addReference(e,n,t))}),re.waitFor(r)}removeMatchingKeys(e,t,n){const r=_s(e);return re.forEach(t,t=>{const i=Vr(t.path);return re.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){const n=_s(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),r=_s(e);let i=Xn();return r.Z({range:n,X:!0},(e,t,n)=>{const r=Gr(e[1]),s=new K(r);i=i.add(s)}).next(()=>i)}containsKey(e,t){const n=Vr(t.path),r=IDBKeyRange.bound([n],[F(n)],!1,!0);let i=0;return _s(e).Z({index:"documentTargetsIndex",X:!0,range:r},([e,t],n,r)=>{0!==e&&(i++,r.done())}).next(()=>i>0)}ne(e,t){return bs(e).get(t).next(e=>e?Si(e):null)}}function bs(e){return pi(e,"targets")}function Is(e){return pi(e,"targetGlobal")}function _s(e){return pi(e,"targetDocuments")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es([e,t],[n,r]){const i=L(e,n);return 0===i?L(t,r):i}class Ts{constructor(e){this.xn=e,this.buffer=new Tt(Es),this.Nn=0}kn(){return++this.Nn}On(e){const t=[e,this.kn()];if(this.buffer.size<this.xn)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();Es(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Ss{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Mn=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Fn(6e4)}stop(){this.Mn&&(this.Mn.cancel(),this.Mn=null)}get started(){return null!==this.Mn}Fn(e){p("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Mn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Mn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){ce(e)?p("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await ne(e)}await this.Fn(3e5)})}}class ks{constructor(e,t){this.$n=e,this.params=t}calculateTargetCount(e,t){return this.$n.Bn(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return re.resolve(me.at);const n=new Ts(t);return this.$n.forEachTarget(e,e=>n.On(e.sequenceNumber)).next(()=>this.$n.Ln(e,e=>n.On(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.$n.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.$n.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(p("LruGarbageCollector","Garbage collection skipped; disabled"),re.resolve(us)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(p("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),us):this.qn(e,t))}getCacheSize(e){return this.$n.getCacheSize(e)}qn(e,t){let n,r,i,o,a,c,u;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(p("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,o=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,a=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,c=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),d()<=s.a.DEBUG&&p("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${o-l}ms\n\tDetermined least recently used ${r} in `+(a-o)+"ms\n"+`\tRemoved ${i} targets in `+(c-a)+"ms\n"+`\tRemoved ${e} documents in `+(u-c)+"ms\n"+`Total Duration: ${u-l}ms`),re.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,t){this.db=e,this.garbageCollector=function(e,t){return new ks(e,t)}(this,t)}Bn(e){const t=this.Un(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}Un(e){let t=0;return this.Ln(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Ln(e,t){return this.Kn(e,(e,n)=>t(n))}addReference(e,t,n){return Cs(e,n)}removeReference(e,t,n){return Cs(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Cs(e,t)}Gn(e,t){return function(e,t){let n=!1;return ys(e).tt(r=>ps(e,r,t).next(e=>(e&&(n=!0),re.resolve(!e)))).next(()=>n)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let i=0;return this.Kn(e,(s,o)=>{if(o<=t){const t=this.Gn(e,s).next(t=>{if(!t)return i++,n.getEntry(e,s).next(()=>(n.removeEntry(s,U.min()),_s(e).delete([0,Vr(s.path)])))});r.push(t)}}).next(()=>re.waitFor(r)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Cs(e,t)}Kn(e,t){const n=_s(e);let r,i=me.at;return n.Z({index:"documentTargetsIndex"},([e,n],{path:s,sequenceNumber:o})=>{0===e?(i!==me.at&&t(new K(Gr(r)),i),i=o,r=s):i=me.at}).next(()=>{i!==me.at&&t(new K(Gr(r)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Cs(e,t){return _s(e).put(function(e,t){return{targetId:0,path:Vr(e.path),sequenceNumber:t}}(t,e.currentSequenceNumber))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(){this.changes=new Bn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,xt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?re.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e){this.yt=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Ps(e).put(n)}removeEntry(e,t,n){return Ps(e).delete(function(e,t){const n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],Ii(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.Qn(e,n)))}getEntry(e,t){let n=xt.newInvalidDocument(t);return Ps(e).Z({index:"documentKeyIndex",range:IDBKeyRange.only(Ls(t))},(e,r)=>{n=this.jn(t,r)}).next(()=>n)}Wn(e,t){let n={size:0,document:xt.newInvalidDocument(t)};return Ps(e).Z({index:"documentKeyIndex",range:IDBKeyRange.only(Ls(t))},(e,r)=>{n={document:this.jn(t,r),size:ds(r)}}).next(()=>n)}getEntries(e,t){let n=Gn();return this.zn(e,t,(e,t)=>{const r=this.jn(e,t);n=n.insert(e,r)}).next(()=>n)}Hn(e,t){let n=Gn(),r=new It(K.comparator);return this.zn(e,t,(e,t)=>{const i=this.jn(e,t);n=n.insert(e,i),r=r.insert(e,ds(t))}).next(()=>({documents:n,Jn:r}))}zn(e,t,n){if(t.isEmpty())return re.resolve();let r=new Tt(Fs);t.forEach(e=>r=r.add(e));const i=IDBKeyRange.bound(Ls(r.first()),Ls(r.last())),s=r.getIterator();let o=s.getNext();return Ps(e).Z({index:"documentKeyIndex",range:i},(e,t,r)=>{const i=K.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;o&&Fs(o,i)<0;)n(o,null),o=s.getNext();o&&o.isEqual(i)&&(n(o,t),o=s.hasNext()?s.getNext():null),o?r.j(Ls(o)):r.done()}).next(()=>{for(;o;)n(o,null),o=s.hasNext()?s.getNext():null})}getAllFromCollection(e,t,n){const r=[t.popLast().toArray(),t.lastSegment(),Ii(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],i=[t.popLast().toArray(),t.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ps(e).W(IDBKeyRange.bound(r,i,!0)).next(e=>{let t=Gn();for(const n of e){const e=this.jn(K.fromSegments(n.prefixPath.concat(n.collectionGroup,n.documentId)),n);t=t.insert(e.key,e)}return t})}getAllFromCollectionGroup(e,t,n,r){let i=Gn();const s=Ms(t,n),o=Ms(t,X.max());return Ps(e).Z({index:"collectionGroupIndex",range:IDBKeyRange.bound(s,o,!0)},(e,t,n)=>{const s=this.jn(K.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);i=i.insert(s.key,s),i.size===r&&n.done()}).next(()=>i)}newChangeBuffer(e){return new Ds(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return Rs(e).get("remoteDocumentGlobalKey").next(e=>(w(!!e),e))}Qn(e,t){return Rs(e).put("remoteDocumentGlobalKey",t)}jn(e,t){if(t){const e=function(e,t){let n;if(t.document)n=Ar(e.ie,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=K.fromSegments(t.noDocument.path),r=Ei(t.noDocument.readTime);n=xt.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return v();{const e=K.fromSegments(t.unknownDocument.path),r=Ei(t.unknownDocument.version);n=xt.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){const t=new j(e[0],e[1]);return U.fromTimestamp(t)}(t.readTime)),n}(this.yt,t);if(!e.isNoDocument()||!e.version.isEqual(U.min()))return e}return xt.newInvalidDocument(e)}}function Ns(e){return new xs(e)}class Ds extends Os{constructor(e,t){super(),this.Yn=e,this.trackRemovals=t,this.Xn=new Bn(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let n=0,r=new Tt((e,t)=>L(e.canonicalString(),t.canonicalString()));return this.changes.forEach((i,s)=>{const o=this.Xn.get(i);if(t.push(this.Yn.removeEntry(e,i,o.readTime)),s.isValidDocument()){const a=bi(this.Yn.yt,s);r=r.add(i.path.popLast());const c=ds(a);n+=c-o.size,t.push(this.Yn.addEntry(e,i,a))}else if(n-=o.size,this.trackRemovals){const n=bi(this.Yn.yt,s.convertToNoDocument(U.min()));t.push(this.Yn.addEntry(e,i,n))}}),r.forEach(n=>{t.push(this.Yn.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.Yn.updateMetadata(e,n)),re.waitFor(t)}getFromCache(e,t){return this.Yn.Wn(e,t).next(e=>(this.Xn.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Yn.Hn(e,t).next(({documents:e,Jn:t})=>(t.forEach((t,n)=>{this.Xn.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function Rs(e){return pi(e,"remoteDocumentGlobal")}function Ps(e){return pi(e,"remoteDocumentsV14")}function Ls(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Ms(e,t){const n=t.documentKey.path.toArray();return[e,Ii(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function Fs(e,t){const n=e.path.toArray(),r=t.path.toArray();let i=0;for(let e=0;e<n.length-2&&e<r.length-2;++e)if(i=L(n[e],r[e]),i)return i;return i=L(n.length,r.length),i||(i=L(n[n.length-2],r[r.length-2]),i||L(n[n.length-1],r[r.length-1]))
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class js{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&kn(n.mutation,e,At.empty(),j.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,Xn()).next(()=>t))}getLocalViewOfDocuments(e,t,n=Xn()){const r=Wn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=zn();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=Wn();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,Xn()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=Gn();const s=Qn(),o=Qn();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof xn)?i=i.insert(t.key,t):void 0!==o&&(s.set(t.key,o.mutation.getFieldMask()),kn(o.mutation,t,o.mutation.getFieldMask(),j.now()))}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var n;return o.set(e,new js(t,null!==(n=s.get(e))&&void 0!==n?n:null))}),o))}recalculateAndSaveOverlays(e,t){const n=Qn();let r=new It((e,t)=>e-t),i=Xn();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const i of e)i.keys().forEach(e=>{const s=t.get(e);if(null===s)return;let o=n.get(e)||At.empty();o=i.applyToLocalView(s,o),n.set(e,o);const a=(r.get(i.batchId)||Xn()).add(e);r=r.insert(i.batchId,a)})}).next(()=>{const s=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=Hn();c.forEach(e=>{if(!i.has(e)){const r=Tn(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,a,u))}return re.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n){return function(e){return K.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):zt(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n):this.getDocumentsMatchingCollectionQuery(e,t,n)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):re.resolve(Wn());let o=-1,a=i;return s.next(t=>re.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?re.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,Xn())).next(e=>({batchId:o,changes:$n(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new K(t)).next(e=>{let t=zn();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n){const r=t.collectionGroup;let i=zn();return this.indexManager.getCollectionParents(e,r).next(s=>re.forEach(s,s=>{const o=function(e,t){return new Ut(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,s.child(r));return this.getDocumentsMatchingCollectionQuery(e,o,n).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n){let r;return this.remoteDocumentCache.getAllFromCollection(e,t.path,n).next(i=>(r=i,this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId))).next(e=>{e.forEach((e,t)=>{const n=t.getKey();null===r.get(n)&&(r=r.insert(n,xt.newInvalidDocument(n)))});let n=zn();return r.forEach((r,i)=>{const s=e.get(r);void 0!==s&&kn(s.mutation,i,At.empty(),j.now()),Zt(t,i)&&(n=n.insert(r,i))}),n})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e){this.yt=e,this.Zn=new Map,this.ts=new Map}getBundleMetadata(e,t){return re.resolve(this.Zn.get(t))}saveBundleMetadata(e,t){var n;return this.Zn.set(t.id,{id:(n=t).id,version:n.version,createTime:yr(n.createTime)}),re.resolve()}getNamedQuery(e,t){return re.resolve(this.ts.get(t))}saveNamedQuery(e,t){return this.ts.set(t.name,function(e){return{name:e.name,query:Ai(e.bundledQuery),readTime:yr(e.readTime)}}(t)),re.resolve()}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(){this.overlays=new It(K.comparator),this.es=new Map}getOverlay(e,t){return re.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Wn();return re.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.oe(e,t,r)}),re.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.es.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.es.delete(n)),re.resolve()}getOverlaysForCollection(e,t,n){const r=Wn(),i=t.length+1,s=new K(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){const e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return re.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new It((e,t)=>e-t);const s=this.overlays.getIterator();for(;s.hasNext();){const e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=Wn(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=Wn(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return re.resolve(o)}oe(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.es.get(r.largestBatchId).delete(n.key);this.es.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new yi(t,n));let i=this.es.get(t);void 0===i&&(i=Xn(),this.es.set(t,i)),this.es.set(t,i.add(n.key))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(){this.ns=new Tt(Gs.ss),this.rs=new Tt(Gs.os)}isEmpty(){return this.ns.isEmpty()}addReference(e,t){const n=new Gs(e,t);this.ns=this.ns.add(n),this.rs=this.rs.add(n)}us(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.cs(new Gs(e,t))}hs(e,t){e.forEach(e=>this.removeReference(e,t))}ls(e){const t=new K(new B([])),n=new Gs(t,e),r=new Gs(t,e+1),i=[];return this.rs.forEachInRange([n,r],e=>{this.cs(e),i.push(e.key)}),i}fs(){this.ns.forEach(e=>this.cs(e))}cs(e){this.ns=this.ns.delete(e),this.rs=this.rs.delete(e)}ds(e){const t=new K(new B([])),n=new Gs(t,e),r=new Gs(t,e+1);let i=Xn();return this.rs.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){const t=new Gs(e,0),n=this.ns.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class Gs{constructor(e,t){this.key=e,this._s=t}static ss(e,t){return K.comparator(e.key,t.key)||L(e._s,t._s)}static os(e,t){return L(e._s,t._s)||K.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.ws=1,this.gs=new Tt(Gs.ss)}checkEmpty(e){return re.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const i=this.ws;this.ws++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new mi(i,t,n,r);this.mutationQueue.push(s);for(const t of r)this.gs=this.gs.add(new Gs(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return re.resolve(s)}lookupMutationBatch(e,t){return re.resolve(this.ys(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.ps(n),i=r<0?0:r;return re.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return re.resolve(0===this.mutationQueue.length?-1:this.ws-1)}getAllMutationBatches(e){return re.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Gs(t,0),r=new Gs(t,Number.POSITIVE_INFINITY),i=[];return this.gs.forEachInRange([n,r],e=>{const t=this.ys(e._s);i.push(t)}),re.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Tt(L);return t.forEach(e=>{const t=new Gs(e,0),r=new Gs(e,Number.POSITIVE_INFINITY);this.gs.forEachInRange([t,r],e=>{n=n.add(e._s)})}),re.resolve(this.Is(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;K.isDocumentKey(i)||(i=i.child(""));const s=new Gs(new K(i),0);let o=new Tt(L);return this.gs.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e._s)),!0)},s),re.resolve(this.Is(o))}Is(e){const t=[];return e.forEach(e=>{const n=this.ys(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){w(0===this.Ts(t.batchId,"removed")),this.mutationQueue.shift();let n=this.gs;return re.forEach(t.mutations,r=>{const i=new Gs(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.gs=n})}An(e){}containsKey(e,t){const n=new Gs(t,0),r=this.gs.firstAfterOrEqual(n);return re.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,re.resolve()}Ts(e,t){return this.ps(e)}ps(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}ys(e){const t=this.ps(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e){this.Es=e,this.docs=new It(K.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.Es(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return re.resolve(n?n.document.mutableCopy():xt.newInvalidDocument(t))}getEntries(e,t){let n=Gn();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():xt.newInvalidDocument(e))}),re.resolve(n)}getAllFromCollection(e,t,n){let r=Gn();const i=new K(t.child("")),s=this.docs.getIteratorFrom(i);for(;s.hasNext();){const{key:e,value:{document:i}}=s.getNext();if(!t.isPrefixOf(e.path))break;e.path.length>t.length+1||Z(J(i),n)<=0||(r=r.insert(i.key,i.mutableCopy()))}return re.resolve(r)}getAllFromCollectionGroup(e,t,n,r){v()}As(e,t){return re.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new $s(this)}getSize(e){return re.resolve(this.size)}}class $s extends Os{constructor(e){super(),this.Yn=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Yn.addEntry(e,r)):this.Yn.removeEntry(n)}),re.waitFor(t)}getFromCache(e,t){return this.Yn.getEntry(e,t)}getAllFromCache(e,t){return this.Yn.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e){this.persistence=e,this.Rs=new Bn(e=>Rt(e),Pt),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.bs=0,this.Ps=new qs,this.targetCount=0,this.vs=vs.Pn()}forEachTarget(e,t){return this.Rs.forEach((e,n)=>t(n)),re.resolve()}getLastRemoteSnapshotVersion(e){return re.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return re.resolve(this.bs)}allocateTargetId(e){return this.highestTargetId=this.vs.next(),re.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.bs&&(this.bs=t),re.resolve()}Dn(e){this.Rs.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.vs=new vs(t),this.highestTargetId=t),e.sequenceNumber>this.bs&&(this.bs=e.sequenceNumber)}addTargetData(e,t){return this.Dn(t),this.targetCount+=1,re.resolve()}updateTargetData(e,t){return this.Dn(t),re.resolve()}removeTargetData(e,t){return this.Rs.delete(t.target),this.Ps.ls(t.targetId),this.targetCount-=1,re.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.Rs.forEach((s,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.Rs.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),re.waitFor(i).next(()=>r)}getTargetCount(e){return re.resolve(this.targetCount)}getTargetData(e,t){const n=this.Rs.get(t)||null;return re.resolve(n)}addMatchingKeys(e,t,n){return this.Ps.us(t,n),re.resolve()}removeMatchingKeys(e,t,n){this.Ps.hs(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),re.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ps.ls(t),re.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Ps.ds(t);return re.resolve(n)}containsKey(e,t){return re.resolve(this.Ps.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,t){this.Vs={},this.overlays={},this.Ss=new me(0),this.Ds=!1,this.Ds=!0,this.referenceDelegate=e(this),this.Cs=new Ws(this),this.indexManager=new es,this.remoteDocumentCache=function(e){return new zs(e)}(e=>this.referenceDelegate.xs(e)),this.yt=new wi(t),this.Ns=new Vs(this.yt)}start(){return Promise.resolve()}shutdown(){return this.Ds=!1,Promise.resolve()}get started(){return this.Ds}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Bs,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Vs[e.toKey()];return n||(n=new Ks(t,this.referenceDelegate),this.Vs[e.toKey()]=n),n}getTargetCache(){return this.Cs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ns}runTransaction(e,t,n){p("MemoryPersistence","Starting transaction:",e);const r=new Qs(this.Ss.next());return this.referenceDelegate.ks(),n(r).next(e=>this.referenceDelegate.Os(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ms(e,t){return re.or(Object.values(this.Vs).map(n=>()=>n.containsKey(e,t)))}}class Qs extends te{constructor(e){super(),this.currentSequenceNumber=e}}class Ys{constructor(e){this.persistence=e,this.Fs=new qs,this.$s=null}static Bs(e){return new Ys(e)}get Ls(){if(this.$s)return this.$s;throw v()}addReference(e,t,n){return this.Fs.addReference(n,t),this.Ls.delete(n.toString()),re.resolve()}removeReference(e,t,n){return this.Fs.removeReference(n,t),this.Ls.add(n.toString()),re.resolve()}markPotentiallyOrphaned(e,t){return this.Ls.add(t.toString()),re.resolve()}removeTarget(e,t){this.Fs.ls(t.targetId).forEach(e=>this.Ls.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Ls.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}ks(){this.$s=new Set}Os(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return re.forEach(this.Ls,n=>{const r=K.fromPath(n);return this.qs(e,r).next(e=>{e||t.removeEntry(r,U.min())})}).next(()=>(this.$s=null,t.apply(e)))}updateLimboDocument(e,t){return this.qs(e,t).next(e=>{e?this.Ls.delete(t.toString()):this.Ls.add(t.toString())})}xs(e){return 0}qs(e,t){return re.or([()=>re.resolve(this.Fs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ms(e,t)])}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e){this.yt=e}$(e,t,n,r){const i=new ie("createOrUpgrade",t);n<1&&r>=1&&(function(e){e.createObjectStore("owner")}(e),function(e){e.createObjectStore("mutationQueues",{keyPath:"userId"}),e.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Kr,{unique:!0}),e.createObjectStore("documentMutations")}(e),Xs(e),function(e){e.createObjectStore("remoteDocuments")}(e));let s=re.resolve();return n<3&&r>=3&&(0!==n&&(function(e){e.deleteObjectStore("targetDocuments"),e.deleteObjectStore("targets"),e.deleteObjectStore("targetGlobal")}(e),Xs(e)),s=s.next(()=>function(e){const t=e.store("targetGlobal"),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:U.min().toTimestamp(),targetCount:0};return t.put("targetGlobalKey",n)}(i))),n<4&&r>=4&&(0!==n&&(s=s.next(()=>function(e,t){return t.store("mutations").W().next(n=>{e.deleteObjectStore("mutations"),e.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Kr,{unique:!0});const r=t.store("mutations"),i=n.map(e=>r.put(e));return re.waitFor(i)})}(e,i))),s=s.next(()=>{!function(e){e.createObjectStore("clientMetadata",{keyPath:"clientId"})}(e)})),n<5&&r>=5&&(s=s.next(()=>this.Us(i))),n<6&&r>=6&&(s=s.next(()=>(function(e){e.createObjectStore("remoteDocumentGlobal")}(e),this.Ks(i)))),n<7&&r>=7&&(s=s.next(()=>this.Gs(i))),n<8&&r>=8&&(s=s.next(()=>this.Qs(e,i))),n<9&&r>=9&&(s=s.next(()=>{!function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")}(e)})),n<10&&r>=10&&(s=s.next(()=>this.js(i))),n<11&&r>=11&&(s=s.next(()=>{!function(e){e.createObjectStore("bundles",{keyPath:"bundleId"})}(e),function(e){e.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&r>=12&&(s=s.next(()=>{!function(e){const t=e.createObjectStore("documentOverlays",{keyPath:si});t.createIndex("collectionPathOverlayIndex",oi,{unique:!1}),t.createIndex("collectionGroupOverlayIndex",ai,{unique:!1})}(e)})),n<13&&r>=13&&(s=s.next(()=>function(e){const t=e.createObjectStore("remoteDocumentsV14",{keyPath:Hr});t.createIndex("documentKeyIndex",Qr),t.createIndex("collectionGroupIndex",Yr)}(e)).next(()=>this.Ws(e,i)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&r>=14&&(s=s.next(()=>this.zs(e,i))),n<15&&r>=15&&(s=s.next(()=>function(e){e.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),e.createObjectStore("indexState",{keyPath:ti}).createIndex("sequenceNumberIndex",ni,{unique:!1}),e.createObjectStore("indexEntries",{keyPath:ri}).createIndex("documentKeyIndex",ii,{unique:!1})}(e))),s}Ks(e){let t=0;return e.store("remoteDocuments").Z((e,n)=>{t+=ds(n)}).next(()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}Us(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.W().next(t=>re.forEach(t,t=>{const r=IDBKeyRange.bound([t.userId,-1],[t.userId,t.lastAcknowledgedBatchId]);return n.W("userMutationsIndex",r).next(n=>re.forEach(n,n=>{w(n.userId===t.userId);const r=Ti(this.yt,n);return hs(e,t.userId,r).next(()=>{})}))}))}Gs(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(e=>{const r=[];return n.Z((n,i)=>{const s=new B(n),o=function(e){return[0,Vr(e)]}(s);r.push(t.get(o).next(n=>n?re.resolve():(n=>t.put({targetId:0,path:Vr(n),sequenceNumber:e.highestListenSequenceNumber}))(s)))}).next(()=>re.waitFor(r))})}Qs(e,t){e.createObjectStore("collectionParents",{keyPath:ei});const n=t.store("collectionParents"),r=new ts,i=e=>{if(r.add(e)){const t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:Vr(r)})}};return t.store("remoteDocuments").Z({X:!0},(e,t)=>{const n=new B(e);return i(n.popLast())}).next(()=>t.store("documentMutations").Z({X:!0},([e,t,n],r)=>{const s=Gr(t);return i(s.popLast())}))}js(e){const t=e.store("targets");return t.Z((e,n)=>{const r=Si(n),i=ki(this.yt,r);return t.put(i)})}Ws(e,t){const n=t.store("remoteDocuments"),r=[];return n.Z((e,n)=>{const i=t.store("remoteDocumentsV14"),s=(o=n,o.document?new K(B.fromString(o.document.name).popFirst(5)):o.noDocument?K.fromSegments(o.noDocument.path):o.unknownDocument?K.fromSegments(o.unknownDocument.path):v()).path.toArray();var o;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a={prefixPath:s.slice(0,s.length-2),collectionGroup:s[s.length-2],documentId:s[s.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(i.put(a))}).next(()=>re.waitFor(r))}zs(e,t){const n=t.store("mutations"),r=Ns(this.yt),i=new Hs(Ys.Bs,this.yt.ie);return n.W().next(e=>{const n=new Map;return e.forEach(e=>{var t;let r=null!==(t=n.get(e.userId))&&void 0!==t?t:Xn();Ti(this.yt,e).keys().forEach(e=>r=r.add(e)),n.set(e.userId,r)}),re.forEach(n,(e,n)=>{const s=new u(n),o=Pi.re(this.yt,s),a=i.getIndexManager(s),c=fs.re(s,this.yt,a,i.referenceDelegate);return new Us(r,c,o,a).recalculateAndSaveOverlaysForDocumentKeys(new fi(t,me.at),e).next()})})}}function Xs(e){e.createObjectStore("targetDocuments",{keyPath:Xr}).createIndex("documentTargetsIndex",Zr,{unique:!0}),e.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",Jr,{unique:!0}),e.createObjectStore("targetGlobal")}const Zs="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class eo{constructor(e,t,n,r,i,s,o,a,c,u,l=15){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Hs=i,this.window=s,this.document=o,this.Js=c,this.Ys=u,this.Xs=l,this.Ss=null,this.Ds=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Zs=null,this.inForeground=!1,this.ti=null,this.ei=null,this.ni=Number.NEGATIVE_INFINITY,this.si=e=>Promise.resolve(),!eo.C())throw new E(_.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new As(this,r),this.ii=t+"main",this.yt=new wi(a),this.ri=new se(this.ii,this.Xs,new Js(this.yt)),this.Cs=new ws(this.referenceDelegate,this.yt),this.remoteDocumentCache=Ns(this.yt),this.Ns=new Ni,this.window&&this.window.localStorage?this.oi=this.window.localStorage:(this.oi=null,!1===u&&m("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.ui().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new E(_.FAILED_PRECONDITION,Zs);return this.ci(),this.ai(),this.hi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Cs.getHighestSequenceNumber(e))}).then(e=>{this.Ss=new me(e,this.Js)}).then(()=>{this.Ds=!0}).catch(e=>(this.ri&&this.ri.close(),Promise.reject(e)))}li(e){return this.si=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.ri.L(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Hs.enqueueAndForget(async()=>{this.started&&await this.ui()}))}ui(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>no(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.fi(e).next(e=>{e||(this.isPrimary=!1,this.Hs.enqueueRetryable(()=>this.si(!1)))})}).next(()=>this.di(e)).next(t=>this.isPrimary&&!t?this._i(e).next(()=>!1):!!t&&this.wi(e).next(()=>!0))).catch(e=>{if(ce(e))return p("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return p("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Hs.enqueueRetryable(()=>this.si(e)),this.isPrimary=e})}fi(e){return to(e).get("owner").next(e=>re.resolve(this.mi(e)))}gi(e){return no(e).delete(this.clientId)}async yi(){if(this.isPrimary&&!this.pi(this.ni,18e5)){this.ni=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=pi(e,"clientMetadata");return t.W().next(e=>{const n=this.Ii(e,18e5),r=e.filter(e=>-1===n.indexOf(e));return re.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.oi)for(const t of e)this.oi.removeItem(this.Ti(t.clientId))}}hi(){this.ei=this.Hs.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.ui().then(()=>this.yi()).then(()=>this.hi()))}mi(e){return!!e&&e.ownerId===this.clientId}di(e){return this.Ys?re.resolve(!0):to(e).get("owner").next(t=>{if(null!==t&&this.pi(t.leaseTimestampMs,5e3)&&!this.Ei(t.ownerId)){if(this.mi(t)&&this.networkEnabled)return!0;if(!this.mi(t)){if(!t.allowTabSynchronization)throw new E(_.FAILED_PRECONDITION,Zs);return!1}}return!(!this.networkEnabled||!this.inForeground)||no(e).W().next(e=>void 0===this.Ii(e,5e3).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&p("IndexedDbPersistence",`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.Ds=!1,this.Ai(),this.ei&&(this.ei.cancel(),this.ei=null),this.Ri(),this.bi(),await this.ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new fi(e,me.at);return this._i(t).next(()=>this.gi(t))}),this.ri.close(),this.Pi()}Ii(e,t){return e.filter(e=>this.pi(e.updateTimeMs,t)&&!this.Ei(e.clientId))}vi(){return this.runTransaction("getActiveClients","readonly",e=>no(e).W().next(e=>this.Ii(e,18e5).map(e=>e.clientId)))}get started(){return this.Ds}getMutationQueue(e,t){return fs.re(e,this.yt,t,this.referenceDelegate)}getTargetCache(){return this.Cs}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new rs(e,this.yt.ie.databaseId)}getDocumentOverlayCache(e){return Pi.re(this.yt,e)}getBundleCache(){return this.Ns}runTransaction(e,t,n){p("IndexedDbPersistence","Starting transaction:",e);const r="readonly"===t?"readonly":"readwrite",i=15===(s=this.Xs)?di:14===s?hi:13===s?li:12===s?ui:11===s?ci:void v();var s;let o;return this.ri.runTransaction(e,r,i,r=>(o=new fi(r,this.Ss?this.Ss.next():me.at),"readwrite-primary"===t?this.fi(o).next(e=>!!e||this.di(o)).next(t=>{if(!t)throw m(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Hs.enqueueRetryable(()=>this.si(!1)),new E(_.FAILED_PRECONDITION,ee);return n(o)}).next(e=>this.wi(o).next(()=>e)):this.Vi(o).next(()=>n(o)))).then(e=>(o.raiseOnCommittedEvent(),e))}Vi(e){return to(e).get("owner").next(e=>{if(null!==e&&this.pi(e.leaseTimestampMs,5e3)&&!this.Ei(e.ownerId)&&!this.mi(e)&&!(this.Ys||this.allowTabSynchronization&&e.allowTabSynchronization))throw new E(_.FAILED_PRECONDITION,Zs)})}wi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return to(e).put("owner",t)}static C(){return se.C()}_i(e){const t=to(e);return t.get("owner").next(e=>this.mi(e)?(p("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):re.resolve())}pi(e,t){const n=Date.now();return!(e<n-t||e>n&&(m(`Detected an update time that is in the future: ${e} > ${n}`),1))}ci(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.ti=()=>{this.Hs.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.ui()))},this.document.addEventListener("visibilitychange",this.ti),this.inForeground="visible"===this.document.visibilityState)}Ri(){this.ti&&(this.document.removeEventListener("visibilitychange",this.ti),this.ti=null)}ai(){var e;"function"==typeof(null===(e=this.window)||void 0===e?void 0:e.addEventListener)&&(this.Zs=()=>{this.Ai(),Object(o.B)()&&navigator.appVersion.match(/Version\/1[45]/)&&this.Hs.enterRestrictedMode(!0),this.Hs.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Zs))}bi(){this.Zs&&(this.window.removeEventListener("pagehide",this.Zs),this.Zs=null)}Ei(e){var t;try{const n=null!==(null===(t=this.oi)||void 0===t?void 0:t.getItem(this.Ti(e)));return p("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(e){return m("IndexedDbPersistence","Failed to get zombied client id.",e),!1}}Ai(){if(this.oi)try{this.oi.setItem(this.Ti(this.clientId),String(Date.now()))}catch(e){m("Failed to set zombie client id.",e)}}Pi(){if(this.oi)try{this.oi.removeItem(this.Ti(this.clientId))}catch(e){}}Ti(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function to(e){return pi(e,"owner")}function no(e){return pi(e,"clientMetadata")}function ro(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class io{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Si=n,this.Di=r}static Ci(e,t){let n=Xn(),r=Xn();for(const e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new io(e,t.fromCache,n,r)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(){this.xi=!1}initialize(e,t){this.Ni=e,this.indexManager=t,this.xi=!0}getDocumentsMatchingQuery(e,t,n,r){return this.ki(e,t).next(i=>i||this.Oi(e,t,r,n)).next(n=>n||this.Mi(e,t))}ki(e,t){if(qt(t))return re.resolve(null);let n=Wt(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=Qt(t,null,"F"),n=Wt(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const i=Xn(...r);return this.Ni.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const s=this.Fi(t,r);return this.$i(t,s,i,n.readTime)?this.ki(e,Qt(t,null,"F")):this.Bi(e,s,t,n)}))})))}Oi(e,t,n,r){return qt(t)||r.isEqual(U.min())?this.Mi(e,t):this.Ni.getDocuments(e,n).next(i=>{const o=this.Fi(t,i);return this.$i(t,o,n,r)?this.Mi(e,t):(d()<=s.a.DEBUG&&p("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Xt(t)),this.Bi(e,o,t,Y(r,-1)))})}Fi(e,t){let n=new Tt(tn(e));return t.forEach((t,r)=>{Zt(e,r)&&(n=n.add(r))}),n}$i(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Mi(e,t){return d()<=s.a.DEBUG&&p("QueryEngine","Using full collection scan to execute query:",Xt(t)),this.Ni.getDocumentsMatchingQuery(e,t,X.min())}Bi(e,t,n,r){return this.Ni.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(e,t,n,r){this.persistence=e,this.Li=t,this.yt=r,this.qi=new It(L),this.Ui=new Bn(e=>Rt(e),Pt),this.Ki=new Map,this.Gi=e.getRemoteDocumentCache(),this.Cs=e.getTargetCache(),this.Ns=e.getBundleCache(),this.Qi(n)}Qi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Us(this.Gi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Gi.setIndexManager(this.indexManager),this.Li.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.qi))}}function ao(e,t,n,r){return new oo(e,t,n,r)}async function co(e,t){const n=I(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(i=>(r=i,n.Qi(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const i=[],s=[];let o=Xn();for(const e of r){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({ji:e,removedBatchIds:i,addedBatchIds:s}))})})}function uo(e){const t=I(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Cs.getLastRemoteSnapshotVersion(e))}function lo(e,t,n){let r=Xn(),i=Xn();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=Gn();return n.forEach((n,s)=>{const o=e.get(n);s.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(U.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!o.isValidDocument()||s.version.compareTo(o.version)>0||0===s.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):p("LocalStore","Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",s.version)}),{Wi:r,zi:i}})}function ho(e,t){const n=I(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function fo(e,t){const n=I(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.Cs.getTargetData(e,t).next(i=>i?(r=i,re.resolve(r)):n.Cs.allocateTargetId(e).next(i=>(r=new vi(t,i,0,e.currentSequenceNumber),n.Cs.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.qi.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.qi=n.qi.insert(e.targetId,e),n.Ui.set(t,e.targetId)),e})}async function po(e,t,n){const r=I(e),i=r.qi.get(t),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,e=>r.persistence.referenceDelegate.removeTarget(e,i))}catch(e){if(!ce(e))throw e;p("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}r.qi=r.qi.remove(t),r.Ui.delete(i.target)}function mo(e,t,n){const r=I(e);let i=U.min(),s=Xn();return r.persistence.runTransaction("Execute query","readonly",e=>function(e,t,n){const r=I(e),i=r.Ui.get(n);return void 0!==i?re.resolve(r.qi.get(i)):r.Cs.getTargetData(t,n)}(r,e,Wt(t)).next(t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.Cs.getMatchingKeysForTargetId(e,t.targetId).next(e=>{s=e})}).next(()=>r.Li.getDocumentsMatchingQuery(e,t,n?i:U.min(),n?s:Xn())).next(e=>(vo(r,en(t),e),{documents:e,Hi:s})))}function go(e,t){const n=I(e),r=I(n.Cs),i=n.qi.get(t);return i?Promise.resolve(i.target):n.persistence.runTransaction("Get target data","readonly",e=>r.ne(e,t).next(e=>e?e.target:null))}function yo(e,t){const n=I(e),r=n.Ki.get(t)||U.min();return n.persistence.runTransaction("Get new document changes","readonly",e=>n.Gi.getAllFromCollectionGroup(e,t,Y(r,-1),Number.MAX_SAFE_INTEGER)).then(e=>(vo(n,t,e),e))}function vo(e,t,n){let r=e.Ki.get(t)||U.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Ki.set(t,r)}async function wo(e,t,n=Xn()){const r=await fo(e,Wt(Ai(t.bundledQuery))),i=I(e);return i.persistence.runTransaction("Save named query","readwrite",e=>{const s=yr(t.readTime);if(r.snapshotVersion.compareTo(s)>=0)return i.Ns.saveNamedQuery(e,t);const o=r.withResumeToken(Se.EMPTY_BYTE_STRING,s);return i.qi=i.qi.insert(o.targetId,o),i.Cs.updateTargetData(e,o).next(()=>i.Cs.removeMatchingKeysForTargetId(e,r.targetId)).next(()=>i.Cs.addMatchingKeys(e,n,r.targetId)).next(()=>i.Ns.saveNamedQuery(e,t))})}function bo(e,t){return`firestore_clients_${e}_${t}`}function Io(e,t,n){let r=`firestore_mutations_${e}_${n}`;return t.isAuthenticated()&&(r+="_"+t.uid),r}function _o(e,t){return`firestore_targets_${e}_${t}`}class Eo{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static Zi(e,t,n){const r=JSON.parse(n);let i,s="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return s&&r.error&&(s="string"==typeof r.error.message&&"string"==typeof r.error.code,s&&(i=new E(r.error.code,r.error.message))),s?new Eo(e,t,r.state,i):(m("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}tr(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class To{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Zi(e,t){const n=JSON.parse(t);let r,i="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return i&&n.error&&(i="string"==typeof n.error.message&&"string"==typeof n.error.code,i&&(r=new E(n.error.code,n.error.message))),i?new To(e,n.state,r):(m("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}tr(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class So{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Zi(e,t){const n=JSON.parse(t);let r="object"==typeof n&&n.activeTargetIds instanceof Array,i=er();for(let e=0;r&&e<n.activeTargetIds.length;++e)r=Ee(n.activeTargetIds[e]),i=i.add(n.activeTargetIds[e]);return r?new So(e,i):(m("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class ko{constructor(e,t){this.clientId=e,this.onlineState=t}static Zi(e){const t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new ko(t.clientId,t.onlineState):(m("SharedClientState","Failed to parse online state: "+e),null)}}class Ao{constructor(){this.activeTargetIds=er()}er(e){this.activeTargetIds=this.activeTargetIds.add(e)}nr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Co{constructor(e,t,n,r,i){this.window=e,this.Hs=t,this.persistenceKey=n,this.sr=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ir=this.rr.bind(this),this.ur=new It(L),this.started=!1,this.cr=[];const s=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.ar=bo(this.persistenceKey,this.sr),this.hr=function(e){return"firestore_sequence_number_"+e}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this.persistenceKey),this.ur=this.ur.insert(this.sr,new Ao),this.lr=new RegExp(`^firestore_clients_${s}_([^_]*)$`),this.dr=new RegExp(`^firestore_mutations_${s}_(\\d+)(?:_(.*))?$`),this._r=new RegExp(`^firestore_targets_${s}_(\\d+)$`),this.wr=function(e){return"firestore_online_state_"+e}(this.persistenceKey),this.mr=function(e){return"firestore_bundle_loaded_v2_"+e}(this.persistenceKey),this.window.addEventListener("storage",this.ir)}static C(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.vi();for(const t of e){if(t===this.sr)continue;const e=this.getItem(bo(this.persistenceKey,t));if(e){const n=So.Zi(t,e);n&&(this.ur=this.ur.insert(n.clientId,n))}}this.gr();const t=this.storage.getItem(this.wr);if(t){const e=this.yr(t);e&&this.pr(e)}for(const e of this.cr)this.rr(e);this.cr=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.hr,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Ir(this.ur)}isActiveQueryTarget(e){let t=!1;return this.ur.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.Tr(e,"pending")}updateMutationState(e,t,n){this.Tr(e,t,n),this.Er(e)}addLocalQueryTarget(e){let t="not-current";if(this.isActiveQueryTarget(e)){const n=this.storage.getItem(_o(this.persistenceKey,e));if(n){const r=To.Zi(e,n);r&&(t=r.state)}}return this.Ar.er(e),this.gr(),t}removeLocalQueryTarget(e){this.Ar.nr(e),this.gr()}isLocalQueryTarget(e){return this.Ar.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(_o(this.persistenceKey,e))}updateQueryState(e,t,n){this.Rr(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.Er(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.br(e)}notifyBundleLoaded(e){this.Pr(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ir),this.removeItem(this.ar),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return p("SharedClientState","READ",e,t),t}setItem(e,t){p("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){p("SharedClientState","REMOVE",e),this.storage.removeItem(e)}rr(e){const t=e;if(t.storageArea===this.storage){if(p("SharedClientState","EVENT",t.key,t.newValue),t.key===this.ar)return void m("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Hs.enqueueRetryable(async()=>{if(this.started){if(null!==t.key)if(this.lr.test(t.key)){if(null==t.newValue){const e=this.vr(t.key);return this.Vr(e,null)}{const e=this.Sr(t.key,t.newValue);if(e)return this.Vr(e.clientId,e)}}else if(this.dr.test(t.key)){if(null!==t.newValue){const e=this.Dr(t.key,t.newValue);if(e)return this.Cr(e)}}else if(this._r.test(t.key)){if(null!==t.newValue){const e=this.Nr(t.key,t.newValue);if(e)return this.kr(e)}}else if(t.key===this.wr){if(null!==t.newValue){const e=this.yr(t.newValue);if(e)return this.pr(e)}}else if(t.key===this.hr){const e=function(e){let t=me.at;if(null!=e)try{const n=JSON.parse(e);w("number"==typeof n),t=n}catch(e){m("SharedClientState","Failed to read sequence number from WebStorage",e)}return t}(t.newValue);e!==me.at&&this.sequenceNumberHandler(e)}else if(t.key===this.mr){const e=this.Or(t.newValue);await Promise.all(e.map(e=>this.syncEngine.Mr(e)))}}else this.cr.push(t)})}}get Ar(){return this.ur.get(this.sr)}gr(){this.setItem(this.ar,this.Ar.tr())}Tr(e,t,n){const r=new Eo(this.currentUser,e,t,n),i=Io(this.persistenceKey,this.currentUser,e);this.setItem(i,r.tr())}Er(e){const t=Io(this.persistenceKey,this.currentUser,e);this.removeItem(t)}br(e){const t={clientId:this.sr,onlineState:e};this.storage.setItem(this.wr,JSON.stringify(t))}Rr(e,t,n){const r=_o(this.persistenceKey,e),i=new To(e,t,n);this.setItem(r,i.tr())}Pr(e){const t=JSON.stringify(Array.from(e));this.setItem(this.mr,t)}vr(e){const t=this.lr.exec(e);return t?t[1]:null}Sr(e,t){const n=this.vr(e);return So.Zi(n,t)}Dr(e,t){const n=this.dr.exec(e),r=Number(n[1]),i=void 0!==n[2]?n[2]:null;return Eo.Zi(new u(i),r,t)}Nr(e,t){const n=this._r.exec(e),r=Number(n[1]);return To.Zi(r,t)}yr(e){return ko.Zi(e)}Or(e){return JSON.parse(e)}async Cr(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Fr(e.batchId,e.state,e.error);p("SharedClientState","Ignoring mutation for non-active user "+e.user.uid)}kr(e){return this.syncEngine.$r(e.targetId,e.state,e.error)}Vr(e,t){const n=t?this.ur.insert(e,t):this.ur.remove(e),r=this.Ir(this.ur),i=this.Ir(n),s=[],o=[];return i.forEach(e=>{r.has(e)||s.push(e)}),r.forEach(e=>{i.has(e)||o.push(e)}),this.syncEngine.Br(s,o).then(()=>{this.ur=n})}pr(e){this.ur.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Ir(e){let t=er();return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class Oo{constructor(){this.Lr=new Ao,this.qr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.Lr.er(e),this.qr[e]||"not-current"}updateQueryState(e,t,n){this.qr[e]=t}removeLocalQueryTarget(e){this.Lr.nr(e)}isLocalQueryTarget(e){return this.Lr.activeTargetIds.has(e)}clearQueryState(e){delete this.qr[e]}getAllActiveQueryTargets(){return this.Lr.activeTargetIds}isActiveQueryTarget(e){return this.Lr.activeTargetIds.has(e)}start(){return this.Lr=new Ao,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{Ur(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(){this.Kr=()=>this.Gr(),this.Qr=()=>this.jr(),this.Wr=[],this.zr()}Ur(e){this.Wr.push(e)}shutdown(){window.removeEventListener("online",this.Kr),window.removeEventListener("offline",this.Qr)}zr(){window.addEventListener("online",this.Kr),window.addEventListener("offline",this.Qr)}Gr(){p("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.Wr)e(0)}jr(){p("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.Wr)e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e){this.Hr=e.Hr,this.Jr=e.Jr}Yr(e){this.Xr=e}Zr(e){this.eo=e}onMessage(e){this.no=e}close(){this.Jr()}send(e){this.Hr(e)}so(){this.Xr()}io(e){this.eo(e)}ro(e){this.no(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http";this.oo=t+"://"+e.host,this.uo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get co(){return!1}ao(e,t,n,r,i){const s=this.ho(e,t);p("RestConnection","Sending: ",s,n);const o={};return this.lo(o,r,i),this.fo(e,s,o,n).then(e=>(p("RestConnection","Received: ",e),e),t=>{throw g("RestConnection",e+" failed with error: ",t,"url: ",s,"request:",n),t})}_o(e,t,n,r,i,s){return this.ao(e,t,n,r,i)}lo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+l,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}ho(e,t){const n=Do[e];return`${this.oo}/v1/${t}:${n}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}fo(e,t,n,r){return new Promise((i,s)=>{const o=new a.g;o.setWithCredentials(!0),o.listenOnce(a.c.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case a.a.NO_ERROR:const t=o.getResponseJson();p("Connection","XHR received:",JSON.stringify(t)),i(t);break;case a.a.TIMEOUT:p("Connection",'RPC "'+e+'" timed out'),s(new E(_.DEADLINE_EXCEEDED,"Request time out"));break;case a.a.HTTP_ERROR:const n=o.getStatus();if(p("Connection",'RPC "'+e+'" failed with status:',n,"response text:",o.getResponseText()),n>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=null==e?void 0:e.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(_).indexOf(t)>=0?t:_.UNKNOWN}(t.status);s(new E(e,t.message))}else s(new E(_.UNKNOWN,"Server responded with status "+o.getStatus()))}else s(new E(_.UNAVAILABLE,"Connection failed."));break;default:v()}}finally{p("Connection",'RPC "'+e+'" completed.')}});const c=JSON.stringify(r);o.send(t,"POST",c,n,15)})}wo(e,t,n){const r=[this.oo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=Object(a.h)(),s=Object(a.i)(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(o.xmlHttpFactory=new a.d({})),this.lo(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;const c=r.join("");p("Connection","Creating WebChannel: "+c,o);const u=i.createWebChannel(c,o);let l=!1,h=!1;const d=new Ro({Hr:e=>{h?p("Connection","Not sending because WebChannel is closed:",e):(l||(p("Connection","Opening WebChannel transport."),u.open(),l=!0),p("Connection","WebChannel sending:",e),u.send(e))},Jr:()=>u.close()}),f=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return f(u,a.f.EventType.OPEN,()=>{h||p("Connection","WebChannel transport opened.")}),f(u,a.f.EventType.CLOSE,()=>{h||(h=!0,p("Connection","WebChannel transport closed"),d.io())}),f(u,a.f.EventType.ERROR,e=>{h||(h=!0,g("Connection","WebChannel transport errored:",e),d.io(new E(_.UNAVAILABLE,"The operation could not be completed")))}),f(u,a.f.EventType.MESSAGE,e=>{var t;if(!h){const n=e.data[0];w(!!n);const r=n,i=r.error||(null===(t=r[0])||void 0===t?void 0:t.error);if(i){p("Connection","WebChannel received error:",i);const e=i.status;let t=function(e){const t=Fn[e];if(void 0!==t)return Vn(t)}(e),n=i.message;void 0===t&&(t=_.INTERNAL,n="Unknown error status: "+e+" with message "+i.message),h=!0,d.io(new E(t,n)),u.close()}else p("Connection","WebChannel received:",n),d.ro(n)}}),f(s,a.b.STAT_EVENT,e=>{e.stat===a.e.PROXY?p("Connection","Detected buffering proxy"):e.stat===a.e.NOPROXY&&p("Connection","Detected no buffering proxy")}),setTimeout(()=>{d.so()},0),d}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(){return"undefined"!=typeof window?window:null}function Mo(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fo(e){return new fr(e,!0)}class jo{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Hs=e,this.timerId=t,this.mo=n,this.yo=r,this.po=i,this.Io=0,this.To=null,this.Eo=Date.now(),this.reset()}reset(){this.Io=0}Ao(){this.Io=this.po}Ro(e){this.cancel();const t=Math.floor(this.Io+this.bo()),n=Math.max(0,Date.now()-this.Eo),r=Math.max(0,t-n);r>0&&p("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Io} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.To=this.Hs.enqueueAfterDelay(this.timerId,r,()=>(this.Eo=Date.now(),e())),this.Io*=this.yo,this.Io<this.mo&&(this.Io=this.mo),this.Io>this.po&&(this.Io=this.po)}Po(){null!==this.To&&(this.To.skipDelay(),this.To=null)}cancel(){null!==this.To&&(this.To.cancel(),this.To=null)}bo(){return(Math.random()-.5)*this.Io}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(e,t,n,r,i,s,o,a){this.Hs=e,this.vo=n,this.Vo=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.So=0,this.Do=null,this.Co=null,this.stream=null,this.xo=new jo(e,t)}No(){return 1===this.state||5===this.state||this.ko()}ko(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Oo()}async stop(){this.No()&&await this.close(0)}Mo(){this.state=0,this.xo.reset()}Fo(){this.ko()&&null===this.Do&&(this.Do=this.Hs.enqueueAfterDelay(this.vo,6e4,()=>this.$o()))}Bo(e){this.Lo(),this.stream.send(e)}async $o(){if(this.ko())return this.close(0)}Lo(){this.Do&&(this.Do.cancel(),this.Do=null)}qo(){this.Co&&(this.Co.cancel(),this.Co=null)}async close(e,t){this.Lo(),this.qo(),this.xo.cancel(),this.So++,4!==e?this.xo.reset():t&&t.code===_.RESOURCE_EXHAUSTED?(m(t.toString()),m("Using maximum backoff delay to prevent overloading the backend."),this.xo.Ao()):t&&t.code===_.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Uo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zr(t)}Uo(){}auth(){this.state=1;const e=this.Ko(this.So),t=this.So;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.So===t&&this.Go(e,n)},t=>{e(()=>{const e=new E(_.UNKNOWN,"Fetching auth token failed: "+t.message);return this.Qo(e)})})}Go(e,t){const n=this.Ko(this.So);this.stream=this.jo(e,t),this.stream.Yr(()=>{n(()=>(this.state=2,this.Co=this.Hs.enqueueAfterDelay(this.Vo,1e4,()=>(this.ko()&&(this.state=3),Promise.resolve())),this.listener.Yr()))}),this.stream.Zr(e=>{n(()=>this.Qo(e))}),this.stream.onMessage(e=>{n(()=>this.onMessage(e))})}Oo(){this.state=5,this.xo.Ro(async()=>{this.state=0,this.start()})}Qo(e){return p("PersistentStream","close with error: "+e),this.stream=null,this.close(4,e)}Ko(e){return t=>{this.Hs.enqueueAndForget(()=>this.So===e?t():(p("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Vo extends Uo{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.yt=i}jo(e,t){return this.connection.wo("Listen",e,t)}onMessage(e){this.xo.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:v()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],s=function(e,t){return e.wt?(w(void 0===t||"string"==typeof t),Se.fromBase64String(t||"")):(w(void 0===t||t instanceof Uint8Array),Se.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?_.UNKNOWN:Vn(e.code);return new E(t,e.message||"")}(o);n=new sr(r,i,s,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=Ir(e,r.document.name),s=yr(r.document.updateTime),o=r.document.createTime?yr(r.document.createTime):U.min(),a=new Ct({mapValue:{fields:r.document.fields}}),c=xt.newFoundDocument(i,s,o,a),u=r.targetIds||[],l=r.removedTargetIds||[];n=new rr(u,l,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=Ir(e,r.document),s=r.readTime?yr(r.readTime):U.min(),o=xt.newNoDocument(i,s),a=r.removedTargetIds||[];n=new rr([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=Ir(e,r.document),s=r.removedTargetIds||[];n=new rr([],s,i,null)}else{if(!("filter"in t))return v();{t.filter;const e=t.filter;e.targetId;const r=e.count||0,i=new Mn(r),s=e.targetId;n=new ir(s,i)}}return n}(this.yt,e),n=function(e){if(!("targetChange"in e))return U.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?U.min():t.readTime?yr(t.readTime):U.min()}(e);return this.listener.Wo(t,n)}zo(e){const t={};t.database=Tr(this.yt),t.addTarget=function(e,t){let n;const r=t.target;return n=Lt(r)?{documents:xr(e,r)}:{query:Nr(e,r)},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0?n.resumeToken=mr(e,t.resumeToken):t.snapshotVersion.compareTo(U.min())>0&&(n.readTime=pr(e,t.snapshotVersion.toTimestamp())),n}(this.yt,e);const n=function(e,t){const n=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return v()}}(0,t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.yt,e);n&&(t.labels=n),this.Bo(t)}Ho(e){const t={};t.database=Tr(this.yt),t.removeTarget=e,this.Bo(t)}}class Bo extends Uo{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.yt=i,this.Jo=!1}get Yo(){return this.Jo}start(){this.Jo=!1,this.lastStreamToken=void 0,super.start()}Uo(){this.Jo&&this.Xo([])}jo(e,t){return this.connection.wo("Write",e,t)}onMessage(e){if(w(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Jo){this.xo.reset();const t=function(e,t){return e&&e.length>0?(w(void 0!==t),e.map(e=>function(e,t){let n=e.updateTime?yr(e.updateTime):yr(t);return n.isEqual(U.min())&&(n=yr(t)),new bn(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=yr(e.commitTime);return this.listener.Zo(n,t)}return w(!e.writeResults||0===e.writeResults.length),this.Jo=!0,this.listener.tu()}eu(){const e={};e.database=Tr(this.yt),this.Bo(e)}Xo(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>Cr(this.yt,e))};this.Bo(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo extends class{}{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.yt=r,this.nu=!1}su(){if(this.nu)throw new E(_.FAILED_PRECONDITION,"The client has already been terminated.")}ao(e,t,n){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.ao(e,t,n,r,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new E(_.UNKNOWN,e.toString())})}_o(e,t,n,r){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection._o(e,t,n,i,s,r)).catch(e=>{throw"FirebaseError"===e.name?(e.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new E(_.UNKNOWN,e.toString())})}terminate(){this.nu=!0}}class Go{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.iu=0,this.ru=null,this.ou=!0}uu(){0===this.iu&&(this.cu("Unknown"),this.ru=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.ru=null,this.au("Backend didn't respond within 10 seconds."),this.cu("Offline"),Promise.resolve())))}hu(e){"Online"===this.state?this.cu("Unknown"):(this.iu++,this.iu>=1&&(this.lu(),this.au("Connection failed 1 times. Most recent error: "+e.toString()),this.cu("Offline")))}set(e){this.lu(),this.iu=0,"Online"===e&&(this.ou=!1),this.cu(e)}cu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}au(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ou?(m(t),this.ou=!1):p("OnlineStateTracker",t)}lu(){null!==this.ru&&(this.ru.cancel(),this.ru=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.fu=[],this.du=new Map,this._u=new Set,this.wu=[],this.mu=i,this.mu.Ur(e=>{n.enqueueAndForget(async()=>{Zo(this)&&(p("RemoteStore","Restarting streams for network reachability change."),await async function(e){const t=I(e);t._u.add(4),await $o(t),t.gu.set("Unknown"),t._u.delete(4),await zo(t)}(this))})}),this.gu=new Go(n,r)}}async function zo(e){if(Zo(e))for(const t of e.wu)await t(!0)}async function $o(e){for(const t of e.wu)await t(!1)}function Wo(e,t){const n=I(e);n.du.has(t.targetId)||(n.du.set(t.targetId,t),Xo(n)?Jo(n):ya(n).ko()&&Qo(n,t))}function Ho(e,t){const n=I(e),r=ya(n);n.du.delete(t),r.ko()&&Yo(n,t),0===n.du.size&&(r.ko()?r.Fo():Zo(n)&&n.gu.set("Unknown"))}function Qo(e,t){e.yu.Ot(t.targetId),ya(e).zo(t)}function Yo(e,t){e.yu.Ot(t),ya(e).Ho(t)}function Jo(e){e.yu=new ar({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ne:t=>e.du.get(t)||null}),ya(e).start(),e.gu.uu()}function Xo(e){return Zo(e)&&!ya(e).No()&&e.du.size>0}function Zo(e){return 0===I(e)._u.size}function ea(e){e.yu=void 0}async function ta(e){e.du.forEach((t,n)=>{Qo(e,t)})}async function na(e,t){ea(e),Xo(e)?(e.gu.hu(t),Jo(e)):e.gu.set("Unknown")}async function ra(e,t,n){if(e.gu.set("Online"),t instanceof sr&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.du.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.du.delete(r),e.yu.removeTarget(r))}(e,t)}catch(n){p("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await ia(e,n)}else if(t instanceof rr?e.yu.Kt(t):t instanceof ir?e.yu.Jt(t):e.yu.jt(t),!n.isEqual(U.min()))try{const t=await uo(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.yu.Zt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.du.get(r);i&&e.du.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach(t=>{const n=e.du.get(t);if(!n)return;e.du.set(t,n.withResumeToken(Se.EMPTY_BYTE_STRING,n.snapshotVersion)),Yo(e,t);const r=new vi(n.target,t,1,n.sequenceNumber);Qo(e,r)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){p("RemoteStore","Failed to raise snapshot:",t),await ia(e,t)}}async function ia(e,t,n){if(!ce(t))throw t;e._u.add(1),await $o(e),e.gu.set("Offline"),n||(n=()=>uo(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{p("RemoteStore","Retrying IndexedDB access"),await n(),e._u.delete(1),await zo(e)})}function sa(e,t){return t().catch(n=>ia(e,n,t))}async function oa(e){const t=I(e),n=va(t);let r=t.fu.length>0?t.fu[t.fu.length-1].batchId:-1;for(;aa(t);)try{const e=await ho(t.localStore,r);if(null===e){0===t.fu.length&&n.Fo();break}r=e.batchId,ca(t,e)}catch(e){await ia(t,e)}ua(t)&&la(t)}function aa(e){return Zo(e)&&e.fu.length<10}function ca(e,t){e.fu.push(t);const n=va(e);n.ko()&&n.Yo&&n.Xo(t.mutations)}function ua(e){return Zo(e)&&!va(e).No()&&e.fu.length>0}function la(e){va(e).start()}async function ha(e){va(e).eu()}async function da(e){const t=va(e);for(const n of e.fu)t.Xo(n.mutations)}async function fa(e,t,n){const r=e.fu.shift(),i=gi.from(r,t,n);await sa(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await oa(e)}async function pa(e,t){t&&va(e).Yo&&await async function(e,t){if(Un(n=t.code)&&n!==_.ABORTED){const n=e.fu.shift();va(e).Mo(),await sa(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await oa(e)}var n}(e,t),ua(e)&&la(e)}async function ma(e,t){const n=I(e);n.asyncQueue.verifyOperationInProgress(),p("RemoteStore","RemoteStore received new credentials");const r=Zo(n);n._u.add(3),await $o(n),r&&n.gu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n._u.delete(3),await zo(n)}async function ga(e,t){const n=I(e);t?(n._u.delete(2),await zo(n)):t||(n._u.add(2),await $o(n),n.gu.set("Unknown"))}function ya(e){return e.pu||(e.pu=function(e,t,n){const r=I(e);return r.su(),new Vo(t,r.connection,r.authCredentials,r.appCheckCredentials,r.yt,n)
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}(e.datastore,e.asyncQueue,{Yr:ta.bind(null,e),Zr:na.bind(null,e),Wo:ra.bind(null,e)}),e.wu.push(async t=>{t?(e.pu.Mo(),Xo(e)?Jo(e):e.gu.set("Unknown")):(await e.pu.stop(),ea(e))})),e.pu}function va(e){return e.Iu||(e.Iu=function(e,t,n){const r=I(e);return r.su(),new Bo(t,r.connection,r.authCredentials,r.appCheckCredentials,r.yt,n)}(e.datastore,e.asyncQueue,{Yr:ha.bind(null,e),Zr:pa.bind(null,e),tu:da.bind(null,e),Zo:fa.bind(null,e)}),e.wu.push(async t=>{t?(e.Iu.Mo(),await oa(e)):(await e.Iu.stop(),e.fu.length>0&&(p("RemoteStore",`Stopping write stream with ${e.fu.length} pending writes`),e.fu=[]))})),e.Iu
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class wa{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new T,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}static createAndSchedule(e,t,n,r,i){const s=Date.now()+n,o=new wa(e,t,s,r,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new E(_.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ba(e,t){if(m("AsyncQueue",`${t}: ${e}`),ce(e))return new E(_.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e){this.comparator=e?(t,n)=>e(t,n)||K.comparator(t.key,n.key):(e,t)=>K.comparator(e.key,t.key),this.keyedMap=zn(),this.sortedSet=new It(this.comparator)}static emptySet(e){return new Ia(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ia))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Ia;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(){this.Tu=new It(K.comparator)}track(e){const t=e.doc.key,n=this.Tu.get(t);n?0!==e.type&&3===n.type?this.Tu=this.Tu.insert(t,e):3===e.type&&1!==n.type?this.Tu=this.Tu.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.Tu=this.Tu.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.Tu=this.Tu.remove(t):1===e.type&&2===n.type?this.Tu=this.Tu.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):v():this.Tu=this.Tu.insert(t,e)}Eu(){const e=[];return this.Tu.inorderTraversal((t,n)=>{e.push(n)}),e}}class Ea{constructor(e,t,n,r,i,s,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,i){const s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new Ea(e,t,Ia.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Yt(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(){this.Au=void 0,this.listeners=[]}}class Sa{constructor(){this.queries=new Bn(e=>Jt(e),Yt),this.onlineState="Unknown",this.Ru=new Set}}async function ka(e,t){const n=I(e),r=t.query;let i=!1,s=n.queries.get(r);if(s||(i=!0,s=new Ta),i)try{s.Au=await n.onListen(r)}catch(e){const n=ba(e,`Initialization of query '${Xt(t.query)}' failed`);return void t.onError(n)}n.queries.set(r,s),s.listeners.push(t),t.bu(n.onlineState),s.Au&&t.Pu(s.Au)&&xa(n)}async function Aa(e,t){const n=I(e),r=t.query;let i=!1;const s=n.queries.get(r);if(s){const e=s.listeners.indexOf(t);e>=0&&(s.listeners.splice(e,1),i=0===s.listeners.length)}if(i)return n.queries.delete(r),n.onUnlisten(r)}function Ca(e,t){const n=I(e);let r=!1;for(const e of t){const t=e.query,i=n.queries.get(t);if(i){for(const t of i.listeners)t.Pu(e)&&(r=!0);i.Au=e}}r&&xa(n)}function Oa(e,t,n){const r=I(e),i=r.queries.get(t);if(i)for(const e of i.listeners)e.onError(n);r.queries.delete(t)}function xa(e){e.Ru.forEach(e=>{e.next()})}class Na{constructor(e,t,n){this.query=e,this.vu=t,this.Vu=!1,this.Su=null,this.onlineState="Unknown",this.options=n||{}}Pu(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Ea(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.Du(e)&&(this.vu.next(e),t=!0):this.Cu(e,this.onlineState)&&(this.xu(e),t=!0),this.Su=e,t}onError(e){this.vu.error(e)}bu(e){this.onlineState=e;let t=!1;return this.Su&&!this.Vu&&this.Cu(this.Su,e)&&(this.xu(this.Su),t=!0),t}Cu(e,t){if(!e.fromCache)return!0;const n="Offline"!==t;return(!this.options.Nu||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Du(e){if(e.docChanges.length>0)return!0;const t=this.Su&&this.Su.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}xu(e){e=Ea.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.vu.next(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,t){this.ku=e,this.byteLength=t}Ou(){return"metadata"in this.ku}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e){this.yt=e}Ji(e){return Ir(this.yt,e)}Yi(e){return e.metadata.exists?Ar(this.yt,e.document,!1):xt.newNoDocument(this.Ji(e.metadata.name),this.Xi(e.metadata.readTime))}Xi(e){return yr(e)}}class Pa{constructor(e,t,n){this.Mu=e,this.localStore=t,this.yt=n,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=La(e)}Fu(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.ku.namedQuery)this.queries.push(e.ku.namedQuery);else if(e.ku.documentMetadata){this.documents.push({metadata:e.ku.documentMetadata}),e.ku.documentMetadata.exists||++t;const n=B.fromString(e.ku.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.ku.document&&(this.documents[this.documents.length-1].document=e.ku.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}$u(e){const t=new Map,n=new Ra(this.yt);for(const r of e)if(r.metadata.queries){const e=n.Ji(r.metadata.name);for(const n of r.metadata.queries){const r=(t.get(n)||Xn()).add(e);t.set(n,r)}}return t}async complete(){const e=await async function(e,t,n,r){const i=I(e);let s=Xn(),o=Gn();for(const e of n){const n=t.Ji(e.metadata.name);e.document&&(s=s.add(n));const r=t.Yi(e);r.setReadTime(t.Xi(e.metadata.readTime)),o=o.insert(n,r)}const a=i.Gi.newChangeBuffer({trackRemovals:!0}),c=await fo(i,function(e){return Wt(Bt(B.fromString("__bundle__/docs/"+e)))}(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",e=>lo(e,a,o).next(t=>(a.apply(e),t)).next(t=>i.Cs.removeMatchingKeysForTargetId(e,c.targetId).next(()=>i.Cs.addMatchingKeys(e,s,c.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(e,t.Wi,t.zi)).next(()=>t.Wi)))}(this.localStore,new Ra(this.yt),this.documents,this.Mu.id),t=this.$u(this.documents);for(const e of this.queries)await wo(this.localStore,e,t.get(e.name));return this.progress.taskState="Success",{progress:this.progress,Bu:this.collectionGroups,Lu:e}}}function La(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e){this.key=e}}class Fa{constructor(e){this.key=e}}class ja{constructor(e,t){this.query=e,this.qu=t,this.Uu=null,this.hasCachedResults=!1,this.current=!1,this.Ku=Xn(),this.mutatedKeys=Xn(),this.Gu=tn(e),this.Qu=new Ia(this.Gu)}get ju(){return this.qu}Wu(e,t){const n=t?t.zu:new _a,r=t?t.Qu:this.Qu;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const u=r.get(e),l=Zt(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let f=!1;u&&l?u.data.isEqual(l.data)?h!==d&&(n.track({type:3,doc:l}),f=!0):this.Hu(u,l)||(n.track({type:2,doc:l}),f=!0,(a&&this.Gu(l,a)>0||c&&this.Gu(l,c)<0)&&(o=!0)):!u&&l?(n.track({type:0,doc:l}),f=!0):u&&!l&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(l?(s=s.add(l),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){const e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{Qu:s,zu:n,$i:o,mutatedKeys:i}}Hu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n){const r=this.Qu;this.Qu=e.Qu,this.mutatedKeys=e.mutatedKeys;const i=e.zu.Eu();i.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return v()}};return n(e)-n(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e.type,t.type)||this.Gu(e.doc,t.doc)),this.Ju(n);const s=t?this.Yu():[],o=0===this.Ku.size&&this.current?1:0,a=o!==this.Uu;return this.Uu=o,0!==i.length||a?{snapshot:new Ea(this.query,e.Qu,r,i,e.mutatedKeys,0===o,a,!1,!!n&&n.resumeToken.approximateByteSize()>0),Xu:s}:{Xu:s}}bu(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Qu:this.Qu,zu:new _a,mutatedKeys:this.mutatedKeys,$i:!1},!1)):{Xu:[]}}Zu(e){return!this.qu.has(e)&&!!this.Qu.has(e)&&!this.Qu.get(e).hasLocalMutations}Ju(e){e&&(e.addedDocuments.forEach(e=>this.qu=this.qu.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.qu=this.qu.delete(e)),this.current=e.current)}Yu(){if(!this.current)return[];const e=this.Ku;this.Ku=Xn(),this.Qu.forEach(e=>{this.Zu(e.key)&&(this.Ku=this.Ku.add(e.key))});const t=[];return e.forEach(e=>{this.Ku.has(e)||t.push(new Fa(e))}),this.Ku.forEach(n=>{e.has(n)||t.push(new Ma(n))}),t}tc(e){this.qu=e.Hi,this.Ku=Xn();const t=this.Wu(e.documents);return this.applyChanges(t,!0)}ec(){return Ea.fromInitialDocuments(this.query,this.Qu,this.mutatedKeys,0===this.Uu,this.hasCachedResults)}}class Ua{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Va{constructor(e){this.key=e,this.nc=!1}}class Ba{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.sc={},this.ic=new Bn(e=>Jt(e),Yt),this.rc=new Map,this.oc=new Set,this.uc=new It(K.comparator),this.cc=new Map,this.ac=new qs,this.hc={},this.lc=new Map,this.fc=vs.vn(),this.onlineState="Unknown",this.dc=void 0}get isPrimaryClient(){return!0===this.dc}}async function qa(e,t){const n=pc(e);let r,i;const s=n.ic.get(t);if(s)r=s.targetId,n.sharedClientState.addLocalQueryTarget(r),i=s.view.ec();else{const e=await fo(n.localStore,Wt(t));n.isPrimaryClient&&Wo(n.remoteStore,e);const s=n.sharedClientState.addLocalQueryTarget(e.targetId);r=e.targetId,i=await Ga(n,t,r,"current"===s,e.resumeToken)}return i}async function Ga(e,t,n,r,i){e._c=(t,n,r)=>async function(e,t,n,r){let i=t.view.Wu(n);i.$i&&(i=await mo(e.localStore,t.query,!1).then(({documents:e})=>t.view.Wu(e,i)));const s=r&&r.targetChanges.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s);return ec(e,t.targetId,o.Xu),o.snapshot}(e,t,n,r);const s=await mo(e.localStore,t,!0),o=new ja(t,s.Hi),a=o.Wu(s.documents),c=nr.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=o.applyChanges(a,e.isPrimaryClient,c);ec(e,n,u.Xu);const l=new Ua(t,n,o);return e.ic.set(t,l),e.rc.has(n)?e.rc.get(n).push(t):e.rc.set(n,[t]),u.snapshot}async function Ka(e,t){const n=I(e),r=n.ic.get(t),i=n.rc.get(r.targetId);if(i.length>1)return n.rc.set(r.targetId,i.filter(e=>!Yt(e,t))),void n.ic.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await po(n.localStore,r.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(r.targetId),Ho(n.remoteStore,r.targetId),Xa(n,r.targetId)}).catch(ne)):(Xa(n,r.targetId),await po(n.localStore,r.targetId,!0))}async function za(e,t){const n=I(e);try{const e=await function(e,t){const n=I(e),r=t.snapshotVersion;let i=n.qi;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const s=n.Gi.newChangeBuffer({trackRemovals:!0});i=n.qi;const o=[];t.targetChanges.forEach((s,a)=>{const c=i.get(a);if(!c)return;o.push(n.Cs.removeMatchingKeys(e,s.removedDocuments,a).next(()=>n.Cs.addMatchingKeys(e,s.addedDocuments,a)));let u=c.withSequenceNumber(e.currentSequenceNumber);t.targetMismatches.has(a)?u=u.withResumeToken(Se.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):s.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(s.resumeToken,r)),i=i.insert(a,u),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0)}(c,u,s)&&o.push(n.Cs.updateTargetData(e,u))});let a=Gn(),c=Xn();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(lo(e,s,t.documentUpdates).next(e=>{a=e.Wi,c=e.zi})),!r.isEqual(U.min())){const t=n.Cs.getLastRemoteSnapshotVersion(e).next(t=>n.Cs.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return re.waitFor(o).next(()=>s.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.qi=i,e))}(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.cc.get(t);r&&(w(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1),e.addedDocuments.size>0?r.nc=!0:e.modifiedDocuments.size>0?w(r.nc):e.removedDocuments.size>0&&(w(r.nc),r.nc=!1))}),await rc(n,e,t)}catch(e){await ne(e)}}function $a(e,t,n){const r=I(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.ic.forEach((n,r)=>{const i=r.view.bu(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){const n=I(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const e of n.listeners)e.bu(t)&&(r=!0)}),r&&xa(n)}(r.eventManager,t),e.length&&r.sc.Wo(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Wa(e,t,n){const r=I(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.cc.get(t),s=i&&i.key;if(s){let e=new It(K.comparator);e=e.insert(s,xt.newNoDocument(s,U.min()));const n=Xn().add(s),i=new tr(U.min(),new Map,new Tt(L),e,n);await za(r,i),r.uc=r.uc.remove(s),r.cc.delete(t),nc(r)}else await po(r.localStore,t,!1).then(()=>Xa(r,t,n)).catch(ne)}async function Ha(e,t){const n=I(e),r=t.batch.batchId;try{const e=await function(e,t){const n=I(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),i=n.Gi.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,s=i.keys();let o=re.resolve();return s.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const s=n.docVersions.get(e);w(null!==s),t.version.compareTo(s)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,i))}(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=Xn();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}(n.localStore,t);Ja(n,r,null),Ya(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await rc(n,e)}catch(e){await ne(e)}}async function Qa(e,t,n){const r=I(e);try{const e=await function(e,t){const n=I(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(w(null!==t),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);Ja(r,t,n),Ya(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await rc(r,e)}catch(n){await ne(n)}}function Ya(e,t){(e.lc.get(t)||[]).forEach(e=>{e.resolve()}),e.lc.delete(t)}function Ja(e,t,n){const r=I(e);let i=r.hc[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.hc[r.currentUser.toKey()]=i}}function Xa(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.rc.get(t))e.ic.delete(r),n&&e.sc.wc(r,n);e.rc.delete(t),e.isPrimaryClient&&e.ac.ls(t).forEach(t=>{e.ac.containsKey(t)||Za(e,t)})}function Za(e,t){e.oc.delete(t.path.canonicalString());const n=e.uc.get(t);null!==n&&(Ho(e.remoteStore,n),e.uc=e.uc.remove(t),e.cc.delete(n),nc(e))}function ec(e,t,n){for(const r of n)r instanceof Ma?(e.ac.addReference(r.key,t),tc(e,r)):r instanceof Fa?(p("SyncEngine","Document no longer in limbo: "+r.key),e.ac.removeReference(r.key,t),e.ac.containsKey(r.key)||Za(e,r.key)):v()}function tc(e,t){const n=t.key,r=n.path.canonicalString();e.uc.get(n)||e.oc.has(r)||(p("SyncEngine","New document in limbo: "+n),e.oc.add(r),nc(e))}function nc(e){for(;e.oc.size>0&&e.uc.size<e.maxConcurrentLimboResolutions;){const t=e.oc.values().next().value;e.oc.delete(t);const n=new K(B.fromString(t)),r=e.fc.next();e.cc.set(r,new Va(n)),e.uc=e.uc.insert(n,r),Wo(e.remoteStore,new vi(Wt(Bt(n.path)),r,2,me.at))}}async function rc(e,t,n){const r=I(e),i=[],s=[],o=[];r.ic.isEmpty()||(r.ic.forEach((e,a)=>{o.push(r._c(a,t,n).then(e=>{if((e||n)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,(null==e?void 0:e.fromCache)?"not-current":"current"),e){i.push(e);const t=io.Ci(a.targetId,e);s.push(t)}}))}),await Promise.all(o),r.sc.Wo(i),await async function(e,t){const n=I(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>re.forEach(t,t=>re.forEach(t.Si,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>re.forEach(t.Di,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!ce(e))throw e;p("LocalStore","Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.qi.get(t),r=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(r);n.qi=n.qi.insert(t,i)}}}(r.localStore,s))}async function ic(e,t){const n=I(e);if(!n.currentUser.isEqual(t)){p("SyncEngine","User change. New user:",t.toKey());const e=await co(n.localStore,t);n.currentUser=t,function(e,t){e.lc.forEach(e=>{e.forEach(e=>{e.reject(new E(_.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.lc.clear()}(n),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await rc(n,e.ji)}}function sc(e,t){const n=I(e),r=n.cc.get(t);if(r&&r.nc)return Xn().add(r.key);{let e=Xn();const r=n.rc.get(t);if(!r)return e;for(const t of r){const r=n.ic.get(t);e=e.unionWith(r.view.ju)}return e}}async function oc(e,t){const n=I(e),r=await mo(n.localStore,t.query,!0),i=t.view.tc(r);return n.isPrimaryClient&&ec(n,t.targetId,i.Xu),i}async function ac(e,t){const n=I(e);return yo(n.localStore,t).then(e=>rc(n,e))}async function cc(e,t,n,r){const i=I(e),s=await function(e,t){const n=I(e),r=I(n.mutationQueue);return n.persistence.runTransaction("Lookup mutation documents","readonly",e=>r.Tn(e,t).next(t=>t?n.localDocuments.getDocuments(e,t):re.resolve(null)))}(i.localStore,t);null!==s?("pending"===n?await oa(i.remoteStore):"acknowledged"===n||"rejected"===n?(Ja(i,t,r||null),Ya(i,t),function(e,t){I(I(e).mutationQueue).An(t)}(i.localStore,t)):v(),await rc(i,s)):p("SyncEngine","Cannot apply mutation batch with id: "+t)}async function uc(e,t,n){const r=I(e),i=[],s=[];for(const e of t){let t;const n=r.rc.get(e);if(n&&0!==n.length){t=await fo(r.localStore,Wt(n[0]));for(const e of n){const t=r.ic.get(e),n=await oc(r,t);n.snapshot&&s.push(n.snapshot)}}else{const n=await go(r.localStore,e);t=await fo(r.localStore,n),await Ga(r,lc(n),e,!1,t.resumeToken)}i.push(t)}return r.sc.Wo(s),i}function lc(e){return Vt(e.path,e.collectionGroup,e.orderBy,e.filters,e.limit,"F",e.startAt,e.endAt)}function hc(e){const t=I(e);return I(I(t.localStore).persistence).vi()}async function dc(e,t,n,r){const i=I(e);if(i.dc)return void p("SyncEngine","Ignoring unexpected query state notification.");const s=i.rc.get(t);if(s&&s.length>0)switch(n){case"current":case"not-current":{const e=await yo(i.localStore,en(s[0])),r=tr.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,Se.EMPTY_BYTE_STRING);await rc(i,e,r);break}case"rejected":await po(i.localStore,t,!0),Xa(i,t,r);break;default:v()}}async function fc(e,t,n){const r=pc(e);if(r.dc){for(const e of t){if(r.rc.has(e)){p("SyncEngine","Adding an already active target "+e);continue}const t=await go(r.localStore,e),n=await fo(r.localStore,t);await Ga(r,lc(t),n.targetId,!1,n.resumeToken),Wo(r.remoteStore,n)}for(const e of n)r.rc.has(e)&&await po(r.localStore,e,!1).then(()=>{Ho(r.remoteStore,e),Xa(r,e)}).catch(ne)}}function pc(e){const t=I(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=za.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=sc.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Wa.bind(null,t),t.sc.Wo=Ca.bind(null,t.eventManager),t.sc.wc=Oa.bind(null,t.eventManager),t}function mc(e){const t=I(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Ha.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Qa.bind(null,t),t}class gc{constructor(){this.synchronizeTabs=!1}async initialize(e){this.yt=Fo(e.databaseInfo.databaseId),this.sharedClientState=this.gc(e),this.persistence=this.yc(e),await this.persistence.start(),this.localStore=this.Ic(e),this.gcScheduler=this.Tc(e,this.localStore),this.indexBackfillerScheduler=this.Ec(e,this.localStore)}Tc(e,t){return null}Ec(e,t){return null}Ic(e){return ao(this.persistence,new so,e.initialUser,this.yt)}yc(e){return new Hs(Ys.Bs,this.yt)}gc(e){return new Oo}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class yc extends gc{constructor(e,t,n){super(),this.Ac=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ac.initialize(this,e),await mc(this.Ac.syncEngine),await oa(this.Ac.remoteStore),await this.persistence.li(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}Ic(e){return ao(this.persistence,new so,e.initialUser,this.yt)}Tc(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Ss(n,e.asyncQueue,t)}Ec(e,t){const n=new pe(t,this.persistence);return new fe(e.asyncQueue,n)}yc(e){const t=ro(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?ls.withCacheSize(this.cacheSizeBytes):ls.DEFAULT;return new eo(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Lo(),Mo(),this.yt,this.sharedClientState,!!this.forceOwnership)}gc(e){return new Oo}}class vc extends yc{constructor(e,t){super(e,t,!1),this.Ac=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ac.syncEngine;this.sharedClientState instanceof Co&&(this.sharedClientState.syncEngine={Fr:cc.bind(null,t),$r:dc.bind(null,t),Br:fc.bind(null,t),vi:hc.bind(null,t),Mr:ac.bind(null,t)},await this.sharedClientState.start()),await this.persistence.li(async e=>{await async function(e,t){const n=I(e);if(pc(n),mc(n),!0===t&&!0!==n.dc){const e=n.sharedClientState.getAllActiveQueryTargets(),t=await uc(n,e.toArray());n.dc=!0,await ga(n.remoteStore,!0);for(const e of t)Wo(n.remoteStore,e)}else if(!1===t&&!1!==n.dc){const e=[];let t=Promise.resolve();n.rc.forEach((r,i)=>{n.sharedClientState.isLocalQueryTarget(i)?e.push(i):t=t.then(()=>(Xa(n,i),po(n.localStore,i,!0))),Ho(n.remoteStore,i)}),await t,await uc(n,e),function(e){const t=I(e);t.cc.forEach((e,n)=>{Ho(t.remoteStore,n)}),t.ac.fs(),t.cc=new Map,t.uc=new It(K.comparator)}(n),n.dc=!1,await ga(n.remoteStore,!1)}}(this.Ac.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}gc(e){const t=Lo();if(!Co.C(t))throw new E(_.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=ro(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Co(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class wc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>$a(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=ic.bind(null,this.syncEngine),await ga(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Sa}createDatastore(e){const t=Fo(e.databaseInfo.databaseId),n=(r=e.databaseInfo,new Po(r));var r;return function(e,t,n,r){return new qo(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,r=e.asyncQueue,i=e=>$a(this.syncEngine,e,0),s=No.C()?new No:new xo,new Ko(t,n,r,i,s);var t,n,r,i,s}createSyncEngine(e,t){return function(e,t,n,r,i,s,o){const a=new Ba(e,t,n,r,i,s);return o&&(a.dc=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){const t=I(e);p("RemoteStore","RemoteStore shutting down."),t._u.add(5),await $o(t),t.mu.shutdown(),t.gu.set("Unknown")}(this.remoteStore)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bc(e,t,n){if(!n)throw new E(_.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Ic(e,t,n,r){if(!0===t&&!0===r)throw new E(_.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function _c(e){if(!K.isDocumentKey(e))throw new E(_.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function Ec(e){if(K.isDocumentKey(e))throw new E(_.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Tc(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=e.substring(0,20)+"..."),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":v()}function Sc(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new E(_.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Tc(e);throw new E(_.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function kc(e,t){if(t<=0)throw new E(_.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac=new Map;class Cc{constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new E(_.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new E(_.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,Ic("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Cc({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new E(_.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new E(_.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Cc(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new k;switch(e.type){case"gapi":const t=e.client;return new x(t,e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new E(_.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Ac.get(e);t&&(p("ComponentProvider","Removing Datastore"),Ac.delete(e),t.terminate())}(this),Promise.resolve()}}function xc(e,t,n,r={}){var i;const s=(e=Sc(e,Oc))._getSettings();if("firestore.googleapis.com"!==s.host&&s.host!==t&&g("Host has been set in both settings() and useEmulator(), emulator host will be used"),e._setSettings(Object.assign(Object.assign({},s),{host:`${t}:${n}`,ssl:!1})),r.mockUserToken){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=u.MOCK_USER;else{t=Object(o.i)(r.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);const s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new E(_.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new u(s)}e._authCredentials=new A(new S(t,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rc(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Nc(this.firestore,e,this._key)}}class Dc{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Dc(this.firestore,e,this._query)}}class Rc extends Dc{constructor(e,t,n){super(e,t,Bt(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Nc(this.firestore,null,new K(e))}withConverter(e){return new Rc(this.firestore,e,this._path)}}function Pc(e,t,...n){if(e=Object(o.r)(e),bc("collection","path",t),e instanceof Oc){const r=B.fromString(t,...n);return Ec(r),new Rc(e,null,r)}{if(!(e instanceof Nc||e instanceof Rc))throw new E(_.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(B.fromString(t,...n));return Ec(r),new Rc(e.firestore,null,r)}}function Lc(e,t){if(e=Sc(e,Oc),bc("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new E(_.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Dc(e,null,function(e){return new Ut(B.emptyPath(),e)}(t))}function Mc(e,t,...n){if(e=Object(o.r)(e),1===arguments.length&&(t=P.R()),bc("doc","path",t),e instanceof Oc){const r=B.fromString(t,...n);return _c(r),new Nc(e,null,new K(r))}{if(!(e instanceof Nc||e instanceof Rc))throw new E(_.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(B.fromString(t,...n));return _c(r),new Nc(e.firestore,e instanceof Rc?e.converter:null,new K(r))}}function Fc(e,t){return e=Object(o.r)(e),t=Object(o.r)(t),(e instanceof Nc||e instanceof Rc)&&(t instanceof Nc||t instanceof Rc)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function jc(e,t){return e=Object(o.r)(e),t=Object(o.r)(t),e instanceof Dc&&t instanceof Dc&&e.firestore===t.firestore&&Yt(e._query,t._query)&&e.converter===t.converter
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}function Uc(e,t=10240){let n=0;return{async read(){if(n<e.byteLength){const r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.reject("unimplemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Rc(this.observer.next,e)}error(e){this.observer.error?this.Rc(this.observer.error,e):m("Uncaught Error in snapshot listener:",e.toString())}bc(){this.muted=!0}Rc(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(e,t){this.Pc=e,this.yt=t,this.metadata=new T,this.buffer=new Uint8Array,this.vc=new TextDecoder("utf-8"),this.Vc().then(e=>{e&&e.Ou()?this.metadata.resolve(e.ku.metadata):this.metadata.reject(new Error("The first element of the bundle is not a metadata, it is\n             "+JSON.stringify(null==e?void 0:e.ku)))},e=>this.metadata.reject(e))}close(){return this.Pc.cancel()}async getMetadata(){return this.metadata.promise}async mc(){return await this.getMetadata(),this.Vc()}async Vc(){const e=await this.Sc();if(null===e)return null;const t=this.vc.decode(e),n=Number(t);isNaN(n)&&this.Dc(`length string (${t}) is not valid number`);const r=await this.Cc(n);return new Da(JSON.parse(r),e.length+n)}xc(){return this.buffer.findIndex(e=>e==="{".charCodeAt(0))}async Sc(){for(;this.xc()<0&&!await this.Nc(););if(0===this.buffer.length)return null;const e=this.xc();e<0&&this.Dc("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Cc(e){for(;this.buffer.length<e;)await this.Nc()&&this.Dc("Reached the end of bundle when more is expected.");const t=this.vc.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Dc(e){throw this.Pc.cancel(),new Error("Invalid bundle format: "+e)}async Nc(){const e=await this.Pc.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qc{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new E(_.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const t=await async function(e,t){const n=I(e),r=Tr(n.yt)+"/documents",i={documents:t.map(e=>br(n.yt,e))},s=await n._o("BatchGetDocuments",r,i,t.length),o=new Map;s.forEach(e=>{const t=function(e,t){return"found"in t?function(e,t){w(!!t.found),t.found.name,t.found.updateTime;const n=Ir(e,t.found.name),r=yr(t.found.updateTime),i=t.found.createTime?yr(t.found.createTime):U.min(),s=new Ct({mapValue:{fields:t.found.fields}});return xt.newFoundDocument(n,r,i,s)}(e,t):"missing"in t?function(e,t){w(!!t.missing),w(!!t.readTime);const n=Ir(e,t.missing),r=yr(t.readTime);return xt.newNoDocument(n,r)}(e,t):v()}(n.yt,e);o.set(t.key.toString(),t)});const a=[];return t.forEach(e=>{const t=o.get(e.toString());w(!!t),a.push(t)}),a}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastWriteError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new Pn(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{const n=K.fromPath(t);this.mutations.push(new Ln(n,this.precondition(n)))}),await async function(e,t){const n=I(e),r=Tr(n.yt)+"/documents",i={writes:t.map(e=>Cr(n.yt,e))};await n.ao("Commit",r,i)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw v();t=U.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new E(_.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(U.min())?In.exists(!1):In.updateTime(t):In.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(U.min()))throw new E(_.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return In.updateTime(t)}return In.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(e,t,n,r,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=i,this.kc=n.maxAttempts,this.xo=new jo(this.asyncQueue,"transaction_retry")}run(){this.kc-=1,this.Oc()}Oc(){this.xo.Ro(async()=>{const e=new qc(this.datastore),t=this.Mc(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Fc(e)}))}).catch(e=>{this.Fc(e)})})}Mc(e){try{const t=this.updateFunction(e);return!Ie(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Fc(e){this.kc>0&&this.$c(e)?(this.kc-=1,this.asyncQueue.enqueueAndForget(()=>(this.Oc(),Promise.resolve()))):this.deferred.reject(e)}$c(e){if("FirebaseError"===e.name){const t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!Un(t)}return!1}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,t,n,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=u.UNAUTHENTICATED,this.clientId=P.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,async e=>{p("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(p("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new E(_.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new T;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=ba(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function zc(e,t){e.asyncQueue.verifyOperationInProgress(),p("FirestoreClient","Initializing OfflineComponentProvider");const n=await e.getConfiguration();await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await co(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e.offlineComponents=t}async function $c(e,t){e.asyncQueue.verifyOperationInProgress();const n=await Wc(e);p("FirestoreClient","Initializing OnlineComponentProvider");const r=await e.getConfiguration();await t.initialize(n,r),e.setCredentialChangeListener(e=>ma(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>ma(t.remoteStore,n)),e.onlineComponents=t}async function Wc(e){return e.offlineComponents||(p("FirestoreClient","Using default OfflineComponentProvider"),await zc(e,new gc)),e.offlineComponents}async function Hc(e){return e.onlineComponents||(p("FirestoreClient","Using default OnlineComponentProvider"),await $c(e,new wc)),e.onlineComponents}function Qc(e){return Wc(e).then(e=>e.persistence)}function Yc(e){return Wc(e).then(e=>e.localStore)}function Jc(e){return Hc(e).then(e=>e.remoteStore)}function Xc(e){return Hc(e).then(e=>e.syncEngine)}function Zc(e){return Hc(e).then(e=>e.datastore)}async function eu(e){const t=await Hc(e),n=t.eventManager;return n.onListen=qa.bind(null,t.syncEngine),n.onUnlisten=Ka.bind(null,t.syncEngine),n}function tu(e,t,n={}){const r=new T;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,i){const s=new Vc({next:s=>{t.enqueueAndForget(()=>Aa(e,o));const a=s.docs.has(n);!a&&s.fromCache?i.reject(new E(_.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&s.fromCache&&r&&"server"===r.source?i.reject(new E(_.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(s)},error:e=>i.reject(e)}),o=new Na(Bt(n.path),s,{includeMetadataChanges:!0,Nu:!0});return ka(e,o)}(await eu(e),e.asyncQueue,t,n,r)),r.promise}function nu(e,t,n={}){const r=new T;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,i){const s=new Vc({next:n=>{t.enqueueAndForget(()=>Aa(e,o)),n.fromCache&&"server"===r.source?i.reject(new E(_.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),o=new Na(n,s,{includeMetadataChanges:!0,Nu:!0});return ka(e,o)}(await eu(e),e.asyncQueue,t,n,r)),r.promise}function ru(e,t,n,r){const i=function(e,t){let n;return n="string"==typeof e?(new TextEncoder).encode(e):e,function(e,t){return new Bc(e,t)}(function(e,t){if(e instanceof Uint8Array)return Uc(e,t);if(e instanceof ArrayBuffer)return Uc(new Uint8Array(e),t);if(e instanceof ReadableStream)return e.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(n),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n,Fo(t));e.asyncQueue.enqueueAndForget(async()=>{!function(e,t,n){const r=I(e);(async function(e,t,n){try{const r=await t.getMetadata();if(await function(e,t){const n=I(e),r=yr(t.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",e=>n.Ns.getBundleMetadata(e,t.id)).then(e=>!!e&&e.createTime.compareTo(r)>=0)}(e.localStore,r))return await t.close(),n._completeWith(function(e){return{taskState:"Success",documentsLoaded:e.totalDocuments,bytesLoaded:e.totalBytes,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}(r)),Promise.resolve(new Set);n._updateProgress(La(r));const i=new Pa(r,e.localStore,t.yt);let s=await t.mc();for(;s;){const e=await i.Fu(s);e&&n._updateProgress(e),s=await t.mc()}const o=await i.complete();return await rc(e,o.Lu,void 0),await function(e,t){const n=I(e);return n.persistence.runTransaction("Save bundle","readwrite",e=>n.Ns.saveBundleMetadata(e,t))}(e.localStore,r),n._completeWith(o.progress),Promise.resolve(o.Bu)}catch(e){return g("SyncEngine","Loading bundle failed with "+e),n._failWith(e),Promise.resolve(new Set)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)(r,t,n).then(e=>{r.sharedClientState.notifyBundleLoaded(e)})}(await Xc(e),i,r)})}class iu{constructor(){this.Bc=Promise.resolve(),this.Lc=[],this.qc=!1,this.Uc=[],this.Kc=null,this.Gc=!1,this.Qc=!1,this.jc=[],this.xo=new jo(this,"async_queue_retry"),this.Wc=()=>{const e=Mo();e&&p("AsyncQueue","Visibility state changed to "+e.visibilityState),this.xo.Po()};const e=Mo();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Wc)}get isShuttingDown(){return this.qc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.zc(),this.Hc(e)}enterRestrictedMode(e){if(!this.qc){this.qc=!0,this.Qc=e||!1;const t=Mo();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Wc)}}enqueue(e){if(this.zc(),this.qc)return new Promise(()=>{});const t=new T;return this.Hc(()=>this.qc&&this.Qc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Lc.push(e),this.Jc()))}async Jc(){if(0!==this.Lc.length){try{await this.Lc[0](),this.Lc.shift(),this.xo.reset()}catch(e){if(!ce(e))throw e;p("AsyncQueue","Operation failed with retryable error: "+e)}this.Lc.length>0&&this.xo.Ro(()=>this.Jc())}}Hc(e){const t=this.Bc.then(()=>(this.Gc=!0,e().catch(e=>{this.Kc=e,this.Gc=!1;throw m("INTERNAL UNHANDLED ERROR: ",function(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)),e}).then(e=>(this.Gc=!1,e))));return this.Bc=t,t}enqueueAfterDelay(e,t,n){this.zc(),this.jc.indexOf(e)>-1&&(t=0);const r=wa.createAndSchedule(this,e,t,n,e=>this.Yc(e));return this.Uc.push(r),r}zc(){this.Kc&&v()}verifyOperationInProgress(){}async Xc(){let e;do{e=this.Bc,await e}while(e!==this.Bc)}Zc(e){for(const t of this.Uc)if(t.timerId===e)return!0;return!1}ta(e){return this.Xc().then(()=>{this.Uc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.Uc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Xc()})}ea(e){this.jc.push(e)}Yc(e){const t=this.Uc.indexOf(e);this.Uc.splice(t,1)}}function su(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const e of["next","error","complete"])if(e in n&&"function"==typeof n[e])return!0;return!1}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)}class ou{constructor(){this._progressObserver={},this._taskCompletionResolver=new T,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const au=-1;class cu extends Oc{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new iu,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||lu(this),this._firestoreClient.terminate()}}function uu(e){return e._firestoreClient||lu(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function lu(e){var t;const n=e._freezeSettings(),r=function(e,t,n,r){return new ge(e,t,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,r.useFetchStreams)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e._databaseId,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,n);e._firestoreClient=new Kc(e._authCredentials,e._appCheckCredentials,e._queue,r)}function hu(e,t){bu(e=Sc(e,cu));const n=uu(e),r=e._freezeSettings(),i=new wc;return fu(n,i,new yc(i,r.cacheSizeBytes,null==t?void 0:t.forceOwnership))}function du(e){bu(e=Sc(e,cu));const t=uu(e),n=e._freezeSettings(),r=new wc;return fu(t,r,new vc(r,n.cacheSizeBytes))}function fu(e,t,n){const r=new T;return e.asyncQueue.enqueue(async()=>{try{await zc(e,n),await $c(e,t),r.resolve()}catch(e){const t=e;if(!function(e){return"FirebaseError"===e.name?e.code===_.FAILED_PRECONDITION||e.code===_.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||(22===e.code||20===e.code||11===e.code)}(t))throw t;g("Error enabling offline persistence. Falling back to persistence disabled: "+t),r.reject(t)}}).then(()=>r.promise)}function pu(e){if(e._initialized&&!e._terminated)throw new E(_.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new T;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!se.C())return Promise.resolve();const t=e+"main";await se.delete(t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(ro(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function mu(e){return function(e){const t=new T;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t){const n=I(e);Zo(n.remoteStore)||p("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const e=await function(e){const t=I(e);return t.persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>t.mutationQueue.getHighestUnacknowledgedBatchId(e))}(n.localStore);if(-1===e)return void t.resolve();const r=n.lc.get(e)||[];r.push(t),n.lc.set(e,r)}catch(e){const n=ba(e,"Initialization of waitForPendingWrites() operation failed");t.reject(n)}}(await Xc(e),t)),t.promise}(uu(e=Sc(e,cu)))}function gu(e){return function(e){return e.asyncQueue.enqueue(async()=>{const t=await Qc(e),n=await Jc(e);return t.setNetworkEnabled(!0),function(e){const t=I(e);return t._u.delete(0),zo(t)}(n)})}(uu(e=Sc(e,cu)))}function yu(e){return function(e){return e.asyncQueue.enqueue(async()=>{const t=await Qc(e),n=await Jc(e);return t.setNetworkEnabled(!1),async function(e){const t=I(e);t._u.add(0),await $o(t),t.gu.set("Offline")}(n)})}(uu(e=Sc(e,cu)))}function vu(e,t){const n=uu(e=Sc(e,cu)),r=new ou;return ru(n,e._databaseId,t,r),r}function wu(e,t){return function(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){const n=I(e);return n.persistence.runTransaction("Get named query","readonly",e=>n.Ns.getNamedQuery(e,t))}(await Yc(e),t))}(uu(e=Sc(e,cu)),t).then(t=>t?new Dc(e,null,t.query):null)}function bu(e){if(e._initialized||e._terminated)throw new E(_.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Iu(Se.fromBase64String(e))}catch(e){throw new E(_.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Iu(Se.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new E(_.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new G(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Eu{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new E(_.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new E(_.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return L(this._lat,e._lat)||L(this._long,e._long)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Su=/^__.*__$/;class ku{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new xn(e,this.data,this.fieldMask,t,this.fieldTransforms):new On(e,this.data,t,this.fieldTransforms)}}class Au{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new xn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Cu(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw v()}}class Ou{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.yt=n,this.ignoreUndefinedProperties=r,void 0===i&&this.na(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get sa(){return this.settings.sa}ia(e){return new Ou(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.yt,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ra(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.ia({path:n,oa:!1});return r.ua(e),r}ca(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.ia({path:n,oa:!1});return r.na(),r}aa(e){return this.ia({path:void 0,oa:!0})}ha(e){return Qu(e,this.settings.methodName,this.settings.la||!1,this.path,this.settings.fa)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}na(){if(this.path)for(let e=0;e<this.path.length;e++)this.ua(this.path.get(e))}ua(e){if(0===e.length)throw this.ha("Document fields must not be empty");if(Cu(this.sa)&&Su.test(e))throw this.ha('Document fields cannot begin and end with "__"')}}class xu{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.yt=n||Fo(e)}da(e,t,n,r=!1){return new Ou({sa:e,methodName:t,fa:n,path:G.emptyPath(),oa:!1,la:r},this.databaseId,this.yt,this.ignoreUndefinedProperties)}}function Nu(e){const t=e._freezeSettings(),n=Fo(e._databaseId);return new xu(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Du(e,t,n,r,i,s={}){const o=e.da(s.merge||s.mergeFields?2:0,t,n,i);zu("Data must be an object, but it was:",o,r);const a=Gu(r,o);let c,u;if(s.merge)c=new At(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const e=[];for(const r of s.mergeFields){const i=$u(t,r,n);if(!o.contains(i))throw new E(_.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);Yu(e,i)||e.push(i)}c=new At(e),u=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=o.fieldTransforms;return new ku(new Ct(a),c,u)}class Ru extends Eu{_toFieldTransform(e){if(2!==e.sa)throw 1===e.sa?e.ha(this._methodName+"() can only appear at the top level of your update data"):e.ha(this._methodName+"() cannot be used with set() unless you pass {merge:true}");return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ru}}function Pu(e,t,n){return new Ou({sa:3,fa:t.settings.fa,methodName:e._methodName,oa:n},t.databaseId,t.yt,t.ignoreUndefinedProperties)}class Lu extends Eu{_toFieldTransform(e){return new wn(e.path,new hn)}isEqual(e){return e instanceof Lu}}class Mu extends Eu{constructor(e,t){super(e),this._a=t}_toFieldTransform(e){const t=Pu(this,e,!0),n=this._a.map(e=>qu(e,t)),r=new dn(n);return new wn(e.path,r)}isEqual(e){return this===e}}class Fu extends Eu{constructor(e,t){super(e),this._a=t}_toFieldTransform(e){const t=Pu(this,e,!0),n=this._a.map(e=>qu(e,t)),r=new pn(n);return new wn(e.path,r)}isEqual(e){return this===e}}class ju extends Eu{constructor(e,t){super(e),this.wa=t}_toFieldTransform(e){const t=new gn(e.yt,on(e.yt,this.wa));return new wn(e.path,t)}isEqual(e){return this===e}}function Uu(e,t,n,r){const i=e.da(1,t,n);zu("Data must be an object, but it was:",i,r);const s=[],a=Ct.empty();we(r,(e,r)=>{const c=Hu(t,e,n);r=Object(o.r)(r);const u=i.ca(c);if(r instanceof Ru)s.push(c);else{const e=qu(r,u);null!=e&&(s.push(c),a.set(c,e))}});const c=new At(s);return new Au(a,c,i.fieldTransforms)}function Vu(e,t,n,r,i,s){const a=e.da(1,t,n),c=[$u(t,r,n)],u=[i];if(s.length%2!=0)throw new E(_.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<s.length;e+=2)c.push($u(t,s[e])),u.push(s[e+1]);const l=[],h=Ct.empty();for(let e=c.length-1;e>=0;--e)if(!Yu(l,c[e])){const t=c[e];let n=u[e];n=Object(o.r)(n);const r=a.ca(t);if(n instanceof Ru)l.push(t);else{const e=qu(n,r);null!=e&&(l.push(t),h.set(t,e))}}const d=new At(l);return new Au(h,d,a.fieldTransforms)}function Bu(e,t,n,r=!1){return qu(n,e.da(r?4:3,t))}function qu(e,t){if(Ku(e=Object(o.r)(e)))return zu("Unsupported field value:",t,e),Gu(e,t);if(e instanceof Eu)return function(e,t){if(!Cu(t.sa))throw t.ha(e._methodName+"() can only be used with update() and set()");if(!t.path)throw t.ha(e._methodName+"() is not currently supported inside arrays");const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.oa&&4!==t.sa)throw t.ha("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=qu(i,t.aa(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=Object(o.r)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return on(t.yt,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=j.fromDate(e);return{timestampValue:pr(t.yt,n)}}if(e instanceof j){const n=new j(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:pr(t.yt,n)}}if(e instanceof Tu)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Iu)return{bytesValue:mr(t.yt,e._byteString)};if(e instanceof Nc){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.ha(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:vr(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.ha("Unsupported field value: "+Tc(e))}(e,t)}function Gu(e,t){const n={};return be(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):we(e,(e,r)=>{const i=qu(r,t.ra(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function Ku(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof j||e instanceof Tu||e instanceof Iu||e instanceof Nc||e instanceof Eu)}function zu(e,t,n){if(!Ku(n)||!function(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}(n)){const r=Tc(n);throw"an object"===r?t.ha(e+" a custom object"):t.ha(e+" "+r)}}function $u(e,t,n){if((t=Object(o.r)(t))instanceof _u)return t._internalPath;if("string"==typeof t)return Hu(e,t);throw Qu("Field path arguments must be of type string or ",e,!1,void 0,n)}const Wu=new RegExp("[~\\*/\\[\\]]");function Hu(e,t,n){if(t.search(Wu)>=0)throw Qu(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new _u(...t.split("."))._internalPath}catch(r){throw Qu(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Qu(e,t,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=" in field "+r),o&&(c+=" in document "+i),c+=")"),new E(_.INVALID_ARGUMENT,a+e+c)}function Yu(e,t){return e.some(e=>e.isEqual(t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Nc(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new Xu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Zu("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class Xu extends Ju{data(){return super.data()}}function Zu(e,t){return"string"==typeof t?Hu(e,t):t instanceof _u?t._internalPath:t._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new E(_.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class tl{}class nl extends tl{}function rl(e,t,...n){let r=[];t instanceof tl&&r.push(t),r=r.concat(n),function(e){const t=e.filter(e=>e instanceof ol).length,n=e.filter(e=>e instanceof il).length;if(t>1||t>0&&n>0)throw new E(_.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r);for(const t of r)e=t._apply(e);return e}class il extends nl{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new il(e,t,n)}_apply(e){const t=this._parse(e);return Il(e._query,t),new Dc(e.firestore,e.converter,Ht(e._query,t))}_parse(e){const t=Nu(e.firestore);return function(e,t,n,r,i,s,o){let a;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new E(_.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){bl(o,s);const t=[];for(const n of o)t.push(wl(r,e,n));a={arrayValue:{values:t}}}else a=wl(r,e,o)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||bl(o,s),a=Bu(n,"where",o,"in"===s||"not-in"===s);return nt.create(i,s,a)}(e._query,0,t,e.firestore._databaseId,this._field,this._op,this._value)}}function sl(e,t,n){const r=t,i=Zu("where",e);return il._create(i,r,n)}class ol extends tl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ol(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:rt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const e of r)Il(n,e),n=Ht(n,e)}(e._query,t),new Dc(e.firestore,e.converter,Ht(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class al extends nl{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new al(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new E(_.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new E(_.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const r=new wt(t,n);return function(e,t){if(null===Gt(e)){const n=Kt(e);null!==n&&_l(e,n,t.field)}}(e,r),r}(e._query,this._field,this._direction);return new Dc(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new Ut(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function cl(e,t="asc"){const n=t,r=Zu("orderBy",e);return al._create(r,n)}class ul extends nl{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new ul(e,t,n)}_apply(e){return new Dc(e.firestore,e.converter,Qt(e._query,this._limit,this._limitType))}}function ll(e){return kc("limit",e),ul._create("limit",e,"F")}function hl(e){return kc("limitToLast",e),ul._create("limitToLast",e,"L")}class dl extends nl{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new dl(e,t,n)}_apply(e){const t=vl(e,this.type,this._docOrFields,this._inclusive);return new Dc(e.firestore,e.converter,function(e,t){return new Ut(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}(e._query,t))}}function fl(...e){return dl._create("startAt",e,!0)}function pl(...e){return dl._create("startAfter",e,!1)}class ml extends nl{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new ml(e,t,n)}_apply(e){const t=vl(e,this.type,this._docOrFields,this._inclusive);return new Dc(e.firestore,e.converter,function(e,t){return new Ut(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}(e._query,t))}}function gl(...e){return ml._create("endBefore",e,!1)}function yl(...e){return ml._create("endAt",e,!0)}function vl(e,t,n,r){if(n[0]=Object(o.r)(n[0]),n[0]instanceof Ju)return function(e,t,n,r,i){if(!r)throw new E(_.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const s=[];for(const n of $t(e))if(n.field.isKeyField())s.push(Ve(t,r.key));else{const e=r.data.field(n.field);if(xe(e))throw new E(_.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){const e=n.field.canonicalString();throw new E(_.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}s.push(e)}return new Xe(s,i)}(e._query,e.firestore._databaseId,t,n[0]._document,r);{const i=Nu(e.firestore);return function(e,t,n,r,i,s){const o=e.explicitOrderBy;if(i.length>o.length)throw new E(_.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let s=0;s<i.length;s++){const c=i[s];if(o[s].field.isKeyField()){if("string"!=typeof c)throw new E(_.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);if(!zt(e)&&-1!==c.indexOf("/"))throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);const n=e.path.child(B.fromString(c));if(!K.isDocumentKey(n))throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const i=new K(n);a.push(Ve(t,i))}else{const e=Bu(n,r,c);a.push(e)}}return new Xe(a,s)}(e._query,e.firestore._databaseId,i,t,n,r)}}function wl(e,t,n){if("string"==typeof(n=Object(o.r)(n))){if(""===n)throw new E(_.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!zt(t)&&-1!==n.indexOf("/"))throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(B.fromString(n));if(!K.isDocumentKey(r))throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ve(e,new K(r))}if(n instanceof Nc)return Ve(e,n._key);throw new E(_.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Tc(n)}.`)}function bl(e,t){if(!Array.isArray(e)||0===e.length)throw new E(_.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`);if(e.length>10)throw new E(_.INVALID_ARGUMENT,`Invalid Query. '${t.toString()}' filters support a maximum of 10 elements in the value array.`)}function Il(e,t){if(t.isInequality()){const n=Kt(e),r=t.field;if(null!==n&&!n.isEqual(r))throw new E(_.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${r.toString()}'`);const i=Gt(e);null!==i&&_l(e,r,i)}const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new E(_.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new E(_.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function _l(e,t,n){if(!n.isEqual(t))throw new E(_.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}class El{convertValue(e,t="none"){switch(Pe(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Oe(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw v()}}convertObject(e,t){const n={};return we(e.fields,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertGeoPoint(e){return new Tu(Ce(e.latitude),Ce(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=function e(t){const n=t.mapValue.fields.__previous_value__;return xe(n)?e(n):n}(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Ne(e));default:return null}}convertTimestamp(e){const t=Ae(e);return new j(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=B.fromString(e);w(Ur(n));const r=new ye(n.get(1),n.get(3)),i=new K(n.popFirst(5));return r.isEqual(t)||m(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tl(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class Sl extends El{constructor(e){super(),this.firestore=e}convertBytes(e){return new Iu(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Nc(this.firestore,null,t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Al extends Ju{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Cl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Zu("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class Cl extends Al{data(e={}){return super.data(e)}}class Ol{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new kl(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Cl(this._firestore,this._userDataWriter,n.key,n,new kl(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new E(_.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new Cl(e._firestore,e._userDataWriter,n.doc.key,n.doc,new kl(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new Cl(e._firestore,e._userDataWriter,t.doc.key,t.doc,new kl(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),s=n.indexOf(t.doc.key)),{type:xl(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function xl(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return v()}}function Nl(e,t){return e instanceof Al&&t instanceof Al?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof Ol&&t instanceof Ol&&e._firestore===t._firestore&&jc(e.query,t.query)&&e.metadata.isEqual(t.metadata)&&e._snapshot.isEqual(t._snapshot)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dl(e){e=Sc(e,Nc);const t=Sc(e.firestore,cu);return tu(uu(t),e._key).then(n=>$l(t,e,n))}class Rl extends El{constructor(e){super(),this.firestore=e}convertBytes(e){return new Iu(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Nc(this.firestore,null,t)}}function Pl(e){e=Sc(e,Nc);const t=Sc(e.firestore,cu),n=uu(t),r=new Rl(t);return function(e,t){const n=new T;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await function(e,t){const n=I(e);return n.persistence.runTransaction("read document","readonly",e=>n.localDocuments.getDocument(e,t))}(e,t);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new E(_.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(e){const r=ba(e,`Failed to get document '${t} from cache`);n.reject(r)}}(await Yc(e),t,n)),n.promise}(n,e._key).then(n=>new Al(t,r,e._key,n,new kl(null!==n&&n.hasLocalMutations,!0),e.converter))}function Ll(e){e=Sc(e,Nc);const t=Sc(e.firestore,cu);return tu(uu(t),e._key,{source:"server"}).then(n=>$l(t,e,n))}function Ml(e){e=Sc(e,Dc);const t=Sc(e.firestore,cu),n=uu(t),r=new Rl(t);return el(e._query),nu(n,e._query).then(n=>new Ol(t,r,e,n))}function Fl(e){e=Sc(e,Dc);const t=Sc(e.firestore,cu),n=uu(t),r=new Rl(t);return function(e,t){const n=new T;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await mo(e,t,!0),i=new ja(t,r.Hi),s=i.Wu(r.documents),o=i.applyChanges(s,!1);n.resolve(o.snapshot)}catch(e){const r=ba(e,`Failed to execute query '${t} against cache`);n.reject(r)}}(await Yc(e),t,n)),n.promise}(n,e._query).then(n=>new Ol(t,r,e,n))}function jl(e){e=Sc(e,Dc);const t=Sc(e.firestore,cu),n=uu(t),r=new Rl(t);return nu(n,e._query,{source:"server"}).then(n=>new Ol(t,r,e,n))}function Ul(e,t,n){e=Sc(e,Nc);const r=Sc(e.firestore,cu),i=Tl(e.converter,t,n);return zl(r,[Du(Nu(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,In.none())])}function Vl(e,t,n,...r){e=Sc(e,Nc);const i=Sc(e.firestore,cu),s=Nu(i);let a;return a="string"==typeof(t=Object(o.r)(t))||t instanceof _u?Vu(s,"updateDoc",e._key,t,n,r):Uu(s,"updateDoc",e._key,t),zl(i,[a.toMutation(e._key,In.exists(!0))])}function Bl(e){return zl(Sc(e.firestore,cu),[new Pn(e._key,In.none())])}function ql(e,t){const n=Sc(e.firestore,cu),r=Mc(e),i=Tl(e.converter,t);return zl(n,[Du(Nu(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,In.exists(!1))]).then(()=>r)}function Gl(e,...t){var n,r,i;e=Object(o.r)(e);let s={includeMetadataChanges:!1},a=0;"object"!=typeof t[a]||su(t[a])||(s=t[a],a++);const c={includeMetadataChanges:s.includeMetadataChanges};if(su(t[a])){const e=t[a];t[a]=null===(n=e.next)||void 0===n?void 0:n.bind(e),t[a+1]=null===(r=e.error)||void 0===r?void 0:r.bind(e),t[a+2]=null===(i=e.complete)||void 0===i?void 0:i.bind(e)}let u,l,h;if(e instanceof Nc)l=Sc(e.firestore,cu),h=Bt(e._key.path),u={next:n=>{t[a]&&t[a]($l(l,e,n))},error:t[a+1],complete:t[a+2]};else{const n=Sc(e,Dc);l=Sc(n.firestore,cu),h=n._query;const r=new Rl(l);u={next:e=>{t[a]&&t[a](new Ol(l,r,n,e))},error:t[a+1],complete:t[a+2]},el(e._query)}return function(e,t,n,r){const i=new Vc(r),s=new Na(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>ka(await eu(e),s)),()=>{i.bc(),e.asyncQueue.enqueueAndForget(async()=>Aa(await eu(e),s))}}(uu(l),h,c,u)}function Kl(e,t){return function(e,t){const n=new Vc(t);return e.asyncQueue.enqueueAndForget(async()=>function(e,t){I(e).Ru.add(t),t.next()}(await eu(e),n)),()=>{n.bc(),e.asyncQueue.enqueueAndForget(async()=>function(e,t){I(e).Ru.delete(t)}(await eu(e),n))}}(uu(e=Sc(e,cu)),su(t)?t:{next:t})}function zl(e,t){return function(e,t){const n=new T;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){const r=mc(e);try{const e=await function(e,t){const n=I(e),r=j.now(),i=t.reduce((e,t)=>e.add(t.key),Xn());let s,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=Gn(),c=Xn();return n.Gi.getEntries(e,i).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(i=>{s=i;const o=[];for(const e of t){const t=An(e,s.get(e.key).overlayedDocument);null!=t&&o.push(new xn(e.key,t,Ot(t.value.mapValue),In.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(s,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:$n(s)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.hc[e.currentUser.toKey()];r||(r=new It(L)),r=r.insert(t,n),e.hc[e.currentUser.toKey()]=r}(r,e.batchId,n),await rc(r,e.changes),await oa(r.remoteStore)}catch(e){const t=ba(e,"Failed to persist write");n.reject(t)}}(await Xc(e),t,n)),n.promise}(uu(e),t)}function $l(e,t,n){const r=n.docs.get(t._key),i=new Rl(e);return new Al(e,i,t._key,r,new kl(n.hasPendingWrites,n.fromCache),t.converter)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Wl={maxAttempts:5};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Nu(e)}set(e,t,n){this._verifyNotCommitted();const r=Ql(e,this._firestore),i=Tl(r.converter,t,n),s=Du(this._dataReader,"WriteBatch.set",r._key,i,null!==r.converter,n);return this._mutations.push(s.toMutation(r._key,In.none())),this}update(e,t,n,...r){this._verifyNotCommitted();const i=Ql(e,this._firestore);let s;return s="string"==typeof(t=Object(o.r)(t))||t instanceof _u?Vu(this._dataReader,"WriteBatch.update",i._key,t,n,r):Uu(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(s.toMutation(i._key,In.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Ql(e,this._firestore);return this._mutations=this._mutations.concat(new Pn(t._key,In.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new E(_.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Ql(e,t){if((e=Object(o.r)(e)).firestore!==t)throw new E(_.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl extends class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Nu(e)}get(e){const t=Ql(e,this._firestore),n=new Sl(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return v();const r=e[0];if(r.isFoundDocument())return new Ju(this._firestore,n,r.key,r,t.converter);if(r.isNoDocument())return new Ju(this._firestore,n,t._key,null,t.converter);throw v()})}set(e,t,n){const r=Ql(e,this._firestore),i=Tl(r.converter,t,n),s=Du(this._dataReader,"Transaction.set",r._key,i,null!==r.converter,n);return this._transaction.set(r._key,s),this}update(e,t,n,...r){const i=Ql(e,this._firestore);let s;return s="string"==typeof(t=Object(o.r)(t))||t instanceof _u?Vu(this._dataReader,"Transaction.update",i._key,t,n,r):Uu(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,s),this}delete(e){const t=Ql(e,this._firestore);return this._transaction.delete(t._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Ql(e,this._firestore),n=new Rl(this._firestore);return super.get(e).then(e=>new Al(this._firestore,n,t._key,e._document,new kl(!1,!1),t.converter))}}function Jl(e,t,n){e=Sc(e,cu);const r=Object.assign(Object.assign({},Wl),n);return function(e){if(e.maxAttempts<1)throw new E(_.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(e,t,n){const r=new T;return e.asyncQueue.enqueueAndForget(async()=>{const i=await Zc(e);new Gc(e.asyncQueue,i,n,t,r).run()}),r.promise}(uu(e),n=>t(new Yl(e,n)),r)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xl(){return new Ru("deleteField")}function Zl(){return new Lu("serverTimestamp")}function eh(...e){return new Mu("arrayUnion",e)}function th(...e){return new Fu("arrayRemove",e)}function nh(e){return new ju("increment",e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e,t=!0){!function(e){l=e}(r.SDK_VERSION),Object(r._registerComponent)(new i.a("firestore",(e,{instanceIdentifier:n,options:r})=>{const i=e.getProvider("app").getImmediate(),s=new cu(new C(e.getProvider("auth-internal")),new D(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new E(_.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ye(e.options.projectId,t)}(i,n),i);return r=Object.assign({useFetchStreams:t},r),s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),Object(r.registerVersion)(c,"3.8.0",e),Object(r.registerVersion)(c,"3.8.0","esm2017")}()}).call(this,n(27))},function(e,t,n){e.exports=n(42)},function(e,t,n){"use strict";n.r(t),n.d(t,"SDK_VERSION",(function(){return E})),n.d(t,"_DEFAULT_ENTRY_NAME",(function(){return l})),n.d(t,"_addComponent",(function(){return p})),n.d(t,"_addOrOverwriteComponent",(function(){return m})),n.d(t,"_apps",(function(){return d})),n.d(t,"_clearComponents",(function(){return w})),n.d(t,"_components",(function(){return f})),n.d(t,"_getProvider",(function(){return y})),n.d(t,"_registerComponent",(function(){return g})),n.d(t,"_removeServiceInstance",(function(){return v})),n.d(t,"deleteApp",(function(){return A})),n.d(t,"getApp",(function(){return S})),n.d(t,"getApps",(function(){return k})),n.d(t,"initializeApp",(function(){return T})),n.d(t,"onLog",(function(){return O})),n.d(t,"registerVersion",(function(){return C})),n.d(t,"setLogLevel",(function(){return x}));var r=n(9),i=n(10),s=n(0);n.d(t,"FirebaseError",(function(){return s.c}));var o=n(26);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const c="@firebase/app",u=new i.b("@firebase/app"),l="[DEFAULT]",h={[c]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},d=new Map,f=new Map;function p(e,t){try{e.container.addComponent(t)}catch(n){u.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function m(e,t){e.container.addOrOverwriteComponent(t)}function g(e){const t=e.name;if(f.has(t))return u.debug(`There were multiple attempts to register component ${t}.`),!1;f.set(t,e);for(const t of d.values())p(t,e);return!0}function y(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function v(e,t,n=l){y(e,t).clearInstance(n)}function w(){f.clear()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},I=new s.b("app","Firebase",b);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r.a("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw I.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E="9.15.0";function T(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const i=Object.assign({name:l,automaticDataCollectionEnabled:!1},t),o=i.name;if("string"!=typeof o||!o)throw I.create("bad-app-name",{appName:String(o)});if(n||(n=Object(s.n)()),!n)throw I.create("no-options");const a=d.get(o);if(a){if(Object(s.k)(n,a.options)&&Object(s.k)(i,a.config))return a;throw I.create("duplicate-app",{appName:o})}const c=new r.b(o);for(const e of f.values())c.addComponent(e);const u=new _(n,i,c);return d.set(o,u),u}function S(e=l){const t=d.get(e);if(!t&&e===l)return T();if(!t)throw I.create("no-app",{appName:e});return t}function k(){return Array.from(d.values())}async function A(e){const t=e.name;d.has(t)&&(d.delete(t),await Promise.all(e.container.getProviders().map(e=>e.delete())),e.isDeleted=!0)}function C(e,t,n){var i;let s=null!==(i=h[e])&&void 0!==i?i:e;n&&(s+="-"+n);const o=s.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const e=[`Unable to register library "${s}" with version "${t}":`];return o&&e.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&e.push("and"),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void u.warn(e.join(" "))}g(new r.a(s+"-version",()=>({library:s,version:t}),"VERSION"))}function O(e,t){if(null!==e&&"function"!=typeof e)throw I.create("invalid-log-argument");Object(i.d)(e,t)}function x(e){Object(i.c)(e)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N="firebase-heartbeat-store";let D=null;function R(){return D||(D=Object(o.a)("firebase-heartbeat-database",1,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(N)}}}).catch(e=>{throw I.create("idb-open",{originalErrorMessage:e.message})})),D}async function P(e,t){try{const n=(await R()).transaction(N,"readwrite"),r=n.objectStore(N);return await r.put(t,L(e)),n.done}catch(e){if(e instanceof s.c)u.warn(e.message);else{const t=I.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});u.warn(t.message)}}}function L(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new j(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=F();if(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate!==t&&!this._heartbeatsCache.heartbeats.some(e=>e.date===t))return this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";const e=F(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let r=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),U(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),U(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),r=Object(s.f)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function F(){return(new Date).toISOString().substring(0,10)}class j{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!Object(s.x)()&&Object(s.E)().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){return await async function(e){try{return(await R()).transaction(N).objectStore(N).get(L(e))}catch(e){if(e instanceof s.c)u.warn(e.message);else{const t=I.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});u.warn(t.message)}}}(this.app)||{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return P(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return P(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function U(e){return Object(s.f)(JSON.stringify({version:2,heartbeats:e})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var V;V="",g(new r.a("platform-logger",e=>new a(e),"PRIVATE")),g(new r.a("heartbeat",e=>new M(e),"PRIVATE")),C(c,"0.9.0",V),C(c,"0.9.0","esm2017"),C("fire-js","")},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){function n(e,t,n,r,i,s,o){try{var a=e[s](o),c=a.value}catch(e){return void n(e)}a.done?t(c):Promise.resolve(c).then(r,i)}e.exports=function(e){return function(){var t=this,r=arguments;return new Promise((function(i,s){var o=e.apply(t,r);function a(e){n(o,i,s,a,c,"next",e)}function c(e){n(o,i,s,a,c,"throw",e)}a(void 0)}))}},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,n){"use strict";var r=n(1);function i(e,t,n,r,i){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i)}r.a.inherits(i,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const s=i.prototype,o={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{o[e]={value:e}}),Object.defineProperties(i,o),Object.defineProperty(s,"isAxiosError",{value:!0}),i.from=(e,t,n,o,a,c)=>{const u=Object.create(s);return r.a.toFlatObject(e,u,(function(e){return e!==Error.prototype}),e=>"isAxiosError"!==e),i.call(u,e.message,t,n,o,a),u.cause=e,u.name=e.name,c&&Object.assign(u,c),u},t.a=i},function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o}));var r=n(0);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class s{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r.a;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e="[DEFAULT]"){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e="[DEFAULT]"){return this.instances.has(e)}getOptions(e="[DEFAULT]"){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(r)}return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,"[DEFAULT]"===r?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}var r;return n||null}normalizeInstanceIdentifier(e="[DEFAULT]"){return this.component?this.component.multipleInstances?e:"[DEFAULT]":e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class o{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new s(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return l})),n.d(t,"d",(function(){return h}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const r=[];var i;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(i||(i={}));const s={debug:i.DEBUG,verbose:i.VERBOSE,info:i.INFO,warn:i.WARN,error:i.ERROR,silent:i.SILENT},o=i.INFO,a={[i.DEBUG]:"log",[i.VERBOSE]:"log",[i.INFO]:"info",[i.WARN]:"warn",[i.ERROR]:"error"},c=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=a[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class u{constructor(e){this.name=e,this._logLevel=o,this._logHandler=c,this._userLogHandler=null,r.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in i))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?s[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,i.DEBUG,...e),this._logHandler(this,i.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,i.VERBOSE,...e),this._logHandler(this,i.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,i.INFO,...e),this._logHandler(this,i.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,i.WARN,...e),this._logHandler(this,i.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,i.ERROR,...e),this._logHandler(this,i.ERROR,...e)}}function l(e){r.forEach(t=>{t.setLogLevel(e)})}function h(e,t){for(const n of r){let r=null;t&&t.level&&(r=s[t.level]),n.userLogHandler=null===e?null:(t,n,...s)=>{const o=s.map(e=>{if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}}).filter(e=>e).join(" ");n>=(null!=r?r:t.logLevel)&&e({level:i[n].toLowerCase(),message:o,args:s,type:t.name})}}}},function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return Yn})),n.d(t,"b",(function(){return Xn})),n.d(t,"c",(function(){return Jn})),n.d(t,"d",(function(){return er})),n.d(t,"e",(function(){return Zn})),n.d(t,"f",(function(){return tr})),n.d(t,"g",(function(){return nr})),n.d(t,"h",(function(){return Hn})),n.d(t,"i",(function(){return Qn}));var r,i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof self?self:{},s={},o=o||{},a=i||self;function c(){}function u(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function l(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}var h="closure_uid_"+(1e9*Math.random()>>>0),d=0;function f(e,t,n){return e.call.apply(e.bind,arguments)}function p(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function m(e,t,n){return(m=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?f:p).apply(null,arguments)}function g(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function y(e,t){function n(){}n.prototype=t.prototype,e.X=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Wb=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function v(){this.s=this.s,this.o=this.o}v.prototype.s=!1,v.prototype.na=function(){var e;!this.s&&(this.s=!0,this.M(),0)&&(e=this,Object.prototype.hasOwnProperty.call(e,h)&&e[h]||(e[h]=++d))},v.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const w=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if("string"==typeof e)return"string"!=typeof t||1!=t.length?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return-1};function b(e){const t=e.length;if(0<t){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function I(e,t){for(let t=1;t<arguments.length;t++){const n=arguments[t];if(u(n)){const t=e.length||0,r=n.length||0;e.length=t+r;for(let i=0;i<r;i++)e[t+i]=n[i]}else e.push(n)}}function _(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}_.prototype.h=function(){this.defaultPrevented=!0};var E=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{a.addEventListener("test",c,t),a.removeEventListener("test",c,t)}catch(e){}return e}();function T(e){return/^[\s\xa0]*$/.test(e)}var S=String.prototype.trim?function(e){return e.trim()}:function(e){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]};function k(e,t){return e<t?-1:e>t?1:0}function A(){var e=a.navigator;return e&&(e=e.userAgent)?e:""}function C(e){return-1!=A().indexOf(e)}function O(e){return O[" "](e),e}O[" "]=c;var x,N,D=C("Opera"),R=C("Trident")||C("MSIE"),P=C("Edge"),L=P||R,M=C("Gecko")&&!(-1!=A().toLowerCase().indexOf("webkit")&&!C("Edge"))&&!(C("Trident")||C("MSIE"))&&!C("Edge"),F=-1!=A().toLowerCase().indexOf("webkit")&&!C("Edge");function j(){var e=a.document;return e?e.documentMode:void 0}e:{var U="",V=(N=A(),M?/rv:([^\);]+)(\)|;)/.exec(N):P?/Edge\/([\d\.]+)/.exec(N):R?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(N):F?/WebKit\/(\S+)/.exec(N):D?/(?:Version)[ \/]?(\S+)/.exec(N):void 0);if(V&&(U=V?V[1]:""),R){var B=j();if(null!=B&&B>parseFloat(U)){x=String(B);break e}}x=U}var q,G={};function K(){return function(e){var t=G;return Object.prototype.hasOwnProperty.call(t,9)?t[9]:t[9]=e(9)}((function(){let e=0;const t=S(String(x)).split("."),n=S("9").split("."),r=Math.max(t.length,n.length);for(let o=0;0==e&&o<r;o++){var i=t[o]||"",s=n[o]||"";do{if(i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],0==i[0].length&&0==s[0].length)break;e=k(0==i[1].length?0:parseInt(i[1],10),0==s[1].length?0:parseInt(s[1],10))||k(0==i[2].length,0==s[2].length)||k(i[2],s[2]),i=i[3],s=s[3]}while(0==e)}return 0<=e}))}if(a.document&&R){var z=j();q=z||(parseInt(x,10)||void 0)}else q=void 0;var $=q;function W(e,t){if(_.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(M){e:{try{O(t.nodeName);var i=!0;break e}catch(e){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:H[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&W.X.h.call(this)}}y(W,_);var H={2:"touch",3:"pen",4:"mouse"};W.prototype.h=function(){W.X.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var Q="closure_listenable_"+(1e6*Math.random()|0),Y=0;function J(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++Y,this.ba=this.ea=!1}function X(e){e.ba=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function Z(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function ee(e){const t={};for(const n in e)t[n]=e[n];return t}const te="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ne(e,t){let n,r;for(let t=1;t<arguments.length;t++){for(n in r=arguments[t],r)e[n]=r[n];for(let t=0;t<te.length;t++)n=te[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function re(e){this.src=e,this.g={},this.h=0}function ie(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],s=w(i,t);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(X(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function se(e,t,n,r){for(var i=0;i<e.length;++i){var s=e[i];if(!s.ba&&s.listener==t&&s.capture==!!n&&s.ha==r)return i}return-1}re.prototype.add=function(e,t,n,r,i){var s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);var o=se(e,t,r,i);return-1<o?(t=e[o],n||(t.ea=!1)):((t=new J(t,this.src,s,!!r,i)).ea=n,e.push(t)),t};var oe="closure_lm_"+(1e6*Math.random()|0),ae={};function ce(e,t,n,r,i){if(r&&r.once)return function e(t,n,r,i,s){if(Array.isArray(n)){for(var o=0;o<n.length;o++)e(t,n[o],r,i,s);return null}return r=me(r),t&&t[Q]?t.O(n,r,l(i)?!!i.capture:!!i,s):ue(t,n,r,!0,i,s)}(e,t,n,r,i);if(Array.isArray(t)){for(var s=0;s<t.length;s++)ce(e,t[s],n,r,i);return null}return n=me(n),e&&e[Q]?e.N(t,n,l(r)?!!r.capture:!!r,i):ue(e,t,n,!1,r,i)}function ue(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");var o=l(i)?!!i.capture:!!i,a=fe(e);if(a||(e[oe]=a=new re(e)),(n=a.add(t,n,r,o,s)).proxy)return n;if(r=function(){const e=de;return function t(n){return e.call(t.src,t.listener,n)}}(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)E||(i=o),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(he(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}function le(e){if("number"!=typeof e&&e&&!e.ba){var t=e.src;if(t&&t[Q])ie(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(he(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=fe(t))?(ie(n,e),0==n.h&&(n.src=null,t[oe]=null)):X(e)}}}function he(e){return e in ae?ae[e]:ae[e]="on"+e}function de(e,t){if(e.ba)e=!0;else{t=new W(t,this);var n=e.listener,r=e.ha||e.src;e.ea&&le(e),e=n.call(r,t)}return e}function fe(e){return(e=e[oe])instanceof re?e:null}var pe="__closure_events_fn_"+(1e9*Math.random()>>>0);function me(e){return"function"==typeof e?e:(e[pe]||(e[pe]=function(t){return e.handleEvent(t)}),e[pe])}function ge(){v.call(this),this.i=new re(this),this.P=this,this.I=null}function ye(e,t){var n,r=e.I;if(r)for(n=[];r;r=r.I)n.push(r);if(e=e.P,r=t.type||t,"string"==typeof t)t=new _(t,e);else if(t instanceof _)t.target=t.target||e;else{var i=t;ne(t=new _(r,e),i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var o=t.g=n[s];i=ve(o,r,!0,t)&&i}if(i=ve(o=t.g=e,r,!0,t)&&i,i=ve(o,r,!1,t)&&i,n)for(s=0;s<n.length;s++)i=ve(o=t.g=n[s],r,!1,t)&&i}function ve(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var o=t[s];if(o&&!o.ba&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.ea&&ie(e.i,o),i=!1!==a.call(c,r)&&i}}return i&&!r.defaultPrevented}y(ge,v),ge.prototype[Q]=!0,ge.prototype.removeEventListener=function(e,t,n,r){!function e(t,n,r,i,s){if(Array.isArray(n))for(var o=0;o<n.length;o++)e(t,n[o],r,i,s);else i=l(i)?!!i.capture:!!i,r=me(r),t&&t[Q]?(t=t.i,(n=String(n).toString())in t.g&&(-1<(r=se(o=t.g[n],r,i,s))&&(X(o[r]),Array.prototype.splice.call(o,r,1),0==o.length&&(delete t.g[n],t.h--)))):t&&(t=fe(t))&&(n=t.g[n.toString()],t=-1,n&&(t=se(n,r,i,s)),(r=-1<t?n[t]:null)&&le(r))}(this,e,t,n,r)},ge.prototype.M=function(){if(ge.X.M.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)X(n[r]);delete t.g[e],t.h--}}this.I=null},ge.prototype.N=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},ge.prototype.O=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};var we=a.JSON.stringify;function be(){var e=Ae;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var Ie,_e=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new Ee,e=>e.reset());class Ee{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function Te(e){a.setTimeout(()=>{throw e},0)}function Se(e,t){Ie||function(){var e=a.Promise.resolve(void 0);Ie=function(){e.then(Ce)}}(),ke||(Ie(),ke=!0),Ae.add(e,t)}var ke=!1,Ae=new class{constructor(){this.h=this.g=null}add(e,t){const n=_e.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}};function Ce(){for(var e;e=be();){try{e.h.call(e.g)}catch(e){Te(e)}var t=_e;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}ke=!1}function Oe(e,t){ge.call(this),this.h=e||1,this.g=t||a,this.j=m(this.lb,this),this.l=Date.now()}function xe(e){e.ca=!1,e.R&&(e.g.clearTimeout(e.R),e.R=null)}function Ne(e,t,n){if("function"==typeof e)n&&(e=m(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=m(e.handleEvent,e)}return 2147483647<Number(t)?-1:a.setTimeout(e,t||0)}y(Oe,ge),(r=Oe.prototype).ca=!1,r.R=null,r.lb=function(){if(this.ca){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.R=this.g.setTimeout(this.j,this.h-e):(this.R&&(this.g.clearTimeout(this.R),this.R=null),ye(this,"tick"),this.ca&&(xe(this),this.start()))}},r.start=function(){this.ca=!0,this.R||(this.R=this.g.setTimeout(this.j,this.h),this.l=Date.now())},r.M=function(){Oe.X.M.call(this),xe(this),delete this.g};class De extends v{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:function e(t){t.g=Ne(()=>{t.g=null,t.i&&(t.i=!1,e(t))},t.j);const n=t.h;t.h=null,t.m.apply(null,n)}(this)}M(){super.M(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Re(e){v.call(this),this.h=e,this.g={}}y(Re,v);var Pe=[];function Le(e,t,n,r){Array.isArray(n)||(n&&(Pe[0]=n.toString()),n=Pe);for(var i=0;i<n.length;i++){var s=ce(t,n[i],r||e.handleEvent,!1,e.h||e);if(!s)break;e.g[s.key]=s}}function Me(e){Z(e.g,(function(e,t){this.g.hasOwnProperty(t)&&le(e)}),e),e.g={}}function Fe(){this.g=!0}function je(e,t,n,r){e.info((function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<i.length;o++)i[o]=""}}}return we(n)}catch(e){return t}}(e,n)+(r?" "+r:"")}))}Re.prototype.M=function(){Re.X.M.call(this),Me(this)},Re.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},Fe.prototype.Aa=function(){this.g=!1},Fe.prototype.info=function(){};var Ue={},Ve=null;function Be(){return Ve=Ve||new ge}function qe(e){_.call(this,Ue.Pa,e)}function Ge(e){const t=Be();ye(t,new qe(t))}function Ke(e,t){_.call(this,Ue.STAT_EVENT,e),this.stat=t}function ze(e){const t=Be();ye(t,new Ke(t,e))}function $e(e,t){_.call(this,Ue.Qa,e),this.size=t}function We(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return a.setTimeout((function(){e()}),t)}Ue.Pa="serverreachability",y(qe,_),Ue.STAT_EVENT="statevent",y(Ke,_),Ue.Qa="timingevent",y($e,_);var He={NO_ERROR:0,mb:1,zb:2,yb:3,tb:4,xb:5,Ab:6,Ma:7,TIMEOUT:8,Db:9},Qe={rb:"complete",Nb:"success",Na:"error",Ma:"abort",Fb:"ready",Gb:"readystatechange",TIMEOUT:"timeout",Bb:"incrementaldata",Eb:"progress",ub:"downloadprogress",Vb:"uploadprogress"};function Ye(){}function Je(e){return e.h||(e.h=e.i())}function Xe(){}Ye.prototype.h=null;var Ze,et={OPEN:"a",qb:"b",Na:"c",Cb:"d"};function tt(){_.call(this,"d")}function nt(){_.call(this,"c")}function rt(){}function it(e,t,n,r){this.l=e,this.j=t,this.m=n,this.U=r||1,this.S=new Re(this),this.O=ot,e=L?125:void 0,this.T=new Oe(e),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.V=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.Y=-1,this.I=!1,this.N=0,this.L=null,this.$=this.J=this.Z=this.P=!1,this.h=new st}function st(){this.i=null,this.g="",this.h=!1}y(tt,_),y(nt,_),y(rt,Ye),rt.prototype.g=function(){return new XMLHttpRequest},rt.prototype.i=function(){return{}},Ze=new rt;var ot=45e3,at={},ct={};function ut(e,t,n){e.K=1,e.v=Ct(Et(t)),e.s=n,e.P=!0,lt(e,null)}function lt(e,t){e.F=Date.now(),pt(e),e.A=Et(e.v);var n=e.A,r=e.U;Array.isArray(r)||(r=[String(r)]),Bt(n.i,"t",r),e.C=0,n=e.l.H,e.h=new st,e.g=Bn(e.l,n?t:null,!e.s),0<e.N&&(e.L=new De(m(e.La,e,e.g),e.N)),Le(e.S,e.g,"readystatechange",e.ib),t=e.H?ee(e.H):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.da(e.A,e.u,e.s,t)):(e.u="GET",e.g.da(e.A,e.u,null,t)),Ge(),function(e,t,n,r,i,s){e.info((function(){if(e.g)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");o=2<=h.length&&"type"==h[1]?o+(l+"=")+u+"&":o+(l+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o}))}(e.j,e.u,e.A,e.m,e.U,e.s)}function ht(e){return!!e.g&&("GET"==e.u&&2!=e.K&&e.l.Da)}function dt(e,t,n){let r,i=!0;for(;!e.I&&e.C<n.length;){if(r=ft(e,n),r==ct){4==t&&(e.o=4,ze(14),i=!1),je(e.j,e.m,null,"[Incomplete Response]");break}if(r==at){e.o=4,ze(15),je(e.j,e.m,n,"[Invalid Chunk]"),i=!1;break}je(e.j,e.m,r,null),wt(e,r)}ht(e)&&r!=ct&&r!=at&&(e.h.g="",e.C=0),4!=t||0!=n.length||e.h.h||(e.o=1,ze(16),i=!1),e.i=e.i&&i,i?0<n.length&&!e.$&&(e.$=!0,(t=e.l).g==e&&t.$&&!t.K&&(t.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),Rn(t),t.K=!0,ze(11))):(je(e.j,e.m,n,"[Invalid Chunked Response]"),vt(e),yt(e))}function ft(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?ct:(n=Number(t.substring(n,r)),isNaN(n)?at:(r+=1)+n>t.length?ct:(t=t.substr(r,n),e.C=r+n,t))}function pt(e){e.V=Date.now()+e.O,mt(e,e.O)}function mt(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=We(m(e.gb,e),t)}function gt(e){e.B&&(a.clearTimeout(e.B),e.B=null)}function yt(e){0==e.l.G||e.I||Mn(e.l,e)}function vt(e){gt(e);var t=e.L;t&&"function"==typeof t.na&&t.na(),e.L=null,xe(e.T),Me(e.S),e.g&&(t=e.g,e.g=null,t.abort(),t.na())}function wt(e,t){try{var n=e.l;if(0!=n.G&&(n.g==e||Wt(n.h,e)))if(!e.J&&Wt(n.h,e)&&3==n.G){try{var r=n.Fa.g.parse(t)}catch(e){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;Ln(n),Sn(n)}Dn(n),ze(18)}}else n.Ba=i[1],0<n.Ba-n.T&&37500>i[2]&&n.L&&0==n.A&&!n.v&&(n.v=We(m(n.cb,n),6e3));if(1>=$t(n.h)&&n.ja){try{n.ja()}catch(e){}n.ja=void 0}}else jn(n,11)}else if((e.J||n.g==e)&&Ln(n),!T(t))for(i=n.Fa.g.parse(t),t=0;t<i.length;t++){let u=i[t];if(n.T=u[0],u=u[1],2==n.G)if("c"==u[0]){n.I=u[1],n.ka=u[2];const t=u[3];null!=t&&(n.ma=t,n.j.info("VER="+n.ma));const i=u[4];null!=i&&(n.Ca=i,n.j.info("SVER="+n.Ca));const l=u[5];null!=l&&"number"==typeof l&&0<l&&(r=1.5*l,n.J=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(Ht(s,s.h),s.h=null))}if(r.D){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.za=e,At(r.F,r.D,e))}}n.G=3,n.l&&n.l.xa(),n.$&&(n.P=Date.now()-e.F,n.j.info("Handshake RTT: "+n.P+"ms"));var o=e;if((r=n).sa=Vn(r,r.H?r.ka:null,r.V),o.J){Qt(r.h,o);var a=o,c=r.J;c&&a.setTimeout(c),a.B&&(gt(a),pt(a)),r.g=o}else Nn(r);0<n.i.length&&An(n)}else"stop"!=u[0]&&"close"!=u[0]||jn(n,7);else 3==n.G&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?jn(n,7):Tn(n):"noop"!=u[0]&&n.l&&n.l.wa(u),n.A=0)}Ge()}catch(e){}}function bt(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(u(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.oa&&"function"==typeof e.oa)return e.oa();if(!e.W||"function"!=typeof e.W){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(u(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const r in e)t[n++]=r;return t}}}(e),r=function(e){if(e.W&&"function"==typeof e.W)return e.W();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(u(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}(e),i=r.length,s=0;s<i;s++)t.call(void 0,r[s],n&&n[s],e)}(r=it.prototype).setTimeout=function(e){this.O=e},r.ib=function(e){e=e.target;const t=this.L;t&&3==vn(e)?t.l():this.La(e)},r.La=function(e){try{if(e==this.g)e:{const h=vn(this.g);var t=this.g.Ea();this.g.aa();if(!(3>h)&&(3!=h||L||this.g&&(this.h.h||this.g.fa()||wn(this.g)))){this.I||4!=h||7==t||Ge(),gt(this);var n=this.g.aa();this.Y=n;t:if(ht(this)){var r=wn(this.g);e="";var i=r.length,s=4==vn(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){vt(this),yt(this);var o="";break t}this.h.i=new a.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:s&&t==i-1});r.splice(0,i),this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.fa();if(this.i=200==n,function(e,t,n,r,i,s,o){e.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+o}))}(this.j,this.u,this.A,this.m,this.U,h,n),this.i){if(this.Z&&!this.J){t:{if(this.g){var c,u=this.g;if((c=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(c)){var l=c;break t}}l=null}if(!(n=l)){this.i=!1,this.o=3,ze(12),vt(this),yt(this);break e}je(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,wt(this,n)}this.P?(dt(this,h,o),L&&this.i&&3==h&&(Le(this.S,this.T,"tick",this.hb),this.T.start())):(je(this.j,this.m,o,null),wt(this,o)),4==h&&vt(this),this.i&&!this.I&&(4==h?Mn(this.l,this):(this.i=!1,pt(this)))}else 400==n&&0<o.indexOf("Unknown SID")?(this.o=3,ze(12)):(this.o=0,ze(13)),vt(this),yt(this)}}}catch(e){}},r.hb=function(){if(this.g){var e=vn(this.g),t=this.g.fa();this.C<t.length&&(gt(this),dt(this,e,t),this.i&&4!=e&&pt(this))}},r.cancel=function(){this.I=!0,vt(this)},r.gb=function(){this.B=null;const e=Date.now();0<=e-this.V?(function(e,t){e.info((function(){return"TIMEOUT: "+t}))}(this.j,this.A),2!=this.K&&(Ge(),ze(17)),vt(this),this.o=2,yt(this)):mt(this,this.V-e)};var It=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function _t(e,t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,e instanceof _t){this.h=void 0!==t?t:e.h,Tt(this,e.j),this.s=e.s,this.g=e.g,St(this,e.m),this.l=e.l,t=e.i;var n=new Ft;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),kt(this,n),this.o=e.o}else e&&(n=String(e).match(It))?(this.h=!!t,Tt(this,n[1]||"",!0),this.s=Ot(n[2]||""),this.g=Ot(n[3]||"",!0),St(this,n[4]),this.l=Ot(n[5]||"",!0),kt(this,n[6]||"",!0),this.o=Ot(n[7]||"")):(this.h=!!t,this.i=new Ft(null,this.h))}function Et(e){return new _t(e)}function Tt(e,t,n){e.j=n?Ot(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function St(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function kt(e,t,n){t instanceof Ft?(e.i=t,function(e,t){t&&!e.j&&(jt(e),e.i=null,e.g.forEach((function(e,t){var n=t.toLowerCase();t!=n&&(Ut(this,t),Bt(this,n,e))}),e)),e.j=t}(e.i,e.h)):(n||(t=xt(t,Lt)),e.i=new Ft(t,e.h))}function At(e,t,n){e.i.set(t,n)}function Ct(e){return At(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function Ot(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function xt(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,Nt),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function Nt(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}_t.prototype.toString=function(){var e=[],t=this.j;t&&e.push(xt(t,Dt,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.s)&&e.push(xt(t,Dt,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(xt(n,"/"==n.charAt(0)?Pt:Rt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.o)&&e.push("#",xt(n,Mt)),e.join("")};var Dt=/[#\/\?@]/g,Rt=/[#\?:]/g,Pt=/[#\?]/g,Lt=/[#\?@]/g,Mt=/#/g;function Ft(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function jt(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var s=e[n].substring(0,r);i=e[n].substring(r+1)}else s=e[n];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,(function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)})))}function Ut(e,t){jt(e),t=qt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function Vt(e,t){return jt(e),t=qt(e,t),e.g.has(t)}function Bt(e,t,n){Ut(e,t),0<n.length&&(e.i=null,e.g.set(qt(e,t),b(n)),e.h+=n.length)}function qt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}(r=Ft.prototype).add=function(e,t){jt(this),this.i=null,e=qt(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},r.forEach=function(e,t){jt(this),this.g.forEach((function(n,r){n.forEach((function(n){e.call(t,n,r,this)}),this)}),this)},r.oa=function(){jt(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let r=0;r<t.length;r++){const i=e[r];for(let e=0;e<i.length;e++)n.push(t[r])}return n},r.W=function(e){jt(this);let t=[];if("string"==typeof e)Vt(this,e)&&(t=t.concat(this.g.get(qt(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},r.set=function(e,t){return jt(this),this.i=null,Vt(this,e=qt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},r.get=function(e,t){return e&&0<(e=this.W(e)).length?String(e[0]):t},r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var r=t[n];const s=encodeURIComponent(String(r)),o=this.W(r);for(r=0;r<o.length;r++){var i=s;""!==o[r]&&(i+="="+encodeURIComponent(String(o[r]))),e.push(i)}}return this.i=e.join("&")};function Gt(e){this.l=e||Kt,a.PerformanceNavigationTiming?e=0<(e=a.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(a.g&&a.g.Ga&&a.g.Ga()&&a.g.Ga().$b),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Kt=10;function zt(e){return!!e.h||!!e.g&&e.g.size>=e.j}function $t(e){return e.h?1:e.g?e.g.size:0}function Wt(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Ht(e,t){e.g?e.g.add(t):e.h=t}function Qt(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Yt(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return b(e.i)}function Jt(){}function Xt(){this.g=new Jt}function Zt(e,t,n){const r=n||"";try{bt(e,(function(e,n){let i=e;l(e)&&(i=we(e)),t.push(r+n+"="+encodeURIComponent(i))}))}catch(e){throw t.push(r+"type="+encodeURIComponent("_badmap")),e}}function en(e,t,n,r,i){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,i(r)}catch(e){}}function tn(e){this.l=e.ac||null,this.j=e.jb||!1}function nn(e,t){ge.call(this),this.D=e,this.u=t,this.m=void 0,this.readyState=rn,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}Gt.prototype.cancel=function(){if(this.i=Yt(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}},Jt.prototype.stringify=function(e){return a.JSON.stringify(e,void 0)},Jt.prototype.parse=function(e){return a.JSON.parse(e,void 0)},y(tn,Ye),tn.prototype.g=function(){return new nn(this.l,this.j)},tn.prototype.i=function(e){return function(){return e}}({}),y(nn,ge);var rn=0;function sn(e){e.j.read().then(e.Ta.bind(e)).catch(e.ga.bind(e))}function on(e){e.readyState=4,e.l=null,e.j=null,e.A=null,an(e)}function an(e){e.onreadystatechange&&e.onreadystatechange.call(e)}(r=nn.prototype).open=function(e,t){if(this.readyState!=rn)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,an(this)},r.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||a).fetch(new Request(this.B,t)).then(this.Wa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,on(this)),this.readyState=rn},r.Wa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,an(this)),this.g&&(this.readyState=3,an(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Ua.bind(this),this.ga.bind(this));else if(void 0!==a.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;sn(this)}else e.text().then(this.Va.bind(this),this.ga.bind(this))},r.Ta=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?on(this):an(this),3==this.readyState&&sn(this)}},r.Va=function(e){this.g&&(this.response=this.responseText=e,on(this))},r.Ua=function(e){this.g&&(this.response=e,on(this))},r.ga=function(){this.g&&on(this)},r.setRequestHeader=function(e,t){this.v.append(e,t)},r.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(nn.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}});var cn=a.JSON.parse;function un(e){ge.call(this),this.headers=new Map,this.u=e||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=ln,this.K=this.L=!1}y(un,ge);var ln="",hn=/^https?$/i,dn=["POST","PUT"];function fn(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,pn(e),gn(e)}function pn(e){e.D||(e.D=!0,ye(e,"complete"),ye(e,"error"))}function mn(e){if(e.h&&void 0!==o&&(!e.C[1]||4!=vn(e)||2!=e.aa()))if(e.v&&4==vn(e))Ne(e.Ha,0,e);else if(ye(e,"readystatechange"),4==vn(e)){e.h=!1;try{const o=e.aa();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===o){var i=String(e.H).match(It)[1]||null;if(!i&&a.self&&a.self.location){var s=a.self.location.protocol;i=s.substr(0,s.length-1)}r=!hn.test(i?i.toLowerCase():"")}n=r}if(n)ye(e,"complete"),ye(e,"success");else{e.m=6;try{var c=2<vn(e)?e.g.statusText:""}catch(e){c=""}e.j=c+" ["+e.aa()+"]",pn(e)}}finally{gn(e)}}}function gn(e,t){if(e.g){yn(e);const n=e.g,r=e.C[0]?c:null;e.g=null,e.C=null,t||ye(e,"ready");try{n.onreadystatechange=r}catch(e){}}}function yn(e){e.g&&e.K&&(e.g.ontimeout=null),e.A&&(a.clearTimeout(e.A),e.A=null)}function vn(e){return e.g?e.g.readyState:0}function wn(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.J){case ln:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function bn(e){let t="";return Z(e,(function(e,n){t+=n,t+=":",t+=e,t+="\r\n"})),t}function In(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=bn(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):At(e,t,n))}function _n(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function En(e){this.Ca=0,this.i=[],this.j=new Fe,this.ka=this.sa=this.F=this.V=this.g=this.za=this.D=this.ia=this.o=this.S=this.s=null,this.ab=this.U=0,this.Za=_n("failFast",!1,e),this.L=this.v=this.u=this.m=this.l=null,this.Y=!0,this.pa=this.Ba=this.T=-1,this.Z=this.A=this.C=0,this.Xa=_n("baseRetryDelayMs",5e3,e),this.bb=_n("retryDelaySeedMs",1e4,e),this.$a=_n("forwardChannelMaxRetries",2,e),this.ta=_n("forwardChannelRequestTimeoutMs",2e4,e),this.ra=e&&e.xmlHttpFactory||void 0,this.Da=e&&e.Zb||!1,this.J=void 0,this.H=e&&e.supportsCrossDomainXhr||!1,this.I="",this.h=new Gt(e&&e.concurrentRequestLimit),this.Fa=new Xt,this.O=e&&e.fastHandshake||!1,this.N=e&&e.encodeInitMessageHeaders||!1,this.O&&this.N&&(this.N=!1),this.Ya=e&&e.Xb||!1,e&&e.Aa&&this.j.Aa(),e&&e.forceLongPolling&&(this.Y=!1),this.$=!this.O&&this.Y&&e&&e.detectBufferingProxy||!1,this.ja=void 0,this.P=0,this.K=!1,this.la=this.B=null}function Tn(e){if(kn(e),3==e.G){var t=e.U++,n=Et(e.F);At(n,"SID",e.I),At(n,"RID",t),At(n,"TYPE","terminate"),On(e,n),(t=new it(e,e.j,t,void 0)).K=2,t.v=Ct(Et(n)),n=!1,a.navigator&&a.navigator.sendBeacon&&(n=a.navigator.sendBeacon(t.v.toString(),"")),!n&&a.Image&&((new Image).src=t.v,n=!0),n||(t.g=Bn(t.l,null),t.g.da(t.v)),t.F=Date.now(),pt(t)}Un(e)}function Sn(e){e.g&&(Rn(e),e.g.cancel(),e.g=null)}function kn(e){Sn(e),e.u&&(a.clearTimeout(e.u),e.u=null),Ln(e),e.h.cancel(),e.m&&("number"==typeof e.m&&a.clearTimeout(e.m),e.m=null)}function An(e){zt(e.h)||e.m||(e.m=!0,Se(e.Ja,e),e.C=0)}function Cn(e,t){var n;n=t?t.m:e.U++;const r=Et(e.F);At(r,"SID",e.I),At(r,"RID",n),At(r,"AID",e.T),On(e,r),e.o&&e.s&&In(r,e.o,e.s),n=new it(e,e.j,n,e.C+1),null===e.o&&(n.H=e.s),t&&(e.i=t.D.concat(e.i)),t=xn(e,n,1e3),n.setTimeout(Math.round(.5*e.ta)+Math.round(.5*e.ta*Math.random())),Ht(e.h,n),ut(n,r,t)}function On(e,t){e.ia&&Z(e.ia,(function(e,n){At(t,n,e)})),e.l&&bt({},(function(e,n){At(t,n,e)}))}function xn(e,t,n){n=Math.min(e.i.length,n);var r=e.l?m(e.l.Ra,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=i[0].h,e.push("ofs="+t)):t=0:e.push("ofs="+t);let s=!0;for(let o=0;o<n;o++){let n=i[o].h;const a=i[o].g;if(n-=t,0>n)t=Math.max(0,i[o].h-100),s=!1;else try{Zt(a,e,"req"+n+"_")}catch(e){r&&r(a)}}if(s){r=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,r}function Nn(e){e.g||e.u||(e.Z=1,Se(e.Ia,e),e.A=0)}function Dn(e){return!(e.g||e.u||3<=e.A)&&(e.Z++,e.u=We(m(e.Ia,e),Fn(e,e.A)),e.A++,!0)}function Rn(e){null!=e.B&&(a.clearTimeout(e.B),e.B=null)}function Pn(e){e.g=new it(e,e.j,"rpc",e.Z),null===e.o&&(e.g.H=e.s),e.g.N=0;var t=Et(e.sa);At(t,"RID","rpc"),At(t,"SID",e.I),At(t,"CI",e.L?"0":"1"),At(t,"AID",e.T),At(t,"TYPE","xmlhttp"),On(e,t),e.o&&e.s&&In(t,e.o,e.s),e.J&&e.g.setTimeout(e.J);var n=e.g;e=e.ka,n.K=1,n.v=Ct(Et(t)),n.s=null,n.P=!0,lt(n,e)}function Ln(e){null!=e.v&&(a.clearTimeout(e.v),e.v=null)}function Mn(e,t){var n=null;if(e.g==t){Ln(e),Rn(e),e.g=null;var r=2}else{if(!Wt(e.h,t))return;n=t.D,Qt(e.h,t),r=1}if(0!=e.G)if(e.pa=t.Y,t.i)if(1==r){n=t.s?t.s.length:0,t=Date.now()-t.F;var i=e.C;ye(r=Be(),new $e(r,n)),An(e)}else Nn(e);else if(3==(i=t.o)||0==i&&0<e.pa||!(1==r&&function(e,t){return!($t(e.h)>=e.h.j-(e.m?1:0))&&(e.m?(e.i=t.D.concat(e.i),!0):!(1==e.G||2==e.G||e.C>=(e.Za?0:e.$a))&&(e.m=We(m(e.Ja,e,t),Fn(e,e.C)),e.C++,!0))}(e,t)||2==r&&Dn(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),i){case 1:jn(e,5);break;case 4:jn(e,10);break;case 3:jn(e,6);break;default:jn(e,2)}}function Fn(e,t){let n=e.Xa+Math.floor(Math.random()*e.bb);return e.l||(n*=2),n*t}function jn(e,t){if(e.j.info("Error code "+t),2==t){var n=null;e.l&&(n=null);var r=m(e.kb,e);n||(n=new _t("//www.google.com/images/cleardot.gif"),a.location&&"http"==a.location.protocol||Tt(n,"https"),Ct(n)),function(e,t){const n=new Fe;if(a.Image){const r=new Image;r.onload=g(en,n,r,"TestLoadImage: loaded",!0,t),r.onerror=g(en,n,r,"TestLoadImage: error",!1,t),r.onabort=g(en,n,r,"TestLoadImage: abort",!1,t),r.ontimeout=g(en,n,r,"TestLoadImage: timeout",!1,t),a.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=e}else t(!1)}(n.toString(),r)}else ze(2);e.G=0,e.l&&e.l.va(t),Un(e),kn(e)}function Un(e){if(e.G=0,e.la=[],e.l){const t=Yt(e.h);0==t.length&&0==e.i.length||(I(e.la,t),I(e.la,e.i),e.h.i.length=0,b(e.i),e.i.length=0),e.l.ua()}}function Vn(e,t,n){var r=n instanceof _t?Et(n):new _t(n,void 0);if(""!=r.g)t&&(r.g=t+"."+r.g),St(r,r.m);else{var i=a.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var s=new _t(null,void 0);r&&Tt(s,r),t&&(s.g=t),i&&St(s,i),n&&(s.l=n),r=s}return n=e.D,t=e.za,n&&t&&At(r,n,t),At(r,"VER",e.ma),On(e,r),r}function Bn(e,t,n){if(t&&!e.H)throw Error("Can't create secondary domain capable XhrIo object.");return(t=n&&e.Da&&!e.ra?new un(new tn({jb:!0})):new un(e.ra)).Ka(e.H),t}function qn(){}function Gn(){if(R&&!(10<=Number($)))throw Error("Environmental error: no available transport.")}function Kn(e,t){ge.call(this),this.g=new En(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.ya&&(e?e["X-WebChannel-Client-Profile"]=t.ya:e={"X-WebChannel-Client-Profile":t.ya}),this.g.S=e,(e=t&&t.Yb)&&!T(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!T(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new Wn(this)}function zn(e){tt.call(this);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function $n(){nt.call(this),this.status=1}function Wn(e){this.g=e}(r=un.prototype).Ka=function(e){this.L=e},r.da=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+e);t=t?t.toUpperCase():"GET",this.H=e,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():Ze.g(),this.C=this.u?Je(this.u):Je(Ze),this.g.onreadystatechange=m(this.Ha,this);try{this.F=!0,this.g.open(t,String(e),!0),this.F=!1}catch(e){return void fn(this,e)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),i=a.FormData&&e instanceof a.FormData,!(0<=w(dn,t))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[e,t]of n)this.g.setRequestHeader(e,t);this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{yn(this),0<this.B&&((this.K=function(e){return R&&K()&&"number"==typeof e.timeout&&void 0!==e.ontimeout}(this.g))?(this.g.timeout=this.B,this.g.ontimeout=m(this.qa,this)):this.A=Ne(this.qa,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(e){fn(this,e)}},r.qa=function(){void 0!==o&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,ye(this,"timeout"),this.abort(8))},r.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,ye(this,"complete"),ye(this,"abort"),gn(this))},r.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),gn(this,!0)),un.X.M.call(this)},r.Ha=function(){this.s||(this.F||this.v||this.l?mn(this):this.fb())},r.fb=function(){mn(this)},r.aa=function(){try{return 2<vn(this)?this.g.status:-1}catch(e){return-1}},r.fa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},r.Sa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),cn(t)}},r.Ea=function(){return this.m},r.Oa=function(){return"string"==typeof this.j?this.j:String(this.j)},(r=En.prototype).ma=8,r.G=1,r.Ja=function(e){if(this.m)if(this.m=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const i=new it(this,this.j,e,void 0);let s=this.s;if(this.S&&(s?(s=ee(s),ne(s,this.S)):s=this.S),null!==this.o||this.N||(i.H=s,s=null),this.O)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.g&&"string"==typeof(r=r.g.__data__)?r.length:void 0))break;if(4096<(t+=r)){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=xn(this,i,t),At(n=Et(this.F),"RID",e),At(n,"CVER",22),this.D&&At(n,"X-HTTP-Session-Id",this.D),On(this,n),s&&(this.N?t="headers="+encodeURIComponent(String(bn(s)))+"&"+t:this.o&&In(n,this.o,s)),Ht(this.h,i),this.Ya&&At(n,"TYPE","init"),this.O?(At(n,"$req",t),At(n,"SID","null"),i.Z=!0,ut(i,n,null)):ut(i,n,t),this.G=2}}else 3==this.G&&(e?Cn(this,e):0==this.i.length||zt(this.h)||Cn(this))},r.Ia=function(){if(this.u=null,Pn(this),this.$&&!(this.K||null==this.g||0>=this.P)){var e=2*this.P;this.j.info("BP detection timer enabled: "+e),this.B=We(m(this.eb,this),e)}},r.eb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.L=!1,this.K=!0,ze(10),Sn(this),Pn(this))},r.cb=function(){null!=this.v&&(this.v=null,Sn(this),Dn(this),ze(19))},r.kb=function(e){e?(this.j.info("Successfully pinged google.com"),ze(2)):(this.j.info("Failed to ping google.com"),ze(1))},(r=qn.prototype).xa=function(){},r.wa=function(){},r.va=function(){},r.ua=function(){},r.Ra=function(){},Gn.prototype.g=function(e,t){return new Kn(e,t)},y(Kn,ge),Kn.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.H=!0);var e=this.g,t=this.l,n=this.h||void 0;ze(0),e.V=t,e.ia=n||{},e.L=e.Y,e.F=Vn(e,null,e.V),An(e)},Kn.prototype.close=function(){Tn(this.g)},Kn.prototype.u=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=we(e),e=n);t.i.push(new class{constructor(e,t){this.h=e,this.g=t}}(t.ab++,e)),3==t.G&&An(t)},Kn.prototype.M=function(){this.g.l=null,delete this.j,Tn(this.g),delete this.g,Kn.X.M.call(this)},y(zn,tt),y($n,nt),y(Wn,qn),Wn.prototype.xa=function(){ye(this.g,"a")},Wn.prototype.wa=function(e){ye(this.g,new zn(e))},Wn.prototype.va=function(e){ye(this.g,new $n)},Wn.prototype.ua=function(){ye(this.g,"b")},Gn.prototype.createWebChannel=Gn.prototype.g,Kn.prototype.send=Kn.prototype.u,Kn.prototype.open=Kn.prototype.m,Kn.prototype.close=Kn.prototype.close,He.NO_ERROR=0,He.TIMEOUT=8,He.HTTP_ERROR=6,Qe.COMPLETE="complete",Xe.EventType=et,et.OPEN="a",et.CLOSE="b",et.ERROR="c",et.MESSAGE="d",ge.prototype.listen=ge.prototype.N,un.prototype.listenOnce=un.prototype.O,un.prototype.getLastError=un.prototype.Oa,un.prototype.getLastErrorCode=un.prototype.Ea,un.prototype.getStatus=un.prototype.aa,un.prototype.getResponseJson=un.prototype.Sa,un.prototype.getResponseText=un.prototype.fa,un.prototype.send=un.prototype.da,un.prototype.setWithCredentials=un.prototype.Ka;var Hn=s.createWebChannelTransport=function(){return new Gn},Qn=s.getStatEventTarget=function(){return Be()},Yn=s.ErrorCode=He,Jn=s.EventType=Qe,Xn=s.Event=Ue,Zn=s.Stat={sb:0,vb:1,wb:2,Pb:3,Ub:4,Rb:5,Sb:6,Qb:7,Ob:8,Tb:9,PROXY:10,NOPROXY:11,Mb:12,Ib:13,Jb:14,Hb:15,Kb:16,Lb:17,ob:18,nb:19,pb:20},er=s.FetchXmlHttpFactory=tn,tr=s.WebChannel=Xe,nr=s.XhrIo=un}).call(this,n(19))},function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(22),i="undefined"!=typeof URLSearchParams?URLSearchParams:r.a,s=FormData;const o=(()=>{let e;return("undefined"==typeof navigator||"ReactNative"!==(e=navigator.product)&&"NativeScript"!==e&&"NS"!==e)&&("undefined"!=typeof window&&"undefined"!=typeof document)})();var a={isBrowser:!0,classes:{URLSearchParams:i,FormData:s,Blob:Blob},isStandardBrowserEnv:o,protocols:["http","https","file","blob","url","data"]}},function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var r=n(0),i=n(9),s=n(5),o=n(10);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class a{constructor(e,t){this._delegate=e,this.firebase=t,Object(s._addComponent)(e,new i.a("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),Object(s.deleteApp)(this._delegate)))}_getService(e,t=s._DEFAULT_ENTRY_NAME){var n;this._delegate.checkDestroyed();const r=this._delegate.container.getProvider(e);return r.isInitialized()||"EXPLICIT"!==(null===(n=r.getComponent())||void 0===n?void 0:n.instantiationMode)||r.initialize(),r.getImmediate({identifier:t})}_removeServiceInstance(e,t=s._DEFAULT_ENTRY_NAME){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(e){Object(s._addComponent)(this._delegate,e)}_addOrOverwriteComponent(e){Object(s._addOrOverwriteComponent)(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},u=new r.b("app-compat","Firebase",c);const l=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function e(){const t=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){const t={},n={__esModule:!0,initializeApp:function(i,o={}){const a=s.initializeApp(i,o);if(Object(r.h)(t,a.name))return t[a.name];const c=new e(a,n);return t[a.name]=c,c},app:i,registerVersion:s.registerVersion,setLogLevel:s.setLogLevel,onLog:s.onLog,apps:null,SDK_VERSION:s.SDK_VERSION,INTERNAL:{registerComponent:function(t){const o=t.name,a=o.replace("-compat","");if(s._registerComponent(t)&&"PUBLIC"===t.type){const s=(e=i())=>{if("function"!=typeof e[a])throw u.create("invalid-app-argument",{appName:o});return e[a]()};void 0!==t.serviceProps&&Object(r.l)(s,t.serviceProps),n[a]=s,e.prototype[a]=function(...e){return this._getService.bind(this,o).apply(this,t.multipleInstances?e:[])}}return"PUBLIC"===t.type?n[a]:null},removeApp:function(e){delete t[e]},useAsService:function(e,t){if("serverAuth"===t)return null;return t},modularAPIs:s}};function i(e){if(e=e||s._DEFAULT_ENTRY_NAME,!Object(r.h)(t,e))throw u.create("no-app",{appName:e});return t[e]}return n.default=n,Object.defineProperty(n,"apps",{get:function(){return Object.keys(t).map(e=>t[e])}}),i.App=e,n}(a);return t.INTERNAL=Object.assign(Object.assign({},t.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){Object(r.l)(t,e)},createSubscribe:r.j,ErrorFactory:r.b,deepExtend:r.l}),t}(),h=new o.b("@firebase/app-compat");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
if(Object(r.t)()&&void 0!==self.firebase){h.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");const e=self.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&h.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}const d=l;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var f;Object(s.registerVersion)("@firebase/app-compat","0.2.0",f)},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,n){"use strict";var r=n(1);const i=r.a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);const s=Symbol("internals"),o=Symbol("defaults");function a(e){return e&&String(e).trim().toLowerCase()}function c(e){return!1===e||null==e?e:r.a.isArray(e)?e.map(c):String(e)}function u(e,t,n,i){return r.a.isFunction(i)?i.call(this,t,n):r.a.isString(t)?r.a.isString(i)?-1!==t.indexOf(i):r.a.isRegExp(i)?i.test(t):void 0:void 0}function l(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,i=n.length;for(;i-- >0;)if(r=n[i],t===r.toLowerCase())return r;return null}function h(e,t){e&&this.set(e),this[o]=t||null}Object.assign(h.prototype,{set:function(e,t,n){const i=this;function s(e,t,n){const r=a(t);if(!r)throw new Error("header name must be a non-empty string");const s=l(i,r);(!s||!0===n||!1!==i[s]&&!1!==n)&&(i[s||t]=c(e))}return r.a.isPlainObject(e)?r.a.forEach(e,(e,n)=>{s(e,n,t)}):s(t,e,n),this},get:function(e,t){if(!(e=a(e)))return;const n=l(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(r.a.isFunction(t))return t.call(this,e,n);if(r.a.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}},has:function(e,t){if(e=a(e)){const n=l(this,e);return!(!n||t&&!u(0,this[n],n,t))}return!1},delete:function(e,t){const n=this;let i=!1;function s(e){if(e=a(e)){const r=l(n,e);!r||t&&!u(0,n[r],r,t)||(delete n[r],i=!0)}}return r.a.isArray(e)?e.forEach(s):s(e),i},clear:function(){return Object.keys(this).forEach(this.delete.bind(this))},normalize:function(e){const t=this,n={};return r.a.forEach(this,(r,i)=>{const s=l(n,i);if(s)return t[s]=c(r),void delete t[i];const o=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,n)=>t.toUpperCase()+n)}(i):String(i).trim();o!==i&&delete t[i],t[o]=c(r),n[o]=!0}),this},toJSON:function(e){const t=Object.create(null);return r.a.forEach(Object.assign({},this[o]||null,this),(n,i)=>{null!=n&&!1!==n&&(t[i]=e&&r.a.isArray(n)?n.join(", "):n)}),t}}),Object.assign(h,{from:function(e){return r.a.isString(e)?new this((e=>{const t={};let n,r,s;return e&&e.split("\n").forEach((function(e){s=e.indexOf(":"),n=e.substring(0,s).trim().toLowerCase(),r=e.substring(s+1).trim(),!n||t[n]&&i[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)})),t})(e)):e instanceof this?e:new this(e)},accessor:function(e){const t=(this[s]=this[s]={accessors:{}}).accessors,n=this.prototype;function i(e){const i=a(e);t[i]||(!function(e,t){const n=r.a.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(e,n,i){return this[r].call(this,t,e,n,i)},configurable:!0})})}(n,e),t[i]=!0)}return r.a.isArray(e)?e.forEach(i):i(e),this}}),h.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]),r.a.freezeMethods(h.prototype),r.a.freezeMethods(h);t.a=h},function(e,t,n){"use strict";(function(e){var r=n(1),i=n(8),s=n(34);function o(e){return r.a.isPlainObject(e)||r.a.isArray(e)}function a(e){return r.a.endsWith(e,"[]")?e.slice(0,-2):e}function c(e,t,n){return e?e.concat(t).map((function(e,t){return e=a(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}const u=r.a.toFlatObject(r.a,{},null,(function(e){return/^is[A-Z]/.test(e)}));t.a=function(t,n,l){if(!r.a.isObject(t))throw new TypeError("target must be an object");n=n||new(s.a||FormData);const h=(l=r.a.toFlatObject(l,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!r.a.isUndefined(t[e])}))).metaTokens,d=l.visitor||v,f=l.dots,p=l.indexes,m=(l.Blob||"undefined"!=typeof Blob&&Blob)&&((g=n)&&r.a.isFunction(g.append)&&"FormData"===g[Symbol.toStringTag]&&g[Symbol.iterator]);var g;if(!r.a.isFunction(d))throw new TypeError("visitor must be a function");function y(t){if(null===t)return"";if(r.a.isDate(t))return t.toISOString();if(!m&&r.a.isBlob(t))throw new i.a("Blob is not supported. Use a Buffer instead.");return r.a.isArrayBuffer(t)||r.a.isTypedArray(t)?m&&"function"==typeof Blob?new Blob([t]):e.from(t):t}function v(e,t,i){let s=e;if(e&&!i&&"object"==typeof e)if(r.a.endsWith(t,"{}"))t=h?t:t.slice(0,-2),e=JSON.stringify(e);else if(r.a.isArray(e)&&function(e){return r.a.isArray(e)&&!e.some(o)}(e)||r.a.isFileList(e)||r.a.endsWith(t,"[]")&&(s=r.a.toArray(e)))return t=a(t),s.forEach((function(e,i){!r.a.isUndefined(e)&&null!==e&&n.append(!0===p?c([t],i,f):null===p?t:t+"[]",y(e))})),!1;return!!o(e)||(n.append(c(i,t,f),y(e)),!1)}const w=[],b=Object.assign(u,{defaultVisitor:v,convertValue:y,isVisitable:o});if(!r.a.isObject(t))throw new TypeError("data must be an object");return function e(t,i){if(!r.a.isUndefined(t)){if(-1!==w.indexOf(t))throw Error("Circular reference detected in "+i.join("."));w.push(t),r.a.forEach(t,(function(t,s){!0===(!(r.a.isUndefined(t)||null===t)&&d.call(n,t,r.a.isString(s)?s.trim():s,i,b))&&e(t,i?i.concat(s):[s])})),w.pop()}}(t),n}}).call(this,n(44).Buffer)},function(e,t,n){"use strict";var r=n(8);function i(e,t,n){r.a.call(this,null==e?"canceled":e,r.a.ERR_CANCELED,t,n),this.name="CanceledError"}n(1).a.inherits(i,r.a,{__CANCEL__:!0}),t.a=i},function(e,t,n){"use strict";(function(e){var r=n(1),i=n(8),s=n(23),o=n(16),a=n(36),c=n(12),u=n(24),l=n(28);const h={"Content-Type":"application/x-www-form-urlencoded"};const d={transitional:s.a,adapter:function(){let t;return"undefined"!=typeof XMLHttpRequest?t=l.a.getAdapter("xhr"):void 0!==e&&"process"===r.a.kindOf(e)&&(t=l.a.getAdapter("http")),t}(),transformRequest:[function(e,t){const n=t.getContentType()||"",i=n.indexOf("application/json")>-1,s=r.a.isObject(e);s&&r.a.isHTMLForm(e)&&(e=new FormData(e));if(r.a.isFormData(e))return i&&i?JSON.stringify(Object(u.a)(e)):e;if(r.a.isArrayBuffer(e)||r.a.isBuffer(e)||r.a.isStream(e)||r.a.isFile(e)||r.a.isBlob(e))return e;if(r.a.isArrayBufferView(e))return e.buffer;if(r.a.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let c;if(s){if(n.indexOf("application/x-www-form-urlencoded")>-1)return Object(a.a)(e,this.formSerializer).toString();if((c=r.a.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return Object(o.a)(c?{"files[]":e}:e,t&&new t,this.formSerializer)}}return s||i?(t.setContentType("application/json",!1),function(e,t,n){if(r.a.isString(e))try{return(t||JSON.parse)(e),r.a.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||d.transitional,n=t&&t.forcedJSONParsing,s="json"===this.responseType;if(e&&r.a.isString(e)&&(n&&!this.responseType||s)){const n=!(t&&t.silentJSONParsing)&&s;try{return JSON.parse(e)}catch(e){if(n){if("SyntaxError"===e.name)throw i.a.from(e,i.a.ERR_BAD_RESPONSE,this,null,this.response);throw e}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:c.a.classes.FormData,Blob:c.a.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.a.forEach(["delete","get","head"],(function(e){d.headers[e]={}})),r.a.forEach(["post","put","patch"],(function(e){d.headers[e]=r.a.merge(h)})),t.a=d}).call(this,n(27))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";function r(e,t){return function(){return e.apply(t,arguments)}}n.d(t,"a",(function(){return r}))},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(1),i=n(22);function s(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function o(e,t,n){if(!t)return e;const o=n&&n.encode||s,a=n&&n.serialize;let c;if(c=a?a(t,n):r.a.isURLSearchParams(t)?t.toString():new i.a(t,n).toString(o),c){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+c}return e}},function(e,t,n){"use strict";var r=n(16);function i(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function s(e,t){this._pairs=[],e&&Object(r.a)(e,this,t)}const o=s.prototype;o.append=function(e,t){this._pairs.push([e,t])},o.toString=function(e){const t=e?function(t){return e.call(this,t,i)}:i;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")},t.a=s},function(e,t,n){"use strict";t.a={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1}},function(e,t,n){"use strict";var r=n(1);t.a=function(e){function t(e,n,i,s){let o=e[s++];const a=Number.isFinite(+o),c=s>=e.length;if(o=!o&&r.a.isArray(i)?i.length:o,c)return r.a.hasOwnProp(i,o)?i[o]=[i[o],n]:i[o]=n,!a;i[o]&&r.a.isObject(i[o])||(i[o]=[]);return t(e,n,i[o],s)&&r.a.isArray(i[o])&&(i[o]=function(e){const t={},n=Object.keys(e);let r;const i=n.length;let s;for(r=0;r<i;r++)s=n[r],t[s]=e[s];return t}(i[o])),!a}if(r.a.isFormData(e)&&r.a.isFunction(e.entries)){const n={};return r.a.forEachEntry(e,(e,i)=>{t(function(e){return r.a.matchAll(/\w+|\[(\w*)]/g,e).map(e=>"[]"===e[0]?"":e[1]||e[0])}(e),i,n,0)}),n}return null}},function(e,t,n){"use strict";function r(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}n.d(t,"a",(function(){return r}))},function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));let r,i;const s=new WeakMap,o=new WeakMap,a=new WeakMap,c=new WeakMap,u=new WeakMap;let l={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return o.get(e);if("objectStoreNames"===t)return e.objectStoreNames||a.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return f(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function h(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(p(this),t),f(s.get(this))}:function(...t){return f(e.apply(p(this),t))}:function(t,...n){const r=e.call(p(this),t,...n);return a.set(r,t.sort?t.sort():[t]),f(r)}}function d(e){return"function"==typeof e?h(e):(e instanceof IDBTransaction&&function(e){if(o.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});o.set(e,t)}(e),t=e,(r||(r=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,l):e);var t}function f(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(f(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&s.set(t,e)}).catch(()=>{}),u.set(t,e),t}(e);if(c.has(e))return c.get(e);const t=d(e);return t!==e&&(c.set(e,t),u.set(t,e)),t}const p=e=>u.get(e);function m(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(e,t),a=f(o);return r&&o.addEventListener("upgradeneeded",e=>{r(f(o.result),e.oldVersion,e.newVersion,f(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",()=>i())}).catch(()=>{}),a}const g=["get","getKey","getAll","getAllKeys","count"],y=["put","add","delete","clear"],v=new Map;function w(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(v.get(t))return v.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=y.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!g.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,i?"readwrite":"readonly");let o=s.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&s.done]))[0]};return v.set(t,s),s}l=(e=>({...e,get:(t,n,r)=>w(t,n)||e.get(t,n,r),has:(t,n)=>!!w(t,n)||e.has(t,n)}))(l)},function(e,t){var n,r,i=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===s||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:s}catch(e){n=s}try{r="function"==typeof clearTimeout?clearTimeout:o}catch(e){r=o}}();var c,u=[],l=!1,h=-1;function d(){l&&c&&(l=!1,c.length?u=c.concat(u):h=-1,u.length&&f())}function f(){if(!l){var e=a(d);l=!0;for(var t=u.length;t;){for(c=u,u=[];++h<t;)c&&c[h].run();h=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===o||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new p(e,t)),1!==u.length||l||a(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(1),i=n(8);var s=n(12),o=s.a.isStandardBrowserEnv?{write:function(e,t,n,i,s,o){const a=[];a.push(e+"="+encodeURIComponent(t)),r.a.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.a.isString(i)&&a.push("path="+i),r.a.isString(s)&&a.push("domain="+s),!0===o&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},a=n(21),c=n(25),u=s.a.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let n;function i(n){let r=n;return e&&(t.setAttribute("href",r),r=t.href),t.setAttribute("href",r),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return n=i(window.location.href),function(e){const t=r.a.isString(e)?i(e):e;return t.protocol===n.protocol&&t.host===n.host}}():function(){return!0},l=n(23),h=n(17);var d=n(15);var f=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let i,s=0,o=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),u=r[o];i||(i=c),n[s]=a,r[s]=c;let l=o,h=0;for(;l!==s;)h+=n[l++],l%=e;if(s=(s+1)%e,s===o&&(o=(o+1)%e),c-i<t)return;const d=u&&c-u;return d?Math.round(1e3*h/d):void 0}};function p(e,t){let n=0;const r=f(50,250);return i=>{const s=i.loaded,o=i.lengthComputable?i.total:void 0,a=s-n,c=r(a);n=s;const u={loaded:s,total:o,progress:o?s/o:void 0,bytes:a,rate:c||void 0,estimated:c&&o&&s<=o?(o-s)/c:void 0};u[t?"download":"upload"]=!0,e(u)}}function m(e){return new Promise((function(t,n){let f=e.data;const m=d.a.from(e.headers).normalize(),g=e.responseType;let y;function v(){e.cancelToken&&e.cancelToken.unsubscribe(y),e.signal&&e.signal.removeEventListener("abort",y)}r.a.isFormData(f)&&s.a.isStandardBrowserEnv&&m.setContentType(!1);let w=new XMLHttpRequest;if(e.auth){const t=e.auth.username||"",n=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";m.set("Authorization","Basic "+btoa(t+":"+n))}const b=Object(c.a)(e.baseURL,e.url);function I(){if(!w)return;const r=d.a.from("getAllResponseHeaders"in w&&w.getAllResponseHeaders());!function(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new i.a("Request failed with status code "+n.status,[i.a.ERR_BAD_REQUEST,i.a.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}((function(e){t(e),v()}),(function(e){n(e),v()}),{data:g&&"text"!==g&&"json"!==g?w.response:w.responseText,status:w.status,statusText:w.statusText,headers:r,config:e,request:w}),w=null}if(w.open(e.method.toUpperCase(),Object(a.a)(b,e.params,e.paramsSerializer),!0),w.timeout=e.timeout,"onloadend"in w?w.onloadend=I:w.onreadystatechange=function(){w&&4===w.readyState&&(0!==w.status||w.responseURL&&0===w.responseURL.indexOf("file:"))&&setTimeout(I)},w.onabort=function(){w&&(n(new i.a("Request aborted",i.a.ECONNABORTED,e,w)),w=null)},w.onerror=function(){n(new i.a("Network Error",i.a.ERR_NETWORK,e,w)),w=null},w.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const r=e.transitional||l.a;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new i.a(t,r.clarifyTimeoutError?i.a.ETIMEDOUT:i.a.ECONNABORTED,e,w)),w=null},s.a.isStandardBrowserEnv){const t=(e.withCredentials||u(b))&&e.xsrfCookieName&&o.read(e.xsrfCookieName);t&&m.set(e.xsrfHeaderName,t)}void 0===f&&m.setContentType(null),"setRequestHeader"in w&&r.a.forEach(m.toJSON(),(function(e,t){w.setRequestHeader(t,e)})),r.a.isUndefined(e.withCredentials)||(w.withCredentials=!!e.withCredentials),g&&"json"!==g&&(w.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&w.addEventListener("progress",p(e.onDownloadProgress,!0)),"function"==typeof e.onUploadProgress&&w.upload&&w.upload.addEventListener("progress",p(e.onUploadProgress)),(e.cancelToken||e.signal)&&(y=t=>{w&&(n(!t||t.type?new h.a(null,e,w):t),w.abort(),w=null)},e.cancelToken&&e.cancelToken.subscribe(y),e.signal&&(e.signal.aborted?y():e.signal.addEventListener("abort",y)));const _=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(b);_&&-1===s.a.protocols.indexOf(_)?n(new i.a("Unsupported protocol "+_+":",i.a.ERR_BAD_REQUEST,e)):w.send(f||null)}))}const g={http:m,xhr:m};t.a={getAdapter:e=>{if(r.a.isString(e)){const t=g[e];if(!e)throw Error(r.a.hasOwnProp(e)?`Adapter '${e}' is not available in the build`:`Can not resolve adapter '${e}'`);return t}if(!r.a.isFunction(e))throw new TypeError("adapter is not a function");return e},adapters:g}},function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,n){var r=n(31);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,n){var r=n(38),i=n(29),s=n(30),o=n(39);e.exports=function(e){return r(e)||i(e)||s(e)||o()},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,n){var r=n(40),i=n(29),s=n(30),o=n(41);e.exports=function(e){return r(e)||i(e)||s(e)||o()},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,n){"use strict";var r=n(35),i=n.n(r);t.a=i.a},function(e,t){e.exports="object"==typeof self?self.FormData:window.FormData},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(1),i=n(16),s=n(12);function o(e,t){return Object(i.a)(e,new s.a.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,i){return s.a.isNode&&r.a.isBuffer(e)?(this.append(t,e.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)}},t))}},function(e,t,n){e.exports=n(48)},function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,n){var r=n(31);e.exports=function(e){if(Array.isArray(e))return r(e)},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,n){var r=function(e){"use strict";var t=Object.prototype,n=t.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},i=r.iterator||"@@iterator",s=r.asyncIterator||"@@asyncIterator",o=r.toStringTag||"@@toStringTag";function a(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{a({},"")}catch(e){a=function(e,t,n){return e[t]=n}}function c(e,t,n,r){var i=t&&t.prototype instanceof h?t:h,s=Object.create(i.prototype),o=new E(r||[]);return s._invoke=function(e,t,n){var r="suspendedStart";return function(i,s){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===i)throw s;return S()}for(n.method=i,n.arg=s;;){var o=n.delegate;if(o){var a=b(o,n);if(a){if(a===l)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=u(e,t,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===l)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}(e,n,o),s}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var l={};function h(){}function d(){}function f(){}var p={};p[i]=function(){return this};var m=Object.getPrototypeOf,g=m&&m(m(T([])));g&&g!==t&&n.call(g,i)&&(p=g);var y=f.prototype=h.prototype=Object.create(p);function v(e){["next","throw","return"].forEach((function(t){a(e,t,(function(e){return this._invoke(t,e)}))}))}function w(e,t){var r;this._invoke=function(i,s){function o(){return new t((function(r,o){!function r(i,s,o,a){var c=u(e[i],e,s);if("throw"!==c.type){var l=c.arg,h=l.value;return h&&"object"==typeof h&&n.call(h,"__await")?t.resolve(h.__await).then((function(e){r("next",e,o,a)}),(function(e){r("throw",e,o,a)})):t.resolve(h).then((function(e){l.value=e,o(l)}),(function(e){return r("throw",e,o,a)}))}a(c.arg)}(i,s,r,o)}))}return r=r?r.then(o,o):o()}}function b(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,b(e,t),"throw"===t.method))return l;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=u(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,l;var i=r.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,l):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,l)}function I(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function _(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function E(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(I,this),this.reset(!0)}function T(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,s=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return s.next=s}}return{next:S}}function S(){return{value:void 0,done:!0}}return d.prototype=y.constructor=f,f.constructor=d,d.displayName=a(f,o,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===d||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,f):(e.__proto__=f,a(e,o,"GeneratorFunction")),e.prototype=Object.create(y),e},e.awrap=function(e){return{__await:e}},v(w.prototype),w.prototype[s]=function(){return this},e.AsyncIterator=w,e.async=function(t,n,r,i,s){void 0===s&&(s=Promise);var o=new w(c(t,n,r,i),s);return e.isGeneratorFunction(n)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},v(y),a(y,o,"Generator"),y[i]=function(){return this},y.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=T,E.prototype={constructor:E,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return o.type="throw",o.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var i=this.tryEntries.length-1;i>=0;--i){var s=this.tryEntries[i],o=s.completion;if("root"===s.tryLoc)return r("end");if(s.tryLoc<=this.prev){var a=n.call(s,"catchLoc"),c=n.call(s,"finallyLoc");if(a&&c){if(this.prev<s.catchLoc)return r(s.catchLoc,!0);if(this.prev<s.finallyLoc)return r(s.finallyLoc)}else if(a){if(this.prev<s.catchLoc)return r(s.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return r(s.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var s=i;break}}s&&("break"===e||"continue"===e)&&s.tryLoc<=t&&t<=s.finallyLoc&&(s=null);var o=s?s.completion:{};return o.type=e,o.arg=t,s?(this.method="next",this.next=s.finallyLoc,l):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),l},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),_(n),l}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var i=r.arg;_(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:T(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},e}(e.exports);try{regeneratorRuntime=r}catch(e){Function("r","regeneratorRuntime = r")(r)}},function(e,t,n){"use strict";(function(e){var t=n(13),r=n(2),i=n(9),s=n(0);function o(){var e;return(null===(e=null===self||void 0===self?void 0:self.location)||void 0===e?void 0:e.protocol)||null}function a(e=Object(s.s)()){return!("file:"!==o()&&"ionic:"!==o()&&"capacitor:"!==o()||!e.toLowerCase().match(/iphone|ipad|ipod|android/))}function c(e=Object(s.s)()){return Object(s.w)()&&11===(null===document||void 0===document?void 0:document.documentMode)||function(e=Object(s.s)()){return/Edge\/\d+/.test(e)}(e)}function u(){try{const e=self.localStorage,t=r.s();if(e)return e.setItem(t,"1"),e.removeItem(t),!c()||Object(s.x)()}catch(e){return l()&&Object(s.x)()}return!1}function l(){return void 0!==e&&"WorkerGlobalScope"in e&&"importScripts"in e}function h(){return("http:"===o()||"https:"===o()||Object(s.u)()||a())&&!(Object(s.A)()||Object(s.z)())&&u()&&!l()}function d(){return a()&&"undefined"!=typeof document}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const f={LOCAL:"local",NONE:"none",SESSION:"session"},p=r.p;async function m(e){await e._initializationPromise;const t=g(),n=r.w("persistence",e.config.apiKey,e.name);t&&t.setItem(n,e._getPersistence())}function g(){var e;try{return(null===(e="undefined"!=typeof window?window:null)||void 0===e?void 0:e.sessionStorage)||null}catch(e){return null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y=r.p;class v{constructor(){this.browserResolver=r.t(r.A),this.cordovaResolver=r.t(r.F),this.underlyingResolver=null,this._redirectPersistence=r.B,this._completeRedirectFn=r.u,this._overrideRedirectResult=r.v}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,t,n,r){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,t,n,r)}async _openRedirect(e,t,n,r){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,t,n,r)}_isIframeWebStorageSupported(e,t){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,t)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return d()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return y(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await async function(){return!!d()&&new Promise(e=>{const t=setTimeout(()=>{e(!1)},1e3);document.addEventListener("deviceready",()=>{clearTimeout(t),e(!0)})})}();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w(e){return e.unwrap()}function b(e){const{_tokenResponse:t}=e instanceof s.c?e.customData:e;if(!t)return null;if(!(e instanceof s.c)&&"temporaryProof"in t&&"phoneNumber"in t)return r.i.credentialFromResult(e);const n=t.providerId;if(!n||n===r.k.PASSWORD)return null;let i;switch(n){case r.k.GOOGLE:i=r.f;break;case r.k.FACEBOOK:i=r.d;break;case r.k.GITHUB:i=r.e;break;case r.k.TWITTER:i=r.o;break;default:const{oauthIdToken:e,oauthAccessToken:s,oauthTokenSecret:o,pendingToken:a,nonce:c}=t;return s||o||e||a?a?n.startsWith("saml.")?r.m._create(n,a):r.g._fromParams({providerId:n,signInMethod:n,pendingToken:a,idToken:e,accessToken:s}):new r.h(n).credential({idToken:e,accessToken:s,rawNonce:c}):null}return e instanceof s.c?i.credentialFromError(e):i.credentialFromResult(e)}function I(e,t){return t.catch(t=>{throw t instanceof s.c&&function(e,t){var n;const i=null===(n=t.customData)||void 0===n?void 0:n._tokenResponse;if("auth/multi-factor-auth-required"===(null==t?void 0:t.code)){t.resolver=new E(e,r.K(e,t))}else if(i){const e=b(t),n=t;e&&(n.credential=e,n.tenantId=i.tenantId||void 0,n.email=i.email||void 0,n.phoneNumber=i.phoneNumber||void 0)}}(e,t),t}).then(e=>{const t=e.operationType,n=e.user;return{operationType:t,credential:(i=e,b(i)),additionalUserInfo:r.J(e),user:T.getOrCreate(n)};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var i})}async function _(e,t){const n=await t;return{verificationId:n.verificationId,confirm:t=>I(e,n.confirm(t))}}class E{constructor(e,t){this.resolver=t,this.auth=e.wrapped()}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return I(w(this.auth),this.resolver.resolveSignIn(e))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(e){this._delegate=e,this.multiFactor=r.T(e)}static getOrCreate(e){return T.USER_MAP.has(e)||T.USER_MAP.set(e,new T(e)),T.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return I(this.auth,r.P(this._delegate,e))}async linkWithPhoneNumber(e,t){return _(this.auth,r.Q(this._delegate,e,t))}async linkWithPopup(e){return I(this.auth,r.R(this._delegate,e,v))}async linkWithRedirect(e){return await m(r.q(this.auth)),r.S(this._delegate,e,v)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return I(this.auth,r.U(this._delegate,e))}reauthenticateWithPhoneNumber(e,t){return _(this.auth,r.V(this._delegate,e,t))}reauthenticateWithPopup(e){return I(this.auth,r.W(this._delegate,e,v))}async reauthenticateWithRedirect(e){return await m(r.q(this.auth)),r.X(this._delegate,e,v)}sendEmailVerification(e){return r.Y(this._delegate,e)}async unlink(e){return await r.jb(this._delegate,e),this}updateEmail(e){return r.kb(this._delegate,e)}updatePassword(e){return r.lb(this._delegate,e)}updatePhoneNumber(e){return r.mb(this._delegate,e)}updateProfile(e){return r.nb(this._delegate,e)}verifyBeforeUpdateEmail(e,t){return r.ob(this._delegate,e,t)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}T.USER_MAP=new WeakMap;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const S=r.p;class k{constructor(e,t){if(this.app=e,t.isInitialized())return this._delegate=t.getImmediate(),void this.linkUnderlyingAuth();const{apiKey:n}=e.options;S(n,"invalid-api-key",{appName:e.name}),S(n,"invalid-api-key",{appName:e.name});const i="undefined"!=typeof window?v:void 0;this._delegate=t.initialize({options:{persistence:C(n,e.name),popupRedirectResolver:i}}),this._delegate._updateErrorMap(r.H),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?T.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,t){r.E(this._delegate,e,t)}applyActionCode(e){return r.y(this._delegate,e)}checkActionCode(e){return r.C(this._delegate,e)}confirmPasswordReset(e,t){return r.D(this._delegate,e,t)}async createUserWithEmailAndPassword(e,t){return I(this._delegate,r.G(this._delegate,e,t))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return r.I(this._delegate,e)}isSignInWithEmailLink(e){return r.O(this._delegate,e)}async getRedirectResult(){S(h(),this._delegate,"operation-not-supported-in-this-environment");const e=await r.L(this._delegate,v);return e?I(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){r.x(this._delegate,e)}onAuthStateChanged(e,t,n){const{next:r,error:i,complete:s}=A(e,t,n);return this._delegate.onAuthStateChanged(r,i,s)}onIdTokenChanged(e,t,n){const{next:r,error:i,complete:s}=A(e,t,n);return this._delegate.onIdTokenChanged(r,i,s)}sendSignInLinkToEmail(e,t){return r.ab(this._delegate,e,t)}sendPasswordResetEmail(e,t){return r.Z(this._delegate,e,t||void 0)}async setPersistence(e){let t;switch(function(e,t){p(Object.values(f).includes(t),e,"invalid-persistence-type"),Object(s.A)()?p(t!==f.SESSION,e,"unsupported-persistence-type"):Object(s.z)()?p(t===f.NONE,e,"unsupported-persistence-type"):l()?p(t===f.NONE||t===f.LOCAL&&Object(s.x)(),e,"unsupported-persistence-type"):p(t===f.NONE||u(),e,"unsupported-persistence-type")}(this._delegate,e),e){case f.SESSION:t=r.B;break;case f.LOCAL:t=await r.t(r.N)._isAvailable()?r.N:r.z;break;case f.NONE:t=r.M;break;default:return r.r("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(t)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return I(this._delegate,r.bb(this._delegate))}signInWithCredential(e){return I(this._delegate,r.cb(this._delegate,e))}signInWithCustomToken(e){return I(this._delegate,r.db(this._delegate,e))}signInWithEmailAndPassword(e,t){return I(this._delegate,r.eb(this._delegate,e,t))}signInWithEmailLink(e,t){return I(this._delegate,r.fb(this._delegate,e,t))}signInWithPhoneNumber(e,t){return _(this._delegate,r.gb(this._delegate,e,t))}async signInWithPopup(e){return S(h(),this._delegate,"operation-not-supported-in-this-environment"),I(this._delegate,r.hb(this._delegate,e,v))}async signInWithRedirect(e){return S(h(),this._delegate,"operation-not-supported-in-this-environment"),await m(this._delegate),r.ib(this._delegate,e,v)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return r.pb(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}function A(e,t,n){let r=e;"function"!=typeof e&&({next:r,error:t,complete:n}=e);const i=r;return{next:e=>i(e&&T.getOrCreate(e)),error:t,complete:n}}function C(e,t){const n=function(e,t){const n=g();if(!n)return[];const i=r.w("persistence",e,t);switch(n.getItem(i)){case f.NONE:return[r.M];case f.LOCAL:return[r.N,r.B];case f.SESSION:return[r.B];default:return[]}}(e,t);if("undefined"==typeof self||n.includes(r.N)||n.push(r.N),"undefined"!=typeof window)for(const e of[r.z,r.B])n.includes(e)||n.push(e);return n.includes(r.M)||n.push(r.M),n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */k.Persistence=f;class O{constructor(){this.providerId="phone",this._delegate=new r.i(w(t.a.auth()))}static credential(e,t){return r.i.credential(e,t)}verifyPhoneNumber(e,t){return this._delegate.verifyPhoneNumber(e,t)}unwrap(){return this._delegate}}O.PHONE_SIGN_IN_METHOD=r.i.PHONE_SIGN_IN_METHOD,O.PROVIDER_ID=r.i.PROVIDER_ID;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const x=r.p;class N{constructor(e,n,i=t.a.app()){var s;x(null===(s=i.options)||void 0===s?void 0:s.apiKey,"invalid-api-key",{appName:i.name}),this._delegate=new r.l(e,n,i.auth()),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var D;(D=t.a).INTERNAL.registerComponent(new i.a("auth-compat",e=>{const t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("auth");return new k(t,n)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:r.a.EMAIL_SIGNIN,PASSWORD_RESET:r.a.PASSWORD_RESET,RECOVER_EMAIL:r.a.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:r.a.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:r.a.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:r.a.VERIFY_EMAIL}},EmailAuthProvider:r.c,FacebookAuthProvider:r.d,GithubAuthProvider:r.e,GoogleAuthProvider:r.f,OAuthProvider:r.h,SAMLAuthProvider:r.n,PhoneAuthProvider:O,PhoneMultiFactorGenerator:r.j,RecaptchaVerifier:N,TwitterAuthProvider:r.o,Auth:k,AuthCredential:r.b,Error:s.c}).setInstantiationMode("LAZY").setMultipleInstances(!1)),D.registerVersion("@firebase/auth-compat","0.3.0")}).call(this,n(19))},function(e,t,n){"use strict";(function(e){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
var r=n(45),i=n(46),s=n(47);function o(){return c.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function a(e,t){if(o()<t)throw new RangeError("Invalid typed array length");return c.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t)).__proto__=c.prototype:(null===e&&(e=new c(t)),e.length=t),e}function c(e,t,n){if(!(c.TYPED_ARRAY_SUPPORT||this instanceof c))return new c(e,t,n);if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return h(this,e)}return u(this,e,t,n)}function u(e,t,n,r){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?function(e,t,n,r){if(t.byteLength,n<0||t.byteLength<n)throw new RangeError("'offset' is out of bounds");if(t.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");t=void 0===n&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,n):new Uint8Array(t,n,r);c.TYPED_ARRAY_SUPPORT?(e=t).__proto__=c.prototype:e=d(e,t);return e}(e,t,n,r):"string"==typeof t?function(e,t,n){"string"==typeof n&&""!==n||(n="utf8");if(!c.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|p(t,n),i=(e=a(e,r)).write(t,n);i!==r&&(e=e.slice(0,i));return e}(e,t,n):function(e,t){if(c.isBuffer(t)){var n=0|f(t.length);return 0===(e=a(e,n)).length||t.copy(e,0,0,n),e}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||(r=t.length)!=r?a(e,0):d(e,t);if("Buffer"===t.type&&s(t.data))return d(e,t.data)}var r;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function l(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function h(e,t){if(l(t),e=a(e,t<0?0:0|f(t)),!c.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function d(e,t){var n=t.length<0?0:0|f(t.length);e=a(e,n);for(var r=0;r<n;r+=1)e[r]=255&t[r];return e}function f(e){if(e>=o())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o().toString(16)+" bytes");return 0|e}function p(e,t){if(c.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var n=e.length;if(0===n)return 0;for(var r=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return V(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return B(e).length;default:if(r)return V(e).length;t=(""+t).toLowerCase(),r=!0}}function m(e,t,n){var r=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if((n>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return O(this,t,n);case"utf8":case"utf-8":return k(this,t,n);case"ascii":return A(this,t,n);case"latin1":case"binary":return C(this,t,n);case"base64":return S(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return x(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),r=!0}}function g(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function y(e,t,n,r,i){if(0===e.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=i?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(i)return-1;n=e.length-1}else if(n<0){if(!i)return-1;n=0}if("string"==typeof t&&(t=c.from(t,r)),c.isBuffer(t))return 0===t.length?-1:v(e,t,n,r,i);if("number"==typeof t)return t&=255,c.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):v(e,[t],n,r,i);throw new TypeError("val must be string, number or Buffer")}function v(e,t,n,r,i){var s,o=1,a=e.length,c=t.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return-1;o=2,a/=2,c/=2,n/=2}function u(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}if(i){var l=-1;for(s=n;s<a;s++)if(u(e,s)===u(t,-1===l?0:s-l)){if(-1===l&&(l=s),s-l+1===c)return l*o}else-1!==l&&(s-=s-l),l=-1}else for(n+c>a&&(n=a-c),s=n;s>=0;s--){for(var h=!0,d=0;d<c;d++)if(u(e,s+d)!==u(t,d)){h=!1;break}if(h)return s}return-1}function w(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r))>i&&(r=i):r=i;var s=t.length;if(s%2!=0)throw new TypeError("Invalid hex string");r>s/2&&(r=s/2);for(var o=0;o<r;++o){var a=parseInt(t.substr(2*o,2),16);if(isNaN(a))return o;e[n+o]=a}return o}function b(e,t,n,r){return q(V(t,e.length-n),e,n,r)}function I(e,t,n,r){return q(function(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}(t),e,n,r)}function _(e,t,n,r){return I(e,t,n,r)}function E(e,t,n,r){return q(B(t),e,n,r)}function T(e,t,n,r){return q(function(e,t){for(var n,r,i,s=[],o=0;o<e.length&&!((t-=2)<0);++o)n=e.charCodeAt(o),r=n>>8,i=n%256,s.push(i),s.push(r);return s}(t,e.length-n),e,n,r)}function S(e,t,n){return 0===t&&n===e.length?r.fromByteArray(e):r.fromByteArray(e.slice(t,n))}function k(e,t,n){n=Math.min(e.length,n);for(var r=[],i=t;i<n;){var s,o,a,c,u=e[i],l=null,h=u>239?4:u>223?3:u>191?2:1;if(i+h<=n)switch(h){case 1:u<128&&(l=u);break;case 2:128==(192&(s=e[i+1]))&&(c=(31&u)<<6|63&s)>127&&(l=c);break;case 3:s=e[i+1],o=e[i+2],128==(192&s)&&128==(192&o)&&(c=(15&u)<<12|(63&s)<<6|63&o)>2047&&(c<55296||c>57343)&&(l=c);break;case 4:s=e[i+1],o=e[i+2],a=e[i+3],128==(192&s)&&128==(192&o)&&128==(192&a)&&(c=(15&u)<<18|(63&s)<<12|(63&o)<<6|63&a)>65535&&c<1114112&&(l=c)}null===l?(l=65533,h=1):l>65535&&(l-=65536,r.push(l>>>10&1023|55296),l=56320|1023&l),r.push(l),i+=h}return function(e){var t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e);var n="",r=0;for(;r<t;)n+=String.fromCharCode.apply(String,e.slice(r,r+=4096));return n}(r)}t.Buffer=c,t.SlowBuffer=function(e){+e!=e&&(e=0);return c.alloc(+e)},t.INSPECT_MAX_BYTES=50,c.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(e){return!1}}(),t.kMaxLength=o(),c.poolSize=8192,c._augment=function(e){return e.__proto__=c.prototype,e},c.from=function(e,t,n){return u(null,e,t,n)},c.TYPED_ARRAY_SUPPORT&&(c.prototype.__proto__=Uint8Array.prototype,c.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&c[Symbol.species]===c&&Object.defineProperty(c,Symbol.species,{value:null,configurable:!0})),c.alloc=function(e,t,n){return function(e,t,n,r){return l(t),t<=0?a(e,t):void 0!==n?"string"==typeof r?a(e,t).fill(n,r):a(e,t).fill(n):a(e,t)}(null,e,t,n)},c.allocUnsafe=function(e){return h(null,e)},c.allocUnsafeSlow=function(e){return h(null,e)},c.isBuffer=function(e){return!(null==e||!e._isBuffer)},c.compare=function(e,t){if(!c.isBuffer(e)||!c.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,r=t.length,i=0,s=Math.min(n,r);i<s;++i)if(e[i]!==t[i]){n=e[i],r=t[i];break}return n<r?-1:r<n?1:0},c.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},c.concat=function(e,t){if(!s(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return c.alloc(0);var n;if(void 0===t)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var r=c.allocUnsafe(t),i=0;for(n=0;n<e.length;++n){var o=e[n];if(!c.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(r,i),i+=o.length}return r},c.byteLength=p,c.prototype._isBuffer=!0,c.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)g(this,t,t+1);return this},c.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)g(this,t,t+3),g(this,t+1,t+2);return this},c.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)g(this,t,t+7),g(this,t+1,t+6),g(this,t+2,t+5),g(this,t+3,t+4);return this},c.prototype.toString=function(){var e=0|this.length;return 0===e?"":0===arguments.length?k(this,0,e):m.apply(this,arguments)},c.prototype.equals=function(e){if(!c.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===c.compare(this,e)},c.prototype.inspect=function(){var e="",n=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(e+=" ... ")),"<Buffer "+e+">"},c.prototype.compare=function(e,t,n,r,i){if(!c.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===r&&(r=0),void 0===i&&(i=this.length),t<0||n>e.length||r<0||i>this.length)throw new RangeError("out of range index");if(r>=i&&t>=n)return 0;if(r>=i)return-1;if(t>=n)return 1;if(this===e)return 0;for(var s=(i>>>=0)-(r>>>=0),o=(n>>>=0)-(t>>>=0),a=Math.min(s,o),u=this.slice(r,i),l=e.slice(t,n),h=0;h<a;++h)if(u[h]!==l[h]){s=u[h],o=l[h];break}return s<o?-1:o<s?1:0},c.prototype.includes=function(e,t,n){return-1!==this.indexOf(e,t,n)},c.prototype.indexOf=function(e,t,n){return y(this,e,t,n,!0)},c.prototype.lastIndexOf=function(e,t,n){return y(this,e,t,n,!1)},c.prototype.write=function(e,t,n,r){if(void 0===t)r="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)r=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(n)?(n|=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var i=this.length-t;if((void 0===n||n>i)&&(n=i),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var s=!1;;)switch(r){case"hex":return w(this,e,t,n);case"utf8":case"utf-8":return b(this,e,t,n);case"ascii":return I(this,e,t,n);case"latin1":case"binary":return _(this,e,t,n);case"base64":return E(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,e,t,n);default:if(s)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),s=!0}},c.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function A(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;++i)r+=String.fromCharCode(127&e[i]);return r}function C(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;++i)r+=String.fromCharCode(e[i]);return r}function O(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var i="",s=t;s<n;++s)i+=U(e[s]);return i}function x(e,t,n){for(var r=e.slice(t,n),i="",s=0;s<r.length;s+=2)i+=String.fromCharCode(r[s]+256*r[s+1]);return i}function N(e,t,n){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function D(e,t,n,r,i,s){if(!c.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<s)throw new RangeError('"value" argument is out of bounds');if(n+r>e.length)throw new RangeError("Index out of range")}function R(e,t,n,r){t<0&&(t=65535+t+1);for(var i=0,s=Math.min(e.length-n,2);i<s;++i)e[n+i]=(t&255<<8*(r?i:1-i))>>>8*(r?i:1-i)}function P(e,t,n,r){t<0&&(t=4294967295+t+1);for(var i=0,s=Math.min(e.length-n,4);i<s;++i)e[n+i]=t>>>8*(r?i:3-i)&255}function L(e,t,n,r,i,s){if(n+r>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function M(e,t,n,r,s){return s||L(e,0,n,4),i.write(e,t,n,r,23,4),n+4}function F(e,t,n,r,s){return s||L(e,0,n,8),i.write(e,t,n,r,52,8),n+8}c.prototype.slice=function(e,t){var n,r=this.length;if((e=~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),(t=void 0===t?r:~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e),c.TYPED_ARRAY_SUPPORT)(n=this.subarray(e,t)).__proto__=c.prototype;else{var i=t-e;n=new c(i,void 0);for(var s=0;s<i;++s)n[s]=this[s+e]}return n},c.prototype.readUIntLE=function(e,t,n){e|=0,t|=0,n||N(e,t,this.length);for(var r=this[e],i=1,s=0;++s<t&&(i*=256);)r+=this[e+s]*i;return r},c.prototype.readUIntBE=function(e,t,n){e|=0,t|=0,n||N(e,t,this.length);for(var r=this[e+--t],i=1;t>0&&(i*=256);)r+=this[e+--t]*i;return r},c.prototype.readUInt8=function(e,t){return t||N(e,1,this.length),this[e]},c.prototype.readUInt16LE=function(e,t){return t||N(e,2,this.length),this[e]|this[e+1]<<8},c.prototype.readUInt16BE=function(e,t){return t||N(e,2,this.length),this[e]<<8|this[e+1]},c.prototype.readUInt32LE=function(e,t){return t||N(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},c.prototype.readUInt32BE=function(e,t){return t||N(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},c.prototype.readIntLE=function(e,t,n){e|=0,t|=0,n||N(e,t,this.length);for(var r=this[e],i=1,s=0;++s<t&&(i*=256);)r+=this[e+s]*i;return r>=(i*=128)&&(r-=Math.pow(2,8*t)),r},c.prototype.readIntBE=function(e,t,n){e|=0,t|=0,n||N(e,t,this.length);for(var r=t,i=1,s=this[e+--r];r>0&&(i*=256);)s+=this[e+--r]*i;return s>=(i*=128)&&(s-=Math.pow(2,8*t)),s},c.prototype.readInt8=function(e,t){return t||N(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},c.prototype.readInt16LE=function(e,t){t||N(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},c.prototype.readInt16BE=function(e,t){t||N(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},c.prototype.readInt32LE=function(e,t){return t||N(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},c.prototype.readInt32BE=function(e,t){return t||N(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},c.prototype.readFloatLE=function(e,t){return t||N(e,4,this.length),i.read(this,e,!0,23,4)},c.prototype.readFloatBE=function(e,t){return t||N(e,4,this.length),i.read(this,e,!1,23,4)},c.prototype.readDoubleLE=function(e,t){return t||N(e,8,this.length),i.read(this,e,!0,52,8)},c.prototype.readDoubleBE=function(e,t){return t||N(e,8,this.length),i.read(this,e,!1,52,8)},c.prototype.writeUIntLE=function(e,t,n,r){(e=+e,t|=0,n|=0,r)||D(this,e,t,n,Math.pow(2,8*n)-1,0);var i=1,s=0;for(this[t]=255&e;++s<n&&(i*=256);)this[t+s]=e/i&255;return t+n},c.prototype.writeUIntBE=function(e,t,n,r){(e=+e,t|=0,n|=0,r)||D(this,e,t,n,Math.pow(2,8*n)-1,0);var i=n-1,s=1;for(this[t+i]=255&e;--i>=0&&(s*=256);)this[t+i]=e/s&255;return t+n},c.prototype.writeUInt8=function(e,t,n){return e=+e,t|=0,n||D(this,e,t,1,255,0),c.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},c.prototype.writeUInt16LE=function(e,t,n){return e=+e,t|=0,n||D(this,e,t,2,65535,0),c.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):R(this,e,t,!0),t+2},c.prototype.writeUInt16BE=function(e,t,n){return e=+e,t|=0,n||D(this,e,t,2,65535,0),c.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):R(this,e,t,!1),t+2},c.prototype.writeUInt32LE=function(e,t,n){return e=+e,t|=0,n||D(this,e,t,4,4294967295,0),c.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):P(this,e,t,!0),t+4},c.prototype.writeUInt32BE=function(e,t,n){return e=+e,t|=0,n||D(this,e,t,4,4294967295,0),c.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):P(this,e,t,!1),t+4},c.prototype.writeIntLE=function(e,t,n,r){if(e=+e,t|=0,!r){var i=Math.pow(2,8*n-1);D(this,e,t,n,i-1,-i)}var s=0,o=1,a=0;for(this[t]=255&e;++s<n&&(o*=256);)e<0&&0===a&&0!==this[t+s-1]&&(a=1),this[t+s]=(e/o>>0)-a&255;return t+n},c.prototype.writeIntBE=function(e,t,n,r){if(e=+e,t|=0,!r){var i=Math.pow(2,8*n-1);D(this,e,t,n,i-1,-i)}var s=n-1,o=1,a=0;for(this[t+s]=255&e;--s>=0&&(o*=256);)e<0&&0===a&&0!==this[t+s+1]&&(a=1),this[t+s]=(e/o>>0)-a&255;return t+n},c.prototype.writeInt8=function(e,t,n){return e=+e,t|=0,n||D(this,e,t,1,127,-128),c.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},c.prototype.writeInt16LE=function(e,t,n){return e=+e,t|=0,n||D(this,e,t,2,32767,-32768),c.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):R(this,e,t,!0),t+2},c.prototype.writeInt16BE=function(e,t,n){return e=+e,t|=0,n||D(this,e,t,2,32767,-32768),c.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):R(this,e,t,!1),t+2},c.prototype.writeInt32LE=function(e,t,n){return e=+e,t|=0,n||D(this,e,t,4,2147483647,-2147483648),c.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):P(this,e,t,!0),t+4},c.prototype.writeInt32BE=function(e,t,n){return e=+e,t|=0,n||D(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),c.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):P(this,e,t,!1),t+4},c.prototype.writeFloatLE=function(e,t,n){return M(this,e,t,!0,n)},c.prototype.writeFloatBE=function(e,t,n){return M(this,e,t,!1,n)},c.prototype.writeDoubleLE=function(e,t,n){return F(this,e,t,!0,n)},c.prototype.writeDoubleBE=function(e,t,n){return F(this,e,t,!1,n)},c.prototype.copy=function(e,t,n,r){if(n||(n=0),r||0===r||(r=this.length),t>=e.length&&(t=e.length),t||(t=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var i,s=r-n;if(this===e&&n<t&&t<r)for(i=s-1;i>=0;--i)e[i+t]=this[i+n];else if(s<1e3||!c.TYPED_ARRAY_SUPPORT)for(i=0;i<s;++i)e[i+t]=this[i+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+s),t);return s},c.prototype.fill=function(e,t,n,r){if("string"==typeof e){if("string"==typeof t?(r=t,t=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===e.length){var i=e.charCodeAt(0);i<256&&(e=i)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!c.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;var s;if(t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0),"number"==typeof e)for(s=t;s<n;++s)this[s]=e;else{var o=c.isBuffer(e)?e:V(new c(e,r).toString()),a=o.length;for(s=0;s<n-t;++s)this[s+t]=o[s%a]}return this};var j=/[^+\/0-9A-Za-z-_]/g;function U(e){return e<16?"0"+e.toString(16):e.toString(16)}function V(e,t){var n;t=t||1/0;for(var r=e.length,i=null,s=[],o=0;o<r;++o){if((n=e.charCodeAt(o))>55295&&n<57344){if(!i){if(n>56319){(t-=3)>-1&&s.push(239,191,189);continue}if(o+1===r){(t-=3)>-1&&s.push(239,191,189);continue}i=n;continue}if(n<56320){(t-=3)>-1&&s.push(239,191,189),i=n;continue}n=65536+(i-55296<<10|n-56320)}else i&&(t-=3)>-1&&s.push(239,191,189);if(i=null,n<128){if((t-=1)<0)break;s.push(n)}else if(n<2048){if((t-=2)<0)break;s.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;s.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;s.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return s}function B(e){return r.toByteArray(function(e){if((e=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}(e).replace(j,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function q(e,t,n,r){for(var i=0;i<r&&!(i+n>=t.length||i>=e.length);++i)t[i+n]=e[i];return i}}).call(this,n(19))},function(e,t,n){"use strict";t.byteLength=function(e){var t=u(e),n=t[0],r=t[1];return 3*(n+r)/4-r},t.toByteArray=function(e){var t,n,r=u(e),o=r[0],a=r[1],c=new s(function(e,t,n){return 3*(t+n)/4-n}(0,o,a)),l=0,h=a>0?o-4:o;for(n=0;n<h;n+=4)t=i[e.charCodeAt(n)]<<18|i[e.charCodeAt(n+1)]<<12|i[e.charCodeAt(n+2)]<<6|i[e.charCodeAt(n+3)],c[l++]=t>>16&255,c[l++]=t>>8&255,c[l++]=255&t;2===a&&(t=i[e.charCodeAt(n)]<<2|i[e.charCodeAt(n+1)]>>4,c[l++]=255&t);1===a&&(t=i[e.charCodeAt(n)]<<10|i[e.charCodeAt(n+1)]<<4|i[e.charCodeAt(n+2)]>>2,c[l++]=t>>8&255,c[l++]=255&t);return c},t.fromByteArray=function(e){for(var t,n=e.length,i=n%3,s=[],o=0,a=n-i;o<a;o+=16383)s.push(l(e,o,o+16383>a?a:o+16383));1===i?(t=e[n-1],s.push(r[t>>2]+r[t<<4&63]+"==")):2===i&&(t=(e[n-2]<<8)+e[n-1],s.push(r[t>>10]+r[t>>4&63]+r[t<<2&63]+"="));return s.join("")};for(var r=[],i=[],s="undefined"!=typeof Uint8Array?Uint8Array:Array,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,c=o.length;a<c;++a)r[a]=o[a],i[o.charCodeAt(a)]=a;function u(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");return-1===n&&(n=t),[n,n===t?0:4-n%4]}function l(e,t,n){for(var i,s,o=[],a=t;a<n;a+=3)i=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]),o.push(r[(s=i)>>18&63]+r[s>>12&63]+r[s>>6&63]+r[63&s]);return o.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},function(e,t){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
t.read=function(e,t,n,r,i){var s,o,a=8*i-r-1,c=(1<<a)-1,u=c>>1,l=-7,h=n?i-1:0,d=n?-1:1,f=e[t+h];for(h+=d,s=f&(1<<-l)-1,f>>=-l,l+=a;l>0;s=256*s+e[t+h],h+=d,l-=8);for(o=s&(1<<-l)-1,s>>=-l,l+=r;l>0;o=256*o+e[t+h],h+=d,l-=8);if(0===s)s=1-u;else{if(s===c)return o?NaN:1/0*(f?-1:1);o+=Math.pow(2,r),s-=u}return(f?-1:1)*o*Math.pow(2,s-r)},t.write=function(e,t,n,r,i,s){var o,a,c,u=8*s-i-1,l=(1<<u)-1,h=l>>1,d=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,f=r?0:s-1,p=r?1:-1,m=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,o=l):(o=Math.floor(Math.log(t)/Math.LN2),t*(c=Math.pow(2,-o))<1&&(o--,c*=2),(t+=o+h>=1?d/c:d*Math.pow(2,1-h))*c>=2&&(o++,c/=2),o+h>=l?(a=0,o=l):o+h>=1?(a=(t*c-1)*Math.pow(2,i),o+=h):(a=t*Math.pow(2,h-1)*Math.pow(2,i),o=0));i>=8;e[n+f]=255&a,f+=p,a/=256,i-=8);for(o=o<<i|a,u+=i;u>0;e[n+f]=255&o,f+=p,o/=256,u-=8);e[n+f-p]|=128*m}},function(e,t){var n={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==n.call(e)}},function(e,t,n){"use strict";n.r(t);var r=n(32),i=n.n(r),s=n(7),o=n.n(s),a=n(33),c=n.n(a),u=n(14),l=n.n(u),h=n(4),d=n.n(h),f=n(6),p=n.n(f),m=function e(t,n,r){var i=this,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"en";l()(this,e),p()(this,"open",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",i.features.getSpeechRecognition().then((function(e){var t=new e;return t.lang=i.ttsLanguage,t.interimResults=!1,t.maxAlternatives=1,t.onresult=function(e){for(var t=0;t<e.results.length;t++)for(var n=e.results[t],r=n.isFinal,s=0;s<n.length&&s<1;s++){var o=n[s];i.cbx({type:"Transcript",transcript:o.transcript,confidence:o.confidence,isFinal:r})}},t.onerror=function(e){console.log("WebSpeech error: ".concat(e.error)),this.bot.audioInputCallback()},t.onnomatch=function(e){console.log("No match received"),this.bot.audioInputCallback()},t.addEventListener("audioend",(function(){console.log("Audio capturing ended"),i.bot.audioInputCallback()})),i.recognition=t,Promise.resolve()})));case 1:case"end":return e.stop()}}),e)})))),p()(this,"setLanguage",(function(e){i.recognition&&(i.ttsLanguage=e,i.recognition.lang=i.ttsLanguage,console.log("Recognition language changed to ",i.recognition.lang))})),p()(this,"start",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i.recognition.start(),i.cbx({type:"Event",eventType:"InputAudioStreamOpen"}),e.abrupt("return",Promise.resolve());case 3:case"end":return e.stop()}}),e)})))),p()(this,"stop",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i.recognition.stop(),e.abrupt("return",Promise.resolve());case 2:case"end":return e.stop()}}),e)})))),p()(this,"close",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i.recognition=null,e.abrupt("return",Promise.resolve());case 2:case"end":return e.stop()}}),e)})))),this.features=t,this.cbx=n,this.ttsLanguage=s,this.bot=r,console.log("Google STT is being used")},g=function e(t,n,r,i){var s=this;l()(this,e),p()(this,"close",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s.audioContext){e.next=4;break}return e.next=3,s.audioContext.close();case 3:s.audioContext=null;case 4:return e.abrupt("return",Promise.resolve());case 5:case"end":return e.stop()}}),e)})))),p()(this,"streamAudioData",(function(e){var t=e.inputBuffer.getChannelData(0),n=Int16Array.from(t.map((function(e){var t=e<0?32768*e:32767*e;return Math.max(-32768,Math.min(32768,t))})));s.webSocket.send(n)})),p()(this,"event",(function(e){if("InputAudioStreamOpen"===e.type){var t=s.audioContext,n=s.stream;s.scriptProcessor=null;var r=t.createGain();if(null===n)return;var i=t.createMediaStreamSource(n),o=t.createAnalyser();s.scriptProcessor=r.context.createScriptProcessor(2048,2,2),i.connect(r),r.connect(o),r.connect(s.scriptProcessor),s.scriptProcessor.connect(r.context.destination),s.scriptProcessor.addEventListener("audioprocess",s.streamAudioData)}})),p()(this,"start",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s.audioContext){e.next=8;break}if("suspended"!==s.audioContext.state){e.next=5;break}return e.abrupt("return",s.audioContext.resume().then((function(){return s.init()})));case 5:if("running"!==s.audioContext.state){e.next=7;break}return e.abrupt("return",s.init());case 7:return e.abrupt("return",Promise.reject("Unhandled AudioContext state [".concat(s.audioContext.state,"]")));case 8:return e.abrupt("return",s.features.getAudioContext().then((function(e){return s.audioContext=new e,s.sampleRate=s.audioContext.sampleRate,s.init()})));case 9:case"end":return e.stop()}}),e)})))),p()(this,"init",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s.features.getUserMedia().then((function(){return navigator.mediaDevices.getUserMedia({audio:!0})})).then((function(e){return s.stream=e,s.sendAudioOpen(),Promise.resolve()})));case 1:case"end":return e.stop()}}),e)})))),p()(this,"stop",function(){var e=o()(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t&&s.sendAudioClose(),s.scriptProcessor&&(s.scriptProcessor.removeEventListener("audioprocess",s.streamAudioData),s.scriptProcessor=null),s.stream&&(s.stream.getTracks().forEach((function(e){e.stop()})),s.stream=null),e.abrupt("return",s.audioContext.suspend());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),this.webSocket=n,this.features=t,this.sendAudioOpen=r,this.sendAudioClose=i},y=function e(t,n,r,i,s,a){var c=this;l()(this,e),p()(this,"detectEngine",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",c.features.detect("SpeechRecognition").then((function(e){return e?Promise.resolve("web-speech-api"):Promise.resolve("audio-stream-api")})).catch((function(){return Promise.resolve("audio-stream-api")})));case 1:case"end":return e.stop()}}),e)})))),p()(this,"getEngine",(function(){return c.api})),p()(this,"selectEngine",(function(e){c.api===e&&c.stt||("audio-stream-api"===e?(c.api="audio-stream-api",c.stt=new g(c.features,c.webSocket,c.sendAudioOpen,c.sendAudioClose)):"web-speech-api"===e&&(c.api="web-speech-api",c.stt=new m(c.features,c.callback,c.bot)))})),p()(this,"selectLanguage",(function(e){"web-speech-api"===c.api&&c.stt.setLanguage(e)})),p()(this,"open",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.stt.open){e.next=2;break}return e.abrupt("return",c.stt.open());case 2:return e.abrupt("return",Promise.resolve());case 3:case"end":return e.stop()}}),e)})))),p()(this,"start",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.stt.start){e.next=2;break}return e.abrupt("return",c.stt.start());case 2:return e.abrupt("return",Promise.resolve());case 3:case"end":return e.stop()}}),e)})))),p()(this,"stop",function(){var e=o()(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.stt.stop){e.next=2;break}return e.abrupt("return",c.stt.stop(t));case 2:return e.abrupt("return",Promise.resolve());case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),p()(this,"close",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.stt.close){e.next=2;break}return e.abrupt("return",c.stt.close());case 2:return e.abrupt("return",Promise.resolve());case 3:case"end":return e.stop()}}),e)})))),p()(this,"event",function(){var e=o()(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.stt.event){e.next=3;break}return console.log("cross browser stt event",c.stt),e.abrupt("return",c.stt.event(t));case 3:return e.abrupt("return",Promise.resolve());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),this.features=t,this.webSocket=n,this.callback=r,this.sendAudioOpen=i,this.sendAudioClose=s,this.bot=a,this.api=void 0},v=Intl.DateTimeFormat,w=function e(t,n,r,i,s){var a=this,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"cs-CZ",u=arguments.length>6?arguments[6]:void 0,h=arguments.length>7?arguments[7]:void 0,f=arguments.length>8?arguments[8]:void 0,m=arguments.length>9?arguments[9]:void 0;l()(this,e),p()(this,"setLanguage",(function(e){a.stt.selectLanguage(e)})),p()(this,"sendVote",function(){var e=o()(d.a.mark((function e(t,n,r){var i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i={type:"Vote",turnId:t,nodeId:n,vote:r},!a.webSocket){e.next=8;break}if(1!==a.webSocket.readyState){e.next=7;break}return a.webSocket.send(JSON.stringify(i)),e.abrupt("return",Promise.resolve());case 7:return e.abrupt("return",Promise.reject("Incorrect websocket state"));case 8:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()),p()(this,"onSttCallback",(function(e){var t=e.type,n=e.transcript,r=e.isFinal,i=e.eventType;"Transcript"===t?r&&(a.sendText(n),a.callback({type:"Recognized",message:{items:[{text:n}]}})):"Event"===t&&a.callback({type:i})})),p()(this,"open",o()(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.webSocket=new WebSocket(a.wsUrl),a.stt=new y(a.features,a.webSocket,a.onSttCallback,a.sendAudioOpen,a.sendAudioClose,a.bot),t=a.bot.botCallback.getVoice(),n=void 0===t?a.language:a.voices[t],a.stt.detectEngine().then((function(e){return a.stt.selectEngine(e)})).then((function(){a.stt.selectLanguage(n),a.stt.open()})),a.webSocket.onmessage=function(e){if(e.data instanceof ArrayBuffer)a.replay(e.data);else if(e.data instanceof Blob)new Response(e.data).arrayBuffer().then(a.replay);else if("string"==typeof e.data){var t=JSON.parse(e.data);a.stt.event(t),a.callback(t)}},a.webSocket.onerror=function(e){a.errorCallback({type:"Client",message:"Socket error:  ".concat(e)})},a.webSocket.onclose=function(e){console.log("Reason for websocket closing: ",e.reason)},e.abrupt("return",new Promise((function(e){a.webSocket.onopen=function(){a.sendPing(a),a.webSocket.send(JSON.stringify({type:"Init",key:a.key,appKey:a.key,deviceId:a.deviceId,sender:a.deviceId,token:a.token,config:{tts:"RequiredLinks",sttSampleRate:44100,ttsFileType:a.ttsFileType,locale:n,zoneId:v().resolvedOptions().timeZone,voice:t,sendResponseItems:!0,sttInterimResults:!0}})),e()}})));case 9:case"end":return e.stop()}}),e)})))),p()(this,"sendPing",(function(e){window.setTimeout((function(){e.webSocket&&null!==e.sessionId&&(e.webSocket.send(new Int16Array),e.sendPing(e))}),1e4)})),p()(this,"getStt",(function(){return a.stt})),p()(this,"close",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.stt.close();case 2:return a.webSocket&&(a.webSocket.close(),a.webSocket=null),e.abrupt("return",Promise.resolve());case 4:case"end":return e.stop()}}),e)})))),p()(this,"sendText",function(){var e=o()(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n={zoneId:v().resolvedOptions().timeZone,locale:a.language,attributes:a.bot.botCallback.getAttributes(),transcript:{text:t}},!a.webSocket){e.next=8;break}if(1!==a.webSocket.readyState){e.next=7;break}return a.webSocket.send(JSON.stringify({type:"Input",input:n})),e.abrupt("return",Promise.resolve());case 7:return e.abrupt("return",Promise.reject("Incorrect websocket state"));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),p()(this,"sendLogs",(function(e){a.webSocket&&a.webSocket.send(JSON.stringify({type:"Log",entries:e}))})),p()(this,"sendAudioOpen",(function(){a.webSocket&&a.sessionId&&a.webSocket.send(JSON.stringify({type:"InputAudioStreamOpen",message:{appKey:a.key,deviceId:a.deviceId,sender:a.deviceId,token:a.token,sessionId:a.sessionId},appKey:a.key}))})),p()(this,"sendAudioClose",(function(){a.webSocket&&a.webSocket.send(JSON.stringify({type:"InputAudioStreamClose",appKey:a.key}))})),p()(this,"replay",function(){var e=o()(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",a.features.getAudioContext().then((function(e){var n=new e;return n.decodeAudioData(t).then((function(e){var t=n.createBufferSource();t.buffer=e,t.connect(n.destination),t.onended=function(){n.close()},t.start(0)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),p()(this,"setSessionId",(function(e){a.sessionId=e})),this.features=t,this.wsUrl=n,this.key=s,this.callback=r,this.errorCallback=i,this.language=c,this.muted=!1,this.deviceId=u,this.bot=h,this.token=f,this.ttsFileType=m,this.voices={George:"en",Grace:"en",Gordon:"en",Gwyneth:"en",Gabriela:"cs",Anthony:"en",Audrey:"en",Arthur:"en",Amy:"en",Michael:"en",Mary:"en",Milan:"cs",Victor:"en",Victoria:"en"}},b=function e(){var t=this;l()(this,e),p()(this,"getUserMedia",o()(d.a.mark((function e(){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.state.getUserMedia){e.next=2;break}return e.abrupt("return",Promise.resolve(t.state.getUserMedia));case 2:if(void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0!==navigator.mediaDevices.getUserMedia){e.next=8;break}if(n=navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||!1){e.next=7;break}return e.abrupt("return",Promise.reject(new Error("getUserMedia is not implemented in this browser")));case 7:navigator.mediaDevices.getUserMedia=function(e){return new Promise((function(t,r){n.call(navigator,e,t,r)}))};case 8:return t.state.getUserMedia=navigator.mediaDevices.getUserMedia,e.abrupt("return",Promise.resolve(t.state.getUserMedia));case 10:case"end":return e.stop()}}),e)})))),p()(this,"getAudioContext",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.state.AudioContext){e.next=2;break}return e.abrupt("return",Promise.resolve(t.state.AudioContext));case 2:if(t.state.AudioContext=window.AudioContext||window.webkitAudioContext||!1,!t.state.AudioContext){e.next=5;break}return e.abrupt("return",Promise.resolve(t.state.AudioContext));case 5:return e.abrupt("return",Promise.reject("AudioContext is not implemented in this browser"));case 6:case"end":return e.stop()}}),e)})))),p()(this,"getSpeechRecognitionOld",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Promise.resolve(!1);case 1:case"end":return e.stop()}}),e)})))),p()(this,"getSpeechRecognition",o()(d.a.mark((function e(){var n,r,i,s,o,a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=!!document.documentMode,r=!n&&!!window.StyleMedia,i=!(!window.chrome||!window.chrome.webstore&&!window.chrome.runtime),!(i&&-1!==navigator.userAgent.indexOf("Edg"))&&!r){e.next=6;break}return e.abrupt("return",Promise.reject("Web Speech API.SpeechRecognition does not work in Edge"));case 6:if(!navigator.userAgent.includes("Edg")&&!navigator.userAgent.includes("Edge")){e.next=8;break}return e.abrupt("return",Promise.reject("Web Speech API.SpeechRecognition does not work in Edge"));case 8:if(s=navigator.userAgent,o=/IEMobile|Windows Phone|Lumia/i.test(s)?"w":/iPhone|iP[oa]d/.test(s)?"i":/Android/.test(s)?"a":/BlackBerry|PlayBook|BB10/.test(s)?"b":/Mobile Safari/.test(s)?"s":/webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(s)?1:0,a=/Android/.test(s)?1:0,t.state.isAndroid=a,t.state.SpeechRecognition=window.SpeechRecognition||window.speechRecognition||window.webkitSpeechRecognition||!1,c=!1,(/android/i.test(navigator.userAgent)||/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream)&&(c=!0),!t.state.SpeechRecognition){e.next=17;break}return e.abrupt("return",o&&!c?Promise.resolve(!1):Promise.resolve(t.state.SpeechRecognition));case 17:return e.abrupt("return",Promise.reject("Web Speech API.SpeechRecognition is not implemented in this browser"));case 18:case"end":return e.stop()}}),e)})))),p()(this,"getSpeechSynthesis",o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.state.SpeechSynthesis){e.next=2;break}return e.abrupt("return",Promise.resolve(t.state.SpeechSynthesis));case 2:if(t.state.SpeechSynthesis=window.speechSynthesis||window.webkitSpeechSynthesis||!1,!t.state.SpeechSynthesis){e.next=5;break}return e.abrupt("return",Promise.resolve(t.state.SpeechSynthesis));case 5:return e.abrupt("return",Promise.reject("Web Speech API.SpeechSynthesis is not implemented in this browser"));case 6:case"end":return e.stop()}}),e)})))),p()(this,"detect",function(){var e=o()(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=n,e.next="getUserMedia"===e.t0?3:"AudioContext"===e.t0?4:"SpeechRecognition"===e.t0?5:"SpeechSynthesis"===e.t0?6:7;break;case 3:return e.abrupt("return",Promise.resolve(t.getUserMedia()));case 4:return e.abrupt("return",Promise.resolve(t.getAudioContext()));case 5:return e.abrupt("return",Promise.resolve(t.getSpeechRecognition()));case 6:return e.abrupt("return",Promise.resolve(t.getSpeechSynthesis()));case 7:return e.abrupt("return",Promise.resolve(!1));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),this.state={getUserMedia:void 0,AudioContext:void 0,SpeechRecognition:void 0,SpeechSynthesis:void 0}},I=n(13);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
I.a.registerVersion("firebase","9.15.0","app-compat");var _=n(5),E=n(10),T=n(0),S=n(9),k=n(26);const A={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},C=new T.b("installations","Installations",A);function O(e){return e instanceof T.c&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function N(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function D(e,t){const n=(await t.json()).error;return C.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function R({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function P(e,{refreshToken:t}){const n=R(e);return n.append("Authorization",function(e){return"FIS_v2 "+e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)),n}async function L(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function M(e){return new Promise(t=>{setTimeout(t,e)})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const F=/^[cdef][\w-]{21}$/;function j(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){return(t=e,btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return F.test(t)?t:""}catch(e){return""}}function U(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V=new Map;function B(e,t){const n=U(e);q(n,t),function(e,t){const n=K();n&&n.postMessage({key:e,fid:t});z()}(n,t)}function q(e,t){const n=V.get(e);if(n)for(const e of n)e(t)}let G=null;function K(){return!G&&"BroadcastChannel"in self&&(G=new BroadcastChannel("[Firebase] FID Change"),G.onmessage=e=>{q(e.data.key,e.data.fid)}),G}function z(){0===V.size&&G&&(G.close(),G=null)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $="firebase-installations-store";let W=null;function H(){return W||(W=Object(k.a)("firebase-installations-database",1,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore($)}}})),W}async function Q(e,t){const n=U(e),r=(await H()).transaction($,"readwrite"),i=r.objectStore($),s=await i.get(n);return await i.put(t,n),await r.done,s&&s.fid===t.fid||B(e,t.fid),t}async function Y(e){const t=U(e),n=(await H()).transaction($,"readwrite");await n.objectStore($).delete(t),await n.done}async function J(e,t){const n=U(e),r=(await H()).transaction($,"readwrite"),i=r.objectStore($),s=await i.get(n),o=t(s);return void 0===o?await i.delete(n):await i.put(o,n),await r.done,!o||s&&s.fid===o.fid||B(e,o.fid),o}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X(e){let t;const n=await J(e.appConfig,n=>{const r=function(e){return te(e||{fid:j(),registrationStatus:0})}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){const e=Promise.reject(C.create("app-offline"));return{installationEntry:t,registrationPromise:e}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=x(e),i=R(e),s=t.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={fid:n,authVersion:"FIS_v2",appId:e.appId,sdkVersion:"w:0.6.0"},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await L(()=>fetch(r,a));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:N(e.authToken)}}throw await D("Create Installation",c)}(e,t);return Q(e.appConfig,n)}catch(n){throw O(n)&&409===n.customData.serverCode?await Y(e.appConfig):await Q(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Z(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function Z(e){let t=await ee(e.appConfig);for(;1===t.registrationStatus;)await M(100),t=await ee(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await X(e);return n||t}return t}function ee(e){return J(e,e=>{if(!e)throw C.create("installation-not-found");return te(e)})}function te(e){return 1===(t=e).registrationStatus&&t.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}async function ne({appConfig:e,heartbeatServiceProvider:t},n){const r=function(e,{fid:t}){return`${x(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,n),i=P(e,n),s=t.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={installation:{sdkVersion:"w:0.6.0",appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await L(()=>fetch(r,a));if(c.ok){return N(await c.json())}throw await D("Generate Auth Token",c)}async function re(e,t=!1){let n;const r=await J(e.appConfig,r=>{if(!se(r))throw C.create("not-registered");const i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(i))return r;if(1===i.requestStatus)return n=async function(e,t){let n=await ie(e.appConfig);for(;1===n.authToken.requestStatus;)await M(100),n=await ie(e.appConfig);const r=n.authToken;return 0===r.requestStatus?re(e,t):r}(e,t),r;{if(!navigator.onLine)throw C.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=async function(e,t){try{const n=await ne(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await Q(e.appConfig,r),n}catch(n){if(!O(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Q(e.appConfig,n)}else await Y(e.appConfig);throw n}}(e,t),t}});return n?await n:r.authToken}function ie(e){return J(e,e=>{if(!se(e))throw C.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */})}function se(e){return void 0!==e&&2===e.registrationStatus}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function oe(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await X(e);t&&await t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n);return(await re(n,t)).token}function ae(e){return C.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce=e=>{const t=e.getProvider("app").getImmediate();return{app:t,appConfig:
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){if(!e||!e.options)throw ae("App Configuration");if(!e.name)throw ae("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw ae(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),heartbeatServiceProvider:Object(_._getProvider)(t,"heartbeat"),_delete:()=>Promise.resolve()}},ue=e=>{const t=e.getProvider("app").getImmediate(),n=Object(_._getProvider)(t,"installations").getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:r}=await X(t);return r?r.catch(console.error):re(t).catch(console.error),n.fid}(n),getToken:e=>oe(n,e)}};Object(_._registerComponent)(new S.a("installations",ce,"PUBLIC")),Object(_._registerComponent)(new S.a("installations-internal",ue,"PRIVATE")),Object(_.registerVersion)("@firebase/installations","0.6.0"),Object(_.registerVersion)("@firebase/installations","0.6.0","esm2017");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const le="https://www.googletagmanager.com/gtag/js",he=new E.b("@firebase/analytics");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function de(e){return Promise.all(e.map(e=>e.catch(e=>e)))}function fe(e,t,n,r){return async function(i,s,o){try{"event"===i?await async function(e,t,n,r,i){try{let s=[];if(i&&i.send_to){let e=i.send_to;Array.isArray(e)||(e=[e]);const r=await de(n);for(const n of e){const e=r.find(e=>e.measurementId===n),i=e&&t[e.appId];if(!i){s=[];break}s.push(i)}}0===s.length&&(s=Object.values(t)),await Promise.all(s),e("event",r,i||{})}catch(e){he.error(e)}}(e,t,n,s,o):"config"===i?await async function(e,t,n,r,i,s){const o=r[i];try{if(o)await t[o];else{const e=(await de(n)).find(e=>e.measurementId===i);e&&await t[e.appId]}}catch(e){he.error(e)}e("config",i,s)}(e,t,n,r,s,o):"consent"===i?e("consent","update",o):e("set",s)}catch(e){he.error(e)}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pe={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'},me=new T.b("analytics","Analytics",pe);const ge=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};function ye(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function ve(e,t=ge,n){const{appId:r,apiKey:i,measurementId:s}=e.options;if(!r)throw me.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw me.create("no-api-key")}const o=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new we;return setTimeout(async()=>{a.abort()},void 0!==n?n:6e4),async function e(t,{throttleEndTimeMillis:n,backoffCount:r},i,s=ge){var o;const{appId:a,measurementId:c}=t;try{await function(e,t){return new Promise((n,r)=>{const i=Math.max(t-Date.now(),0),s=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(s),r(me.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}(i,n)}catch(e){if(c)return he.warn("Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID "+c+` provided in the "measurementId" field in the local Firebase config. [${null==e?void 0:e.message}]`),{appId:a,measurementId:c};throw e}try{const e=await async function(e){var t;const{appId:n,apiKey:r}=e,i={method:"GET",headers:ye(r)},s="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),o=await fetch(s,i);if(200!==o.status&&304!==o.status){let e="";try{const n=await o.json();(null===(t=n.error)||void 0===t?void 0:t.message)&&(e=n.error.message)}catch(e){}throw me.create("config-fetch-failed",{httpStatus:o.status,responseMessage:e})}return o.json()}(t);return s.deleteThrottleMetadata(a),e}catch(n){const u=n;if(!function(e){if(!(e instanceof T.c&&e.customData))return!1;const t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(u)){if(s.deleteThrottleMetadata(a),c)return he.warn("Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID "+c+` provided in the "measurementId" field in the local Firebase config. [${null==u?void 0:u.message}]`),{appId:a,measurementId:c};throw n}const l=503===Number(null===(o=null==u?void 0:u.customData)||void 0===o?void 0:o.httpStatus)?Object(T.g)(r,s.intervalMillis,30):Object(T.g)(r,s.intervalMillis),h={throttleEndTimeMillis:Date.now()+l,backoffCount:r+1};return s.setThrottleMetadata(a,h),he.debug(`Calling attemptFetch again in ${l} millis`),e(t,h,i,s)}}({appId:r,apiKey:i,measurementId:s},o,a,t)}class we{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let be,Ie;function _e(e){Ie=e}function Ee(e){be=e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Te(e,t,n,r,i,s,o){var a;const c=ve(e);c.then(t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&he.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>he.error(e)),t.push(c);const u=async function(){if(!Object(T.x)())return he.warn(me.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await Object(T.E)()}catch(e){return he.warn(me.create("indexeddb-unavailable",{errorInfo:null==e?void 0:e.toString()}).message),!1}return!0}().then(e=>e?r.getId():void 0),[l,h]=await Promise.all([c,u]);(function(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(le)&&n.src.includes(e))return n;return null})(s)||function(e,t){const n=document.createElement("script");n.src=`${le}?l=${e}&id=${t}`,n.async=!0,document.head.appendChild(n)}(s,l.measurementId),Ie&&(i("consent","default",Ie),_e(void 0)),i("js",new Date);const d=null!==(a=null==o?void 0:o.config)&&void 0!==a?a:{};return d.origin="firebase",d.update=!0,null!=h&&(d.firebase_id=h),i("config",l.measurementId,d),be&&(i("set",be),Ee(void 0)),l.measurementId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.app=e}_delete(){return delete ke[this.app.options.appId],Promise.resolve()}}let ke={},Ae=[];const Ce={};let Oe,xe,Ne="dataLayer",De="gtag",Re=!1;function Pe(e){if(Re)throw me.create("already-initialized");e.dataLayerName&&(Ne=e.dataLayerName),e.gtagName&&(De=e.gtagName)}function Le(e,t,n){!function(){const e=[];if(Object(T.u)()&&e.push("This is a browser extension environment."),Object(T.d)()||e.push("Cookies are not available."),e.length>0){const t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),n=me.create("invalid-analytics-context",{errorInfo:t});he.warn(n.message)}}();const r=e.options.appId;if(!r)throw me.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw me.create("no-api-key");he.warn('The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID '+e.options.measurementId+' provided in the "measurementId" field in the local Firebase config.')}if(null!=ke[r])throw me.create("already-exists",{id:r});if(!Re){!function(e){let t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}(Ne);const{wrappedGtag:e,gtagCore:t}=function(e,t,n,r,i){let s=function(...e){window[r].push(arguments)};return window[i]&&"function"==typeof window[i]&&(s=window[i]),window[i]=fe(s,e,t,n),{gtagCore:s,wrappedGtag:window[i]}}(ke,Ae,Ce,Ne,De);xe=e,Oe=t,Re=!0}ke[r]=Te(e,Ae,Ce,t,Oe,Ne,n);return new Se(e)}async function Me(){if(Object(T.u)())return!1;if(!Object(T.d)())return!1;if(!Object(T.x)())return!1;try{return await Object(T.E)()}catch(e){return!1}}function Fe(e,t,n){e=Object(T.r)(e),async function(e,t,n,r){if(r&&r.global)return e("set",{screen_name:n}),Promise.resolve();e("config",await t,{update:!0,screen_name:n})}(xe,ke[e.app.options.appId],t,n).catch(e=>he.error(e))}function je(e,t,n){e=Object(T.r)(e),async function(e,t,n,r){if(r&&r.global)return e("set",{user_id:n}),Promise.resolve();e("config",await t,{update:!0,user_id:n})}(xe,ke[e.app.options.appId],t,n).catch(e=>he.error(e))}function Ue(e,t,n){e=Object(T.r)(e),async function(e,t,n,r){if(r&&r.global){const t={};for(const e of Object.keys(n))t["user_properties."+e]=n[e];return e("set",t),Promise.resolve()}e("config",await t,{update:!0,user_properties:n})}(xe,ke[e.app.options.appId],t,n).catch(e=>he.error(e))}function Ve(e,t){e=Object(T.r)(e),async function(e,t){const n=await e;window["ga-disable-"+n]=!t}(ke[e.app.options.appId],t).catch(e=>he.error(e))}function Be(e,t,n,r){e=Object(T.r)(e),async function(e,t,n,r,i){if(i&&i.global)e("event",n,r);else{const i=await t;e("event",n,Object.assign(Object.assign({},r),{send_to:i}))}}(xe,ke[e.app.options.appId],t,n,r).catch(e=>he.error(e))}Object(_._registerComponent)(new S.a("analytics",(e,{options:t})=>Le(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t),"PUBLIC")),Object(_._registerComponent)(new S.a("analytics-internal",(function(e){try{const t=e.getProvider("analytics").getImmediate();return{logEvent:(e,n,r)=>Be(t,e,n,r)}}catch(e){throw me.create("interop-component-reg-failed",{reason:e})}}),"PRIVATE")),Object(_.registerVersion)("@firebase/analytics","0.9.0"),Object(_.registerVersion)("@firebase/analytics","0.9.0","esm2017");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qe{constructor(e,t){this.app=e,this._delegate=t}logEvent(e,t,n){Be(this._delegate,e,t,n)}setCurrentScreen(e,t){Fe(this._delegate,e,t)}setUserId(e,t){je(this._delegate,e,t)}setUserProperties(e,t){Ue(this._delegate,e,t)}setAnalyticsCollectionEnabled(e){Ve(this._delegate,e)}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ge;!function(e){e.ADD_SHIPPING_INFO="add_shipping_info",e.ADD_PAYMENT_INFO="add_payment_info",e.ADD_TO_CART="add_to_cart",e.ADD_TO_WISHLIST="add_to_wishlist",e.BEGIN_CHECKOUT="begin_checkout",e.CHECKOUT_PROGRESS="checkout_progress",e.EXCEPTION="exception",e.GENERATE_LEAD="generate_lead",e.LOGIN="login",e.PAGE_VIEW="page_view",e.PURCHASE="purchase",e.REFUND="refund",e.REMOVE_FROM_CART="remove_from_cart",e.SCREEN_VIEW="screen_view",e.SEARCH="search",e.SELECT_CONTENT="select_content",e.SELECT_ITEM="select_item",e.SELECT_PROMOTION="select_promotion",e.SET_CHECKOUT_OPTION="set_checkout_option",e.SHARE="share",e.SIGN_UP="sign_up",e.TIMING_COMPLETE="timing_complete",e.VIEW_CART="view_cart",e.VIEW_ITEM="view_item",e.VIEW_ITEM_LIST="view_item_list",e.VIEW_PROMOTION="view_promotion",e.VIEW_SEARCH_RESULTS="view_search_results"}(Ge||(Ge={}));
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ke=e=>{const t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("analytics").getImmediate();return new qe(t,n)};!function(){const e={Analytics:qe,settings:Pe,isSupported:Me,EventName:Ge};I.a.INTERNAL.registerComponent(new S.a("analytics-compat",Ke,"PUBLIC").setServiceProps(e).setMultipleInstances(!0))}(),I.a.registerVersion("@firebase/analytics-compat","0.2.0");n(43);var ze=n(3);
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function $e(e,t){if(void 0===t)return{merge:!1};if(void 0!==t.mergeFields&&void 0!==t.merge)throw new ze.g("invalid-argument",`Invalid options passed to function ${e}(): You cannot specify both "merge" and "mergeFields".`);return t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(){if("undefined"==typeof Uint8Array)throw new ze.g("unimplemented","Uint8Arrays are not available in this environment.")}function He(){if(!Object(ze.r)())throw new ze.g("unimplemented","Blobs are unavailable in Firestore in this environment.")}class Qe{constructor(e){this._delegate=e}static fromBase64String(e){return He(),new Qe(ze.b.fromBase64String(e))}static fromUint8Array(e){return We(),new Qe(ze.b.fromUint8Array(e))}toBase64(){return He(),this._delegate.toBase64()}toUint8Array(){return We(),this._delegate.toUint8Array()}isEqual(e){return this._delegate.isEqual(e._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const e of t)if(e in n&&"function"==typeof n[e])return!0;return!1}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,["next","error","complete"])}class Je{enableIndexedDbPersistence(e,t){return Object(ze.F)(e._delegate,{forceOwnership:t})}enableMultiTabIndexedDbPersistence(e){return Object(ze.G)(e._delegate)}clearIndexedDbPersistence(e){return Object(ze.x)(e._delegate)}}class Xe{constructor(e,t,n){this._delegate=t,this._persistenceProvider=n,this.INTERNAL={delete:()=>this.terminate()},e instanceof ze.m||(this._appCompat=e)}get _databaseId(){return this._delegate._databaseId}settings(e){const t=this._delegate._getSettings();e.merge||t.host===e.host||Object(ze.s)("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),e.merge&&delete(e=Object.assign(Object.assign({},t),e)).merge,this._delegate._setSettings(e)}useEmulator(e,t,n={}){Object(ze.A)(this._delegate,e,t,n)}enableNetwork(){return Object(ze.H)(this._delegate)}disableNetwork(){return Object(ze.D)(this._delegate)}enablePersistence(e){let t=!1,n=!1;return e&&(t=!!e.synchronizeTabs,n=!!e.experimentalForceOwningTab,Object(ze.t)("synchronizeTabs",t,"experimentalForceOwningTab",n)),t?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,n)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore-compat"),this._appCompat._removeServiceInstance("firestore")),this._delegate._delete()}waitForPendingWrites(){return Object(ze.lb)(this._delegate)}onSnapshotsInSync(e){return Object(ze.Y)(this._delegate,e)}get app(){if(!this._appCompat)throw new ze.g("failed-precondition","Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(e){try{return new dt(this,Object(ze.y)(this._delegate,e))}catch(e){throw it(e,"collection()","Firestore.collection()")}}doc(e){try{return new rt(this,Object(ze.E)(this._delegate,e))}catch(e){throw it(e,"doc()","Firestore.doc()")}}collectionGroup(e){try{return new ut(this,Object(ze.z)(this._delegate,e))}catch(e){throw it(e,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(e){return Object(ze.db)(this._delegate,t=>e(new et(this,t)))}batch(){return Object(ze.K)(this._delegate),new tt(new ze.l(this._delegate,e=>Object(ze.L)(this._delegate,e)))}loadBundle(e){return Object(ze.V)(this._delegate,e)}namedQuery(e){return Object(ze.W)(this._delegate,e).then(e=>e?new ut(this,e):null)}}class Ze extends ze.a{constructor(e){super(),this.firestore=e}convertBytes(e){return new Qe(new ze.b(e))}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return rt.forKey(t,this.firestore,null)}}class et{constructor(e,t){this._firestore=e,this._delegate=t,this._userDataWriter=new Ze(e)}get(e){const t=ft(e);return this._delegate.get(t).then(e=>new at(this._firestore,new ze.e(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,t.converter)))}set(e,t,n){const r=ft(e);return n?($e("Transaction.set",n),this._delegate.set(r,t,n)):this._delegate.set(r,t),this}update(e,t,n,...r){const i=ft(e);return 2===arguments.length?this._delegate.update(i,t):this._delegate.update(i,t,n,...r),this}delete(e){const t=ft(e);return this._delegate.delete(t),this}}class tt{constructor(e){this._delegate=e}set(e,t,n){const r=ft(e);return n?($e("WriteBatch.set",n),this._delegate.set(r,t,n)):this._delegate.set(r,t),this}update(e,t,n,...r){const i=ft(e);return 2===arguments.length?this._delegate.update(i,t):this._delegate.update(i,t,n,...r),this}delete(e){const t=ft(e);return this._delegate.delete(t),this}commit(){return this._delegate.commit()}}class nt{constructor(e,t,n){this._firestore=e,this._userDataWriter=t,this._delegate=n}fromFirestore(e,t){const n=new ze.i(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,null);return this._delegate.fromFirestore(new ct(this._firestore,n),null!=t?t:{})}toFirestore(e,t){return t?this._delegate.toFirestore(e,t):this._delegate.toFirestore(e)}static getInstance(e,t){const n=nt.INSTANCES;let r=n.get(e);r||(r=new WeakMap,n.set(e,r));let i=r.get(t);return i||(i=new nt(e,new Ze(e),t),r.set(t,i)),i}}nt.INSTANCES=new WeakMap;class rt{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new Ze(e)}static forPath(e,t,n){if(e.length%2!=0)throw new ze.g("invalid-argument",`Invalid document reference. Document references must have an even number of segments, but ${e.canonicalString()} has ${e.length}`);return new rt(t,new ze.d(t._delegate,n,new ze.n(e)))}static forKey(e,t,n){return new rt(t,new ze.d(t._delegate,n,e))}get id(){return this._delegate.id}get parent(){return new dt(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(e){try{return new dt(this.firestore,Object(ze.y)(this._delegate,e))}catch(e){throw it(e,"collection()","DocumentReference.collection()")}}isEqual(e){return(e=Object(T.r)(e))instanceof ze.d&&Object(ze.cb)(this._delegate,e)}set(e,t){t=$e("DocumentReference.set",t);try{return t?Object(ze.fb)(this._delegate,e,t):Object(ze.fb)(this._delegate,e)}catch(e){throw it(e,"setDoc()","DocumentReference.set()")}}update(e,t,...n){try{return 1===arguments.length?Object(ze.kb)(this._delegate,e):Object(ze.kb)(this._delegate,e,t,...n)}catch(e){throw it(e,"updateDoc()","DocumentReference.update()")}}delete(){return Object(ze.B)(this._delegate)}onSnapshot(...e){const t=st(e),n=ot(e,e=>new at(this.firestore,new ze.e(this.firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,this._delegate.converter)));return Object(ze.X)(this._delegate,t,n)}get(e){let t;return t="cache"===(null==e?void 0:e.source)?Object(ze.N)(this._delegate):"server"===(null==e?void 0:e.source)?Object(ze.O)(this._delegate):Object(ze.M)(this._delegate),t.then(e=>new at(this.firestore,new ze.e(this.firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,this._delegate.converter)))}withConverter(e){return new rt(this.firestore,e?this._delegate.withConverter(nt.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function it(e,t,n){return e.message=e.message.replace(t,n),e}function st(e){for(const t of e)if("object"==typeof t&&!Ye(t))return t;return{}}function ot(e,t){var n,r;let i;return i=Ye(e[0])?e[0]:Ye(e[1])?e[1]:"function"==typeof e[0]?{next:e[0],error:e[1],complete:e[2]}:{next:e[1],error:e[2],complete:e[3]},{next:e=>{i.next&&i.next(t(e))},error:null===(n=i.error)||void 0===n?void 0:n.bind(i),complete:null===(r=i.complete)||void 0===r?void 0:r.bind(i)}}class at{constructor(e,t){this._firestore=e,this._delegate=t}get ref(){return new rt(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(e){return this._delegate.data(e)}get(e,t){return this._delegate.get(e,t)}isEqual(e){return Object(ze.hb)(this._delegate,e._delegate)}}class ct extends at{data(e){const t=this._delegate.data(e);return Object(ze.q)(void 0!==t,"Document in a QueryDocumentSnapshot should exist"),t}}class ut{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new Ze(e)}where(e,t,n){try{return new ut(this.firestore,Object(ze.ab)(this._delegate,Object(ze.mb)(e,t,n)))}catch(e){throw it(e,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(e,t){try{return new ut(this.firestore,Object(ze.ab)(this._delegate,Object(ze.Z)(e,t)))}catch(e){throw it(e,/(orderBy|where)\(\)/,"Query.$1()")}}limit(e){try{return new ut(this.firestore,Object(ze.ab)(this._delegate,Object(ze.T)(e)))}catch(e){throw it(e,"limit()","Query.limit()")}}limitToLast(e){try{return new ut(this.firestore,Object(ze.ab)(this._delegate,Object(ze.U)(e)))}catch(e){throw it(e,"limitToLast()","Query.limitToLast()")}}startAt(...e){try{return new ut(this.firestore,Object(ze.ab)(this._delegate,Object(ze.jb)(...e)))}catch(e){throw it(e,"startAt()","Query.startAt()")}}startAfter(...e){try{return new ut(this.firestore,Object(ze.ab)(this._delegate,Object(ze.ib)(...e)))}catch(e){throw it(e,"startAfter()","Query.startAfter()")}}endBefore(...e){try{return new ut(this.firestore,Object(ze.ab)(this._delegate,Object(ze.J)(...e)))}catch(e){throw it(e,"endBefore()","Query.endBefore()")}}endAt(...e){try{return new ut(this.firestore,Object(ze.ab)(this._delegate,Object(ze.I)(...e)))}catch(e){throw it(e,"endAt()","Query.endAt()")}}isEqual(e){return Object(ze.bb)(this._delegate,e._delegate)}get(e){let t;return t="cache"===(null==e?void 0:e.source)?Object(ze.Q)(this._delegate):"server"===(null==e?void 0:e.source)?Object(ze.R)(this._delegate):Object(ze.P)(this._delegate),t.then(e=>new ht(this.firestore,new ze.j(this.firestore._delegate,this._userDataWriter,this._delegate,e._snapshot)))}onSnapshot(...e){const t=st(e),n=ot(e,e=>new ht(this.firestore,new ze.j(this.firestore._delegate,this._userDataWriter,this._delegate,e._snapshot)));return Object(ze.X)(this._delegate,t,n)}withConverter(e){return new ut(this.firestore,e?this._delegate.withConverter(nt.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}class lt{constructor(e,t){this._firestore=e,this._delegate=t}get type(){return this._delegate.type}get doc(){return new ct(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class ht{constructor(e,t){this._firestore=e,this._delegate=t}get query(){return new ut(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map(e=>new ct(this._firestore,e))}docChanges(e){return this._delegate.docChanges(e).map(e=>new lt(this._firestore,e))}forEach(e,t){this._delegate.forEach(n=>{e.call(t,new ct(this._firestore,n))})}isEqual(e){return Object(ze.hb)(this._delegate,e._delegate)}}class dt extends ut{constructor(e,t){super(e,t),this.firestore=e,this._delegate=t}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const e=this._delegate.parent;return e?new rt(this.firestore,e):null}doc(e){try{return new rt(this.firestore,void 0===e?Object(ze.E)(this._delegate):Object(ze.E)(this._delegate,e))}catch(e){throw it(e,"doc()","CollectionReference.doc()")}}add(e){return Object(ze.u)(this._delegate,e).then(e=>new rt(this.firestore,e))}isEqual(e){return Object(ze.cb)(this._delegate,e._delegate)}withConverter(e){return new dt(this.firestore,e?this._delegate.withConverter(nt.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function ft(e){return Object(ze.p)(e,ze.d)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(...e){this._delegate=new ze.f(...e)}static documentId(){return new pt(ze.o.keyField().canonicalString())}isEqual(e){return(e=Object(T.r)(e))instanceof ze.f&&this._delegate._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this._delegate=e}static serverTimestamp(){const e=Object(ze.eb)();return e._methodName="FieldValue.serverTimestamp",new mt(e)}static delete(){const e=Object(ze.C)();return e._methodName="FieldValue.delete",new mt(e)}static arrayUnion(...e){const t=Object(ze.w)(...e);return t._methodName="FieldValue.arrayUnion",new mt(t)}static arrayRemove(...e){const t=Object(ze.v)(...e);return t._methodName="FieldValue.arrayRemove",new mt(t)}static increment(e){const t=Object(ze.S)(e);return t._methodName="FieldValue.increment",new mt(t)}isEqual(e){return this._delegate.isEqual(e._delegate)}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt={Firestore:Xe,GeoPoint:ze.h,Timestamp:ze.k,Blob:Qe,Transaction:et,WriteBatch:tt,DocumentReference:rt,DocumentSnapshot:at,Query:ut,QueryDocumentSnapshot:ct,QuerySnapshot:ht,CollectionReference:dt,FieldPath:pt,FieldValue:mt,setLogLevel:function(e){Object(ze.gb)(e)},CACHE_SIZE_UNLIMITED:ze.c};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var yt,vt;yt=I.a,vt=(e,t)=>new Xe(e,t,new Je),yt.INTERNAL.registerComponent(new S.a("firestore-compat",e=>{const t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("firestore").getImmediate();return vt(t,n)},"PUBLIC").setServiceProps(Object.assign({},gt))),yt.registerVersion("@firebase/firestore-compat","0.3.0");var wt={},bt=void 0,It=void 0;wt.initApp=function(){var e=I.a.initializeApp({apiKey:"AIzaSyDoCAwkF2PUX8ZW2eMbbjEeRFSGZAw1i_I",authDomain:"sop-generator.firebaseapp.com",projectId:"sop-generator",storageBucket:"sop-generator.appspot.com",messagingSenderId:"960257251812",appId:"1:960257251812:web:bd9053e7eaea74ad9c0ff1",measurementId:"G-P1HCJ2KTVM"});return bt=I.a.auth(),It=I.a.firestore(),I.a.analytics(),{app:e}},wt.currentUser=function(){return bt.currentUser},wt.update=function(){var e=o()(d.a.mark((function e(t,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=It.collection("Users").doc(t),e.next=3,r.update(n);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),wt.SignIn=o()(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new I.a.auth.GoogleAuthProvider,e.next=3,bt.signInWithPopup(t);case 3:return n=e.sent,console.log(n),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)}))),wt.SignOut=function(){bt.signOut(),sessionStorage.removeItem("flowstorm-bot-user")},wt.checkExistingUser=function(){var e=o()(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.get().catch((function(e){console.log("Error getting document:",e)}));case 2:if(!(n=e.sent).exists){e.next=8;break}return console.log("Document data:",n.data()),e.abrupt("return",!0);case 8:return e.abrupt("return",!1);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),wt.findUser=function(){var e=o()(d.a.mark((function e(t){var n,r,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=It.collection("Users"),r=n.doc(t),e.next=4,r.get();case 4:return i=e.sent,console.log(i),e.abrupt("return",i);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),wt.newUser=o()(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=wt.currentUser(),n=It.collection("Users"),e.next=4,wt.checkExistingUser(n.doc(t._delegate.email));case 4:if(e.sent){e.next=10;break}return wt.SignOut(),e.abrupt("return",!1);case 10:return sessionStorage.setItem("flowstorm-bot-user",wt.currentUser()._delegate.email),e.abrupt("return",!0);case 12:case"end":return e.stop()}}),e)})));var _t=wt,Et=n(1),Tt=n(20),St=n(21);var kt=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){Et.a.forEach(this.handlers,(function(t){null!==t&&e(t)}))}},At=n(18),Ct=n(15);function Ot(e,t){const n=this||At.a,r=t||n,i=Ct.a.from(r.headers);let s=r.data;return Et.a.forEach(e,(function(e){s=e.call(n,s,i.normalize(),t?t.status:void 0)})),i.normalize(),s}function xt(e){return!(!e||!e.__CANCEL__)}var Nt=n(17);function Dt(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Nt.a}function Rt(e){Dt(e),e.headers=Ct.a.from(e.headers),e.data=Ot.call(e,e.transformRequest);return(e.adapter||At.a.adapter)(e).then((function(t){return Dt(e),t.data=Ot.call(e,e.transformResponse,t),t.headers=Ct.a.from(t.headers),t}),(function(t){return xt(t)||(Dt(e),t&&t.response&&(t.response.data=Ot.call(e,e.transformResponse,t.response),t.response.headers=Ct.a.from(t.response.headers))),Promise.reject(t)}))}function Pt(e,t){t=t||{};const n={};function r(e,t){return Et.a.isPlainObject(e)&&Et.a.isPlainObject(t)?Et.a.merge(e,t):Et.a.isPlainObject(t)?Et.a.merge({},t):Et.a.isArray(t)?t.slice():t}function i(n){return Et.a.isUndefined(t[n])?Et.a.isUndefined(e[n])?void 0:r(void 0,e[n]):r(e[n],t[n])}function s(e){if(!Et.a.isUndefined(t[e]))return r(void 0,t[e])}function o(n){return Et.a.isUndefined(t[n])?Et.a.isUndefined(e[n])?void 0:r(void 0,e[n]):r(void 0,t[n])}function a(n){return n in t?r(e[n],t[n]):n in e?r(void 0,e[n]):void 0}const c={url:s,method:s,data:s,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:a};return Et.a.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){const t=c[e]||i,r=t(e);Et.a.isUndefined(r)&&t!==a||(n[e]=r)})),n}var Lt=n(25);var Mt=n(8);const Ft={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Ft[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}});const jt={};Ft.transitional=function(e,t,n){function r(e,t){return"[Axios v1.1.3] Transitional option '"+e+"'"+t+(n?". "+n:"")}return(n,i,s)=>{if(!1===e)throw new Mt.a(r(i," has been removed"+(t?" in "+t:"")),Mt.a.ERR_DEPRECATED);return t&&!jt[i]&&(jt[i]=!0,console.warn(r(i," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,i,s)}};var Ut={assertOptions:function(e,t,n){if("object"!=typeof e)throw new Mt.a("options must be an object",Mt.a.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let i=r.length;for(;i-- >0;){const s=r[i],o=t[s];if(o){const t=e[s],n=void 0===t||o(t,s,e);if(!0!==n)throw new Mt.a("option "+s+" must be "+n,Mt.a.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new Mt.a("Unknown option "+s,Mt.a.ERR_BAD_OPTION)}},validators:Ft};const Vt=Ut.validators;class Bt{constructor(e){this.defaults=e,this.interceptors={request:new kt,response:new kt}}request(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},t=Pt(this.defaults,t);const{transitional:n,paramsSerializer:r}=t;void 0!==n&&Ut.assertOptions(n,{silentJSONParsing:Vt.transitional(Vt.boolean),forcedJSONParsing:Vt.transitional(Vt.boolean),clarifyTimeoutError:Vt.transitional(Vt.boolean)},!1),void 0!==r&&Ut.assertOptions(r,{encode:Vt.function,serialize:Vt.function},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();const i=t.headers&&Et.a.merge(t.headers.common,t.headers[t.method]);i&&Et.a.forEach(["delete","get","head","post","put","patch","common"],(function(e){delete t.headers[e]})),t.headers=new Ct.a(t.headers,i);const s=[];let o=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(o=o&&e.synchronous,s.unshift(e.fulfilled,e.rejected))}));const a=[];let c;this.interceptors.response.forEach((function(e){a.push(e.fulfilled,e.rejected)}));let u,l=0;if(!o){const e=[Rt.bind(this),void 0];for(e.unshift.apply(e,s),e.push.apply(e,a),u=e.length,c=Promise.resolve(t);l<u;)c=c.then(e[l++],e[l++]);return c}u=s.length;let h=t;for(l=0;l<u;){const e=s[l++],t=s[l++];try{h=e(h)}catch(e){t.call(this,e);break}}try{c=Rt.call(this,h)}catch(e){return Promise.reject(e)}for(l=0,u=a.length;l<u;)c=c.then(a[l++],a[l++]);return c}getUri(e){e=Pt(this.defaults,e);const t=Object(Lt.a)(e.baseURL,e.url);return Object(St.a)(t,e.params,e.paramsSerializer)}}Et.a.forEach(["delete","get","head","options"],(function(e){Bt.prototype[e]=function(t,n){return this.request(Pt(n||{},{method:e,url:t,data:(n||{}).data}))}})),Et.a.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,i){return this.request(Pt(i||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Bt.prototype[e]=t(),Bt.prototype[e+"Form"]=t(!0)}));var qt=Bt,Gt=n(24);class Kt{constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const n=this;this.promise.then(e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null}),this.promise.then=e=>{let t;const r=new Promise(e=>{n.subscribe(e),t=e}).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e,r,i){n.reason||(n.reason=new Nt.a(e,r,i),t(n.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}static source(){let e;return{token:new Kt((function(t){e=t})),cancel:e}}}var zt=Kt,$t=n(16);const Wt=function e(t){const n=new qt(t),r=Object(Tt.a)(qt.prototype.request,n);return Et.a.extend(r,qt.prototype,n,{allOwnKeys:!0}),Et.a.extend(r,n,null,{allOwnKeys:!0}),r.create=function(n){return e(Pt(t,n))},r}(At.a);Wt.Axios=qt,Wt.CanceledError=Nt.a,Wt.CancelToken=zt,Wt.isCancel=xt,Wt.VERSION="1.1.3",Wt.toFormData=$t.a,Wt.AxiosError=Mt.a,Wt.Cancel=Wt.CanceledError,Wt.all=function(e){return Promise.all(e)},Wt.spread=function(e){return function(t){return e.apply(null,t)}},Wt.isAxiosError=function(e){return Et.a.isObject(e)&&!0===e.isAxiosError},Wt.formToJSON=e=>Object(Gt.a)(Et.a.isHTMLForm(e)?new FormData(e):e);var Ht=Wt;const{Axios:Qt,AxiosError:Yt,CanceledError:Jt,isCancel:Xt,CancelToken:Zt,VERSION:en,all:tn,Cancel:nn,isAxiosError:rn,spread:sn,toFormData:on}=Ht;var an=Ht;t.default=function(e,t,n,r){var s=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"mp3",u=function e(){l()(this,e)},h=null,f=[],p=void 0,m=!0,g=!0,y=!0,v=!1,I="#intro",_=void 0,E="en",T=["error"],S=void 0,k=s?this:new u;k.botCallback=r,k.sessionEnded=!1;var A=!1,C=0,O=!1,x=!1,N=!1,D=0,R=[],P="",L={listening:new Audio("https://repository.flowstorm.ai/audio/client/listening.mp3"),recognized:new Audio("https://repository.flowstorm.ai/audio/client/recognized.mp3"),waiting:new Audio("https://repository.flowstorm.ai/audio/client/waiting.mp3"),error:new Audio("https://repository.flowstorm.ai/audio/client/error.mp3"),sleep:new Audio("https://repository.flowstorm.ai/audio/client/sleep.mp3")},M=t;function F(){C=0;var t=(p=new Audio("https://repository.flowstorm.ai/audio/client/intro.mp3")).play();_t.initApp(),void 0!==t&&t.then((function(e){T.includes("intro")||(p.pause(),p.currentTime=0),console.log("Audio OK")})).catch((function(e){console.error(e)}));var n=function(e){L[e].volume=0,L[e].play().then((function(t){L[e].pause(),L[e].currentTime=0}))};for(var r in L)n(r);D=Y(),console.log("Bot init"),j("INFO","Bot init");return(h=new w(new b,e.replace("http","ws")+"/socket/",K,V,_,E,M,k,S,a)).open().then((function(){})).catch((function(e){V({type:"Client",message:"Error opening socket:  ".concat(e)})})),this}function j(e,t){var n=new Date,r=(Y()-D)/1e3;R.push({time:n,relativeTime:r,level:e,text:t})}function U(e){j("INFO","Client status changed to "+e),r.setStatus({status:e})}function V(e){Q("error"),j("ERROR",e.message),h.sendLogs(R),R=[],r.onError(e),k.onStopClick(),r.onEnd()}function B(e){return null!==e&&e}function q(){p.removeEventListener("ended",q),k.addRecord()}void 0===t&&void 0!==window.localStorage&&(null===localStorage.getItem("sender")?(M=c()(Array(16)).map((function(){return Math.floor(16*Math.random()).toString(16)})).join(""),localStorage.setItem("sender",M)):M=localStorage.getItem("sender")),k.pause=function(){U("PAUSED"),""!==p.src&&m&&p.pause()},k.resume=function(){U("RESPONDING"),""!==p.src&&m?p.play():m||($(),U("LISTENING"))},k.inAudio=function(e){j("INFO","Input audio "+(g?"on":"off")),"LISTENING"===e&&(g?z(N):k.closeAudioStream("InputAudioEvent",!0))},k.setInAudio=function(e,t){j("INFO","Input audio "+((g=e)?"on":"off")),"LISTENING"===t&&(g?z(!0):k.closeAudioStream("InputAudioEvent",!0)),k.setInCallback()},k.setInCallback=function(){},k.setOutAudio=function(e,t){m!==e?(m?("RESPONDING"===t&&J(),m=!1):m=!0,j("INFO","Output audio "+(m?"on":"off"))):j("INFO","Output audio "+(m?"on":"off"))},k.outAudio=function(e){m?("RESPONDING"===e&&J(),m=!1):m=!0,j("INFO","Output audio "+(m?"on":"off"))},k.getOutAudio=function(){return m},k.click=function(e){switch(j("INFO","Click on state "+e),e){case"RESPONDING":J()}},k.playAudio=function(e){j("INFO","Playing audio file "+e),e&&m&&(p.src=e,p.addEventListener("ended",q),p.play().catch((function(e){V({type:"Client",message:"Audio error in ".concat(p.src,":  ").concat(e)})}))),""!==p.src&&m&&e||k.addRecord()},k.startTyping=function(){N=!0},window.addEventListener("message",(function(e){"BotStopEvent"===e.data&&k.onStopClick()})),k.init=function(e,t,n,r){var i=this,s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"#intro",o=!(arguments.length>5&&void 0!==arguments[5])||arguments[5],a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:["error"],c=arguments.length>7&&void 0!==arguments[7]&&arguments[7],u=arguments.length>8&&void 0!==arguments[8]?arguments[8]:void 0;if(m=r,g=n,_=e,E=t,I=s,y=o,T=a,v=c,S=u,C<Y()||0===C)return F();C=0,h.sendText(I).then((function(e){return D=Y(),X(I),i})).catch((function(e){F()}))},k.getFiles=function(){var e=o()(d.a.mark((function e(t){var n,r,i,s=arguments;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:"https://manual-search-develop.alquist.ai/retrieve",r={query:t},i=null,e.prev=3,e.next=6,an.post(n,r,{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}});case 6:i=e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),i={};case 12:return e.abrupt("return",i);case 13:case"end":return e.stop()}}),e,null,[[3,9]])})));return function(t){return e.apply(this,arguments)}}(),k.getPage=function(){var e=o()(d.a.mark((function e(t,n){var r,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="https://manual-search-develop.alquist.ai/download/".concat(n,"/").concat(t,".pdf"),i={"Content-Type":"application/json","Content-Disposition":"inline"},e.next=4,an.get(r,i);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),k.checkExistingUser=o()(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_t.newUser();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),k.responses=[],k.signIn=o()(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_t.SignIn();case 2:return(t=_t.currentUser())&&sessionStorage.setItem("flowstorm-bot-user",t._delegate.email),e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)}))),k.signOut=function(){_t.signOut()},k.updateUser=function(){var e=o()(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=_t.currentUser()._delegate.email,_t.update(n,t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k.sendVote=function(e,t,n){h.sendVote(e,t,n)},k.getUser=o()(d.a.mark((function e(){var t,n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=_t.currentUser(),n=null,!(n=null===t?sessionStorage.getItem("flowstorm-bot-user"):t._delegate.email)){e.next=12;break}return e.next=6,_t.findUser(n);case 6:if(null!==(r=e.sent)._delegate._document){e.next=11;break}return e.abrupt("return",null);case 11:return e.abrupt("return",r.data());case 12:return e.abrupt("return",null);case 13:case"end":return e.stop()}}),e)}))),k.setClientStatus=function(e){U(e)},k.sttRecognizedCallback=function(){},k.onMessageCallback=function(){},k.addRecord=function(){if(B(f)&&f.length>0){var e=f,t=i()(e),n=t[0],s=t.slice(1),o=n.audio,a=n.image,c=n.text,u=n.background,l=n.video,d=n.code,g=n.nodeId,y=n.dialogueNodeId;r.focusOnNode&&0!==g&&r.focusOnNode(g),l?r.addVideo(l,(function(){f=s,""!==p.src&&m&&o||k.addRecord()})):(f=s,c.startsWith("#")&&c.length>1&&"# "!==c.substring(0,2)?(r.handleCommand(c,d),"#walk"!==c&&k.addRecord()):(r.addMessage("received",c,a,u,g,y),k.playAudio(o)))}else if(O)x=!0;else{if(h.sessionId&&0===C)setTimeout((function(){z(!1)}),A?200:0);else(k.sessionEnded||0!==C)&&(Q("sleep"),r.onEnd()),r.setStatus({isActive:!0,status:"SLEEPING"});f=void 0}};var G=function(t){var n=t.audio,r=t.image,i=t.text,s=t.ssml,o=t.background,a=t.video,c=t.code,u=t.nodeId;return{audio:B(n)?n.startsWith("/")?"".concat(e).concat(n):n:B(s)&&s.includes("<audio")?s.split('"')[1]:null,image:B(r)?r.startsWith("/")?"".concat(e).concat(r):r:null,video:B(a)?a:null,text:B(i)?i:"",background:B(o)?0===o.length?null:o:null,code:B(c)?0===c.length?"{}":c:"{}",nodeId:B(u)?u:0}};function K(e){var t=e.response,i=void 0===t?[]:t.items;switch(j("INFO","Received event "+e.type),e.type){case"ResponseItem":U("RESPONDING"),W();var s=G(e.responseItem);void 0===f&&(f=[]),e.responseItem.ttsConfig&&e.responseItem.ttsConfig.locale&&h.language!==e.responseItem.ttsConfig.locale&&(h.setLanguage(e.responseItem.ttsConfig.locale),h.language=e.responseItem.ttsConfig.locale),f.push(s),O&&!x||(x=!1,O=!0,k.addRecord());break;case"Response":k.responses.push(t),U("RESPONDING"),W(),h.language=t.locale,0===i.length,t.sleepTimeout>0&&(C=Y()+1e3*t.sleepTimeout);var o=i.map(G);f=void 0!==f?f.concat(o):o,r.addLogs(t.logs),t.sessionEnded&&(k.sessionEnded=!0,h.setSessionId(null)),!O||x?(O=!1,x=!1,k.addRecord()):O=!1;break;case"Recognized":var a=(void 0===e.message?[e]:e.message.items)[0];(a.text.length>=P.length||a.isFinal)&&(P=a.text,X(a.text),k.sttRecognizedCallback()),D=Y(),P="",a.isFinal&&(U("PROCESSING"),k.closeAudioStream("recognized",!1));break;case"Ready":h.setSessionId(r.getUUID()),k.sessionEnded=!1,A=!1,n?(X(I),h.sendText(I),D=Y()):r.play("bot_ready");break;case"InputAudioStreamOpen":U("LISTENING");break;case"SessionStarted":var c=e.sessionId;P="",h.setSessionId(c),U("RESPONDING");break;case"Error":if(r.onError({type:"Server:",message:e.text}),Q("error"),null===c)break;case"SessionEnded":h.sendLogs(R),R=[],D=0,k.sessionEnded=!0,k.closeAudioStream("sessionEnd",!1),h.setSessionId(null),m||(r.onEnd(),W(),Q("sleep"),U("SLEEPING"))}k.onMessageCallback(e)}function z(e){h.sendLogs(R),R=[],g&&e&&!A&&C<Y()?(Q("listening"),h.getStt().start().then((function(){A=!0})).catch((function(e){v?U("LISTENING"):V({type:"Client",message:"Speech to text start error: ".concat(e)})}))):U("LISTENING")}function $(){var e=null;return""!==p.src&&(p.pause(),p.src="",B(f)&&f.length>0&&(f.forEach((function(t){B(f)&&f.length>0&&(t.text.startsWith("#")&&t.text.length>1&&"# "!==t.text.substring(0,2)?(e=!0,r.handleCommand(t.text,t.code)):r.addMessage("received",t.text,t.image,t.background,t.nodeId))})),f=void 0)),e}function W(){L.waiting.removeEventListener("ended",H),L.waiting.pause(),L.waiting.currentTime=0}function H(){Q("waiting")}function Q(e){T.includes(e)&&(L[e].volume=1,L[e].currentTime=0,L[e].play())}function Y(){return(new Date).getTime()}function J(){$(),C>0?(r.onEnd(),U("SLEEPING")):k.sessionEnded?(k.onStopClick(),r.onEnd()):(z(!0),U("LISTENING"))}function X(e){var t="#"===e.charAt(0)&&y?null:e,n=e;r.addMessage("sent",t,null,null,n),k.audioInputCallback()}return k.closeAudioStream=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default",t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];"sessionEnd"!==e&&Q("recognized"),A&&h.getStt().stop(t).then((function(){A=!1})).catch((function(){V({type:"Client",message:"Speech to text stop error in ".concat(e)})}))},k.audioInputCallback=function(){},k.handleOnTextInput=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=$();N=!1,C=0,k.audioInputCallback(),r||(n&&X(e),U("PROCESSING"),h.sendText(e),D=Y(),t&&g&&k.closeAudioStream("handleTextInput",!1))},k.skipPlayedMessages=function(){$()},k.onStopClick=function(){k.sessionEnded=!0,W(),p&&$(),h&&(h.setSessionId(null),h.close()),C=0,U("SLEEPING")},k}}])}));