import {sanity} from '../sanity.js';
// import formatPrice from '../util/format-price.js';

export default async function PatternProducts() {
	const patternsContainer = document.querySelector('.products');
	const query = `*[_type == 'pattern'] {
		...,
		Image {
			..., asset->
		}
	}`;

	const patterns = await sanity.fetch(query);

	if (document.getElementById('pattern-products')) {

		// function createPatternItemDOM(pattern_document) {
		// 	const product = document.createElement('div');
		// 	const productImage = document.createElement('div');
		// 	const productImg = document.createElement('img');
		// 	const productInformation = document.createElement('div');
		// 	const productName = document.createElement('div');
		// 	const productPrice = document.createElement('div');
		// 	const productAddToCartButton = document.createElement('button');
	
		// 	// return product;
		// }
	
		// function createPatternItemDOMTheWrongWay(pattern_document) {
		// 	return `<div class="frontpage-products__product box grid__column--3" data-id="${pattern_document._id}" data-name="${pattern_document.name}" data-price="${product_document.price}">
		// 		<div class="frontpage-products__product-image">
		// 			<img class="frontpage-products__product-img" src="${pattern_document.preview.asset.url}?w=800" alt="">
		// 		</div>
	
		// 		<div class="frontpage-products__product-information">
		// 			<div class="frontpage-products__product-name">${pattern_document.name}</div>
		// 			<div class="frontpage-products__product-price">${formatPrice(pattern_document.price)}</div>
		// 		</div>
	
		// 		<button class="frontpage-products__product-add-to-cart-button input-button">Add to Cart</button>
		// 	</div>`;
		// }
	
		function createPatternItemDOM(pattern_document) {
		const product = document.createElement('div');
		product.classList.add('products__product', 'box', 'grid__column--3');
		product.setAttribute('data-id', pattern_document._id);
		product.setAttribute('data-name', pattern_document.name);
		product.setAttribute('data-price', pattern_document.price);

		const productImage = document.createElement('div');
		productImage.classList.add('products__product-image');
		product.appendChild(productImage);

		const productImg = document.createElement('img');
		productImg.classList.add('products__product-img');
		productImg.src = `${pattern_document.Image.asset.url}`;
		productImg.alt = '';
		productImage.appendChild(productImg);

		const productInformation = document.createElement('div');
		productInformation.classList.add('products__product-information');
		product.appendChild(productInformation);

		const productName = document.createElement('div');
		productName.classList.add('frontpage-products__product-name');
		productName.textContent = pattern_document.name;
		productInformation.appendChild(productName);

		const productPrice = document.createElement('div');
		productPrice.classList.add('products__product-price');
		productPrice.textContent = pattern_document.price + ' NOK';
		productInformation.appendChild(productPrice);

		const productAddToCartButton = document.createElement('button');
		productAddToCartButton.classList.add('products__product-add-to-cart', 'input-button');
		productAddToCartButton.textContent = 'Add to Cart';
		product.appendChild(productAddToCartButton);

		return product;
		}
	
		// <!-- <div class="products__product box grid__column--4" data-id="${product_document._id}" data-name="${product_document.name}" data-price="${product_document.price}">
		// 			<div class="products__product-image">
		// 				<img class="products__product-img" src="${product_document.Image.asset.url}" alt="">
		// 			</div>
	
		// 			<div class="products__product-information">
		// 				<div class="products__product-name">${product_document.name}</div>
		// 				<div class="products__product-price">${product_document.price}</div>
		// 			</div>
	
		// 			<button class="products__product-add-to-cart input-button">Add to Cart</button>
		// 		</div>
	
	
		// function insertPatternItemsTheWrongWay() {
		// 	for (const pattern of patterns) {
		// 		const productItem = createPatternItemDOMTheWrongWay(pattern);
		// 		patternsContainer.innerHTML += productItem;
		// 	}
		// }
	
		function insertPatternItems() {
			for (const pattern of patterns) {
			  const patternItem = createPatternItemDOM(pattern);
			  patternsContainer.appendChild(patternItem);
			}
		 }
	
		function render() {
			// insertPatternItemsTheWrongWay();
			insertPatternItems();
		}
	
		render();
	}
	
}