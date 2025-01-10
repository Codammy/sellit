import User from "../models/userSchema.js"
import Store from '../models/storeSchema.js'

export async function createNewUser(req, res, next) {
    console.log(req.body)
    const user = new User(req.body);
    let store;
    try {
        if (user.accountType === 'regular') {
        store = new Store({ownerId: user._id, name: `${user.profile.firstname}'s store`});
        user.stores.push(store._id)
    }
    await user.save();
    await store.save();
    } catch(err) {
        err.status =  (err._message === 'User validation failed'  || err.code === 11000) ? 400 : 500;
        err.message = err.code === 11000 ? `${JSON.stringify(err.keyValue)} already exist` : (err._message || err.message)
        return next(err);
    }
    return res.json({id: user._id, email: user.email});
}

export async function getUserById(req, res, next) {
    try {
        const user = await User.findById(req.params.id).populate('stores', '_id ownerId name upvotes');
        if (!user){
            return res.status(404).json({error: "User not found"})
        }
        const {id, email, profile, addr, social, subscription, stores} = user;
        return res.json({data: {id, email, profile, addr, social, subscription, stores}});
    } catch (err) {
            return next(err)    
        }
}

export function getAuthenticatedUser(req, res, next) {
    return res.json(req.user);
}

export async function updateUser(req, res, next) {
    try {
        const {profile, addr, social} = {...req.body};
        await User.findOneAndUpdate({_id: req.user.id}, {profile, addr, social});
    } catch (error) {
        console.log(error)
                return next(error)
    }
}