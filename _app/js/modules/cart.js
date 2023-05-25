export default function emptyCart() {
	const cartLink = document.getElementById('navigation__cart-link');
	const cartCount = document.querySelector('.navigation__cart-count');

	cartLink.addEventListener('click', handleCartLinkClick);

	function handleCartLinkClick() {
		if (cartCount.textContent === '0') {
			alert('No items in cart');
		};
	};
}