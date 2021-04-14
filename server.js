const express = require('express');
const flowers = require('./flowers');
const quiz = require('./data');
const app = express();
const port = process.env.PORT || 4002;

app.use(express.json());

let scores = [];

app.get('/', (request, response) =>{
    response.send(`Hello World`);
})

app.get('/flowers', (request, response) => {
    response.json(flowers);
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
        response.status(404).send(`The quiz with id ${id} could not be found.`);
    }
})

app.post('/score', (request, response) => {
    let score = request.body.score;
    let info = {score: score, username: request.body.username, quizId: request.body.quizID}
    scores.push(info)
    response.send(`The Score ${score} was added successfully`);
})

app.listen(port, () => console.log("Listening on port " + port))