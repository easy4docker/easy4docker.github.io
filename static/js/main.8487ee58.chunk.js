(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{124:function(e,t,a){e.exports=a(359)},129:function(e,t,a){},130:function(e,t,a){},188:function(e,t){},353:function(e,t){},359:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(119),l=a.n(r),i=(a(129),a(130),a(361)),o=a(55),s=(a(131),a(53)),u=a(54),p=a(68),m=a(120),f={ready:!1,loading:{},popup:!1,screenModel:{},_watcher:"",contracts:{local:[],public:[]},networks:[],current:{contract:"",account:{account:"",network:""}}},d=Object(p.createStore)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;switch(e._watcher="",e.contracts.local=e.contracts.local?e.contracts.local:[],t.type){case"addLoading":return e._watcher="loading",e.loading[t.id]=(new Date).getTime(),e;case"removeLoading":return e._watcher="loading",delete e.loading[t.id],e;case"popupTrigger":return e._watcher="popupTrigger",e.popup=t.popup,e;case"alertTrigger":return e._watcher="alertTrigger",e.alertMessage=t.alertMessage,e;default:return e}},Object(m.composeWithDevTools)()),h=Object(s.a)(function e(){var t=this;Object(u.a)(this,e),this.popupOn=function(e){d.dispatch({type:"popupTrigger",popup:e})},this.popupOff=function(e){d.dispatch({type:"popupTrigger",popup:!1})},this.loadingOn=function(){d.dispatch({type:"addLoading",id:t.id})},this.loadingOff=function(){d.dispatch({type:"removeLoading",id:t.id})},this.get=function(e,t){fetch(e,{method:"GET"}).then(function(e){return e.json()}).then(function(e){t(e)}).catch(function(e){t({status:"failure",message:e.message})})},this.post=function(e,t,a,n){fetch(e,{method:"POST",data:t,herder:{}}).then(function(e){return e.json()}).then(function(e){n(e)}).catch(function(e){n({status:"failure",message:e.message})})},this.getContent=function(e,t){fetch(e,{method:"GET"}).then(function(e){return e.text()}).then(function(e){t(e)}).catch(function(e){t("err")})}}),g=(a(0),a(69),a(121),a(37)),E=a(360),b=function(){var e=Object(n.useState)(0),t=Object(g.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)(function(){var e=d.subscribe(function(){"loading"===d.getState()._watcher&&r(Object.keys(d.getState().loading).length)});return function(){e()}},[]),c.a.createElement("div",{className:a?"loading":"no-loading"},c.a.createElement(E.a,{animation:"border",size:"md",className:"loading-text"}))},N=function(){var e=Object(n.useState)(!1),t=Object(g.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)(function(){var e=d.subscribe(function(){"popupTrigger"===d.getState()._watcher&&r(!!d.getState().popup)});return function(){e()}},[]),c.a.createElement("span",null,c.a.createElement("div",{className:a?"popup-on":"popup-off"}),c.a.createElement("div",{className:a?"popup-body":"popup-off"},d.getState().popup))},w=a(363),v=function(e){var t=new h,a=function(e){var t=function(e,t){return c.a.createElement(i.a,{key:t,className:"p-3 m-0 float-left text-center",style:{width:"33%",minWidth:"26rem"}},c.a.createElement(w.a,{border:e.style,className:"hover-shadow p-0",style:{width:"100%",minWidth:"25rem",height:"12.8rem"}},c.a.createElement(w.a.Body,{className:"p-2"},c.a.createElement(w.a.Title,null,e.title),c.a.createElement(w.a.Subtitle,{className:"mb-2 text-secondary",style:{fontSize:"0.9rem"}},e.subtitle),c.a.createElement(w.a.Text,{style:{height:"4.8rem"}},e.description),c.a.createElement(w.a.Link,{className:"mr-3",href:"#"},"Card Link"),c.a.createElement(w.a.Link,{className:"ml-3",href:"#"},"Another Link"))))};return{centrelBox:function(e){return c.a.createElement(i.a,{fluid:!0,className:"p-0 pl-3 pr-3"},c.a.createElement(i.a,{fluid:!0,className:"p-0 pl-3 pr-3  d-none d-xl-block"},c.a.createElement(i.a,{fluid:!0,className:"p-0 pl-3 pr-3"},c.a.createElement(i.a,{fluid:!0,className:"p-0 pl-3 pr-3"},c.a.createElement(i.a,{fluid:!0,className:"p-0 pl-3 pr-3"},e)))),c.a.createElement(i.a,{fluid:!0,className:"p-0 d-xl-none"},e))},cardListShow:function(e){return e.map(function(e,a){return t(e,a)})},cardShow:t,headerBox:function(){return c.a.createElement(i.a,{fluid:!0,className:"p-0 text-left clearfix text-light header-bg",style:{minHeight:"10.2rem"}})}}}(),r=a.centrelBox,l=a.headerBox,o=a.cardListShow,s=Object(n.useState)([]),u=Object(g.a)(s,2),p=u[0],m=u[1];return Object(n.useEffect)(function(){t.get("/metaData/products.json",function(e){m(e)})},[]),c.a.createElement(i.a,{fluid:!0,className:"p-0 text-left",style:{minHeight:"58rem"}},r(c.a.createElement(y,null)),l(),c.a.createElement(i.a,{fluid:!0,className:"p-3 home-bg"},c.a.createElement(i.a,{fluid:!0,className:"p-3 text-center text-secondary",style:{minHeight:"36rem"}},c.a.createElement(i.a,{className:"p-3"},c.a.createElement("h3",null,"Universal Stamps(UNST) is a cross chain ERC-1155 Solution.")),o(p))))},x=a(362),y=function(e){return c.a.createElement(i.a,{fluid:!0,className:"p-2"},c.a.createElement(x.a,{className:"mr-3 mt-2 float-left",src:"/images/eth-home-icon.png"}),c.a.createElement(o.b,{to:"/"},c.a.createElement("h2",{className:"p-1  float-left text-info"},c.a.createElement("b",null,"Cross Chain NFT"))),c.a.createElement(i.a,{className:"clearfix"}))};var O=function(){return Object(n.useEffect)(function(){},[]),c.a.createElement(i.a,{fluid:!0,className:"App p-0 text-left"},c.a.createElement(o.a,null,c.a.createElement(b,null),c.a.createElement(N,null),c.a.createElement(v,null)))},S=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,364)).then(function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,l=t.getTTFB;a(e),n(e),c(e),r(e),l(e)})};l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(O,null)),document.getElementById("root")),S()}},[[124,1,2]]]);
//# sourceMappingURL=main.8487ee58.chunk.js.map