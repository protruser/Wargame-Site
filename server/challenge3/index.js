const express = require('express');
const app = express();
const path = require('path');
const crypto = require('crypto');
const dotenv = require('dotenv');
const fs = require('fs');

const envPath = path.resolve(__dirname, '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = envConfig.PORT;
const password = crypto.randomBytes(32).toString('hex');

app.get('/', (req, res) => {
    res.redirect('student1.html');
});

app.post('/move-student2', (req, res) => {
    res.redirect('/student2.html');
});

app.post('/move-student3', (req, res) => {
    res.redirect('/student3.html');
});

app.post('/check-password', (req, res) => {
    const code = req.body.code;

    if (code === password) {
        return res.status(200).json({ success: true, redirect: '/student4.html' });
    } else {
        return res.status(401).json({ success: false, message: '❌ Wrong password..' });
    }
});

app.listen(PORT, () => {
    console.log(`Challenge 3 is running on PORT ${PORT}`);
});
