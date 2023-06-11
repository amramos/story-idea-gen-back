import "./loadEnvironment.mjs";

const authConfig = {
    secret: process.env.SECRETKEY || "key1230p9!",
}

export default authConfig;