const express = require('express');
const constant = require('../utils/constant');
const categoryService = require('../service/categoryService');
const route = express.Router();

route.post('/addCategory', (req, res) => {
    console.log('req', req.body);
    categoryService.addCategory(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
route.get('/getAllCategory', (req, res) => {
    console.log('request in query', req.query);
    const limit = req.query.limit;
    const page = req.query.page;
    const condition = req.query.q;
    console.log('condition in controller', condition);
    categoryService.getAllCategory(limit, page, condition).then((result) => {
        console.log('result', result);
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
// soft delete of the expense
route.delete('/:categoryID', (req, res) => {
    categoryService.delete(req.params.categoryID).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
module.exports = route;