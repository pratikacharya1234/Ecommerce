const express = reequire('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

//basic route
pp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Authlayout', 'Login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'Authlayout', 'Create.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Authlayout', 'Login.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'Profile.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});