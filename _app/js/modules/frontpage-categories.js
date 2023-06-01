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
	
	/**
	* Create category image DOM elements and append them to the category container.
	* @param {Object} category - The category object.
	*/
	function createCategoryImageDOM(category) {
		// Create DOM elements
		const frontpageCategoryItem = document.createElement('div');
		const frontpageCategoryLink = document.createElement('a');
		const frontpageCategoryImageButton = document.createElement('button');
		const frontpageCategoryImage = document.createElement('img');
		const frontpageCategoryName = document.createElement('div');
		const frontpageCategoryButton = document.createElement('button');
		
		// Set data-name attribute
		frontpageCategoryItem.setAttribute('data-name', category.name);
		
		// Add CSS classes to elements
		frontpageCategoryItem.classList.add('frontpage-catgories__category', 'grid__column--3');
		frontpageCategoryImageButton.classList.add('frontpage-categories-image');
		frontpageCategoryLink.classList.add('frontpage-categories-link');
		frontpageCategoryButton.classList.add('frontpage-catgories__category--button');
		
		// Set href, image source, and button text content
		frontpageCategoryLink.href = '/pattern/index.html';
		frontpageCategoryImage.src = category.preview.asset.url;
		frontpageCategoryImage.alt = '';
		frontpageCategoryButton.textContent = category.name;
		
		// Append elements to their parent elements
		frontpageCategoryContainer.appendChild(frontpageCategoryItem);
		frontpageCategoryItem.appendChild(frontpageCategoryLink);
		frontpageCategoryLink.appendChild(frontpageCategoryImageButton);
		frontpageCategoryImageButton.appendChild(frontpageCategoryImage);
		frontpageCategoryLink.appendChild(frontpageCategoryName);
		frontpageCategoryName.appendChild(frontpageCategoryButton);
	}
	
	/**
	* Render category images by creating DOM elements for each category.
	*/
	function renderCategoryImages() {
		// Iterate over categories and create category image DOM elements
		for (const category of categories) {
			createCategoryImageDOM(category);
		}
	}
	
	// Check if the page is the home page
	if (document.body.classList.contains('home-page')) {
		// Render category images
		renderCategoryImages();
	}
}