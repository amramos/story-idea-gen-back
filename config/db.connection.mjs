import mongoose from "mongoose";
import User from "../models/user.model.mjs";
import Role from "../models/role.model.mjs";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;

db.ROLES = ["user", "admin"];

export default db;