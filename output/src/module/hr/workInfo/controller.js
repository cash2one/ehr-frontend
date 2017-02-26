define(["require","../app","./options","module/config","module/codeConfig"],function(e){var t=e("../app"),n=e("./options"),r=e("module/config"),i=e("module/codeConfig");t.controller("hrWorkInfoCtrl",["$scope","hrRequest","adminRequest","$stateParams","localStorage","$state","authUtil","hrUtil","util",function(e,t,s,o,u,a,f,l,c){function h(){e.entryName=="subordinate.self.workInfo"?e.canEditWorkInfo=!0:e.entryName=="subordinate.info.workInfo"?e.canEditWorkInfo=!1:(l.initEntryHRType(e),e.isFromHRBP&&(e.canEditWorkInfo=!0),e.isFromRelationshipHR&&(e.canEditWorkInfo=!0)),(!e.canEditWorkInfo||e.isReadOnly)&&e.disbaleWorkInput(),e.getWorkInfo(),l.initCommonInfo(e),e.getContractCompany(),d(),v()}function p(){e.entryName=="subordinate.self.workInfo"?e.workOptions.sit.disable=!1:(e.workOptions.sit.disable=!1,e.workOptions.icCardNumber.disable=!1,e.workOptions.remotePunchCard.disable=!1,e.workOptions.requireCheckTime.disable=!1,e.commonInfo.status==i.STAFF_STATUS_CODE.TO_JOIN&&(e.workOptions.office.disable=!1,e.workOptions.contractCompany.disable=!1,e.commonInfo.type==i.TYPE_CODE.REGULAR&&(e.workOptions.socialSecurityCity.disable=!1))),e.isReadOnly=!1}function d(){e.canEditWorkInfo&&t.getOffice().then(function(t){t.data.unshift(r.EMPTY),e.workOptions.office.items=t.data})}function v(){e.canEditWorkInfo&&t.getSocialSecurityCity().then(function(t){t.data.unshift(r.EMPTY),e.workOptions.socialSecurityCity.items=t.data})}function m(){s.getKeyNodeInfo({structure:e.structure}).then(function(t){t.data.punchCard?e.isPunchCardNode=!0:e.isPunchCardNode=!1})}e.number=u.get("number"),e.structure={},e.isReadOnly=!0,e.entryName=a.current.name,e.workOptions=n("workInfoForm",e),e.onEdit=p,e.getContractCompany=function(){e.canEditWorkInfo&&t.getContractCompany().then(function(t){t.data.unshift(r.EMPTY),e.workOptions.contractCompany.items=t.data})},e.disbaleWorkInput=function(){l.disableOptions(e.workOptions)},e.getWorkInfo=function(){t.getStaffWorkInfo({number:e.number}).then(function(t){$.extend(!0,e,t.data),e.leader=c.getShowUserName(e.leader,e.leaderName),e.workOptions.contractCompany.displayValue=e.contractCompanyName,e.workOptions.office.displayValue=e.officeName,e.workOptions.socialSecurityCity.displayValue=e.socialSecurityCityName,m()})},e.saveWorkInfo=function(n){if(!n.$valid)return;var r={number:e.number,office:e.office,socialSecurityCity:e.socialSecurityCity,contractCompany:e.contractCompany,sit:e.sit,icCardNumber:e.icCardNumber,remotePunchCard:e.remotePunchCard,requireCheckTime:e.requireCheckTime};t.saveWorkInfo(r).then(function(){info("保存成功"),e.isReadOnly=!0,e.disbaleWorkInput(),e.getWorkInfo()})},h()}])});