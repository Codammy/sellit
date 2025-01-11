import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import User from "../models/userSchema.js"
import process from "process"

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

        const {id, profile, addr, social, subscription} = user;
        const passwd = user.password;

        if (!await bcrypt.compare(password, passwd)) {
            const err = new Error('Password incorrect');
            err.status = 401
            return next(err)
        }
        const token = jwt.sign({id, email, ...profile, subscription}, process.env.SECRET, {expiresIn: 3600});
        // res.header({Authorization: `Bearer ${token}`})
        return res.json({data: {id, email, profile, addr, social, subscription, token}});
    } catch(err) {
        return next(err);
    }
}

export async function authenticate(req, res, next) {
    const freeToAir = ['/status', '/login', '/users/new', '/']
    if (freeToAir.includes(req.path)) return next()
    const {authorization} = {...req.headers}
    if (!authorization) return res.status(401).json({error: "Invalid authentication"})
    const [bearer, token] = authorization.trim(' ').split(' ')
    if (!bearer || !token) return res.status(401).json({error: "Invalid authentication"})

        try {
            const user =  jwt.verify(token, process.env.SECRET);
            req.user = user;
            return next()
        } catch(err) {
            return res.status(401).json({error: "Invalid authentication"})
        }

}