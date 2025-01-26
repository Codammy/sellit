import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import User from "../models/userSchema.js"
import process from "process"
import emailQueue from "./emailQueue.js";
import ejs from "ejs";
import path from "path";
import { __dirname } from "../app.js";


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
        const {id, profile, addr, social, subscription, emailVerified} = user;
        const passwd = user.password;

        if (!emailVerified) return res.status(401).json({error: "Verify email to login"})

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

export async function passwordResetRequest(req, res, next) {
    const {email} = {...req.body}
    if (!email) return res.status(400).json({error: "Email is required"})
    try {
        const user = await  User.findOne({email});
        if (!user) return res.status(400).json({error: "Email not found in db"})
        if (user) {
            user.token = jwt.sign({user}, process.env.SECRET, {expiresIn: 3600})
            emailQueue.add({
                to: user.email,
                subject: "Forgot Password",
                text: "You requested to reset your password",
                html: await ejs.renderFile(path.join(__dirname, "views", "passwordResetVerify.ejs"), {user})
            });
            return res.json({message: "A mail has been sent to your mail to reset your password"});
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
        jwt.verify(token, process.env.SECRET);
        return res.render('passwordReset', {token});
    } catch (err) {
        return next(err)
    }
}

export async function resetPassword(req, res, next) {
    const {password, rPassword, passwordResetToken} = {...req.body};
    if (password !== rPassword) return res.status(400).json({error: 'Confirm password wrong'})

    console.log(req.body)
    try {
        const {user} = jwt.verify(passwordResetToken, process.env.SECRET)
        console.log(user)
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        if (await User.updateOne({email: user.email}, {$set: {password: hashedPassword}})){
            return res.render('passwordResetOk');
        } return res.send('<h1>An error occured</h1>')
    } catch (err) {
        return next(  err  );
    }
}

export async function authenticate(req, res, next) {
    const freeToAir = ['/status', '/login', '/users/new', '/', '/users/reset-password', '/users/request-email-verify', '/users/verify-email', '/users/forgot-password', '/favicon.ico' ]
    if (freeToAir.includes(req.path) || freeToAir.includes(req.path.slice(0, -1)) || req.path.startsWith('/users/password-reset')) return next()
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