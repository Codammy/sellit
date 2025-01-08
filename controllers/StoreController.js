import Store from '../models/storeSchema.js'

export async function getAllStores(req, res, next) {
    try {
        const stores = await Store.find();
        return res.json({data: stores})
    } catch(err) {
       return next(err);
    }
}

export async function getStoreById(req, res, next) {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) return res.status(404).json({err: "Store not found"})
        return res.json({data: store})
    } catch(err) {
       return next(err);
    }
}

export async function createStore(req, res, next) {
    const store = new Store(req.body);
    store.owner = req.user.id;
    try {
        await store.save();
        return res.json({data: store})
    } catch(err) {
        err.status =  (err._message === 'Store validation failed'  || err.code === 11000) ? 400 : 500;
        err.message = err.code === 11000 ? `${JSON.stringify(err.keyValue)} already exist` : (err._message || err.message)
        return next(err);
    }
}

export async function updateStore(req, res, next) {
    try {
        const store = await Store.findById(req.params.id)
        if (!store) return res.status(404).json({err: "Store not found"})
            await Store.updateOne({_id: req.params.id}, {...req.body})
        return res.json({success: true, message: "Store updated successfully"})
    } catch(err) {
        return next(err);
    }
}

export async function deleteStore(req, res, next) {
    try {
        const store = await Store.findById(req.params.id)
        if (!store) return res.status(404).json({err: "Store not found"})
            await Store.deleteOne({_id: req.params.id})
        return res.json({success: true, message: "Store deleted successfully"})
    } catch(err) {
        return next(err);
    }
}