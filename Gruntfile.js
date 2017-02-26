'use strict'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-connect-proxy');

    function getFileName(fullName) {
        var path = fullName.split('/');
        var name = path[path.length - 1];
        name = name.split('.')[0];
        return name;
    }

    function replaceFileContent(file, matchStr, replaceStr) {
        var content = grunt.file.read(file);
        content = content.replace(matchStr, replaceStr);
        grunt.file.write(file, content);
    }

    grunt.initConfig({
        app: {
            'app': 'src',
            'tmp': '.tmp', // 主要是作为css及模块化js合并压缩的中转站
            'dist': 'output',
            'asset': 'output',
            'jsCommon': '../js-library',
            'timeStamp': grunt.template.today('yyyymmddHHMMss'),
            'require': grunt.file.readJSON('module.conf'),
            // 生产环境的dep位置
            'pro_dep_path': 'src/dep',
            // 本地commonJs的路
            'local_commonJs_path': '/Users/bjhl/Desktop/zhan/project/git/js-library',
            'hr_local_commonJs_path': '/var/lib/jenkins/jobs/yunying_common_dev_fe/workspace',
            // dev分支的jekins common-js位置
            // 'dev_commonJs_path': '/var/lib/jenkins/jobs/yunying_common_dev_fe/workspace',
            'dev_commonJs_path': '/Users/bjhl/yunying/js-library',
            // test分支的jekins common-js位置
            'test_commonJs_path': '/var/lib/jenkins/jobs/yunying_common_test_fe/workspace',
            // 'test_commonJs_path': '/workspace/erpWork/js-library',
            // master分支jekins common-js位置
            'master_commonJs_path': '/var/lib/jenkins/jobs/yunying_common_master_fe/workspace',
            // 'master_commonJs_path': '/Users/yeshiquan/js-library',
            'appName': '师资'
        },
        clean: {
            output: {
                src: ['<%= app.dist %>']
            },
            temp: {
                src: ['<%= app.tmp %>']
            }
        },
        watch: {
            less: {
                files: ['<%= app.app %>/**/*.less'],
                tasks: ['less:local']
            },
            js: {
                files: [
                    '<%= app.app %>/{,**/}*.js'
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= app.app %>/{,**/}*.js',
                '!Gruntfile.js',
                '!mock/{,**/}*.js'
            ]
        },
        less: {
            development: {
                files: [{
                    "<%= app.tmp%>/resource/css/style.css": "<%= app.tmp%>/resource/css/style.less"
                }]
            },

            local: {
                files: [{
                    "<%= app.app%>/resource/css/style.css": "<%= app.app%>/resource/css/style.less"
                }]
            },
            minify: {
                options: {
                    cleancss: true
                },
                files: [{
                    '<%= app.asset %>/src/resource/css/style.css': '<%= app.tmp %>/resource/css/style.css'
                }]
            }
        },
        replace: {
            css_dep: {
                options: {
                    patterns: [{
                        match: /\.\.\/\.\.\/\.\.\/\.\.\/js-library\/dep/g,
                        replacement: '../../dep'
                    }]
                },
                files: [{
                    dest: './',
                    src: '<%= app.tmp%>/**/*.less'
                }]
            },

            build: {
                options: {
                    patterns: [{
                        match: 'version',
                        replacement: '<%= app.timeStamp %>'
                    }, {
                        match: 'appName',
                        replacement: '<%= app.appName%>'
                    }, {
                        match: 'isDebugging',
                        replacement: "1"
                    }, {
                        // ../../../../../js-library/dep
                        match: /(\.\.\/)*js-library\/dep/g,
                        replacement: 'src/dep'
                    }]
                },
                files: [{
                    dest: '<%= app.asset %>/main.html',
                    src: 'main.html'
                }, {
                    dest: '<%= app.asset %>/login.html',
                    src: 'login.html'
                }, {
                    dest: '<%= app.asset %>/tip.html',
                    src: 'tip.html'
                }, {
                    dest: '<%= app.asset %>/src/main.js',
                    src: '<%= app.asset %>/src/main.js'
                }, {
                    dest: '<%= app.asset %>/src/app.js',
                    src: '<%= app.asset %>/src/app.js'
                }]
            },
            prodVariable: {
                options: {
                    patterns: [{
                        match: 'isProductionEnv',
                        replacement: "1"
                    }]
                },
                files: [{
                    dest: '<%= app.asset %>/src/main.js',
                    src: '<%= app.asset %>/src/main.js'
                }]
            }
        },


        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 16
            },
            images: {
                src: '<%= app.asset %>/common/img/**/*.{jpg,jpeg,gif,png}'
            }
        },
        copy: {
            tmp: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= app.app %>',
                    dest: '<%= app.tmp %>',
                    src: [
                        '**/*.*'
                    ]
                }]
            },
            asset: {
                files: [{
                    dest: '<%= app.asset %>/favicon.ico',
                    src: 'favicon.ico'
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= app.tmp%>',
                    dest: '<%= app.asset %>/src',
                    src: [
                        '**/*.html',
                        '**/*.{jpg,png,gif,jpeg}',
                        '**/*.swf',
                        '**/*.eot',
                        '**/*.svg',
                        '**/*.ttf',
                        '**/*.woff'
                    ]
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 8848,
                    hostname: '0.0.0.0',
                    keepalive: true,
                    base: '../',
                    debug: true,
                    middleware: function(connect, options, middlewares) {
                        // 伪造ajax数据
                        middlewares.unshift(require('./grunt/mock')(grunt));

                        // 对less文件做处理
                        //  middlewares.unshift(require('./grunt/lessMock')(grunt));

                        return middlewares;
                    }
                }
            }
        },
        html2js: {
            pro: {
                options: {
                    singleModule: true,
                    rename: function(moduleName) {
                        return 'src/' + moduleName;
                    },
                    module: 'templates-main',
                    fileHeaderString: 'define(function (require) {',
                    fileFooterString: '})'
                },
                src: ['<%= app.app %>/**/*.html'],
                dest: '<%= app.app %>/module/main.tpl.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-devtools');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('copyDepFile', 'copy dep file', function(envName) {
        var path = '<%= app.hr_local_commonJs_path%>';
        if (envName == 'dev') {
            path = '<%= app.dev_commonJs_path%>'
        }
        if (envName == 'test') {
            path = '<%= app.test_commonJs_path%>'
        }
        if (envName == 'prod' || envName == 'beta') {
            path = '<%= app.master_commonJs_path%>'
        }
        grunt.config.set('copy', {
            copyDepFile: {
                files: [
                    // 拷贝dep里面未被打包的文件
                    {
                        expand: true,
                        dot: true,
                        cwd: path,
                        dest: '<%= app.asset %>/src',
                        src: [
                            'dep/bootstrap/dist/css/bootstrap.min.css',
                            'dep/jquery/dist/jquery.min.js',
                            'dep/requirejs/require.js',
                            'dep/imageCrop/bin/src/imageCrop.swf',
                            'dep/angular-1.3.16/angular.min.js',
                            'dep/angular/ui-bootstrap-tpls-0.11.2.js',
                            'dep/angular-ui-router/**/*.*',
                            'dep/bootstrap/dist/fonts/**/*.*'
                        ]
                    }, {
                        expand: true,
                        dot: true,
                        cwd: path,
                        dest: '<%= app.tmp %>',
                        src: [
                            'dep/**/*.*'
                        ]
                    }
                ]
            }
        });
        grunt.task.run(['copy:copyDepFile']);
    });
    grunt.registerTask('requirejsBuild', 'requirejs file', function(envName) {
        var path = '<%= app.hr_local_commonJs_path%>';
        if (envName == 'dev') {
            path = '<%= app.dev_commonJs_path%>'
        }
        if (envName == 'test') {
            path = '<%= app.test_commonJs_path%>'
        }
        if (envName == 'prod' || envName == 'beta') {
            path = '<%= app.master_commonJs_path%>'
        }
        grunt.config.set('requirejs', {
            main: {
                options: {
                    baseUrl: 'src',
                    dir: '<%= app.asset %>/src',
                    // name: 'main',
                    // out: '<%= app.asset %>/src/main.js',
                    optimize: 'uglify',
                    // optimize: 'none',
                    paths: {
                        jquery: path + '/dep/jquery/dist/jquery.min',
                        angular: path + '/dep/angular-1.3.16/angular.min',
                        angularSanitize: path + '/dep/angular-sanitize/angular-sanitize.min',
                        ngBootstrap: path + '/dep/angular-bootstrap-0.11.2/ui-bootstrap-tpls.min',
                        ngRoute: path + '/dep/angular-ui-router/release/angular-ui-router',
                        moment: path + '/dep/moment/moment',


                        ngTree: path + '/src/ngDirective/treeControl/angular-tree-control',
                        imageCrop: path + '/dep/imageCrop/bin/src',
                        // 这个必须这样配置一下 ，因为imageCrop里面直接写的require('json')
                        json: path + '/dep/imageCrop/bin/src/json'
                    },
                    shim: {
                        ngBootstrap: {
                            deps: ['angular'],
                            exports: 'ngBootstrap'
                        },
                        ngRoute: {
                            deps: ['angular'],
                            exports: 'ngRoute'
                        },
                        moment: {
                            exports: 'moment'
                        },
                        ngTree: {
                            deps: ['angular'],
                            exports: 'ngTree'
                        }
                    },
                    packages: [{
                        name: 'jsLibrary',
                        location: path + '/'
                    }],
                    modules: [{
                        name: 'app',
                        exclude: ['deps']
                    }, {
                        name: 'deps'
                    }]
                }
            }
        });
        grunt.task.run(['requirejs:main']);
    });

    /**
     * 構建任務
     */
    grunt.registerTask('build', 'the build task', function(envName) {
        var tasks = [
            'clean:output',
            'clean:temp',
            'copy:tmp', // 拷贝文件
            // 'replace:releaseVariable',
            'copy:asset', // 拷贝文件
            'copyDepFile:' + envName, // 拷贝dep文件
            'html2js:pro',
            // requirejs合并模块化js
            'requirejsBuild:' + envName,
            'copyDepFile:' + envName, // 拷贝dep文件
            'replace:css_dep', // 替换css对dep依赖的路径
            'less:development', // 合并编译合并less->css
            'less:minify', // 样式文件压缩和存储
            'replace:build' // 替换变量
        ];
        grunt.task.run(tasks);
    });
    grunt.registerTask('server', [
        'less:local',
        'connect:server'
    ]);
};
