import "./loadEnvironment.mjs";

const dbconfig = {
    HOST: process.env.DB_URI || "mongodb://localhost:27017",
    DB: process.env.DB_NAME || "story-gen",
}

export default dbconfig;