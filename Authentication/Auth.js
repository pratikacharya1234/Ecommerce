const supabaseClient = supabase.createClient(
    'https://ohhemhgpcrwmszltieub.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oaGVtaGdwY3J3bXN6bHRpZXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDI5NDAsImV4cCI6MjA1OTI3ODk0MH0.yH1UUx7ntjXt1HNYfSA4vqLqk9xObnbb_OP60yqLPFA'  
);


// Signup Form Handler
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name })
        });

        const result = await response.json();

        if (result.success) {
            alert('Signup successful! Please check your email to verify.');
            window.location.href = '/signin';
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('An error occurred during signup');
        console.error(error);
    }
});

// Login Form Handler
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/index.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem('access_token', result.session.access_token);
            window.location.href = '/index.html';
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('An error occurred during login');
        console.error(error);
    }
});


// Google Sign In Handler
document.getElementById('google-signin-button')?.addEventListener('click', () => {
    window.location.href = '/api/auth/google';
});

// Check auth state
async function checkAuth() {
    const token = localStorage.getItem('access_token');
    if (token) {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error) {
            console.error('Error checking auth:', error);
            return null;
        }
        if (user) return user;
    }
    return null;
}