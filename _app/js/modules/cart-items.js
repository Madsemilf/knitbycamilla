export default function CartItems() {
	const cartContainer = document.querySelector('.cart-box')
	const emptyCartMessage = document.querySelector('.cart-box__empty-message--visible')
	const cartBoxContent = document.querySelector('.cart-box__content');
	const addToCartButtons = document.querySelectorAll('.products__product-add-to-cart')
	const cartEmptyButton = document.querySelector('.cart-box__button--empty');
	const cartCheckoutButton = document.querySelector('.cart-box__checkout-button');

	function addToCart(button) {
		const clickedButtonDataset = button.parentNode.dataset;
		const product = {
			id: clickedButtonDataset.id,
			name: clickedButtonDataset.name,
			price: clickedButtonDataset.price,
			quantity: 1, 
		}
		
		const matchInCart = cartProducts.find(product => product.id === clickedButtonDataset.id)
