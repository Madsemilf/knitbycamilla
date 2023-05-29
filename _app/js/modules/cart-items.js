export default function CartItems() {
	let cartProducts = [];
	
	const cartContainer = document.querySelector('.cart-box')
	const emptyCartMessage = document.querySelector('.cart-box__empty-message--visible')
	const cartBoxContent = document.querySelector('.cart-box__content');
	const addToCartButtons = document.querySelectorAll('.products__product-add-to-cart')
	const cartEmptyButton = document.querySelector('.cart-box__button--empty');
	const cartCheckoutButton = document.querySelector('.cart-box__checkout-button');
	const cartTotalContainer = document.createElement('div');
	
	addToCartButtons.forEach(button => {
		button.addEventListener('click', handleAddToCartButtonClick);
	});
	
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
	}
	
	function emptyCart() {
		cartProducts = [];
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
	
	function render() {
		cartBoxContent.innerHTML = ''; // Clear the cart items before rendering
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
	 
		// Adds a total quantity and totale price in NOK at bottom of box content
		cartTotalContainer.classList.add('cart-box__total');
		cartTotalContainer.textContent = `Total Quantity: ${totalQuantity}, Total Price: ${totalPrice} NOK`;
		cartBoxContent.appendChild(cartTotalContainer);
	 }
}