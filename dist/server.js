(()=>{"use strict";var e={n:r=>{var s=r&&r.__esModule?()=>r.default:()=>r;return e.d(s,{a:s}),s},d:(r,s)=>{for(var t in s)e.o(s,t)&&!e.o(r,t)&&Object.defineProperty(r,t,{enumerable:!0,get:s[t]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r),p:"/"};require("react");const r=require("react-dom/server");var s=e.n(r);const t=require("express");var n=e.n(t);const l=require("react-router-dom/server"),o=(e.p,require("react-router-dom")),c=require("react/jsx-runtime"),i=()=>(0,c.jsx)("div",{className:"Red",children:"Red"}),u=()=>(0,c.jsx)("div",{className:"Blue",children:"Blue"}),d=()=>(0,c.jsxs)("ul",{children:[(0,c.jsx)("li",{children:(0,c.jsx)(o.Link,{to:"/red",children:"Red"})}),(0,c.jsx)("li",{children:(0,c.jsx)(o.Link,{to:"/blue",children:"Blue"})})]}),a=()=>(0,c.jsx)(i,{}),j=()=>(0,c.jsx)(u,{}),x=function(){return(0,c.jsxs)("div",{className:"App",children:[(0,c.jsx)(d,{}),(0,c.jsxs)(o.Routes,{children:[(0,c.jsx)(o.Route,{path:"/red",element:(0,c.jsx)(a,{})}),(0,c.jsx)(o.Route,{path:"/blue",element:(0,c.jsx)(j,{})})]})]})},h=n()();h.use(((e,r,t)=>{console.log("::",e.url);const n=(0,c.jsx)(l.StaticRouter,{location:e.url,context:{},children:(0,c.jsx)(x,{})}),o=s().renderToString(n);r.send(o)})),h.listen(5e3,(()=>{console.log("Runnig on http://localhost:5000")}))})();