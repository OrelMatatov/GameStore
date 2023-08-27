const Purchase = require('../models/purchase')

const createPurchase = async (gamesId, userId, totalPrice, date) => {
    const purchase = new Purchase({
        gamesId: gamesId,
        userId: userId,
        totalPrice: totalPrice,
        date: date
    })

    return await purchase.save();
}

const searchPurchasesByDate = async(date) => {
    return await Purchase.find({date:date});
}

const getPurchaseById = async(id) => {
    return await Purchase.findById(id);
}

const getPurchasesOfUser = async(userId) => {
    return await Purchase.find({userId: userId});
}

const getAllPurchases = async () => {
    return await Purchase.find({});
}

module.exports = {
createPurchase,
searchPurchasesByDate,
getPurchaseById,
getPurchasesOfUser,
getAllPurchases
}