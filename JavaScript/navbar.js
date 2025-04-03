

// Function to display cart items
function displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;
    cartContainer.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const { id, title, price, image, quantity } = item;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const itemImage = document.createElement('img');
        itemImage.src = image;
        itemImage.alt = title;
        cartItem.appendChild(itemImage);

        const itemDetails = document.createElement('div');
        itemDetails.className = 'cart-item-details';

        const itemTitle = document.createElement('h3');
        itemTitle.className = 'cart-item-title';
        itemTitle.textContent = title;
        itemDetails.appendChild(itemTitle);

        const itemPrice = document.createElement('p');
        itemPrice.className = 'cart-item-price';
        itemPrice.textContent = `Price: $${price} x ${quantity} = $${(price * quantity).toFixed(2)}`;
        itemDetails.appendChild(itemPrice);

        const quantityContainer = document.createElement('div');
        quantityContainer.className = 'cart-item-quantity';

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = 1;
        quantityInput.value = quantity;
        quantityInput.addEventListener('change', function() {
            updateCartQuantity(id, parseInt(this.value));
        });
        quantityContainer.appendChild(quantityInput);

        itemDetails.appendChild(quantityContainer);
        cartItem.appendChild(itemDetails);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function() {
            removeFromCart(id);
        });
        cartItem.appendChild(removeBtn);

        const buyBtn = document.createElement('button');
        buyBtn.className = 'buy-btn';
        buyBtn.textContent = 'Buy Now';
        buyBtn.addEventListener('click', function() {
            buyNow(id);
        });
        cartItem.appendChild(buyBtn);

        cartContainer.appendChild(cartItem);
    });
}

// Function to update cart quantity
function updateCartQuantity(id, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex > -1) {
        if (newQuantity < 1) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// Function to remove item from cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}


// Function to buy item now
function buyNow(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        alert(`Buying ${item.title} for $${item.price}`);
        // below payment logic
    }
}

// Navbar and Sidebar for cart page
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



    // Display cart
    displayCart();
});
