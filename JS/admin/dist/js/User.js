import{c as p,r as n,j as e}from"./index.js";import j from"./UserCreate.js";import U from"./UserFind.js";import S from"./UserUpdate.js";import w from"./Details.js";import"./ChangeUsername.js";import"./useDispatch.js";function v(){const{username:l}=p(x=>x.user),[o,s]=n.useState(!1),[i,t]=n.useState(!1),[d,r]=n.useState(!1),[c,a]=n.useState(!1),h=()=>{s(!0),t(!1),r(!1),a(!1)},u=()=>{s(!1),t(!0),r(!1),a(!1),setShowDelete(!1)},f=()=>{s(!1),t(!1),r(!0),a(!1)},m=()=>{s(!1),t(!1),r(!1),a(!0)};return e.jsx(e.Fragment,{children:e.jsxs("div",{class:"user-management",id:"user_management",children:[e.jsxs("div",{class:"options",id:"options",children:[e.jsx("button",{onClick:h,id:"create_user",children:e.jsx("h3",{children:"Create User"})}),e.jsx("button",{onClick:u,id:"find_user",children:e.jsx("h3",{children:"Find User"})}),e.jsx("button",{onClick:f,id:"update_user",children:e.jsx("h3",{children:"Update User"})}),e.jsx("button",{onClick:m,id:"user_details",children:e.jsx("h3",{children:"User Details"})})]}),o&&e.jsx(j,{}),i&&e.jsx(U,{}),d&&e.jsx(S,{usrname:l}),c&&e.jsx(w,{})]})})}export{v as default};
//# sourceMappingURL=User.js.map