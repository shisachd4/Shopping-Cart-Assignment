import "../styles/common.scss";
import "../styles/header.scss";
import "../styles/home.scss";
import "../styles/signUp.scss";
import "../styles/plp.scss";



const logOut = () => {
    let logout = confirm("Do you want to log out?")
    if (logout) {
        localStorage.setItem("isLoggedIn", false);
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        window.location.assign("/login.html");
    }
}
if (localStorage.getItem("isLoggedIn") === "true") {
    const user = JSON.parse(localStorage.getItem("loggedInUser"))
    const template = document.createElement('p');
    template.classList.add('userName');
    template.innerHTML = `Welcome ${user.fName} ${user.lName}`;
    template.addEventListener('click', logOut);
    document.querySelector(".login-signup").replaceChild(template, document.querySelector(".login-signup ul"));
}
let cart = [];
const updateCart = (data) => {
    let cartCount = 0;
    data ? localStorage.setItem("cart", JSON.stringify(data)) : '';

    cart = JSON.parse(localStorage.getItem("cart")) || [];
    for (let i = 0; i < cart.length; i++) {
        cartCount += cart[i].count;
    }
    document.querySelector(".cart-items").innerHTML = cartCount + ' Items'
    document.querySelector(".cart-count").innerHTML = '(' + cartCount + ' Items)';
    const productContainer = document.querySelector('.cart-product-container');
    const cartBanner = document.querySelector('.cart-banner');
    const cartFooter = document.querySelector('.cart-footer');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartStart = document.querySelector('.cart-start');
    productContainer.innerHTML = "";
    let totalAmount = 0;
    cart.forEach(cartItem => {
        const content = `
            <div class="cart-product">
                <div class="product-img">
                    <img src="${cartItem.imageURL}" alt="${cartItem.name}">
                </div>
                <div class="product-desc">
                    <div class="product-name">
                        <h4>${cartItem.name}</h4>
                    </div>
                    <div class="product-count-container">
                        <div class="product-count">
                            <button class="subract" data-id="${cartItem.id}">-</button>
                            <span>${cartItem.count}</span>
                            <button class="add" data-id="${cartItem.id}">+</button>
                        </div>
                        <div class="product-amount">
                            <span>X</span>
                            <span>Rs.${cartItem.price}</span>
                        </div>
                    </div>
                </div>
                <div class="product-total-price">${cartItem.price * cartItem.count}</div>
            </div>
        `;
        productContainer.innerHTML += content;
        totalAmount += cartItem.price * cartItem.count;
    });

    document.querySelector(".cart-checkout span").innerHTML = totalAmount + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>';
    if (cart.length) {
        document.querySelectorAll(".product-count .subract").forEach(item => { item.addEventListener("click", decreaseItem); })
        document.querySelectorAll(".product-count .add").forEach(item => { item.addEventListener("click", increaseItem); })
        cartBanner.style.display = "flex";
        cartFooter.style.display = "block";
        cartEmpty.style.display = "none";
        cartStart.style.display = "none";
    }
    else {
        cartBanner.style.display = "none";
        cartFooter.style.display = "none";
        cartEmpty.style.display = "block";
        cartStart.style.display = "block";
    }
}

const cartModal = document.querySelector(".cart-container");
const showCart = () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("Kindly Login to view cart");
        return;
    }
    updateCart();
    cartModal.style.display = "block";
}
const increaseItem = (e) => {
    const id = e.target.getAttribute("data-id");
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            if (cart[i].count < cart[i].stock) {
                cart[i].count++
            }
            else {
                alert("Maximum limit reached for this product")
            }
        }
    }
    updateCart(cart);
}
const decreaseItem = (e) => {
    const id = e.target.getAttribute("data-id");
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            if (cart[i].count > 1) {
                cart[i].count--
            }
            else {
                cart.splice(i, 1)
            }
        }
    }
    updateCart(cart);
}
document.querySelector(".shopping-cart").addEventListener("click", showCart);
document.querySelector(".cart-close").addEventListener("click", () => { cartModal.style.display = "none"; });
document.querySelector(".cart-start").addEventListener("click", () => { window.location.assign("/plp.html"); });
updateCart();  
