define(["require","../app","module/config","module/codeConfig","module/nameConfig","../config","./colsConfig","moment"],function(e){function a(e,t,r,i,s,a,f,l){function c(){e.onSearch=h,e.tableOptions={data:[],canSelect:!0,totalCount:0,cols:o(e),pageSize:n.PAGE_SIZE,onPageChange:function(t){e.currentPage=t,v()},selectedItems:[]},e.getList=v,e.monthMax=u().format("YYYY-MM"),e.query.month=new Date(e.monthMax+"-01 00:00:00"),p()}function h(){v()}function p(){t.getSocialSecurityCity().then(function(t){t.data.unshift(n.EMPTY),e.cityList=t.data})}function d(e){for(var t=0,n;n=e[t++];);return e}function v(){if(!e.query.city){alert("请选择社保缴纳城市");return}if(!e.query.month){alert("请输入查询月份");return}var r={pageDto:{pageNum:e.currentPage||1,pageSize:n.PAGE_SIZE},socialSecurityCity:e.query.city,month:u(e.query.month.getTime()).format("YYYY-MM")};t.getStaffSocialSecurityList(r).then(function(t){e.tableOptions.data=d(t.data),e.tableOptions.totalCount=t.pageDto&&t.pageDto.count||0}),e.exportUrl=m(r)}function m(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&n!="pageDto"&&t.push(n+"="+e[n]);return"EXPORT/staff/socialSecurityList.json?"+t.join("&")}e.currentPage=1,e.query={},c()}var t=e("../app"),n=e("module/config"),r=e("module/codeConfig"),i=e("module/nameConfig"),s=e("../config"),o=e("./colsConfig"),u=e("moment");t.controller("hrSecurityListController",a),a.$inject=["$scope","hrRequest","$state","hrUtil","util","hrOptUtil","adminUtil","adminRequest"]});