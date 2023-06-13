import mongoose from "mongoose";
import User from "../models/user.model.mjs";
import Role from "../models/role.model.mjs";
import Movie from "../models/movie.model.mjs";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;
db.movie = Movie;

db.ROLES = ["user", "admin"];

export default db;