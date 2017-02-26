define(["require","../app","module/config","module/codeConfig","moment","./mod/controller"],function(e){function s(e,t,n,r,s){function o(){e.months=f(),e.years=a(),e.query.year=e.years[0],u()}function u(){n.getCalendarList().then(function(t){e.tableOptions.data=t.data;if(typeof e.cid=="undefined"){var n=t.data[0];e.cid=n.id,e.curName=n.name,p()}})}function a(){var e=(new Date).getFullYear();return[e,e+1]}function f(){var e=[];for(var t=1;t<13;t++)e.push({key:t,value:t+"月"});return e}function l(e,t){p()}function c(){p()}function h(){p()}function p(){var t={month:e.query.year+"-"+e.query.month,templateId:e.cid};n.getWorkdays(t).then(function(t){var n=t.data.split(",");e.days=d(n)})}function d(t){var n=[],r=e.query.year,s=+e.query.month,o=i(r+"-"+s),u=i(r+"-"+s).add(1,"months").add(-1,"days"),a=u.format("D"),f=o.day();f==0&&(f=7);var l={};for(var c=0;c<t.length;c++)l[t[c]]=!0;for(var c=1;c<f;c++)n.push({value:"",isHoliday:!1});for(var c=1;c<=a;c++){var h=!0;l[c]&&(h=!1),n.push({value:c,isHoliday:h})}return n}function v(e){e.isHoliday==1?e.isHoliday=!1:e.isHoliday=!0}function m(){var t=e.query;n.modWorkdays({month:t.year+"-"+t.month,workdays:g().join(","),id:e.cid}).then(function(){info("保存成功")})}function g(){var t=[];for(var n=0,r;r=e.days[n++];)!r.isHoliday&&r.value!=""&&t.push(r.value);return t}function y(t){e.cid=t.id,e.curName=t.name,e.query.year=e.years[0],e.query.month=1,p()}function b(t){var n=s.open({templateUrl:"src/module/admin/holiday/mod/tpl.html",controller:"calendarModCtrl",resolve:{item:function(){return t},optType:function(){return"mod"}}});n.result.then(function(){},function(t){t.hasSuccess==1&&(u(),e.cid==t.id&&(e.curName=t.name))})}function w(e){var t=s.open({templateUrl:"src/module/admin/holiday/mod/tpl.html",controller:"calendarModCtrl",resolve:{item:function(){return e},optType:function(){return"add"}}});t.result.then(function(){},function(e){e.hasSuccess==1&&u()})}e.query={month:1},e.weeks=["一","二","三","四","五","六","日"],e.monthChangeHandler=l,e.yearChangeHandler=c,e.companyChangeHandler=h,e.dayClickHandler=v,e.saveHandler=m,e.nameClick=y,e.modifyClick=b,e.add=w,e.cid=undefined,e.tableOptions={data:[],canSelect:!1,mainScope:e,cols:[{field:"name",displayName:"模板名称",cellTpl:"src/module/admin/holiday/tableTpl/name.html"},{field:"opt",displayName:"操作",cellTpl:"src/module/admin/holiday/tableTpl/opt.html"}]},o()}var t=e("../app"),n=e("module/config"),r=e("module/codeConfig"),i=e("moment");e("./mod/controller"),t.controller("adminHolidayControllor",s),s.$inject=["$scope","$stateParams","adminRequest","hrRequest","$modal"]});