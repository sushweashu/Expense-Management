const _ = require('lodash');

exports.prepareConditionForDeletedData = function (condition) {
    if (_.isUndefined(condition) || _.isEmpty(condition)) {
        condition = {};
        condition['auditFields.isDeleted'] = false;
        return condition;
    }
    if (_.isUndefined(condition['auditFields.isDeleted'])) {
        condition['auditFields.isDeleted'] = false;
    }
    return condition;
}

exports.prepareConditionForActiveData = function (condition) {
    if (_.isUndefined(condition) || _.isEmpty(condition)) {
        condition = {};
        condition['auditFields.isActive'] = true;
        return condition;
    }
    if (_.isUndefined(condition['auditFields.isActive'])) {
        condition['auditFields.isActive'] = true;
    }
    return condition;
}