const fname = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');

if (fname === "" || email == "" || password == ""){
    alert("Please filled the form")
}
else{
    alert("Login Sucessufll");
}


 // Configure the Google Sign-In button
 function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    // Send the ID token to your server for verification
    sendTokenToServer(id_token);
  }

  function sendTokenToServer(id_token) {
    //  server-side logic here to verify the token
  }

  // Initialize the Google Sign-In button
  function onGoogleLoad() {
    gapi.signin2.render('google-signin-button', {
      'scope': 'profile email',
      'width': 200,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSignIn
    });
  }

  // Load the Google Sign-In SDK
  window.onload = function() {
    gapi.load('auth2', function() {
      gapi.auth2.init().then(onGoogleLoad);
    });
  }