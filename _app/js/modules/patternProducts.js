import fetchPatterns from './fetchData.js';
import { filterPatterns } from './filterData.js';


export default async function PatternProducts() {
	
	const patternsContainer = document.querySelector('.products');
	
	if (document.body.classList.contains('product-page')) {
		
		const patterns = await fetchPatterns();
		renderAllPatterns();
		attachAddToCartListeners();
		
		function createPatternItemDOM(pattern_document) {
			const product = document.createElement('div');
			const productImage = document.createElement('div');
			const productImg = document.createElement('img');
			const productInformation = document.createElement('div');
			const productName = document.createElement('div');
			const productPrice = document.createElement('div');
			const productAddToCartButton = document.createElement('button');

			product.classList.add('products__product', 'box', 'grid__column--3');
			productImage.classList.add('products__product-image');
			productImg.classList.add('products__product-img');
			productInformation.classList.add('products__product-information');
			productName.classList.add('frontpage-products__product-name');
			productPrice.classList.add('products__product-price');
			productAddToCartButton.classList.add('products__product-add-to-cart', 'input-button');

			product.setAttribute('data-id', pattern_document._id);
			product.setAttribute('data-name', pattern_document.name);
			product.setAttribute('data-price', pattern_document.price);

			productImg.src = `${pattern_document.Image.asset.url}`;
			productImg.alt = `${pattern_document.name};`
			
			productName.textContent = pattern_document.name;
			productPrice.textContent = pattern_document.price + ' NOK';
			productAddToCartButton.textContent = 'Add to Cart';
			
			product.appendChild(productImage);
			productImage.appendChild(productImg);
			product.appendChild(productInformation);
			productInformation.appendChild(productName);
			productInformation.appendChild(productPrice);
			product.appendChild(productAddToCartButton);
		
			// Add event listener to the image
			productImg.addEventListener('click', () => {
			const slug = pattern_document.slug.current;
			// Redirect to the specific product page using the slug
			window.location.href = `${slug}`;
		});
			return product;
		}		
		
		function insertPatternItems(patterns) {
			patternsContainer.innerHTML = ''; // Clear the container
			
			for (const pattern of patterns) {
				const patternItem = createPatternItemDOM(pattern);
				patternsContainer.appendChild(patternItem);
			}
		}
	
		function insertFilteredPatternItems(ageGroup, difficulty, category) {
			let filteredPatterns = filterPatterns(patterns, ageGroup, difficulty, category);
			insertPatternItems(filteredPatterns);
			attachAddToCartListeners(); 
		}
		
		function attachAddToCartListeners() {
			const addToCartButtons = document.querySelectorAll('.products__product-add-to-cart');
			addToCartButtons.forEach(button => {
				button.removeEventListener('click', handleAddToCartButtonClick);
				button.addEventListener('click', handleAddToCartButtonClick);
			});
		}
		
		function renderAllPatterns() {
			insertPatternItems(patterns);
			attachAddToCartListeners();
		}
		
		function renderFilteredPatterns(selectedAgeGroup, selectedDifficulty, selectedCategory) {
			let filteredPatterns = patterns;
			
			if (selectedAgeGroup === 'select__age-child') {
				filteredPatterns = filterPatterns(filteredPatterns, 'Child');
			} else if (selectedAgeGroup === 'select__age-adult') {
				filteredPatterns = filterPatterns(filteredPatterns, 'Adult');
			}
			
			if (selectedDifficulty === 'select__difficulty-beginner') {
				filteredPatterns = filterPatterns(filteredPatterns, '', 'Beginner');
			} else if (selectedDifficulty === 'select__difficulty-intermediate') {
				filteredPatterns = filterPatterns(filteredPatterns, '', 'Intermediate');
			} else if (selectedDifficulty === 'select__difficulty-advanced') {
				filteredPatterns = filterPatterns(filteredPatterns, '', 'Advanced');
			}
			
			
			if (selectedCategory === 'select__category-sweaters') {
				filteredPatterns = filterPatterns(filteredPatterns, '', 'Sweaters');
			} else if (selectedCategory === 'select__category-jackets') {
				filteredPatterns = filterPatterns(filteredPatterns, '', 'Jackets');
			} else if (selectedCategory === 'select__category-vests') {
				filteredPatterns = filterPatterns(filteredPatterns, '', 'Vests');
			} else if (selectedCategory === 'select__category-accessories') {
				filteredPatterns = filterPatterns(filteredPatterns, '', 'Accessories');
			}
			
			
			insertPatternItems(filteredPatterns);
			attachAddToCartListeners(); 
		}
		
		function handleFiltersChange() {
			const selectAge = document.getElementById('select__age');
			const selectDifficulty = document.getElementById('select__difficulty');
			const selectCategory = document.getElementById('select__category');
			const selectedAgeGroup = selectAge.value;
			const selectedDifficulty = selectDifficulty.value;
			const selectedCategory = selectCategory.value;
			
			renderFilteredPatterns(selectedAgeGroup, selectedDifficulty, selectedCategory);
		}
		
		// Attach the event listeners to the select elements
		const selectAge = document.getElementById('select__age');
		const selectDifficulty = document.getElementById('select__difficulty');
		const selectCategory = document.getElementById('select__category');
		selectAge.addEventListener('change', handleFiltersChange);
		selectDifficulty.addEventListener('change', handleFiltersChange);
		selectCategory.addEventListener('change', handleFiltersChange);
		
		
		// Initial rendering of all patterns
		renderAllPatterns();
		attachAddToCartListeners();
	}
	
	/**
	 * HAD TO MOVE ALL THE CODE FROM cart-items.js TO ACTUALLY HANDLE ADD TO CART BUTTON CLICK ON RE-RENDERED ITEMS. 
	 * If code was not moved here, the "Add to cart" buttons would not work.
	 * 
	 * The cart is rendering after PatternProducts because it is an asynchronous function.
	 * The rendering of the cart happens befor the cart items are retrieved from local storage.
	 * @TODO Move render logic for cart items into a separate file  .
	 * 
	 */

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
		const quantity = document.createElement('div');
		const name = document.createElement('div');
		const price = document.createElement('div');

		cartItem.classList.add('cart-box__item');
		price.classList.add('cart-box__item-price');
		
		quantity.textContent = product.quantity;
		name.textContent = product.name;
		price.textContent = product.price;

		cartItem.appendChild(quantity);
		cartItem.appendChild(name);
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
	if (cartContainer !== null) {
		cartContainer.addEventListener('click', (event) => {
			if (event.target.classList.contains('products__product-add-to-cart')) {
				handleAddToCartButtonClick(event);
			} else if (event.target.classList.contains('cart-box__button--empty')) {
				handleCartEmptyButtonClick();
			}
		});
	}
	render();
}

