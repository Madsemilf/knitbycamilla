import { sanity } from '../sanity.js'

export default async function FrontpageCategories () {
	const categoryContainer = document.querySelector('.frontpage-categories')
	const query = `*[_type == 'category'] {
		...,
		preview {
			..., asset ->
			
    	}
  	}`;

	const categories = await sanity.fetch(query);

	console.log(categories);

	function createCategoryImageDOM(category) {

		return `<div class="frontpage-catgories__category grid__column--3" data-name:"${category.name}">
		<a href="index.html" class="frontpage-categories-link">
		<button class="frontpage-categories-image">
			<img src="${category.preview.asset.url}" alt="">
		</button>
		<div>
			<button class="frontpage-catgories__category--button">${category.name}</button>
		</div>
		</a>
	</div>`
	}


	function renderCategoryImages () {
		for (const category of categories) {
			const categoryItem = createCategoryImageDOM(category);
			// categoryContainer.appendChild(categoryItem)

			categoryContainer.innerHTML += categoryItem;
		}
	}
	renderCategoryImages();
}