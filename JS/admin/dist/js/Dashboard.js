import{r as t,e as n,g as c,a as u,j as e,u as p,b as h}from"./index.js";import{u as f}from"./useDispatch.js";function m(){const s=f(),[a,i]=t.useState(null),o=l=>{i(l.target.files[0])},r=l=>{if(l.preventDefault(),!a){alert("Please select a file to upload");return}s(p(a))},d=l=>{l.preventDefault(),s(h())};return t.useEffect(()=>{s(n())},[]),t.useEffect(()=>{s(c())},[]),t.useEffect(()=>{s(u())},[]),e.jsx(e.Fragment,{children:e.jsxs("div",{class:"dashboard",children:[e.jsx("h2",{children:"Dashboard"}),e.jsxs("div",{className:"upload-env",children:[e.jsx("h3",{children:"Upload ENV File"}),e.jsxs("form",{action:"",children:[e.jsx("input",{type:"file",onChange:o,accept:".env",required:!0}),e.jsx("button",{onClick:r,type:"submit",id:"submit",children:"Upload"})]})]}),e.jsxs("div",{class:"google-creds",id:"google_creds",children:[e.jsx("h3",{children:"Google Service Account"}),e.jsx("h4",{id:"google_creds_message"}),e.jsxs("form",{class:"google-creds-upload",id:"google_creds_upload",enctype:"multipart/form-data",children:[e.jsx("input",{type:"file",name:"file",id:"file",required:!0}),e.jsx("button",{onClick:d,type:"submit",id:"submit",children:"Upload"})]})]})]})})}export{m as default};
//# sourceMappingURL=Dashboard.js.map
