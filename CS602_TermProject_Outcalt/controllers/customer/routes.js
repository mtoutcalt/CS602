const express = require('express');
const router = express.Router();

//modules
const displayCustomers = require("./displayCustomers");
const addCustomer = require("./addCustomer");
const saveCustomer = require("./saveCustomer");
const editCustomer = require("./editCustomer");
const saveCustomerAfterEdit = require("./saveCustomerAfterEdit");
const deleteCustomer = require("./deleteCustomer");

router.get('/customers', displayCustomers);

router.get('/customers/add', addCustomer);
router.post('/customers/add', saveCustomer);

router.get('/customers/edit/:id', editCustomer);
router.post('/customers/edit/:id', saveCustomerAfterEdit);

router.get('/customers/delete/:id', deleteCustomer);

module.exports = router;
