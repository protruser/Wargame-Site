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
        ['user01', 'Alice', 'pass01', 3600],
        ['user02', 'Bob', 'pass02', 3300],
        ['user03', 'Charlie', 'pass03', 3600],
        ['user04', 'Diana', 'pass04', 3000],
        ['user05', 'Eve', 'pass05', 2700],
        ['user06', 'Frank', 'pass06', 3300],
        ['user07', 'Grace', 'pass07', 1800],
        ['user08', 'Heidi', 'pass08', 1200],
        ['user09', 'Ivan', 'pass09', 1500],
        ['user10', 'Judy', 'pass10', 2400],
    ];

    const challenges = [
        ['user01', 1717000000000, 1717100000000, 1717200000000, 3, 1],
        ['user02', 1717000000000, 1717100000000, 0, 2, 2],
        ['user03', 1716900000000, 1717100000000, 1717200000000, 3, 0],
        ['user04', 1717000000000, 0, 0, 1, 1],
        ['user05', 0, 1717100000000, 1717150000000, 2, 1],
        ['user06', 1716900000000, 1716950000000, 0, 2, 2],
        ['user07', 1717000000000, 0, 0, 1, 2],
        ['user08', 0, 1717100000000, 0, 1, 3],
        ['user09', 0, 0, 1717200000000, 1, 1],
        ['user10', 1717000000000, 1717050000000, 0, 2, 0],
    ];

    users.forEach((u) => insertUsers.run(...u));
    challenges.forEach((c) => insertChallenges.run(...c));

    insertUsers.finalize();
    insertChallenges.finalize();
});
