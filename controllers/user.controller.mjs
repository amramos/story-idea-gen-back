const allAccess = (req, res) => {
    res.status(200).send("Public content");
};

const userBoard = (req, res) => {
    res.status(200).send("User content");
};

const adminBoard = (req, res) => {
    res.status(200).send("Admin content");
};

const userController = {
    allAccess,
    userBoard,
    adminBoard,
};

export default userController;