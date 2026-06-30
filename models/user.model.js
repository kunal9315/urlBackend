import mongoose from "mongoose"

let userSchema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    myUrls:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"url",
        default:[]
    }
},{timestamps:true})

const User = mongoose.model("user",userSchema)
export default User