const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('./config/db'); // Database connection

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const challengeRoutes = require('./routes/challenge.routes');
const loginRoutes = require('./routes/login.routes');
const profileRoutes = require('./routes/profile.routes');
const myScoreRoutes = require("./routes/myscore.routes");
const app = express();
const port = process.env.PORT || 3000;

// ✅ Define allowed origins for CORS
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:9001',
    'http://localhost:9002',
    'http://localhost:9003',
];

// ✅ CORS middleware with dynamic origin checking
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

// Global middlewares
app.use(helmet()); // Set secure HTTP headers
app.use(morgan('dev')); // Log incoming requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form-encoded request bodies

// Run wargame challenge servers (each on its own port)
require('./challenge1/index');
require('./challenge2/index');
require('./challenge3/index');

// Register route handlers
app.use('/api/user', userRoutes);
app.use('/api/challenge', challengeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/profile', profileRoutes);
app.use("/api/my_score", myScoreRoutes);

// Basic health check route
app.get('/', (req, res) => {
    res.send('✅ Server is running and DB connected!');
});

// Handle unmatched routes (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
