var express = require('express');
var router = express.Router();
const request = require('request');

router.route('/')
    .post((req, res, next) => {
        console.log("reached movie recommendation post route in js")
        console.log(req.body);
        let requestBody = {
            url: 'http://localhost:5000/movie_recommendation',
            body: JSON.stringify(req.body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(requestBody, (error, response, body) => {
            if (error) {
                console.log(error);
                next(error);
                return;
            }
            else {
                body = JSON.parse(body);
                res.status(200).json(body);
                return;
            }
        })
    })
    .get((req, res, next) => {
        console.log("reached movie recommendation get route in js")
        res.send("GET REQUEST RECEIVED");
    })

module.exports = router;
