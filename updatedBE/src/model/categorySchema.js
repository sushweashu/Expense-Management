const mongoose = require('mongoose');
const modelName = 'category';
const Schema = mongoose.Schema;
const baseSchema = require('./base-schema');
const categorySchema = new Schema ({
    category: {
        type: String,
        required: true
    },
    auditFields: baseSchema.auditFields
});
module.exports = mongoose.model('category', categorySchema); //Compiling schema to model
