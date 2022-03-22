const imageModel = require("../models/Imagemodel");
const userModel = require("../models/Usermodel");
const  commentModel = require("../models/commentmodel");


const imageControl = {
    uploadImage: async (req, res) => {
        try {
            const { category, path } = req.body;

            if (!path) {
                return res.status(400).json({ msg: "please provide the path" });
            }

            const newimage = new imageModel({ category, path,user:req.userId });
            await userModel.findByIdAndUpdate(req.userId,
                {
                    $push: { posts: newimage.id },
                    $inc: { postCount: 1 },
                });
            await newimage.save();

            return res.status(200).json({ msg: "image uploaded" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getAllImages: async (req, res) => {
        try {
            const image = await imageModel.find();

            return res.status(200).json({ data: image });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getMyImage: async (req,res)=>{
        try {
            const image = await imageModel.find({user:req.userId})
            return res.status(200).json({ data: image});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getImageById: async (req, res) => {
        try {
            const image = await imageModel.findById(req.params.id);

            if (!image) {
                return res.status(404).json({ msg: "no image with this id found" });
            }
            return res.status(200).json({ data: image });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteImageById: async (req, res) => {
        try {
            const image = await imageModel.findById(req.params.id);

            if (!image) {
                return res.status(404).json({ msg: "no image with this id found" });
            }
            await image.remove();

            return res.status(200).json({ msg: "image deleted" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    toggleLike: async (req, res) => {
        try {
            const image = await imageModel.findById(req.params.id);

            if (!image) {
                return res.status(404).json({ msg: "no image with this id found" });
            }
            if (image.likes.includes(req.userId)) {
                const index = image.likes.indexOf(req.userId);
                image.likes.splice(index, 1);
                image.likeCount = image.likeCount - 1;
                await image.save();
                return res.status(200).json({ msg: "image disliked" });
            } else {
                image.likes.push(req.userId);
                image.likeCount = image.likeCount + 1;
                await image.save();
                return res.status(200).json({ msg: "image liked" });
            }
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    searchByCategory: async (req, res) => {
        try {
            const image = await imageModel.find({ category: req.query.category });
            return res.status(200).json({ data: image });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addComment: async (req, res) => {
        try {
            const image = await imageModel.findById(req.params.id);
            if (!image) {
                return res.status(404).json({ msg: "no image with this id found" });
            }
            const comment = new commentModel({
                user: req.userId,
                image: req.params.id,
                text: req.body.text,
            });
            await comment.save();
            image.comments.push(comment._id);
            image.commentCount = image.commentCount + 1;
            await image.save();
            return res.status(200).json({ msg: "comment added" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteComment: async (req, res) => {
        try {
            const image = await imageModel.findById(req.params.id);
            const comment = await commentModel.findById(req.params.commentId);
            if (!image) {
                return res.status(404).json({ msg: "no image with this id found" });
            }
            if (!comment) {
                return res.status(404).json({ msg: "no comment with this id found" });
            }
            await comment.remove();
            const index = image.comments.indexOf(comment._id);
            image.comments.splice(index, 1);
            image.commentCount = image.commentCount - 1;
            await image.save();
            return res.status(200).json({ msg: "comment deleted" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    editComment: async (req, res) => {
        try {

            const {text}=req.body
            const fieldsToUpdate ={}
            if (text){
                fieldsToUpdate.text =text
            }
            const comment =await commentModel.findByIdAndUpdate(req.params.commentId,{
                $set:{...fieldsToUpdate}
            },{
                new : true
            })
            return res.status(200).json({ msg: "comment edited",data:comment });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = imageControl;


