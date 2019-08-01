const mongoose = require('mongoose');
const modelName = 'expense';
const Schema = mongoose.Schema;
const baseSchema = require('./base-schema');
const expenseSchema = new Schema ({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    expenseDate: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    auditFields: baseSchema.auditFields
});
module.exports = mongoose.model('expense', expenseSchema); //Compiling schema to model