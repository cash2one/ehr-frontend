define(["require","../../app"],function(e){var t=e("../../app");t.directive("singleSelect",["$http",function(e){return{restrict:"EA",scope:{values:"=",clickHandler:"&"},require:"?ngModel",templateUrl:"src/common/directive/singleSelect/tpl.html",replace:!1,link:function(e,t,n,r){e.valueChange=function(t,n){r.$setViewValue(t),e.value=t,e.clickHandler({val:t,index:n})},r.$formatters.push(function(e){return e}),r.$parsers.push(function(e){return e}),r.$render=function(){e.value=r.$viewValue}}}}])});