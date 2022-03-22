const imageControl = require("../controllers/Imagectrl");
const verifyToken = require("../middleware/auth");




const imageRouter = (app) => {
    app.post("/image", verifyToken, imageControl.uploadImage);
    app.get("/image",verifyToken,imageControl.getAllImages)
    app.get("/myimage",verifyToken,imageControl.getMyImage)
    app.get("/image/:id",verifyToken,imageControl.getImageById)
    app.delete("/image/:id",verifyToken,imageControl.deleteImageById)
    app.get("/image/:id/like",verifyToken,imageControl.toggleLike)
    app.get("/images",verifyToken,imageControl.searchByCategory)
    app.post("/image/:id/comment",verifyToken,imageControl.addComment)
    app.delete("/image/:id/comment/:commentId",verifyToken,imageControl.deleteComment)
    app.put("/image/:id/comment/:commentId",verifyToken,imageControl.editComment)
};

module.exports = imageRouter;