/**
 * @file 自然信息输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope, authUtil, workInfo, hrUtil, canModSelfFields) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var moment = require('moment');
        var obj = {
            hometown: {
                required: false,
                displayName: '籍贯',
                maxLength: 10,
                name: 'hometown',
                formName: formName,
                placeholder: '少于10个字'
            },
            ethnic: {
                required: false,
                displayName: '民族',
                maxLength: 10,
                name: 'ethnic',
                formName: formName,
                placeholder: '少于10个字'
            },
            politicalStatus: {
                required: false,
                displayName: '政治面貌',
                maxLength: 10,
                name: 'politicalStatus',
                formName: formName,
                placeholder: '少于10个字'
            },
            birthplace: {
                required: false,
                displayName: '出生地点',
                maxLength: 10,
                name: 'birthplace',
                formName: formName,
                placeholder: ''
            },
            accountLocation: {
                required: false,
                displayName: '户口所在地',
                maxLength: 10,
                name: 'accountLocation',
                formName: formName,
                placeholder: ''
            },
            degree: {
                required: true,
                displayName: '学历',
                name: 'degree',
                formName: formName,
                mode: 'select',
                items: config.DEGREE,
                filter: 'degree'
            },
            religion: {
                required: false,
                displayName: '宗教信仰',
                maxLength: 10,
                name: 'religion',
                formName: formName,
                placeholder: '少于10个字'
            },
            maritalStatus: {
                required: false,
                displayName: '婚姻状况',
                name: 'maritalStatus',
                formName: formName,
                mode: 'select',
                items: config.MARITAL_STATUS,
                filter: 'maritalStatus'
            },
            citizenship: {
                required: false,
                displayName: '国籍',
                maxLength: 10,
                name: 'citizenship',
                formName: formName,
                placeholder: '少于10个字'
            },
            isForeign: {
                required: false,
                displayName: '证件类型',
                name: 'isForeign',
                formName: formName,
                mode: 'select',
                items: config.ID_CARD_TYPE,
                filter: 'idCardType'
            },
            birthday: {
                required: true,
                displayName: '出生日期',
                name: 'birthday',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date',
                filter: 'dateFormat',
                max: moment().toDate()
            },
            accountType: {
                required: false,
                displayName: '户口类型',
                name: 'accountType',
                formName: formName,
                mode: 'select',
                items: config.ACCOUNT_TYPE,
                filter: 'accountType'
            },
            beginWorkTime: {
                required: false,
                displayName: '全职参加工作时间',
                name: 'beginWorkTime',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date',
                filter: 'dateFormat',
                max: moment().toDate()
            },
            isGraduate: {
                required: false,
                displayName: '是否毕业生入职',
                name: 'isGraduate',
                formName: formName,
                mode: 'select',
                items: config.IS_GRADUATE,
                filter: 'isGraduate'
            },
            mobile: {
                required: true,
                displayName: '手机号',
                maxLength: 15,
                name: 'mobile',
                formName: formName,
                pattern: '\\d*',
                placeholder: '少于15个数字'
            },
            idCardNumber: {
                required: true,
                displayName: '证件号',
                maxLength: 18,
                name: 'idCardNumber',
                formName: formName,
                pattern: '[0-9a-zA-Z()（）]*',
                placeholder: '少于18个字'
            },
            idCardAndContract: {
                required: true,
                displayName: '劳动合同/实习协议',
                name: 'idCardAndContract',
                formName: formName,
                mode: 'file'
            },
            idCardUpload: {
                required: true,
                displayName: '身份证复印件',
                name: 'idCardUpload',
                formName: formName,
                mode: 'file'
            },
            limitAgreement: {
                required: true,
                displayName: '竞业协议',
                name: 'limitAgreement',
                formName: formName,
                mode: 'file'
            },
            resume: {
                required: false,
                displayName: '简历',
                name: 'resume',
                formName: formName,
                mode: 'file'
            },
            contractEndDate: {
                required: false,
                displayName:'合同到期时间',
                formName: formName,
                name: 'contractEndDate'
            },
            formalDate: {
                required: false,
                displayName:'转正日期',
                mode: 'select',
                formName: formName,
                name: 'formalDate',
                items: []
            },
            enterTime: {
                required: true,
                displayName: '入职日期',
                name: 'enterTime',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date',
                filter: 'dateFormat'
            }

        }
        var type = $scope.staffType;
        if (type == codeConfig.TYPE_CODE.REGULAR) {
            obj.hometown.required = true;
            obj.ethnic.required = true;
            obj.politicalStatus.required = true;
            obj.birthplace.required = true;
            obj.accountLocation.required = true;
            obj.religion.required = true;
            obj.maritalStatus.required = true;
            obj.citizenship.required = true;
            obj.isForeign.required = true;
            obj.accountType.required = true;
            obj.beginWorkTime.required = true;
            obj.isGraduate.required = true;
        }
        if (type == codeConfig.AGENT_TYPE_CODE.REGULAR) {
            obj.idCardAndContract.required = false;
            obj.idCardUpload.required = false;
            obj.limitAgreement.required = false;
        }
        if (authUtil.isHeadquartersHR() || $scope.isSelfView) {
            obj.idCardAndContract.required = false;
            obj.idCardUpload.required = false;
            obj.limitAgreement.required = false;
        } else {
            if (!(hrUtil.needUploadLimitAgreement(workInfo.structureName, workInfo.level, workInfo.type))) {
                obj.limitAgreement.required = false;
            }
        }
        if ($scope.isSelfView) {
            for (var key in obj) {
                if ($.inArray(key, canModSelfFields) == -1) {
                    obj[key].required = false;
                }
            }
        }
        return obj;
    }
});