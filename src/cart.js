let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");
let total = document.getElementById("total");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

/**
 * ! Generates the Cart Page with product cards composed of
 * ! images, title, price, buttons, & Total price
 * ? When basket is blank -> show's Cart is Empty
 */


let generateCartItems = () => {
  if (basket.length !== 0) {
    label.innerHTML = ` <p class="section-heading">Your Order</p>
    <a class="goShop" href="gift.html"><i class="fa fa-long-arrow-left"></i>Continue Shopping</a>`;
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        let { img, price, name} = search;
        return `


        <div class="product-list">
            <div class="cart">
                <div class="sm-product">
                    <img width="100" src=${img} alt="${id}" class="sm-product-img" />

                    <div class="sm-text">
                        <p class="sm-product-name">${name}</p>
                       
                        <p class="sm-product-price">$ ${price}</p>
                    
                    </div>

                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg">-</i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg">+</i>
                    </div>


                    <p class="sm-total-price">$ ${item * price}</p>
                    <button  class="sm-delete-btn" onclick="removeItem(${id})"><i class="fa fa-times"></i>
                    </button>
                   
                </div>
        

        </div>
      `;
      })
      .join(""));
  } else {
    total.innerHTML = "";
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
 
    <div class="cart-section">
    <div class="noProduct">

      <p class="section-heading">Your Cart</p>
      <div class="cart">
      <h3>You don't have any items in your cart yet. <a href="gift.html"><button class="con_shop">Continue shopping! <i class="fa fa-shopping-bag"></i></button></a></h3>
      <img src="addToCart/empty-cart.png" style="width: 50%; margin: auto; display:flex; align-content: center" alt="">
      </div>
    </div>
  <div class="ZeroCheckout">
    <div class="checkout-box">
      <p class="text">your total bill,</p>
      <h2 class="bill">$00</h2>
      <a onclick="alert('Please add item into your shopping cart first!')" class="checkout-btn">checkout</a>

    </div>
  </div>
</div>

    
    `;
   
  }
};

generateCartItems();



/**
 * ! used to increase the selected product item quantity by 1
**/

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

/**
 * ! Used to remove 1 selected product card from basket
 * ! using the X [cross] button
 */

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Used to calculate total amount of the selected Products
 * ! with specific quantity
 * ? When basket is blank, it will show nothing
 */

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (total.innerHTML = `
    
    <div class="checkout-section">
    <div class="checkout-box">
    <div class="ttl-clear">
      <p class="text">your total bill,</p>
      <p class="clearCart" onclick="clearCart()" >Remove All</p>
      </div>
      <h2 class="bill">$${amount}</h2>
      <a href="payment.html" class="checkout-btn">checkout</a>

    </div>
    `);
  } else return;
};

TotalAmount();

/**
 * ! Used to clear cart, and remove everything from local storage
 */

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
