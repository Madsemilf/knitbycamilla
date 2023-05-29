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

