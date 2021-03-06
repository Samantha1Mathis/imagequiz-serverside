require('dotenv').config();
const {Pool} = require('pg');

let host = process.env.host;
let database = process.env.database
let port = process.env.port;
let username = 'fzxlgjrdkoalrm'; //need to switch to actual database unsername
let password = process.env.password;

let connectionString = `postgre://${username}:${password}@${host}:${port}/${database}`

let connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl : {rejectUnauthorized: false}
};

const pool = new Pool(connection);

let getQuizzes = () => {
    let sql = `select * from imagequiz.questions q`
    return pool.query(sql)
    .then(result => result.rows);
}

let getFlowers = () => {
    let sql = `select * from imagequiz.flowers f`
    return pool.query(sql)
    .then(result => result.rows);
}

let getScores = () => {
    let sql = `select * from imagequiz.scores s`
    return pool.query(sql)
    .then(result => result.rows);
}

let addScore = (username, quizid, score) => {
    return pool.query('insert into imagequiz.scores(cutomerid, quizid, score) values((select id from imagequiz.customers where username = $1), $2, $3)', [username, quizid, score])
    .then(() => console.log('The score was saved.'))
    .catch(e => console.log(e));
}

let getQuiz = (quiznumber) => {
    let sql = `select q.quiznumber, json_agg (json_build_object('flower', f.picture, 'choices', choices, 'answer', answer))
    from imagequiz.quizzes q
    inner join imagequiz.questions p on q.questionid = p.id 
    inner join imagequiz.flowers f on p.flowerid = f.id
    where q.quiznumber = $1 group by q.quiznumber`;
    return pool.query(sql, [quiznumber])
    .then(result => result.rows);
}

let addCustomer = (name, email, password) => {
    return pool.query('insert into imagequiz.customers(username, email, password) values ($1, $2, $3)', [name, email, password])
    .then(() => console.log('The customer was saved.'))
    .catch(e => console.log(e));
}


module.exports = {getQuizzes, getQuiz, getFlowers, getScores, addScore, addCustomer}
