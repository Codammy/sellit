import Item from '../models/itemSchema.js'
import Store from '../models/storeSchema.js';

export async function getAllItems(req, res, next) {
    const pageSize = 20
    const page = (!req.query.page || parseInt(req.query.page, 10) < 0) ? 0 : parseInt(req.query.page, 10);

    try {
        const items = await Item.aggregate([
            {$match: {}},
            {
                $facet: {
                    metadata: [{$count: 'totalCount'}],
                    data: [{$skip: page * pageSize}, {$limit: pageSize}]
                }
            }
        ]);
        return res.json(items)
    } catch(err) {
       return next(err);
    }
}

export async function getItemById(req, res, next) {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({err: "Item not found"})
        return res.json({data: item})
    } catch(err) {
       return next(err);
    }
}

export async function createItem(req, res, next) {
    if (!req.body.storeId) return res.status(400).json({error: "store id required"})
    const item = new Item(req.body);
    try {
        const store = await Store.findOne({_id: item.storeId});
        if (!store) return res.status(404).json({error: "store not found"})

            console.log(store)
            store.items.push(item._id)
        await store.save()
        await item.save();
        return res.json({data: item})
    } catch(err) {
        console.log(err)
        err.status =  (err._message === 'Item validation failed'  || err.code === 11000) ? 400 : 500;
        err.message = err.code === 11000 ? `${JSON.stringify(err.keyValue)} already exist` : (err._message || err.message)
        return next(err);
    }
}

export async function updateItem(req, res, next) {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) return res.status(404).json({err: "Item not found"})
            await Item.updateOne({_id: req.params.id}, {...req.body})
        return res.json({success: true, message: "Item updated successfully"})
    } catch(err) {
        return next(err);
    }
}

export async function deleteItem(req, res, next) {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) return res.status(404).json({err: "Item not found"})
            await item.deleteOne({_id: req.params.id})
        return res.json({success: true, message: "Item deleted successfully"})
    } catch(err) {
        return next(err);
    }
}