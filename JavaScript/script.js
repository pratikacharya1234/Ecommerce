// Function to search for a product
function searchProduct() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const filteredProducts = data.filter(product => 
                product.title.toLowerCase().includes(searchInput)
            );
            displayProduct(filteredProducts);
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Function to display the products
function displayProduct(products) {
    const productContainer = document.getElementById('productContaineer');
    // Exit if container not found
    if (!productContainer) return; 
    productContainer.innerHTML = '';

    // Ensure products is an array
    if (!Array.isArray(products)) {
        products = [products];
    }

    products.forEach(product => {
        const { id, title, image, price } = product;

        const productCard = document.createElement("div");
        productCard.className = "product-card";
        
        const productImage = document.createElement("img");
        productImage.src = image;
        productImage.alt = title;
        productImage.className = "productImage";
        productCard.appendChild(productImage);
        
        const productTitle = document.createElement("h3");
        productTitle.textContent = title;
        productTitle.className = "prodcutTitle";
        productCard.appendChild(productTitle);
        
        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: $${price}`;
        productPrice.className = "productPrice";
        productCard.appendChild(productPrice);

        const productQuantityContainer = document.createElement("div");
        productQuantityContainer.className = "quantity-container";

        const quantityLabel = document.createElement("label");
        quantityLabel.textContent = "Quantity:";
        quantityLabel.className = "quantity-label";

        const textInput = document.createElement("input");
        textInput.type = "number";
        textInput.className = "quantity-range";
        textInput.value = 1;
        textInput.min = 1;
        textInput.max = 10;
        textInput.addEventListener('input', function() {
            if (this.value < 1) this.value = 1;
            if (this.value > 10) this.value = 10;
        });

        productQuantityContainer.appendChild(quantityLabel);
        productQuantityContainer.appendChild(textInput);
        productCard.appendChild(productQuantityContainer);

        const addToCartBtn = document.createElement("button");
        addToCartBtn.className = "add-to-cart-btn";
        addToCartBtn.innerHTML = "<i class='bx bx-cart-add'></i> Add to Cart";
        addToCartBtn.addEventListener("click", function() {
            // Fallback to 1 if NaN
            const quantity = parseInt(textInput.value) || 1; 
            addToCart(id, title, price, image, quantity);
        });
        productCard.appendChild(addToCartBtn);

        productContainer.appendChild(productCard);
    });
}

// Function to add items to cart
function addToCart(id, title, price, image, quantity) {
    let cart;
    try {
        const storedCart = localStorage.getItem('cart');
        cart = storedCart ? JSON.parse(storedCart) : [];
        if (!Array.isArray(cart)) {
            console.warn('Cart data was invalid, resetting to empty array');
            cart = [];
        }
    } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        // Reset to empty array if parsing fails
        cart = []; 
    }

    const existingItemIndex = cart.findIndex(item => item.id === id);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ id, title, price, image, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${title} (x${quantity}) added to cart!`);
}

// Fetch and display products when page loads
window.addEventListener("DOMContentLoaded", () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => displayProduct(data))
        .catch(error => console.error('Error loading products:', error));
});

// Navbar Component
document.addEventListener('DOMContentLoaded', function() {
    const navbarHTML = `
        <header class="logo-container" id="navbar">
            <h1 class="logo"><a href="/index.html">Ecommerce</a></h1>
            <nav>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/Pages/Item.html">Items</a></li>
                <li><a href="/Pages/Cart.html">Cart</a></li>
                <li><a href="/Pages/Setting.html">Setting</a></li>
            </nav>
        </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);

    
});

// // Sidebar Component
// document.addEventListener('DOMContentLoaded', function() {
//     const sidebarHTML = `
//         <aside class="sidebar" id="sidebar">
//             <h2>Categories</h2>
//             <ul class="sidebar-menu">
//                 <li><a href=""><i class='bx bx-male'></i>Mens</a></li>
//                 <li><a href=""><i class='bx bx-female'></i>Womens</a></li>
//                 <li><a href=""><i class='bx bx-headphone'></i>Electronics</a></li>
//                 <li><a href=""><i class='bx bx-car'></i>Automobile</a></li>
//             </ul>
//         </aside>
//     `;
//     document.body.insertAdjacentHTML("beforeend", sidebarHTML);
// });