export default function CartItems() {
	
	let cartProducts = getCartItemsLocally();
	
	const cartContainer = document.querySelector('.cart-box')
	const emptyCartMessage = document.querySelector('.cart-box__empty-message--visible')
	const cartBoxContent = document.querySelector('.cart-box__content');
	const addToCartButtons = document.querySelectorAll('.products__product-add-to-cart')
	const cartEmptyButton = document.querySelector('.cart-box__button--empty');
	const cartCheckoutButton = document.querySelector('.cart-box__checkout-button');
	const cartCountElement = document.querySelector('.navigation__cart-count');
	const cartTotalContainer = document.createElement('div');
	
	if (cartContainer !== null) {
		addToCartButtons.forEach(button => {
			button.addEventListener('click', handleAddToCartButtonClick);
		});
	}
	
	
	cartEmptyButton.addEventListener('click', handleCartEmptyButtonClick);
	// cartCheckoutButton.addEventListener('click', handleCartCheckoutButtonClick);
	
	function handleAddToCartButtonClick(event) {
		const button = event.currentTarget;
		
		addToCart(button);
		render();
		
	}
	
	function handleCartEmptyButtonClick() {
		emptyCart();
		render();
		
	}
	
	// function handleCartCheckoutButtonClick() {
	// 	checkout();
	// 	render();
	// }
	
	
	function addToCart(button) {
		const clickedButtonDataset = button.parentNode.dataset;
		const product = {
			id: clickedButtonDataset.id,
			name: clickedButtonDataset.name,
			price: clickedButtonDataset.price,
			quantity: 1, 
		}
		
		const matchInCart = cartProducts.find(product => product.id === clickedButtonDataset.id)
		
		if(matchInCart) {
			matchInCart.quantity += 1;
		} else {
			cartProducts.push(product);
		}
		storeCartItemsLocally();
	}
	
	
	function emptyCart() {
		cartProducts = [];
		
		storeCartItemsLocally();
	}
	
	function createCartItemDOM(product) {
		const cartItem = document.createElement('div');
		cartItem.classList.add('cart-box__item');
		
		const quantity = document.createElement('div');
		quantity.textContent = product.quantity;
		cartItem.appendChild(quantity);
		
		const name = document.createElement('div');
		name.textContent = product.name;
		cartItem.appendChild(name);
		
		const price = document.createElement('div');
		price.classList.add('cart-box__item-price');
		price.textContent = product.price;
		cartItem.appendChild(price);
		
		return cartItem;
	}
	
	// Clear the cart items before rendering. 
	// Checks how many items are in the cart. Runs message if empty.
	// Iterate over products in the cart, and calculates total price.
	
	function render() {
		cartBoxContent.innerHTML = ''; 
		let totalQuantity = 0;
		let totalPrice = 0;
		
		if (cartProducts.length > 0) {
			emptyCartMessage.classList.remove('cart-box__empty-message--visible');
			cartProducts.forEach(product => {
				const cartItem = createCartItemDOM(product);
				cartBoxContent.appendChild(cartItem);
				totalQuantity += product.quantity;
				totalPrice += product.quantity * product.price;
			});
		} else {
			emptyCartMessage.classList.add('cart-box__empty-message--visible');
		}
		
		// Adds a total quantity and total price in NOK at bottom of box content
		cartTotalContainer.classList.add('cart-box__total');
		cartTotalContainer.textContent = `Total Quantity: ${totalQuantity}, Total Price: ${totalPrice} NOK`;
		cartBoxContent.appendChild(cartTotalContainer);
		
		
		// Updates the cart counter = total quantity.
		cartCountElement.textContent = totalQuantity;
	}
	
	function storeCartItemsLocally() {
		const key = 'cart-items';
		const value = JSON.stringify(cartProducts);
		window.localStorage.setItem(key, value);
	}
	
	function getCartItemsLocally() {
		const key = 'cart-items';
		const cartItemsAsString = window.localStorage.getItem(key);
		
		if (cartItemsAsString) {
			return JSON.parse(cartItemsAsString);
		} else {
			return [];
		}
	}
	render() 
}