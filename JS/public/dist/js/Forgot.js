import{r as t,u as h,a as o,b as r,s as i,j as s,f as w,n as x}from"./index.js";import{N as j}from"./NavigationLoginComponent.js";import{u as E,S}from"./StatusBarComponent.js";function y(){const e=E(),[m,d]=t.useState(""),{passwordLoading:u,passwordSuccessMessage:c,passwordErrorMessage:l,passwordStatusCode:f}=h(a=>a.password);t.useEffect(()=>{e(o("If you forgot your password, enter your username or email.")),e(r(Date.now()))},[]),t.useEffect(()=>{u&&e(r(Date.now()))},[u]),t.useEffect(()=>{if(c){const n=new URLSearchParams(window.location.search).get("redirectTo");setTimeout(()=>{n===null?window.location.href="/login":window.location.href=n},5e3),e(i("success")),e(o(c)),e(r(Date.now()))}},[e,c]),t.useEffect(()=>{l&&f!=403&&(e(i("error")),e(o(l)),e(r(Date.now())))},[e,l]);const p=async a=>{a.preventDefault();try{w(m)&&(e(i("info")),e(o("Standbye while an attempt to help get access to your account is made.")),e(x(m)))}catch(n){e(i("error")),e(o(n.message)),e(r(Date.now()))}},g=a=>{a.target.name==="email"&&d(a.target.value)};return s.jsxs(s.Fragment,{children:[s.jsxs("form",{className:"forgot-form",children:[s.jsx("div",{className:"forgot-card card",children:s.jsx("input",{className:"input-email",type:"email",name:"email",placeholder:"Email",onChange:g,required:!0})}),s.jsx("button",{type:"submit",onClick:p,children:s.jsx("h3",{children:"RESET"})})]}),s.jsx(S,{})]})}function b(){let e="forgot";return s.jsx(s.Fragment,{children:s.jsxs("main",{className:"forgot",children:[s.jsx(j,{page:e}),s.jsx(y,{})]})})}export{b as default};
//# sourceMappingURL=Forgot.js.map
