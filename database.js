var mysql = require('mysql');

var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "filip",
  password: "abc123",
  database: "movie_recommender",
  connectionLimit: 10,
  supportBigNumbers: true
});

// Get records from a city
exports.getSQL = function(sql, callback) {
  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
};