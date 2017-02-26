/**
 * @file 城市修改
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    var getInputOptions = require('./inputOptions');
    app.controller('adminSocialSecurityCityModControllor', ['$scope', '$stateParams', 'util',
        'adminRequest', 'hrRequest', 'item', 'optType', '$modalInstance',
        function (
            $scope, $stateParams, util, adminRequest, hrRequest, item, optType, $modalInstance) {
            var title = '社保缴纳城市';
            $.extend(true, $scope, item);

            if (optType == 'mod') {
                $scope.title = '修改' + title;
            } else {
                $scope.title = '新增' + title;
            }
            $scope.socialSecurityBySalaryChange = socialSecurityBySalaryChange;
            $scope.houseFundBySalaryChange = houseFundBySalaryChange;
            var formName = 'modSocialSecurityCityForm';
            $scope.inputOptions = getInputOptions(formName, $scope);
            if ($scope.socialSecurityBySalary) {
                disableSocialSecurityDefault(true);
            }
            if ($scope.houseFundBySalary) {
                disableHouseFundDefault(true);
            }

            /**
             * 关闭modal
             */
            $scope.closeHandler = function () {
                $modalInstance.dismiss({});
            }

            /**
             * 保存
             */
            $scope.saveHandler = function (form) {
                form.$submitted = true;
                if ($scope.socialSecurityBySalary) {
                    form['socialSecurityDefault'].$setValidity('required', true);
                }
                if ($scope.houseFundBySalary) {
                    form['houseFundDefault'].$setValidity('required', true);
                }
                if (!form.$valid) {
                    return;
                }
                var request = null;
                var data = getRequestData();
                if (!validateRange(data)) {
                    return;
                }
                if (!validateDefault(data)) {
                    return;
                }
                if (optType == 'mod') {
                    request = adminRequest.modSocialSecurityCity;
                    data.socialSecurityCity = item.id;
                } else {
                    request = adminRequest.addSocialSecurityCity;
                }
                request(data).then(function (res) {
                    info('操作成功');
                    $modalInstance.dismiss({
                        hasSuccess: true,
                        optType: optType
                    });
                });
            };

            /**
             * 检查上下限的大小关系
             * @param data
             * @returns {boolean}
             */
            function validateRange(data) {
                if (!validateMinMax(data, 'socialSecurity', '社保基数')) {
                    return false;
                }
                if (!validateMinMax(data, 'endow', '养老保险个人基数')) {
                    return false;
                }
                if (!validateMinMax(data, 'unemploy', '失业险个人基数')) {
                    return false;
                }
                if (!validateMinMax(data, 'medical', '医疗保险个人基数')) {
                    return false;
                }
                if (!validateMinMax(data, 'injury', '工伤保险个人基数')) {
                    return false;
                }
                if (!validateMinMax(data, 'maternity', '生育险个人基数')) {
                    return false;
                }

                if (!validateMinMax(data, 'endowC', '养老保险公司基数')) {
                    return false;
                }
                if (!validateMinMax(data, 'unemployC', '失业险公司基数')) {
                    return false;
                }
                if (!validateMinMax(data, 'medicalC', '医疗保险公司基数')) {
                    return false;
                }
                if (!validateMinMax(data, 'injuryC', '工伤保险公司基数')) {
                    return false;
                }
                if (!validateMinMax(data, 'maternityC', '生育险公司基数')) {
                    return false;
                }

                if (!validateMinMax(data, 'houseFund', '公积金基数')) {
                    return false;
                }
                return true;
            }

            /**
             * 检查默认值在上限和下限之间
             * @param data
             * @returns {boolean}
             */
            function validateDefault(data) {
                if (data.socialSecurityDefault > data.socialSecurityMax
                    || data.socialSecurityDefault < data.socialSecurityMin) {
                    alert('默认社保基数应该大于社保基数下限且小于社保基数上限');
                    return false;
                }
                if (data.houseFundDefault > data.houseFundMax
                    || data.houseFundDefault < data.houseFundMin) {
                    alert('默认公积金基数应该大于公积金基数下限且小于公积金基数上限');
                    return false;
                }
                return true;
            }

            /**
             * 最大值要比最小值大
             * @param data
             * @param field
             * @param fieldName
             */
            function validateMinMax(data, field, fieldName) {
                if (+data[field + 'Max'] < +data[field + 'Min']) {
                    alert(fieldName + '上限须大于下限');
                    return false;
                }
                return true;
            }

            function socialSecurityBySalaryChange(val) {
                if (val) {
                    disableSocialSecurityDefault(true);
                } else {
                    disableSocialSecurityDefault(false);
                }
            }

            function disableSocialSecurityDefault(disable) {
                $scope.inputOptions.socialSecurityDefault.forbid = disable;
            }


            function houseFundBySalaryChange(val) {
                if (val) {
                    disableHouseFundDefault(true);
                } else {
                    disableHouseFundDefault(false);
                }
            }

            function disableHouseFundDefault(disable) {
                $scope.inputOptions.houseFundDefault.forbid = disable;
            }

            /**
             * 请求数据拼装
             */
            function getRequestData() {
                var res = {
                    socialSecurityCityName: $scope.name,
                    socialSecurityDefault: +$scope.socialSecurityDefault,
                    socialSecurityBySalary: $scope.socialSecurityBySalary ? 1 : 0,
                    needFiveBase: $scope.needFiveBase ? 1 : 0,
                    houseFundPersonalPer: +$scope.houseFundPersonalPer,
                    houseFundCompanyPer: +$scope.houseFundCompanyPer,
                    houseFundDefault: +$scope.houseFundDefault,
                    houseFundBySalary: $scope.houseFundBySalary ? 1 : 0,
                    socialSecurityMax: +$scope.socialSecurityMax,
                    socialSecurityMin: +$scope.socialSecurityMin,
                    houseFundMin: +$scope.houseFundMin,
                    houseFundMax: +$scope.houseFundMax,
                    medicalLCtryPlus: +$scope.medicalLCtryPlus,
                    medicalLCityPlus: +$scope.medicalLCityPlus,
                    medicalFCtryPlus: +$scope.medicalFCtryPlus,
                    medicalFCityPlus: +$scope.medicalFCityPlus,
                    medicalLCtryCPlus: +$scope.medicalLCtryCPlus,
                    medicalLCityCPlus: +$scope.medicalLCityCPlus,
                    medicalFCtryCPlus: +$scope.medicalFCtryCPlus,
                    medicalFCityCPlus: +$scope.medicalFCityCPlus
                };
                getInsuranceParam(res, 'endow');
                getInsuranceParam(res, 'medical');
                getInsuranceParam(res, 'unemploy');
                getInsuranceParam(res, 'injury');
                getInsuranceParam(res, 'maternity');
                return res;
            }

            /**
             * 组合五险参数
             * @param data
             * @param name
             */
            function getInsuranceParam(data, name) {
                data[name + 'Min'] = +$scope[name + 'Min'] || 0;
                data[name + 'Max'] = +$scope[name + 'Max'] || 0;
                if (!util.inputEmpty($scope[name + 'CMin'])) {
                    data[name + 'CMin'] = +$scope[name + 'CMin'];
                } else {
                    data[name + 'CMin'] = data[name + 'Min'];
                }
                if (!util.inputEmpty($scope[name + 'CMax'])) {
                    data[name + 'CMax'] = +$scope[name + 'CMax'];
                } else {
                    data[name + 'CMax'] = data[name + 'Max'];
                }

                data[name + 'LCityPP'] = +$scope[name + 'LCityPP'] || 0;
                data[name + 'LCityCP'] = +$scope[name + 'LCityCP'] || 0;
                data[name + 'LCtryPP'] = +$scope[name + 'LCtryPP'] || 0;
                data[name + 'LCtryCP'] = +$scope[name + 'LCtryCP'] || 0;
                data[name + 'FCityPP'] = +$scope[name + 'FCityPP'] || 0;
                data[name + 'FCityCP'] = +$scope[name + 'FCityCP'] || 0;
                data[name + 'FCtryPP'] = +$scope[name + 'FCtryPP'] || 0;
                data[name + 'FCtryCP'] = +$scope[name + 'FCtryCP'] || 0;
            }
        }]);
})
