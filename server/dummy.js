const db = require('./db');

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
        ['user01', 'Alice', 'pass01', 100],
        ['user02', 'Bob', 'pass02', 150],
        ['user03', 'Charlie', 'pass03', 150],
        ['user04', 'Diana', 'pass04', 250],
        ['user05', 'Eve', 'pass05', 450],
        ['user06', 'Frank', 'pass06', 300],
        ['user07', 'Grace', 'pass07', 300],
        ['user08', 'Heidi', 'pass08', 250],
        ['user09', 'Ivan', 'pass09', 450],
        ['user10', 'Judy', 'pass10', 0],
    ];

    const challenges = [
        ['user01', 1717000000000, 0, 0, 1, 6],
        ['user02', 0, 1717100000000, 0, 1, 8],
        ['user03', 0, 1717100000000, 0, 1, 2],
        ['user04', 1717000000000, 0, 0, 2, 2],
        ['user05', 1717614000000, 1717100000000, 1717150000000, 3, 22],
        ['user06', 1716900000000, 0, 1716950000000, 2, 2],
        ['user07', 1717000000000, 0, 1716951240000, 2, 0],
        ['user08', 1717145210000, 1717100000000, 0, 2, 6],
        ['user09', 1715100000000, 1715200000000, 1717200000000, 3, 1],
        ['user10', 0, 0, 0, 0, 1],
    ];

    users.forEach((u) => insertUsers.run(...u));
    challenges.forEach((c) => insertChallenges.run(...c));

    insertUsers.finalize();
    insertChallenges.finalize();
});
