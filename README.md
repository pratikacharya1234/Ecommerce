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

### Supabase Setup:
1.  **Create a Supabase Project**: Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Database Setup**:
    *   Navigate to the SQL editor in your Supabase project.
    *   Create the necessary tables for users, products, and cart items. Example SQL schema:

    ```sql
    -- Example: Create a users table
    CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Example: Create a products table
    CREATE TABLE products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL
    );

    -- Example: Create a cart_items table
    CREATE TABLE cart_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id),
        product_id UUID REFERENCES products(id),
        quantity INTEGER NOT NULL DEFAULT 1
    );
    ```
3.  **Get API Keys**:
    *   Go to your project settings in Supabase.
    *   Find your `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
    *   For the `SUPABASE_SERVICE_KEY`, ensure you store it securely and use it only in your backend (server-side) code.

### Backend Setup (Node.js with Express):
1.  **Install Dependencies**:
    ```bash
    npm install express cors supabase
    ```
2.  **Create `server.js`**:
    ```javascript
    // server.js
    const express = require('express');
    const cors = require('cors');
    const { createClient } = require('@supabase/supabase-js');
    require('dotenv').config();

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(cors());
    app.use(express.json());

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Example API endpoint to get products
    app.get('/products', async (req, res) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*');

            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to fetch products' });
            }

            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
    ```
3.  **Update `.env.local`**:
    Ensure your `.env.local` file includes:
    ```env
    SUPABASE_URL=your-supabase-url
    SUPABASE_ANON_KEY=your-supabase-anon-key
    SUPABASE_SERVICE_KEY=your-supabase-service-key
    ```

### API Endpoints:
-   **`/products`**: Fetches all products from the database.
    -   Method: `GET`
    -   Response: JSON array of products.

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