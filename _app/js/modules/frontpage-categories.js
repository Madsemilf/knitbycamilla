import { sanity } from '../sanity.js'

export default async function FrontpageCategories () {
	const frontpageCategoryContainer = document.querySelector('.frontpage-categories')
	const query = `*[_type == 'category'] {
		...,
		preview {
			..., asset ->
			
    	}
  	}`;

	const categories = await sanity.fetch(query);

	if (document.body.classList.contains('home-page')) {

		function createCategoryImageDOM(category) {
			
			const frontpageCategoryItem = document.createElement('div');
			const frontpageCategoryLink = document.createElement('a');
			const frontpageCategoryImageButton = document.createElement('button');
			const frontpageCategoryImage = document.createElement('img');
			const frontpageCategoryName = document.createElement('div');
			const frontpageCategoryButton = document.createElement('button');

			frontpageCategoryItem.setAttribute('data-name', category.name);

			frontpageCategoryItem.classList.add('frontpage-catgories__category', 'grid__column--3');
			frontpageCategoryImageButton.classList.add('frontpage-categories-image');
			frontpageCategoryLink.classList.add('frontpage-categories-link');
			frontpageCategoryButton.classList.add('frontpage-catgories__category--button');

			frontpageCategoryLink.href = '/pattern/index.html';
			frontpageCategoryImage.src = category.preview.asset.url;
			frontpageCategoryImage.alt = '';
			frontpageCategoryButton.textContent = category.name;
			
			frontpageCategoryContainer.appendChild(frontpageCategoryItem);
			frontpageCategoryItem.appendChild(frontpageCategoryLink);
			frontpageCategoryLink.appendChild(frontpageCategoryImageButton);
			frontpageCategoryImageButton.appendChild(frontpageCategoryImage);
			frontpageCategoryLink.appendChild(frontpageCategoryName);
			frontpageCategoryName.appendChild(frontpageCategoryButton);
		}

		function renderCategoryImages() {
			for (const category of categories) {
			createCategoryImageDOM(category);
			}
		}
		renderCategoryImages();
	}
}

// 	return `<div class="frontpage-catgories__category grid__column--3" data-name:"${category.name}">
		// 	<a href="/pattern/index.html" class="frontpage-categories-link">
		// 	<button class="frontpage-categories-image">
		// 		<img src="${category.preview.asset.url}" alt="">
		// 	</button>
		// 	<div>
		// 		<button class="frontpage-catgories__category--button">${category.name}</button>
		// 	</div>
		// 	</a>
		// </div>`
		// }
	
	
		// function renderCategoryImages () {
		// 	for (const category of categories) {
		// 		const categoryItem = createCategoryImageDOM(category);
		// 		// categoryContainer.appendChild(categoryItem)
	
		// 		categoryContainer.innerHTML += categoryItem;
		// 	}