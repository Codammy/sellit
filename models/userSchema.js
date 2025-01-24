import  mongoose, {Schema, model} from "mongoose"
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
    address: {
        city: String,
        state: String,
        addr: String,
    },
    socials: {
        whatsappNo: {type: String, maxLength: 14},
        pic_url: String,
        facebookUrl: String,
        twitterUrl: String,
        website: String,
    },
    emailVerified: Boolean,
    subscription: {type: String, enum: ['paid', 'free'], default: 'free'},
    catalog: {type: [mongoose.Types.ObjectId], ref: 'Item'},
    accountType: {type: String, enum: ['regular', 'promoter', 'admin'], default: 'regular'},
    stores: {type: [Schema.Types.ObjectId], ref: 'Store'}
}, {timestamps: true});

userSchema.pre('save', function(next) {
    const user = this
    console.log("got here")
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, result)=> {
        if (err) return next(err)
        bcrypt.hash(user.password, result, function(err, hash){
        if (err) return next(err);
            user.password = hash;
            next();
        });
    })
})

userSchema.statics.findAllPaginated = async function () {
    
}

const User = model('User', userSchema);
User.syncIndexes().catch((err)=> {throw new Error(err)});
export default User;