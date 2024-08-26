const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/add-expense', (req, res) => {
    const expense = req.body;
    fs.appendFileSync('expenses.txt', JSON.stringify(expense) + '\n');
    res.sendStatus(200);
});

app.get('/expenses', (req, res) => {
    const data = fs.readFileSync('expenses.txt', 'utf-8').split('\n').filter(Boolean).map(JSON.parse);
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
