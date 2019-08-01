const constant = require('./../utils/constant');
const res = require('../utils/custom-response');
const categoryDao = require('../dao/categoryDao');

const categoryService = {
    async addCategory(categoryDetails) {
        try {
            const createdUser = await categoryDao.addCategory(categoryDetails);
        } catch (error) {
            console.log('error', error);
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },
    getAllCategory(limit, page, conditions) {
    return new Promise((resolve, reject) => {
        try {
            limit = isNaN(Number(limit)) ? 10 : Number(limit);
            page = Number(page) || 1;
            const skip = (page ? limit * (page - 1) : 0);
            console.log('conditions in service', conditions);
            categoryDao.getAllCategory(limit, skip, conditions).then((categories) => {
                resolve(Object.assign(categories, { limit, page }));
            }).catch((error) => {
                throw error;
            });
        } catch (error) {
            return reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    });
},
async delete(categoryId) {
    try {
        return Promise.resolve(categoryDao.delete(categoryId));
    } catch (error) {
        return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
    }
},
    }
    
    module.exports = categoryService;