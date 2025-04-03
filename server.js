const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from appropriate directories
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
app.use('/Authentication', express.static(path.join(__dirname, 'Authentication')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'index.html'));
});

app.get('/Create.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'AuthLayout', 'Create.html'));
});

app.get('/Login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'AuthLayout', 'Login.html'));
});

// Protected routes - we'll check authentication in the frontend,
// but can also add middleware here for additional security
app.get('/Profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Pages', 'Profile.html'));
});

// API Routes
app.post('/api/check-session', async (req, res) => {
  const { token } = req.body;
  
  try {
    // Verify the token
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error) throw error;
    
    res.status(200).json({ valid: true, user: data.user });
  } catch (error) {
    res.status(401).json({ valid: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});