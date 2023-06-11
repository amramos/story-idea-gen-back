import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.mjs";
import db from "../config/db.connection.mjs";

const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(403).send({ message: "No token provided." });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Unauthorized" });
        }

        req.userId = decoded.id;
        next();
    })
};

const isUserAdmin = async (req, res, next) => {
    const loggedUser = await User.findById(req.userId);

    if (!loggedUser) {
        res.status(500).send({ message: `User not found - ${req.userId}`});
        return;
    }

    const roleFilter = {
        _id: { $in: loggedUser.roles },
        name: "admin"
    };

    const role = await Role.findOne(roleFilter);

    if (!role) {
        res.status(403).send({ message: "Admin role required" });
        return;
    };

    next();
};

const authJwt = {
    verifyToken,
    isUserAdmin
};

export default authJwt;