import  {Schema, model} from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    ratings: {type: Number, required: true},
    city: String,
    state: String,
    address: String,
    pic_url: String,
    about: String,
    phoneNo: {type: String, maxLength: 14},
    whatsappNo: {type: String, maxLength: 14},
    facebookUrl: String,
    twitterUrl: String,
    website: String,
    emailVerified: Boolean,
    subscription: {type: String, enum: ['paid', 'free']}
}, {timestamps: true});

userSchema.pre('save', function() {
        bcrypt.hash(this._password, 10, function(err, result){
            if (err) throw new Error(err);
            this._password = result;
        })
})

const User = model('users', userSchema);
export default User;