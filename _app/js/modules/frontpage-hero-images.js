import { sanity } from '../sanity.js'

export default async function FrontpageHeroImages() {
	const heroImagesContainer = document.querySelector('.frontpage-hero-images');
	const query = `*[_type == 'pattern'] {
		Image {
			..., asset ->
			
		}
	}`;
	
	const patterns = await sanity.fetch(query);
	
	// Randomly select two patterns
	const selectedPatterns = getRandomElements(patterns, 2);
	
	// Create DOM elements for hero images
	function createHeroImagesDOM(pattern) {
		const heroImageItem = document.createElement('div');
		const heroImage = document.createElement('img');

		heroImageItem.classList.add('grid__column--6', 'frontpage-hero-image');
  
		heroImage.src = pattern.Image.asset.url;
		heroImage.alt = '';
		
		// // Add hover effect on mouseenter
		heroImage.addEventListener('mouseenter', () => {
		  const randomPattern = getRandomElements(patterns, 1)[0];
		  heroImage.src = randomPattern.Image.asset.url;
		});
  
		heroImage.addEventListener('mouseleave', () => {
		  heroImage.src = pattern.Image.asset.url;
		});
  
		heroImageItem.appendChild(heroImage);
		return heroImageItem;
	 }
  
	 function getRandomElements(array, count) {
		const shuffledPatterns = array.sort(() => 0.5 - Math.random());
		return shuffledPatterns.slice(0, count);
	 }
  
	 function renderHeroImages() {
		for (const pattern of selectedPatterns) {
		  const patternItem = createHeroImagesDOM(pattern);
		  heroImagesContainer.appendChild(patternItem);
		}
	 }
	
	if (document.body.classList.contains('home-page')) {
		renderHeroImages();
	}
	
	
}
