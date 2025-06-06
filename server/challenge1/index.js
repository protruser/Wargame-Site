const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

const PORT = envConfig.PORT;
const FLAG = envConfig.FLAG;
const ADMIN_SECRET = envConfig.COOKIE;
const ID = envConfig.ID;
const PASSWORD = envConfig.PASSWORD;

app.get('/', (req, res) => {
    const token = req.cookies.sessionId;
    const filePath = path.join(__dirname, 'views', 'index.html');

    if (!token) return res.redirect('/challenge1-login');

    fs.readFile(filePath, 'utf-8', (err, html) => {
        if (err) return res.status(500).send('Server Error 500');

        let user = 'Guest';
        let flag = '';

        if (token === ADMIN_SECRET) {
            user = 'Admin';
            flag = FLAG;
        }

        const rendered = html.replace('{{USER}}', user).replace('{{FLAG}}', flag);

        res.send(rendered);
    });
});

app.get('/challenge1-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'challenge1-login.html'));
});

app.post('/challenge1-login', (req, res) => {
    const { userid, userPassword } = req.body;

    if (userid === ID && userPassword === PASSWORD) {
        res.cookie('sessionId', crypto.randomBytes(8).toString('hex'), { httpOnly: false });
        return res.redirect('/');
    }

    res.redirect('/challenge1-login?failed=true');
});

app.listen(PORT, () => {
    console.log(`Challenge 1 is running on PORT ${PORT}`);
});
