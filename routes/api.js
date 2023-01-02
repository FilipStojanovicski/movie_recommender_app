var express = require('express');
var router = express.Router();
var db = require('../database');

// API that returns the movies from the database
router.get('/movies', (req, res, next) => {


    let genre = req.query.genre;
    let limit = req.query.limit;


    // Get all the movies as well as their retings count and order by number of ratings
    let sql_statement = `
    SELECT * FROM movies LEFT JOIN (
        SELECT movieId, COUNT(*) AS num_ratings 
        FROM ratings
        GROUP BY movieId
        ORDER BY num_ratings DESC) ratings_count
    ON movies.movieId = ratings_count.movieId
    ORDER BY num_ratings DESC
    `
    
    // Filter by genre if specified
    if (genre && genre !== 'null'){
        sql_statement += ` WHERE movieId IN ( SELECT mg.movieID FROM MOVIES_GENRES mg JOIN genres g ON mg.genreId = g.genreId WHERE genre_name = '${genre}') `
    }
    if (limit && limit !== 'null'){
        sql_statement += ` LIMIT ${limit} `
    }

    db.getSQL(sql_statement, function(err, results) {
        if(err) { 
            console.log("Error in api/movies", error);
            next(error);
            return;
        }
        else {
            res.send(results);
        }
      });
});


// API that returns the genres from the database
router.get('/genres', (req, res, next) => {
    let sql_statement = "SELECT * FROM genres"

    db.getSQL(sql_statement, function(err, results) {
        if(err) { 
            console.log("Error in api/genres", error);
            next(error);
            return;
        }
        else {
            res.send(results);
        }
      });
});

// API that returns the poster_paths for movies from the database
router.post('/movie_imgs', (req, res, next) => {


    let sql_statement = "SELECT * FROM movie_imgs "

    let movieIds = req.body.movieIds;

    if (movieIds && movieIds !== 'null' && movieIds.length > 0){
        sql_statement += ` WHERE movieId IN (${movieIds.join(',')}) `
    }

    db.getSQL(sql_statement, function(err, results) {
        if(err) { 
            console.log("Error in api/movie_imgs", error);
            next(error);
            return;
        }
        else {
            res.send(results);
        }
      });
});


module.exports = router;
