import User from "../models/userSchema.js"

export async function createNewUser(req, res, next) {
    const user = new User(req.body);
    try {
       await user.save();
    } catch(err) {
        err.status =  (err._message === 'users validation failed'  || err.code === 11000) ? 400 : 500;
        err.message = err.code === 11000 ? `${JSON.stringify(err.keyValue)} already exist` : (err._message || err.message)
        console.log(err)
        return next(err);
    }

    return res.json({id: user._id, email: user.email});
}

export async function getUserById(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (!user){
            let err = new Error("user not found");
            err.status = 404
            return next(err)
        }
        const {id, email, profile, addr, social, subscription} = user;
        return res.json({data: {id, email, profile, addr, social, subscription}});
    } catch (err) {
            err = new Error("user not found");
            err.status = 404
            return next(err)    
        }
}

export function getAuthenticatedUser(req, res, next) {
    return res.json(req.user);
}

export async function updateUser(req, res, next) {
    try {
        const {profile, addr, social} = {...req.body};
        console.log(profile)
        await User.findOneAndUpdate({_id: req.user.id}, {profile: profile, addr: addr, social: social});
        return res.json({success: true})
    } catch (error) {
        console.log(error)
                return next(error)
    }
}