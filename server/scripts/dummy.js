const db = require('../config/db');

db.serialize(() => {
    db.run('DELETE FROM users');
    db.run('DELETE FROM user_challenges');

    const insertUsers = db.prepare(`
        INSERT INTO users (user_id, nickname, password, total_score)
        VALUES (?, ?, ?, ?)
    `);

    const insertChallenges = db.prepare(`
        INSERT INTO user_challenges (user_id, challenge_1_time, challenge_2_time, challenge_3_time, solve_success, solve_fail)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    const users = [
        ['21102049@seoultech.ac.kr', 'Minhyuk', 'pass01', 100],
        ['21102043@seoultech.ac.kr', 'Suyong', 'pass02', 0],
        ['21102060@seoultech.ac.kr', 'Inyong', 'pass03', 150],
        ['22101990@seoultech.ac.kr', 'Minseo', 'pass04', 200],
    ];

    const challenges = [
        ['21102049@seoultech.ac.kr', 1749803606075, 0, 0, 1, 6],
        ['21102043@seoultech.ac.kr', 0, 0, 0, 0, 4],
        ['21102060@seoultech.ac.kr', 0, 1749803506075, 0, 1, 1],
        ['22101990@seoultech.ac.kr', 1749803605075, 0, 0, 1, 3],
    ];

    users.forEach((u) => insertUsers.run(...u));
    challenges.forEach((c) => insertChallenges.run(...c));

    insertUsers.finalize();
    insertChallenges.finalize();

    console.log('✅ Dummy data inserted.');
});

// Optional: close DB
setTimeout(() => db.close(), 500);
