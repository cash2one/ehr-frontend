/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope, util) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var fieldSet = ['mealPlus', 'recommend', 'houseSubsidy',
            'specialReward', 'performExtSalary', 'otherSubsidy'];
        var fieldNameMap = {
            mealPlus: '补充餐补',
            recommend: '推荐费用',
            houseSubsidy: '住房补贴',
            specialReward: '分公司经理特别奖',
            performExtSalary: '补充绩效',
            otherSubsidy: '其它补贴'
        }
        var obj = {};
        for (var i = 0, val; val = fieldSet[i++];) {
            var regStr = config.BASE_REG_STR;
            if (val == 'otherSubsidy' || val == 'performExtSalary') {
                regStr = config.NEGATIVE_BASE_REG_STR;
            }
            obj[val] = {
                required: true,
                name: val,
                displayName: '',
                formName: formName,
                pattern: regStr,
                errorDisplayName: fieldNameMap[val],
                changeHandler: $scope.getInputChangeHandler(val)
            }
        }
        return obj;
    }
});