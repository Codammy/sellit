import  {Schema, model} from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    profile: {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        about: String,
        phoneNo: {type: String, maxLength: 14},
    },
    ratings: {type: Number, default: 0},
    password: {type: String, required: true},
    addr: {
        city: String,
        state: String,
        address: String,
    },
    social: {
        whatsappNo: {type: String, maxLength: 14},
        pic_url: String,
        facebookUrl: String,
        twitterUrl: String,
        website: String,
    },
    emailVerified: Boolean,
    subscription: {type: String, enum: ['paid', 'free'], default: 'free'}
}, {timestamps: true});

userSchema.pre('save', function(next) {
    const user = this
    bcrypt.genSalt(10, (err, result)=> {
        if (err) return next(err)
        bcrypt.hash(user.password, result, function(err, hash){
        if (err) return next(err);
            user.password = hash;
            next()
        });
    })
})

const User = model('users', userSchema);
User.syncIndexes().catch((err)=> {throw new Error(err)});
export default User;