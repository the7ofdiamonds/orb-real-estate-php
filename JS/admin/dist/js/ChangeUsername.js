import{c as f,r as s,j as e,m as x}from"./index.js";import{u as C}from"./useDispatch.js";function v(i){const{email:n,usrname:u}=i,l=C(),{username:t}=f(a=>a.change),[o,h]=s.useState(n),[r,c]=s.useState(u),p=a=>{a.preventDefault();const{name:m,value:d}=a.target;m=="username"&&c(d)},g=a=>{a.preventDefault(),r!==""&&l(x({email:o,username:r}))};return s.useEffect(()=>{n&&h(n)},[n]),s.useEffect(()=>{t&&c(t)},[t]),e.jsx(e.Fragment,{children:e.jsxs("span",{className:"change-username",children:[e.jsx("input",{className:"input-username",type:"text",name:"username",placeholder:"Username",value:r,onChange:p}),e.jsx("div",{className:"action",children:e.jsx("button",{onClick:g,id:"change_username_btn",children:e.jsx("h3",{children:"Change Username"})})})]})})}export{v as C};
//# sourceMappingURL=ChangeUsername.js.map
