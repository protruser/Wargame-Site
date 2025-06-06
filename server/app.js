const express = require('express');
require('./config/db'); // db connection

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const challengeRoutes = require('./routes/challenge.routes');
const loginRoutes = require('./routes/login.routes');

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// wargame challenges
require('./challenge1/index');
require('./challenge2/index');
require('./challenge3/index');

// router enroll
app.use('/api/user', userRoutes);
app.use('/api/challenge', challengeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', loginRoutes);

// basic route
app.get('/', (req, res) => {
    res.send('✅ Server is running and DB connected!');
});

// error handling
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// running server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
