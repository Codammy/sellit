import mongoose from "mongoose"

export default async function connectMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/sellit')
    } catch (err){
        throw new Error(err);
    }
}