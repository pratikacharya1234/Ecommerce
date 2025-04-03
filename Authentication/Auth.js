// Import and initialize Supabase client
const SUPABASE_URL = 'process.env.DATABASE_URL';
const SUPABASE_ANON_KEY = 'process.env.SUPABASE_ANON_KEY';
const supabase = supabaseClient.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handle sign-up form submission
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Get form fields - check which page user on (signup or login)
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('passpwrd');
            
            // Get values
            const email = emailInput.value;
            const password = passwordInput.value;
            
            // Form validation
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }
            
            try {
                // If user have a name field, this is the signup form
                if (nameInput) {
                    const name = nameInput.value;
                    await handleSignup(name, email, password);
                } else {
                    // Otherwise it's the login form
                    await handleLogin(email, password);
                }
            } catch (error) {
                console.error('Authentication error:', error.message);
                alert('Error: ' + error.message);
            }
        });
    }
});

// Handle signup with Supabase
async function handleSignup(name, email, password) {
    // Show loading state
    console.log('Creating account...', { name, email });
    
    try {
        // Sign up with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        
        if (error) throw error;
        
        // If successful, store additional user data in profiles table
        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ 
                    user_id: data.user.id,
                    name,
                    email
                }]);
                
            if (profileError) throw profileError;
            
            alert('Account creation successful!');
            
            // Store session
            localStorage.setItem('sb-auth-token', data.session?.access_token);
            
            // Redirect to logged-in page 
            window.location.href = '/Pages/Profile.html';
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Error creating account: ' + error.message);
        throw error;
    }
}

// Handle login with Supabase
async function handleLogin(email, password) {
    // Show loading state
    console.log('Logging in...', { email });
    
    try {
        // Sign in with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) throw error;
        
        alert('Login successful!');
        
        // Store session
        localStorage.setItem('sb-auth-token', data.session?.access_token);
        
        // Redirect to logged-in page
        window.location.href = '/Pages/Profile.html';
    } catch (error) {
        console.error('Login error:', error);
        alert('Error logging in: ' + error.message);
        throw error;
    }
}

// Initialize Google Sign-In
window.onload = function() {
    // First check if user already signed in
    checkAuthStatus();
    
    // Then setup Google Sign-In
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: 'process.env.GOOGLE_CLIENT_ID', 
            callback: handleGoogleSignIn
        });
        
        const googleButton = document.getElementById('google-signin-button');
        if (googleButton) {
            google.accounts.id.renderButton(
                googleButton,
                { 
                    theme: 'outline', 
                    size: 'large',
                    width: 250,
                    text: 'signup_with'
                }
            );
        }
    }
}

// Handle Google Sign-In with Supabase
async function handleGoogleSignIn(response) {
    if (!response.credential) {
        console.error('Google Sign-In failed: No credential returned');
        return;
    }
    
    try {
        // Use Supabase OAuth with Google
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
        });
        
        if (error) throw error;
        
        alert('Google Sign-In successful!');
        
        // Store session
        localStorage.setItem('sb-auth-token', data.session?.access_token);
        
        // Check if user exists in profiles table, if not create profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', data.user.id)
            .single();
            
        if (profileError && profileError.code !== 'PGRST116') { 
            throw profileError;
        }
        
        // If profile doesn't exist, create one
        if (!profile) {
            await supabase.from('profiles').insert([{
                user_id: data.user.id,
                name: data.user.user_metadata.full_name || 'User',
                email: data.user.email
            }]);
        }
        
        // Redirect to logged-in page
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Google Sign-In error:', error);
        alert('Error with Google Sign-In: ' + error.message);
    }
}

// Check if user is already authenticated
async function checkAuthStatus() {
    try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
            // User is logged in
            console.log('User is logged in:', session.user.email);
            
            // If user on login or signup page, redirect to dashboard
            if (window.location.pathname.includes('Login.html') || 
                window.location.pathname.includes('Create.html')) {
                window.location.href = '/index.html';
            }
        } else {
            // User is not logged in
            console.log('User is not logged in');
            
            // If user on a protected page, redirect to login
            const protectedPages = ['/dashboard.html', '/profile.html', '/checkout.html'];
            if (protectedPages.some(page => window.location.pathname.includes(page))) {
                window.location.href = '/Login.html';
            }
        }
    } catch (error) {
        console.error('Auth status check error:', error);
    }
}

// Function to log out user
function signOut() {
    supabase.auth.signOut().then(() => {
        localStorage.removeItem('sb-auth-token');
        window.location.href = '/Login.html';
    });
}

// Export functions to be used in other scripts if needed
window.auth = {
    signOut,
    checkAuthStatus
};