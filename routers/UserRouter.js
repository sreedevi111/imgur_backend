const userCtrl = require("../controllers/UserCtrl");

const router = (app) => {
    app.post("/register", userCtrl.register);
    app.post("/login", userCtrl.login);
};

module.exports = router;