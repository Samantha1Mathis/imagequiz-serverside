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
    //response.json(flowers);
    db.getFlowers()
    .then(flowers => response.json(flowers))
    .catch(e => {console.log(e); response.status(500).send('There was an error in getting the flowers')})
})

app.get('/quizzes', (request, response) => {
    //response.json(quiz);
    db.getQuizzes()
    .then(quizzes => response.json(quizzes))
    .catch(e => {console.log(e); response.status(500).send('There was an error in getting the quizzes')})
})

app.get('/quiz/:id', (request, response) => {
    console.log("here", request.params.id);
    db.getQuiz(request.params.id)
    .then(quiz => response.json(quiz))
    .catch(e => {console.log(e); response.status(500).send(e)})
    /*let id = request.params.id;
    let quizID = quiz[id];
    if (quizID){
        response.json(quizID);
    }else{
        response.status(404).send(`The quiz with id ${id} could not be found.`);
    }*/
})

app.post('/score', (request, response) => {
   let score = request.body.score;
   let name = request.body.username;
    let quizid = request.body.quizID; 
    console.log("HERE!!!");
    //let info = {score: score, username: request.body.username, quizId: request.body.quizID}
    //scores.push(info)
    //response.send(`The Score ${score} was added successfully`);
    db.addScore(name, quizid, score)
    //.then(addressid => db.savePlace(name, addressid))
    .then(() => response.send('The score was added.'))
    .catch(e => {console.log(e); response.status(500).send('There was an error in adding the score.')});

    
  });

   /* db.addScores(request.body.username, request.body.quizID, score)
    .then(scores => response.json(scores))
    .catch(e => {console.log(e); response.status(500).send('There was an error adding the scores')})*/
//})



app.post('/customer', (request, response) => {
    let name = request.body.username;
    let email = request.body.email;
    let password = request.body.password;
    console.log(name, email, password)
    db.addCustomer(name,email,password)
    .then(() =>response.send(`The customer was added successfully 2`))
    .catch(e => response.status(500).send('There was an error in saving the customer'));
});

app.listen(port, () => console.log("Listening on port " + port))