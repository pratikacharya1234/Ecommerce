const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env.local') });
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Check required environment variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Missing required environment variables: GOOGLE_CLIENT_ID and/or GOOGLE_CLIENT_SECRET');
    process.exit(1);
}

// Configure OAuth client
const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/auth/callback'
);

// Enable CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

// Parse JSON requests
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '')));

//  middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.status(401).json({ success: false, message: 'Not authenticated' });
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Authlayout/Login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages/Profile.html'));
});

// Google OAuth Sign In - Generate authorization URL
app.get('/api/auth/google', (req, res) => {
    try {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ],
            prompt: 'consent'
        });
        
        res.redirect(authUrl);
    } catch (error) {
        console.error('Error generating auth URL:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication failed'
        });
    }
});

// Callback route for Google OAuth
app.get('/auth/callback', async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        return res.redirect('/?error=no_code');
    }
    
    try {
        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        
        // Get user info with the access token
        const userInfoResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        );
        
        const userData = userInfoResponse.data;
        
        // Store user data in session
        req.session.user = {
            id: userData.sub,
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
            tokens: tokens 
        };
        
        console.log('User logged in:', userData.name);
        res.redirect('/home');
    } catch (error) {
        console.error('Callback error:', error);
        res.redirect('/?error=auth_failed');
    }
});

// Get user data endpoint
app.get('/api/user', (req, res) => {
    if (req.session && req.session.user) {
        // Return user data without tokens
        const { tokens, ...userData } = req.session.user;
        res.json({
            success: true,
            user: userData
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Not authenticated'
        });
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error during logout'
            });
        }
        
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    });
});

// Protected route
app.get('/api/protected', isAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: 'This is a protected endpoint',
        user: req.session.user
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});