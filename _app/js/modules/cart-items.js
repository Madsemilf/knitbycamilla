export default function CartItems() {
	let cartProducts = [];
	
	const cartContainer = document.querySelector('.cart-box')
	const emptyCartMessage = document.querySelector('.cart-box__empty-message--visible')
	const cartBoxContent = document.querySelector('.cart-box__content');
	const addToCartButtons = document.querySelectorAll('.products__product-add-to-cart')
	const cartEmptyButton = document.querySelector('.cart-box__button--empty');
	const cartCheckoutButton = document.querySelector('.cart-box__checkout-button');

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
