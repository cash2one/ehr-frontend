/**
 * @file 首页
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    require('./util');
    var app = require('./app');
    app.controller('homeCtrl', ['$scope', 'authUtil', 'localStorage', '$state', 'homeUtil',
        function ($scope, authUtil, localStorage, $state, homeUtil) {
            $scope.isHR = authUtil.isHR();
            $scope.isHRBP = authUtil.isHRBP();
            $scope.isRecruitHR = authUtil.isRecruitHR();
            $scope.isRelationshipHR = authUtil.isRelationshipHR();
            $scope.isSalaryHR = authUtil.isSalaryHR();
            $scope.isTrainingHR = authUtil.isTrainingHR();
            $scope.isAssetManager = authUtil.isAssetManager();
            $scope.isItManager = authUtil.isItOwner();
            $scope.isManager = authUtil.isManager();
            $scope.isAdmin = authUtil.isAdmin();
            $scope.isAgent = authUtil.isAgent();
            $scope.isReception = authUtil.isReception();
            $scope.canSearchStaff = authUtil.canSearchStaff();
            $scope.isStructureOwner = authUtil.isStructureOwner();
            /**
             * 我的信息
             */
            $scope.selfInfoClick = function () {
                localStorage.set('number', $scope.userInfo.number);
                $state.go('subordinate.self.baseInfo');
            }

            /**
             * 年终奖点击
             */
            $scope.yearAwardClick = function () {
                homeUtil.showYearAward();
            }

            /**
             * 薪酬变更导入
             */
            $scope.salaryChangeClick = function () {
                homeUtil.showSalaryChange();
            }

            /**
             * 五险一金基数变化
             */
            $scope.baseChangeClick = function () {
                homeUtil.showBaseChange();
            }
        }]);
});
