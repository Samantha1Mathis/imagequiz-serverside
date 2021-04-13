const express = require('express');
const flower = require("flowers.js");
const quizzes = require("quizzes.js");

const app = express();
const port = process.env.PORT || 4002;

app.use(express.json());

let scores = [];
let quiz = quizzes.generateQuizzes();
app.get('/flowers', (request, response) => {
    response.json(flower);
})

app.get('/quizzes', (request, response) => {
    response.json(quiz);
})

app.get('/quiz/:id', (request, response) => {
    let id = request.params.id;
    let quizID = quiz[id];
    if (quizID){
        response.json(quizID);
    }else{
        response.status(404).send(`The quiz with id ${id} count not be found.`);
    }
})

app.post('/score', (request, response) => {
    let score = request.body.score;
    scores.push(score)
    response.send(`The Score ${score} was added successfully`);
})

app.listen(port, () => console.log("Listening on port " + port))