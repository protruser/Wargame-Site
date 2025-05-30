const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// make server/app.db
const dbPath = path.resolve(__dirname, 'app.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ DB connection error:', err.message);
    } else {
        console.log('✅ DB connection complete!');
    }
});

// Users table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        nickname TEXT,
        password TEXT,
        description TEXT,
        total_score INTEGER DEFAULT 0
    )
`);

// Challenges table
//score per challenge
db.run(`
    CREATE TABLE IF NOT EXISTS challenges (
        challenge_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        port TEXT,
        flag TEXT,
        score INTEGER 
    )
`);

// User_Challenges table
db.run(`
    CREATE TABLE IF NOT EXISTS user_challenges (
        user_id TEXT PRIMARY KEY,
        challenge_1_time INTEGER DEFAULT 0,
        challenge_2_time INTEGER DEFAULT 0,
        challenge_3_time INTEGER DEFAULT 0,
        solve_success INTEGER DEFAULT 0,
        solve_fail INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
`);

module.exports = db;
