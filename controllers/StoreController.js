import Store from '../models/storeSchema.js'
import User from '../models/userSchema.js'

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
        const store = await Store.findById(req.params.id).populate('items');
        if (!store) return res.status(404).json({err: "Store not found"})
        return res.json({data: store})
    } catch(err) {
       return next(err);
    }
}

export async function createStore(req, res, next) {
        try {
        const store = new Store({...req.body, ownerId: req.user.id});
        const user = await User.findOne({_id: req.user.id});

        console.log(user.subscription, user.stores.length)
        if (user.subscription === 'free' && (user.stores.length > 0)) {
            return res.status(400).json({error: "upgrade account to PAID plan to continue"})
        }

        user.stores.push(store._id)
        await store.save();
        await user.save();

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
        const user = await User.findOne({_id: store.ownerId});
        user.stores = user.stores.filter((store)=> store !== req.params.id)
        await Store.deleteOne({_id: req.params.id})
        await user.save()
        return res.json({success: true, message: "Store deleted successfully"})
    } catch(err) {
        return next(err);
    }
}