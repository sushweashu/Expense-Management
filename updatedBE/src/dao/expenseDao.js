
const expenseSchema = require('../model/expenseSchema');
const baseDAO = require('./base-dao');

// addExpense
exports.addExpense = (expenseDetail) => {
    console.log('expenseDetail in dao', expenseDetail);
    return new expenseSchema({
        categoryId: expenseDetail.categoryId,
        expenseDate: expenseDetail.expenseDate,
        amount: expenseDetail.amount,
        itemName: expenseDetail.itemName
    }).save();
}
// get all expense
exports.getAllExpense = async (limit, page, conditions) => {
    conditions = baseDAO.prepareConditionForDeletedData(conditions);
    const list = expenseSchema.find(conditions).limit(limit).skip(page).sort('-auditFields.updatedAt').populate({
        path: 'category',
        select: { category:1, auditFields: true },
        match: {
            'auditFields.isDeleted': false,
            'auditFields.isActive': true
        }
    });
    const count = expenseSchema.countDocuments();
    const result = await Promise.all([list, count]);
    return { expenses: result[0], count: result[1] };
}
// Get by id
exports.getById = async (expenseID) => {
    return expenseSchema.findOne({ _id: expenseID }).populate({
        path: 'category',
        $match: {
            'auditFields.isDeleted': false,
            'auditFields.isActive': true
        }
    });

}
// update an expense
exports.update = (expenseID, expenseDetails) => {
    return expenseSchema.updateOne({ _id: expenseID }, { $set: expenseDetails });
};
// delete an expense
exports.delete = async (id) => {
    console.log('id', id);
    return expenseSchema.updateOne({ '_id': id }, { $set: { 'auditFields.isDeleted': true, 'auditFields.isActive': false } });
}
