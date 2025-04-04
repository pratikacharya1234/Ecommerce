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

---

## Folder and File Structure

### Root Files
- **`.env.local`**: Contains environment variables such as `GOOGLE_CLIENT_ID` and Supabase keys.
- **`.gitignore`**: Specifies files and folders to be ignored by Git (e.g., `.env.local`).
- **`db.js`**: Configures the PostgreSQL database connection using the `postgres` library.
- **`index.html`**: The main entry point of the application, displaying the homepage.
- **`package.json`**: Defines project metadata, dependencies, and scripts.
- **`server.js`**: Placeholder for the backend server logic (currently empty).
- **`README.md`**: Documentation for the project.

---

### Folders

#### 1. **Authentication/**
- **`Auth.js`**: Handles user authentication logic, including Google Sign-In integration.

#### 2. **Authlayout/**
- **`Login.html`**: Login page for users to sign in using email/password or Google Sign-In.
- **`Create.html`**: Registration page for new users to create an account.

#### 3. **CSS/**
- **`Auth.css`**: Styles specific to the authentication pages (`Login.html` and `Create.html`).
- **`style.css`**: Global styles for the entire application, including the homepage, cart, and settings.

#### 4. **JavaScript/**
- **`navbar.js`**: Dynamically generates the navigation bar and handles cart-related functionality.
- **`Profile.js`**: Placeholder for profile-related JavaScript logic (currently incomplete).
- **`script.js`**: Handles product search, display, and cart management on the homepage.
- **`setting.js`**: Manages user settings, including saving profile data and clearing the cart.

#### 5. **Pages/**
- **`Cart.html`**: Displays the user's shopping cart with options to update quantities or remove items.
- **`Item.html`**: Displays a searchable list of products fetched from an external API.
- **`Profile.html`**: Placeholder for the user profile page (currently incomplete).
- **`Setting.html`**: Allows users to update their profile and manage cart settings.

---

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

---

## Usage
- Open `index.html` in your browser to access the application locally.
- Navigate to `/Authlayout/Login.html` for the login page.

---

## Deployment
The website can be deployed to any static hosting service such as:
- Vercel
- Netlify
- GitHub Pages

---

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## License
MIT License

---

## Acknowledgements
- Font Awesome
- Boxicons
- Google Sign-In
- Supabase