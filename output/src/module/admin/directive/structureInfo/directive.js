define(["require","../../app","module/config"],function(e){var t=e("../../app"),n=e("module/config");t.directive("structureInfo",["ajaxService","adminRequest","$templateCache","$compile","$timeout",function(e,t,n,r,i){return{restrict:"EA",scope:{id:"@nodeId"},replace:!1,link:function(e,s,o){$(s).hover(function(){e.timer=i(function(){var i="src/module/admin/directive/structureInfo/tpl.html",o=n.get(i)||$.ajax({type:"GET",url:i,async:!1}).responseText;t.getStuctureInfo({id:e.id}).then(function(t){e.info=t.data});var u=r(o)(e);$(s).parent().parent().parent().append(u)},500)},function(){i.cancel(e.timer),$(".admin-directive-structureInfo").detach()})}}}])});