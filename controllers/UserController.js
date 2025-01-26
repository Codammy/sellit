import User from "../models/userSchema.js"
import Store from '../models/storeSchema.js'
import ejs from 'ejs';
import emailQueue from "./emailQueue.js";
import { redisClient } from '../bin/www';
import path from 'path'
import { __dirname } from "../app.js";

export async function createNewUser(req, res, next) {
    const {email, password, profile} = {...req.body};

    const user = new User(req.body);
    let store;
    try {
        if (user.accountType === 'regular') {
        store = new Store({ownerId: user._id, name: `${user.profile.firstname}'s store`});
        user.stores.push(store._id)
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    redisClient.set("otp_" + user.email, otp)
    redisClient.expire("otp_" + user.email, 60 * 10);

    emailQueue.add({
        to: user.email,
        subject: "Verify email",
        text: "Verify your email address",
        html: ejs.renderFile(
            path.join(__dirname, "views", "activateAccount.ejs"),
            {user, otp}
        )
    })

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

export function getAuthenticatedUser(req, res) {
    return res.json(req.user);
}

export async function updateUser(req, res, next) {
    try {
        const {profile, addr, social} = {...req.body};
        if (!profile || !addr || !social) return res.status(400).json({error: "Bad Request"})
        await User.findOneAndUpdate({_id: req.user.id}, {profile, addr, social});
        return res.json({data: {profile, addr, social}})
    } catch (error) {
        console.log(error)
        return next(error)
    }
}

export async function verifyEmail(req, res) {
    const {otp, email} = {...req.body}
    if (!otp) return res.status(400).json({error :"Otp Required"});
    if (!email) return res.status(400).json({error :"Email Required"});
    if (await redisClient.get("otp_" + email) === otp) {
        await User.updateOne({email}, {emailVerified: true})
        console.log(`User ${email} mail verified`)
        return res.json({message: `User ${email} mail verified`})
    }
    return res.status(400).json({error: "Invalid otp or user doesn't exist"})

}
export async function requestEmailVerify(req, res) {
    const {email} = {...req.body}
    if (!email) return res.status(400).json({error :"Email Required"});
    const user = await User.findOne({email})
    if (!user) return res.status(404).json({error: "User with email not found"})
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    redisClient.set("otp_" + user.email, otp)
    redisClient.expire("otp_" + user.email, 60 * 10);

    emailQueue.add({
         to: user.email,
        subject: "Verify email",
        text: "Verify your email address",
        html: await ejs.renderFile(
        path.join(__dirname, "views", "activateAccount.ejs"),
            {user, otp}
        )
    })

    return res.json({message: `Otp sent to ${email}`})
}