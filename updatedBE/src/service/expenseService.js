const constant = require('./../utils/constant');
const res = require('../utils/custom-response');
const expenseDao = require('../dao/expenseDao');

const expenseService = {

    // serviice to add expense
    async addExpense(expenseDetails) {
        try {
            const createdUser = await expenseDao.addExpense(expenseDetails);
        } catch (error) {
            console.log('error', error);
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    // service to get all the expense
    getAllExpense(limit, page, conditions) {
        return new Promise((resolve, reject) => {
            try {
                limit = isNaN(Number(limit)) ? 10 : Number(limit);
                page = Number(page) || 1;
                const skip = (page ? limit * (page - 1) : 0);
                expenseDao.getAllExpense(limit, skip, conditions).then((users) => {
                    resolve(Object.assign(users, { limit, page }));
                }).catch((error) => {
                    throw error;
                });
            } catch (error) {
                return reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
            }
        });
    },

    // service to get an expense by id
    getById(expenseID) {
        console.log('userId', expenseID);
        return new Promise((resolve, reject) => {
            try {
                expenseDao.getById(expenseID).then((expenseID) => {
                    // resolve(Object.assign(userById));
                    resolve(expenseID);
                    // resolve(_.pick(batch, ['_id', 'username', 'role', 'name', 'email', 'auditFields']));
                }).catch((error) => {
                    throw error;
                });
            } catch (error) {
                return reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
            }
        });
    },

    // service to update an expense
    updateExpense(expenseID, expenseDetails) {
        try {

            if (expenseDetails == null) {
                return reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Expense Data found'));
            }
            return expenseDao.update(expenseID, expenseDetails);
        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    // service to delete an expense
    // delete(expenseId) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             expenseDao.delete(expenseId).then((expenseId) => {
    //                 // resolve(Object.assign(userById));
    //                 resolve(expenseId);
    //                 // resolve(_.pick(batch, ['_id', 'username', 'role', 'name', 'email', 'auditFields']));
    //             }).catch((error) => {
    //                 throw error;
    //             });
    //         } catch (error) {
    //             return reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
    //         }
    //     });
    // }


    async delete(id) {

        try {
            return Promise.resolve(expenseDao.delete(id));
        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },
}

module.exports = expenseService;