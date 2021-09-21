const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');
const getenv = require('dotenv');
const nunjucks = require('nunjucks');
const session = require('express-session');

// make .env data available to process.env
getenv.config();

// configure express
const app = express();
app.use(session({
    secret:'secret',
    saveUninitialized:false,
    resave:false
}));
app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(chalk.blue(`Listening to port ${port}...`));
});

// body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configre nunjucks
const nunjucksEnv = nunjucks.configure('views', {autoescape:true,express:app});
nunjucksEnv.addFilter('setAttribute', (dictionary, key, value) => {
    dictionary[key] = value;
    return dictionary;
});

const {mainRouter} = require('./routers/main');
app.use('/', mainRouter);