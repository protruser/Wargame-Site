const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT;
const FLAG = process.env.FLAG;

const randomCode = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

app.get('/', (req, res) => {
    res.redirect('/check-password.html');
});

app.post('/check-password', (req, res) => {
    const { code } = req.body;
    if (code === randomCode) {
        return res.json({ success: true, flag: FLAG });
    } else {
        return res.json({ success: false, message: '❌ Wrong password..' });
    }
});

app.listen(PORT, () => {
    console.log(`Challenge 2 is running on PORT ${PORT}`);
});
