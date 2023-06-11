import db from "../config/db.connection.mjs";

const User = db.user;
const ROLES = db.ROLES;

const checkDuplicateUserOrEmail = async (req, res, next) => {
    let filter = {
        username: req.body.username
    };

    let users = await User.findOne(filter);
    if (users) {
        res.status(400).send({ message: `Username ${req.body.username} is already in use` });
        return;
    };

    filter = {
        email: req.body.email
    };
    
    users = await User.findOne(filter);
    if (users) {
        res.status(400).send({ message: "Email is already in use" });
        return;
    };

    next();
};

const checkRole = async (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({ message: `Invalid role (${req.body.roles[i]})` });
            };
        }
    };

    next();
};

const verifySignup = {
    checkDuplicateUserOrEmail,
    checkRole
}

export default verifySignup;