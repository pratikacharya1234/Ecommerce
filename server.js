const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local') });
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST'],        
    allowedHeaders: ['Content-Type'],
}));

// Verify environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('Missing required environment variables');
    console.error('SUPABASE_URL:', process.env.SUPABASE_URL);
    console.error('SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY);
    process.exit(1);
}

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

// static path
app.use(express.static(path.join(__dirname, '')));
app.use(express.json());

// routes 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Authlayout/Login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});


app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'Authlayout/Create.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Authlayout/Login.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages/Profile.html'));
});

// Sign Up Endpoint
app.post('/api/signup', async (req, res) => {
    const { email, password, name } = req.body;
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name }
            }
        });

        if (error) throw error;

        res.json({
            success: true,
            user: data.user,
            message: 'Sign up successful. Please check your email to verify.'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Sign In Endpoint
app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        res.json({
            success: true,
            user: data.user,
            session: data.session,
            message: 'Login successful'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Google OAuth Sign In
app.get('/api/auth/google', async (req, res) => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/profile',
                queryParams: {
                    client_id: process.env.GOOGLE_CLIENT_ID
                }
            }
        });

        if (error) throw error;

        res.redirect(data.url);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Callback route for Google OAuth
app.get('/auth/callback', async (req, res) => {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (data.session) {
            res.redirect('/home');
        } else {
            res.redirect('/signin');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
