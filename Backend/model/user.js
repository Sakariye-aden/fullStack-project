import mongoose from "mongoose";
import bcrypty from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name : String ,
    email : {type: String, unique: true},
    password: String,
    role : {
        type: String,
        enum : ['user', 'admin'],
        default: 'user'
    },
    profile: String
})

// hash password
userSchema.pre('save', async function(next){
   
    if(!this.isModified('password')) return next();

    const salt = await bcrypty.genSalt(10)
     this.password = await bcrypty.hash(this.password, salt);

})

userSchema.methods.comparePassword = function(inputPassword){
    return bcrypty.compare(inputPassword, this.password)
}

const User = mongoose.model('users',userSchema)

export default User;