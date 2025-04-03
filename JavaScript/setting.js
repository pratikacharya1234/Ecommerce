// Load saved profile data
function loadProfile() {
    const name = localStorage.getItem('userName') || '';
    const email = localStorage.getItem('userEmail') || '';
    document.getElementById('userName').value = name;
    document.getElementById('userEmail').value = email;
}

// Save profile data
function saveProfile() {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    if (name && email) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        alert('Profile saved successfully!');
    } else {
        alert('Please enter both name and email.');
    }
}



// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('cart');
        alert('Cart cleared!');
    }
}

// Logout (placeholder)
// function logout() {
//     if (confirm('Are you sure you want to logout?')) {
//         alert('Logged out successfully! (Placeholder action)');
//     }
// }

// Navbar and Sidebar
document.addEventListener('DOMContentLoaded', function() {
    // Navbar
    const navbarHTML = `
        <header class="logo-container" id="navbar">
            <h1 class="logo"><a href="/index.html">Ecommerce</a></h1>
            <nav>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/Pages/Item.html">Items</a></li>
                <li><a href="/Pages/Cart.html">Cart</a></li>
                <li><a href="/Pages/Setting.html">Setting</a></li>
            </nav>
            <button id="sidebarToggle" class="sidebar-toggle">☰</button>
        </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);

    // // Sidebar
    // const sidebarHTML = `
    //     <aside class="sidebar" id="sidebar">
    //         <h2>Categories</h2>
    //         <ul class="sidebar-menu">
    //             <li><a href=""><i class='bx bx-male'></i>Mens</a></li>
    //             <li><a href=""><i class='bx bx-female'></i>Womens</a></li>
    //             <li><a href=""><i class='bx bx-headphone'></i>Electronics</a></li>
    //             <li><a href=""><i class='bx bx-car'></i>Automobile</a></li>
    //         </ul>
    //     </aside>
    // `;
    // document.body.insertAdjacentHTML("beforeend", sidebarHTML);

    

    // Event listeners
    document.getElementById('saveProfile').addEventListener('click', saveProfile);
    document.getElementById('clearCart').addEventListener('click', clearCart);
    // document.getElementById('logout').addEventListener('click', logout);

    // Load initial settings
    loadProfile();
});