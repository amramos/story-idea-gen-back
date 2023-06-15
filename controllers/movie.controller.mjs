import { Movie, User } from "../models/models.mjs";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const reqMovies = axios.create({
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.THEMOVIEDBKEYBEARER
    }
});

const add = async (req, res) => {
    
    const parameters = req.body;

    console.log(`trying to add movie ${parameters.movieId} to user ${parameters.username}`);

    // get all movies associated with this user
    const loggedUser = await User.findOne({ username: parameters.username });

    var url = ['https://api.themoviedb.org/3/movie/', parameters.movieId || 11].join('');

    var response = await reqMovies.get(url);

    var movie = response.data;

    const movieAlreadyAdded = await Movie.findOne({userID: loggedUser._id, id: movie.id});

    if (movieAlreadyAdded) {
        res.status(500).send({errorMessage: "This movie is already in the user's list"});
        return;
    }

    const newMovie = new Movie({
        name: movie.original_title,
        releaseDate: movie.release_date,
        id: movie.id,
        userID: loggedUser._id || "",
        watched: false,
    });

    newMovie.save()
        .then((savedMovie) => {
            res.status(200).send(savedMovie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error inserting movie");
        });
};

const remove = async (req, res) => {
    
    const parameters = req.body;

    console.log(`trying to removie movie ${parameters.movieId} from user ${parameters.username}`);

    // get all movies associated with this user
    const loggedUser = await User.findOne({ username: parameters.username });

    var url = ['https://api.themoviedb.org/3/movie/', parameters.movieId || 11].join('');

    var response = await reqMovies.get(url);

    var movie = response.data;

    const movieAlreadyAdded = await Movie.findOne({userID: loggedUser._id, id: movie.id});

    if (movieAlreadyAdded) {
        Movie.deleteOne({userID: loggedUser._id, id: movie.id})
            .then((deletedMovie) => {
                res.status(200).send(deletedMovie);
            })
            .catch((err) => {
                res.status(500).send("Error deleting movie");
            });
    }
};

const getAll = async (req, res) => {
    const parameters = req.body;
    
    //console.log(`username: ${parameters.username}`);

    let filter = {};
    if (!parameters.username) {
        filter = {}
    } else {
        const loggedUser = await User.findOne({ username: parameters.username });
        filter = { userID: loggedUser._id };
    }

    const userMovies = await Movie.find(filter);

    var moviesList = [];
    
    for await (const movie of userMovies) {
        var url = ['https://api.themoviedb.org/3/movie/', movie.id || 11].join('')
        
        var response = await reqMovies.get(url);
        response.data.userID = movie.userID;
        moviesList.push(response.data);
    }

    res.status(200).send(moviesList);
}

const movieController = {
    add,
    remove,
    getAll,
};

export default movieController;