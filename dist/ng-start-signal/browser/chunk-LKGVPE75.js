import{Ab as g,Db as f,Gb as d,Hb as u,Kb as y,Qb as i,Ya as m,_c as M,kb as p,lc as r,mc as a,nb as l,pb as c}from"./chunk-IHVPKYJR.js";var o=class t{transform(n){return this.getFormattedErrorMessage(n.key,n.value)}getFormattedErrorMessage(n,e){return{required:"This field cannot be left blank",minlength:`Minimum length ${e.requiredLength}`,maxlength:`Maximum length ${e.requiredLength}`,min:`Minimum value is ${e.min}`,max:`Maximum value should be less then ${e.max}`,pattern:"Control has leading whitespace",rangeDate:"Date range is not valid",wrongPasswordFormat:"Password is not valid"}[n]}static \u0275fac=function(e){return new(e||t)};static \u0275pipe=l({name:"formatErrorMessage",type:t,pure:!0})};var h=(t,n)=>n.key;function b(t,n){if(t&1&&(y(0,"span",0),r(1,"formatErrorMessage")),t&2){let e=i().$implicit;g("innerHTML",a(1,1,e),m)}}function _(t,n){if(t&1&&c(0,b,2,3,"span",0),t&2){let e=i();f(e.control.dirty||e.control.touched?0:-1)}}var x=class t{control;get errors(){return this.control.errors||{}}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=p({type:t,selectors:[["bb-validation-message"]],inputs:{control:"control"},decls:3,vars:2,consts:[[1,"error-message",3,"innerHTML"]],template:function(e,s){e&1&&(d(0,_,1,1,null,null,h),r(2,"keyvalue")),e&2&&u(a(2,0,s.errors))},dependencies:[M,o],styles:[".error-message[_ngcontent-%COMP%]{display:block;font-size:11px;color:red}"]})};export{x as a};
