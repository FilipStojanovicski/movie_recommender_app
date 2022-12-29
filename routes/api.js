var express = require('express');
var router = express.Router();
var db = require('../database');

// All other GET requests not handled before will return our React app
router.get('/movies', (req, res, next) => {
    let genre = req.query.genre;
    let limit = req.query.limit;
    console.log(req.query);
    let sql_statement = `
    SELECT * FROM movies LEFT JOIN (
        SELECT movieId, COUNT(*) AS num_ratings 
        FROM ratings
        GROUP BY movieId
        ORDER BY num_ratings DESC) ratings_count
    ON movies.movieId = ratings_count.movieId
    ORDER BY num_ratings DESC
    `

    if (genre && genre !== 'null'){
        sql_statement += ` WHERE movieId IN ( SELECT mg.movieID FROM MOVIES_GENRES mg JOIN genres g ON mg.genreId = g.genreId WHERE genre_name = '${genre}') `
    }
    if (limit && limit !== 'null'){
        sql_statement += ` LIMIT ${limit} `
    }
    
    console.log(genre);
    console.log(sql_statement);

    // res.send("API is working properly");
    db.getSQL(sql_statement, function(err, results) {
        if(err) { 
            next(error);
            return;
        }
        else {
            // Respond with results as JSON
            res.send(results);
        }
      });
});


// All other GET requests not handled before will return our React app
router.get('/genres', (req, res, next) => {
    let sql_statement = "SELECT * FROM genres"

    console.log(sql_statement);

    // res.send("API is working properly");
    db.getSQL(sql_statement, function(err, results) {
        if(err) { 
            next(error);
            return;
        }
        else {
            // Respond with results as JSON
            res.send(results);
        }
      });
});


module.exports = router;
