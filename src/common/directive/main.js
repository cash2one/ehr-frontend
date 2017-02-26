/** 入口文件
 * @file
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    require('./compile');
    require('./stopEvent');
    require('./inputValidate/directive');
    require('./inputControl/directive');
    require('./nameSuggestion/directive');
    require('./checkboxGroup/directive');
    require('./customCols/directive');
    require('./table/directive');
    require('./commonInfo/directive');
    require('./multiSelect/directive');
    require('./structureSelector/directive');
    require('./itemSet/directive');
    require('./multiName/directive');
    require('./singleSelect/directive');
    require('./timerButton/directive');
    require('./fiveBase/directive');
    require('./popoverHtmlUnsafePopup/directive');
    require('./popoverHtmlUnsafe');
    require('./imageCrop/directive');
});