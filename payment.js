// all initial elements
const payAmountBtn = document.querySelector('#payAmount');
const decrementBtn = document.querySelectorAll('#decrement');
const quantityElem = document.querySelectorAll('#quantity');
const incrementBtn = document.querySelectorAll('#increment');
const priceElem = document.querySelectorAll('#price');
const subtotalElem = document.querySelector('#subtotal');
const taxElem = document.querySelector('#tax');
const totalElem = document.querySelector('#total');


let ShoppingCart = document.getElementById("cart-item-box");
let label = document.getElementById("label");
let total = document.getElementById("total");
let total1 = document.getElementById("total1");
let grandTotal = document.getElementById("grandTotal");
let tax = document.getElementById("tax");

const tax_per = 0.05;


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
 *
 * */
 
  let generateCartItems = () => {
	if (basket.length !== 0) {
	  return (ShoppingCart.innerHTML = basket.map((x) => {
		  let { id, item } = x;
		  let search = shopItemsData.find((x) => x.id === id) || [];
		  let { img, price, name} = search;
		  return `
		  <div class="product-list">
			  <div class="cart">
				  <div class="sm-product">
					  <img width="100" src=${img} alt="${id}" class="sm-product-img" />
					 <div class="ttl-text"> 
					  <div class="sm-text">
						  <p class="sm-product-name">${name}</p>
						 
						  <p class="sm-product-price">RM ${price}</p>
					  
					  </div>
  
				
  
					  <p class="sm-total-price">RM ${item * price}</p>
					   </div> 
					 
				  </div>
		  
  
		  </div>  
  
		`;
		})
		.join(""));
	} else {
		total.innerHTML = "";
		ShoppingCart.innerHTML = `
		  <h3>You don't have any items in your cart yet.</h3>
	
		`;
	   
	  }
  };
  
  generateCartItems();

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
	  let amount = basket.map((x) => {
		  let { id, item } = x;
		  let filterData = shopItemsData.find((x) => x.id === id);
		  return filterData.price * item;
		}).reduce((x, y) => x + y, 0);

			 total.innerHTML = `
	  
	  <div class="checkout-section">

		<p class="bill">RM ${amount.toFixed(2)}</p>
		
	  </div>
	  `;

		let totalTax = amount*tax_per;
		tax.innerHTML =`  
	   RM ${totalTax.toFixed(2)} `;
	  
	   let grand = amount + totalTax + 10;
	   grandTotal.innerHTML =`  
	   <h2 id="grandTotal">RM ${grand.toFixed(2)}</h2> `;

	  
	  total1.innerHTML = `
	  
	  <div class="checkout-section">

		
		<span id="total1">PAY RM ${grand.toFixed(2)}</span>
	  </div>
	  `;
  
	} else{total1.innerHTML=`<div class="checkout-section">

		
	<span id="total1">PAY RM 0.00</span>
  </div>`;

total.innerHTML=`  <div class ="checkout-section">

<p class="bill">RM 0.00</p>

</div>`;

tax.innerHTML =`  
	   RM 0.00 `;


grandTotal.innerHTML =`  
<h2>RM 0.00</h2> `
  };
  
}
  

  TotalAmount();

// to hide the credit card method if the customer choose to cash on delivery method.

function payMethod(){
	var x = document.getElementById("cardMethod");
	if (x.style.display === "none") {
	  x.style.display = "block";
	} 
	else{x.style.display = "none"};
  }

 


// to show a message after all the validation check are checked and the format of the is correct

  function setApply() {
    document.forms[1].onsubmit = function(){
        if(this.checkValidity()) alert("Thank you for your Order!" + "\n");
        localStorage.clear();
		return true;
		
}}

// clear the cart(selected item) by clear the local storage

let clearCart = () => {
	basket = [];
	TotalAmount();
	generateCartItems();
	calculation();
	localStorage.setItem("data", JSON.stringify(basket));
  };
  

