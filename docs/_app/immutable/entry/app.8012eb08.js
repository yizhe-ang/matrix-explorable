import{s as q,a as B,e as h,c as U,i as w,d,b as j,o as W,f as z,g as F,h as G,j as D,k as m,l as H,m as J,n as K,p as I,q as k}from"../chunks/scheduler.22d55f23.js";import{S as M,i as Q,t as p,c as P,a as g,g as y,b as E,d as N,m as v,e as R}from"../chunks/index.6b271cb1.js";const X="modulepreload",Y=function(a,e){return new URL(a,e).href},O={},L=function(e,n,i){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(f=>{if(f=Y(f,i),f in O)return;O[f]=!0;const t=f.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(!!i)for(let l=s.length-1;l>=0;l--){const u=s[l];if(u.href===f&&(!t||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${r}`))return;const o=document.createElement("link");if(o.rel=t?"stylesheet":X,t||(o.as="script",o.crossOrigin=""),o.href=f,document.head.appendChild(o),t)return new Promise((l,u)=>{o.addEventListener("load",l),o.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${f}`)))})})).then(()=>e()).catch(f=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=f,window.dispatchEvent(t),!t.defaultPrevented)throw f})},se={};function Z(a){let e,n,i;var s=a[1][0];function f(t){return{props:{data:t[3],form:t[2]}}}return s&&(e=k(s,f(a)),a[12](e)),{c(){e&&E(e.$$.fragment),n=h()},l(t){e&&N(e.$$.fragment,t),n=h()},m(t,r){e&&v(e,t,r),w(t,n,r),i=!0},p(t,r){const _={};if(r&8&&(_.data=t[3]),r&4&&(_.form=t[2]),r&2&&s!==(s=t[1][0])){if(e){y();const o=e;p(o.$$.fragment,1,0,()=>{R(o,1)}),P()}s?(e=k(s,f(t)),t[12](e),E(e.$$.fragment),g(e.$$.fragment,1),v(e,n.parentNode,n)):e=null}else s&&e.$set(_)},i(t){i||(e&&g(e.$$.fragment,t),i=!0)},o(t){e&&p(e.$$.fragment,t),i=!1},d(t){t&&d(n),a[12](null),e&&R(e,t)}}}function $(a){let e,n,i;var s=a[1][0];function f(t){return{props:{data:t[3],$$slots:{default:[x]},$$scope:{ctx:t}}}}return s&&(e=k(s,f(a)),a[11](e)),{c(){e&&E(e.$$.fragment),n=h()},l(t){e&&N(e.$$.fragment,t),n=h()},m(t,r){e&&v(e,t,r),w(t,n,r),i=!0},p(t,r){const _={};if(r&8&&(_.data=t[3]),r&8215&&(_.$$scope={dirty:r,ctx:t}),r&2&&s!==(s=t[1][0])){if(e){y();const o=e;p(o.$$.fragment,1,0,()=>{R(o,1)}),P()}s?(e=k(s,f(t)),t[11](e),E(e.$$.fragment),g(e.$$.fragment,1),v(e,n.parentNode,n)):e=null}else s&&e.$set(_)},i(t){i||(e&&g(e.$$.fragment,t),i=!0)},o(t){e&&p(e.$$.fragment,t),i=!1},d(t){t&&d(n),a[11](null),e&&R(e,t)}}}function x(a){let e,n,i;var s=a[1][1];function f(t){return{props:{data:t[4],form:t[2]}}}return s&&(e=k(s,f(a)),a[10](e)),{c(){e&&E(e.$$.fragment),n=h()},l(t){e&&N(e.$$.fragment,t),n=h()},m(t,r){e&&v(e,t,r),w(t,n,r),i=!0},p(t,r){const _={};if(r&16&&(_.data=t[4]),r&4&&(_.form=t[2]),r&2&&s!==(s=t[1][1])){if(e){y();const o=e;p(o.$$.fragment,1,0,()=>{R(o,1)}),P()}s?(e=k(s,f(t)),t[10](e),E(e.$$.fragment),g(e.$$.fragment,1),v(e,n.parentNode,n)):e=null}else s&&e.$set(_)},i(t){i||(e&&g(e.$$.fragment,t),i=!0)},o(t){e&&p(e.$$.fragment,t),i=!1},d(t){t&&d(n),a[10](null),e&&R(e,t)}}}function S(a){let e,n=a[6]&&T(a);return{c(){e=z("div"),n&&n.c(),this.h()},l(i){e=F(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var s=G(e);n&&n.l(s),s.forEach(d),this.h()},h(){D(e,"id","svelte-announcer"),D(e,"aria-live","assertive"),D(e,"aria-atomic","true"),m(e,"position","absolute"),m(e,"left","0"),m(e,"top","0"),m(e,"clip","rect(0 0 0 0)"),m(e,"clip-path","inset(50%)"),m(e,"overflow","hidden"),m(e,"white-space","nowrap"),m(e,"width","1px"),m(e,"height","1px")},m(i,s){w(i,e,s),n&&n.m(e,null)},p(i,s){i[6]?n?n.p(i,s):(n=T(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&d(e),n&&n.d()}}}function T(a){let e;return{c(){e=H(a[7])},l(n){e=J(n,a[7])},m(n,i){w(n,e,i)},p(n,i){i&128&&K(e,n[7])},d(n){n&&d(e)}}}function ee(a){let e,n,i,s,f;const t=[$,Z],r=[];function _(l,u){return l[1][1]?0:1}e=_(a),n=r[e]=t[e](a);let o=a[5]&&S(a);return{c(){n.c(),i=B(),o&&o.c(),s=h()},l(l){n.l(l),i=U(l),o&&o.l(l),s=h()},m(l,u){r[e].m(l,u),w(l,i,u),o&&o.m(l,u),w(l,s,u),f=!0},p(l,[u]){let b=e;e=_(l),e===b?r[e].p(l,u):(y(),p(r[b],1,1,()=>{r[b]=null}),P(),n=r[e],n?n.p(l,u):(n=r[e]=t[e](l),n.c()),g(n,1),n.m(i.parentNode,i)),l[5]?o?o.p(l,u):(o=S(l),o.c(),o.m(s.parentNode,s)):o&&(o.d(1),o=null)},i(l){f||(g(n),f=!0)},o(l){p(n),f=!1},d(l){l&&(d(i),d(s)),r[e].d(l),o&&o.d(l)}}}function te(a,e,n){let{stores:i}=e,{page:s}=e,{constructors:f}=e,{components:t=[]}=e,{form:r}=e,{data_0:_=null}=e,{data_1:o=null}=e;j(i.page.notify);let l=!1,u=!1,b=null;W(()=>{const c=i.page.subscribe(()=>{l&&(n(6,u=!0),n(7,b=document.title||"untitled page"))});return n(5,l=!0),c});function V(c){I[c?"unshift":"push"](()=>{t[1]=c,n(0,t)})}function A(c){I[c?"unshift":"push"](()=>{t[0]=c,n(0,t)})}function C(c){I[c?"unshift":"push"](()=>{t[0]=c,n(0,t)})}return a.$$set=c=>{"stores"in c&&n(8,i=c.stores),"page"in c&&n(9,s=c.page),"constructors"in c&&n(1,f=c.constructors),"components"in c&&n(0,t=c.components),"form"in c&&n(2,r=c.form),"data_0"in c&&n(3,_=c.data_0),"data_1"in c&&n(4,o=c.data_1)},a.$$.update=()=>{a.$$.dirty&768&&i.page.set(s)},[t,f,r,_,o,l,u,b,i,s,V,A,C]}class re extends M{constructor(e){super(),Q(this,e,te,ee,q,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const oe=[()=>L(()=>import("../nodes/0.0e535377.js"),["../nodes/0.0e535377.js","../chunks/scheduler.22d55f23.js","../chunks/index.6b271cb1.js","../assets/0.27c8a67e.css"],import.meta.url),()=>L(()=>import("../nodes/1.3fc256e8.js"),["../nodes/1.3fc256e8.js","../chunks/scheduler.22d55f23.js","../chunks/index.6b271cb1.js","../chunks/singletons.7a00c9ea.js","../chunks/index.d4642350.js","../chunks/paths.592255e8.js"],import.meta.url),()=>L(()=>import("../nodes/2.3ae59eef.js"),["../nodes/2.3ae59eef.js","../chunks/scheduler.22d55f23.js","../chunks/index.6b271cb1.js","../chunks/transform.43686bf9.js","../chunks/index.d4642350.js","../assets/2.0958d9d8.css"],import.meta.url),()=>L(()=>import("../nodes/3.293523ac.js"),["../nodes/3.293523ac.js","../chunks/scheduler.22d55f23.js","../chunks/index.6b271cb1.js","../assets/3.83b17d31.css"],import.meta.url),()=>L(()=>import("../nodes/4.dd1d3362.js"),["../nodes/4.dd1d3362.js","../chunks/scheduler.22d55f23.js","../chunks/index.6b271cb1.js","../chunks/transform.43686bf9.js","../chunks/paths.592255e8.js","../assets/4.694798f8.css"],import.meta.url)],ae=[],le={"/":[-3],"/demo/elements":[3],"/demo/fonts":[4]},fe={handleError:({error:a})=>{console.error(a)}};export{le as dictionary,fe as hooks,se as matchers,oe as nodes,re as root,ae as server_loads};
