import mongoose, {Schema} from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        username : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true //ye use karte hai taki agar hame user name seraching mai use karna hai toh
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            // index: true //ye use karte hai taki agar hame user name seraching mai use karna hai toh
        },
        // fullname : {
        //     type: String,
        //     // required: true,
        //     // unique: true,
        //     // lowercase: true,
        //     trim: true,
        //     index: true //ye use karte hai taki agar hame user name seraching mai use karna hai toh
        // },
        // avatar : {
        //     type: String,  //cloudinary
        //     // required: true,
        //     // unique: true,
        //     // lowercase: true,
        //     // trim: true,
        //     // index: true //ye use karte hai taki agar hame user name seraching mai use karna hai toh
        // },
        // coverImage : {
        //     type :String,
        // },

        // watchHistory: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "Video"
        //     }
        // ],

        password: {
            type: String,
            required : [true,'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)


//ye middle ware hai jo password ko hash kaarega bycrypt karega save karne se pehle
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); //password chnage nhi hua hia toh next pe jao
    //warna pehele password update karo phir next pe jao
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


//password check karega
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)  //ye user ke dale hue pass aur saved pass ko check karta hai
}

//tokens
//ye sab kuch mongodb se milega
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            // fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//REFRESHTOKEN KE BARE MAI
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)