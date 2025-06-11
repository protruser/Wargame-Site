const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const testDbPath = path.resolve(__dirname, '../../__tests__/test.db');

let db;

beforeAll((done) => {
  db = new sqlite3.Database(testDbPath, (err) => {
    if (err) return done(err);

    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          user_id TEXT PRIMARY KEY,
          nickname TEXT,
          password TEXT,
          total_score INTEGER DEFAULT 0
        )
      `);
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
      `, done);
    });
  });
});

afterAll((done) => {
  db.close(() => {
    fs.unlinkSync(testDbPath); // delete test DB file
    done();
  });
});

test('should create the "users" table', (done) => {
  db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='users'`, (err, row) => {
    expect(row.name).toBe('users');
    done();
  });
});

test('should create the "challenges" table', (done) => {
  db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='challenges'`, (err, row) => {
    expect(row.name).toBe('challenges');
    done();
  });
});

test('should create the "user_challenges" table', (done) => {
  db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='user_challenges'`, (err, row) => {
    expect(row.name).toBe('user_challenges');
    done();
  });
});
