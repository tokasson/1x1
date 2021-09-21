const chalk = require('chalk');
const express = require('express');
const router = express.Router();

const getRandomNumber = (maxInt) => Math.floor(Math.random() * maxInt) + 1;

router.get('/', (req, res) => {
    const currentSolutions = req.session.currentSolutions || [];
    const randomNumber1 = getRandomNumber(10);
    const randomNumber2 = getRandomNumber(10);
    const solution = randomNumber1 * randomNumber2;
    currentSolutions.push({
        f1: randomNumber1,
        f2: randomNumber2,
        solution: solution,
        userSolution: null
    });
    req.session.currentSolutions = currentSolutions;
    const newTask = {
        session: req.session,
        title: 'Lenas 1x1 Trainer',
        factorOne: randomNumber1,
        factorTwo: randomNumber2,
        solution: solution,
        currentSolutions: currentSolutions
    };
    

    console.log(chalk.blue(JSON.stringify(newTask)));

    res.render('index.html', newTask);
});

router.post('/checkSolution', (req, res) => {
    const idx = req.session.currentSolutions.length - 1;
    console.log(req.body);
    const userSolution = req.body.solutionInput;
    const f1 = req.session.currentSolutions[idx].f1;
    const f2 = req.session.currentSolutions[idx].f2;
    const solution = req.session.currentSolutions[idx].solution;
    
    console.log(chalk.yellow(req.session.currentSolutions[idx].userSolution));
    if (req.session.currentSolutions[idx].userSolution) res.redirect('/');

    req.session.currentSolutions[idx].userSolution = userSolution;
    req.session.solutionChecked = true;
    req.session.lastCorrect = solution == userSolution;
    console.log('solutionChecked', chalk.yellow(req.session.solutionChecked));
    res.redirect('/');
});

module.exports = {
    mainRouter:router
};