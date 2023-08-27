const Supplier = require('../models/supplier');

const createSupplier = async(name, address, csNumber) =>{
    const supplier = new Supplier(
        {
            name:name,
            address:address,
            csNumber:csNumber
        });

    return await supplier.save();
}

const getSupplier = async(id) => {
    return await Supplier.findById(id);
}

const getSuppliers = async() =>{
    return await Supplier.find({})
}

const updateSupplier = async (id, name, address, csNumber) => {
    const supplier = await getSupplier(id);
    if(!supplier)
        return null;
        supplier.name = name; supplier.address = address; supplier.csNumber = csNumber;
    await supplier.save();
    return supplier;
}

const deleteSupplier = async (id) => {
    const supplier = await getSupplier(id);
    if (!supplier)
        return null;
    await supplier.deleteOne();
    return supplier;
}

module.exports = {
    createSupplier,
    getSupplier,
    getSuppliers,
    updateSupplier,
    deleteSupplier
}