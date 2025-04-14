import{a as D}from"./chunk-LKGVPE75.js";import{a as C,b as p,c as y,d as _,e as k,f as L,g as v,h,i as F,j as M,l as N}from"./chunk-22IQ3ZAD.js";import{a as te,f as ne,g as oe,h as ie,j as re,k as ae}from"./chunk-BCWWF2KX.js";import{$a as l,Ab as m,Da as V,Db as x,Gb as j,Hb as B,Ib as i,Jb as r,Kb as d,Lb as z,Mb as J,Oa as $,Pb as b,Qb as c,Qc as W,Rc as K,Sc as Q,Tc as X,Uc as Y,Vc as Z,Wb as s,Xb as w,Yb as H,ad as ee,cc as U,kb as u,ob as A,pa as S,pb as g,zb as R}from"./chunk-IHVPKYJR.js";var O=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=u({type:t,selectors:[["app-forms"]],decls:16,vars:0,consts:[[1,"text-white","bg-gray-800","p-4"],[1,"flex","max-w-screen-xl","mx-auto","space-x-8"],[1,"hover:text-indigo-400"],["routerLink","basic","routerLinkActive","text-indigo-400",1,"text-lg","font-medium","transition-all","duration-200"],["routerLink","nested","routerLinkActive","text-indigo-400",1,"text-lg","font-medium","transition-all","duration-200"],["routerLink","dynamic","routerLinkActive","text-indigo-400",1,"text-lg","font-medium","transition-all","duration-200"],["routerLink","dynamic-2","routerLinkActive","text-indigo-400",1,"text-lg","font-medium","transition-all","duration-200"],[1,"max-w-screen-xl","mx-auto","p-6"]],template:function(e,n){e&1&&(i(0,"nav",0)(1,"ul",1)(2,"li",2)(3,"a",3),s(4,"Basic"),r()(),i(5,"li",2)(6,"a",4),s(7,"Nested"),r()(),i(8,"li",2)(9,"a",5),s(10,"Dynamic"),r()(),i(11,"li",2)(12,"a",6),s(13,"Dynamic 2"),r()()()(),i(14,"div",7),d(15,"router-outlet"),r())},dependencies:[re,ne,oe,ie],encapsulation:2})};var P=class t{form;constructor(){}ngOnInit(){this.form=new k({firstName:new L("",[p.required,p.maxLength(3)]),lastName:new L("",[p.required])})}get controls(){return this.form.controls}reset(){this.form.reset()}onSubmit(){this.form.valid?console.log(this.form.value):console.log("Form is invalid")}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=u({type:t,selectors:[["app-basic"]],decls:19,vars:4,consts:[[3,"formGroup"],[1,"grid","grid-cols-1","gap-6"],[1,"col-span-1"],["for","firstName",1,"block","text-sm","font-medium","text-gray-700"],[1,"mt-1"],["type","text","formControlName","firstName",1,"block","w-full","px-3","py-2","border","border-gray-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-2","focus:ring-indigo-500","focus:border-indigo-500","sm:text-sm"],[3,"control"],["for","lastName",1,"block","text-sm","font-medium","text-gray-700"],["type","text","formControlName","lastName",1,"block","w-full","px-3","py-2","border","border-gray-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-2","focus:ring-indigo-500","focus:border-indigo-500","sm:text-sm"],[1,"py-3","flex","gap-2","text-right"],[1,"inline-flex","justify-center","py-2","px-4","border","border-transparent","text-sm","font-medium","rounded-md","text-white","bg-green-500","hover:bg-green-600",3,"click"],["type","submit",1,"inline-flex","justify-center","py-2","px-4","border","border-transparent","text-sm","font-medium","rounded-md","text-white","bg-indigo-600","hover:bg-indigo-700","focus:outline-none","focus:ring-2","focus:ring-indigo-500","disabled:bg-indigo-300","disabled:cursor-not-allowed",3,"click","disabled"]],template:function(e,n){e&1&&(i(0,"form",0)(1,"div",1)(2,"div",2)(3,"label",3),s(4,"First Name"),r(),i(5,"div",4),d(6,"input",5)(7,"bb-validation-message",6),r()(),i(8,"div",2)(9,"label",7),s(10,"Last Name"),r(),i(11,"div",4),d(12,"input",8)(13,"bb-validation-message",6),r()()(),i(14,"div",9)(15,"button",10),b("click",function(){return n.reset()}),s(16," Reset "),r(),i(17,"button",11),b("click",function(){return n.onSubmit()}),s(18," Submit "),r()()()),e&2&&(m("formGroup",n.form),l(7),m("control",n.controls.firstName),l(6),m("control",n.controls.lastName),l(4),m("disabled",n.form.invalid))},dependencies:[N,v,C,y,_,h,F,D],encapsulation:2})};var E=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=u({type:t,selectors:[["app-nested"]],decls:2,vars:0,template:function(e,n){e&1&&(i(0,"p"),s(1,"nested works!"),r())},encapsulation:2})};function se(t,o){if(t&1&&d(0,"input",10),t&2){let e=c().$implicit;m("type","text")("id",e.uniqueId)("formControlName",e.name)("placeholder",e.props.placeholder)}}function ce(t,o){if(t&1&&d(0,"textarea",11),t&2){let e=c().$implicit;m("id",e.uniqueId)("formControlName",e.name)("placeholder",e.props.placeholder)}}function pe(t,o){if(t&1&&(z(0),i(1,"p"),s(2),r(),J()),t&2){let e=c().$implicit;l(2),H("Unsupported field type: ",e.type,"")}}function de(t,o){if(t&1&&(i(0,"div"),d(1,"bb-validation-message",12),r()),t&2){let e=c(2).$implicit,n=c();l(),m("control",n.dynamicForm.get(e.name))}}function ue(t,o){if(t&1&&(i(0,"div"),g(1,de,2,1,"div",9),r()),t&2){let e,n=c().$implicit,a=c();l(),m("ngIf",(e=a.dynamicForm.get(n.name))==null||e.errors==null?null:e.errors.required)}}function fe(t,o){if(t&1&&(i(0,"div",4)(1,"label"),s(2),r(),i(3,"div",5),g(4,se,1,4,"input",6)(5,ce,1,3,"textarea",7)(6,pe,3,1,"ng-container",8),r(),g(7,ue,2,1,"div",9),r()),t&2){let e,n=o.$implicit,a=c();m("ngClass",n.props.cssClass),l(),R("for",n.uniqueId),l(),w(n.props.label),l(),m("ngSwitch",n.type),l(),m("ngSwitchCase","input"),l(),m("ngSwitchCase","textarea"),l(2),m("ngIf",((e=a.dynamicForm.get(n.name))==null?null:e.invalid)&&((e=a.dynamicForm.get(n.name))==null?null:e.touched))}}var q=class t extends ae{formFields=[];dynamicForm=new k({});fb=S(M);ngOnInit(){this.formFields=this.activatedRoute.snapshot.data.formFields,this.formFields.forEach(o=>{let e=o.props.required?[p.required]:[];this.dynamicForm.addControl(o.name,this.fb.control("",e))})}onSubmit(){this.dynamicForm.valid?console.log(this.dynamicForm.value):this.dynamicForm.markAllAsTouched()}static \u0275fac=(()=>{let o;return function(n){return(o||(o=V(t)))(n||t)}})();static \u0275cmp=u({type:t,selectors:[["app-dynamic"]],features:[A],decls:5,vars:3,consts:[[3,"ngSubmit","formGroup"],[1,"row"],[3,"ngClass",4,"ngFor","ngForOf"],["type","submit",3,"disabled"],[3,"ngClass"],[3,"ngSwitch"],[3,"type","id","formControlName","placeholder",4,"ngSwitchCase"],[3,"id","formControlName","placeholder",4,"ngSwitchCase"],[4,"ngSwitchDefault"],[4,"ngIf"],[3,"type","id","formControlName","placeholder"],[3,"id","formControlName","placeholder"],[3,"control"]],template:function(e,n){e&1&&(i(0,"form",0),b("ngSubmit",function(){return n.onSubmit()}),i(1,"div",1),g(2,fe,8,7,"div",2),r(),i(3,"button",3),s(4,"Submit"),r()()),e&2&&(m("formGroup",n.dynamicForm),l(2),m("ngForOf",n.formFields),l(),m("disabled",n.dynamicForm.invalid))},dependencies:[N,v,C,y,_,h,F,ee,W,K,Q,X,Y,Z,D],styles:["label[_ngcontent-%COMP%]{display:block;margin-bottom:5px}input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{border:1px solid #666666;width:100%;padding:8px;margin-bottom:10px;box-sizing:border-box}button[_ngcontent-%COMP%]{padding:10px 15px;background-color:#007bff;color:#fff;border:none;cursor:pointer}button[_ngcontent-%COMP%]:disabled{background-color:#ccc;color:#666;cursor:not-allowed}div[_ngcontent-%COMP%]{margin-bottom:10px}.red[_ngcontent-%COMP%]{color:red}.row[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;align-items:flex-start;flex-wrap:wrap}.col-25[_ngcontent-%COMP%]{width:25%;padding:5px;box-sizing:border-box}.col-50[_ngcontent-%COMP%]{width:50%;padding:5px;box-sizing:border-box}.col-100[_ngcontent-%COMP%]{width:100%;padding:5px;box-sizing:border-box}"]})};var ge=()=>["text","password","email","number","search","tel","url"],be=(t,o)=>o.name;function xe(t,o){if(t&1&&(i(0,"label"),s(1),r()),t&2){let e=c().$implicit;l(),w(e.label)}}function Ce(t,o){if(t&1&&d(0,"input",2),t&2){let e=c().$implicit;m("type",e.type)("formControlName",e.name)}}function ye(t,o){if(t&1&&d(0,"textarea",3),t&2){let e=c().$implicit;m("formControlName",e.name)}}function _e(t,o){if(t&1&&d(0,"bb-validation-message",4),t&2){let e=c(2).$implicit,n=c();m("control",n.myForm.get(e.name))}}function ve(t,o){if(t&1&&g(0,_e,1,1,"bb-validation-message",4),t&2){let e,n=c().$implicit,a=c();x(!((e=a.myForm.get(n.name))==null||e.errors==null)&&e.errors.required?0:-1)}}function he(t,o){if(t&1&&g(0,xe,2,1,"label")(1,Ce,1,2,"input",2)(2,ye,1,1,"textarea",3)(3,ve,1,1),t&2){let e,n=o.$implicit,a=c();x(n.label!==""?0:-1),l(),x(U(4,ge).includes(n.type)?1:-1),l(),x(n.type==="textarea"?2:-1),l(),x((e=a.myForm.get(n.name))!=null&&e.invalid&&((e=a.myForm.get(n.name))!=null&&e.touched)?3:-1)}}var G=class t{fb=S(M);http=S(te);myForm=this.fb.group({});jsonFormData=$(null);ngOnInit(){this.http.get("/assets/form.json").subscribe(o=>{this.jsonFormData.set(o),this.createForm(o)})}createForm(o){let e=o.controls;for(let n of e){let a=[];for(let[le,f]of Object.entries(n.validators))switch(le){case"min":a.push(p.min(f));break;case"max":a.push(p.max(f));break;case"required":f&&a.push(p.required);break;case"requiredTrue":f&&a.push(p.requiredTrue);break;case"email":f&&a.push(p.email);break;case"minLength":a.push(p.minLength(f));break;case"maxLength":a.push(p.maxLength(f));break;case"pattern":a.push(p.pattern(f));break;case"nullValidator":f&&a.push(p.nullValidator);break;default:break}this.myForm.addControl(n.name,this.fb.control(n.value,a))}}onSubmit(){console.log("Form valid: ",this.myForm.valid),console.log("Form values: ",this.myForm.value)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=u({type:t,selectors:[["ng-component"]],decls:6,vars:1,consts:[[3,"ngSubmit","formGroup"],["expand","full","type","submit"],[3,"type","formControlName"],[3,"formControlName"],[3,"control"]],template:function(e,n){if(e&1&&(i(0,"form",0),b("ngSubmit",function(){return n.onSubmit()}),i(1,"div"),j(2,he,4,5,null,null,be),r(),i(4,"button",1),s(5,"Submit"),r()()),e&2){let a;m("formGroup",n.myForm),l(2),B((a=n.jsonFormData())==null?null:a.controls)}},dependencies:[N,v,C,y,_,h,F,D],styles:["label[_ngcontent-%COMP%]{display:block;margin-bottom:5px}input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{border:1px solid #666666;width:100%;padding:8px;margin-bottom:10px;box-sizing:border-box}button[_ngcontent-%COMP%]{padding:10px 15px;background-color:#007bff;color:#fff;border:none;cursor:pointer}button[_ngcontent-%COMP%]:disabled{background-color:#ccc;color:#666;cursor:not-allowed}div[_ngcontent-%COMP%]{margin-bottom:10px}.red[_ngcontent-%COMP%]{color:red}.row[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;align-items:flex-start;flex-wrap:wrap}.col-25[_ngcontent-%COMP%]{width:25%;padding:5px;box-sizing:border-box}.col-50[_ngcontent-%COMP%]{width:50%;padding:5px;box-sizing:border-box}.col-100[_ngcontent-%COMP%]{width:100%;padding:5px;box-sizing:border-box}"],changeDetection:0})};var Fe=[{uniqueId:1,key:"text",type:"input",name:"first-name",props:{label:"First Name",placeholder:"First Name",required:!0,cssClass:"col-50"}},{uniqueId:2,key:"text",type:"input",name:"last-name",props:{label:"Last Name",placeholder:"Last Name",required:!1,cssClass:"col-50"}},{uniqueId:4,key:"text",type:"input",name:"full-name",props:{label:"full Name",placeholder:"full Name",required:!1,cssClass:"col-50"}},{uniqueId:3,key:"whyNot",type:"textarea",name:"comment",props:{label:"Why Not?",cssClass:"col-100",placeholder:"Type in here... I dare you"}}],et=[{path:"",component:O,children:[{path:"basic",component:P},{path:"nested",component:E},{path:"dynamic",component:q,data:{formFields:Fe}},{path:"dynamic-2",component:G},{path:"",redirectTo:"basic",pathMatch:"full"}]}];export{et as formsRoutes};
