const supplierService = require('../services/supplier');

const createSupplier = async (req,res) => {
    const newSupplier = await supplierService.createSupplier(req.body.name, req.body.address, req.body.csNumber);
    res.json(newSupplier);
}

const getSuppliers = async(req, res) => {
    const suppliers = await supplierService.getSuppliers();
    res.json(suppliers);
}

const getSupplier = async (req,res) => {
    const supplier = await supplierService.getSupplier(req.params.id);
    if (!supplier)
      return res.status(404).json({errors:['supplier not found']});
    res.json(supplier);
}


const updateSupplier = async(req, res) => {
    if(!req.body.name)
        res.status(400).json({message:'name is required'});
    if(!req.body.address)
        res.status(400).json({message:'address is required'});
    if(!req.body.csNumber)
        res.status(400).json({message:'csNumber is required'});


    const supplier = await supplierService.updateSupplier(req.params.id,req.body.name,req.body.address, req.body.csNumber);
    if (!supplier)
        return res.status(404).json({errors:['supplier not found']});
    res.json(supplier);
}

const deleteSupplier = async (req,res) => {
    const supplier = await supplierService.deleteSupplier(req.params.id);
    if (!supplier)
      return res.status(404).json({errors:['supplier not found']});
    res.json(supplier)
}


module.exports = {
    createSupplier,
    getSupplier,
    getSuppliers,
    updateSupplier,
    deleteSupplier
}
