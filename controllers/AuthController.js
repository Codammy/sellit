import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import User from "../models/userSchema.js"

export default async function login(req, res, next) {
    const {email, password} = {...req.body}
    if (!email) return res.json({error: "Email required"});
    if (!password) return res.json({error: "Password required"});
    try {
        const user = await User.findOne({email})
        if (!user) {
            const err = new Error("Email not found");
            err.status = 404
            return next(err);
        }

        const {profile, addr, social, subscription} = user;
        const passwd = user.password;

        if (!await bcrypt.compare(password, passwd)) {
            const err = new Error('Password incorrect');
            err.status = 400
            return next(err)
        }
        const token = jwt.sign({email, ...profile}, process.env.SECRET, {expiresIn: 3600});
        // res.header({Authorization: `Bearer ${token}`})
        return res.json({data: {email, profile, addr, social, subscription, token}});
    } catch(err) {
        return next(err);
    }
}

export async function authenticateUser(req, res, next) {
    
}