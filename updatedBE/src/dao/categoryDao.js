
const categorySchema = require('../model/categorySchema');
const baseDAO = require('./base-dao');

exports.addCategory = (categoryDetail) => {
    return new categorySchema({
        category: categoryDetail.category
    }).save();
}
exports.getAllCategory = async (limit, page, conditions) => {
    conditions = baseDAO.prepareConditionForDeletedData(conditions);
    const list = categorySchema.find(conditions).limit(limit).skip(page).sort('-auditFields.updatedAt').populate({
        path: 'expense',
        // select: { _id: true, category: true, auditFields: true },
        match: {
            'auditFields.isDeleted': false,
            'auditFields.isActive': true
        }
    });
    const count = categorySchema.countDocuments();
    const result = await Promise.all([list, count]);
    return { categories: result[0], count: result[1] };
}
exports.delete = async (categoryId) => {
    console.log('categorId', categoryId);
    return categorySchema.updateOne({ '_id': categoryId }, { $set: { 'auditFields.isDeleted': true, 'auditFields.isActive': false } });
}