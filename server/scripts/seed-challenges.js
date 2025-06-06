const db = require('../config/db');

const challenges = [
    {
        title: 'Cookie',
        description: 'Change cookie to admin. ID/PW: guest/guest123',
        port: '9001',
        flag: 'FLAG{Congrats_You_Are_Admin}',
        score: 100,
    },
    {
        title: 'Pin Code',
        description: 'Lost my authentication number',
        port: '9002',
        flag: 'FLAG{pIN_Code_bruteForced_OoO}',
        score: 150,
    },
    {
        title: 'My Grade',
        description: 'Want to know my grade earlier than the date, June 25',
        port: '9003',
        flag: 'FLAG{Congrats_Here_LaBORatorY_TICket}',
        score: 200,
    },
];

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
        console.log('ℹ️ Challenges already exist, skipping seeding.');
    }
});

// Optional: delay DB close
setTimeout(() => db.close(), 500);
