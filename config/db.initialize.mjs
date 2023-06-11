import mongoose from "mongoose";
import db from "./db.connection.mjs";
import dbConfig from "./db.config.mjs";

const Role = db.role;

const initializeDB = () => {
    const connectionString = `${dbConfig.HOST}/${dbConfig.DB}`;
    
    console.log(`trying to connect to DB - ${connectionString}`);

    db.mongoose
        .connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log(`Connected to Mongo DB - ${connectionString}`);
            initialize();
        })
        .catch(err => {
            console.error("Connection error", err);
            process.exit();
        });
};

async function initialize() {
    // check whether roles already exist in the DB
    const count = await Role.estimatedDocumentCount();

    // if there aren't any roles, add the two default roles: admin and user
    if (count === 0) {

        const adminRole = { name: "admin" };
        const userRole = { name: "user" };

        let newRole = await new Role(adminRole).save();
        if (newRole) {
            console.log("Added admin role to collection");
        } else {
            console.log("Error creating Admin role");
        };

        newRole = await new Role(userRole).save();
        if (newRole) {
            console.log("Added user role to collection");
        } else {
            console.log("Error creating user role");
        }
    }
    
};

export default initializeDB;