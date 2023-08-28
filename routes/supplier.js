const express = require('express');
const router = express.Router();

const supplierController = require('../controllers/supplier')

router.route('/')
    .get(supplierController.getSuppliers)
    .post(supplierController.createSupplier)

router.route('/supplier/:id')
    .get(supplierController.getSupplier)
    .put(supplierController.updateSupplier)
    .delete(supplierController.deleteSupplier)

module.exports = router;
