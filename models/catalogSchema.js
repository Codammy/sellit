import mongoose from "mongoose";

const catalogSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    item: {type: mongoose.Types.ObjectId, ref: 'Item'}
}, {timestamps: true})

const Catalog = mongoose.model('Catalog', catalogSchema)

Catalog.syncIndexes().catch((err)=> {throw new Error(err)});

export default Catalog;