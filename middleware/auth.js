const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(401).json({ msg: "invalid authentication" });
        }
        jwt.verify(token, "this_is_secret", (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: "invalid authentication" });
            }
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
module.exports = verifyToken;