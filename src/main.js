require.config({
    baseUrl: 'src',
    // 尽量少引用各种外库
    paths: {
        jquery: '../../../js-library/dep/jquery/dist/jquery.min',
        angular: '../../../js-library/dep/angular-1.3.16/angular',
        angularSanitize: '../../../js-library/dep/angular-sanitize/angular-sanitize.min',
        ngBootstrap: '../../../js-library/dep/angular-bootstrap-0.11.2/ui-bootstrap-tpls.min',
        ngRoute: '../../../js-library/dep/angular-ui-router/release/angular-ui-router.min',
        ngTree: '../../../js-library/src/ngDirective/treeControl/angular-tree-control',
        moment: '../../../js-library/dep/moment/moment',
        imageCrop: '../../../js-library/dep/imageCrop/bin/src',
        // 这个必须这样配置一下 ，因为imageCrop里面直接写的require('json')
        json: '../../../js-library/dep/imageCrop/bin/src/json'
    },
    packages: [{
        name: 'jsLibrary',
        location: '../../../js-library/'
    }],
    shim: {
        ngBootstrap: {
            deps: ['angular'],
            exports: 'ngBootstrap'
        },
        ngRoute: {
            deps: ['angular'],
            exports: 'ngRoute'
        },
        angularSanitize: {
            deps: ['angular'],
            exports: 'angularSanitize'
        },
        ngTree: {
            deps: ['angular'],
            exports: 'ngTree'
        }
    }
});

require(['deps'], function(echarts, config) {
    require(['app'], function(app) {});
});