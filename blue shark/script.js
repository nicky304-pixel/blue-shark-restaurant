document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("reservation-form");
    const dateInput = document.getElementById("booking-date");
    const message = document.getElementById("reservation-message");

    // Prevent customers from selecting a past date
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

    dateInput.min = today.toISOString().split("T")[0];

    // Handle reservation form submission
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("guest-name").value.trim();
        const guests = document.getElementById("guest-count").value;
        const date = dateInput.value;
        const time = document.getElementById("booking-time").value;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        message.textContent =
            "Thank you, " + name + "! Your request for " +
            guests + " guest(s) on " + date +
            " at " + time + " has been checked. " +
            "Please contact BLUE SHARK directly to confirm your booking.";

        message.style.color = "#d4af37";

        form.reset();

    });

});// BLUE SHARK FOOD CATEGORY BUTTONS

const categoryMenus = {
    starters: {
        title: "OUR STARTERS",
        dishes: [
            "Garlic Bread",
            "Chicken Wings",
            "Vegetable Soup",
            "Fresh Garden Salad"
        ]
    },

    mains: {
        title: "OUR MAIN COURSES",
        dishes: [
            "Grilled Chicken",
            "Beef Steak",
            "Chicken Biryani",
            "Creamy Pasta"
        ]
    },

    seafood: {
        title: "OUR SEAFOOD",
        dishes: [
            "Grilled Fish",
            "Garlic Butter Prawns",
            "Seafood Platter",
            "Fish and Chips"
        ]
    },

    drinks: {
        title: "OUR DRINKS",
        dishes: [
            "Fresh Orange Juice",
            "Passion Fruit Juice",
            "Fresh Lemonade",
            "Iced Coffee"
        ]
    }
};

// Find all food category buttons
const categoryButtons = document.querySelectorAll(
    ".category-card[data-category]"
);

const categoryResults = document.getElementById(
    "category-results"
);

// Make each category clickable
categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory = button.dataset.category;
        const menu = categoryMenus[selectedCategory];

        if (!menu || !categoryResults) {
            return;
        }

        // Remove the active appearance from other buttons
        categoryButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        // Highlight the selected button
        button.classList.add("active");

        // Display the selected dishes
        categoryResults.innerHTML =
            "<h3>" + menu.title + "</h3>" +
            "<ul>" +
            menu.dishes.map(function(dish) {
                return "<li>" + dish + "</li>";
            }).join("") +
            "</ul>";

        categoryResults.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    });

});// BLUE SHARK SHOPPING CART

const cart = [];

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

// Display all items in the cart
function displayCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.textContent =
            "Your cart is empty. Add a dessert to get started!";
    }

    let total = 0;

    cart.forEach(function(item, index) {

        total += item.price;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const itemName = document.createElement("span");
        itemName.textContent =
            item.name + " - KSh " + item.price.toLocaleString("en-KE");

        const removeButton = document.createElement("button");
        removeButton.textContent = "REMOVE";
        removeButton.type = "button";

        removeButton.addEventListener("click", function() {
            cart.splice(index, 1);
            displayCart();
        });

        cartItem.appendChild(itemName);
        cartItem.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItem);

    });

    cartTotalDisplay.textContent = total.toLocaleString("en-KE");
}

// Add desserts to the cart
document.querySelectorAll(".add-to-order").forEach(function(button) {

    button.addEventListener("click", function() {

        const productName = button.dataset.product;
        const productPrice = Number(button.dataset.price);

        if (!productName || !Number.isFinite(productPrice) ||
            productPrice <= 0) {
            return;
        }

        cart.push({
            name: productName,
            price: productPrice
        });

        displayCart();

    });

});

// Clear the entire cart
clearCartButton.addEventListener("click", function() {

    cart.length = 0;
    displayCart();

});

// Show the initial cart
displayCart();