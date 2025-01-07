import User from "../models/userSchema.js"

export function createNewUser(req, res) {
    const user = new User(req.body);
    try {
        user.save();
    } catch(err) {
        throw new Error;
    }
}