var express = require('express');
var router = express.Router();
const request = require('request');

router.route('/:model')
    .post((req, res, next) => {

        // Send request to the appropriate route depending on the model
        let model = req.params.model;
        let requestBody = {
            url: `http://localhost:5000/movie_recommendation/${model}`,
            body: JSON.stringify(req.body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(requestBody, (error, response, body) => {
            if (error) {
                console.log("Error in recommendmovies.js", error);
                next(error);
                return;
            }
            else {
                // Pass along the response from the model back to the client
                body = JSON.parse(body);
                res.status(body.status).json(body);
                return;
            }
        })
    })

module.exports = router;
