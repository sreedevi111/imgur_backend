const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,

        },
        posts: [
            {
                type: ObjectId,
                ref: "Images",
            }
        ],
        postCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

//creating user model (collection and schema combines to form model)

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;