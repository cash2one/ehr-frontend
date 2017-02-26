/**
* @file 预览offer
* @author Minsi Zhan zhanminsi@baijiahulian.com
*/

define(function (require) {
    var app = require('../../app');
    //var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var moment = require('moment')
    var closeParam = {};
    app.controller('hrOptOfferDetailCtrl', hrOptOfferDetailController);
    hrOptOfferDetailController.$inject = ['$scope', 'hrRequest', '$stateParams', 'localStorage',
        '$state', 'util', '$modalInstance', 'data'];
    function hrOptOfferDetailController(
            $scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, data) {
            $scope.lawName = data.lawName;
            var nowDate = new Date();
            $scope.sendDate = convertDate(nowDate);
            $scope.enterDate = convertDate(data.promiseEnterDate);
            $scope.office = convertOfferData(data.office);
            $scope.structure = convertOfferData(data.structure);
            $scope.position = convertOfferData(data.position);
            $scope.probationarySalary = convertOfferData(data.probationarySalary);
            $scope.baseSalary = convertOfferData(data.baseSalary);
            $scope.formalDate = data.formalDate;
            $scope.type = data.type;
            /**
             * 关闭modal
             */
            $scope.closeHandler = function () {
                $modalInstance.dismiss('cancel');
            }
    }

    /**
    * 转换时间变成年月日格式
    */
    function convertDate(date) {
        var dateResult = {};
        if (date == '') {
            dateResult.dateExist = false;
            dateResult.dateStr = '__年__月__日'
        }
        else {
            dateResult.dateExist = true;
            dateResult.dateStr = moment(date).format('YYYY年MM月DD日');
        }
        return dateResult;
    }

    /**
    * 根据offer参数值判断显示下划线还是实际值
    */
    function convertOfferData(data) {
        return {
            str: data === '' ? '______' : data,
            isExist: data === '' ? false : true
        }
    }

});