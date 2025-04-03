document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // typically send this data to your server
    console.log('Form submitted:', { name, email, password });
    
    //form validation
    if(password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }
    
    // Proceed with account creation
    alert('Account creation successful!');
});

// Initialize Google Sign-In
window.onload = function() {
    google.accounts.id.initialize({
        client_id: 'process.env.GOOGLE_CLIENT_ID',
        callback: handleGoogleSignIn
    });
    
    google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { 
            theme: 'outline', 
            size: 'large',
            width: 250,
            text: 'signup_with'
        }
    );
}

function handleGoogleSignIn(response) {
    // This function handles the response from Google Sign-In
    const credential = response.credential;
    
    // Send the ID token to  server for verification
    console.log('Google Sign-In successful, credential:', credential);
    
    //  typically send this token to your server
    // for verification and user registration
    
    // Redirect user or show success message
    alert('Google Sign-In successful!');
}