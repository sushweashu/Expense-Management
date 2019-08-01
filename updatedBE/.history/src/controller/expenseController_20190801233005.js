const express = require('express');
const constant = require('../utils/constant');
const expenseService = require('../service/expenseService');
const route = express.Router();

// Add Expense
route.post('/addExpense', (req, res) => {
    console.log('req', req.body);
    expenseService.addExpense(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

// get all expense
route.get('/getAllExpense', (req, res) => {
    console.log('req.query', req.query.q);
    const limit = req.query.limit;
    const page = req.query.page;
    const condition = req.query.q;
    expenseService.getAllExpense(limit, page, condition).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

// get expense details by id
route.get('/:expenseID', (req, res) => {
    const expenseID = req.params.expenseID;
    expenseService.getById(expenseID).then((result) => {
 res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

// update an expense
route.put('/update/:expenseID', (req, res) => {
    expenseService.updateExpense(req.params.expenseID, req.body).then((result) => {
 res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

// soft delete of the expense
route.delete('/:expenseID', (req, res) => {
    expenseService.delete(req.params.expenseID).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
module.exports = route;