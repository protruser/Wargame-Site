const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const envPath = path.resolve(__dirname, '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const PORT = envConfig.PORT;
const FLAG = envConfig.FLAG;

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
