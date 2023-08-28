const express = require('express');
const router = express.Router();

const purchaseController = require('../controllers/purchase')

router.route('/')
    .get(purchaseController.getAllPurchases)
    .post(purchaseController.createPurchase)

router.route('/:id')
    .get(purchaseController.getPurchaseById)

router.route('/userPurchases/:id')
    .get(purchaseController.getPurchasesOfUser)

router.route('/datePurchases')
    .get(purchaseController.searchPurchasesByDate);


module.exports = router;
