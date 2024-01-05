/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis,B=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),q=new WeakMap;let st=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(B&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&q.set(e,t))}return t}toString(){return this.cssText}};const ct=i=>new st(typeof i=="string"?i:i+"",void 0,j),lt=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new st(e,i,j)},dt=(i,t)=>{if(B)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),r=M.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},K=B?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ct(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:pt,defineProperty:ut,getOwnPropertyDescriptor:$t,getOwnPropertyNames:_t,getOwnPropertySymbols:gt,getPrototypeOf:ft}=Object,k=globalThis,Y=k.trustedTypes,mt=Y?Y.emptyScript:"",At=k.reactiveElementPolyfillSupport,w=(i,t)=>i,x={toAttribute(i,t){switch(t){case Boolean:i=i?mt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},W=(i,t)=>!pt(i,t),J={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:W};Symbol.metadata??=Symbol("metadata"),k.litPropertyMetadata??=new WeakMap;class v extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=J){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&ut(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:n}=$t(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){const c=r?.call(this);n.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??J}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,s=[..._t(e),...gt(e)];for(const r of s)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)e.unshift(K(r))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$ES(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$E_??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$E_?.delete(t)}_$ES(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$E_?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$E_?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e){const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:x).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:x;this._$Em=r,this[r]=o.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,s,r=!1,n){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??W)(r?n:this[t],e))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$Eg=this._$EP())}C(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,n]of s)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.C(r,this[r],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$E_?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$ET()}catch(s){throw t=!1,this._$ET(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$E_?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach(e=>this._$EO(e,this[e])),this._$ET()}updated(t){}firstUpdated(t){}}v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[w("elementProperties")]=new Map,v[w("finalized")]=new Map,At?.({ReactiveElement:v}),(k.reactiveElementVersions??=[]).push("2.0.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=globalThis,H=V.trustedTypes,F=H?H.createPolicy("lit-html",{createHTML:i=>i}):void 0,it="$lit$",m=`lit$${(Math.random()+"").slice(9)}$`,rt="?"+m,yt=`<${rt}>`,S=document,T=()=>S.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",nt=Array.isArray,St=i=>nt(i)||typeof i?.[Symbol.iterator]=="function",D=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Z=/-->/g,Q=/>/g,A=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),X=/'/g,tt=/"/g,ot=/^(?:script|style|textarea|title)$/i,vt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),Et=vt(1),E=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),et=new WeakMap,y=S.createTreeWalker(S,129);function ht(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return F!==void 0?F.createHTML(t):t}const bt=(i,t)=>{const e=i.length-1,s=[];let r,n=t===2?"<svg>":"",o=C;for(let c=0;c<e;c++){const h=i[c];let d,u,a=-1,g=0;for(;g<h.length&&(o.lastIndex=g,u=o.exec(h),u!==null);)g=o.lastIndex,o===C?u[1]==="!--"?o=Z:u[1]!==void 0?o=Q:u[2]!==void 0?(ot.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=A):u[3]!==void 0&&(o=A):o===A?u[0]===">"?(o=r??C,a=-1):u[1]===void 0?a=-2:(a=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?A:u[3]==='"'?tt:X):o===tt||o===X?o=A:o===Z||o===Q?o=C:(o=A,r=void 0);const f=o===A&&i[c+1].startsWith("/>")?" ":"";n+=o===C?h+yt:a>=0?(s.push(d),h.slice(0,a)+it+h.slice(a)+m+f):h+m+(a===-2?c:f)}return[ht(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),s]};class N{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0;const c=t.length-1,h=this.parts,[d,u]=bt(t,e);if(this.el=N.createElement(d,s),y.currentNode=this.el.content,e===2){const a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(r=y.nextNode())!==null&&h.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const a of r.getAttributeNames())if(a.endsWith(it)){const g=u[o++],f=r.getAttribute(a).split(m),I=/([.?@])?(.*)/.exec(g);h.push({type:1,index:n,name:I[2],strings:f,ctor:I[1]==="."?wt:I[1]==="?"?Ut:I[1]==="@"?Pt:G}),r.removeAttribute(a)}else a.startsWith(m)&&(h.push({type:6,index:n}),r.removeAttribute(a));if(ot.test(r.tagName)){const a=r.textContent.split(m),g=a.length-1;if(g>0){r.textContent=H?H.emptyScript:"";for(let f=0;f<g;f++)r.append(a[f],T()),y.nextNode(),h.push({type:2,index:++n});r.append(a[g],T())}}}else if(r.nodeType===8)if(r.data===rt)h.push({type:2,index:n});else{let a=-1;for(;(a=r.data.indexOf(m,a+1))!==-1;)h.push({type:7,index:n}),a+=m.length-1}n++}}static createElement(t,e){const s=S.createElement("template");return s.innerHTML=t,s}}function b(i,t,e=i,s){if(t===E)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl;const n=O(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=b(i,r._$AS(i,t.values),r,s)),t}let Ct=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??S).importNode(e,!0);y.currentNode=r;let n=y.nextNode(),o=0,c=0,h=s[0];for(;h!==void 0;){if(o===h.index){let d;h.type===2?d=new R(n,n.nextSibling,this,t):h.type===1?d=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(d=new Tt(n,this,t)),this._$AV.push(d),h=s[++c]}o!==h?.index&&(n=y.nextNode(),o++)}return y.currentNode=S,r}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}};class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=b(this,t,e),O(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):St(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==l&&O(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(ht(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{const n=new Ct(r,this),o=n.u(this.options);n.p(e),this.$(o),this._$AH=n}}_$AC(t){let e=et.get(t.strings);return e===void 0&&et.set(t.strings,e=new N(t)),e}T(t){nt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const n of t)r===e.length?e.push(s=new R(this.k(T()),this.k(T()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class G{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,r){const n=this.strings;let o=!1;if(n===void 0)t=b(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const c=t;let h,d;for(t=n[0],h=0;h<n.length-1;h++)d=b(this,c[s+h],e,h),d===E&&(d=this._$AH[h]),o||=!O(d)||d!==this._$AH[h],d===l?t=l:t!==l&&(t+=(d??"")+n[h+1]),this._$AH[h]=d}o&&!r&&this.O(t)}O(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class wt extends G{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===l?void 0:t}}class Ut extends G{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}}class Pt extends G{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=b(this,t,e,0)??l)===E)return;const s=this._$AH,r=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==l&&(s===l||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Tt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){b(this,t)}}const Ot=V.litHtmlPolyfillSupport;Ot?.(N,R),(V.litHtmlVersions??=[]).push("3.1.0");const Nt=(i,t,e)=>{const s=e?.renderBefore??t;let r=s._$litPart$;if(r===void 0){const n=e?.renderBefore??null;s._$litPart$=r=new R(t.insertBefore(T(),n),n,void 0,e??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let U=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};U._$litElement$=!0,U.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:U});const Rt=globalThis.litElementPolyfillSupport;Rt?.({LitElement:U});(globalThis.litElementVersions??=[]).push("4.0.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const It=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:W},xt=(i=Mt,t,e)=>{const{kind:s,metadata:r}=e;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(e.name,i),s==="accessor"){const{name:o}=e;return{set(c){const h=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,h,i)},init(c){return c!==void 0&&this.C(o,void 0,i),c}}}if(s==="setter"){const{name:o}=e;return function(c){const h=this[o];t.call(this,c),this.requestUpdate(o,h,i)}}throw Error("Unsupported decorator location: "+s)};function _(i){return(t,e)=>typeof e=="object"?xt(i,t,e):((s,r,n)=>{const o=r.hasOwnProperty(n);return r.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(r,n):void 0})(i,t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht=i=>i.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},kt=i=>(...t)=>({_$litDirective$:i,values:t});let Gt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=(i,t)=>{const e=i._$AN;if(e===void 0)return!1;for(const s of e)s._$AO?.(t,!1),P(s,t);return!0},L=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},at=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),Bt(t)}};function Dt(i){this._$AN!==void 0?(L(this),this._$AM=i,at(this)):this._$AM=i}function zt(i,t=!1,e=0){const s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)P(s[n],!1),L(s[n]);else s!=null&&(P(s,!1),L(s));else P(this,i)}const Bt=i=>{i.type==Lt.CHILD&&(i._$AP??=zt,i._$AQ??=Dt)};class jt extends Gt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),at(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(P(this,t),L(this))}setValue(t){if(Ht(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=()=>new Vt;class Vt{}const z=new WeakMap,qt=kt(class extends jt{render(i){return l}update(i,[t]){const e=t!==this.G;return e&&this.G!==void 0&&this.ot(void 0),(e||this.rt!==this.lt)&&(this.G=t,this.ct=i.options?.host,this.ot(this.lt=i.element)),l}ot(i){if(typeof this.G=="function"){const t=this.ct??globalThis;let e=z.get(t);e===void 0&&(e=new WeakMap,z.set(t,e)),e.get(this.G)!==void 0&&this.G.call(this.ct,void 0),e.set(this.G,i),i!==void 0&&this.G.call(this.ct,i)}else this.G.value=i}get rt(){return typeof this.G=="function"?z.get(this.ct??globalThis)?.get(this.G):this.G?.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}});var Kt=Object.defineProperty,Yt=Object.getOwnPropertyDescriptor,$=(i,t,e,s)=>{for(var r=s>1?void 0:s?Yt(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&Kt(t,e,r),r};function Jt(i){return customElements.get(i)?t=>t:It(i)}let p=class extends U{constructor(){super(),this.GISCUS_SESSION_KEY="giscus-session",this.GISCUS_DEFAULT_HOST="https://giscus.app",this.ERROR_SUGGESTION="Please consider reporting this error at https://github.com/giscus/giscus/issues/new.",this.__session="",this._iframeRef=Wt(),this.messageEventHandler=this.handleMessageEvent.bind(this),this.hasLoaded=!1,this.host=this.GISCUS_DEFAULT_HOST,this.strict="0",this.reactionsEnabled="1",this.emitMetadata="0",this.inputPosition="bottom",this.theme="light",this.lang="en",this.loading="eager",this.setupSession(),window.addEventListener("message",this.messageEventHandler)}get iframeRef(){var i;return(i=this._iframeRef)==null?void 0:i.value}get _host(){try{return new URL(this.host),this.host}catch{return this.GISCUS_DEFAULT_HOST}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("message",this.messageEventHandler)}_formatError(i){return`[giscus] An error occurred. Error message: "${i}".`}setupSession(){const i=location.href,t=new URL(i),e=localStorage.getItem(this.GISCUS_SESSION_KEY),s=t.searchParams.get("giscus")??"";if(this.__session="",s){localStorage.setItem(this.GISCUS_SESSION_KEY,JSON.stringify(s)),this.__session=s,t.searchParams.delete("giscus"),t.hash="",history.replaceState(void 0,document.title,t.toString());return}if(e)try{this.__session=JSON.parse(e)}catch(r){localStorage.removeItem(this.GISCUS_SESSION_KEY),console.warn(`${this._formatError(r?.message)} Session has been cleared.`)}}signOut(){localStorage.removeItem(this.GISCUS_SESSION_KEY),this.__session="",this.update(new Map)}handleMessageEvent(i){if(i.origin!==this._host)return;const{data:t}=i;if(!(typeof t=="object"&&t.giscus))return;if(this.iframeRef&&t.giscus.resizeHeight&&(this.iframeRef.style.height=`${t.giscus.resizeHeight}px`),t.giscus.signOut){console.info("[giscus] User has logged out. Session has been cleared."),this.signOut();return}if(!t.giscus.error)return;const e=t.giscus.error;if(e.includes("Bad credentials")||e.includes("Invalid state value")||e.includes("State has expired")){if(localStorage.getItem(this.GISCUS_SESSION_KEY)!==null){console.warn(`${this._formatError(e)} Session has been cleared.`),this.signOut();return}console.error(`${this._formatError(e)} No session is stored initially. ${this.ERROR_SUGGESTION}`)}if(e.includes("Discussion not found")){console.warn(`[giscus] ${e}. A new discussion will be created if a comment/reaction is submitted.`);return}console.error(`${this._formatError(e)} ${this.ERROR_SUGGESTION}`)}sendMessage(i){var t;!((t=this.iframeRef)!=null&&t.contentWindow)||!this.hasLoaded||this.iframeRef.contentWindow.postMessage({giscus:i},this._host)}updateConfig(){const i={setConfig:{repo:this.repo,repoId:this.repoId,category:this.category,categoryId:this.categoryId,term:this.getTerm(),number:+this.getNumber(),strict:this.strict==="1",reactionsEnabled:this.reactionsEnabled==="1",emitMetadata:this.emitMetadata==="1",inputPosition:this.inputPosition,theme:this.theme,lang:this.lang}};this.sendMessage(i)}firstUpdated(){var i;(i=this.iframeRef)==null||i.addEventListener("load",()=>{var t;(t=this.iframeRef)==null||t.classList.remove("loading"),this.hasLoaded=!0,this.updateConfig()})}requestUpdate(i,t,e){if(!this.hasUpdated||i==="host"){super.requestUpdate(i,t,e);return}this.updateConfig()}getMetaContent(i,t=!1){const e=t?`meta[property='og:${i}'],`:"",s=document.querySelector(e+`meta[name='${i}']`);return s?s.content:""}_getCleanedUrl(){const i=new URL(location.href);return i.searchParams.delete("giscus"),i.hash="",i}getTerm(){switch(this.mapping){case"url":return this._getCleanedUrl().toString();case"title":return document.title;case"og:title":return this.getMetaContent("title",!0);case"specific":return this.term??"";case"number":return"";case"pathname":default:return location.pathname.length<2?"index":location.pathname.substring(1).replace(/\.\w+$/,"")}}getNumber(){return this.mapping==="number"?this.term??"":""}getIframeSrc(){const i=this._getCleanedUrl().toString(),t=`${i}${this.id?"#"+this.id:""}`,e=this.getMetaContent("description",!0),s=this.getMetaContent("giscus:backlink")||i,r={origin:t,session:this.__session,repo:this.repo,repoId:this.repoId??"",category:this.category??"",categoryId:this.categoryId??"",term:this.getTerm(),number:this.getNumber(),strict:this.strict,reactionsEnabled:this.reactionsEnabled,emitMetadata:this.emitMetadata,inputPosition:this.inputPosition,theme:this.theme,description:e,backLink:s},n=this._host,o=this.lang?`/${this.lang}`:"",c=new URLSearchParams(r);return`${n}${o}/widget?${c.toString()}`}render(){return Et`
      <iframe
        title="Comments"
        scrolling="no"
        class="loading"
        ${qt(this._iframeRef)}
        src=${this.getIframeSrc()}
        loading=${this.loading}
        allow="clipboard-write"
        part="iframe"
      ></iframe>
    `}};p.styles=lt`
    :host,
    iframe {
      width: 100%;
      border: none;
      min-height: 150px;
      color-scheme: light dark;
    }

    iframe.loading {
      opacity: 0;
    }
  `;$([_({reflect:!0})],p.prototype,"host",2);$([_({reflect:!0})],p.prototype,"repo",2);$([_({reflect:!0})],p.prototype,"repoId",2);$([_({reflect:!0})],p.prototype,"category",2);$([_({reflect:!0})],p.prototype,"categoryId",2);$([_({reflect:!0})],p.prototype,"mapping",2);$([_({reflect:!0})],p.prototype,"term",2);$([_({reflect:!0})],p.prototype,"strict",2);$([_({reflect:!0})],p.prototype,"reactionsEnabled",2);$([_({reflect:!0})],p.prototype,"emitMetadata",2);$([_({reflect:!0})],p.prototype,"inputPosition",2);$([_({reflect:!0})],p.prototype,"theme",2);$([_({reflect:!0})],p.prototype,"lang",2);$([_({reflect:!0})],p.prototype,"loading",2);p=$([Jt("giscus-widget")],p);