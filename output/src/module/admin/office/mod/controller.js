define(["require","../../app","module/config"],function(e){var t=e("../../app"),n=e("module/config");t.controller("adminOfficeModControllor",["$scope","$stateParams","adminRequest","hrRequest","item","optType","$modalInstance",function(e,t,n,r,i,s,o){var u="办公地点";e.name=i.name,s=="mod"?e.title="修改"+u+"名称":e.title="新增"+u;var a="modOfficeForm";e.inputOptions={name:{required:!0,displayName:u,maxLength:50,name:"name",formName:a,placeholder:"少于50个字"}},e.closeHandler=function(){o.dismiss({})},e.saveHandler=function(t){t.$submitted=!0;if(!t.$valid)return;var r=null,u={};s=="mod"?(r=n.modOffice,u.office=i.id,u.officeName=e.name):(r=n.addOffice,u.officeName=e.name),r(u).then(function(e){info("操作成功"),o.dismiss({hasSuccess:!0,optType:s})})}}])});