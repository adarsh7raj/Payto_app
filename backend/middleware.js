const jwt = require("jsonwebtoken");
const jwt_password = require("./config");

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ msg: "No token provided" });
    }

    try {
        const data = jwt.verify(token, jwt_password);
        req.user_id = data.user_id;
        console.log(data.user_id);
        next();
    } catch (err) {
        res.status(403).json({ msg: "Invalid token" });
    }
}

module.exports = authMiddleware;
