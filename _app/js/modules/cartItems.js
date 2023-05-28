export default function cartItems() {

	let cartBoxVisible = false;

	// Keep track of the number of items in the cart
	let cartItemCount = 0;

	// Get the cart window and empty cart message elements
	const cartButton = document.getElementById('navigation-cart-button')
	const cartBox = document.getElementById('cart-box');
	const cartEmptyMessage = document.getElementById('cart-empty-message');
	const cartCountElement = document.querySelector('.navigation__cart-count');

	// Add event listeners to open and close the cart window
	cartButton.addEventListener('click', handleCartButtonClick);

	function handleCartButtonClick() {
		toggleCartBox();
		renderHTML();
	}

	function toggleCartBox() {
		cartBoxVisible = !cartBoxVisible;
	}

	function renderHTML() {
		if (cartBoxVisible === true) {
			cartBox.classList.remove('cart-box--hide');
		} else {
			cartBox.classList.add('cart-box--hide')
		}	
	}

	// Function to update the cart count
	function updateCartCount(count) {
		cartItemCount = count;
		cartCountElement.textContent = cartItemCount;
 	}

	 updateCartCount(3)
}