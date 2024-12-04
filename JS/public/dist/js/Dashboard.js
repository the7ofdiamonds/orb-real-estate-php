import{u as x,r as t,b as u,s as h,a as i,j as e,o as se,p as U,e as B,q as ae,t as te,k as ne,v as oe,h as P,w as re,x as ce,l as ie,y as le,i as he,z as ue}from"./index.js";import{L as A}from"./LoginComponent.js";import{u as E,S as D}from"./StatusBarComponent.js";function de(){const s=E(),{accountLoading:l,accountSuccessMessage:n,accountErrorMessage:o,accountStatusCode:r}=x(p=>p.account),{email:d}=x(p=>p.user),{loginStatusCode:m}=x(p=>p.login),[f,g]=t.useState(!1);t.useEffect(()=>{l&&s(u(Date.now()))},[l]),t.useEffect(()=>{m==200&&g(!1)},[m]),t.useEffect(()=>{n&&(s(h("success")),s(i(n)),s(u(Date.now())))},[n]),t.useEffect(()=>{o&&r!=403&&(s(h("error")),s(i(o)),s(u(Date.now())))},[o]),t.useEffect(()=>{r!=403&&message!=""&&s(u(Date.now()))},[r,message]),t.useEffect(()=>{r==200&&setTimeout(()=>{window.location.href="/"},5e3)},[r]),t.useEffect(()=>{r==403&&g(!0)},[r]);const w=()=>{d!=""||localStorage.getItem("email")!=""?(s(h("info")),s(i("Standbye while your account is being locked.")),s(se(d||localStorage.getItem("email")))):(s(h("error")),s(i("An email is required to lock your account.")),s(u(Date.now())))};return e.jsxs(e.Fragment,{children:[e.jsxs("main",{className:"account",children:[e.jsx("span",{className:"lock-account",children:e.jsx("button",{onClick:w,id:"lock_account_btn",children:e.jsx("h3",{children:"LOCK ACCOUNT"})})}),e.jsx(D,{})]}),f&&e.jsx("div",{className:"modal-overlay",children:e.jsx("main",{className:"login",children:e.jsx(A,{})})})]})}function me(){const s=E(),{userLoading:l,userError:n,userErrorMessage:o,username:r,firstname:d,lastname:m,nickname:f,nicename:g,phone:w}=x(a=>a.user),{changeLoading:p,changeError:S,changeSuccessMessage:y,changeErrorMessage:N,changeStatusCode:v}=x(a=>a.change),{loginStatusCode:c}=x(a=>a.login),[C,F]=t.useState(r),[b,I]=t.useState(d),[k,O]=t.useState(m),[M,$]=t.useState(f),[L,q]=t.useState(g),[_,V]=t.useState(w),[G,T]=t.useState(!1);t.useEffect(()=>{s(U())},[s]),t.useEffect(()=>{(l||p)&&s(setShowStatusBar(Date.now()))},[l,p]),t.useEffect(()=>{y&&(s(setMessageType("success")),s(setMessage(y)),s(setShowStatusBar(Date.now())))},[y]),t.useEffect(()=>{(o||n||N||S)&&(s(setMessageType("error")),s(setShowStatusBar(Date.now())),o&&s(setMessage(o)),n&&s(setMessage(n)),N&&s(setMessage(N)),S&&s(setMessage(S)))},[o,n,N,S]),t.useEffect(()=>{v&&s(setShowStatusBar(Date.now()))},[v]),t.useEffect(()=>{v==403&&T(!0)},[v]),t.useEffect(()=>{c==200&&T(!1)},[c]);const R=a=>{a.preventDefault(),a.target.name=="username"&&F(a.target.value)},z=a=>{a.preventDefault();try{B(C)&&s(ae(C))}catch(j){s(setShowStatusBar(Date.now())),s(setMessageType("error")),s(setMessage(j.message))}},K=a=>{a.preventDefault(),a.target.name=="nicename"&&q(a.target.value)},H=a=>{a.preventDefault();try{B(L)&&s(te(L))}catch(j){s(setShowStatusBar(Date.now())),s(setMessageType("error")),s(setMessage(j.message))}},J=a=>{a.preventDefault(),a.target.name=="phone"&&V(a.target.value)},Q=a=>{a.preventDefault();try{ne(_)&&s(oe(_))}catch(j){s(setShowStatusBar(Date.now())),s(setMessageType("error")),s(setMessage(j.message))}},W=a=>{a.preventDefault(),a.target.name=="nickname"&&$(a.target.value)},X=a=>{a.preventDefault();try{P(M)&&s(re(M))}catch(j){s(setShowStatusBar(Date.now())),s(setMessageType("error")),s(setMessage(j.message))}},Y=a=>{a.preventDefault(),a.target.name=="firstname"&&I(a.target.value)},Z=a=>{a.preventDefault(),a.target.name=="lastname"&&O(a.target.value)},ee=a=>{a.preventDefault();try{P(b)&&P(k)&&s(ce({first_name:b,last_name:k}))}catch(j){s(setShowStatusBar(Date.now())),s(setMessageType("error")),s(setMessage(j.message))}};return e.jsxs(e.Fragment,{children:[e.jsxs("main",{className:"change",children:[e.jsxs("span",{className:"change-username",children:[e.jsx("input",{className:"input-username",type:"text",name:"username",placeholder:"Username",value:C,onChange:R}),e.jsx("div",{className:"action",children:e.jsx("button",{onClick:z,id:"change_username_btn",children:e.jsx("h3",{children:"Change Username"})})})]}),e.jsxs("span",{className:"change-name",children:[e.jsx("input",{className:"input-name",type:"text",name:"firstname",placeholder:"First Name",value:b,onChange:Y}),e.jsx("input",{className:"input-name",type:"text",name:"lastname",placeholder:"Last Name",value:k,onChange:Z}),e.jsx("div",{className:"action",children:e.jsx("button",{onClick:ee,id:"change_name_btn",children:e.jsx("h3",{children:"Change Name"})})})]}),e.jsxs("span",{className:"change-nickname",children:[e.jsx("input",{className:"input-name",type:"text",name:"nickname",placeholder:"Nickname",value:M,onChange:W}),e.jsx("div",{className:"action",children:e.jsx("button",{onClick:X,id:"change_nickname_btn",children:e.jsx("h3",{children:"Change Nickname"})})})]}),e.jsxs("span",{className:"change-nicename",children:[e.jsx("input",{className:"input-name",type:"text",name:"nicename",placeholder:"Nicename",value:L,onChange:K}),e.jsx("div",{className:"action",children:e.jsx("button",{onClick:H,id:"change_nicename_btn",children:e.jsx("h3",{children:"Change Nicename"})})})]}),e.jsxs("span",{className:"change-phone",children:[e.jsx("input",{className:"input-phone",type:"text",name:"phone",placeholder:"Phone Number",value:_,onChange:J}),e.jsx("div",{className:"action",children:e.jsx("button",{onClick:Q,id:"change_phone_btn",children:e.jsx("h3",{children:"Change Phone"})})})]}),e.jsx(D,{})]}),G&&e.jsx("div",{className:"modal-overlay",children:e.jsx("main",{className:"login",children:e.jsx(A,{})})})]})}function ge(){const s=E(),{logoutLoading:l,logoutError:n,logoutSuccessMessage:o,logoutErrorMessage:r,logoutStatusCode:d}=x(g=>g.logout);t.useEffect(()=>{l&&s(u(Date.now()))},[l]),t.useEffect(()=>{o&&(s(h("success")),s(i(o)),s(u(Date.now())))},[o]),t.useEffect(()=>{r&&(s(h("error")),s(i(r)),s(u(Date.now())))},[r]),t.useEffect(()=>{n&&(s(h("error")),s(i(n)),s(u(Date.now())))},[n]),t.useEffect(()=>{d==200&&setTimeout(()=>{window.location.href="/"},5e3)},[d]);const m=()=>{s(ie())},f=()=>{s(le())};return e.jsx(e.Fragment,{children:e.jsxs("main",{className:"auth",children:[e.jsxs("span",{className:"logout",children:[e.jsx("button",{onClick:m,id:"logout_btn",children:e.jsx("h3",{children:"LOG OUT"})}),e.jsx("button",{onClick:f,id:"logout_all_btn",children:e.jsx("h3",{children:"LOG OUT ALL"})})]}),e.jsx(D,{})]})})}function fe(){const s=E(),{passwordLoading:l,passwordSuccessMessage:n,passwordErrorMessage:o,passwordStatusCode:r}=x(c=>c.password),{loginStatusCode:d}=x(c=>c.login),[m,f]=t.useState(!1),[g,w]=t.useState(""),[p,S]=t.useState("");t.useEffect(()=>{i("Enter your preferred password twice."),s(u(Date.now()))},[]),t.useEffect(()=>{l&&s(u(Date.now()))},[l]),t.useEffect(()=>{d==200&&f(!1)},[d]),t.useEffect(()=>{r==403&&f(!0)},[r]),t.useEffect(()=>{n&&(i(n),h("success"),s(u(Date.now())))},[n]),t.useEffect(()=>{o&&(i(o),h("error"),s(u(Date.now())))},[o]);const y=c=>{try{c.target.name=="password"&&he(c.target.value)&&(w(c.target.value),i("Password entered is valid."),h("success"))}catch(C){i(C.message),h("error")}},N=c=>{try{if(c.target.name=="confirm-password"&&c.target.value==g)S(c.target.value),i("Passwords match."),h("success");else throw Error("Passwords do not match.")}catch(C){i(C.message),h("error")}},v=c=>{c.preventDefault(),g!==""&&p!==""&&(i("Standby for confirmation of password change."),s(ue({password:g,confirmPassword:p})))};return e.jsxs(e.Fragment,{children:[e.jsx("main",{children:e.jsx("form",{action:"",children:e.jsxs("table",{children:[e.jsx("thead",{}),e.jsxs("tbody",{children:[e.jsx("tr",{children:e.jsx("td",{children:e.jsx("input",{type:"password",name:"password",placeholder:"Password",onChange:y,required:!0})})}),e.jsx("tr",{children:e.jsx("td",{children:e.jsx("input",{type:"password",name:"confirm-password",placeholder:"Confirm Password",onChange:N,required:!0})})})]}),e.jsxs("tfoot",{children:[e.jsx("tr",{children:e.jsx("td",{children:e.jsx("button",{type:"submit",onClick:v,id:"change_password_btn",children:e.jsx("h3",{children:"CONFIRM"})})})}),e.jsx("tr",{children:e.jsx("td",{children:e.jsx(D,{})})})]})]})})}),m&&e.jsx("div",{className:"modal-overlay",children:e.jsx("main",{className:"login",children:e.jsx(LoginComponent,{})})})]})}function we(){const s=E(),{userLoading:l}=x(w=>w.user),{profileImage:n,displayName:o}=x(w=>w.login),r=n||localStorage.getItem("profile_image"),d=o||localStorage.getItem("display_name"),[m,f]=t.useState("");t.useEffect(()=>{s(U())},[s]),t.useEffect(()=>{l&&(s(u(Date.now())),s(h("info")),s(i("Standbye while your account information is loaded.")))},[l]);const g=()=>{m==!1&&f(!0),m==!0&&f(!1)};return e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"title",children:"Dashboard"}),e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"profile-image",children:e.jsx("img",{src:`${r}`,alt:""})}),e.jsx("h2",{className:"display-name",children:d}),e.jsx("div",{className:"action options",children:e.jsxs("button",{className:"settings-button",onClick:g,id:"settings_btn",children:[e.jsx("i",{class:"fa-solid fa-gears"}),e.jsx("h3",{children:"SETTINGS"})]})})]}),m&&e.jsx(me,{}),e.jsx(fe,{}),e.jsx(ge,{}),e.jsx(de,{})]})}export{we as default};
//# sourceMappingURL=Dashboard.js.map
