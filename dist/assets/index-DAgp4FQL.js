(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Vn=()=>{};var Et={};/**
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
 */const Yt=function(i){const e=[];let t=0;for(let n=0;n<i.length;n++){let s=i.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<i.length&&(i.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(i.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},jn=function(i){const e=[];let t=0,n=0;for(;t<i.length;){const s=i[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const r=i[t++];e[n++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=i[t++],o=i[t++],c=i[t++],a=((s&7)<<18|(r&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(a>>10)),e[n++]=String.fromCharCode(56320+(a&1023))}else{const r=i[t++],o=i[t++];e[n++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Xt={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<i.length;s+=3){const r=i[s],o=s+1<i.length,c=o?i[s+1]:0,a=s+2<i.length,l=a?i[s+2]:0,d=r>>2,h=(r&3)<<4|c>>4;let u=(c&15)<<2|l>>6,f=l&63;a||(f=64,o||(u=64)),n.push(t[d],t[h],t[u],t[f])}return n.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(Yt(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):jn(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<i.length;){const r=t[i.charAt(s++)],c=s<i.length?t[i.charAt(s)]:0;++s;const l=s<i.length?t[i.charAt(s)]:64;++s;const h=s<i.length?t[i.charAt(s)]:64;if(++s,r==null||c==null||l==null||h==null)throw new zn;const u=r<<2|c>>4;if(n.push(u),l!==64){const f=c<<4&240|l>>2;if(n.push(f),h!==64){const p=l<<6&192|h;n.push(p)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class zn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Gn=function(i){const e=Yt(i);return Xt.encodeByteArray(e,!0)},Kt=function(i){return Gn(i).replace(/\./g,"")},Qt=function(i){try{return Xt.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Wn(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const qn=()=>Wn().__FIREBASE_DEFAULTS__,Jn=()=>{if(typeof process>"u"||typeof Et>"u")return;const i=Et.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},Yn=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&Qt(i[1]);return e&&JSON.parse(e)},at=()=>{try{return Vn()||qn()||Jn()||Yn()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},Xn=i=>{var e,t;return(t=(e=at())==null?void 0:e.emulatorHosts)==null?void 0:t[i]},Zt=()=>{var i;return(i=at())==null?void 0:i.config},en=i=>{var e;return(e=at())==null?void 0:e[`_${i}`]};/**
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
 */class Kn{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
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
 */function M(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Qn(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(M())}function Zn(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function es(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function ts(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ns(){const i=M();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function ss(){try{return typeof indexedDB=="object"}catch{return!1}}function is(){return new Promise((i,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),i(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)==null?void 0:r.message)||"")}}catch(t){e(t)}})}/**
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
 */const rs="FirebaseError";class ee extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=rs,Object.setPrototypeOf(this,ee.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ee.prototype.create)}}class Ee{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?os(r,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new ee(s,c,n)}}function os(i,e){try{let t=0,n="";for(;t<i.length;){const s=i.indexOf("{$",t);if(s===-1){n+=i.substring(t);break}const r=i.indexOf("}",s+2);if(r===-1){n+=i.substring(t);break}const o=i.substring(s+2,r),c=e[o];n+=i.substring(t,s)+(c!=null?String(c):`<${o}?>`),t=r+1}return n}catch{return i}}function as(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function pe(i,e){if(i===e)return!0;const t=Object.keys(i),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const r=i[s],o=e[s];if(St(r)&&St(o)){if(!pe(r,o))return!1}else if(r!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function St(i){return i!==null&&typeof i=="object"}/**
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
 */function Se(i){const e=[];for(const[t,n]of Object.entries(i))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function cs(i,e){const t=new ls(i,e);return t.subscribe.bind(t)}class ls{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");ds(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=We),s.error===void 0&&(s.error=We),s.complete===void 0&&(s.complete=We);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ds(i,e){if(typeof i!="object"||i===null)return!1;for(const t of e)if(t in i&&typeof i[t]=="function")return!0;return!1}function We(){}/**
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
 */function te(i){return i&&i._delegate?i._delegate:i}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(i){try{return(i.startsWith("http://")||i.startsWith("https://")?new URL(i).hostname:i).endsWith(".cloudworkstations.dev")}catch{return!1}}async function hs(i){return(await fetch(i,{credentials:"include"})).ok}class fe{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const se="[DEFAULT]";/**
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
 */class us{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Kn;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ps(e))try{this.getOrInitializeService({instanceIdentifier:se})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});n.resolve(r)}catch{}}}}clearInstance(e=se){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=se){return this.instances.has(e)}getOptions(e=se){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[r,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(r);n===c&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const r=this.instances.get(n);return r&&e(r,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:ms(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=se){return this.component?this.component.multipleInstances?e:se:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ms(i){return i===se?void 0:i}function ps(i){return i.instantiationMode==="EAGER"}/**
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
 */class fs{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new us(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var _;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(_||(_={}));const gs={debug:_.DEBUG,verbose:_.VERBOSE,info:_.INFO,warn:_.WARN,error:_.ERROR,silent:_.SILENT},ys=_.INFO,vs={[_.DEBUG]:"log",[_.VERBOSE]:"log",[_.INFO]:"info",[_.WARN]:"warn",[_.ERROR]:"error"},bs=(i,e,...t)=>{if(e<i.logLevel)return;const n=new Date().toISOString(),s=vs[e];if(s)console[s](`[${n}]  ${i.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class tn{constructor(e){this.name=e,this._logLevel=ys,this._logHandler=bs,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in _))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?gs[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,_.DEBUG,...e),this._logHandler(this,_.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,_.VERBOSE,...e),this._logHandler(this,_.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,_.INFO,...e),this._logHandler(this,_.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,_.WARN,...e),this._logHandler(this,_.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,_.ERROR,...e),this._logHandler(this,_.ERROR,...e)}}const ws=(i,e)=>e.some(t=>i instanceof t);let Tt,kt;function Is(){return Tt||(Tt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Es(){return kt||(kt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const nn=new WeakMap,Ze=new WeakMap,sn=new WeakMap,qe=new WeakMap,lt=new WeakMap;function Ss(i){const e=new Promise((t,n)=>{const s=()=>{i.removeEventListener("success",r),i.removeEventListener("error",o)},r=()=>{t(Z(i.result)),s()},o=()=>{n(i.error),s()};i.addEventListener("success",r),i.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&nn.set(t,i)}).catch(()=>{}),lt.set(e,i),e}function Ts(i){if(Ze.has(i))return;const e=new Promise((t,n)=>{const s=()=>{i.removeEventListener("complete",r),i.removeEventListener("error",o),i.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{n(i.error||new DOMException("AbortError","AbortError")),s()};i.addEventListener("complete",r),i.addEventListener("error",o),i.addEventListener("abort",o)});Ze.set(i,e)}let et={get(i,e,t){if(i instanceof IDBTransaction){if(e==="done")return Ze.get(i);if(e==="objectStoreNames")return i.objectStoreNames||sn.get(i);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Z(i[e])},set(i,e,t){return i[e]=t,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function ks(i){et=i(et)}function _s(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=i.call(Je(this),e,...t);return sn.set(n,e.sort?e.sort():[e]),Z(n)}:Es().includes(i)?function(...e){return i.apply(Je(this),e),Z(nn.get(this))}:function(...e){return Z(i.apply(Je(this),e))}}function As(i){return typeof i=="function"?_s(i):(i instanceof IDBTransaction&&Ts(i),ws(i,Is())?new Proxy(i,et):i)}function Z(i){if(i instanceof IDBRequest)return Ss(i);if(qe.has(i))return qe.get(i);const e=As(i);return e!==i&&(qe.set(i,e),lt.set(e,i)),e}const Je=i=>lt.get(i);function Cs(i,e,{blocked:t,upgrade:n,blocking:s,terminated:r}={}){const o=indexedDB.open(i,e),c=Z(o);return n&&o.addEventListener("upgradeneeded",a=>{n(Z(o.result),a.oldVersion,a.newVersion,Z(o.transaction),a)}),t&&o.addEventListener("blocked",a=>t(a.oldVersion,a.newVersion,a)),c.then(a=>{r&&a.addEventListener("close",()=>r()),s&&a.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const Ls=["get","getKey","getAll","getAllKeys","count"],Ms=["put","add","delete","clear"],Ye=new Map;function _t(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(Ye.get(e))return Ye.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=Ms.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Ls.includes(t)))return;const r=async function(o,...c){const a=this.transaction(o,s?"readwrite":"readonly");let l=a.store;return n&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&a.done]))[0]};return Ye.set(e,r),r}ks(i=>({...i,get:(e,t,n)=>_t(e,t)||i.get(e,t,n),has:(e,t)=>!!_t(e,t)||i.has(e,t)}));/**
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
 */class Ps{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Bs(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Bs(i){const e=i.getComponent();return(e==null?void 0:e.type)==="VERSION"}const tt="@firebase/app",At="0.16.0";/**
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
 */const G=new tn("@firebase/app"),$s="@firebase/app-compat",Ns="@firebase/analytics-compat",xs="@firebase/analytics",Os="@firebase/app-check-compat",Fs="@firebase/app-check",Ds="@firebase/auth",Rs="@firebase/auth-compat",Hs="@firebase/database",Us="@firebase/data-connect",Vs="@firebase/database-compat",js="@firebase/functions",zs="@firebase/functions-compat",Gs="@firebase/installations",Ws="@firebase/installations-compat",qs="@firebase/messaging",Js="@firebase/messaging-compat",Ys="@firebase/performance",Xs="@firebase/performance-compat",Ks="@firebase/remote-config",Qs="@firebase/remote-config-compat",Zs="@firebase/storage",ei="@firebase/storage-compat",ti="@firebase/firestore",ni="@firebase/ai",si="@firebase/firestore-compat",ii="firebase",ri="12.17.0";/**
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
 */const nt="[DEFAULT]",oi={[tt]:"fire-core",[$s]:"fire-core-compat",[xs]:"fire-analytics",[Ns]:"fire-analytics-compat",[Fs]:"fire-app-check",[Os]:"fire-app-check-compat",[Ds]:"fire-auth",[Rs]:"fire-auth-compat",[Hs]:"fire-rtdb",[Us]:"fire-data-connect",[Vs]:"fire-rtdb-compat",[js]:"fire-fn",[zs]:"fire-fn-compat",[Gs]:"fire-iid",[Ws]:"fire-iid-compat",[qs]:"fire-fcm",[Js]:"fire-fcm-compat",[Ys]:"fire-perf",[Xs]:"fire-perf-compat",[Ks]:"fire-rc",[Qs]:"fire-rc-compat",[Zs]:"fire-gcs",[ei]:"fire-gcs-compat",[ti]:"fire-fst",[si]:"fire-fst-compat",[ni]:"fire-vertex","fire-js":"fire-js",[ii]:"fire-js-all"};/**
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
 */const xe=new Map,ai=new Map,st=new Map;function Ct(i,e){try{i.container.addComponent(e)}catch(t){G.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,t)}}function be(i){const e=i.name;if(st.has(e))return G.debug(`There were multiple attempts to register component ${e}.`),!1;st.set(e,i);for(const t of xe.values())Ct(t,i);for(const t of ai.values())Ct(t,i);return!0}function rn(i,e){const t=i.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),i.container.getProvider(e)}function O(i){return i==null?!1:i.settings!==void 0}/**
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
 */const ci={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},V=new Ee("app","Firebase",ci);/**
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
 */class li{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new fe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw V.create("app-deleted",{appName:this._name})}}/**
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
 */const Te=ri;function on(i,e={}){let t=i;typeof e!="object"&&(e={name:e});const n={name:nt,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw V.create("bad-app-name",{appName:String(s)});if(t||(t=Zt()),!t)throw V.create("no-options");const r=xe.get(s);if(r)if(pe(t,r.options)){if(pe(n,r.config))return r;throw V.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(r.config),newValue:JSON.stringify(n)})}else throw V.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(r.options),newValue:JSON.stringify(t)});const o=new fs(s);for(const a of st.values())o.addComponent(a);const c=new li(t,n,o);return xe.set(s,c),c}function di(i=nt){const e=xe.get(i);if(!e&&i===nt&&Zt())return on();if(!e)throw V.create("no-app",{appName:i});return e}function de(i,e,t){let n=oi[i]??i;t&&(n+=`-${t}`);const s=n.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),G.warn(o.join(" "));return}be(new fe(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
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
 */const hi="firebase-heartbeat-database",ui=1,we="firebase-heartbeat-store";let Xe=null;function an(){return Xe||(Xe=Cs(hi,ui,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(we)}catch(t){console.warn(t)}}}}).catch(i=>{throw V.create("idb-open",{originalErrorMessage:i.message})})),Xe}async function mi(i){try{const t=(await an()).transaction(we),n=await t.objectStore(we).get(cn(i));return await t.done,n}catch(e){if(e instanceof ee)G.warn(e.message);else{const t=V.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});G.warn(t.message)}}}async function Lt(i,e){try{const n=(await an()).transaction(we,"readwrite");await n.objectStore(we).put(e,cn(i)),await n.done}catch(t){if(t instanceof ee)G.warn(t.message);else{const n=V.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});G.warn(n.message)}}}function cn(i){return`${i.name}!${i.options.appId}`}/**
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
 */const pi=1024,fi=30;class gi{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new vi(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Mt();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats.length>fi){const o=bi(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){G.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Mt(),{heartbeatsToSend:n,unsentEntries:s}=yi(this._heartbeatsCache.heartbeats),r=Kt(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return G.warn(t),""}}}function Mt(){return new Date().toISOString().substring(0,10)}function yi(i,e=pi){const t=[];let n=i.slice();for(const s of i){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Pt(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Pt(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class vi{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ss()?is().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await mi(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Lt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Lt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function Pt(i){return Kt(JSON.stringify({version:2,heartbeats:i})).length}function bi(i){if(i.length===0)return-1;let e=0,t=i[0].date;for(let n=1;n<i.length;n++)i[n].date<t&&(t=i[n].date,e=n);return e}/**
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
 */function wi(i){be(new fe("platform-logger",e=>new Ps(e),"PRIVATE")),be(new fe("heartbeat",e=>new gi(e),"PRIVATE")),de(tt,At,i),de(tt,At,"esm2020"),de("fire-js","")}/**
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
 */wi("");var Ii="firebase",Ei="12.17.0";/**
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
 */de(Ii,Ei,"app");function ln(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Si=ln,dn=new Ee("auth","Firebase",ln());/**
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
 */const Oe=new tn("@firebase/auth");function hn(i,...e){Oe.logLevel<=_.WARN&&Oe.warn(`Auth (${Te}): ${i}`,...e)}function Me(i,...e){Oe.logLevel<=_.ERROR&&Oe.error(`Auth (${Te}): ${i}`,...e)}/**
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
 */function D(i,...e){throw ht(i,...e)}function x(i,...e){return ht(i,...e)}function dt(i,e,t){const n={...Si(),[e]:t};return new Ee("auth","Firebase",n).create(e,{appName:i.name})}function re(i){return dt(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ti(i,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&D(i,"argument-error"),dt(i,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ht(i,...e){if(typeof i!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=i.name),i._errorFactory.create(t,...n)}return dn.create(i,...e)}function I(i,e,...t){if(!i)throw ht(e,...t)}function j(i){const e="INTERNAL ASSERTION FAILED: "+i;throw Me(e),new Error(e)}function W(i,e){i||j(e)}/**
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
 */function it(){var i;return typeof self<"u"&&((i=self.location)==null?void 0:i.href)||""}function ki(){return Bt()==="http:"||Bt()==="https:"}function Bt(){var i;return typeof self<"u"&&((i=self.location)==null?void 0:i.protocol)||null}/**
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
 */function _i(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ki()||es()||"connection"in navigator)?navigator.onLine:!0}function Ai(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
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
 */class ke{constructor(e,t){this.shortDelay=e,this.longDelay=t,W(t>e,"Short delay should be less than long delay!"),this.isMobile=Qn()||ts()}get(){return _i()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ut(i,e){W(i.emulator,"Emulator should always be set here");const{url:t}=i.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class un{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;j("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;j("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;j("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Ci={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Li=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Mi=new ke(3e4,6e4);function mt(i,e){return i.tenantId&&!e.tenantId?{...e,tenantId:i.tenantId}:e}async function ye(i,e,t,n,s={}){return mn(i,s,async()=>{let r={},o={};n&&(e==="GET"?o=n:r={body:JSON.stringify(n)});const c=Se({...o,key:i.config.apiKey}).slice(1),a=await i._getAdditionalHeaders();a["Content-Type"]="application/json",i.languageCode&&(a["X-Firebase-Locale"]=i.languageCode);const l={method:e,headers:a,...r};return Zn()||(l.referrerPolicy="strict-origin-when-cross-origin"),i.emulatorConfig&&ct(i.emulatorConfig.host)&&(l.credentials="include"),un.fetch()(await pn(i,i.config.apiHost,t,c),l)})}async function mn(i,e,t){i._canInitEmulator=!1;const n={...Ci,...e};try{const s=new Bi(i),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Le(i,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const c=r.ok?o.errorMessage:o.error.message,[a,l]=c.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw Le(i,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw Le(i,"email-already-in-use",o);if(a==="USER_DISABLED")throw Le(i,"user-disabled",o);const d=n[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw dt(i,d,l);D(i,d)}}catch(s){if(s instanceof ee)throw s;D(i,"network-request-failed",{message:String(s)})}}async function Pi(i,e,t,n,s={}){const r=await ye(i,e,t,n,s);return"mfaPendingCredential"in r&&D(i,"multi-factor-auth-required",{_serverResponse:r}),r}async function pn(i,e,t,n){const s=`${e}${t}?${n}`,r=i,o=r.config.emulator?ut(i.config,s):`${i.config.apiScheme}://${s}`;return Li.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class Bi{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(x(this.auth,"network-request-failed")),Mi.get())})}}function Le(i,e,t){const n={appName:i.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=x(i,e,n);return s.customData._tokenResponse=t,s}/**
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
 */async function $i(i,e){return ye(i,"POST","/v1/accounts:delete",e)}async function Fe(i,e){return ye(i,"POST","/v1/accounts:lookup",e)}/**
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
 */function ve(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ni(i,e=!1){const t=te(i),n=await t.getIdToken(e),s=pt(n);I(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:n,authTime:ve(Ke(s.auth_time)),issuedAtTime:ve(Ke(s.iat)),expirationTime:ve(Ke(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Ke(i){return Number(i)*1e3}function pt(i){const[e,t,n]=i.split(".");if(e===void 0||t===void 0||n===void 0)return Me("JWT malformed, contained fewer than 3 sections"),null;try{const s=Qt(t);return s?JSON.parse(s):(Me("Failed to decode base64 JWT payload"),null)}catch(s){return Me("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function $t(i){const e=pt(i);return I(e,"internal-error"),I(typeof e.exp<"u","internal-error"),I(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ie(i,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof ee&&xi(n)&&i.auth.currentUser===i&&await i.auth.signOut(),n}}function xi({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
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
 */class Oi{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class rt{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ve(this.lastLoginAt),this.creationTime=ve(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function De(i){var h;const e=i.auth,t=await i.getIdToken(),n=await Ie(i,Fe(e,{idToken:t}));I(n==null?void 0:n.users.length,e,"internal-error");const s=n.users[0];i._notifyReloadListener(s);const r=(h=s.providerUserInfo)!=null&&h.length?fn(s.providerUserInfo):[],o=Di(i.providerData,r),c=i.isAnonymous,a=!(i.email&&s.passwordHash)&&!(o!=null&&o.length),l=c?a:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new rt(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(i,d)}async function Fi(i){const e=te(i);await De(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Di(i,e){return[...i.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function fn(i){return i.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function Ri(i,e){const t=await mn(i,{},async()=>{const n=Se({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=i.config,o=await pn(i,s,"/v1/token",`key=${r}`),c=await i._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:c,body:n};return i.emulatorConfig&&ct(i.emulatorConfig.host)&&(a.credentials="include"),un.fetch()(o,a)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Hi(i,e){return ye(i,"POST","/v2/accounts:revokeToken",mt(i,e))}/**
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
 */class he{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){I(e.idToken,"internal-error"),I(typeof e.idToken<"u","internal-error"),I(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):$t(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){I(e.length!==0,"internal-error");const t=$t(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(I(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:r}=await Ri(e,t);this.updateTokensAndExpiration(n,s,Number(r))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:r}=t,o=new he;return n&&(I(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(I(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(I(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new he,this.toJSON())}_performRefresh(){return j("not implemented")}}/**
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
 */function J(i,e){I(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class N{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new Oi(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new rt(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Ie(this,this.stsTokenManager.getToken(this.auth,e));return I(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ni(this,e)}reload(){return Fi(this)}_assign(e){this!==e&&(I(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new N({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){I(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await De(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(O(this.auth.app))return Promise.reject(re(this.auth));const e=await this.getIdToken();return await Ie(this,$i(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,a=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:h,emailVerified:u,isAnonymous:f,providerData:p,stsTokenManager:y}=t;I(h&&y,e,"internal-error");const g=he.fromJSON(this.name,y);I(typeof h=="string",e,"internal-error"),J(n,e.name),J(s,e.name),I(typeof u=="boolean",e,"internal-error"),I(typeof f=="boolean",e,"internal-error"),J(r,e.name),J(o,e.name),J(c,e.name),J(a,e.name),J(l,e.name),J(d,e.name);const w=new N({uid:h,auth:e,email:s,emailVerified:u,displayName:n,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:c,stsTokenManager:g,createdAt:l,lastLoginAt:d});return p&&Array.isArray(p)&&(w.providerData=p.map(m=>({...m}))),a&&(w._redirectEventId=a),w}static async _fromIdTokenResponse(e,t,n=!1){const s=new he;s.updateFromServerResponse(t);const r=new N({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await De(r),r}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];I(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?fn(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),c=new he;c.updateFromIdToken(n);const a=new N({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new rt(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(a,l),a}}/**
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
 */const Nt=new Map;function z(i){W(i instanceof Function,"Expected a class definition");let e=Nt.get(i);return e?(W(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,Nt.set(i,e),e)}/**
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
 */class gn{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}gn.type="NONE";const Re=gn;/**
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
 */function Pe(i,e,t){return`firebase:${i}:${e}:${t}`}class ue{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:r}=this.auth;this.fullUserKey=Pe(this.userKey,s.apiKey,r),this.fullPersistenceKey=Pe("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Fe(this.auth,{idToken:e}).catch(()=>{});return t?N._fromGetAccountInfoResponse(this.auth,t,e):null}return N._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new ue(z(Re),e,n);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||z(Re);const o=Pe(n,e.config.apiKey,e.name);let c=null;for(const l of t)try{const d=await l._get(o);if(d){let h;if(typeof d=="string"){const u=await Fe(e,{idToken:d}).catch(()=>{});if(!u)break;h=await N._fromGetAccountInfoResponse(e,u,d)}else h=N._fromJSON(e,d);l!==r&&(c=h),r=l;break}}catch{}const a=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!a.length?new ue(r,e,n):(r=a[0],c&&await r._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new ue(r,e,n))}}/**
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
 */function xt(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(wn(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(yn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(En(e))return"Blackberry";if(Sn(e))return"Webos";if(vn(e))return"Safari";if((e.includes("chrome/")||bn(e))&&!e.includes("edge/"))return"Chrome";if(In(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=i.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function yn(i=M()){return/firefox\//i.test(i)}function vn(i=M()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function bn(i=M()){return/crios\//i.test(i)}function wn(i=M()){return/iemobile/i.test(i)}function In(i=M()){return/android/i.test(i)}function En(i=M()){return/blackberry/i.test(i)}function Sn(i=M()){return/webos/i.test(i)}function ft(i=M()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function Ui(i=M()){var e;return ft(i)&&!!((e=window.navigator)!=null&&e.standalone)}function Vi(){return ns()&&document.documentMode===10}function Tn(i=M()){return ft(i)||In(i)||Sn(i)||En(i)||/windows phone/i.test(i)||wn(i)}/**
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
 */function kn(i,e=[]){let t;switch(i){case"Browser":t=xt(M());break;case"Worker":t=`${xt(M())}-${i}`;break;default:t=i}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Te}/${n}`}/**
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
 */class ji{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=r=>new Promise((o,c)=>{try{const a=e(r);o(a)}catch(a){c(a)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zi(i,e={}){return ye(i,"GET","/v2/passwordPolicy",mt(i,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi=6;class Wi{constructor(e){var n;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Gi,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class qi{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ot(this),this.idTokenSubscription=new Ot(this),this.beforeStateQueue=new ji(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=dn,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=z(t)),this._initializationPromise=this.queue(async()=>{var n,s,r;if(!this._deleted&&(this.persistenceManager=await ue.create(this,e),(n=this._resolvePersistenceManagerAvailable)==null||n.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)==null?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Fe(this,{idToken:e}),n=await N._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var r;if(O(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(r=this.redirectUser)==null?void 0:r._redirectEventId,c=n==null?void 0:n._redirectEventId,a=await this.tryRedirectSignIn(e);(!o||o===c)&&(a!=null&&a.user)&&(n=a.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return I(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await De(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ai()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(O(this.app))return Promise.reject(re(this));const t=e?te(e):null;return t&&I(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&I(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return O(this.app)?Promise.reject(re(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return O(this.app)?Promise.reject(re(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(z(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await zi(this),t=new Wi(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ee("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await Hi(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&z(e)||this._popupRedirectResolver;I(t,this,"argument-error"),this.redirectPersistenceManager=await ue.create(this,[z(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(I(c,this,"internal-error"),c.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const a=e.addObserver(t,n,s);return()=>{o=!0,a()}}else{const a=e.addObserver(t);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return I(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=kn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var t;if(O(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&hn(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function je(i){return te(i)}class Ot{constructor(e){this.auth=e,this.observer=null,this.addObserver=cs(t=>this.observer=t)}get next(){return I(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let gt={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ji(i){gt=i}function Yi(i){return gt.loadJS(i)}function Xi(){return gt.gapiScript}function Ki(i){return`__${i}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Qi(i,e){const t=rn(i,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(pe(r,e??{}))return s;D(s,"already-initialized")}return t.initialize({options:e})}function Zi(i,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(z);e!=null&&e.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function er(i,e,t){const n=je(i);I(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,r=_n(e),{host:o,port:c}=tr(e),a=c===null?"":`:${c}`,l={url:`${r}//${o}${a}/`},d=Object.freeze({host:o,port:c,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){I(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),I(pe(l,n.config.emulator)&&pe(d,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=l,n.emulatorConfig=d,n.settings.appVerificationDisabledForTesting=!0,ct(o)?hs(`${r}//${o}${a}`):nr()}function _n(i){const e=i.indexOf(":");return e<0?"":i.substr(0,e+1)}function tr(i){const e=_n(i),t=/(\/\/)?([^?#/]+)/.exec(i.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const r=s[1];return{host:r,port:Ft(n.substr(r.length+1))}}else{const[r,o]=n.split(":");return{host:r,port:Ft(o)}}}function Ft(i){if(!i)return null;const e=Number(i);return isNaN(e)?null:e}function nr(){function i(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
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
 */class An{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return j("not implemented")}_getIdTokenResponse(e){return j("not implemented")}_linkToIdToken(e,t){return j("not implemented")}_getReauthenticationResolver(e){return j("not implemented")}}/**
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
 */async function me(i,e){return Pi(i,"POST","/v1/accounts:signInWithIdp",mt(i,e))}/**
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
 */const sr="http://localhost";class oe extends An{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new oe(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):D("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...r}=t;if(!n||!s)return null;const o=new oe(n,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return me(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,me(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,me(e,t)}buildRequest(){const e={requestUri:sr,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Se(t)}return e}}/**
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
 */class yt{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class _e extends yt{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class X extends _e{constructor(){super("facebook.com")}static credential(e){return oe._fromParams({providerId:X.PROVIDER_ID,signInMethod:X.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return X.credentialFromTaggedObject(e)}static credentialFromError(e){return X.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return X.credential(e.oauthAccessToken)}catch{return null}}}X.FACEBOOK_SIGN_IN_METHOD="facebook.com";X.PROVIDER_ID="facebook.com";/**
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
 */class U extends _e{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return oe._fromParams({providerId:U.PROVIDER_ID,signInMethod:U.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return U.credentialFromTaggedObject(e)}static credentialFromError(e){return U.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return U.credential(t,n)}catch{return null}}}U.GOOGLE_SIGN_IN_METHOD="google.com";U.PROVIDER_ID="google.com";/**
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
 */class K extends _e{constructor(){super("github.com")}static credential(e){return oe._fromParams({providerId:K.PROVIDER_ID,signInMethod:K.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return K.credentialFromTaggedObject(e)}static credentialFromError(e){return K.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return K.credential(e.oauthAccessToken)}catch{return null}}}K.GITHUB_SIGN_IN_METHOD="github.com";K.PROVIDER_ID="github.com";/**
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
 */class Q extends _e{constructor(){super("twitter.com")}static credential(e,t){return oe._fromParams({providerId:Q.PROVIDER_ID,signInMethod:Q.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Q.credentialFromTaggedObject(e)}static credentialFromError(e){return Q.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Q.credential(t,n)}catch{return null}}}Q.TWITTER_SIGN_IN_METHOD="twitter.com";Q.PROVIDER_ID="twitter.com";/**
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
 */class ge{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const r=await N._fromIdTokenResponse(e,n,s),o=Dt(n);return new ge({user:r,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=Dt(n);return new ge({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function Dt(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
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
 */class He extends ee{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,He.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new He(e,t,n,s)}}function Cn(i,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(i):t._getIdTokenResponse(i)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?He._fromErrorAndOperation(i,r,e,n):r})}async function ir(i,e,t=!1){const n=await Ie(i,e._linkToIdToken(i.auth,await i.getIdToken()),t);return ge._forOperation(i,"link",n)}/**
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
 */async function rr(i,e,t=!1){const{auth:n}=i;if(O(n.app))return Promise.reject(re(n));const s="reauthenticate";try{const r=await Ie(i,Cn(n,s,e,i),t);I(r.idToken,n,"internal-error");const o=pt(r.idToken);I(o,n,"internal-error");const{sub:c}=o;return I(i.uid===c,n,"user-mismatch"),ge._forOperation(i,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&D(n,"user-mismatch"),r}}/**
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
 */async function or(i,e,t=!1){if(O(i.app))return Promise.reject(re(i));const n="signIn",s=await Cn(i,n,e),r=await ge._fromIdTokenResponse(i,n,s);return t||await i._updateCurrentUser(r.user),r}/**
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
 */function ot(i,e){return te(i).setPersistence(e)}function ar(i,e,t,n){return te(i).onIdTokenChanged(e,t,n)}function cr(i,e,t){return te(i).beforeAuthStateChanged(e,t)}function lr(i,e,t,n){return te(i).onAuthStateChanged(e,t,n)}const Ue="__sak";/**
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
 */class Ln{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ue,"1"),this.storage.removeItem(Ue),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const dr=1e3,hr=10;class Mn extends Ln{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Tn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,a)=>{this.notifyListeners(o,a)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},r=this.storage.getItem(n);Vi()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,hr):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},dr)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Mn.type="LOCAL";const Pn=Mn;/**
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
 */class Bn extends Ln{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Bn.type="SESSION";const $n=Bn;/**
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
 */function ur(i){return Promise.all(i.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ze{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new ze(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async l=>l(t.origin,r)),a=await ur(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:a})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ze.receivers=[];/**
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
 */function vt(i="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return i+t}/**
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
 */class mr{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((c,a)=>{const l=vt("",20);s.port1.start();const d=setTimeout(()=>{a(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(h){const u=h;if(u.data.eventId===l)switch(u.data.status){case"ack":clearTimeout(d),r=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),c(u.data.response);break;default:clearTimeout(d),clearTimeout(r),a(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function F(){return window}function pr(i){F().location.href=i}/**
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
 */function Nn(){return typeof F().WorkerGlobalScope<"u"&&typeof F().importScripts=="function"}async function fr(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function gr(){var i;return((i=navigator==null?void 0:navigator.serviceWorker)==null?void 0:i.controller)||null}function yr(){return Nn()?self:null}/**
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
 */const xn="firebaseLocalStorageDb",vr=1,Ve="firebaseLocalStorage",On="fbase_key";class Ae{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ge(i,e){return i.transaction([Ve],e?"readwrite":"readonly").objectStore(Ve)}function br(){const i=indexedDB.deleteDatabase(xn);return new Ae(i).toPromise()}function Fn(){const i=indexedDB.open(xn,vr);return new Promise((e,t)=>{i.addEventListener("error",()=>{t(i.error)}),i.addEventListener("upgradeneeded",()=>{const n=i.result;try{n.createObjectStore(Ve,{keyPath:On})}catch(s){t(s)}}),i.addEventListener("success",async()=>{const n=i.result;n.objectStoreNames.contains(Ve)?e(n):(n.close(),await br(),e(await Fn()))})})}async function Rt(i,e,t){const n=Ge(i,!0).put({[On]:e,value:t});return new Ae(n).toPromise()}async function wr(i,e){const t=Ge(i,!1).get(e),n=await new Ae(t).toPromise();return n===void 0?null:n.value}function Ht(i,e){const t=Ge(i,!0).delete(e);return new Ae(t).toPromise()}const Ir=800,Er=3;class Dn{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow)),typeof document<"u"&&typeof document.addEventListener=="function"&&document.addEventListener("visibilitychange",this.onVisibilityChange)}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow)),typeof document<"u"&&typeof document.removeEventListener=="function"&&document.removeEventListener("visibilitychange",this.onVisibilityChange)}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isHiding=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isHiding=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isHiding&&(this.isHiding=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this.onVisibilityChange=()=>{typeof document<"u"&&(document.visibilityState==="hidden"?this.onPageHide():document.visibilityState==="visible"&&this.onPageShow())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){if(this.isHiding)throw new Error("Database is closing/hidden");return this.dbPromise?this.dbPromise:(this.dbPromise=Fn(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(this.isHiding||t++>Er)throw n;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return Nn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ze._getInstance(yr()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await fr(),!this.activeServiceWorker)return;this.sender=new mr(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(n=e[0])!=null&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||gr()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Rt(e,Ue,"1"),await Ht(e,Ue)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Rt(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>wr(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ht(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isHiding)return[];try{const e=await this._withRetries(s=>{const r=Ge(s,!1).getAll();return new Ae(r).toPromise()});if(this.isHiding)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isHiding||hn(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ir)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}Dn.type="LOCAL";const Sr=Dn;new ke(3e4,6e4);/**
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
 */function Rn(i,e){return e?z(e):(I(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
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
 */class bt extends An{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return me(e,this._buildIdpRequest())}_linkToIdToken(e,t){return me(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return me(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Tr(i){return or(i.auth,new bt(i),i.bypassAuthState)}function kr(i){const{auth:e,user:t}=i;return I(t,e,"internal-error"),rr(t,new bt(i),i.bypassAuthState)}async function _r(i){const{auth:e,user:t}=i;return I(t,e,"internal-error"),ir(t,new bt(i),i.bypassAuthState)}/**
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
 */class Hn{constructor(e,t,n,s,r=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:r,error:o,type:c}=e;if(o){this.reject(o);return}const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(a))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Tr;case"linkViaPopup":case"linkViaRedirect":return _r;case"reauthViaPopup":case"reauthViaRedirect":return kr;default:D(this.auth,"internal-error")}}resolve(e){W(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){W(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Ar=new ke(2e3,1e4);async function Ut(i,e,t){if(O(i.app))return Promise.reject(x(i,"operation-not-supported-in-this-environment"));const n=je(i);Ti(i,e,yt);const s=Rn(n,t);return new ie(n,"signInViaPopup",e,s).executeNotNull()}class ie extends Hn{constructor(e,t,n,s,r){super(e,t,s,r),this.provider=n,this.authWindow=null,this.pollId=null,ie.currentPopupAction&&ie.currentPopupAction.cancel(),ie.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return I(e,this.auth,"internal-error"),e}async onExecution(){W(this.filter.length===1,"Popup operations only handle one event");const e=vt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(x(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(x(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ie.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if((n=(t=this.authWindow)==null?void 0:t.window)!=null&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(x(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ar.get())};e()}}ie.currentPopupAction=null;/**
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
 */const Cr="pendingRedirect",Be=new Map;class Lr extends Hn{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Be.get(this.auth._key());if(!e){try{const n=await Mr(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Be.set(this.auth._key(),e)}return this.bypassAuthState||Be.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Mr(i,e){const t=$r(e),n=Br(i);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function Pr(i,e){Be.set(i._key(),e)}function Br(i){return z(i._redirectPersistence)}function $r(i){return Pe(Cr,i.config.apiKey,i.name)}async function Nr(i,e,t=!1){if(O(i.app))return Promise.reject(re(i));const n=je(i),s=Rn(n,e),o=await new Lr(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
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
 */const xr=10*60*1e3;class Or{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Fr(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Un(e)){const s=((n=e.error.code)==null?void 0:n.split("auth/")[1])||"internal-error";t.onError(x(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=xr&&this.cachedEventUids.clear(),this.cachedEventUids.has(Vt(e))}saveEventToCache(e){this.cachedEventUids.add(Vt(e)),this.lastProcessedEventTime=Date.now()}}function Vt(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function Un({type:i,error:e}){return i==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Fr(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Un(i);default:return!1}}/**
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
 */async function Dr(i,e={}){return ye(i,"GET","/v1/projects",e)}/**
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
 */const Rr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Hr=/^https?/;async function Ur(i){if(i.config.emulator)return;const{authorizedDomains:e}=await Dr(i);for(const t of e)try{if(Vr(t))return}catch{}D(i,"unauthorized-domain")}function Vr(i){const e=it(),{protocol:t,hostname:n}=new URL(e);if(i.startsWith("chrome-extension://")){const o=new URL(i);return o.hostname===""&&n===""?t==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!Hr.test(t))return!1;if(Rr.test(i))return n===i;const s=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
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
 */const jr=new ke(3e4,6e4);function jt(){const i=F().___jsl;if(i!=null&&i.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let t=0;t<i.CP.length;t++)i.CP[t]=null}}function zr(i){return new Promise((e,t)=>{var s,r,o;function n(){jt(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{jt(),t(x(i,"network-request-failed"))},timeout:jr.get()})}if((r=(s=F().gapi)==null?void 0:s.iframes)!=null&&r.Iframe)e(gapi.iframes.getContext());else if((o=F().gapi)!=null&&o.load)n();else{const c=Ki("iframefcb");return F()[c]=()=>{gapi.load?n():t(x(i,"network-request-failed"))},Yi(`${Xi()}?onload=${c}`).catch(a=>t(a))}}).catch(e=>{throw $e=null,e})}let $e=null;function Gr(i){return $e=$e||zr(i),$e}/**
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
 */const Wr=new ke(5e3,15e3),qr="__/auth/iframe",Jr="emulator/auth/iframe",Yr={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Xr=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Kr(i){const e=i.config;I(e.authDomain,i,"auth-domain-config-required");const t=e.emulator?ut(e,Jr):`https://${i.config.authDomain}/${qr}`,n={apiKey:e.apiKey,appName:i.name,v:Te},s=Xr.get(i.config.apiHost);s&&(n.eid=s);const r=i._getFrameworks();return r.length&&(n.fw=r.join(",")),`${t}?${Se(n).slice(1)}`}async function Qr(i){const e=await Gr(i),t=F().gapi;return I(t,i,"internal-error"),e.open({where:document.body,url:Kr(i),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Yr,dontclear:!0},n=>new Promise(async(s,r)=>{await n.restyle({setHideOnLeave:!1});const o=x(i,"network-request-failed"),c=F().setTimeout(()=>{r(o)},Wr.get());function a(){F().clearTimeout(c),s(n)}n.ping(a).then(a,()=>{r(o)})}))}/**
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
 */const Zr={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},eo=500,to=600,no="_blank",so="http://localhost";class zt{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function io(i,e,t,n=eo,s=to){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const a={...Zr,width:n.toString(),height:s.toString(),top:r,left:o},l=M().toLowerCase();t&&(c=bn(l)?no:t),yn(l)&&(e=e||so,a.scrollbars="yes");const d=Object.entries(a).reduce((u,[f,p])=>`${u}${f}=${p},`,"");if(Ui(l)&&c!=="_self")return ro(e||"",c),new zt(null);const h=window.open(e||"",c,d);I(h,i,"popup-blocked");try{h.focus()}catch{}return new zt(h)}function ro(i,e){const t=document.createElement("a");t.href=i,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
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
 */const oo="__/auth/handler",ao="emulator/auth/handler",co=encodeURIComponent("fac");async function Gt(i,e,t,n,s,r){I(i.config.authDomain,i,"auth-domain-config-required"),I(i.config.apiKey,i,"invalid-api-key");const o={apiKey:i.config.apiKey,appName:i.name,authType:t,redirectUrl:n,v:Te,eventId:s};if(e instanceof yt){e.setDefaultLanguage(i.languageCode),o.providerId=e.providerId||"",as(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,h]of Object.entries({}))o[d]=h}if(e instanceof _e){const d=e.getScopes().filter(h=>h!=="");d.length>0&&(o.scopes=d.join(","))}i.tenantId&&(o.tid=i.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const a=await i._getAppCheckToken(),l=a?`#${co}=${encodeURIComponent(a)}`:"";return`${lo(i)}?${Se(c).slice(1)}${l}`}function lo({config:i}){return i.emulator?ut(i,ao):`https://${i.authDomain}/${oo}`}/**
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
 */const Qe="webStorageSupport";class ho{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=$n,this._completeRedirectFn=Nr,this._overrideRedirectResult=Pr}async _openPopup(e,t,n,s){var o;W((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const r=await Gt(e,t,n,it(),s);return io(e,r,vt())}async _openRedirect(e,t,n,s){await this._originValidation(e);const r=await Gt(e,t,n,it(),s);return pr(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(W(r,"If manager is not set, promise should be"),r)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Qr(e),n=new Or(e);return t.register("authEvent",s=>(I(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Qe,{type:Qe},s=>{var o;const r=(o=s==null?void 0:s[0])==null?void 0:o[Qe];r!==void 0&&t(!!r),D(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ur(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Tn()||vn()||ft()}}const uo=ho;var Wt="@firebase/auth",qt="1.13.4";/**
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
 */class mo{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){I(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function po(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function fo(i){be(new fe("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;I(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:o,authDomain:c,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:kn(i)},l=new qi(n,s,r,a);return Zi(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),be(new fe("auth-internal",e=>{const t=je(e.getProvider("auth").getImmediate());return(n=>new mo(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),de(Wt,qt,po(i)),de(Wt,qt,"esm2020")}/**
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
 */const go=5*60,yo=en("authIdTokenMaxAge")||go;let Jt=null;const vo=i=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>yo)return;const s=t==null?void 0:t.token;Jt!==s&&(Jt=s,await fetch(i,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function bo(i=di()){const e=rn(i,"auth");if(e.isInitialized())return e.getImmediate();const t=Qi(i,{popupRedirectResolver:uo,persistence:[Sr,Pn,$n]}),n=en("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(n,location.origin);if(location.origin===r.origin){const o=vo(r.toString());cr(t,o,()=>o(t.currentUser)),ar(t,c=>o(c))}}const s=Xn("auth");return s&&er(t,`http://${s}`),t}function wo(){var i;return((i=document.getElementsByTagName("head"))==null?void 0:i[0])??document}Ji({loadJS(i){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",i),n.onload=e,n.onerror=s=>{const r=x("internal-error");r.customData=s,t(r)},n.type="text/javascript",n.charset="UTF-8",wo().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});fo("Browser");const Io={apiKey:"AIzaSyCgSlk4wZO7RxUs-xe4ByNz2kk8ZQQoEWE",authDomain:"abossey-okai-magazine.firebaseapp.com",projectId:"abossey-okai-magazine",storageBucket:"abossey-okai-magazine.firebasestorage.app",messagingSenderId:"662566542988",appId:"1:662566542988:web:38584d5330b90dfc0ce5a9"},Eo=on(Io),le=bo(Eo);ot(le,Pn).catch(()=>{ot(le,Re).catch(()=>{})});const Ne={Toyota:{models:["Corolla","Camry","RAV4","Land Cruiser","Land Cruiser Prado","Hilux","Tacoma","Tundra","Highlander","4Runner","Vitz","Yaris","Fortuner","Sienna","Venza","Matrix","Prado","Passo","Wish","Mark X","Avalon","Crown","Harrier","C-HR","Belta","Ractis","Noah","Voxy","Alphard","HiAce","Celica","Supra","Prius","Sequoia"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Honda:{models:["Civic","Accord","CR-V","Fit","Pilot","HR-V","Odyssey","Insight","Ridgeline","Passport","City","Stream","Vezel","Prelude","Legend","Crossroad"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Nissan:{models:["Almera","Altima","Sentra","Patrol","Navara","Rogue","Pathfinder","Murano","Frontier","Micra","Versa","Tiida","X-Trail","Qashqai","Juke","Kicks","Armada","Urvan","Maxima","Teana","Note"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Hyundai:{models:["Elantra","Sonata","Tucson","Santa Fe","Accent","i10","i20","i30","Kona","Palisade","Genesis","Grandeur","Venue","Terracan","Atos","H-1 / Starex","Creta"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Kia:{models:["Picanto","Rio","Cerato","Sportage","Sorento","K5","Optima","Stinger","Telluride","Carnival / Sedona","Soul","Seltos","Cadenza","Mohave","Pegas"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Ford:{models:["Focus","Explorer","Escape","Ranger","Mustang","F-150","Edge","Expedition","Fiesta","Fusion","Transit","Bronco","EcoSport","Everest","Taurus"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},BMW:{models:["1 Series","2 Series","3 Series","4 Series","5 Series","6 Series","7 Series","8 Series","X1","X2","X3","X4","X5","X6","X7","Z4","M3","M5"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Mercedes:{models:["A-Class","B-Class","C-Class","E-Class","S-Class","CLA","CLS","GLA","GLB","GLC","GLE","GLS","G-Class","ML-Class","GL-Class","Sprinter","Vito"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Lexus:{models:["RX 350","RX 300","RX 450h","GX 460","GX 470","LX 570","LX 600","ES 350","ES 300","IS 250","IS 350","GS 350","NX 200t","NX 300","CT 200h"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Mitsubishi:{models:["Pajero","Pajero Sport","L200","Outlander","Lancer","ASX","Eclipse Cross","Mirage","Montero"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Suzuki:{models:["Swift","Vitara","Grand Vitara","Jimny","Baleno","Alto","Dzire","Ertiga","S-Cross","Ciaz"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Volkswagen:{models:["Golf","Passat","Jetta","Tiguan","Touareg","Polo","Amarok","Atlas","Arteon","Transporter"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},"Land Rover":{models:["Range Rover","Range Rover Sport","Range Rover Evoque","Range Rover Velar","Defender","Discovery","Discovery Sport"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]},Audi:{models:["A3","A4","A5","A6","A7","A8","Q3","Q5","Q7","Q8","TT"],years:["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"]}};let ce=null;try{ce=JSON.parse(localStorage.getItem("ao_vehicle_taxonomy"))}catch{}let S={...Ne};ce&&typeof ce=="object"&&Object.keys(Ne).forEach(i=>{if(ce[i]&&Array.isArray(ce[i].models)){const e=Array.from(new Set([...Ne[i].models,...ce[i].models]));S[i]={models:e,years:Ne[i].years}}});try{localStorage.setItem("ao_vehicle_taxonomy",JSON.stringify(S))}catch{}let H=JSON.parse(localStorage.getItem("ao_parts_categories"))||["Brake System","Engine Parts","Electrical","Suspension & Steering","Transmission","Cooling System","Filters & Tune-Up","Body & Styling","Tires & Wheels","Batteries","Engine Oil","Lighting","Suspension","Filters","Radiator","Shock Absorbers","Ball Joints","Steering Wheel","Wipers","Condenser"],Y=JSON.parse(localStorage.getItem("ao_accessory_categories"))||["Audio","Interior","Exterior","Safety"];const E="http://localhost:3001";class So{constructor(){this.searchMode="parts",this.activeMainType="all",this.selectedAccessoryCat=null,this.searchQuery="",this.products=[],this.selectedFitmentsInForm=[],this.selectedFormImages=[],this.currentFormStep=1,this.brands=JSON.parse(localStorage.getItem("ao_brands_list"))||["Toyota","Honda","Nissan","Hyundai","Kia","Mercedes-Benz","BMW","Audi","Ford","Chevrolet","Mitsubishi","Isuzu","Subaru","Mazda","Volkswagen","Land Rover","Peugeot","Suzuki","Bosch","NGK","Denso","Brembo","KYB","Monroe","Akebono","Mobil 1","Total","Shell"],this.activeFilters={conditions:[],priceMin:null,priceMax:null,merchantTypes:[],brands:[]},this.sortOption="popular",this.activePdpProduct=null,this.activePdpImageIndex=0,this.isMerchantLoggedIn=!1,this.merchantProfile=null,this.isAdminLoggedIn=!1,this.isCustomerLoggedIn=!1,this.merchants=[],this.deferredPrompt=null,this.currentView="storefront",this.brandSearchQuery="",this.activeBrandTab="all",this.allBrandsData=[{id:"toyota",name:"Toyota",logo:"toyota.png",category:"asian"},{id:"nissan",name:"Nissan",logo:"nissan.png",category:"asian"},{id:"honda",name:"Honda",logo:"honda.png",category:"asian"},{id:"suzuki",name:"Suzuki",logo:"suzuki.png",category:"asian"},{id:"mitsubishi",name:"Mitsubishi",logo:"mitsubishi.png",category:"asian"},{id:"acura",name:"Acura",logo:"acura.png",category:"asian"},{id:"mazda",name:"Mazda",logo:"mazda.png",category:"asian"},{id:"subaru",name:"Subaru",logo:"subaru.png",category:"asian"},{id:"lexus",name:"Lexus",logo:"lexus.png",category:"asian"},{id:"infiniti",name:"Infiniti",logo:"infiniti.png",category:"asian"},{id:"isuzu",name:"Isuzu",logo:"isuzu.png",category:"asian"},{id:"hyundai",name:"Hyundai",logo:"hyundai.png",category:"asian"},{id:"kia",name:"Kia",logo:"kia.png",category:"asian"},{id:"daewoo",name:"Daewoo",logo:"daewoo.png",category:"asian"},{id:"chery",name:"Chery",logo:"chery.png",category:"asian"},{id:"byd",name:"BYD",logo:"byd.png",category:"asian"},{id:"jetour",name:"Jetour",logo:"jetour.png",category:"asian"},{id:"geely",name:"Geely",logo:"geely.png",category:"asian"},{id:"jac-motors",name:"JAC Motors",logo:"jac-motors.png",category:"asian"},{id:"mercedes-benz",name:"Mercedes-Benz",logo:"mercedes-benz.png",category:"european"},{id:"bmw",name:"BMW",logo:"bmw.png",category:"european"},{id:"audi",name:"Audi",logo:"audi.png",category:"european"},{id:"porsche",name:"Porsche",logo:"porsche.png",category:"european"},{id:"peugeot",name:"Peugeot",logo:"peugeot.png",category:"european"},{id:"renault",name:"Renault",logo:"renault.png",category:"european"},{id:"opel",name:"Opel",logo:"opel.png",category:"european"},{id:"land-rover",name:"Land Rover",logo:"land-rover.png",category:"european"},{id:"jaguar",name:"Jaguar",logo:"jaguar.png",category:"european"},{id:"volvo",name:"Volvo",logo:"volvo.png",category:"european"},{id:"ford",name:"Ford",logo:"ford.png",category:"american"},{id:"chevrolet",name:"Chevrolet",logo:"chevrolet.png",category:"american"},{id:"jeep",name:"Jeep",logo:"jeep.png",category:"american"},{id:"dodge",name:"Dodge",logo:"dodge.png",category:"american"},{id:"gmc",name:"GMC",logo:"gmc.png",category:"american"},{id:"cadillac",name:"Cadillac",logo:"cadillac.png",category:"american"},{id:"tesla",name:"Tesla",logo:"tesla.png",category:"american"},{id:"ram",name:"RAM",logo:"ram.png",category:"american"},{id:"chrysler",name:"Chrysler",logo:"chrysler.png",category:"american"},{id:"sinotruk",name:"Sinotruk",logo:"sinotruk.png",category:"commercial"},{id:"daf",name:"DAF",logo:"daf.png",category:"commercial"},{id:"man",name:"MAN",logo:"man.png",category:"commercial"},{id:"scania",name:"Scania",logo:"scania.png",category:"commercial"},{id:"iveco",name:"Iveco",logo:"iveco.png",category:"commercial"},{id:"mack",name:"Mack",logo:"mack.png",category:"commercial"},{id:"volvo-trucks",name:"Volvo Trucks",logo:"volvo-trucks.png",category:"commercial"},{id:"renault-trucks",name:"Renault Trucks",logo:"renault-trucks.png",category:"commercial"},{id:"ashok-leyland",name:"Ashok Leyland",logo:"ashok-leyland.png",category:"commercial"},{id:"shacman",name:"Shacman",logo:"shacman.png",category:"commercial"},{id:"faw",name:"FAW",logo:"faw.png",category:"commercial"},{id:"tata",name:"Tata",logo:"tata.png",category:"commercial"}],this.init()}init(){this.loadPersistedData(),this.showCatalogSkeletons(),this.setupPwaEvents(),this.bindDomElements(),this.populateSelectOptions(),this.renderBrandFilters(),this.setupThemeAndStyleEnhancements(),this.renderAnnouncementBanner(),this.setupClickTracking(),this.setupInteractiveMarquee(),this.setupBrandMarquee(),this.initUrlStateSync(),this.setupPriceRangeEvents(),this.loadBackendData();try{this.initGoogleAuth()}catch(e){console.warn("Firebase auth init skipped:",e)}}showCatalogSkeletons(e=8){const t=document.getElementById("catalog-products-container");if(t){t.innerHTML="";for(let n=0;n<e;n++){const s=document.createElement("div");s.className="product-card skeleton-card",s.innerHTML=`
        <div class="skeleton-img skeleton-shimmer"></div>
        <div class="skeleton-body">
          <div class="skeleton-line skeleton-line-sm skeleton-shimmer"></div>
          <div class="skeleton-line skeleton-line-lg skeleton-shimmer"></div>
          <div class="skeleton-line skeleton-line-md skeleton-shimmer"></div>
          <div class="skeleton-footer">
            <div class="skeleton-line skeleton-line-price skeleton-shimmer"></div>
            <div class="skeleton-line skeleton-line-badge skeleton-shimmer"></div>
          </div>
        </div>
      `,t.appendChild(s)}}}initGoogleAuth(){lr(le,e=>{e?console.log("✅ Firebase Auth: user signed in",e.email):console.log("ℹ️ Firebase Auth: no user signed in")}),console.log("✅ Firebase Auth initialized")}setupInteractiveMarquee(){const e=document.querySelector(".shop-cat-scroll"),t=document.querySelector(".shop-cat-track"),n=document.querySelector(".shop-cat-group");if(!e||!t||!n)return;let s=!1,r=0,o=0,c=0,a=0,l=!1,d=null,h=!1,u=n.getBoundingClientRect().width||1300;const f=()=>{u=n.getBoundingClientRect().width};f(),window.addEventListener("resize",f),window.addEventListener("load",f);const p=.85,y=()=>{u<=100&&(u=n.getBoundingClientRect().width),!l&&!s&&(a-=p,a<=-u&&(a+=u),t.style.transform=`translate3d(${a}px, 0, 0)`),requestAnimationFrame(y)};requestAnimationFrame(y);const g=()=>{l=!0,clearTimeout(d),d=setTimeout(()=>{l=!1},2500)},w=b=>{a=b,a<=-u?a+=u:a>0&&(a-=u),t.style.transform=`translate3d(${a}px, 0, 0)`};e.addEventListener("mousedown",b=>{s=!0,h=!1,e.classList.add("active"),r=b.pageX,o=b.pageY,c=a,g()}),e.addEventListener("mouseleave",()=>{s=!1,e.classList.remove("active")}),e.addEventListener("mouseup",b=>{s&&Math.sqrt((b.pageX-r)**2+(b.pageY-o)**2)>6&&(h=!0),s=!1,e.classList.remove("active")}),e.addEventListener("mousemove",b=>{if(!s)return;b.preventDefault();const C=(b.pageX-r)*1.3;w(c+C),g()});let m=0,v=0,T=0;e.addEventListener("touchstart",b=>{s=!0,h=!1;const A=b.touches[0];m=A.pageX,v=A.pageY,T=a,g()},{passive:!0}),e.addEventListener("touchmove",b=>{if(!s)return;const A=b.touches[0],C=A.pageX-m,q=A.pageY-v;if(Math.abs(C)>Math.abs(q)){b.preventDefault(),h=!0;const P=C*1.3;w(T+P),g()}},{passive:!1}),e.addEventListener("touchend",()=>{s=!1},{passive:!0}),e.addEventListener("dragstart",b=>{b.preventDefault()}),e.addEventListener("click",b=>{h&&(b.stopImmediatePropagation(),b.preventDefault(),h=!1)},!0)}setupBrandMarquee(){const e=document.querySelector(".shop-brand-scroll"),t=document.querySelector(".shop-brand-track"),n=document.querySelector(".shop-brand-group");if(!e||!t||!n)return;let s=!1,r=0,o=0,c=0,a=0,l=!1,d=null,h=!1,u=n.getBoundingClientRect().width||1300;const f=()=>{u=n.getBoundingClientRect().width,a=-u};f(),window.addEventListener("resize",f),window.addEventListener("load",f),a=-u;const p=1.35,y=()=>{u<=100&&(u=n.getBoundingClientRect().width,a===0&&(a=-u)),!l&&!s&&(a+=p,a>=0&&(a-=u),t.style.transform=`translate3d(${a}px, 0, 0)`),requestAnimationFrame(y)};requestAnimationFrame(y);const g=()=>{l=!0,clearTimeout(d),d=setTimeout(()=>{l=!1},2500)},w=b=>{for(a=b;a>=0;)a-=u;for(;a<-u;)a+=u;t.style.transform=`translate3d(${a}px, 0, 0)`};e.addEventListener("mousedown",b=>{s=!0,h=!1,e.classList.add("active"),r=b.pageX,o=b.pageY,c=a,g()}),e.addEventListener("mouseleave",()=>{s=!1,e.classList.remove("active")}),e.addEventListener("mouseup",b=>{s&&Math.sqrt((b.pageX-r)**2+(b.pageY-o)**2)>6&&(h=!0),s=!1,e.classList.remove("active")}),e.addEventListener("mousemove",b=>{if(!s)return;b.preventDefault();const C=(b.pageX-r)*1.3;w(c+C),g()});let m=0,v=0,T=0;e.addEventListener("touchstart",b=>{s=!0,h=!1;const A=b.touches[0];m=A.pageX,v=A.pageY,T=a,g()},{passive:!0}),e.addEventListener("touchmove",b=>{if(!s)return;const A=b.touches[0],C=A.pageX-m,q=A.pageY-v;if(Math.abs(C)>Math.abs(q)){b.preventDefault(),h=!0;const P=C*1.3;w(T+P),g()}},{passive:!1}),e.addEventListener("touchend",()=>{s=!1},{passive:!0}),e.addEventListener("dragstart",b=>{b.preventDefault()}),e.addEventListener("click",b=>{h&&(b.preventDefault(),b.stopPropagation(),h=!1)},!0)}normalizeProduct(e){let t="Universal Fit";return Array.isArray(e.compatibility)&&e.compatibility.length>0?t=e.compatibility:e.compatibility_text&&(t=e.compatibility_text),{id:e.id,mainType:e.main_type||e.mainType||"parts",name:e.name,brand:e.brand||"",category:e.category||"",condition:e.condition||"New",price:typeof e.price=="number"?e.price:parseFloat(e.price||0),stock:e.stock||"In Stock",status:e.status||"Live",views:e.views||0,images:e.images||[],compatibility:t,merchant:e.merchant||{shopName:e.merchant_shop_name||"Abossey Okai Merchant",phone:e.merchant_phone||"+233240000000",location:e.merchant_location||"Abossey Okai, Accra",coordinates:e.merchant_coordinates||"5.5565, -0.2282",verified:e.merchant_verified??!0,since:e.merchant_since||"Jan 2022"},description:e.description||""}}normalizeMerchantProfile(e){return!e||e.shopName&&!e.shop_name?e:{id:e.id,userId:e.user_id||e.userId,shopName:e.shop_name||e.shopName||"Merchant",phone:e.phone||"",email:e.email||"",location:e.location||"Abossey Okai, Accra",coordinates:e.coordinates||"5.5565, -0.2282",description:e.description||"",specialty:e.specialty||"japanese",avatar:e.avatar_url||e.avatar||null,verified:e.verified??!1,verificationNotes:e.verification_notes||e.verificationNotes||"",status:e.status||"Active",since:e.since||"Jan 2022",categoryTags:e.categoryTags||e.category_tags||[]}}async loadBackendData(){try{localStorage.removeItem("ao_marketplace_products"),localStorage.removeItem("ao_marketplace_merchants")}catch{}try{const e=this.isAdminLoggedIn||this.isMerchantLoggedIn?"?status=all&limit=200":"?status=Live&limit=100",t=await fetch(`${E}/api/products${e}`);if(t.ok){const n=await t.json();Array.isArray(n.products)&&(this.products=n.products.map(s=>this.normalizeProduct(s)))}}catch(e){console.warn("Could not load products from backend API:",e)}try{const e=await fetch(`${E}/api/merchants`);if(e.ok){const t=await e.json();Array.isArray(t.merchants)&&t.merchants.length>0&&(this.merchants=t.merchants.map(n=>({id:n.id,shopName:n.shop_name,phone:n.phone,email:n.email,location:n.location,coordinates:n.coordinates||"5.5565, -0.2282",description:n.description,specialty:n.specialty||"japanese",verified:n.verified,verificationNotes:n.verification_notes||"",status:n.status,since:n.since||"Jan 2022"})))}}catch(e){console.warn("Could not load merchants from backend API:",e)}try{const e=await fetch(`${E}/api/brands?type=vehicle`);if(e.ok){const t=await e.json();Array.isArray(t.brands)&&t.brands.length>0&&(this.allBrandsData=t.brands.map(n=>({id:n.slug||n.name.toLowerCase().replace(/[^a-z0-9]/g,"-"),name:n.name,logo:n.logo||`${n.slug||n.name.toLowerCase()}.png`,category:n.category||"asian"})))}}catch(e){console.warn("Could not load brands from backend API:",e)}this.renderCatalog(),this.renderBrandFilters(),this.populateSelectOptions(),this.isMerchantLoggedIn?(this.renderMerchantInventory(),this.renderMerchantMetrics()):this.isAdminLoggedIn&&(this.renderAdminListings(),this.renderAdminOverview())}loadPersistedData(){try{localStorage.removeItem("ao_marketplace_products"),localStorage.removeItem("ao_marketplace_merchants")}catch{}const e=localStorage.getItem("ao_merchant_logged_in"),t=localStorage.getItem("ao_merchant_profile"),n=localStorage.getItem("ao_admin_logged_in"),s=localStorage.getItem("ao_customer_logged_in"),r=localStorage.getItem("ao_jwt_token");if(n==="true")this.isAdminLoggedIn=!0,this.isMerchantLoggedIn=!1,this.isCustomerLoggedIn=!1,this.currentView="storefront";else if(e==="true"&&t){this.isMerchantLoggedIn=!0,this.isAdminLoggedIn=!1,this.isCustomerLoggedIn=!1;try{this.merchantProfile=this.normalizeMerchantProfile(JSON.parse(t))}catch{}this.currentView="storefront"}else s==="true"&&(this.isCustomerLoggedIn=!0,this.isMerchantLoggedIn=!1,this.isAdminLoggedIn=!1,this.currentView="storefront");r&&fetch(`${E}/api/auth/me`,{headers:{Authorization:`Bearer ${r}`}}).then(c=>c.ok?c.json():null).then(c=>{c&&c.user&&(c.user.role==="admin"?(this.isAdminLoggedIn=!0,this.isMerchantLoggedIn=!1,this.isCustomerLoggedIn=!1):c.user.role==="merchant"?(this.isMerchantLoggedIn=!0,this.isAdminLoggedIn=!1,this.isCustomerLoggedIn=!1,c.merchantProfile&&(this.merchantProfile=this.normalizeMerchantProfile(c.merchantProfile),localStorage.setItem("ao_merchant_profile",JSON.stringify(this.merchantProfile)))):(this.isCustomerLoggedIn=!0,this.isMerchantLoggedIn=!1,this.isAdminLoggedIn=!1),this.updatePortalButtonState())}).catch(()=>{});const o=localStorage.getItem("ao_admin_premoderation");this.premoderation=o==="true",this.announcement=JSON.parse(localStorage.getItem("ao_global_announcement"))||{visible:!0,text:"Install ABBOSSEY OKAI MAGAZINE on your home screen for quick offline access!",showInstallBtn:!0},this.adminListingsFilter="all"}saveProductsToStorage(){localStorage.setItem("ao_marketplace_products",JSON.stringify(this.products))}saveMerchantProfileToStorage(){localStorage.setItem("ao_merchant_profile",JSON.stringify(this.merchantProfile)),localStorage.setItem("ao_merchant_logged_in",this.isMerchantLoggedIn?"true":"false"),localStorage.setItem("ao_admin_logged_in",this.isAdminLoggedIn?"true":"false"),localStorage.setItem("ao_customer_logged_in",this.isCustomerLoggedIn?"true":"false")}setupPwaEvents(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(t=>console.log("Service Worker registered successfully:",t.scope)).catch(t=>console.error("Service Worker registration failed:",t))}),window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),this.deferredPrompt=t,this.renderAnnouncementBanner()});const e=document.getElementById("pwa-install-btn");e&&e.addEventListener("click",()=>{this.deferredPrompt&&(this.deferredPrompt.prompt(),this.deferredPrompt.userChoice.then(t=>{t.outcome==="accepted"&&console.log("User accepted the install prompt"),this.deferredPrompt=null,this.renderAnnouncementBanner()}))})}renderAnnouncementBanner(){const e=document.getElementById("pwa-banner"),t=e?e.querySelector(".pwa-install-text"):null,n=document.getElementById("pwa-install-btn");e&&(this.announcement.visible?(e.style.display="flex",t&&(t.innerHTML='<i class="fa-solid fa-bullhorn"></i> '+this.announcement.text),n&&(n.style.display=this.deferredPrompt&&this.announcement.showInstallBtn?"inline-block":"none")):e.style.display="none")}setupClickTracking(){document.body.addEventListener("click",e=>{if(e.target.closest('a[href*="whatsapp.com/send"]')){const s=parseInt(localStorage.getItem("ao_lead_whatsapp")||"0")+1;localStorage.setItem("ao_lead_whatsapp",s.toString()),this.isAdminLoggedIn&&this.renderAdminOverview()}if(e.target.closest('a[href*="google.com/maps"]')||e.target.closest('a[href*="maps.google.com"]')){const s=parseInt(localStorage.getItem("ao_lead_maps")||"0")+1;localStorage.setItem("ao_lead_maps",s.toString()),this.isAdminLoggedIn&&this.renderAdminOverview()}})}bindDomElements(){const e=document.getElementById("mobile-menu-toggle"),t=document.getElementById("main-header");e&&e.addEventListener("click",()=>{t.classList.toggle("menu-open")}),document.querySelectorAll("#main-nav-links a").forEach(s=>{s.addEventListener("click",()=>{t.classList.remove("menu-open")})});const n=document.getElementById("main-search-input");n&&(n.addEventListener("input",s=>this.handleSearchInput(s)),n.addEventListener("focus",()=>this.showAutocompleteIfPossible()),n.addEventListener("keydown",s=>{s.key==="Enter"&&(this.toggleSearchModal(!1),this.scrollToMarketplace())}),document.addEventListener("click",s=>{!n.contains(s.target)&&!document.getElementById("search-autocomplete-dropdown").contains(s.target)&&(document.getElementById("search-autocomplete-dropdown").style.display="none")})),this.updatePortalButtonState()}populateSelectOptions(){const e=document.getElementById("select-vehicle-make"),t=document.getElementById("select-parts-category"),n=document.getElementById("form-fitment-make");e&&(e.innerHTML='<option value="">All Brands</option>',Object.keys(S).forEach(s=>{e.innerHTML+=`<option value="${s}">${s}</option>`})),n&&(n.innerHTML='<option value="">Select Brand</option>',Object.keys(S).forEach(s=>{n.innerHTML+=`<option value="${s}">${s}</option>`})),t&&(t.innerHTML='<option value="">All Categories</option>',H.forEach(s=>{t.innerHTML+=`<option value="${s}">${s}</option>`}))}setSearchMode(e){this.searchMode=e;const t=document.getElementById("tab-mode-parts"),n=document.getElementById("tab-mode-accessories"),s=document.getElementById("mode-parts-filters"),r=document.getElementById("mode-accessories-filters"),o=document.getElementById("main-search-input");e==="parts"?(t.classList.add("active"),n.classList.remove("active"),s.style.display="grid",r.style.display="none",o.placeholder="Search by part name, brand, e.g. 'Brake Pads Toyota'..."):(t.classList.remove("active"),n.classList.add("active"),s.style.display="none",r.style.display="grid",o.placeholder="Search accessories, e.g. 'Car cover waterproof', 'Pioneer'..."),this.selectedAccessoryCat=null,document.querySelectorAll(".accessory-cat-card").forEach(c=>c.classList.remove("active"))}onMakeChange(){const e=document.getElementById("select-vehicle-make"),t=document.getElementById("select-vehicle-model"),n=document.getElementById("select-vehicle-year"),s=e.value;if(!s){t.value="",t.disabled=!0,n.value="",n.disabled=!0;return}t.disabled=!1,t.innerHTML='<option value="">All Models</option>',S[s].models.forEach(r=>{t.innerHTML+=`<option value="${r}">${r}</option>`}),n.value="",n.disabled=!0}onModelChange(){const e=document.getElementById("select-vehicle-make"),t=document.getElementById("select-vehicle-model"),n=document.getElementById("select-vehicle-year"),s=e.value;if(!t.value){n.value="",n.disabled=!0;return}n.disabled=!1,n.innerHTML='<option value="">All Years</option>',S[s].years.forEach(o=>{n.innerHTML+=`<option value="${o}">${o}</option>`})}onFormMakeChange(){const e=document.getElementById("form-fitment-make"),t=document.getElementById("form-fitment-model"),n=e.value;if(!n){t.value="",t.disabled=!0;return}t.disabled=!1,t.innerHTML='<option value="">Select Model</option>',S[n].models.forEach(s=>{t.innerHTML+=`<option value="${s}">${s}</option>`})}applyVehicleSearch(){const e=document.getElementById("select-vehicle-make").value,t=document.getElementById("select-vehicle-model").value,n=document.getElementById("select-vehicle-year").value,s=document.getElementById("select-parts-category").value;this.activeMainType="parts",document.getElementById("nav-parts").classList.add("active"),document.getElementById("nav-accessories").classList.remove("active"),this.activeFilters.make=e,this.activeFilters.model=t,this.activeFilters.year=n,this.activeFilters.partsCategory=s,this.renderCatalog(),this.scrollToMarketplace(),this.toggleSearchModal(!1),this.showToast("Filtered catalog by vehicle fitment successfully!","success")}selectAccessoryCategory(e,t){this.activeMainType="accessories",this.selectedAccessoryCat=e,document.getElementById("nav-parts").classList.remove("active"),document.getElementById("nav-accessories").classList.add("active"),document.querySelectorAll(".accessory-cat-card").forEach(n=>n.classList.remove("active")),t&&t.classList.add("active"),this.activeFilters.accessoryCategory=e,this.renderCatalog(),this.scrollToMarketplace(),this.toggleSearchModal(!1)}matchesSearchQuery(e,t){if(!t)return!0;const n=t.toLowerCase().trim();if(!n)return!0;const s=(e.name||"").toLowerCase(),r=(e.brand||"").toLowerCase(),o=(e.category||"").toLowerCase(),c=(e.description||"").toLowerCase();let a="";Array.isArray(e.compatibility)?a=e.compatibility.map(p=>`${p.make||""} ${p.model||""} ${p.years||""}`).join(" ").toLowerCase():typeof e.compatibility=="string"&&(a=e.compatibility.toLowerCase());const l=`${s} ${r} ${o} ${c} ${a}`;if(l.includes(n))return!0;const d=n.split(/[\s\-_/,&+]+/).map(p=>p.trim()).filter(p=>p.length>=2&&!["the","for","and","with","car","auto","part","parts"].includes(p));if(d.length===0)return l.includes(n);const h={brake:["brakes","braking","pad","pads","rotor","rotors","caliper","calipers","disc","discs","shoe","shoes","abs"],brakes:["brake","braking","pad","pads","rotor","rotors","caliper","calipers","disc","discs","shoe","shoes"],pad:["pads","brake","brakes"],pads:["pad","brake","brakes"],shock:["shocks","absorber","absorbers","strut","struts","damper","dampers","suspension"],shocks:["shock","absorber","absorbers","strut","struts","suspension"],absorber:["absorbers","shock","shocks","strut","struts","suspension"],absorbers:["absorber","shock","shocks","strut","struts","suspension"],radiator:["radiators","cooling","coolant","condenser","fan","engine"],radiators:["radiator","cooling","coolant","condenser"],battery:["batteries","accumulator","power","cell","alternator"],batteries:["battery","accumulator","power","cell","alternator"],oil:["engine oil","motor oil","lubricant","synthetic","filter","lube"],engine:["oil","engine oil","motor","piston","gasket","cylinder"],light:["lights","lighting","headlight","headlights","lamp","lamps","bulb","bulbs","led","taillight","fog"],lights:["light","lighting","headlight","headlights","lamp","lamps","bulb","bulbs","led","taillight","fog"],lighting:["light","lights","headlight","headlights","lamp","lamps","bulb","bulbs","led"],wiper:["wipers","blade","blades","windshield","washer"],wipers:["wiper","blade","blades","windshield","washer"],tire:["tires","tyre","tyres","wheel","wheels","rim","rims"],tires:["tire","tyre","tyres","wheel","wheels","rim","rims"],wheel:["wheels","tire","tires","rim","rims","steering"],wheels:["wheel","tire","tires","rim","rims","steering"],joint:["joints","ball joint","balljoint","balljoints","suspension","arm","bushing"],joints:["joint","ball joint","balljoint","balljoints","suspension","arm","bushing"],ball:["ball joint","balljoint","joints","joint"],steering:["steering wheel","rack","pinion","column","wheel"],filter:["filters","filtration","air filter","oil filter","cabin","fuel filter"],filters:["filter","filtration","air filter","oil filter","cabin","fuel filter"],condenser:["condensers","ac","air condition","compressor","cooling","radiator"],condensers:["condenser","ac","air condition","compressor","cooling"],suspension:["spring","springs","shock","shocks","strut","struts","arm","bushing","link"]},u=p=>p.endsWith("ies")?p.slice(0,-3)+"y":p.endsWith("es")&&p.length>4?p.slice(0,-2):p.endsWith("s")&&!p.endsWith("ss")&&p.length>3?p.slice(0,-1):p.endsWith("ing")&&p.length>5?p.slice(0,-3):p;let f=0;for(const p of d){const y=u(p);let g=l.includes(p)||l.includes(y);if(!g){const w=h[p]||h[y]||[];for(const m of w)if(l.includes(m)||l.includes(u(m))){g=!0;break}}if(!g&&p.length>=4){const w=p.slice(0,4);(s.includes(w)||o.includes(w)||r.includes(w))&&(g=!0)}g&&f++}return f>0}handleSearchInput(e){this.searchQuery=e.target.value.toLowerCase().trim(),this.showAutocompleteIfPossible(),this.renderCatalog()}showAutocompleteIfPossible(){const e=document.getElementById("search-autocomplete-dropdown");if(!this.searchQuery){e.style.display="none";return}const t=this.products.filter(n=>n.status==="Live"&&this.matchesSearchQuery(n,this.searchQuery)).slice(0,6);if(t.length===0){e.style.display="none";return}e.innerHTML="",t.forEach(n=>{const s=document.createElement("div");s.className="autocomplete-item",s.innerHTML=`
        <span class="autocomplete-item-text">${n.name} <small style="color:var(--text-muted);">(${n.brand})</small></span>
        <span class="autocomplete-item-sub">${n.mainType==="parts"?"Spare Part":"Accessory"}</span>
      `,s.addEventListener("click",()=>{e.style.display="none",document.getElementById("main-search-input").value=n.name,this.searchQuery=n.name.toLowerCase(),this.renderCatalog(),this.openPdp(n.id),this.toggleSearchModal(!1)}),e.appendChild(s)}),e.style.display="block"}initUrlStateSync(){this.restoreFiltersFromUrl(),window.addEventListener("popstate",()=>{this.restoreFiltersFromUrl({fromPopState:!0})})}syncUrlState(e=!1){try{const t=new URL(window.location.href),n=new URLSearchParams,s=this.activeFilters.partsCategory||this.activeFilters.accessoryCategory;s&&n.set("category",s),this.activeMainType&&this.activeMainType!=="all"&&n.set("type",this.activeMainType),this.activeFilters.priceMin!==null&&!isNaN(this.activeFilters.priceMin)&&this.activeFilters.priceMin>0&&n.set("minPrice",Math.round(this.activeFilters.priceMin)),this.activeFilters.priceMax!==null&&!isNaN(this.activeFilters.priceMax)&&this.activeFilters.priceMax>0&&n.set("maxPrice",Math.round(this.activeFilters.priceMax)),this.activeFilters.conditions&&this.activeFilters.conditions.length>0&&n.set("condition",this.activeFilters.conditions.join(",")),this.activeFilters.brands&&this.activeFilters.brands.length>0&&n.set("brand",this.activeFilters.brands.join(",")),this.activeFilters.make&&n.set("make",this.activeFilters.make),this.activeFilters.model&&n.set("model",this.activeFilters.model),this.activeFilters.year&&n.set("year",this.activeFilters.year),this.searchQuery&&this.searchQuery.trim()&&n.set("search",this.searchQuery.trim()),this.sortOption&&this.sortOption!=="popular"&&n.set("sort",this.sortOption);const r=n.toString(),o=`${t.pathname}${r?`?${r}`:""}${t.hash}`;e?window.history.replaceState({filters:{...this.activeFilters}},"",o):window.location.search!==(r?`?${r}`:"")&&window.history.pushState({filters:{...this.activeFilters}},"",o)}catch(t){console.warn("Could not sync URL state:",t)}}restoreFiltersFromUrl(e={}){try{const t=new URLSearchParams(window.location.search);if(!t.toString()&&!e.fromPopState)return;const n=t.get("minPrice")||t.get("price_min")||t.get("min"),s=t.get("maxPrice")||t.get("price_max")||t.get("max");let r=n?parseFloat(n):null,o=s?parseFloat(s):null;if(r!==null&&(isNaN(r)||r<0)&&(r=null),o!==null&&(isNaN(o)||o<0)&&(o=null),r!==null&&o!==null&&r>o){const m=r;r=o,o=m}this.activeFilters.priceMin=r,this.activeFilters.priceMax=o;const c=document.getElementById("price-min"),a=document.getElementById("price-max");c&&(c.value=r!==null?r:""),a&&(a.value=o!==null?o:"");const l=t.get("category");if(l){this.activeFilters.partsCategory=l;const m=document.getElementById("select-parts-category");m&&(m.value=l)}const d=t.get("type");if(d&&["parts","accessories"].includes(d)){this.activeMainType=d;const m=document.getElementById("nav-parts"),v=document.getElementById("nav-accessories");d==="parts"&&m&&(m.classList.add("active"),v==null||v.classList.remove("active")),d==="accessories"&&v&&(v.classList.add("active"),m==null||m.classList.remove("active"))}const h=t.get("condition");if(h){const m=h.split(",").map(v=>v.trim()).filter(Boolean);this.activeFilters.conditions=m,document.querySelectorAll(".condition-filter-checkbox").forEach(v=>{v.checked=m.includes(v.value)})}const u=t.get("brand");if(u){const m=u.split(",").map(v=>v.trim()).filter(Boolean);this.activeFilters.brands=m,document.querySelectorAll(".brand-filter-checkbox").forEach(v=>{v.checked=m.includes(v.value)})}const f=t.get("make"),p=t.get("model"),y=t.get("year");if(f){this.activeFilters.make=f;const m=document.getElementById("select-vehicle-make");m&&(m.value=f)}if(p){this.activeFilters.model=p;const m=document.getElementById("select-vehicle-model");m&&(m.value=p,m.disabled=!1)}if(y){this.activeFilters.year=y;const m=document.getElementById("select-vehicle-year");m&&(m.value=y,m.disabled=!1)}const g=t.get("search");if(g){this.searchQuery=g.toLowerCase().trim();const m=document.getElementById("main-search-input");m&&(m.value=g)}const w=t.get("sort");if(w){this.sortOption=w;const m=document.getElementById("catalog-sort-select");m&&(m.value=w)}this.renderCatalog()}catch(t){console.warn("Could not restore filters from URL:",t)}}setupPriceRangeEvents(){const e=document.getElementById("price-min"),t=document.getElementById("price-max");e&&(e.addEventListener("input",()=>this.onPriceInputDebounced()),e.addEventListener("blur",()=>this.applyPriceFilter({replaceUrl:!1})),e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),this.applyPriceFilter({replaceUrl:!1}))})),t&&(t.addEventListener("input",()=>this.onPriceInputDebounced()),t.addEventListener("blur",()=>this.applyPriceFilter({replaceUrl:!1})),t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),this.applyPriceFilter({replaceUrl:!1}))}))}onPriceInputDebounced(){this.priceDebounceTimer&&clearTimeout(this.priceDebounceTimer),this.priceDebounceTimer=setTimeout(()=>{this.applyPriceFilter({replaceUrl:!0})},350)}applyPriceFilter(e={replaceUrl:!1}){const t=document.getElementById("price-min"),n=document.getElementById("price-max");if(!t||!n)return;let s=t.value.trim()!==""?parseFloat(t.value):null,r=n.value.trim()!==""?parseFloat(n.value):null;if(s!==null&&(isNaN(s)||s<0)&&(s=0),r!==null&&(isNaN(r)||r<0)&&(r=0),s!==null&&r!==null&&s>r){const o=s;s=r,r=o,t.value=s,n.value=r}this.activeFilters.priceMin=s,this.activeFilters.priceMax=r,this.syncUrlState(e.replaceUrl),this.renderCatalog(),this.fetchFilteredProductsBackend()}clearPriceFilter(){const e=document.getElementById("price-min"),t=document.getElementById("price-max");e&&(e.value=""),t&&(t.value=""),this.activeFilters.priceMin=null,this.activeFilters.priceMax=null,this.syncUrlState(!1),this.renderCatalog(),this.fetchFilteredProductsBackend()}setPricePreset(e,t){const n=document.getElementById("price-min"),s=document.getElementById("price-max");n&&(n.value=e!==""&&e!==null?e:""),s&&(s.value=t!==""&&t!==null?t:""),this.applyPriceFilter({replaceUrl:!1})}async fetchFilteredProductsBackend(){this.productAbortController&&this.productAbortController.abort(),this.productAbortController=new AbortController;try{const e=new URLSearchParams,t=this.isAdminLoggedIn||this.isMerchantLoggedIn?"all":"Live";e.set("status",t),e.set("limit","150"),this.activeMainType&&this.activeMainType!=="all"&&e.set("type",this.activeMainType);const n=this.activeFilters.partsCategory||this.activeFilters.accessoryCategory;n&&e.set("category",n),this.activeFilters.priceMin!==null&&e.set("minPrice",this.activeFilters.priceMin),this.activeFilters.priceMax!==null&&e.set("maxPrice",this.activeFilters.priceMax),this.activeFilters.brands&&this.activeFilters.brands.length===1&&e.set("brand",this.activeFilters.brands[0]),this.searchQuery&&e.set("search",this.searchQuery);const s=await fetch(`${E}/api/products?${e.toString()}`,{signal:this.productAbortController.signal});if(s.ok){const r=await s.json();r.facets&&(this.backendFacets=r.facets)}}catch(e){if(e.name==="AbortError")return;console.warn("Backend price filter fetch error:",e)}}updatePriceHistogramAndFacets(e=[]){const t=document.getElementById("price-range-count-badge");t&&(this.activeFilters.priceMin!==null||this.activeFilters.priceMax!==null?(t.textContent=`${e.length} in range`,t.classList.add("visible")):(t.textContent=`${this.products.filter(y=>y.status==="Live").length} items`,t.classList.remove("visible")));const n=document.querySelectorAll(".price-preset-chip"),s=this.activeFilters.priceMin,r=this.activeFilters.priceMax;n.forEach(p=>{const y=p.getAttribute("data-min"),g=p.getAttribute("data-max"),w=y===""&&(s===null||s===0)||parseFloat(y)===s,m=g===""&&r===null||parseFloat(g)===r;y===""&&g===""&&s===null&&r===null||(y!==""||g!=="")&&w&&m?p.classList.add("active"):p.classList.remove("active")});const o=document.getElementById("histogram-bars");if(!o)return;const c=this.products.filter(p=>p.status==="Live");if(c.length===0){o.innerHTML="";return}const a=c.map(p=>p.price).filter(p=>typeof p=="number"&&!isNaN(p)),l=Math.max(...a,5e3),d=14,h=l/d,u=new Array(d).fill(0);a.forEach(p=>{const y=Math.min(Math.floor(p/h),d-1);y>=0&&u[y]++});const f=Math.max(...u,1);o.innerHTML="",u.forEach((p,y)=>{const g=y*h,w=(y+1)*h,m=Math.max(12,Math.round(p/f*100)),v=document.createElement("div");v.className="histogram-bar",v.style.height=`${m}%`,v.title=`GHS ${Math.round(g)} - ${Math.round(w)}: ${p} products`,(s===null||w>=s)&&(r===null||g<=r)&&v.classList.add("in-range"),o.appendChild(v)})}onFilterChange(){var o,c;const e=Array.from(document.querySelectorAll(".condition-filter-checkbox:checked")).map(a=>a.value);this.activeFilters.conditions=e;const t=(o=document.getElementById("price-min"))==null?void 0:o.value,n=(c=document.getElementById("price-max"))==null?void 0:c.value;this.activeFilters.priceMin=t&&t.trim()!==""?parseFloat(t):null,this.activeFilters.priceMax=n&&n.trim()!==""?parseFloat(n):null;const s=Array.from(document.querySelectorAll(".merchant-type-filter:checked")).map(a=>a.value);this.activeFilters.merchantTypes=s;const r=Array.from(document.querySelectorAll(".brand-filter-checkbox:checked")).map(a=>a.value);this.activeFilters.brands=r,this.syncUrlState(),this.renderCatalog(),this.fetchFilteredProductsBackend()}resetAllFilters(){document.querySelectorAll(".condition-filter-checkbox, .merchant-type-filter, .brand-filter-checkbox").forEach(d=>d.checked=!1);const e=document.getElementById("price-min"),t=document.getElementById("price-max");e&&(e.value=""),t&&(t.value="");const n=document.getElementById("select-vehicle-make"),s=document.getElementById("select-vehicle-model"),r=document.getElementById("select-vehicle-year"),o=document.getElementById("select-parts-category"),c=document.getElementById("main-search-input");n&&(n.value=""),s&&(s.value="",s.disabled=!0),r&&(r.value="",r.disabled=!0),o&&(o.value=""),c&&(c.value=""),document.querySelectorAll(".accessory-cat-card").forEach(d=>d.classList.remove("active")),this.searchQuery="",this.activeMainType="all",this.selectedAccessoryCat=null;const a=document.getElementById("nav-parts"),l=document.getElementById("nav-accessories");a&&a.classList.remove("active"),l&&l.classList.remove("active"),this.activeFilters={conditions:[],priceMin:null,priceMax:null,merchantTypes:[],brands:[],make:"",model:"",year:"",partsCategory:"",accessoryCategory:""},this.syncUrlState(),this.renderCatalog(),this.fetchFilteredProductsBackend(),this.showToast("All marketplace filters reset","success")}filterByMainType(e){this.activeMainType=e,this.selectedAccessoryCat=null,this.searchQuery="";const t=document.getElementById("main-search-input");t&&(t.value="");const n=document.getElementById("nav-parts"),s=document.getElementById("nav-accessories");e==="parts"?(n&&n.classList.add("active"),s&&s.classList.remove("active"),this.setSearchMode("parts")):e==="accessories"?(n&&n.classList.remove("active"),s&&s.classList.add("active"),this.setSearchMode("accessories")):(n&&n.classList.remove("active"),s&&s.classList.remove("active")),this.syncUrlState(),this.renderCatalog(),this.scrollToMarketplace()}filterByCategory(e){this.activeMainType="parts",this.activeFilters.partsCategory="",this.activeFilters.make="",this.activeFilters.model="",this.activeFilters.year="",this.activeFilters.brands=[],this.searchQuery=e.toLowerCase().trim();const t=document.getElementById("main-search-input");t&&(t.value=e);const n=document.getElementById("nav-parts"),s=document.getElementById("nav-accessories");n&&n.classList.add("active"),s&&s.classList.remove("active"),this.renderCatalog(),this.scrollToMarketplace(),this.showToast(`Showing "${e}" & related parts`,"success")}filterByBrand(e){this.toggleBrandSearchModal(!0,e)}renderBrandFilters(){const e=document.getElementById("brand-filter-list");if(!e)return;const t=["Toyota","Volkswagen","Hyundai","Ford","Honda","Nissan","Chevrolet","Kia","Suzuki","Mercedes-Benz","BMW","Audi","Mazda","Mitsubishi","BYD"];e.innerHTML="",t.forEach((n,s)=>{const r=document.createElement("label");r.className="filter-checkbox-label",r.innerHTML=`
        <input type="checkbox" class="brand-filter-checkbox" value="${n}" onchange="app.onFilterChange()"> ${n}
      `,e.appendChild(r)})}onSortChange(){this.sortOption=document.getElementById("catalog-sort-select").value,this.renderCatalog()}renderCatalog(){const e=document.getElementById("catalog-products-container");if(!e)return;let t=this.products.filter(s=>{if(s.status!=="Live"||this.activeMainType==="parts"&&s.mainType!=="parts"||this.activeMainType==="accessories"&&s.mainType!=="accessories")return!1;if(this.activeMainType==="parts"&&this.activeFilters.make){const r=this.activeFilters.make.toLowerCase(),o=(s.brand||"").toLowerCase()===r,c=s.compatibility==="Universal Fit"||s.compatibility_text==="Universal Fit";let a=!1;if(Array.isArray(s.compatibility)&&s.compatibility.length>0&&(a=s.compatibility.some(l=>{const d=(l.make||"").toLowerCase()===r,h=!this.activeFilters.model||(l.model||"").toLowerCase().includes(this.activeFilters.model.toLowerCase())||this.activeFilters.model.toLowerCase().includes((l.model||"").toLowerCase());let u=!0;if(this.activeFilters.year){const f=(l.years||"").trim();if(f==="All Years"||!f)u=!0;else if(f.includes("-")){const p=f.split("-"),y=parseInt(p[0]),g=parseInt(p[1]),w=parseInt(this.activeFilters.year);u=!isNaN(y)&&!isNaN(g)&&!isNaN(w)?w>=y&&w<=g:!0}else u=f.includes(this.activeFilters.year)}return d&&h&&u})),!a&&!o&&!c)return!1}if(this.activeMainType==="parts"&&this.activeFilters.partsCategory&&s.category!==this.activeFilters.partsCategory||this.activeMainType==="accessories"&&this.activeFilters.accessoryCategory&&s.category!==this.activeFilters.accessoryCategory||this.searchQuery&&!this.matchesSearchQuery(s,this.searchQuery)||this.activeFilters.conditions.length>0&&!this.activeFilters.conditions.includes(s.condition)||this.activeFilters.priceMin!==null&&s.price<this.activeFilters.priceMin||this.activeFilters.priceMax!==null&&s.price>this.activeFilters.priceMax)return!1;if(this.activeFilters.merchantTypes.length>0){const r=s.merchant.verified,o=this.activeFilters.merchantTypes.includes("Verified")&&r,c=this.activeFilters.merchantTypes.includes("Independent")&&!r;if(!o&&!c)return!1}return!(this.activeFilters.brands.length>0&&!(this.activeFilters.brands.includes(s.brand)||Array.isArray(s.compatibility)&&s.compatibility.some(o=>this.activeFilters.brands.includes(o.make))||s.compatibility==="Universal Fit"))});this.sortOption==="price-low"?t.sort((s,r)=>s.price-r.price):this.sortOption==="price-high"?t.sort((s,r)=>r.price-s.price):this.sortOption==="newest"?t.sort((s,r)=>String(r.id).localeCompare(String(s.id))):t.sort((s,r)=>s.stock==="In Stock"&&r.stock!=="In Stock"?-1:s.stock!=="In Stock"&&r.stock==="In Stock"?1:s.merchant.verified&&!r.merchant.verified?-1:!s.merchant.verified&&r.merchant.verified?1:0),this.updatePriceHistogramAndFacets(t);const n=document.getElementById("catalog-results-count");if(n&&(n.textContent=`Showing ${t.length} product${t.length===1?"":"s"}`),t.length===0){const s=this.activeFilters.priceMin!==null||this.activeFilters.priceMax!==null,r=s?`in price range ${this.activeFilters.priceMin!==null?`GHS ${this.activeFilters.priceMin}`:"GHS 0"} – ${this.activeFilters.priceMax!==null?`GHS ${this.activeFilters.priceMax}`:"Above"}`:"";e.innerHTML=`
        <div class="empty-catalog" id="catalog-empty-view">
          <span class="empty-icon"><i class="fa-solid fa-tags"></i></span>
          <h3>No Listings Found ${r?`<small style="display:block; font-size:0.9rem; color:var(--text-muted); margin-top:0.4rem;">${r}</small>`:""}</h3>
          <p>Try broadening your price range or clearing the active filters.</p>
          <div style="display:flex; gap:0.5rem; justify-content:center; margin-top:1rem;">
            ${s?'<button class="btn btn-primary" onclick="app.clearPriceFilter()">Clear Price Filter</button>':""}
            <button class="btn btn-secondary" onclick="app.resetAllFilters()">Reset All Filters</button>
          </div>
        </div>
      `;return}e.innerHTML="",t.forEach(s=>{const r=document.createElement("div");r.className="product-card",r.id=`card-${s.id}`,r.setAttribute("onclick",`app.openPdp('${s.id}')`);const o=s.condition==="New"?"badge-new":s.condition==="Used"?"badge-used":"badge-refurbished",c=s.stock==="In Stock"?"badge-instock":"badge-oos",a=s.merchant.verified?`<span class="verified-dealer-tag" id="verified-card-${s.id}"><i class="fa-solid fa-circle-check"></i> Verified Dealer</span>`:"";let l="";Array.isArray(s.compatibility)?l=s.compatibility.map(h=>{const u=(h.make||"").trim(),f=(h.model||"").trim();return u&&f.toLowerCase().startsWith(u.toLowerCase())?f:`${u} ${f}`.trim()}).join(", "):l=s.compatibility;let d="";s.images&&s.images.length>0?d=`<img src="${s.images[0]}" alt="${s.name}" loading="lazy">`:d=`
          <div class="card-image-fallback">
            <span class="card-fallback-icon">${s.mainType==="parts"?"⚙️":"🔌"}</span>
            <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase;">${s.brand}</span>
          </div>
        `,r.innerHTML=`
        <div class="product-card-img">
          ${d}
          <div class="product-card-badges">
            <span class="badge ${o}">${s.condition}</span>
            <span class="badge ${c}">${s.stock}</span>
          </div>
        </div>
        <div class="product-card-body">
          <span class="product-card-category">${s.category}</span>
          <h4 class="product-card-name" title="${s.name}">${s.name}</h4>
          <span class="product-card-compatibility" title="${l}">
            <i class="fa-solid fa-car"></i> ${l}
          </span>
          <div class="product-card-footer">
            <div class="product-card-price">
              <span class="price-currency">GHS</span>
              <span class="price-value">₵${s.price}</span>
            </div>
            ${a}
          </div>
        </div>
      `,e.appendChild(r)})}scrollToMarketplace(){const e=document.getElementById("marketplace-grid-section");e&&e.scrollIntoView({behavior:"smooth"})}toggleMobileFilters(e){const t=document.getElementById("advanced-filters-sidebar"),n=document.getElementById("sidebar-close-mobile");t&&(e?(t.style.display="block",n&&(n.style.display="block")):(t.style.display="none",n&&(n.style.display="none")))}toggleFaq(e){const t=document.getElementById(`faq-item-${e}`),n=document.getElementById(`faq-content-${e}`);if(!t||!n)return;const s=t.classList.contains("active");document.querySelectorAll(".faq-item").forEach(r=>{r.classList.remove("active");const o=r.querySelector(".faq-content");o&&(o.style.display="none")}),s||(t.classList.add("active"),n.style.display="block")}openPdp(e){const t=this.products.find(v=>v.id==e||String(v.id)===String(e));if(!t)return;this.activePdpProduct=t,this.activePdpImageIndex=0;const n=document.getElementById("pdp-title-text");n&&(n.textContent=t.name);const s=document.getElementById("pdp-category-text");s&&(s.textContent=t.category);const r=document.getElementById("pdp-price-text");r&&(r.textContent=`₵${t.price}.00`);const o=document.getElementById("pdp-badge-condition");o&&(o.className="badge "+(t.condition==="New"?"badge-new":t.condition==="Used"?"badge-used":"badge-refurbished"),o.textContent=t.condition);const c=document.getElementById("pdp-badge-stock");c&&(c.className="badge "+(t.stock==="In Stock"?"badge-instock":"badge-oos"),c.textContent=t.stock);const a=document.getElementById("pdp-fitment-list");if(a)if(a.innerHTML="",Array.isArray(t.compatibility)&&t.compatibility.length>0)t.compatibility.forEach(v=>{const T=(v.make||"").trim(),b=(v.model||"").trim(),A=T&&b.toLowerCase().startsWith(T.toLowerCase())?b:`${T} ${b}`.trim();a.innerHTML+=`<span class="compatibility-item">${A} (${v.years||""})</span>`});else{const v=typeof t.compatibility=="string"?t.compatibility:"Universal Fit";a.innerHTML=`<span class="compatibility-item" style="background-color: #ECEFEE; color: #1E6B54; border: 1px solid rgba(30,107,84,0.15); font-weight:700;"><i class="fa-solid fa-circle-check"></i> ${v}</span>`}let l=t.merchant&&(t.merchant.shopName||t.merchant.shop_name)||"Abossey Okai Merchant",d=t.merchant&&t.merchant.since||"2024",h=t.merchant&&t.merchant.location||"Abossey Okai, Accra",u=t.merchant&&t.merchant.verified||!1;if(Array.isArray(this.merchants)&&this.merchants.length>0){const v=this.merchants.find(T=>t.merchant_id&&T.id===t.merchant_id||t.merchant&&t.merchant.id&&T.id===t.merchant.id||T.shopName&&l&&T.shopName.toLowerCase()===l.toLowerCase());v&&(l=v.shopName||l,d=v.since||d,h=v.location||h,u=v.verified??u)}const f=document.getElementById("pdp-merchant-avatar");f&&(f.textContent=l.charAt(0).toUpperCase());const p=document.getElementById("pdp-merchant-name");p&&(p.textContent=l);const y=document.getElementById("pdp-merchant-since");y&&(y.textContent=`Member since ${d}`);const g=document.getElementById("pdp-merchant-location");if(g){const v=g.querySelector("span");v&&(v.textContent=h)}const w=document.getElementById("pdp-merchant-verified-badge");w&&(w.style.display=u?"inline-flex":"none"),this.renderPdpGallery();const m=document.getElementById("pdp-overlay-modal");m&&(m.style.display="flex",document.body.style.overflow="hidden")}closePdp(){document.getElementById("pdp-overlay-modal").style.display="none",document.body.style.overflow="",this.activePdpProduct=null}renderPdpGallery(){const e=document.getElementById("pdp-gallery-main"),t=document.getElementById("pdp-gallery-thumbnails"),n=this.activePdpProduct;let s=n.images;(!s||s.length===0)&&(s=["mock_main_details","mock_details_side","mock_details_back","mock_details_specs","mock_details_box"]);const r=s[this.activePdpImageIndex];r.startsWith("mock_")||r.startsWith("data:")?r.startsWith("data:")?e.innerHTML=`<img src="${r}" alt="${n.name}">`:e.innerHTML=`
          <div class="card-image-fallback" style="height: 100%;">
            <span class="card-fallback-icon" style="font-size:4.5rem;">${n.mainType==="parts"?"⚙️":"🔌"}</span>
            <span style="font-size:0.95rem; font-weight:700; text-transform:uppercase; color:var(--text-muted);">${r.replace("mock_","").replace("_"," ")} view</span>
            <span style="font-size:0.85rem; font-weight:600; color:var(--primary-color);">${n.brand} OEM Part</span>
          </div>
        `:e.innerHTML=`<img src="${r}" alt="${n.name}">`,t.innerHTML="",s.forEach((o,c)=>{const a=document.createElement("div");a.className=`pdp-thumbnail ${c===this.activePdpImageIndex?"active":""}`,a.id=`pdp-thumb-${c}`,o.startsWith("mock_")||o.startsWith("data:")?o.startsWith("data:")?a.innerHTML=`<img src="${o}" alt="Thumb">`:a.innerHTML=`
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#F1F5F9; font-size:0.8rem; font-weight:700; color:var(--text-muted);">
              IMG ${c+1}
            </div>
          `:a.innerHTML=`<img src="${o}" alt="Thumb">`,a.addEventListener("click",()=>{this.activePdpImageIndex=c,this.renderPdpGallery()}),t.appendChild(a)})}contactMerchantWhatsApp(){const e=this.activePdpProduct;if(!e)return;let t="Abossey Okai Merchant",n="";if(e.merchant&&(t=e.merchant.shopName||e.merchant.shop_name||t,n=e.merchant.phone||""),Array.isArray(this.merchants)&&this.merchants.length>0){const u=this.merchants.find(f=>e.merchant_id&&f.id===e.merchant_id||e.merchant&&e.merchant.id&&f.id===e.merchant.id||f.shopName&&t&&f.shopName.toLowerCase()===t.toLowerCase());u&&(u.shopName&&(t=u.shopName),u.phone&&(n=u.phone))}if(!n){this.showToast("Merchant WhatsApp number is not configured.","warning");return}let s=String(n).replace(/[^0-9]/g,"");if(s.startsWith("00")&&(s=s.substring(2)),s.startsWith("0")&&s.length===10?s="233"+s.substring(1):s.length===9&&(s="233"+s),s.length<8){this.showToast("Invalid merchant phone number.","error");return}const r=e.name||"Product",o=typeof e.price=="number"?e.price.toLocaleString():e.price||"0",c=`Hello ${t}, I saw your listing for "${r}" (₵${o}) on Abossey Okai Marketplace. Is it still available?`,a=encodeURIComponent(c),l=`https://wa.me/${s}?text=${a}`;if(e.id)try{fetch(`${E}/api/products/${e.id}/lead`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"whatsapp"})}).catch(()=>{})}catch{}const d=parseInt(localStorage.getItem("ao_lead_whatsapp")||"0")+1;localStorage.setItem("ao_lead_whatsapp",d.toString()),this.showToast(`Opening WhatsApp chat with ${t}...`,"success");const h=window.open(l,"_blank");(!h||h.closed||typeof h.closed>"u")&&(window.location.href=l)}locateMerchantShop(){const e=this.activePdpProduct;if(!e)return;const t=e.merchant.coordinates||"5.5562, -0.2284",n=e.merchant.shopName||"Abossey Okai Merchant",s=t.split(",").map(l=>parseFloat(l.trim())),r=s[0]||5.5562,o=s[1]||-.2284,c=/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)&&(navigator.maxTouchPoints>1||/iPhone|iPad|iPod/.test(navigator.userAgent));let a="";if(c?a=`https://maps.apple.com/?ll=${r},${o}&q=${encodeURIComponent(n)}`:a=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n+", "+t)}`,e.id)try{fetch(`${E}/api/products/${e.id}/lead`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"maps"})}).catch(()=>{})}catch{}this.showToast(`Opening directions to ${n}...`,"success"),window.open(a,"_blank")}reportListing(){if(!this.activePdpProduct)return;const e=localStorage.getItem("ao_reported_listings"),t=e?JSON.parse(e):[],n={id:"rep-"+Date.now(),productId:this.activePdpProduct.id,productName:this.activePdpProduct.name,shopName:this.activePdpProduct.merchant.shopName,reason:"Reported by customer for verification",date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})};t.push(n),localStorage.setItem("ao_reported_listings",JSON.stringify(t)),this.showToast("Listing reported! Our administrators will verify this dealer's product shortly.","success"),this.closePdp()}toggleMerchantPortal(){this.isAdminLoggedIn?this.switchAppView(this.currentView==="admin-dashboard"?"storefront":"admin-dashboard"):this.isMerchantLoggedIn?this.switchAppView(this.currentView==="dashboard"?"storefront":"dashboard"):this.isCustomerLoggedIn||this.openMerchantAuth()}switchAppView(e){this.currentView=e;const t=document.getElementById("storefront-view-panel"),n=document.getElementById("merchant-dashboard-panel"),s=document.getElementById("admin-dashboard-panel"),r=document.getElementById("all-brands-view-panel");e==="dashboard"?(t.style.display="none",n.style.display="grid",s&&(s.style.display="none"),r&&(r.style.display="none"),this.renderMerchantProfile(),this.renderMerchantInventory(),this.renderMerchantMetrics()):e==="admin-dashboard"?(t.style.display="none",n.style.display="none",s&&(s.style.display="grid"),r&&(r.style.display="none"),this.renderAdminOverview()):e==="all-brands"?(t.style.display="none",n.style.display="none",s&&(s.style.display="none"),r&&(r.style.display="block"),this.renderBrandsView()):(t.style.display="block",n.style.display="none",s&&(s.style.display="none"),r&&(r.style.display="none"),this.renderBrandFilters(),this.renderCatalog()),this.updatePortalButtonState(),window.scrollTo({top:0,left:0,behavior:"instant"}),window.scrollTo(0,0)}openMerchantAuth(e=!1){document.getElementById("auth-modal").style.display="flex",this.showAuthView("initial")}closeMerchantAuth(){document.getElementById("auth-modal").style.display="none",document.getElementById("auth-phone-input").value="";const e=document.getElementById("auth-sms-input");e&&(e.value="");const t=document.getElementById("auth-sms-code-group");t&&(t.style.display="none");const n=document.getElementById("auth-submit-btn");n&&(n.textContent="Send Verification Code");const s=document.getElementById("auth-google-email-input");s&&(s.value="");const r=document.getElementById("auth-admin-password-input");r&&(r.value=""),this.showAuthView("initial")}startGoogleSignIn(){const e=document.getElementById("auth-google-email-input");e&&e.focus()}showAuthView(e){e==="google-email"&&(e="initial");const t=document.getElementById("auth-view-initial"),n=document.getElementById("auth-view-google-email"),s=document.getElementById("auth-view-admin-password");t&&(t.style.display=e==="initial"?"block":"none"),n&&(n.style.display="none"),s&&(s.style.display=e==="admin-password"?"block":"none")}async handleGoogleSSOClick(){const e=new U;e.setCustomParameters({prompt:"select_account"}),this.showToast("Opening Google Sign-In...","info");try{let t;try{t=await Ut(le,e)}catch(c){if(c.message&&c.message.includes("closing")||c.code==="auth/internal-error")console.warn("IndexedDB closing error encountered. Retrying with in-memory persistence...",c),await ot(le,Re).catch(()=>{}),t=await Ut(le,e);else throw c}const s=await t.user.getIdToken();this.showToast("Verifying Google account...","info");const r=await fetch(`${E}/api/auth/google`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({credential:s})}),o=await r.json();if(!r.ok){this.showToast(o.error||"Google authentication failed","error");return}o.token&&(localStorage.setItem("ao_jwt_token",o.token),o.user.role==="admin"?(this.isAdminLoggedIn=!0,this.isMerchantLoggedIn=!1,this.isCustomerLoggedIn=!1,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("admin-dashboard"),await this.loadBackendData(),this.showToast(`Welcome, Admin ${o.user.full_name||o.user.email}!`,"success")):o.user.role==="merchant"&&o.merchantProfile?(this.isMerchantLoggedIn=!0,this.isAdminLoggedIn=!1,this.isCustomerLoggedIn=!1,this.merchantProfile=this.normalizeMerchantProfile(o.merchantProfile),this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("dashboard"),await this.loadBackendData(),this.showToast(`Welcome back, ${o.merchantProfile.shop_name||"Merchant"}!`,"success")):(this.isCustomerLoggedIn=!0,this.isMerchantLoggedIn=!1,this.isAdminLoggedIn=!1,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("storefront"),this.showToast(`Welcome, ${o.user.full_name||o.user.email}! Enjoy browsing.`,"success")),this.updatePortalButtonState())}catch(t){if(t.code==="auth/popup-closed-by-user"){console.log("Google sign-in popup closed by user");return}console.error("Google auth error:",t);const n=t.message||t.code||"Popup restricted";this.showToast(`Google Sign-In Notice: ${n}`,"warning");const s=document.getElementById("auth-google-email-input");s&&s.focus()}}handleGoogleEmailSubmit(e){e.preventDefault();const t=document.getElementById("auth-google-email-input").value.trim().toLowerCase();if(t==="korantenghenry2012@gmail.com"){this.showAuthView("admin-password");const n=document.getElementById("auth-admin-password-input");n&&n.focus()}else this.showToast("Authenticating with database...","info"),fetch(`${E}/api/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:"merchant123"})}).then(n=>n.json()).then(n=>{if(n.error&&n.error!=="Invalid credentials"){this.showToast(n.error,"error");return}n.token?(localStorage.setItem("ao_jwt_token",n.token),n.user.role==="merchant"&&n.merchantProfile?(this.isMerchantLoggedIn=!0,this.isAdminLoggedIn=!1,this.isCustomerLoggedIn=!1,this.merchantProfile=this.normalizeMerchantProfile(n.merchantProfile),this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("dashboard"),this.showToast(`Welcome back, ${this.merchantProfile.shopName||this.merchantProfile.shop_name}!`,"success")):(this.isCustomerLoggedIn=!0,this.isMerchantLoggedIn=!1,this.isAdminLoggedIn=!1,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("storefront"),this.showToast(`Welcome! Signed in successfully as ${t}`,"success"))):fetch(`${E}/api/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:"customer123",role:"customer"})}).then(s=>s.json()).then(s=>{s.token&&localStorage.setItem("ao_jwt_token",s.token),this.isCustomerLoggedIn=!0,this.isMerchantLoggedIn=!1,this.isAdminLoggedIn=!1,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("storefront"),this.showToast(`Welcome! Signed in successfully as ${t}`,"success")}).catch(()=>{this.isCustomerLoggedIn=!0,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("storefront"),this.showToast(`Welcome! Signed in successfully as ${t}`,"success")})}).catch(()=>{const n=this.merchants.find(s=>s.email&&s.email.toLowerCase()===t);n?(this.isMerchantLoggedIn=!0,this.merchantProfile={...n},this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("dashboard"),this.showToast(`Welcome back, ${this.merchantProfile.shopName||this.merchantProfile.shop_name}!`,"success")):(this.isCustomerLoggedIn=!0,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("storefront"),this.showToast(`Welcome! Signed in successfully as ${t}`,"success"))})}toggleAdminPasswordVisibility(){const e=document.getElementById("auth-admin-password-input"),t=document.getElementById("toggle-admin-pass-btn");!e||!t||(e.type==="password"?(e.type="text",t.classList.remove("fa-eye-slash"),t.classList.add("fa-eye")):(e.type="password",t.classList.remove("fa-eye"),t.classList.add("fa-eye-slash")))}handleAdminPasswordSubmit(e){e.preventDefault();const t=document.getElementById("auth-admin-password-input").value;this.showToast("Verifying admin credentials with Neon DB...","info"),fetch(`${E}/api/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:"korantenghenry2012@gmail.com",password:t})}).then(n=>n.json()).then(n=>{n.token&&n.user&&n.user.role==="admin"?(localStorage.setItem("ao_jwt_token",n.token),this.isAdminLoggedIn=!0,this.isMerchantLoggedIn=!1,this.isCustomerLoggedIn=!1,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("admin-dashboard"),this.showToast("Welcome back, Administrator Kwame!","success")):this.showToast("Incorrect password. Please try again.","error")}).catch(()=>{t==="G@laxy2012"?(this.isAdminLoggedIn=!0,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("admin-dashboard"),this.showToast("Welcome back, Administrator Kwame!","success")):this.showToast("Incorrect password. Please try again.","error")})}simulatePhoneAuth(e){e.preventDefault();const t=document.getElementById("auth-phone-input").value.trim(),n=document.getElementById("auth-sms-code-group"),s=document.getElementById("auth-submit-btn"),r=t.replace(/[^0-9]/g,"");if(n.style.display==="none"){this.showToast(`SMS Verification Code sent to ${t}`,"success"),n.style.display="block",s.textContent="Verify & Log In";const o=document.getElementById("auth-sms-input");o&&(o.required=!0,o.focus())}else{if(document.getElementById("auth-sms-input").value.trim().length<4){this.showToast("Please enter a valid verification code.","error");return}this.showToast("Verifying code with backend...","info"),fetch(`${E}/api/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:r,password:"merchant123"})}).then(c=>c.json()).then(c=>{c.token?(localStorage.setItem("ao_jwt_token",c.token),c.user.role==="merchant"&&c.merchantProfile?(this.isMerchantLoggedIn=!0,this.isAdminLoggedIn=!1,this.isCustomerLoggedIn=!1,this.merchantProfile=this.normalizeMerchantProfile(c.merchantProfile),this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("dashboard"),this.showToast(`Welcome back, ${this.merchantProfile.shopName}!`,"success")):(this.isCustomerLoggedIn=!0,this.isMerchantLoggedIn=!1,this.isAdminLoggedIn=!1,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("storefront"),this.showToast(`Signed in successfully with ${t}!`,"success"))):fetch(`${E}/api/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:r,password:"customer123",role:"customer"})}).then(a=>a.json()).then(a=>{a.token&&localStorage.setItem("ao_jwt_token",a.token),this.isCustomerLoggedIn=!0,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("storefront"),this.showToast(`Signed in successfully with ${t}!`,"success")}).catch(()=>{this.isCustomerLoggedIn=!0,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("storefront"),this.showToast(`Signed in successfully with ${t}!`,"success")})}).catch(()=>{const c=this.merchants.find(a=>a.phone.replace(/[^0-9]/g,"")===r||a.phone.includes(t));c?(this.isMerchantLoggedIn=!0,this.merchantProfile={...c},this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("dashboard"),this.showToast(`Welcome back, ${this.merchantProfile.shopName}!`,"success")):(this.isCustomerLoggedIn=!0,this.saveMerchantProfileToStorage(),this.closeMerchantAuth(),this.switchAppView("storefront"),this.showToast(`Signed in successfully with ${t}!`,"success"))})}}logoutMerchant(){localStorage.removeItem("ao_jwt_token"),this.isMerchantLoggedIn=!1,this.merchantProfile=null,this.isAdminLoggedIn=!1,this.isCustomerLoggedIn=!1,this.saveMerchantProfileToStorage(),this.switchAppView("storefront"),this.showToast("Logged out successfully","success")}openOnboarding(e=""){const t=document.getElementById("onboarding-modal");if(t.style.display="flex",e){const n=document.getElementById("onboard-phone");n&&(n.value=e)}this.goToOnboardingStep(1)}closeOnboarding(){const e=document.getElementById("onboarding-modal");e.style.display="none",document.getElementById("onboarding-form").reset(),this.goToOnboardingStep(1)}cancelOnboarding(){this.closeOnboarding(),this.showToast("Setup cancelled. You can register again anytime.","info")}goToOnboardingStep(e){const t=document.getElementById("onboarding-step-1"),n=document.getElementById("onboarding-step-2"),s=document.getElementById("onboard-step-1-dot"),r=document.getElementById("onboard-step-2-dot"),o=document.getElementById("onboard-step-line"),c=document.getElementById("onboarding-title-text"),a=document.getElementById("onboarding-subtitle-text");if(e===1)t.style.display="block",n.style.display="none",s.className="step-dot active",r.className="step-dot",o.className="step-line",c.textContent="Welcome! Tell us about yourself",a.textContent="This helps buyers find and trust your shop";else if(e===2){const l=document.getElementById("onboard-fullname").value.trim(),d=document.getElementById("onboard-phone").value.trim();if(!l){this.showToast("Please enter your full name.","error"),document.getElementById("onboard-fullname").focus();return}if(!d){this.showToast("Please enter your phone number.","error"),document.getElementById("onboard-phone").focus();return}t.style.display="none",n.style.display="block",s.className="step-dot completed",r.className="step-dot active",o.className="step-line active",c.textContent="Set up your shop",a.textContent="Tell buyers where to find you in Abossey Okai"}}submitOnboarding(e){e.preventDefault();const t=document.getElementById("onboard-fullname").value.trim(),n=document.getElementById("onboard-email").value.trim(),s=document.getElementById("onboard-phone").value.trim(),r=document.getElementById("onboard-shop-name").value.trim(),o=document.getElementById("onboard-shop-location").value.trim(),c=document.getElementById("onboard-shop-specialty").value,a=document.getElementById("onboard-shop-desc").value.trim();if(!r){this.showToast("Please enter your shop name.","error"),document.getElementById("onboard-shop-name").focus();return}if(!o){this.showToast("Please enter your shop location.","error"),document.getElementById("onboard-shop-location").focus();return}this.showToast("Creating merchant profile in Neon DB...","info"),fetch(`${E}/api/auth/register-merchant`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n||`${r.toLowerCase().replace(/[^a-z0-9]/g,"")}@gmail.com`,phone:s||"+233240000000",password:"merchant123",full_name:t,shop_name:r,shop_location:o,shop_coordinates:"5.5565, -0.2282",shop_description:a||`${r} — Quality auto parts and accessories at Abossey Okai.`,shop_specialty:c})}).then(l=>l.json()).then(l=>{l.token&&localStorage.setItem("ao_jwt_token",l.token),this.merchantProfile=this.normalizeMerchantProfile(l.merchantProfile)||{shopName:r,ownerName:t,email:n,phone:s,location:o,coordinates:"5.5565, -0.2282",description:a,specialty:c,verified:!1,since:"Jan 2026"},this.isMerchantLoggedIn=!0,localStorage.setItem("ao_onboarding_complete","true"),this.saveMerchantProfileToStorage(),this.closeOnboarding(),this.updatePortalButtonState(),this.switchAppView("dashboard"),this.showToast(`Welcome to Abbossey Okai Magazine, ${t}! Your shop "${r}" is all set.`,"success")}).catch(()=>{this.merchantProfile={shopName:r,ownerName:t,email:n,phone:s,location:o,coordinates:"5.5565, -0.2282",description:a,specialty:c,verified:!1,since:"Jan 2026"},this.isMerchantLoggedIn=!0,localStorage.setItem("ao_onboarding_complete","true"),this.saveMerchantProfileToStorage(),this.closeOnboarding(),this.updatePortalButtonState(),this.switchAppView("dashboard"),this.showToast(`Welcome to Abbossey Okai Magazine, ${t}! Your shop "${r}" is all set.`,"success")})}updatePortalButtonState(){const e=document.getElementById("merchant-portal-btn");if(e){if(this.isCustomerLoggedIn){e.style.display="none";return}e.style.display="inline-flex",this.isAdminLoggedIn?this.currentView==="admin-dashboard"?(e.innerHTML="View Marketplace",e.className="btn btn-secondary"):(e.innerHTML="Admin Panel",e.className="btn btn-primary"):this.isMerchantLoggedIn?this.currentView==="dashboard"?(e.innerHTML="View Marketplace",e.className="btn btn-secondary"):(e.innerHTML="Merchant Center",e.className="btn btn-primary"):(e.innerHTML="Login",e.className="btn btn-primary")}}switchDashboardTab(e){var t,n,s;document.querySelectorAll(".dashboard-menu-item").forEach(r=>r.classList.remove("active")),document.querySelectorAll(".dashboard-tab-panel").forEach(r=>r.style.display="none"),e==="inventory"?((t=document.getElementById("db-menu-inventory"))==null||t.classList.add("active"),document.getElementById("db-panel-inventory").style.display="block",this.renderMerchantInventory()):e==="profile"?((n=document.getElementById("db-menu-profile"))==null||n.classList.add("active"),document.getElementById("db-panel-profile").style.display="block",this.renderMerchantProfile()):e==="locations"&&((s=document.getElementById("db-menu-locations"))==null||s.classList.add("active"),document.getElementById("db-panel-locations").style.display="block",this.renderMerchantLocationTab())}renderMerchantLocationTab(){const e=this.merchantProfile||{shopName:"My Auto Store",location:"Abossey Okai Central, Accra, Ghana",coordinates:"5.5562, -0.2284"};let t=5.5562,n=-.2284,s="manual_pin",r=15,o=e.location||"Abossey Okai, Accra, Greater Accra, Ghana",c="",a="",l=e.location||"";if(e.location_data)try{const m=typeof e.location_data=="string"?JSON.parse(e.location_data):e.location_data;m.latitude&&(t=parseFloat(m.latitude)),m.longitude&&(n=parseFloat(m.longitude)),m.source&&(s=m.source),m.accuracy_meters&&(r=m.accuracy_meters),m.formatted_address&&(o=m.formatted_address),m.landmarks&&(c=m.landmarks),m.stall_number&&(a=m.stall_number),m.custom_location_text&&(l=m.custom_location_text)}catch{}else if(e.coordinates){const m=e.coordinates.split(",").map(v=>parseFloat(v.trim()));m.length===2&&!isNaN(m[0])&&!isNaN(m[1])&&(t=m[0],n=m[1])}this.activeMerchantLocation={latitude:t,longitude:n,accuracy_meters:r,source:s,formatted_address:o,landmarks:c,stall_number:a,custom_location_text:l};const d=document.getElementById("merchant-stall-number"),h=document.getElementById("merchant-landmarks"),u=document.getElementById("merchant-custom-location-text");d&&(d.value=a),h&&(h.value=c),u&&(u.value=l);const f=document.getElementById("merchant-coords-display"),p=document.getElementById("merchant-address-display"),y=document.getElementById("merchant-accuracy-display"),g=document.getElementById("merchant-source-display");if(f&&(f.textContent=`${t.toFixed(6)}, ${n.toFixed(6)}`),p&&(p.textContent=o),y&&(y.textContent=`±${r} m (${r<=25?"High Precision":"Approximate"})`),g){const m=s==="gps"?"badge-gps":s==="search"?"badge-search":s==="preset"?"badge-source":"badge-manual",v=s==="gps"?"GPS Geolocation":s==="search"?"Search Place":s==="preset"?"Preset Area":"Manual Pin";g.innerHTML=`<span class="badge-source ${m}">${v}</span>`}const w=document.getElementById("merchant-google-maps-escape-hatch");w&&(w.href=`https://www.google.com/maps/search/?api=1&query=${t.toFixed(6)},${n.toFixed(6)}`),this.updateDirectionsDeepLinkPreview(t,n),setTimeout(()=>this.initMerchantLocationMap(),150)}initMerchantLocationMap(){var s,r,o,c;if(!document.getElementById("merchant-interactive-map")||typeof L>"u")return;const t=((s=this.activeMerchantLocation)==null?void 0:s.latitude)||5.5562,n=((r=this.activeMerchantLocation)==null?void 0:r.longitude)||-.2284;try{if(this._merchantMap){this._merchantMap.invalidateSize(),this._merchantMarker&&this._merchantMarker.setLatLng([t,n]),this._merchantMap.setView([t,n],16);return}const a=L.map("merchant-interactive-map",{zoomControl:!0,attributionControl:!1}).setView([t,n],16);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(a);const l=L.divIcon({className:"leaflet-custom-merchant-pin",html:'<i class="fa-solid fa-location-dot" style="color:#002d62; font-size:2.4rem; filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35)); cursor:grab;"></i>',iconSize:[32,42],iconAnchor:[16,42],popupAnchor:[0,-42]}),d=L.marker([t,n],{icon:l,draggable:!0}).addTo(a),h=((o=this.merchantProfile)==null?void 0:o.shopName)||((c=this.merchantProfile)==null?void 0:c.shop_name)||"Shop Location";d.bindPopup(`<b>${h}</b><br>Drag pin to adjust exact stall location.`).openPopup(),d.on("dragend",()=>{const u=d.getLatLng();this.updateMerchantMapLocation(u.lat,u.lng,"manual_pin")}),a.on("click",u=>{d.setLatLng(u.latlng),this.updateMerchantMapLocation(u.latlng.lat,u.latlng.lng,"manual_pin")}),this._merchantMap=a,this._merchantMarker=d,this.setupMerchantMapSearch(),setTimeout(()=>a.invalidateSize(),300)}catch(a){console.warn("Leaflet map initialization warning:",a)}}updateMerchantMapLocation(e,t,n="manual_pin",s=null){if(typeof e!="number"||typeof t!="number"||isNaN(e)||isNaN(t))return;const r=s!==null?Math.round(s):15;this.activeMerchantLocation||(this.activeMerchantLocation={}),this.activeMerchantLocation.latitude=e,this.activeMerchantLocation.longitude=t,this.activeMerchantLocation.source=n,this.activeMerchantLocation.accuracy_meters=r;const o=document.getElementById("merchant-coords-display");o&&(o.textContent=`${e.toFixed(6)}, ${t.toFixed(6)}`);const c=document.getElementById("merchant-accuracy-display");c&&(c.textContent=`±${r} m (${r<=25?"High Precision":"Approximate"})`);const a=document.getElementById("merchant-map-accuracy-notice");a&&(n==="gps"&&r>100?a.style.display="flex":a.style.display="none");const l=document.getElementById("merchant-source-display");if(l){const h=n==="gps"?"badge-gps":n==="search"?"badge-search":n==="preset"?"badge-source":"badge-manual",u=n==="gps"?"GPS Geolocation":n==="search"?"Search Place":n==="preset"?"Preset Area":"Manual Pin";l.innerHTML=`<span class="badge-source ${h}">${u}</span>`}const d=document.getElementById("merchant-google-maps-escape-hatch");d&&(d.href=`https://www.google.com/maps/search/?api=1&query=${e.toFixed(6)},${t.toFixed(6)}`),this.updateDirectionsDeepLinkPreview(e,t),this._reverseGeocodeTimer&&clearTimeout(this._reverseGeocodeTimer),this._reverseGeocodeTimer=setTimeout(async()=>{var h,u,f,p;try{const y=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=18&addressdetails=1`,{headers:{"Accept-Language":"en"}});if(y.ok){const g=await y.json();if(g&&g.display_name){this.activeMerchantLocation.formatted_address=g.display_name;const w=document.getElementById("merchant-address-display");w&&(w.textContent=g.display_name);const m=document.getElementById("merchant-custom-location-text");if(m&&!m.value.trim()){const v=((h=g.address)==null?void 0:h.road)||((u=g.address)==null?void 0:u.suburb)||"Abossey Okai",T=((f=g.address)==null?void 0:f.city)||((p=g.address)==null?void 0:p.town)||"Accra";m.value=`${v}, ${T}`,this.activeMerchantLocation.custom_location_text=m.value}}}}catch(y){console.warn("Reverse geocode warning:",y)}},600)}setupMerchantMapSearch(){const e=document.getElementById("merchant-map-search-input"),t=document.getElementById("merchant-map-clear-search"),n=document.getElementById("merchant-map-search-results");if(!e||!n)return;let s=null;e.addEventListener("input",()=>{var c;const r=e.value.trim();if(t&&(t.style.display=r.length>0?"flex":"none"),clearTimeout(s),r.length<2){n.style.display="none",n.innerHTML="";return}const o=r.match(/^@?(-?\d+\.\d+)[,\s]+(-?\d+\.\d+)$/);if(o){const a=parseFloat(o[1]),l=parseFloat(o[2]);if(!isNaN(a)&&!isNaN(l)&&a>=-90&&a<=90&&l>=-180&&l<=180){n.innerHTML=`
            <div class="map-search-item" id="search-direct-coord-item">
              <i class="fa-solid fa-location-crosshairs"></i>
              <div>
                <strong>Jump to Coordinates: ${a.toFixed(5)}, ${l.toFixed(5)}</strong>
                <div style="font-size:0.75rem; color:#64748b;">Direct GPS point</div>
              </div>
            </div>
          `,n.style.display="block",(c=document.getElementById("search-direct-coord-item"))==null||c.addEventListener("click",()=>{this.jumpMerchantMapPreset(a,l,`Coordinates (${a.toFixed(4)}, ${l.toFixed(4)})`),n.style.display="none"});return}}s=setTimeout(async()=>{try{const a=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(r)}&countrycodes=gh&viewbox=-0.35,5.65,-0.10,5.50&bounded=0&limit=5&addressdetails=1`,{headers:{"Accept-Language":"en"}});if(a.ok){const l=await a.json();if(l.length===0){n.innerHTML='<div class="map-search-item" style="color:#64748b; cursor:default;">No location matches found in Ghana</div>',n.style.display="block";return}n.innerHTML="",l.forEach(d=>{const h=document.createElement("div");h.className="map-search-item",h.innerHTML=`
                <i class="fa-solid fa-location-dot"></i>
                <div>
                  <strong>${d.name||d.display_name.split(",")[0]}</strong>
                  <div style="font-size:0.75rem; color:#64748b;">${d.display_name}</div>
                </div>
              `,h.addEventListener("click",()=>{const u=parseFloat(d.lat),f=parseFloat(d.lon);this.jumpMerchantMapPreset(u,f,d.name||d.display_name.split(",")[0]),e.value=d.name||d.display_name.split(",")[0],n.style.display="none"}),n.appendChild(h)}),n.style.display="block"}}catch(a){console.warn("Geocoding search warning:",a)}},350)}),e.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),this.searchMerchantLocation())}),document.addEventListener("click",r=>{!e.contains(r.target)&&!n.contains(r.target)&&(n.style.display="none")})}searchMerchantLocation(){const e=document.getElementById("merchant-map-search-input"),t=e==null?void 0:e.value.trim();if(!t)return;const n=t.match(/^@?(-?\d+\.\d+)[,\s]+(-?\d+\.\d+)$/);if(n){const s=parseFloat(n[1]),r=parseFloat(n[2]);if(!isNaN(s)&&!isNaN(r)){this.jumpMerchantMapPreset(s,r,`Coordinates (${s.toFixed(4)}, ${r.toFixed(4)})`);return}}fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(t)}&countrycodes=gh&limit=1`,{headers:{"Accept-Language":"en"}}).then(s=>s.json()).then(s=>{if(s&&s.length>0){const r=parseFloat(s[0].lat),o=parseFloat(s[0].lon);this.jumpMerchantMapPreset(r,o,s[0].name||s[0].display_name.split(",")[0]),this.showToast(`Found: ${s[0].name||s[0].display_name.split(",")[0]}`,"success")}else this.showToast("No locations matching your search in Ghana were found.","warning")}).catch(()=>{this.showToast("Could not complete geocoding search. Please try again or click the map directly.","error")})}clearMerchantMapSearch(){const e=document.getElementById("merchant-map-search-input"),t=document.getElementById("merchant-map-clear-search"),n=document.getElementById("merchant-map-search-results");e&&(e.value=""),t&&(t.style.display="none"),n&&(n.style.display="none",n.innerHTML="")}jumpMerchantMapPreset(e,t,n,s=null){if(!(!this._merchantMap||!this._merchantMarker))if(this._merchantMarker.setLatLng([e,t]),this._merchantMap.setView([e,t],17,{animate:!0}),this.updateMerchantMapLocation(e,t,"preset"),document.querySelectorAll(".map-preset-chip").forEach(r=>r.classList.remove("active")),s)s.classList.add("active");else{const r=Array.from(document.querySelectorAll(".map-preset-chip")).find(o=>{const c=parseFloat(o.getAttribute("data-lat")),a=parseFloat(o.getAttribute("data-lng"));return Math.abs(c-e)<5e-4&&Math.abs(a-t)<5e-4});r&&r.classList.add("active")}}detectMerchantDeviceLocation(){if(!navigator.geolocation){this.showToast("Geolocation is not supported by your browser.","warning");return}this.showToast("Detecting your GPS position...","info");const e=document.getElementById("merchant-auto-gps-btn");e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Detecting GPS...'),navigator.geolocation.getCurrentPosition(t=>{e&&(e.disabled=!1,e.innerHTML='<i class="fa-solid fa-crosshairs"></i> Auto-Detect My Location (GPS)');const n=t.coords.latitude,s=t.coords.longitude,r=Math.round(t.coords.accuracy);this._merchantMap&&this._merchantMarker&&(this._merchantMarker.setLatLng([n,s]),this._merchantMap.setView([n,s],17,{animate:!0})),this.updateMerchantMapLocation(n,s,"gps",r),r>100?this.showToast(`GPS reading accurate to ±${r}m. Please drag the pin to confirm exact shop position.`,"warning"):this.showToast(`GPS position locked (±${r}m). Please confirm pin position.`,"success")},t=>{e&&(e.disabled=!1,e.innerHTML='<i class="fa-solid fa-crosshairs"></i> Auto-Detect My Location (GPS)');let n="Could not detect GPS position.";t.code===1?n="Location permission was denied in your browser.":t.code===2?n="GPS position is unavailable.":t.code===3&&(n="GPS request timed out."),this.showToast(n,"warning")},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})}onLocationDetailChange(){var s,r,o;const e=(s=document.getElementById("merchant-stall-number"))==null?void 0:s.value.trim(),t=(r=document.getElementById("merchant-landmarks"))==null?void 0:r.value.trim(),n=(o=document.getElementById("merchant-custom-location-text"))==null?void 0:o.value.trim();this.activeMerchantLocation&&(this.activeMerchantLocation.stall_number=e||null,this.activeMerchantLocation.landmarks=t||null,this.activeMerchantLocation.custom_location_text=n||null)}updateDirectionsDeepLinkPreview(e,t){var o;const n=document.getElementById("preview-google-directions-btn"),s=document.getElementById("preview-apple-directions-btn"),r=((o=this.merchantProfile)==null?void 0:o.shopName)||"Abossey Okai Merchant";n&&(n.href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r+", "+e.toFixed(6)+","+t.toFixed(6))}`),s&&(s.href=`https://maps.apple.com/?ll=${e.toFixed(6)},${t.toFixed(6)}&q=${encodeURIComponent(r)}`)}async saveMerchantLocation(){var a,l,d;if(!this.merchantProfile||!this.merchantProfile.id){this.showToast("Please log in as a merchant to update your shop location.","error");return}const e=this.activeMerchantLocation;if(!e||typeof e.latitude!="number"||typeof e.longitude!="number"){this.showToast("Please select a valid location on the map before saving.","error");return}if(e.latitude<4.5||e.latitude>11.5||e.longitude<-3.5||e.longitude>1.5){this.showToast("Selected coordinates fall outside Ghana. Please pinpoint a location within Ghana/Accra.","error");return}const t=(a=document.getElementById("merchant-stall-number"))==null?void 0:a.value.trim(),n=(l=document.getElementById("merchant-landmarks"))==null?void 0:l.value.trim(),s=(d=document.getElementById("merchant-custom-location-text"))==null?void 0:d.value.trim(),r={latitude:e.latitude,longitude:e.longitude,accuracy_meters:e.accuracy_meters||15,source:e.source||"manual_pin",formatted_address:e.formatted_address||"Abossey Okai, Accra, Ghana",stall_number:t||null,landmarks:n||null,custom_location_text:s||null},o=document.getElementById("save-location-top-btn"),c=document.getElementById("save-location-bottom-btn");o&&(o.disabled=!0,o.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Saving...'),c&&(c.disabled=!0,c.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Saving Location...');try{const h=localStorage.getItem("ao_jwt_token"),u=await fetch(`${E}/api/merchants/${this.merchantProfile.id}/location`,{method:"PUT",headers:{"Content-Type":"application/json",...h?{Authorization:`Bearer ${h}`}:{}},body:JSON.stringify(r)}),f=await u.json();if(!u.ok)throw new Error(f.error||"Failed to update shop location.");const p=`${e.latitude.toFixed(6)}, ${e.longitude.toFixed(6)}`,y=s||e.formatted_address||`Abossey Okai (${p})`;this.merchantProfile.coordinates=p,this.merchantProfile.latitude=e.latitude,this.merchantProfile.longitude=e.longitude,this.merchantProfile.location=y,this.merchantProfile.location_data=f.location_data||r,this.saveMerchantProfileToStorage();const g=document.getElementById("merchant-display-location");g&&(g.innerHTML=`<i class="fa-solid fa-location-dot"></i> ${y}`);const w=document.getElementById("settings-location"),m=document.getElementById("settings-coordinates");w&&(w.value=y),m&&(m.value=p),this.showToast("Shop location and map pinpoint saved successfully!","success")}catch(h){console.error("Save location error:",h);const u=`${e.latitude.toFixed(6)}, ${e.longitude.toFixed(6)}`,f=s||e.formatted_address||`Abossey Okai (${u})`;this.merchantProfile.coordinates=u,this.merchantProfile.latitude=e.latitude,this.merchantProfile.longitude=e.longitude,this.merchantProfile.location=f,this.merchantProfile.location_data=r,this.saveMerchantProfileToStorage(),this.showToast("Shop location saved locally.","success")}finally{o&&(o.disabled=!1,o.innerHTML='<i class="fa-solid fa-cloud-arrow-up"></i> Save Shop Location'),c&&(c.disabled=!1,c.innerHTML='<i class="fa-solid fa-check"></i> Save & Publish Shop Location')}}renderMerchantProfile(){if(!this.merchantProfile)return;const e=document.getElementById("merchant-display-shop-name");e&&(e.textContent=this.merchantProfile.shopName);const t=document.getElementById("merchant-display-location");t&&(t.innerHTML=`<i class="fa-solid fa-location-dot"></i> ${this.merchantProfile.location}`);const n=document.getElementById("merchant-avatar-container");n&&(this.merchantProfile.avatar?n.innerHTML=`<img src="${this.merchantProfile.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`:n.innerHTML=this.merchantProfile.shopName.charAt(0).toUpperCase());const s=document.getElementById("settings-shop-logo-img"),r=document.getElementById("settings-shop-logo-fallback");s&&r&&(this.merchantProfile.avatar?(s.src=this.merchantProfile.avatar,s.style.display="block",r.style.display="none"):(s.style.display="none",r.style.display="flex"));const o=document.getElementById("settings-shop-name"),c=document.getElementById("settings-contact-phone"),a=document.getElementById("settings-location"),l=document.getElementById("settings-coordinates"),d=document.getElementById("settings-description");o&&(o.value=this.merchantProfile.shopName||""),c&&(c.value=this.merchantProfile.phone||""),a&&(a.value=this.merchantProfile.location||""),l&&(l.value=this.merchantProfile.coordinates||""),d&&(d.value=this.merchantProfile.description||"Premium Akebono ceramic brake pads offering zero noise, low dust, and exceptional stopping power. Directly imported from USA. Certified fitment for Toyota, Honda and other major vehicle brands. Quality you can trust, safety you can feel.",this.updateDescCharCount(d));const h=document.getElementById("map-pin-shop-label");h&&(h.textContent=this.merchantProfile.shopName||"Abossey Okai"),this.updateMapPreviewLink(this.merchantProfile.coordinates||"5.5562, -0.2284"),(!Array.isArray(this.merchantProfile.categoryTags)||this.merchantProfile.categoryTags.length===0)&&(this.merchantProfile.categoryTags=["Brake Systems","Engine Parts","Toyota Specialist","Honda Specialist"]);const u=document.getElementById("settings-category-tags");u&&(u.value=(this.merchantProfile.categoryTags||[]).join(", ")),this.renderCategoryTagsPreview()}updateDescCharCount(e){if(!e)return;let t=null;if(e.id==="onboard-merchant-desc"?t=document.getElementById("onboard-desc-counter"):e.id==="settings-description"?t=document.getElementById("settings-desc-counter"):t=e.parentElement?e.parentElement.querySelector(".char-count-row span"):null,t){const n=e.getAttribute("maxlength")||500;t.textContent=`${e.value.length} / ${n}`}}updateMapPreviewLink(e){const t=document.getElementById("settings-google-maps-link");if(t){const n=e?e.trim():"5.5562,-0.2284";t.href=`https://maps.google.com/?q=${encodeURIComponent(n)}`}}initOnboardMap(){if(this._onboardMap&&(this._onboardMap.remove(),this._onboardMap=null),!document.getElementById("onboard-leaflet-map")||typeof L>"u")return;const t=5.5562,n=-.2284,s=L.map("onboard-leaflet-map",{zoomControl:!0,attributionControl:!1}).setView([t,n],16);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(s);const r=L.divIcon({className:"leaflet-custom-pin",html:'<i class="fa-solid fa-location-dot" style="color:#2563eb;font-size:2.2rem;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.25));"></i>',iconSize:[30,40],iconAnchor:[15,40],popupAnchor:[0,-42]}),o=L.marker([t,n],{icon:r,draggable:!0}).addTo(s),c=(a,l)=>{const d=`${a.toFixed(4)}, ${l.toFixed(4)}`,h=document.getElementById("onboard-merchant-coords"),u=document.getElementById("onboard-map-coords-display"),f=document.getElementById("onboard-google-maps-link");h&&(h.value=d,this.onSettingsInputChange(h)),u&&(u.textContent=d),f&&(f.href=`https://maps.google.com/?q=${a.toFixed(4)},${l.toFixed(4)}`)};c(t,n),o.on("dragend",()=>{const a=o.getLatLng();c(a.lat,a.lng)}),s.on("click",a=>{o.setLatLng(a.latlng),c(a.latlng.lat,a.latlng.lng)}),this._onboardMap=s,this._onboardMarker=o,this._onboardSyncCoords=c,this._setupMapSearch(),this._setupMapLocate()}_setupMapSearch(){const e=document.getElementById("onboard-map-search"),t=document.getElementById("onboard-map-clear-search"),n=document.getElementById("onboard-map-search-results");if(!e||!n)return;let s=null;document.querySelectorAll(".map-preset-chip").forEach(r=>{r.addEventListener("click",()=>{const o=parseFloat(r.dataset.lat),c=parseFloat(r.dataset.lng);!isNaN(o)&&!isNaN(c)&&this._onboardMap&&this._onboardMarker&&(this._onboardMarker.setLatLng([o,c]),this._onboardMap.setView([o,c],17,{animate:!0}),this._onboardSyncCoords(o,c),e.value=r.textContent.trim(),t.style.display="flex",n.style.display="none")})}),e.addEventListener("input",()=>{const r=e.value.trim();if(t.style.display=r.length>0?"flex":"none",clearTimeout(s),r.length<2){n.style.display="none",n.innerHTML="";return}const o=r.match(/^@?(-?\d+\.\d+)[,\s]+(-?\d+\.\d+)$/);if(o){const c=parseFloat(o[1]),a=parseFloat(o[2]);if(!isNaN(c)&&!isNaN(a)&&c>=-90&&c<=90&&a>=-180&&a<=180){n.innerHTML=`
            <div class="map-search-result-item" data-lat="${c}" data-lng="${a}">
              <i class="fa-solid fa-crosshairs" style="color: #2563eb;"></i>
              <div class="result-text">
                <div class="result-name">Jump to Coordinates</div>
                <div class="result-address">Latitude: ${c.toFixed(5)}, Longitude: ${a.toFixed(5)}</div>
              </div>
            </div>`,n.style.display="block";const l=n.querySelector(".map-search-result-item");l&&l.addEventListener("click",()=>{this._onboardMarker.setLatLng([c,a]),this._onboardMap.setView([c,a],17,{animate:!0}),this._onboardSyncCoords(c,a),n.style.display="none"});return}}n.innerHTML=`
        <div class="map-search-result-item" style="opacity:0.6;cursor:default;">
          <i class="fa-solid fa-spinner fa-spin" style="color:#3b82f6;"></i>
          <div class="result-text">
            <div class="result-name">Searching locations in Accra & Ghana...</div>
          </div>
        </div>`,n.style.display="block",s=setTimeout(async()=>{try{let c=[];try{const a=await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(r)}&lat=5.5562&lon=-0.2284&limit=6&lang=en`);if(a.ok){const l=await a.json();l.features&&l.features.length>0&&(c=l.features.map(d=>{const h=d.properties,u=h.name||h.street||h.district||r,f=[h.street,h.district,h.city||h.county,h.country].filter(Boolean);return{name:u,address:f.join(", "),lat:d.geometry.coordinates[1],lng:d.geometry.coordinates[0]}}))}}catch(a){console.warn("Photon API fetch failed, falling back to Nominatim",a)}if(c.length===0){const a=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(r)}&countrycodes=gh&viewbox=-0.40,5.40,-0.05,5.70&limit=6&addressdetails=1`,{headers:{"Accept-Language":"en"}});a.ok&&(c=(await a.json()).map(d=>{const h=d.display_name.split(",");return{name:h[0].trim(),address:h.slice(1,4).join(",").trim(),lat:parseFloat(d.lat),lng:parseFloat(d.lon)}}))}if(c.length===0){n.innerHTML=`
              <div class="map-search-result-item" style="opacity:0.6;cursor:default;">
                <i class="fa-solid fa-circle-exclamation" style="color:#eab308;"></i>
                <div class="result-text">
                  <div class="result-name">No locations found for "${r}"</div>
                  <div class="result-address">Try searching another landmark or click on the map directly</div>
                </div>
              </div>`,n.style.display="block";return}n.innerHTML=c.map(a=>`
            <div class="map-search-result-item" data-lat="${a.lat}" data-lng="${a.lng}">
              <i class="fa-solid fa-location-dot" style="color:#3b82f6;"></i>
              <div class="result-text">
                <div class="result-name">${a.name}</div>
                <div class="result-address">${a.address||"Ghana"}</div>
              </div>
            </div>`).join(""),n.style.display="block",n.querySelectorAll(".map-search-result-item[data-lat]").forEach(a=>{a.addEventListener("click",()=>{const l=parseFloat(a.dataset.lat),d=parseFloat(a.dataset.lng);this._onboardMarker&&this._onboardMap&&(this._onboardMarker.setLatLng([l,d]),this._onboardMap.setView([l,d],17,{animate:!0}),this._onboardSyncCoords(l,d),n.style.display="none",e.value=a.querySelector(".result-name").textContent)})})}catch(c){console.error("Map search error:",c),n.innerHTML=`
            <div class="map-search-result-item" style="opacity:0.6;cursor:default;">
              <i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i>
              <div class="result-text">
                <div class="result-name">Search error</div>
                <div class="result-address">Please check network or tap on map directly</div>
              </div>
            </div>`}},300)}),t.addEventListener("click",()=>{e.value="",t.style.display="none",n.style.display="none",n.innerHTML="",e.focus()}),document.addEventListener("click",r=>{r.target.closest(".onboard-map-container")||(n.style.display="none")})}_setupMapLocate(){const e=document.getElementById("onboard-map-locate-btn");e&&e.addEventListener("click",()=>{if(!navigator.geolocation){this.showToast("Geolocation is not supported by your browser.","error");return}e.classList.add("locating"),this.showToast("Getting your location...","info"),navigator.geolocation.getCurrentPosition(t=>{e.classList.remove("locating");const n=t.coords.latitude,s=t.coords.longitude;this._onboardMarker.setLatLng([n,s]),this._onboardMap.setView([n,s],17,{animate:!0}),this._onboardSyncCoords(n,s),this.showToast("Location set from GPS!","success")},t=>{e.classList.remove("locating"),this.showToast("Could not get your location. Please allow location access.","error"),console.error("Geolocation error:",t)},{enableHighAccuracy:!0,timeout:1e4})})}onSettingsInputChange(e){}renderCategoryTagsPreview(){const e=document.getElementById("settings-specialties-tags-row");if(!e)return;const t=Array.isArray(this.merchantProfile.categoryTags)?this.merchantProfile.categoryTags:[];let n=t.map((s,r)=>`
      <span class="specialty-tag-pill" onclick="app.removeSpecialtyTag(${r})" title="Click to remove tag">
        ${s}
        <span class="tag-check-icon"><i class="fa-solid fa-check"></i></span>
      </span>
    `).join("");t.length<10&&(n+=`
        <button type="button" class="add-tag-pill-btn" onclick="app.addSpecialtyTag()">
          + Add Category
        </button>
      `),e.innerHTML=n}addSpecialtyTag(){const e=prompt("Enter a new specialty or category tag (e.g. Suspension, Transmission, Genuine Parts):");if(e&&e.trim()){const t=e.trim();Array.isArray(this.merchantProfile.categoryTags)||(this.merchantProfile.categoryTags=[]),!this.merchantProfile.categoryTags.includes(t)&&this.merchantProfile.categoryTags.length<10&&(this.merchantProfile.categoryTags.push(t),this.renderCategoryTagsPreview())}}removeSpecialtyTag(e){Array.isArray(this.merchantProfile.categoryTags)&&(this.merchantProfile.categoryTags.splice(e,1),this.renderCategoryTagsPreview())}previewMerchantShop(){this.switchView("storefront"),this.searchQuery=this.merchantProfile.shopName,this.renderCatalog(),this.showToast(`Previewing "${this.merchantProfile.shopName}" on storefront.`,"info")}onAvatarChange(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=s=>{this.merchantProfile.avatar=s.target.result,this.saveMerchantProfileToStorage(),this.renderMerchantProfile(),this.showToast("Shop logo updated successfully!","success")},n.readAsDataURL(t)}saveMerchantProfile(e){e.preventDefault(),this.merchantProfile.shopName=document.getElementById("settings-shop-name").value,this.merchantProfile.phone=document.getElementById("settings-contact-phone").value,this.merchantProfile.location=document.getElementById("settings-location").value,this.merchantProfile.coordinates=document.getElementById("settings-coordinates").value,this.merchantProfile.description=document.getElementById("settings-description").value;const t=document.getElementById("settings-category-tags").value;this.merchantProfile.categoryTags=t.split(",").map(n=>n.trim()).filter(n=>n.length>0),this.renderCategoryTagsPreview(),this.saveMerchantProfileToStorage(),this.renderMerchantProfile(),this.products.forEach(n=>{(n.id.startsWith("merchant-")||n.merchant.shopName===this.merchantProfile.shopName)&&(n.merchant.shopName=this.merchantProfile.shopName,n.merchant.phone=this.merchantProfile.phone,n.merchant.location=this.merchantProfile.location,n.merchant.coordinates=this.merchantProfile.coordinates)}),this.saveProductsToStorage(),this.showToast("Merchant settings saved successfully!","success")}renderMerchantMetrics(){if(!this.merchantProfile)return;const e=this.products.filter(s=>s.merchant.shopName===this.merchantProfile.shopName),t=e.reduce((s,r)=>s+(r.views||0),0),n=e.slice().sort((s,r)=>(r.views||0)-(s.views||0))[0];document.getElementById("metric-total-leads").textContent=t.toLocaleString(),document.getElementById("metric-total-live").textContent=n?n.name:"—"}openMostViewedModal(){if(!this.merchantProfile)return;const e=this.products.filter(n=>n.merchant.shopName===this.merchantProfile.shopName).slice().sort((n,s)=>(s.views||0)-(n.views||0)),t=document.getElementById("most-viewed-list-body");t&&(e.length===0?t.innerHTML='<div class="most-viewed-empty"><i class="fa-solid fa-box-open"></i><p>No products listed yet.</p></div>':t.innerHTML=e.map((n,s)=>{const r=s+1,o=r===1?"rank-gold":r===2?"rank-silver":r===3?"rank-bronze":"rank-default",c=n.views||0,a=e[0].views>0?Math.round(c/e[0].views*100):0;return`
          <div class="most-viewed-item">
            <div class="most-viewed-rank ${o}">${r}</div>
            <div class="most-viewed-item-info">
              <span class="most-viewed-item-name">${n.name}</span>
              <div class="most-viewed-bar-wrap">
                <div class="most-viewed-bar" style="width:${a}%"></div>
              </div>
            </div>
            <div class="most-viewed-count">
              <i class="fa-solid fa-eye"></i>
              <span>${c.toLocaleString()}</span>
            </div>
          </div>`}).join(""),document.getElementById("most-viewed-modal").style.display="flex",document.body.style.overflow="hidden")}closeMostViewedModal(){const e=document.getElementById("most-viewed-modal");e&&(e.style.display="none"),document.body.style.overflow=""}renderMerchantInventory(){const e=document.getElementById("inventory-table-body"),t=document.getElementById("inventory-count");if(!e)return;const n=this.products.filter(l=>l.merchant.shopName===this.merchantProfile.shopName),s=document.querySelector(".inventory-tab.active"),r=s?s.getAttribute("data-status"):"all",o=n.filter(l=>r==="all"?!0:l.status===r||r==="Out of Stock"&&l.stock==="Out of Stock");if(t.textContent=`${o.length} item${o.length===1?"":"s"} listed`,o.length===0){e.innerHTML=`
        <tr>
          <td colspan="3" style="text-align: center; padding: 3rem 1.5rem; color: var(--text-muted);">
            <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
            No items matching your selection. Click "Add New Product" to populate your inventory listings.
          </td>
        </tr>
      `;return}e.innerHTML="",o.slice(0,3).forEach(l=>{e.appendChild(this._buildInventoryRow(l))});const a=document.getElementById("inventory-see-all-btn");a&&(a.style.display=o.length>3?"flex":"none",a.querySelector("span").textContent=`See All ${o.length} Products`)}_buildInventoryRow(e){const t=document.createElement("tr");t.id=`row-${e.id}`,t.style.cursor="pointer",t.onclick=()=>this.openProductForm(e.id);let n="";e.images&&e.images.length>0?n=`<img src="${e.images[0]}" class="table-product-img" alt="${e.name}">`:n=`<div class="table-product-img" style="background:#F1F5F9; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">${e.mainType==="parts"?"⚙️":"🔌"}</div>`;const s=`
      <div class="table-product-cell">
        ${n}
        <div class="table-product-info">
          <span class="table-product-name">${e.name}</span>
          <span class="table-product-cat">${e.brand} &bull; ${e.category}</span>
        </div>
      </div>`,r=`<span style="font-weight:700; color:var(--primary-color);">₵${e.price.toLocaleString()}</span>`;let o="badge-new";e.status==="Live"&&(o="badge-instock"),e.status==="Hidden"&&(o="badge-stock"),e.status==="Pending Review"&&(o="badge-refurbished"),e.stock==="Out of Stock"&&(o="badge-oos");const c=e.stock==="Out of Stock"?"Out of Stock":e.status==="Live"?"In Stock":e.status,a=`<span class="badge ${o}">${c}</span>`;return t.innerHTML=`<td>${s}</td><td>${r}</td><td>${a}</td>`,t}openAllInventory(){if(!this.merchantProfile)return;const e=this.products.filter(r=>r.merchant.shopName===this.merchantProfile.shopName),t=document.getElementById("all-inventory-panel"),n=document.getElementById("all-inventory-table-body"),s=document.getElementById("all-inventory-count");!t||!n||(s&&(s.textContent=`${e.length} product${e.length===1?"":"s"}`),n.innerHTML="",e.length===0?n.innerHTML='<tr><td colspan="3" style="text-align:center; padding:3rem 1rem; color:var(--text-muted);"><i class="fa-solid fa-folder-open" style="font-size:2rem; display:block; margin-bottom:0.5rem;"></i>No products yet. Add your first product!</td></tr>':e.forEach(r=>n.appendChild(this._buildInventoryRow(r))),t.style.display="flex",document.body.style.overflow="hidden")}closeAllInventory(){const e=document.getElementById("all-inventory-panel");e&&(e.style.display="none"),document.body.style.overflow=""}filterInventory(e){document.querySelectorAll(".inventory-tab").forEach(t=>{t.classList.remove("active"),t.getAttribute("data-status")===e&&t.classList.add("active")}),this.renderMerchantInventory()}setFormStockStatus(e){const t=document.getElementById("form-product-stock");t&&(t.value=e),document.querySelectorAll("#form-stock-segmented .status-segment").forEach(s=>{s.getAttribute("data-value")===e?s.classList.add("active"):s.classList.remove("active")})}deleteProductFromForm(){if(this.editingProductId&&confirm("Are you sure you want to delete this product listing? This action cannot be undone.")){const e=document.getElementById("form-product-name").value;this.products=this.products.filter(t=>t.id!==this.editingProductId),this.saveProductsToStorage(),this.closeProductForm(),this.renderMerchantInventory(),this.renderMerchantMetrics(),this.renderBrandFilters(),this.renderCatalog(),this.showToast(`Product listing "${e}" deleted.`,"success")}}openProductForm(e=null){this.selectedFitmentsInForm=[],this.selectedFormImages=[],document.getElementById("product-submission-form").reset(),document.getElementById("form-image-previews").innerHTML="",this.populateSelectOptions(),this.populateBrandsDatalist(),this.populateModelsDatalist();const t=document.getElementById("form-delete-btn");if(e){this.editingProductId=e;const n=this.products.find(o=>o.id==e||String(o.id)===String(e));if(!n)return;document.getElementById("form-modal-title-text").textContent="Edit Product Listing",t&&(t.style.display="block"),document.getElementById("form-product-name").value=n.name,document.getElementById("form-product-brand").value=n.brand||"",this.setFormListingType(n.mainType),document.getElementById("form-product-category").value=n.category,document.getElementById("form-product-price").value=n.price,document.getElementById("form-product-condition").value=n.condition,document.getElementById("form-product-desc").value=n.description||"",this.setFormStockStatus(n.stock||"In Stock");const s=document.getElementById("form-fitment-make-model"),r=document.getElementById("form-fitment-years");if(Array.isArray(n.compatibility)&&n.compatibility.length>0){const o=n.compatibility[0];typeof o=="object"?(s&&(s.value=`${o.make} ${o.model}`.trim()),r&&(r.value=o.years||"")):typeof o=="string"&&(s&&(s.value=o),r&&(r.value=""))}else typeof n.compatibility=="string"&&n.compatibility!=="Universal Fit"&&s&&(s.value=n.compatibility);if(n.mainType==="accessories"){const o=n.compatibility==="Universal Fit",c=document.getElementById("form-universal-fit");c&&(c.checked=o,this.onUniversalToggle(c))}n.images&&n.images.length>0&&(this.selectedFormImages=[...n.images],this.renderFormImagePreviews())}else{this.editingProductId=null,document.getElementById("form-modal-title-text").textContent="Add New Listing",t&&(t.style.display="none"),document.getElementById("form-product-brand").value="";const n=document.getElementById("form-fitment-make-model"),s=document.getElementById("form-fitment-years");n&&(n.value=""),s&&(s.value=""),this.setFormListingType("parts"),this.setFormStockStatus("In Stock")}this.setFormStep(1),document.getElementById("product-form-modal").style.display="flex"}closeProductForm(){document.getElementById("product-form-modal").style.display="none"}setFormStep(e){const t=Math.min(Math.max(e,1),3);if(t>this.currentFormStep&&!this.validateCurrentStep(this.currentFormStep))return;this.currentFormStep=t;for(let o=1;o<=3;o++){const c=document.getElementById(`form-step-pane-${o}`),a=document.getElementById(`wizard-step-indicator-${o}`);c&&(c.style.display=o===t?"flex":"none"),a&&(a.classList.toggle("active",o===t),a.classList.toggle("completed",o<t))}const n=document.getElementById("form-prev-btn"),s=document.getElementById("form-next-btn"),r=document.getElementById("submit-form-save-btn");n&&(n.style.display=t>1?"inline-flex":"none"),s&&(s.style.display=t<3?"inline-flex":"none"),r&&(r.style.display=t===3?"inline-flex":"none")}nextFormStep(){this.setFormStep(this.currentFormStep+1)}prevFormStep(){this.setFormStep(this.currentFormStep-1)}validateCurrentStep(e){var t,n;if(e===1){const s=document.getElementById("form-product-name"),r=document.getElementById("form-product-price"),o=document.getElementById("form-product-condition"),c=document.getElementById("form-product-category");if(s&&!s.checkValidity())return s.reportValidity(),!1;if(r&&!r.checkValidity())return r.reportValidity(),!1;if(o&&!o.checkValidity())return o.reportValidity(),!1;if(c&&!c.checkValidity())return c.reportValidity(),!1}else if(e===2){const s=document.getElementById("form-product-brand"),r=document.getElementById("form-fitment-make-model"),o=document.getElementById("form-fitment-years"),c=(t=document.getElementById("form-product-type"))==null?void 0:t.value,a=(n=document.getElementById("form-universal-fit"))==null?void 0:n.checked;if(s&&!s.checkValidity())return s.reportValidity(),!1;if(c==="parts"||c==="accessories"&&!a){if(r&&!r.checkValidity())return r.reportValidity(),!1;if(o&&!o.checkValidity())return o.reportValidity(),!1}}return!0}setFormListingType(e){const t=document.getElementById("form-product-type");t&&(t.value=e);const n=document.getElementById("form-tab-parts"),s=document.getElementById("form-tab-accessories");n&&n.classList.toggle("active",e==="parts"),s&&s.classList.toggle("active",e==="accessories");const r=document.getElementById("form-field-vehicle-group"),o=document.getElementById("form-field-universal-group"),c=document.getElementById("condition-refurbished-option");if(e==="parts")r&&(r.style.display="block"),o&&(o.style.display="none"),c&&(c.style.display="block");else{r&&(r.style.display="none"),o&&(o.style.display="block"),c&&(c.style.display="none");const a=document.getElementById("form-product-condition");a&&a.value==="Refurbished"&&(a.value="New")}this.populateFormCategories(e)}populateFormCategories(e){const t=document.getElementById("form-product-category");t&&(t.innerHTML="",e==="parts"?H.forEach(n=>{t.innerHTML+=`<option value="${n}">${n}</option>`}):Y.forEach(n=>{t.innerHTML+=`<option value="${n}">${n}</option>`}))}onUniversalToggle(e){const t=document.getElementById("form-field-vehicle-group");e.checked?t.style.display="none":t.style.display="block"}addFormFitment(){const e=document.getElementById("form-fitment-make").value,t=document.getElementById("form-fitment-model").value,n=document.getElementById("form-fitment-years").value.trim();if(!e){this.showToast("Please select at least a vehicle make.","error");return}const s={make:e,model:t||"All Models",years:n||"All Years"};this.selectedFitmentsInForm.push(s),this.renderFormFitmentTags(),document.getElementById("form-fitment-make").value="",document.getElementById("form-fitment-model").value="",document.getElementById("form-fitment-model").disabled=!0,document.getElementById("form-fitment-years").value=""}removeFormFitment(e){this.selectedFitmentsInForm.splice(e,1),this.renderFormFitmentTags()}renderFormFitmentTags(){const e=document.getElementById("form-fitment-tags-container");if(e){if(e.innerHTML="",this.selectedFitmentsInForm.length===0){e.innerHTML='<span style="font-size:0.8rem; color:var(--text-muted);">No custom vehicle compatibility added.</span>';return}this.selectedFitmentsInForm.forEach((t,n)=>{const s=document.createElement("span");s.className="compatibility-item",s.innerHTML=`
        ${t.make} ${t.model} (${t.years})
        <i class="fa-solid fa-circle-xmark" style="margin-left:0.35rem; cursor:pointer;" onclick="app.removeFormFitment(${n})"></i>
      `,e.appendChild(s)})}}onFormImageUpload(e){const t=Array.from(e.target.files);if(!document.getElementById("form-image-previews"))return;const s=5-this.selectedFormImages.length,r=t.slice(0,s);t.length>s&&this.showToast("You can upload a maximum of 5 images per product.","error"),r.forEach(o=>{const c=new FileReader;c.onload=a=>{const l=a.target.result;this.selectedFormImages.push(l),this.renderFormImagePreviews()},c.readAsDataURL(o)})}removeFormImage(e){this.selectedFormImages.splice(e,1),this.renderFormImagePreviews()}renderFormImagePreviews(){const e=document.getElementById("form-image-previews");e&&(e.innerHTML="",this.selectedFormImages.forEach((t,n)=>{const s=document.createElement("div");s.style.position="relative",s.style.display="inline-block";const r=document.createElement("img");r.src=t,r.className="uploader-preview-img";const o=document.createElement("span");o.className="avatar-edit-badge",o.style.width="20px",o.style.height="20px",o.style.fontSize="0.7rem",o.innerHTML='<i class="fa-solid fa-xmark"></i>',o.setAttribute("onclick",`app.removeFormImage(${n})`),s.appendChild(r),s.appendChild(o),e.appendChild(s)}))}async submitProductForm(e){var w,m,v;e.preventDefault();const t=document.getElementById("form-product-name").value.trim(),n=document.getElementById("form-product-type").value,s=parseFloat(document.getElementById("form-product-price").value),r=document.getElementById("form-product-category").value,o=document.getElementById("form-product-brand").value.trim()||"Generic",c=document.getElementById("form-product-condition").value,a=document.getElementById("form-product-desc").value.trim(),l=document.getElementById("form-product-stock"),d=l?l.value:"In Stock";if(!t||isNaN(s)){this.showToast("Please enter valid product name and pricing details.","error");return}const h=((w=document.getElementById("form-fitment-make-model"))==null?void 0:w.value.trim())||"",u=((m=document.getElementById("form-fitment-years"))==null?void 0:m.value.trim())||"",f=(T,b)=>{let A=b||"Generic",C=T;if(typeof S=="object"&&S){const q=b.toLowerCase(),P=Object.keys(S).find(B=>B.toLowerCase()===q);if(P){A=P;const B=T.toLowerCase(),ae=P.toLowerCase();B.startsWith(ae+" ")?C=T.substring(P.length).trim():C=T}else{const B=T.split(" "),ae=B[0]?B[0].toLowerCase():"",ne=Object.keys(S).find(Ce=>Ce.toLowerCase()===ae);ne&&(A=ne,C=B.slice(1).join(" ")||T)}}return[{make:A,model:C,years:u||"All Years"}]};let p=null,y="Universal Fit";if(n==="parts"){if(!h){this.showToast("Please enter Model (Make) for the spare part.","error");return}p=f(h,o),y=null}else if(!((v=document.getElementById("form-universal-fit"))==null?void 0:v.checked)){if(!h){this.showToast("Please enter Model (Make) or mark as Universal Fit.","error");return}p=f(h,o),y=null}const g=localStorage.getItem("ao_jwt_token");if(this.editingProductId){this.showToast("Updating listing in Neon DB...","info");try{const T=await fetch(`${E}/api/products/${this.editingProductId}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:g?`Bearer ${g}`:""},body:JSON.stringify({name:t,brand:o,category:r,condition:c,price:s,stock:d,description:a,images:[...this.selectedFormImages],compatibility:Array.isArray(p)?p:null,compatibility_text:y})});if(T.ok)this.showToast(`Product "${t}" updated in database!`,"success");else{const b=await T.json();this.showToast(b.error||"Failed to update product.","error")}}catch{this.showToast("Could not reach backend server.","error")}this.editingProductId=null,this.closeProductForm(),await this.loadBackendData()}else{this.showToast("Publishing listing to Neon DB...","info");try{const T=await fetch(`${E}/api/products`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:g?`Bearer ${g}`:""},body:JSON.stringify({main_type:n,name:t,brand:o,category:r,condition:c,price:s,stock:d,description:a,images:[...this.selectedFormImages],compatibility:Array.isArray(p)?p:null,compatibility_text:y})});if(T.ok)this.showToast(`Product "${t}" published to database!`,"success");else{const b=await T.json();this.showToast(b.error||"Failed to publish product.","error")}}catch{this.showToast("Could not reach backend server.","error")}this.closeProductForm(),await this.loadBackendData()}}async toggleListingVisibility(e){const t=this.products.find(r=>r.id==e||String(r.id)===String(e));if(!t)return;const n=t.status==="Live"?"Hidden":"Live",s=localStorage.getItem("ao_jwt_token");try{(await fetch(`${E}/api/products/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:s?`Bearer ${s}`:""},body:JSON.stringify({status:n})})).ok&&this.showToast(`Listing status set to ${n}`,"success")}catch{}await this.loadBackendData()}async toggleListingStock(e){const t=this.products.find(r=>r.id==e||String(r.id)===String(e));if(!t)return;const n=t.stock==="In Stock"?"Out of Stock":"In Stock",s=localStorage.getItem("ao_jwt_token");try{(await fetch(`${E}/api/products/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:s?`Bearer ${s}`:""},body:JSON.stringify({stock:n})})).ok&&this.showToast(`Stock status set to ${n}`,"success")}catch{}await this.loadBackendData()}async deleteProductListing(e){if(!confirm("Are you sure you want to delete this listing permanently from inventory?"))return;const t=localStorage.getItem("ao_jwt_token");try{const n=await fetch(`${E}/api/products/${e}`,{method:"DELETE",headers:{Authorization:t?`Bearer ${t}`:""}});if(n.ok)this.showToast("Deleted listing permanently from database.","success");else{const s=await n.json();this.showToast(s.error||"Failed to delete listing.","error")}}catch{this.showToast("Could not connect to server.","error")}await this.loadBackendData()}bulkToggleStock(e){const t=document.querySelectorAll(".inventory-item-select:checked");if(t.length===0){this.showToast("Please check at least one product checkbox first.","error");return}let n=0;t.forEach(s=>{const r=this.products.find(o=>o.id===s.value);r&&(r.stock=e?"In Stock":"Out of Stock",n++)}),this.saveProductsToStorage(),this.renderMerchantInventory(),this.renderMerchantMetrics(),this.renderCatalog(),this.showToast(`Marked ${n} items as ${e?"In-Stock":"Out-of-Stock"}`,"success"),document.getElementById("inventory-select-all").checked=!1}toggleSelectAllInventory(e){document.querySelectorAll(".inventory-item-select").forEach(t=>{t.checked=e.checked})}onInventoryRowSelect(){const e=document.querySelectorAll(".inventory-item-select").length,t=document.querySelectorAll(".inventory-item-select:checked").length;document.getElementById("inventory-select-all").checked=e===t&&e>0}onOverlayClick(e,t){e.target.id===t&&(t==="pdp-overlay-modal"&&this.closePdp(),t==="product-form-modal"&&this.closeProductForm(),t==="auth-modal"&&this.closeMerchantAuth(),t==="most-viewed-modal"&&this.closeMostViewedModal(),t==="all-inventory-panel"&&this.closeAllInventory())}showToast(e,t="success"){console.log(`[${t.toUpperCase()}] ${e}`)}setupThemeAndStyleEnhancements(){const e=document.getElementById("main-header"),t=document.getElementById("app-main-content");if(e&&t){const s=()=>{t.style.paddingTop=e.offsetHeight+"px"};s(),window.addEventListener("resize",s)}window.addEventListener("scroll",()=>{e&&(window.scrollY>10?e.classList.add("scrolled"):e.classList.remove("scrolled"))});const n=document.createElement("style");n.innerHTML=`
      .autocomplete-dropdown::-webkit-scrollbar,
      .pdp-body::-webkit-scrollbar,
      .form-modal-body::-webkit-scrollbar {
        width: 6px;
      }
      .autocomplete-dropdown::-webkit-scrollbar-track,
      .pdp-body::-webkit-scrollbar-track,
      .form-modal-body::-webkit-scrollbar-track {
        background: #F1F5F9;
      }
      .autocomplete-dropdown::-webkit-scrollbar-thumb,
      .pdp-body::-webkit-scrollbar-thumb,
      .form-modal-body::-webkit-scrollbar-thumb {
        background: #CBD5E1;
        border-radius: 4px;
      }
      .autocomplete-dropdown::-webkit-scrollbar-thumb:hover,
      .pdp-body::-webkit-scrollbar-thumb:hover,
      .form-modal-body::-webkit-scrollbar-thumb:hover {
        background: #94A3B8;
      }
    `,document.head.appendChild(n)}selectMarketSector(e,t,n){document.querySelectorAll(".market-sector").forEach(r=>{r.classList.remove("active"),r.style.borderColor="#E2E8F0",r.style.background="#fff",r.style.color="var(--charcoal)"}),e.classList.add("active"),e.style.borderColor="var(--accent-color)",e.style.background="#FFF7ED",e.style.color="var(--accent-color)",document.getElementById("onboard-merchant-coords").value=t;const s=document.getElementById("onboard-merchant-location");s.value||(s.value=n)}togglePremoderationSetting(){const e=document.getElementById("admin-setting-premoderation");e&&(this.premoderation=e.checked,localStorage.setItem("ao_admin_premoderation",this.premoderation?"true":"false"),this.showToast(`Pre-publish moderation queue ${this.premoderation?"enabled":"disabled"}.`,"success"),this.logAdminAction("SETTINGS_CHANGE","Pre-publish Moderation",`Status set to ${this.premoderation}`))}toggleAnnouncementBannerSetting(){const e=document.getElementById("admin-setting-banner-toggle");e&&(this.announcement.visible=e.checked,localStorage.setItem("ao_global_announcement",JSON.stringify(this.announcement)),this.renderAnnouncementBanner(),this.showToast(`System announcement banner ${this.announcement.visible?"visible":"hidden"}.`,"success"),this.logAdminAction("SETTINGS_CHANGE","Announcement Banner Visibility",`Status set to ${this.announcement.visible}`))}saveAnnouncementBannerText(){const e=document.getElementById("admin-setting-banner-text");if(!e)return;const t=e.value.trim();if(!t){this.showToast("Announcement text cannot be empty.","error");return}this.announcement.text=t,localStorage.setItem("ao_global_announcement",JSON.stringify(this.announcement)),this.renderAnnouncementBanner(),this.showToast("Announcement text updated.","success"),this.logAdminAction("SETTINGS_CHANGE","Announcement Banner Text",`Text updated to: "${t}"`)}setAdminListingsStatusFilter(e){this.adminListingsFilter=e,document.querySelectorAll('[id^="admin-listing-tab-"]').forEach(s=>s.classList.remove("active"));const t={all:"admin-listing-tab-all","Pending Review":"admin-listing-tab-pending",Live:"admin-listing-tab-live",Hidden:"admin-listing-tab-hidden",oos:"admin-listing-tab-oos"},n=document.getElementById(t[e]);n&&n.classList.add("active"),this.renderAdminListings()}async toggleMerchantVerification(e,t){const n=this.merchants.find(r=>r.shopName===e);if(!n||!n.id)return;const s=localStorage.getItem("ao_jwt_token");try{const r=await fetch(`${E}/api/merchants/${n.id}/verify`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({verified:t})});if(!r.ok){const o=await r.json();this.showToast(`Error: ${o.error||"Failed to update verification."}`,"error");return}}catch(r){console.error("Toggle verification error:",r),this.showToast("Network error updating verification.","error");return}this.showToast(`Merchant "${e}" verification status set to ${t?"Verified":"Independent"}.`,"success"),this.logAdminAction("MERCHANT_VERIFY_TOGGLE",e,`Verified status set to ${t}`),await this.loadBackendData(),this.renderAdminMerchants(),this.renderCatalog()}async editMerchantNotes(e){const t=this.merchants.find(o=>o.shopName===e);if(!t||!t.id)return;const n=t.verificationNotes||"",s=prompt(`Enter verification review notes for "${e}":`,n);if(s===null)return;const r=localStorage.getItem("ao_jwt_token");try{const o=await fetch(`${E}/api/merchants/${t.id}/verify`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({verified:t.verified,verification_notes:s.trim()})});if(!o.ok){const c=await o.json();this.showToast(`Error: ${c.error||"Failed to update notes."}`,"error");return}}catch(o){console.error("Edit merchant notes error:",o),this.showToast("Network error updating notes.","error");return}this.showToast(`Notes updated for ${e}.`,"success"),this.logAdminAction("MERCHANT_VERIFY_TOGGLE",e,`Verification notes updated: "${s}"`),await this.loadBackendData(),this.renderAdminMerchants()}logAdminAction(e,t,n){const s=localStorage.getItem("ao_jwt_token");s&&fetch(`${E}/api/admin/audit-logs`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({action:e,target:t,details:n})}).catch(r=>console.warn("Audit log post failed:",r))}async clearAdminAuditLogs(){if(!confirm("Are you sure you want to clear all operational audit logs? This cannot be undone."))return;const e=localStorage.getItem("ao_jwt_token");try{if(!(await fetch(`${E}/api/admin/audit-logs`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok){this.showToast("Failed to clear audit logs.","error");return}}catch(t){console.error("Clear audit logs error:",t),this.showToast("Network error clearing logs.","error");return}this.showToast("Audit logs cleared successfully.","success"),this.renderAdminAuditLogs()}async renderAdminAuditLogs(){const e=document.getElementById("admin-logs-table-body");if(!e)return;e.innerHTML='<tr><td colspan="4" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">Loading logs...</td></tr>';const t=localStorage.getItem("ao_jwt_token");let n=[];try{const s=await fetch(`${E}/api/admin/audit-logs`,{headers:{Authorization:`Bearer ${t}`}});s.ok&&(n=(await s.json()).logs||[])}catch(s){console.warn("Could not load audit logs from backend:",s)}if(e.innerHTML="",n.length===0){e.innerHTML='<tr><td colspan="4" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">No logs recorded yet.</td></tr>';return}n.forEach(s=>{const r=document.createElement("tr"),c=`<span style="font-size: 0.8rem; color: var(--text-muted);">${s.created_at?new Date(s.created_at).toLocaleString():s.timestamp||""}</span>`,l=`<span style="font-size:0.72rem; padding:2px 6px; border-radius:4px; font-weight:600; ${{MERCHANT_ONBOARD:"background:#E0F2FE; color:#0369A1;",MERCHANT_DELETE:"background:#FEE2E2; color:#B91C1C;",MERCHANT_VERIFY_TOGGLE:"background:#FEF3C7; color:#B45309;",LISTING_STOCK_TOGGLE:"background:#F1F5F9; color:#475569;",LISTING_DELETE:"background:#FEE2E2; color:#B91C1C;",LISTING_EDIT:"background:#E0F2FE; color:#0369A1;",LISTING_APPROVED:"background:#DCFCE7; color:#15803D;",LISTING_REJECTED:"background:#FEE2E2; color:#B91C1C;",REPORT_DISMISS:"background:#DCFCE7; color:#15803D;",REPORT_TAKEDOWN:"background:#FEE2E2; color:#B91C1C;",TAXONOMY_ADD:"background:#DCFCE7; color:#15803D;",TAXONOMY_DELETE:"background:#FEE2E2; color:#B91C1C;",SETTINGS_CHANGE:"background:#F3E8FF; color:#6B21A8;",PRODUCT_STATUS_CHANGE:"background:#FEF3C7; color:#B45309;",MERCHANT_STATUS_CHANGE:"background:#F3E8FF; color:#6B21A8;",REPORT_STATUS_CHANGE:"background:#FEF3C7; color:#B45309;"}[s.action]||"background:#F1F5F9; color:#475569;"}">${s.action}</span>`,d=`<strong style="font-size:0.8rem; color:var(--charcoal);">${s.target||""}</strong>`,h=`<span style="font-size:0.8rem; color:var(--text-muted);">${s.details||""}</span>`;r.innerHTML=`<td>${c}</td><td>${l}</td><td>${d}</td><td>${h}</td>`,e.appendChild(r)})}addAdminBrand(){const e=document.getElementById("admin-new-brand");if(!e)return;const t=e.value.trim();if(t){if(this.brands.includes(t)){this.showToast("Brand already exists.","error");return}this.brands.push(t),localStorage.setItem("ao_brands_list",JSON.stringify(this.brands)),e.value="",this.showToast(`Brand "${t}" added.`,"success"),this.renderAdminBrandsList(),this.populateBrandsDatalist(),this.logAdminAction("TAXONOMY_ADD",`Brand: ${t}`,"Added brand to catalog settings")}}deleteAdminBrand(e){confirm(`Are you sure you want to remove brand "${e}"?`)&&(this.brands=this.brands.filter(t=>t!==e),localStorage.setItem("ao_brands_list",JSON.stringify(this.brands)),this.showToast(`Brand "${e}" removed.`,"success"),this.renderAdminBrandsList(),this.populateBrandsDatalist(),this.logAdminAction("TAXONOMY_DELETE",`Brand: ${e}`,"Removed brand from catalog settings"))}renderAdminBrandsList(){const e=document.getElementById("admin-brands-list");e&&(e.innerHTML="",this.brands.forEach(t=>{const n=document.createElement("div");n.style.cssText="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; padding:4px 0; border-bottom:1px solid #F1F5F9;",n.innerHTML=`<span style="flex:1;">${t}</span> <i class="fa-solid fa-trash-can" style="cursor:pointer; color:#DC2626;" onclick="app.deleteAdminBrand('${t}')"></i>`,e.appendChild(n)}))}populateBrandsDatalist(){const e=document.getElementById("form-brands-datalist");e&&(Array.isArray(this.brands)||(this.brands=["Toyota","Honda","Nissan","Hyundai","Kia","Mercedes-Benz","BMW","Audi","Ford","Chevrolet"]),e.innerHTML="",this.brands.forEach(t=>{const n=document.createElement("option");n.value=t,e.appendChild(n)}))}onFormBrandChange(){const e=document.getElementById("form-product-brand"),t=e?e.value.trim():"";this.populateModelsDatalist(t)}populateModelsDatalist(e=""){const t=document.getElementById("form-models-datalist");if(!t||(t.innerHTML="",typeof S!="object"||!S))return;let n=null;if(e){const r=e.toLowerCase();n=Object.keys(S).find(o=>o.toLowerCase()===r)}const s=document.getElementById("form-fitment-make-model");if(n&&S[n]&&Array.isArray(S[n].models)){const r=S[n].models;r.forEach(o=>{const c=document.createElement("option");c.value=o,t.appendChild(c)}),s&&(s.placeholder=`e.g. ${r.slice(0,3).join(", ")}`)}else Object.keys(S).forEach(r=>{const o=S[r];o&&Array.isArray(o.models)&&o.models.forEach(c=>{const a=document.createElement("option");a.value=`${r} ${c}`,t.appendChild(a)})}),s&&(s.placeholder="e.g. Civic, CR-V, Corolla")}switchAdminTab(e){document.querySelectorAll("#admin-sidebar .dashboard-menu-item").forEach(s=>s.classList.remove("active")),document.querySelectorAll("#admin-dashboard-content .dashboard-tab-panel").forEach(s=>s.style.display="none");const t={overview:"db-menu-admin-overview",merchants:"db-menu-admin-merchants",listings:"db-menu-admin-listings",taxonomy:"db-menu-admin-taxonomy",reports:"db-menu-admin-reports",logs:"db-menu-admin-logs"},n={overview:"admin-panel-overview",merchants:"admin-panel-merchants",listings:"admin-panel-listings",taxonomy:"admin-panel-taxonomy",reports:"admin-panel-reports",logs:"admin-panel-logs"};if(t[e]&&n[e]){const s=document.getElementById(t[e]),r=document.getElementById(n[e]);s&&s.classList.add("active"),r&&(r.style.display="block")}e==="overview"?this.renderAdminOverview():e==="merchants"?(this.renderAdminMerchants(),setTimeout(()=>this.initOnboardMap(),150)):e==="listings"?this.renderAdminListings():e==="taxonomy"?this.renderAdminTaxonomy():e==="reports"?this.renderAdminReports():e==="logs"&&this.renderAdminAuditLogs()}renderAdminOverview(){const e=this.merchants.length,t=document.getElementById("admin-metric-merchants");t&&(t.textContent=e);const n=this.products.length,s=document.getElementById("admin-metric-listings");s&&(s.textContent=n);const r=this.products.reduce((k,R)=>k+(R.views||0),0),o=document.getElementById("admin-metric-views");o&&(o.textContent=r.toLocaleString());const c=localStorage.getItem("ao_reported_listings"),a=c?JSON.parse(c):[],l=document.getElementById("admin-metric-reports");l&&(l.textContent=a.length);const d=this.products.filter(k=>k.status==="Live").length,h=this.products.filter(k=>k.status==="Pending Review").length,u=this.products.filter(k=>k.status==="Hidden").length,f=this.products.filter(k=>k.stock==="Out of Stock").length,p=document.getElementById("analytics-count-live"),y=document.getElementById("analytics-count-pending"),g=document.getElementById("analytics-count-hidden"),w=document.getElementById("analytics-count-oos");p&&(p.textContent=d),y&&(y.textContent=h),g&&(g.textContent=u),w&&(w.textContent=f);const m=document.getElementById("admin-listings-count-pending");m&&(m.textContent=h);const v=parseInt(localStorage.getItem("ao_lead_whatsapp")||"0"),T=parseInt(localStorage.getItem("ao_lead_maps")||"0"),b=document.getElementById("analytics-lead-whatsapp"),A=document.getElementById("analytics-lead-maps");b&&(b.textContent=v.toLocaleString()),A&&(A.textContent=T.toLocaleString());const C={};this.products.forEach(k=>{k.category&&(C[k.category]=(C[k.category]||0)+(k.views||0))});const q=Object.entries(C).sort((k,R)=>R[1]-k[1]).slice(0,5),P=document.getElementById("analytics-top-categories");P&&(P.innerHTML="",q.length===0?P.innerHTML='<li style="color:var(--text-muted);">No views recorded.</li>':q.forEach(([k,R])=>{const $=document.createElement("li");$.style.display="flex",$.style.justify="space-between",$.style.padding="2px 0",$.innerHTML=`<span>${k}</span> <strong style="color:var(--text-muted);">${R}</strong>`,P.appendChild($)}));const B={};this.products.forEach(k=>{k.brand&&(B[k.brand]=(B[k.brand]||0)+(k.views||0))});const ae=Object.entries(B).sort((k,R)=>R[1]-k[1]).slice(0,5),ne=document.getElementById("analytics-top-brands");ne&&(ne.innerHTML="",ae.length===0?ne.innerHTML='<li style="color:var(--text-muted);">No views recorded.</li>':ae.forEach(([k,R])=>{const $=document.createElement("li");$.style.display="flex",$.style.justify="space-between",$.style.padding="2px 0",$.innerHTML=`<span>${k}</span> <strong style="color:var(--text-muted);">${R}</strong>`,ne.appendChild($)}));const Ce=document.getElementById("admin-setting-premoderation");Ce&&(Ce.checked=this.premoderation);const wt=document.getElementById("admin-setting-banner-toggle");wt&&(wt.checked=this.announcement.visible);const It=document.getElementById("admin-setting-banner-text");It&&(It.value=this.announcement.text)}renderAdminMerchants(){const e=document.getElementById("admin-merchants-table-body");if(!e)return;const t=document.getElementById("admin-merchants-search"),n=t?t.value.trim().toLowerCase():"";e.innerHTML="";const s=this.merchants.filter(r=>{if(!n)return!0;const o=(r.shopName||"").toLowerCase(),c=(r.phone||"").toLowerCase(),a=(r.email||"").toLowerCase(),l=(r.location||"").toLowerCase(),d=(r.specialty||"").toLowerCase();return o.includes(n)||c.includes(n)||a.includes(n)||l.includes(n)||d.includes(n)});if(s.length===0){e.innerHTML=`<tr><td colspan="4" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">${n?`No merchants matching "${n}".`:"No onboarded merchants yet."}</td></tr>`;return}s.forEach(r=>{const o=document.createElement("tr"),c=`
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <strong style="color:var(--charcoal);">${r.shopName} ${r.status==="Suspended"?'<span class="badge badge-oos" style="font-size:0.65rem; padding:1px 4px;">SUSPENDED</span>':""}</strong>
          <span style="font-size:0.8rem; color:var(--text-muted);"><i class="fa-solid fa-phone"></i> ${r.phone} | <i class="fa-solid fa-envelope"></i> ${r.email}</span>
          <span style="font-size:0.75rem; display:inline-block; max-width:max-content; background:var(--bg-light); padding:2px 6px; border-radius:4px; font-weight:600; color:var(--primary-color);">${r.specialty.toUpperCase()}</span>
        </div>
      `,a=`
        <div style="display:flex; flex-direction:column; gap:0.15rem; font-size:0.85rem;">
          <span>${r.location}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-map-pin"></i> ${r.coordinates}</span>
        </div>
      `,l=r.verificationNotes?`<div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem; border-left:2px solid var(--accent-color); padding-left:4px; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${r.verificationNotes}">${r.verificationNotes}</div>`:"",d=`
        <div style="display:flex; flex-direction:column; align-items:flex-start; gap:0.25rem;">
          <label style="display:flex; align-items:center; gap:0.25rem; font-size:0.8rem; cursor:pointer; font-weight:600; margin:0;">
            <input type="checkbox" ${r.verified?"checked":""} onchange="app.toggleMerchantVerification('${r.shopName}', this.checked)"> Verified Shop
          </label>
          ${l}
          <button class="btn btn-secondary btn-sm" style="padding:2px 6px; font-size:0.7rem; display:inline-flex; align-items:center; gap:2px;" onclick="app.editMerchantNotes('${r.shopName}')">
            <i class="fa-solid fa-pen"></i> Review Notes
          </button>
        </div>
      `,h=r.status==="Suspended",u=`
        <div style="display:flex; gap:0.35rem;">
          <button class="btn btn-secondary btn-sm" style="color:${h?"var(--whatsapp-color)":"var(--accent-color)"}; border-color:${h?"var(--whatsapp-color)":"var(--accent-color)"}; padding:4px 8px; font-size:0.75rem;" onclick="app.toggleMerchantSuspension('${r.shopName}')">
            <i class="fa-solid ${h?"fa-play":"fa-pause"}"></i> ${h?"Unsuspend":"Suspend"}
          </button>
          <button class="btn btn-secondary btn-sm" style="color:#DC2626; border-color:#FCA5A5; padding:4px 8px; font-size:0.75rem;" onclick="app.deleteMerchant('${r.shopName}')">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      `;o.innerHTML=`<td>${c}</td><td>${a}</td><td>${d}</td><td>${u}</td>`,e.appendChild(o)})}async toggleMerchantSuspension(e){const t=this.merchants.find(o=>o.shopName===e);if(!t||!t.id)return;const s=t.status==="Suspended"?"Active":"Suspended",r=localStorage.getItem("ao_jwt_token");try{const o=await fetch(`${E}/api/merchants/${t.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:s})});if(!o.ok){const c=await o.json();this.showToast(`Error: ${c.error||"Failed to update status."}`,"error");return}}catch(o){console.error("Toggle suspension error:",o),this.showToast("Network error updating merchant status.","error");return}this.showToast(`Merchant "${e}" is now ${s}.`,"success"),this.logAdminAction("MERCHANT_STATUS_CHANGE",e,`Merchant status set to ${s}`),await this.loadBackendData(),this.renderAdminMerchants(),this.renderAdminOverview(),this.renderCatalog()}async onboardMerchant(e){var h,u;e.preventDefault();const t=document.getElementById("onboard-merchant-shop").value.trim(),n=document.getElementById("onboard-merchant-phone").value.trim(),s=document.getElementById("onboard-merchant-email").value.trim(),r=document.getElementById("onboard-merchant-specialty").value,o=document.getElementById("onboard-merchant-location").value.trim(),c=document.getElementById("onboard-merchant-coords").value.trim(),a=document.getElementById("onboard-merchant-desc").value.trim();if(!t){this.showToast("Shop name is required.","error");return}if(!s){this.showToast("Merchant email is required.","error");return}if(!n){this.showToast("WhatsApp number is required.","error");return}if(!o){this.showToast("Stall location is required.","error");return}const l=e.target.querySelector("button[type=submit]"),d=l?l.textContent:"";l&&(l.disabled=!0,l.textContent="Registering...");try{const f=await fetch(`${E}/api/auth/register-merchant`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,phone:n,password:"AoMerchant@2024",full_name:t,shop_name:t,shop_location:o,shop_coordinates:c||"5.5562, -0.2284",shop_description:a||`${t} — Quality auto parts and accessories at Abossey Okai.`,shop_specialty:r||"general"})}),p=await f.json();if(!f.ok){const m=p.error||"Registration failed. Please try again.";this.showToast(`Error: ${m}`,"error");return}const y="AO-"+Math.floor(1e3+Math.random()*9e3),g={id:(h=p.merchantProfile)==null?void 0:h.id,shopName:t,phone:n,email:s,specialty:r||"general",location:o,coordinates:c||"5.5562, -0.2284",description:a||`${t} — Quality auto parts and accessories at Abossey Okai.`,avatar:null,verified:!0,passcode:y,status:"Active",since:new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"})};this.merchants.push(g),e.target.reset(),document.querySelectorAll(".market-sector").forEach(m=>{m.classList.remove("active"),m.style.borderColor="#E2E8F0",m.style.background="#fff",m.style.color="var(--charcoal)"}),this.logAdminAction("MERCHANT_ONBOARD",t,`Dealer registered — email: ${s}, phone: ${n}, DB id: ${(u=p.merchantProfile)==null?void 0:u.id}`),document.getElementById("success-shop-name").textContent=t,document.getElementById("success-shop-email").textContent=s,document.getElementById("success-shop-phone").textContent=n,document.getElementById("success-shop-location").textContent=o,document.getElementById("success-shop-passcode").textContent=y;const w=document.getElementById("btn-send-whatsapp-invite");w&&(w.onclick=()=>{const m=`Hello! Your shop "${t}" is now registered on ABBOSSEY OKAI MAGAZINE.

Login Email: ${s}
Temporary Password: AoMerchant@2024
Stall Location: ${o}
Your Passcode: ${y}

Access your merchant portal here: http://localhost:5173/`,v=encodeURIComponent(m);window.open(`https://api.whatsapp.com/send/?phone=${n}&text=${v}`,"_blank")}),document.getElementById("onboard-success-modal").style.display="flex",this.showToast(`✅ "${t}" successfully registered in the database!`,"success"),await this.loadBackendData(),this.renderAdminMerchants(),this.renderAdminOverview()}catch(f){console.error("Onboard merchant error:",f),this.showToast("Network error. Please check your connection and try again.","error")}finally{l&&(l.disabled=!1,l.textContent=d)}}async deleteMerchant(e){if(!confirm(`Are you sure you want to delete merchant "${e}"? This will also delete all their product listings permanently.`))return;const t=this.merchants.find(s=>s.shopName===e);if(!t||!t.id){this.showToast("Merchant not found or missing ID.","error");return}const n=localStorage.getItem("ao_jwt_token");try{const s=await fetch(`${E}/api/merchants/${t.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});if(!s.ok){const r=await s.json();this.showToast(`Error: ${r.error||"Failed to delete merchant."}`,"error");return}}catch(s){console.error("Delete merchant error:",s),this.showToast("Network error deleting merchant.","error");return}this.showToast(`Deleted merchant "${e}" and all associated listings.`,"success"),await this.loadBackendData(),this.renderAdminMerchants(),this.renderAdminOverview(),this.renderCatalog()}renderAdminListings(){const e=document.getElementById("admin-listings-table-body");if(!e)return;const t=document.getElementById("admin-listings-search").value.trim().toLowerCase(),n=this.products.filter(s=>{if(this.adminListingsFilter!=="all"){if(this.adminListingsFilter==="oos"){if(s.stock!=="Out of Stock")return!1}else if(s.status!==this.adminListingsFilter)return!1}return t?s.name.toLowerCase().includes(t)||s.brand.toLowerCase().includes(t)||s.merchant.shopName.toLowerCase().includes(t)||s.category&&s.category.toLowerCase().includes(t):!0});if(e.innerHTML="",n.length===0){e.innerHTML='<tr><td colspan="3" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">No products match your criteria.</td></tr>';return}n.forEach(s=>{const r=document.createElement("tr");let o="";s.images&&s.images.length>0?o=`<img src="${s.images[0]}" class="table-product-img" style="width:36px; height:36px; border-radius:4px; object-fit:cover; margin-right:8px;" alt="${s.name}">`:o=`<div class="table-product-img" style="width:36px; height:36px; border-radius:4px; background:#F1F5F9; display:flex; align-items:center; justify-content:center; font-size:1.1rem; margin-right:8px;">${s.mainType==="parts"?"⚙️":"🔌"}</div>`;let c="badge-new";s.status==="Live"&&(c="badge-instock"),s.status==="Hidden"&&(c="badge-stock"),s.status==="Pending Review"&&(c="badge-refurbished"),s.stock==="Out of Stock"&&(c="badge-oos");const a=`
        <div style="display:flex; align-items:center;">
          ${o}
          <div style="display:flex; flex-direction:column;">
            <strong style="font-size:0.9rem; color:var(--charcoal);">${s.name}</strong>
            <span style="font-size:0.75rem; color:var(--text-muted);">${s.brand} &bull; ₵${s.price.toLocaleString()}</span>
            <div style="margin-top: 2px;">
              <span class="badge ${c}" style="font-size:0.65rem; padding:1px 4px;">${s.status}</span>
            </div>
          </div>
        </div>
      `,l=`
        <div style="display:flex; flex-direction:column;">
          <strong style="font-size:0.85rem; color:var(--primary-color);">${s.merchant.shopName}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-phone"></i> ${s.merchant.phone}</span>
        </div>
      `,d=s.stock==="In Stock"?"badge-instock":"badge-oos";let h="";if(s.status==="Pending Review")h=`
          <button class="btn btn-secondary btn-sm" style="color:var(--whatsapp-color); border-color:var(--whatsapp-color); padding:3px 6px; font-size:0.7rem;" onclick="app.approveAdminListing('${s.id}')">
            <i class="fa-solid fa-check"></i> Approve
          </button>
          <button class="btn btn-secondary btn-sm" style="color:#DC2626; border-color:#FCA5A5; padding:3px 6px; font-size:0.7rem;" onclick="app.rejectAdminListing('${s.id}')">
            <i class="fa-solid fa-xmark"></i> Reject
          </button>
        `;else{const f=s.status==="Live";h=`
          <button class="btn btn-secondary btn-sm" style="color:${f?"var(--accent-color)":"var(--whatsapp-color)"}; border-color:${f?"var(--accent-color)":"var(--whatsapp-color)"}; padding:3px 6px; font-size:0.7rem;" onclick="app.toggleAdminListingVisibility('${s.id}')">
            <i class="fa-solid ${f?"fa-eye-slash":"fa-eye"}"></i> ${f?"Hide":"Publish"}
          </button>
        `}const u=`
        <div style="display:flex; align-items:center; gap:0.35rem; flex-wrap:wrap;">
          <span class="badge ${d}" style="cursor:pointer; font-size:0.7rem; padding:3px 6px;" onclick="app.toggleAdminListingStock('${s.id}')">${s.stock}</span>
          ${h}
          <button class="btn btn-secondary btn-sm" style="padding:3px 6px; font-size:0.7rem;" onclick="app.openProductForm('${s.id}')">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          <button class="btn btn-secondary btn-sm" style="color:#DC2626; border-color:#FCA5A5; padding:3px 6px; font-size:0.7rem;" onclick="app.deleteAdminListing('${s.id}')">
            <i class="fa-solid fa-trash-can"></i> Takedown
          </button>
        </div>
      `;r.innerHTML=`<td>${a}</td><td>${l}</td><td>${u}</td>`,e.appendChild(r)})}async approveAdminListing(e){var s;const t=this.products.find(r=>r.id==e||String(r.id)===String(e));if(!t)return;const n=localStorage.getItem("ao_jwt_token");try{const r=await fetch(`${E}/api/admin/products/${e}/status`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:n?`Bearer ${n}`:""},body:JSON.stringify({status:"Live"})});if(r.ok)this.showToast(`Listing "${t.name}" approved successfully!`,"success"),this.logAdminAction("LISTING_APPROVED",t.name,`Approved pending listing from ${((s=t.merchant)==null?void 0:s.shopName)||"Unknown"}`);else{const o=await r.json();this.showToast(o.error||"Failed to approve listing.","error");return}}catch{this.showToast("Could not reach backend server.","error");return}await this.loadBackendData()}async rejectAdminListing(e){var r;const t=this.products.find(o=>o.id==e||String(o.id)===String(e));if(!t)return;const n=prompt(`Enter rejection feedback/reason for "${t.name}":`,"Please upload a clearer image of the part number.");if(n===null)return;const s=localStorage.getItem("ao_jwt_token");try{const o=await fetch(`${E}/api/admin/products/${e}/status`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:s?`Bearer ${s}`:""},body:JSON.stringify({status:"Hidden"})});if(o.ok)this.showToast(`Listing "${t.name}" rejected.`,"success"),this.logAdminAction("LISTING_REJECTED",t.name,`Rejected listing from ${((r=t.merchant)==null?void 0:r.shopName)||"Unknown"}. Reason: ${n}`);else{const c=await o.json();this.showToast(c.error||"Failed to reject listing.","error");return}}catch{this.showToast("Could not reach backend server.","error");return}await this.loadBackendData()}async toggleAdminListingVisibility(e){const t=this.products.find(o=>o.id==e||String(o.id)===String(e));if(!t)return;const n=t.status,s=t.status==="Live"?"Hidden":"Live",r=localStorage.getItem("ao_jwt_token");try{const o=await fetch(`${E}/api/admin/products/${e}/status`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:r?`Bearer ${r}`:""},body:JSON.stringify({status:s})});if(o.ok)this.showToast(`Listing visibility set to ${s}.`,"success"),this.logAdminAction("SETTINGS_CHANGE",t.name,`Visibility status changed from ${n} to ${s}`);else{const c=await o.json();this.showToast(c.error||"Failed to update visibility.","error");return}}catch{this.showToast("Could not reach backend server.","error");return}await this.loadBackendData()}async toggleAdminListingStock(e){const t=this.products.find(r=>r.id==e||String(r.id)===String(e));if(!t)return;const n=t.stock==="In Stock"?"Out of Stock":"In Stock",s=localStorage.getItem("ao_jwt_token");try{const r=await fetch(`${E}/api/products/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:s?`Bearer ${s}`:""},body:JSON.stringify({stock:n})});if(r.ok)this.showToast(`Listing stock status set to ${n}`,"success"),this.logAdminAction("LISTING_STOCK_TOGGLE",t.name,`Stock status set to ${n}`);else{const o=await r.json();this.showToast(o.error||"Failed to update stock.","error");return}}catch{this.showToast("Could not reach backend server.","error");return}await this.loadBackendData()}async deleteAdminListing(e){if(!confirm("Are you sure you want to take down this listing permanently?"))return;const t=this.products.find(r=>r.id==e||String(r.id)===String(e)),n=t?t.name:"Unknown Product",s=localStorage.getItem("ao_jwt_token");try{const r=await fetch(`${E}/api/products/${e}`,{method:"DELETE",headers:{Authorization:s?`Bearer ${s}`:""}});if(r.ok)this.showToast(`Successfully took down listing: "${n}"`,"success"),this.logAdminAction("LISTING_DELETE",n,"Listing taken down permanently by admin");else{const o=await r.json();this.showToast(o.error||"Failed to take down listing.","error");return}}catch{this.showToast("Could not reach backend server.","error");return}await this.loadBackendData()}async renderAdminReports(){const e=document.getElementById("admin-reports-table-body");if(!e)return;e.innerHTML='<tr><td colspan="3" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">Loading reports...</td></tr>';let t=[];const n=localStorage.getItem("ao_jwt_token");try{const s=await fetch(`${E}/api/admin/reports`,{headers:{Authorization:n?`Bearer ${n}`:""}});s.ok&&(t=((await s.json()).reports||[]).filter(o=>o.status==="open"))}catch(s){console.warn("Could not load reports from backend:",s)}try{const s=localStorage.getItem("ao_reported_listings"),r=s?JSON.parse(s):[];r.length>0&&t.length===0&&(t=r)}catch{}if(e.innerHTML="",t.length===0){e.innerHTML='<tr><td colspan="3" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">No unresolved buyer reports.</td></tr>';return}t.forEach(s=>{const r=document.createElement("tr"),o=s.product_name||s.productName||"Unknown Product",c=s.merchant_shop_name||s.shopName||"Unknown Seller",a=s.reason||"No reason provided",l=s.created_at?new Date(s.created_at).toLocaleDateString():s.date||"",d=s.id,h=s.product_id||s.productId,u=`
        <div style="display:flex; flex-direction:column;">
          <strong style="font-size:0.85rem; color:var(--charcoal);">${o}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-shop"></i> Seller: ${c}</span>
        </div>
      `,f=`
        <div style="display:flex; flex-direction:column; font-size:0.85rem;">
          <span style="color:#DC2626; font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> ${a}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${l}</span>
          ${s.details?`<span style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">${s.details}</span>`:""}
        </div>
      `,p=`
        <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" style="color:var(--whatsapp-color); border-color:var(--whatsapp-color); padding:3px 6px; font-size:0.75rem;" onclick="app.dismissAdminReport('${d}')">
            <i class="fa-solid fa-check"></i> Dismiss
          </button>
          <button class="btn btn-secondary btn-sm" style="color:var(--accent-color); border-color:var(--accent-color); padding:3px 6px; font-size:0.75rem;" onclick="app.warnMerchantFromReport('${d}', '${c}')">
            <i class="fa-solid fa-circle-exclamation"></i> Warn Seller
          </button>
          <button class="btn btn-secondary btn-sm" style="color:#DC2626; border-color:#FCA5A5; padding:3px 6px; font-size:0.75rem;" onclick="app.resolveAdminReportTakedown('${d}', '${h}')">
            <i class="fa-solid fa-trash"></i> Takedown
          </button>
        </div>
      `;r.innerHTML=`<td>${u}</td><td>${f}</td><td>${p}</td>`,e.appendChild(r)})}async dismissAdminReport(e){const t=localStorage.getItem("ao_jwt_token");try{if((await fetch(`${E}/api/admin/reports/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:t?`Bearer ${t}`:""},body:JSON.stringify({status:"dismissed"})})).ok)this.showToast("Report dismissed.","success"),this.logAdminAction("REPORT_DISMISS",`Report #${e}`,"Admin dismissed buyer report flag");else{this.showToast("Failed to dismiss report.","error");return}}catch{const s=localStorage.getItem("ao_reported_listings");let r=s?JSON.parse(s):[];r=r.filter(o=>o.id!==e),localStorage.setItem("ao_reported_listings",JSON.stringify(r)),this.showToast("Report dismissed.","success"),this.logAdminAction("REPORT_DISMISS",`Report #${e}`,"Admin dismissed buyer report flag")}await this.renderAdminReports(),await this.loadBackendData()}async resolveAdminReportTakedown(e,t){const n=this.products.find(o=>o.id==t||String(o.id)===String(t)),s=n?n.name:"Unknown Product",r=localStorage.getItem("ao_jwt_token");try{const o=await fetch(`${E}/api/products/${t}`,{method:"DELETE",headers:{Authorization:r?`Bearer ${r}`:""}});if(!o.ok){const c=await o.json();this.showToast(c.error||"Failed to take down listing.","error");return}}catch{this.showToast("Could not reach backend server.","error");return}try{await fetch(`${E}/api/admin/reports/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:r?`Bearer ${r}`:""},body:JSON.stringify({status:"resolved"})})}catch{const c=localStorage.getItem("ao_reported_listings");let a=c?JSON.parse(c):[];a=a.filter(l=>l.id!==e),localStorage.setItem("ao_reported_listings",JSON.stringify(a))}this.showToast("Listing taken down and report resolved.","success"),this.logAdminAction("REPORT_TAKEDOWN",s,"Listing taken down permanently due to buyer flag"),await this.loadBackendData()}async warnMerchantFromReport(e,t){const n=localStorage.getItem("ao_jwt_token");try{if((await fetch(`${E}/api/admin/reports/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:n?`Bearer ${n}`:""},body:JSON.stringify({status:"warned"})})).ok)this.showToast(`Warning issued to dealer "${t}".`,"success"),this.logAdminAction("SETTINGS_CHANGE",t,`Warning issued due to listing flag. Merchant: ${t}`);else{this.showToast("Failed to issue warning.","error");return}}catch{const r=localStorage.getItem("ao_reported_listings");let o=r?JSON.parse(r):[];o=o.filter(c=>c.id!==e),localStorage.setItem("ao_reported_listings",JSON.stringify(o)),this.showToast(`Warning issued to dealer "${t}".`,"success"),this.logAdminAction("SETTINGS_CHANGE",t,`Warning issued due to listing flag. Merchant: ${t}`)}await this.loadBackendData()}renderAdminTaxonomy(){const e=document.getElementById("admin-select-make-edit");e&&(e.innerHTML="",Object.keys(S).forEach(t=>{const n=document.createElement("option");n.value=t,n.textContent=t,e.appendChild(n)}),this.onAdminTaxonomyMakeChange(),this.renderAdminCategoriesLists(),this.renderAdminBrandsList())}onAdminTaxonomyMakeChange(){const e=document.getElementById("admin-select-make-edit");if(!e)return;const t=e.value,n=document.getElementById("admin-models-list-display");if(!n||!t||!S[t])return;n.innerHTML="";const s=S[t].models;if(s.length===0){n.innerHTML='<span style="font-size:0.75rem; color:var(--text-muted);">No models added yet.</span>';return}s.forEach(r=>{const o=document.createElement("span");o.className="settings-tag",o.style.cssText="display:inline-flex; align-items:center; gap:0.25rem; font-size:0.75rem; background:#E2E8F0; padding:2px 8px; border-radius:12px; margin:2px;",o.innerHTML=`${r} <i class="fa-solid fa-times" style="cursor:pointer; color:var(--text-muted);" onclick="app.deleteAdminModel('${t}', '${r}')"></i>`,n.appendChild(o)})}addAdminMake(){const e=document.getElementById("admin-new-make-input"),t=e.value.trim();if(t){if(S[t]){this.showToast("Make already exists.","error");return}S[t]={models:[],years:["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"]},localStorage.setItem("ao_vehicle_taxonomy",JSON.stringify(S)),e.value="",this.showToast(`Make "${t}" added successfully.`,"success"),this.logAdminAction("TAXONOMY_ADD",`Make: ${t}`,"Added vehicle make to settings"),this.renderAdminTaxonomy(),this.populateSelectOptions()}}addAdminModel(){const e=document.getElementById("admin-select-make-edit").value,t=document.getElementById("admin-new-model-input"),n=t.value.trim();if(!(!e||!n)){if(S[e].models.includes(n)){this.showToast("Model already exists for this make.","error");return}S[e].models.push(n),localStorage.setItem("ao_vehicle_taxonomy",JSON.stringify(S)),t.value="",this.showToast(`Model "${n}" added for ${e}.`,"success"),this.logAdminAction("TAXONOMY_ADD",`Model: ${e} ${n}`,"Added model to vehicle make"),this.onAdminTaxonomyMakeChange(),this.populateSelectOptions()}}deleteAdminModel(e,t){confirm(`Are you sure you want to remove model "${t}" from ${e}?`)&&(S[e].models=S[e].models.filter(n=>n!==t),localStorage.setItem("ao_vehicle_taxonomy",JSON.stringify(S)),this.showToast(`Model "${t}" removed.`,"success"),this.logAdminAction("TAXONOMY_DELETE",`Model: ${e} ${t}`,"Removed model from vehicle make"),this.onAdminTaxonomyMakeChange(),this.populateSelectOptions())}renderAdminCategoriesLists(){const e=document.getElementById("admin-part-categories-list"),t=document.getElementById("admin-acc-categories-list");e&&(e.innerHTML="",H.forEach(n=>{const s=document.createElement("div");s.style.cssText="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; padding:4px 0; border-bottom:1px solid #F1F5F9;",s.innerHTML=`<span style="flex:1;">${n}</span> <i class="fa-solid fa-trash-can" style="cursor:pointer; color:#DC2626;" onclick="app.deleteAdminPartCategory('${n}')"></i>`,e.appendChild(s)})),t&&(t.innerHTML="",Y.forEach(n=>{const s=document.createElement("div");s.style.cssText="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; padding:4px 0; border-bottom:1px solid #F1F5F9;",s.innerHTML=`<span style="flex:1;">${n}</span> <i class="fa-solid fa-trash-can" style="cursor:pointer; color:#DC2626;" onclick="app.deleteAdminAccessoryCategory('${n}')"></i>`,t.appendChild(s)}))}addAdminPartCategory(){const e=document.getElementById("admin-new-part-cat"),t=e.value.trim();if(t){if(H.includes(t)){this.showToast("Category already exists.","error");return}H.push(t),localStorage.setItem("ao_parts_categories",JSON.stringify(H)),e.value="",this.showToast(`Category "${t}" added.`,"success"),this.logAdminAction("TAXONOMY_ADD",`Parts Category: ${t}`,"Added spare parts category"),this.renderAdminCategoriesLists(),this.populateSelectOptions()}}deleteAdminPartCategory(e){if(!confirm(`Are you sure you want to remove parts category "${e}"?`))return;const t=H.indexOf(e);t!==-1&&(H.splice(t,1),localStorage.setItem("ao_parts_categories",JSON.stringify(H)),this.showToast(`Category "${e}" removed.`,"success"),this.logAdminAction("TAXONOMY_DELETE",`Parts Category: ${e}`,"Removed spare parts category"),this.renderAdminCategoriesLists(),this.populateSelectOptions())}addAdminAccessoryCategory(){const e=document.getElementById("admin-new-acc-cat"),t=e.value.trim();if(t){if(Y.includes(t)){this.showToast("Category already exists.","error");return}Y.push(t),localStorage.setItem("ao_accessory_categories",JSON.stringify(Y)),e.value="",this.showToast(`Category "${t}" added.`,"success"),this.logAdminAction("TAXONOMY_ADD",`Accessory Category: ${t}`,"Added car accessory category"),this.renderAdminCategoriesLists(),this.populateSelectOptions()}}deleteAdminAccessoryCategory(e){if(!confirm(`Are you sure you want to remove accessory category "${e}"?`))return;const t=Y.indexOf(e);t!==-1&&(Y.splice(t,1),localStorage.setItem("ao_accessory_categories",JSON.stringify(Y)),this.showToast(`Category "${e}" removed.`,"success"),this.logAdminAction("TAXONOMY_DELETE",`Accessory Category: ${e}`,"Removed car accessory category"),this.renderAdminCategoriesLists(),this.populateSelectOptions())}toggleSearchModal(e){const t=document.getElementById("search-modal");if(t)if(e){t.style.display="flex",setTimeout(()=>{t.classList.add("active")},10);const n=document.getElementById("main-search-input");n&&setTimeout(()=>n.focus(),300)}else t.classList.remove("active"),setTimeout(()=>{t.classList.contains("active")||(t.style.display="none")},250)}toggleBrandSearchModal(e,t){const n=document.getElementById("brand-search-modal");if(n)if(e){this.selectedBrandForSearch=t;const s=document.getElementById("brand-modal-logo"),r=document.getElementById("brand-modal-name"),o=document.getElementById("brand-parts-search-apply"),c=this.allBrandsData.find(l=>l.name.toLowerCase()===t.toLowerCase())||{logo:"default-logo.png"};s&&(s.src=`/assets/images/brands/all/${c.logo}?v=3`),r&&(r.textContent=t),o&&(o.innerHTML=`<i class="fa-solid fa-magnifying-glass"></i> Find Parts for ${t}`);const a=document.getElementById("brand-part-search-input");a&&(a.value=""),this.populateBrandModalSelectors(t),this.setBrandSearchMode("parts"),n.style.display="flex",setTimeout(()=>{n.classList.add("active")},10),a&&setTimeout(()=>a.focus(),300)}else n.classList.remove("active"),setTimeout(()=>{n.classList.contains("active")||(n.style.display="none")},250)}getTaxonomyForBrand(e){var o;if(!e)return{models:[],years:[]};const t=e.toLowerCase();let n=e;if((t==="mercedes-benz"||t==="mercedes")&&(n="Mercedes"),S[n])return S[n];const s=Object.keys(S).find(c=>c.toLowerCase()===t);if(s)return S[s];const r=((o=this.allBrandsData.find(c=>c.name.toLowerCase()===t))==null?void 0:o.category)==="commercial";return t==="acura"?{models:["MDX","RDX","TLX","ILX","Integra"],years:this.getDefaultYears()}:t==="audi"?{models:["A3","A4","A6","Q5","Q7","e-tron"],years:this.getDefaultYears()}:t==="byd"?{models:["Atto 3","Han","Tang","Dolphin","Seal"],years:this.getDefaultYears()}:t==="chevrolet"?{models:["Cruze","Malibu","Equinox","Silverado","Camaro"],years:this.getDefaultYears()}:t==="chrysler"?{models:["300","Pacifica","Voyager","Aspen"],years:this.getDefaultYears()}:t==="dodge"?{models:["Charger","Challenger","Durango","Ram 1500"],years:this.getDefaultYears()}:t==="jeep"?{models:["Wrangler","Grand Cherokee","Cherokee","Compass","Renegade"],years:this.getDefaultYears()}:t==="lexus"?{models:["RX","NX","ES","IS","GX","LX"],years:this.getDefaultYears()}:t==="mazda"?{models:["Mazda 3","Mazda 6","CX-5","CX-9","MX-5 Miata"],years:this.getDefaultYears()}:t==="mitsubishi"?{models:["Lancer","Outlander","Pajero","Mirage","ASX"],years:this.getDefaultYears()}:t==="opel"?{models:["Astra","Corsa","Insignia","Mokka","Vectra"],years:this.getDefaultYears()}:t==="peugeot"?{models:["208","308","508","2008","3008","5008"],years:this.getDefaultYears()}:t==="porsche"?{models:["911","Cayenne","Macan","Panamera","Taycan"],years:this.getDefaultYears()}:t==="renault"?{models:["Clio","Megane","Captur","Koleos","Duster"],years:this.getDefaultYears()}:t==="subaru"?{models:["Impreza","Legacy","Outback","Forester","WRX"],years:this.getDefaultYears()}:t==="suzuki"?{models:["Swift","Vitara","Jimny","Baleno","Alto"],years:this.getDefaultYears()}:t==="tesla"?{models:["Model 3","Model Y","Model S","Model X","Cybertruck"],years:this.getDefaultYears()}:t==="volkswagen"?{models:["Golf","Passat","Tiguan","Touareg","Polo","Jetta"],years:this.getDefaultYears()}:t==="volvo"?{models:["S60","S90","XC40","XC60","XC90"],years:this.getDefaultYears()}:r?{models:["Heavy Duty Truck","Tractor Head","Tipper","Cargo Truck","Bus Chassis"],years:this.getDefaultYears()}:{models:["Series A","Series B","Universal Utility","Custom Concept"],years:this.getDefaultYears()}}getDefaultYears(){return["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"]}populateBrandModalSelectors(e){const t=document.getElementById("select-brand-model"),n=document.getElementById("select-brand-year");if(!t||!n)return;t.innerHTML='<option value="">Choose Model</option>',n.innerHTML='<option value="">Choose Year</option>',n.disabled=!0,this.getTaxonomyForBrand(e).models.forEach(r=>{t.innerHTML+=`<option value="${r}">${r}</option>`})}onBrandModelChange(){const e=document.getElementById("select-brand-model"),t=document.getElementById("select-brand-year");if(!e||!t)return;if(!e.value){t.innerHTML='<option value="">Choose Year</option>',t.disabled=!0;return}t.disabled=!1,t.innerHTML='<option value="">Choose Year</option>',this.getTaxonomyForBrand(this.selectedBrandForSearch).years.forEach(r=>{t.innerHTML+=`<option value="${r}">${r}</option>`})}setBrandSearchMode(e){this.brandSearchMode=e;const t=document.getElementById("brand-tab-mode-parts"),n=document.getElementById("brand-tab-mode-accessories"),s=document.getElementById("brand-parts-section"),r=document.getElementById("brand-accessories-section");e==="parts"?(t.classList.add("active"),n.classList.remove("active"),s.style.display="block",r.style.display="none"):(t.classList.remove("active"),n.classList.add("active"),s.style.display="none",r.style.display="block")}applyBrandPartsSearch(){const e=document.getElementById("select-brand-model")?document.getElementById("select-brand-model").value:"",t=document.getElementById("select-brand-year")?document.getElementById("select-brand-year").value:"",n=document.getElementById("brand-part-search-input")?document.getElementById("brand-part-search-input").value.trim():"";this.activeMainType="parts";const s=document.getElementById("nav-parts"),r=document.getElementById("nav-accessories");s&&s.classList.add("active"),r&&r.classList.remove("active"),this.activeFilters.make=this.selectedBrandForSearch||"",this.activeFilters.model=e,this.activeFilters.year=t,this.activeFilters.partsCategory="",this.activeFilters.brands=[],this.searchQuery=n.toLowerCase();const o=document.getElementById("main-search-input");o&&(o.value=n);const c=document.getElementById("select-vehicle-make");if(c&&this.selectedBrandForSearch){const l=Object.keys(S).find(d=>d.toLowerCase()===this.selectedBrandForSearch.toLowerCase());if(l){c.value=l,this.onMakeChange();const d=document.getElementById("select-vehicle-model");if(d&&e){d.value=e,this.onModelChange();const h=document.getElementById("select-vehicle-year");h&&t&&(h.value=t)}}else c.value="",this.onMakeChange()}this.renderCatalog(),this.scrollToMarketplace(),this.toggleBrandSearchModal(!1),this.switchAppView("storefront");let a=`Showing parts for ${this.selectedBrandForSearch}`;n&&e&&t?a=`Showing "${n}" for ${this.selectedBrandForSearch} ${e} (${t})`:n&&e?a=`Showing "${n}" for ${this.selectedBrandForSearch} ${e}`:n?a=`Showing "${n}" for ${this.selectedBrandForSearch}`:e&&t?a=`Showing parts for ${this.selectedBrandForSearch} ${e} (${t})`:e&&(a=`Showing parts for ${this.selectedBrandForSearch} ${e}`),this.showToast(a,"success")}applyBrandAccessorySearch(e,t){this.activeMainType="accessories",this.selectedAccessoryCat=e,document.getElementById("nav-parts").classList.remove("active"),document.getElementById("nav-accessories").classList.add("active"),document.querySelectorAll("#brand-search-card .accessory-cat-card").forEach(s=>s.classList.remove("active")),t&&t.classList.add("active"),this.activeFilters.make="",this.activeFilters.model="",this.activeFilters.year="",this.activeFilters.brands=[this.selectedBrandForSearch],this.activeFilters.accessoryCategory=e,this.searchQuery="";const n=document.getElementById("main-search-input");n&&(n.value=""),document.querySelectorAll(".brand-filter-checkbox").forEach(s=>{s.checked=s.value.toLowerCase()===this.selectedBrandForSearch.toLowerCase()}),this.renderCatalog(),this.scrollToMarketplace(),this.toggleBrandSearchModal(!1),this.switchAppView("storefront"),this.showToast(`Showing ${e} accessories for ${this.selectedBrandForSearch}`,"success")}showStorefront(){this.switchAppView("storefront")}scrollTabsRight(){const e=document.getElementById("brands-tabs-wrapper");e&&e.scrollBy({left:160,behavior:"smooth"})}renderBrandsView(){this.brandSearchQuery=this.brandSearchQuery||"",this.activeBrandTab=this.activeBrandTab||"all";const e=document.getElementById("all-brands-grid");if(!e)return;const t=this.allBrandsData.filter(s=>{const r=s.name.toLowerCase().includes(this.brandSearchQuery.toLowerCase()),o=this.activeBrandTab==="all"||s.category===this.activeBrandTab;return r&&o});t.sort((s,r)=>s.name.localeCompare(r.name));const n=document.getElementById("brands-count-text");n&&(n.textContent=`Showing ${t.length} of ${this.allBrandsData.length} brands`),e.innerHTML=t.map(s=>`
      <div class="brand-card-item" onclick="app.selectBrandAndRedirect('${s.name}')">
        <div class="brand-card-logo-box">
          <img src="/assets/images/brands/all/${s.logo}?v=3" alt="${s.name}" class="brand-card-logo-img">
        </div>
        <div class="brand-card-name">${s.name}</div>
      </div>
    `).join(""),setTimeout(()=>{const s=document.getElementById("brands-tabs-wrapper"),r=document.getElementById("brands-tabs-arrow");s&&r&&(s.scrollLeft=0,r.style.opacity="1",r.style.pointerEvents="auto",s.onscroll=()=>{const o=s.scrollWidth-s.clientWidth;s.scrollLeft>=o-15?(r.style.opacity="0",r.style.pointerEvents="none"):(r.style.opacity="1",r.style.pointerEvents="auto")})},50)}filterBrandsList(){const e=document.getElementById("brand-search-input");e&&(this.brandSearchQuery=e.value,this.renderBrandsView())}switchBrandTab(e,t){this.activeBrandTab=e,document.querySelectorAll(".brand-tab-btn").forEach(n=>n.classList.remove("active")),t&&t.classList.add("active"),this.renderBrandsView()}selectBrandAndRedirect(e){this.toggleBrandSearchModal(!0,e)}}window.app=new So;
