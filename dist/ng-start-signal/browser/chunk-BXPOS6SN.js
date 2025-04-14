import{A as Y,F as C,I as m,Ia as S,J as b,Ja as M,Ma as T,Q as G,Sa as H,W as $,Z as E,a as x,cd as P,da as z,ea as j,eb as D,fb as d,i as R,ka as A,l as p,lb as _,mb as N,y as g}from"./chunk-IHVPKYJR.js";var f=typeof window>"u"?!1:"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;function J(t){let s=t.cloneNode(!0),i=s.querySelectorAll("[id]"),n=t.nodeName.toLowerCase();return s.removeAttribute("id"),i.forEach(r=>{r.removeAttribute("id")}),n==="canvas"?F(t,s):(n==="input"||n==="select"||n==="textarea")&&k(t,s),U("canvas",t,s,F),U("input, textarea, select",t,s,k),s}function U(t,s,i,n){let r=s.querySelectorAll(t);if(r.length){let e=i.querySelectorAll(t);for(let o=0;o<r.length;o++)n(r[o],e[o])}}var K=0;function k(t,s){s.type!=="file"&&(s.value=t.value),s.type==="radio"&&s.name&&(s.name=`mat-clone-${s.name}-${K++}`)}function F(t,s){let i=s.getContext("2d");if(i)try{i.drawImage(t,0,0)}catch{}}function Z(t,s,i,n){let r={top:t.top,bottom:t.bottom,left:t.left,right:t.right};return s.top&&(r.top+=n),s.bottom&&(r.bottom+=n),s.left&&(r.left+=i),s.right&&(r.right+=i),r.height=r.bottom-r.top,r.width=r.right-r.left,r}function Q(t,s){let i=0,n=0,r=t.nativeElement.style,o=["transform","-ms-transform","-moz-transform","-o-transform"].map(c=>r[c]).find(c=>!!c);if(o&&o.includes("translate")&&(i=o.replace(/.*translate3?d?\((-?[0-9]*)px, (-?[0-9]*)px.*/,"$1"),n=o.replace(/.*translate3?d?\((-?[0-9]*)px, (-?[0-9]*)px.*/,"$2")),s==="absolute")return{height:t.nativeElement.offsetHeight,width:t.nativeElement.offsetWidth,top:t.nativeElement.offsetTop-n,bottom:t.nativeElement.offsetHeight+t.nativeElement.offsetTop-n,left:t.nativeElement.offsetLeft-i,right:t.nativeElement.offsetWidth+t.nativeElement.offsetLeft-i};{let c=t.nativeElement.getBoundingClientRect();return{height:c.height,width:c.width,top:c.top-n,bottom:c.bottom-n,left:c.left-i,right:c.right-i,scrollTop:t.nativeElement.scrollTop,scrollLeft:t.nativeElement.scrollLeft}}}var q=Object.freeze({topLeft:"nw-resize",topRight:"ne-resize",bottomLeft:"sw-resize",bottomRight:"se-resize",leftOrRight:"col-resize",topOrBottom:"row-resize"});function V(t,s){return t.left&&t.top?s.topLeft:t.right&&t.top?s.topRight:t.left&&t.bottom?s.bottomLeft:t.right&&t.bottom?s.bottomRight:t.left||t.right?s.leftOrRight:t.top||t.bottom?s.topOrBottom:""}function w({edges:t,initialRectangle:s,newRectangle:i}){let n={};return Object.keys(t).forEach(r=>{n[r]=(i[r]||0)-(s[r]||0)}),n}var W="resize-active",B="resize-ghost-element",ee=50,te=(()=>{class t{constructor(i,n,r,e){this.platformId=i,this.renderer=n,this.elm=r,this.zone=e,this.enableGhostResize=!1,this.resizeSnapGrid={},this.resizeCursors=q,this.ghostElementPositioning="fixed",this.allowNegativeResizes=!1,this.mouseMoveThrottleMS=ee,this.resizeStart=new S,this.resizing=new S,this.resizeEnd=new S,this.mouseup=new p,this.mousedown=new p,this.mousemove=new p,this.destroy$=new p,this.pointerEventListeners=O.getInstance(n,e)}ngOnInit(){let i=m(this.pointerEventListeners.pointerDown,this.mousedown),n=m(this.pointerEventListeners.pointerMove,this.mousemove).pipe(j(({event:l})=>{e&&l.cancelable&&l.preventDefault()}),E()),r=m(this.pointerEventListeners.pointerUp,this.mouseup),e,o=()=>{e&&e.clonedNode&&(this.elm.nativeElement.parentElement.removeChild(e.clonedNode),this.renderer.setStyle(this.elm.nativeElement,"visibility","inherit"))},c=()=>x(x({},q),this.resizeCursors);i.pipe(Y(l=>{function u(h){return{clientX:h.clientX-l.clientX,clientY:h.clientY-l.clientY}}let v=()=>{let h={x:1,y:1};return e&&(this.resizeSnapGrid.left&&e.edges.left?h.x=+this.resizeSnapGrid.left:this.resizeSnapGrid.right&&e.edges.right&&(h.x=+this.resizeSnapGrid.right),this.resizeSnapGrid.top&&e.edges.top?h.y=+this.resizeSnapGrid.top:this.resizeSnapGrid.bottom&&e.edges.bottom&&(h.y=+this.resizeSnapGrid.bottom)),h};function y(h,a){return{x:Math.ceil(h.clientX/a.x),y:Math.ceil(h.clientY/a.y)}}return m(n.pipe(G(1)).pipe(g(h=>[,h])),n.pipe($())).pipe(g(([h,a])=>[h&&u(h),u(a)])).pipe(b(([h,a])=>{if(!h)return!0;let L=v(),I=y(h,L),X=y(a,L);return I.x!==X.x||I.y!==X.y})).pipe(g(([,h])=>{let a=v();return{clientX:Math.round(h.clientX/a.x)*a.x,clientY:Math.round(h.clientY/a.y)*a.y}})).pipe(z(m(r,i)))})).pipe(b(()=>!!e)).pipe(g(({clientX:l,clientY:u})=>Z(e.startingRect,e.edges,l,u))).pipe(b(l=>this.allowNegativeResizes||!!(l.height&&l.width&&l.height>0&&l.width>0))).pipe(b(l=>this.validateResize?this.validateResize({rectangle:l,edges:w({edges:e.edges,initialRectangle:e.startingRect,newRectangle:l})}):!0),z(this.destroy$)).subscribe(l=>{e&&e.clonedNode&&(this.renderer.setStyle(e.clonedNode,"height",`${l.height}px`),this.renderer.setStyle(e.clonedNode,"width",`${l.width}px`),this.renderer.setStyle(e.clonedNode,"top",`${l.top}px`),this.renderer.setStyle(e.clonedNode,"left",`${l.left}px`)),this.resizing.observers.length>0&&this.zone.run(()=>{this.resizing.emit({edges:w({edges:e.edges,initialRectangle:e.startingRect,newRectangle:l}),rectangle:l})}),e.currentRect=l}),i.pipe(g(({edges:l})=>l||{}),b(l=>Object.keys(l).length>0),z(this.destroy$)).subscribe(l=>{e&&o();let u=Q(this.elm,this.ghostElementPositioning);e={edges:l,startingRect:u,currentRect:u};let v=c(),y=V(e.edges,v);this.renderer.setStyle(document.body,"cursor",y),this.setElementClass(this.elm,W,!0),this.enableGhostResize&&(e.clonedNode=J(this.elm.nativeElement),this.elm.nativeElement.parentElement.appendChild(e.clonedNode),this.renderer.setStyle(this.elm.nativeElement,"visibility","hidden"),this.renderer.setStyle(e.clonedNode,"position",this.ghostElementPositioning),this.renderer.setStyle(e.clonedNode,"left",`${e.startingRect.left}px`),this.renderer.setStyle(e.clonedNode,"top",`${e.startingRect.top}px`),this.renderer.setStyle(e.clonedNode,"height",`${e.startingRect.height}px`),this.renderer.setStyle(e.clonedNode,"width",`${e.startingRect.width}px`),this.renderer.setStyle(e.clonedNode,"cursor",V(e.edges,v)),this.renderer.addClass(e.clonedNode,B),e.clonedNode.scrollTop=e.startingRect.scrollTop,e.clonedNode.scrollLeft=e.startingRect.scrollLeft),this.resizeStart.observers.length>0&&this.zone.run(()=>{this.resizeStart.emit({edges:w({edges:l,initialRectangle:u,newRectangle:u}),rectangle:Z(u,{},0,0)})})}),r.pipe(z(this.destroy$)).subscribe(()=>{e&&(this.renderer.removeClass(this.elm.nativeElement,W),this.renderer.setStyle(document.body,"cursor",""),this.renderer.setStyle(this.elm.nativeElement,"cursor",""),this.resizeEnd.observers.length>0&&this.zone.run(()=>{this.resizeEnd.emit({edges:w({edges:e.edges,initialRectangle:e.startingRect,newRectangle:e.currentRect}),rectangle:e.currentRect})}),o(),e=null)})}ngOnDestroy(){P(this.platformId)&&this.renderer.setStyle(document.body,"cursor",""),this.mousedown.complete(),this.mouseup.complete(),this.mousemove.complete(),this.destroy$.next()}setElementClass(i,n,r){r?this.renderer.addClass(i.nativeElement,n):this.renderer.removeClass(i.nativeElement,n)}}return t.\u0275fac=function(i){return new(i||t)(d(H),d(D),d(T),d(M))},t.\u0275dir=N({type:t,selectors:[["","mwlResizable",""]],inputs:{validateResize:"validateResize",enableGhostResize:"enableGhostResize",resizeSnapGrid:"resizeSnapGrid",resizeCursors:"resizeCursors",ghostElementPositioning:"ghostElementPositioning",allowNegativeResizes:"allowNegativeResizes",mouseMoveThrottleMS:"mouseMoveThrottleMS"},outputs:{resizeStart:"resizeStart",resizing:"resizing",resizeEnd:"resizeEnd"},exportAs:["mwlResizable"],standalone:!1}),t})(),O=class t{constructor(s,i){this.pointerDown=new R(n=>{let r,e;return i.runOutsideAngular(()=>{r=s.listen("document","mousedown",o=>{n.next({clientX:o.clientX,clientY:o.clientY,event:o})}),f&&(e=s.listen("document","touchstart",o=>{n.next({clientX:o.touches[0].clientX,clientY:o.touches[0].clientY,event:o})}))}),()=>{r(),f&&e()}}).pipe(E()),this.pointerMove=new R(n=>{let r,e;return i.runOutsideAngular(()=>{r=s.listen("document","mousemove",o=>{n.next({clientX:o.clientX,clientY:o.clientY,event:o})}),f&&(e=s.listen("document","touchmove",o=>{n.next({clientX:o.targetTouches[0].clientX,clientY:o.targetTouches[0].clientY,event:o})}))}),()=>{r(),f&&e()}}).pipe(E()),this.pointerUp=new R(n=>{let r,e,o;return i.runOutsideAngular(()=>{r=s.listen("document","mouseup",c=>{n.next({clientX:c.clientX,clientY:c.clientY,event:c})}),f&&(e=s.listen("document","touchend",c=>{n.next({clientX:c.changedTouches[0].clientX,clientY:c.changedTouches[0].clientY,event:c})}),o=s.listen("document","touchcancel",c=>{n.next({clientX:c.changedTouches[0].clientX,clientY:c.changedTouches[0].clientY,event:c})}))}),()=>{r(),f&&(e(),o())}}).pipe(E())}static getInstance(s,i){return t.instance||(t.instance=new t(s,i)),t.instance}},fe=(()=>{class t{constructor(i,n,r,e){this.renderer=i,this.element=n,this.zone=r,this.resizableDirective=e,this.resizeEdges={},this.eventListeners={},this.destroy$=new p}ngOnInit(){this.zone.runOutsideAngular(()=>{this.listenOnTheHost("mousedown").subscribe(i=>{this.onMousedown(i,i.clientX,i.clientY)}),this.listenOnTheHost("mouseup").subscribe(i=>{this.onMouseup(i.clientX,i.clientY)}),f&&(this.listenOnTheHost("touchstart").subscribe(i=>{this.onMousedown(i,i.touches[0].clientX,i.touches[0].clientY)}),m(this.listenOnTheHost("touchend"),this.listenOnTheHost("touchcancel")).subscribe(i=>{this.onMouseup(i.changedTouches[0].clientX,i.changedTouches[0].clientY)}))})}ngOnDestroy(){this.destroy$.next(),this.unsubscribeEventListeners()}onMousedown(i,n,r){i.cancelable&&i.preventDefault(),this.eventListeners.touchmove||(this.eventListeners.touchmove=this.renderer.listen(this.element.nativeElement,"touchmove",e=>{this.onMousemove(e,e.targetTouches[0].clientX,e.targetTouches[0].clientY)})),this.eventListeners.mousemove||(this.eventListeners.mousemove=this.renderer.listen(this.element.nativeElement,"mousemove",e=>{this.onMousemove(e,e.clientX,e.clientY)})),this.resizable.mousedown.next({clientX:n,clientY:r,edges:this.resizeEdges})}onMouseup(i,n){this.unsubscribeEventListeners(),this.resizable.mouseup.next({clientX:i,clientY:n,edges:this.resizeEdges})}get resizable(){return this.resizableDirective||this.resizableContainer}onMousemove(i,n,r){this.resizable.mousemove.next({clientX:n,clientY:r,edges:this.resizeEdges,event:i})}unsubscribeEventListeners(){Object.keys(this.eventListeners).forEach(i=>{this.eventListeners[i](),delete this.eventListeners[i]})}listenOnTheHost(i){return C(this.element.nativeElement,i).pipe(z(this.destroy$))}}return t.\u0275fac=function(i){return new(i||t)(d(D),d(T),d(M),d(te,8))},t.\u0275dir=N({type:t,selectors:[["","mwlResizeHandle",""]],inputs:{resizeEdges:"resizeEdges",resizableContainer:"resizableContainer"},standalone:!1}),t})(),pe=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=_({type:t}),t.\u0275inj=A({}),t})();export{te as a,fe as b,pe as c};
