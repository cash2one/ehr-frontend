/**
 * @file ajax service
 * @author yanlingling
 */
define(function (require) {
    var app = require('../app');
    app.factory('ajaxService', ['$http', '$rootScope', '$q', '$cacheFactory', 'loadingUtil', 'login',
        function ($http, $rootScope, $q, $cacheFactory, loadingUtil, login) {
            var ajaxCache = {};
            // 发出请求计数 只有请求都回来了，才能hide loading
            var hasSendedRequest = 0;

            return {

                /**
                 * 发送请求
                 * @param {string} path 请求的path
                 * @param {Object} param 请求的参数
                 */
                send: function (path, param) {
                    hasSendedRequest++;
                    return doRequest(path, param);
                },

                /**
                 * 清空指定path的缓存
                 * @param path
                 */
                clearCache: function (path) {
                    for (var key in ajaxCache) {
                        if (key.indexOf(path) == 0) {
                            ajaxCache.key = null;
                        }
                    }
                }
            };

            /**
             * 请求
             * @param path
             * @param param
             * @returns {*}
             */
            function doRequest(path, param) {
                var cache = param.cache || false;
                var asyn = typeof param.asyn == 'undefined' ? true : param.asyn;
                var showLoading = typeof param.showLoading == 'undefined'
                    ? true : param.showLoading;

                // 可以提供一个cacheTime参数  来指定缓存数据多久
                var cacheTime = param.cacheTime;
                var defer = $q.defer();
                var cacheId = path + '--' + JSON.stringify(param);
                var cacheContent = ajaxCache[cacheId] || null;
                if (cacheContent) {
                    var cachedData = cacheContent.content;
                    var lastDataTime = cacheContent.getTime;
                }

                var isFresh = isDateFresh(lastDataTime, cacheTime);

                if (cache && cachedData && isFresh) {
                    reqSuccess(cachedData, param, defer);
                } else {
                    if (showLoading) {
                        loadingUtil.showLoading();
                    }
                    if (asyn) {
                        var requestParam = {
                            method: 'POST',
                            url: path,
                            cache: cache,
                            data: param.data || {}
                        };
                        if (param.type && param.type == 'file') {
                            requestParam.transformRequest = angular.identity;
                            requestParam.headers = {'Content-Type': undefined};
                        }
                        $http(requestParam).success(function (data) {
                            successHandler(data);
                        }).error(function () {
                            failHandler();
                        })
                    } else {
                        // 请求环境信息
                        var res = $.ajax({
                            url: path,
                            type: 'post',
                            data: param.data || {},
                            async: false
                        });
                        try {
                            var data = $.parseJSON(res.responseText);
                            successHandler(data);
                        } catch (e) {
                            failHandler();
                        }
                    }

                    /**
                     * 失败处理
                     */
                    function failHandler() {
                        hasSendedRequest--;
                        if (showLoading && hasSendedRequest == 0) {
                            loadingUtil.hideLoading();
                        }
                        alert('网络异常');
                    }

                    /**
                     * 成功处理
                     */
                    function successHandler(data) {
                        hasSendedRequest--;
                        if (showLoading && hasSendedRequest == 0) {
                            loadingUtil.hideLoading();
                        }
                        reqSuccess(data, param, defer);
                        if (cache) {
                            // 缓存数据
                            ajaxCache[cacheId] = {
                                content: data,
                                getTime: new Date().getTime()
                            };
                        }
                    }

                }

                return defer.promise;
            }

            /**
             * ajax请求成功的回调
             * @param {Object} data 返回数据
             */
            function reqSuccess(data, param, defer) {
                if (data.status == 200) {
                    defer.resolve(data);
                } else {
                    defer.reject(data);
                }
                if (data.status == 200) {
                    param.successHandler && param.successHandler(data);
                } else if (data.status == 500) {
                    alert('系统异常');
                } else if (data.status == 700) {
                    login.show();
                } else if (data.status == 400 || data.status == 800) {
                    if (param.failHandler) {
                        param.failHandler(data, data.error.message);
                    } else {
                        alert((data.error && data.error.message) || '未知错误(' + new Date().getTime() + ')，请联系ehr@baijiahulian.com');
                    }
                } else if (data.status == 300) {
                    // 部分成功
                    param.partSuccessHandler && param.partSuccessHandler(data);
                } else if (data.status == 0) { // 认为是302,刷新下页面
                    window.location.reload();
                } else {
                    alert('unkonwn error');
                }
            }

            function isDateFresh(lastDataTime, cacheTime) {
                // 永久缓存
                if (!cacheTime) {
                    return true;
                }
                var nowTime = new Date().getTime();
                // 失效
                if (nowTime - lastDataTime > cacheTime) {
                    return false;
                }
                return true;

            };
        }])
});
