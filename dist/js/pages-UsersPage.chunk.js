"use strict";exports.id=850,exports.ids=[850],exports.modules={712:(s,e,r)=>{r.r(e),r.d(e,{default:()=>h});var t=r(689),n=r(659),u=r(955),i=r(701),l=r(661),c=r(997);const d=s=>{let{users:e}=s;return e?(0,c.jsx)("div",{children:(0,c.jsx)("ul",{children:e.map((s=>(0,c.jsx)("li",{children:(0,c.jsx)(l.Link,{to:"/users/".concat(s.id),children:s.username})},s.id)))})}):null},x=()=>{const s=(0,n.useSelector)((s=>s.users.users)),e=(0,n.useDispatch)();return(0,t.useEffect)((()=>{s||e((0,u.Rf)())}),[e,s]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(d,{users:s}),(0,c.jsx)(i.p9,{resolve:()=>e(u.Rf)})]})},j=s=>{let{user:e}=s;const{email:r,name:t,username:n}=e;return(0,c.jsxs)("div",{children:[(0,c.jsxs)("h1",{children:[n," (",t,")"]}),(0,c.jsxs)("p",{children:[(0,c.jsx)("b",{children:"e-mail :"})," ",r]})]})},a=s=>{let{id:e}=s;const r=(0,n.useSelector)((s=>s.users.user)),l=(0,n.useDispatch)();return(0,i.lm)((()=>l((0,u.PR)(e)))),(0,t.useEffect)((()=>{r&&r.id===parseInt(e,10)||l((0,u.PR)(e))}),[l,e,r]),r?(0,c.jsx)(j,{user:r}):(0,c.jsx)(i.p9,{resolve:()=>l((0,u.PR)(e))})},o=()=>{const{id:s}=(0,l.useParams)();return(0,c.jsx)(a,{id:s})},h=()=>(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(x,{}),(0,c.jsx)(l.Routes,{children:(0,c.jsx)(l.Route,{path:":id",element:(0,c.jsx)(o,{})})})]})}};