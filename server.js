const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4002;
const db = require('./db');


app.use(express.json());
app.use(cors());

//let scores = [];

app.get('/', (request, response) =>{
    response.send(`Welcome to Imagequiz-Serverside`);
})

app.get('/flowers', (request, response) => {
    db.getFlowers()
    .then(flowers => response.json(flowers))
    .catch(e => {console.log(e); response.status(500).send('There was an error in getting the flowers')})
})

app.get('/quizzes', (request, response) => {
    db.getQuizzes()
    .then(quizzes => response.json(quizzes))
    .catch(e => {console.log(e); response.status(500).send('There was an error in getting the quizzes')})
})

app.get('/quiz/:id', (request, response) => {
    console.log("here", request.params.id);
    db.getQuiz(request.params.id)
    .then(quiz => response.json(quiz))
    .catch(e => {console.log(e); response.status(500).send(e)})

})

app.post('/score', (request, response) => {
   let score = request.body.score;
   let name = request.body.username;
    let quizid = request.body.quizID; 

    db.addScore(name, quizid, score)
    .then(() => response.send('The score was added.'))
    .catch(e => {console.log(e); response.status(500).send('There was an error in adding the score.')});

    
  });


app.post('/customer', (request, response) => {
    let name = request.body.username;
    let email = request.body.email;
    let password = request.body.password;
    db.addCustomer(name, email, password)
    .then(() =>response.send(`The customer was added successfully ${request.body}, ${email}, ${request.body.username}, ${password}`))
    .catch(e => response.status(500).send('There was an error in adding the customer'));
});

app.listen(port, () => console.log("Listening on port " + port))