import authConfig from "../config/auth.config.mjs";
import db from "../config/db.connection.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = db.user;
const Role = db.role;

const signup = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    const rolesFilter = {
        name: { $in: req.body.roles }
    }
    
    var roles = await Role.find(rolesFilter);
    
    if (!roles) {
        roles = await Role.findOne({ name: "user" });
        console.log(`No role specified for new user ${req.body.username}. Role "Admin" assigned by default`);
    };

    newUser.roles = roles.map(role => role._id);

    newUser.save()
        .catch((err) => {
            res.status(500).send({ message: `Error creating user ${req.body.username} - ${err}` });
            return;
        });
    
    res.status(200).send({message: `User ${req.body.username} created`});
};

const signin = async (req, res) => {
    const existingUser = await User.findOne({ username: req.body.username }).populate("roles", "-__v");

    if (!existingUser) {
        res.status(404).send({ message: `User ${req.body.username} not found`});
        return;
    }

    var isPasswordValid = bcrypt.compareSync(
        req.body.password,
        existingUser.password
    );

    if (!isPasswordValid) {
        res.status(401).send({
            accessToken: null,
            message: "Invalid password"
        });
        return;
    }

    const token = jwt.sign({ id: existingUser._id }, authConfig.secret, { expiresIn: 86400 });

    var authorities = [];

    for (let i = 0; i < existingUser.roles.length; i++) {
        authorities.push("ROLE_" + existingUser.roles[i].name.toUpperCase());
    };

    res.status(200).send({
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        roles: authorities,
        accessToken: token
    });
};

const authController = {
    signin,
    signup,
}

export default authController;