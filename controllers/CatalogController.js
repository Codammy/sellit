import User from '../models/userSchema.js'
import Item from '../models/itemSchema.js'

export async function getAllCatalogs(req, res, next) {
    try {
        const user = await User.findOne({_id: req.query.userId}).populate('catalog');
        console.log(user)
        if (!user) return res.status(400).json({error: "User Id not found"})
        return res.json({data: user.catalog})
    } catch(err) {
       return next(err);
    }
}

export async function createCatalog(req, res, next) {
        const user = await User.findOne({_id: req.user.id});
        const item = await Item.findById(req.body.itemId);
        if (!item) return res.status(404).json({err: "Item not found"})
        user.catalog.push(req.body.itemId)
    try {
        await user.save();
        return res.json({message: "Item added successfully", success: true})
    } catch(err) {
        err.status =  (err._message === 'Catalog validation failed'  || err.code === 11000) ? 400 : 500;
        err.message = err.code === 11000 ? `${JSON.stringify(err.keyValue)} already exist` : (err._message || err.message)
        return next(err);
    }
}

export async function removeFromCatalog(req, res, next) {
    try {
        const user = await User.findOne({_id: req.user.id});
        user.catalog = user.catalog.filter((item)=> item.toString() !== req.params.id)
        await user.save()
        return res.json({success: true, message: "Catalog deleted successfully"})
    } catch(err) {
        return next(err);
    }
}