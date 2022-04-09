const express = require('express');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauces');
const usersRoutes = require('./routes/user')
const path = require('path')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
const dotenv = require("dotenv")
dotenv.config();

const app = express();

app.use(express.json());
app.use(mongoSanitize())
app.use(xss()) //  to sanitize user input coming from POST body, GET queries, and url params
// Prevent DOS attacks
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb

const MY_NAME = process.env.Name_User;
const MY_SECRET = process.env.Pass_User;
const MY_PROJECT = process.env.Project_User;
// connexion to mongoDB
mongoose.connect(`mongodb+srv://${MY_NAME}:${MY_SECRET}@test-01.felg3.mongodb.net/${MY_PROJECT}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Add CORS in the headers
app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});




app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', usersRoutes);

module.exports = app;