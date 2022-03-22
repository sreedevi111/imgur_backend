const mongoose =require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const commentSchema = new mongoose.Schema({
        user:{
            type:ObjectId,
            ref:"User"
        },
        image:{
            type:ObjectId,
            ref:"Images"
        },
        text:{
            type:String
        }
    },
    {timestamps:true}
)

const Comment =mongoose.model("Comment",commentSchema)
module.exports = Comment