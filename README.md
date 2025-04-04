# E-Commerce Platform

## Overview
This is a modern e-commerce platform built with HTML, CSS, and JavaScript. It provides a comprehensive solution for online retail.

## Features
- Shopping cart features
- User authentication (Google Sign-In integration)
- Responsive design for all devices
- Secure checkout process (In future)

## Technology Stack
- Frontend: HTML5, CSS3, JavaScript
- Icons: Font Awesome, Boxicons
- Authentication: Google Sign-In
- Backend: Node.js, Express.js
- Database: Supabase

## Setup

### Clone the repository:
```bash
git clone https://github.com/yourusername/ecommerce.git
cd ecommerce
```

### Install dependencies:
```bash
npm install
```

### Environment Variables:
Create a `.env.local` file in the root directory and add the following:
```env
GOOGLE_CLIENT_ID=your-google-client-id
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
```

### Start the server:
```bash
npm start
```

## Usage
- Open `index.html` in your browser to access the application locally.
- Navigate to `/Authlayout/Login.html` for the login page.

## Login Page (`Login.html`)
The login page allows users to log in using their email and password or via Google Sign-In.

### Features:
1. **Email and Password Login**:
   - Users can enter their email and password to log in.
   - The form validates that both fields are filled before submission.

2. **Google Sign-In**:
   - Users can log in using their Google account.
   - The Google Sign-In button is integrated using the Google Sign-In JavaScript SDK.

3. **Navigation**:
   - A link is provided for new users to navigate to the registration page (`Create.html`).

### File Structure:
- **HTML**: [Authlayout/Login.html](Authlayout/Login.html)
- **CSS**: [CSS/Auth.css](CSS/Auth.css)
- **JavaScript**: [Authentication/Auth.js](Authentication/Auth.js)

### How It Works:
- The form submission is handled by JavaScript in `Auth.js`.
- Google Sign-In is initialized using the `GOOGLE_CLIENT_ID` from the `.env.local` file.

### Example:
To test the login functionality:
1. Open `Login.html` in your browser.
2. Enter your email and password or click "Sign in with Google."
3. If using Google Sign-In, ensure the `GOOGLE_CLIENT_ID` is correctly configured.

## Deployment
The website can be deployed to any static hosting service such as:
- Vercel
- Netlify
- GitHub Pages

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License
MIT License

## Acknowledgements
- Font Awesome
- Boxicons
- Google Sign-In
- Supabase