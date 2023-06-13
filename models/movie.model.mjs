import mongoose from "mongoose";

const Movie = mongoose.model(
    "Movie",
    new mongoose.Schema({
        name: String,
        releaseDate: String,
        id: Number,
        userID: String,
        watched: Boolean,
    })
);

export default Movie;