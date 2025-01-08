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

export async function getUserById(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (!user){
            let err = new Error("user not found");
            err.status = 404
            return next(err)
        } 
        return res.json({
            data: {firstName: user.firstname, lastname: user.lastname, email: user.email, city: user.city, state: user.state, address: user.address, pic_url: user.pic_url, about: user.about, phoneNo: user.phoneNo, whatsappNo: user.whatsappNo, facebookUrl: user.facebookUrl, twitterUrl: user.twitterUrl, website: user.website, emailVerified: user.emailVerified, subscription: user.subscription},
})
    } catch (err) {
            err = new Error("user not found");
            err.status = 404
            return next(err)    
        }
}