const db = require('../config/db');

const challenges = [
    {
        title: 'Cookie',
        description:
            'Change cookie to admin. You can change cookie in F12(developer tool).\nThe time limit is 30 seconds! \n\n ID/PW: guest/guest123',
        port: '9001',
        flag: 'FLAG{Congrats_You_Are_Admin}',
        score: 100,
    },
    {
        title: 'Pin Code',
        description:
            'I got a 4-digit Pin Code, but I lost it.\nThe code has not been reissued, so I have to match it with any methods. Is there any way to find the code?\n\n hint: Pin Code is from 0 to 9999.',
        port: '9002',
        flag: 'FLAG{pIN_Code_bruteForced_OoO}',
        score: 150,
    },
    {
        title: 'My Grade',
        description:
            'The grad announcement date is June 25, 2025.\nToday is June 18th, so It still has a week left to watch the grade. I want to see my grades in advance, how can I do it? \n\n hint: Authentication Bypass',
        port: '9003',
        flag: 'FLAG{Congrats_Here_LaBORatorY_TICket}',
        score: 200,
    },
];

db.serialize(() => {
    db.get('SELECT COUNT(*) AS count FROM challenges', (err, row) => {
        if (err) {
            console.error('❌ Challenge count check failed:', err.message);
            return;
        }

        if (row.count === 0) {
            console.log('📦 Seeding initial challenges...');

            challenges.forEach((ch) => {
                db.run(
                    `INSERT INTO challenges (title, description, port, flag, score) VALUES (?, ?, ?, ?, ?)`,
                    [ch.title, ch.description, ch.port, ch.flag, ch.score],
                    (err) => {
                        if (err) {
                            console.error('❌ Failed to insert challenge:', err.message);
                        } else {
                            console.log(`✅ Inserted: ${ch.title}`);
                        }
                    }
                );
            });
        } else {
            console.log('Challenges already exist, skipping seeding.');
        }
    });
});

// delay close
setTimeout(() => db.close(), 1000);
