define(["require","../app"],function(e){var t=e("../app");t.factory("localStorage",["ajaxService",function(e){return{set:function(e,t){localStorage.setItem(e,JSON.stringify(t))},get:function(e){return JSON.parse(localStorage.getItem(e))}}}])});