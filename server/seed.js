const db = require('./db');

const challenges = [
    {
        title: 'Cookie',
        description: 'Change cookie to admin. ID/PW: guest/guest123',
        port: '3001',
        flag: 'FLAG{Congrats_You_Are_Admin}',
        score: 100,
    },
    {
        title: 'Pin Code',
        description: 'Lost my authentication number',
        port: '3002',
        flag: 'FLAG{pIN_Code_bruteForced_OoO}',
        score: 150,
    },
    {
        title: 'My Grade',
        description: 'Want to know my grade earlier than the date, June 25',
        port: '3003',
        flag: 'FLAG{Congrats_Here_LaBORatorY_TICket}',
        score: 200,
    },
];

challenges.forEach((ch) => {
    db.run(`INSERT OR IGNORE INTO challenges (title, description, port, flag, score) values (?,?,?,?,?)`, [
        ch.title,
        ch.description,
        ch.port,
        ch.flag,
        ch.score,
    ]);
});

db.close();
