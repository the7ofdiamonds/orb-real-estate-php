import{a2 as r,a3 as d,a4 as l,u as m,r as u,j as e}from"./index.js";function i(s=r){const t=s===r?d:l(s);return function(){const{store:o}=t();return o}}const x=i();function p(s=r){const t=s===r?x:i(s);return function(){return t().dispatch}}const S=p();function j(){const{message:s,messageType:t,showStatusBar:a}=m(c=>c.message),[o,n]=u.useState("show");u.useEffect(()=>{if(a){n("show");const c=setTimeout(()=>{n("hide")},5e3);return()=>clearTimeout(c)}},[a]);const h=()=>{o=="show"&&n("hide")};return s&&e.jsx("span",{className:`modal-overlay ${o}`,children:e.jsxs("div",{className:"status",children:[e.jsx("span",{className:"close",children:e.jsx("button",{onClick:h,children:e.jsx("h3",{children:"X"})})}),e.jsx("div",{className:`status-bar card ${t}`,id:"status_bar",children:e.jsx("span",{children:s})})]})})}export{j as S,S as u};
//# sourceMappingURL=StatusBarComponent.js.map
