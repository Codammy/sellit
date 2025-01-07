import User from "../models/userSchema.js"

export async function createNewUser(req, res, next) {
    const user = new User(req.body);
    try {
       await user.save();
    } catch(err) {
        err.status =  (err._message === 'users validation failed'  || err.code === 11000) ? 400 : 500;
        err.message = err.code === 11000 ? `${JSON.stringify(err.keyValue)} already exist` : (err._message || err.message)
        return next(err);
    }
    
    return res.json({id: user._id, email: user.email});
}