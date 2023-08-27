const purchaseService = require('../services/purchase');

const createPurchase = async (req,res) => {
    const newPurchase = await purchaseService.createPurchase(req.body.gamesId, req.body.userId, req.body.totalPrice, req.body.date);
    res.json(newPurchase)
}

const searchPurchasesByDate = async(req, res) => {
    const purchases = await purchaseService.searchPurchasesByDate(req.body.date);
    res.json(purchases);
}

const getPurchaseById = async (req, res) => {
    const purchase = await purchaseService.getPurchaseById(req.params.id);
    res.json(purchase);
}

const getPurchasesOfUser = async(req, res) => {
    const userPurchases = await purchaseService.getPurchasesOfUser(req.params.id);
    res.json(userPurchases);
}

const getAllPurchases = async(req, res) => {
    const purchases = await purchaseService.getAllPurchases();
    res.json(purchases);
}


module.exports = {
createPurchase,
searchPurchasesByDate,
getPurchaseById,
getPurchasesOfUser, 
getAllPurchases
}