import Catalog from '../models/catalogSchema.js'

export async function getAllCatalogs(req, res, next) {
    try {
        const catalogs = await Catalog.find();
        return res.json({data: catalogs})
    } catch(err) {
       return next(err);
    }
}

export async function getCatalogById(req, res, next) {
    try {
        const catalog = await Catalog.findById(req.params.id).populate('items');
        if (!catalog) return res.status(404).json({err: "Catalog not found"})
        return res.json({data: catalog})
    } catch(err) {
       return next(err);
    }
}

export async function createCatalog(req, res, next) {
    const catalog = new Catalog({...req.body, userId: req.user.id});
    try {
        await catalog.save();
        return res.json({data: catalog})
    } catch(err) {
        err.status =  (err._message === 'Catalog validation failed'  || err.code === 11000) ? 400 : 500;
        err.message = err.code === 11000 ? `${JSON.stringify(err.keyValue)} already exist` : (err._message || err.message)
        return next(err);
    }
}

export async function deleteCatalog(req, res, next) {
    try {
        const catalog = await Catalog.findById(req.params.id)
        if (!catalog) return res.status(404).json({err: "Catalog not found"})
            await catalog.deleteOne({_id: req.params.id})
        return res.json({success: true, message: "Catalog deleted successfully"})
    } catch(err) {
        return next(err);
    }
}