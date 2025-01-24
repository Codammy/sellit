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

export async function passwordResetRequest(req, res) {
    const {email, password, rPassword } = {...req.body}
    try {
        const user = await  User.findOne({email});
        if (user) {
            return res.json({"password-reset-token": jwt.sign(user.email, process.env.SECRET, {expiresIn: 3600})});
            // job to send email
        }
    } catch (err){
        return next(err)
    }
    return res.json({error: "Email not found!"})
}

export async function resetPasswordPage(req, res, next) {
    const {token} = {...req.params};
    console.log(token)
    try {
        // jwt.verify(token, process.env.SECRET);
        return res.render('passwordReset', {token});
    } catch (err) {
        return next(err)
    }
}

export async function resetPassword(req, res, next) {
    const {password, rPassowrd, passwordResetToken} = {...req.body};
    if (password !== rPassword) return res.status(400).json({error: 'Confirm password wrong'})

    console.log(req.body)
    try {
        // const data = jwt.verify(passwordResetToken, process.env.SECRET)
        // await User.updateOne({email: data.email}, {$set: {password: password}})
        return res.render('passwordResetOk')
    } catch (err) {
        return next(err);
    }
}

export async function authenticate(req, res, next) {
    const freeToAir = ['/status', '/login', '/users/new', '/', '/users/reset_password', '/favicon.ico' ]
    if (freeToAir.includes(req.path) || req.path.startsWith('/users/password_reset/')) return next()
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