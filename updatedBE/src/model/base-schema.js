const mongoose = require('mongoose');


exports.auditFields = {
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    ipAddress: {
        type: String
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }, isActive: {
        type: Boolean,
        require: true,
        default: true
    }, isDeleted: {
        type: Boolean,
        require: true,
        default: false
    }
};