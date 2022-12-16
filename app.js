require('dotenv').config()

const express = require('express')    // Import exrepss, a light-weight framework
const app = express()                 // Init exrpess, and save it in "app" variable
const mongoose = require('mongoose')  // Import mongoose, a tool that gives NoSQL DB  (such as MongoDB) the abilities of a relational DB
const helmet = require('helmet')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 5000;

console.log(process.env);

//const bodyParser = require("body-parser")
//app.use(bodyParser.json());

//middleware
app.use(helmet());          // Increaed protection through headers
app.use(cors());            // Allows cross origin requests
app.use(express.json());    // Formats data to Json


const postRouter = require('./routes/posts');
app.use('/posts', verifyToken, postRouter);

app.use(express.json());
const apiUserRouter = require('./routes/apiUsers');
app.use('/api-users', apiUserRouter);

function verifyToken(req, res, next) {
    //res.json('verifyToken');
      const bearer = req.headers['authorization'];
    const token = bearer && bearer.split(' ')[1]

    if (!token) {
        return res.sendStatus(401)
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.sendStatus(403);
        }
        next();
    })   
}

// NOTE! Connect to your own DB
mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.DB_URL,
    //`mongodb+srv://uggla-gut:ComHem2011@cluster0.qrygrvo.mongodb.net/test`,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('DB connected');
    }
)

// Listen to server

//app.listen(process.env.PORT || 5000); //Listen through port 5000

app.listen(PORT, err => 
    {
        if (err) 
        {
            return console.log('Error', err);
        }
        else
        {
            console.log(`Server listening on port ${PORT}...`);
        }
    });