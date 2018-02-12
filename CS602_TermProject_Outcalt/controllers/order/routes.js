const express = require('express');
const router = express.Router();

//modules
const displayOrders = require("./displayOrders");
const addOrder = require("./addOrder");
const saveOrder = require("./saveOrder");
const editOrder = require("./editOrder");
const saveOrderAfterEdit = require("./saveOrderAfterEdit");
const deleteOrder = require("./deleteOrder");

router.get('/orders', displayOrders);

router.get('/orders/add', addOrder);
router.post('/orders/add', saveOrder);

router.get('/orders/edit/:id', editOrder);
router.post('/orders/edit/:id', saveOrderAfterEdit);

router.get('/orders/delete/:id', deleteOrder);

module.exports = router;
