## Movie Recommendation Server

The Back End Server renders the web pages and provides the interface that interacts between the Front End Application, the Database and the Model API.

A database was created from the movies dataset with a table for the movies, genres, users and ratings. 
An additional movie_imgs table was created with all of the movie images pulled from <a href="https://www.themoviedb.org/">TMDB</a> 
as well as a movie_genres table. 

The backend server is built with Node Express. 

It has routes for api/movies, api/genres and api/movie_imgs which pass the data from the database to the application. 

It also has a /movie_recommendation route that passes the inputted ratings from the application to the Recommendation Model API and returns the predicted movies.
