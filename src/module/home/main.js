/**
 * @file
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('./app');
    require('./controller');
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.
            state('home', {
                url: '/home',
                templateUrl: 'src/module/home/tpl.html',
                controller: 'homeCtrl'
            })
    }]);
});