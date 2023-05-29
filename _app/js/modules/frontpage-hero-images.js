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

	function getRandomElements(array, count) {
		const shuffledPatterns = array.sort(() => 0.5 - Math.random());
		return shuffledPatterns.slice(0, count);
	}

	function createHeroImagesDOM(pattern) {
	  return `<div class="grid__column--6 frontpage-hero-image">
		 <img src="${pattern.Image.asset.url}" alt="Picture of knitted handbag">
	  </div>`;
	}

	function renderHeroImages () {
		for (const pattern of selectedPatterns) {
			const patternItem = createHeroImagesDOM(pattern);
			heroImagesContainer.innerHTML += patternItem;
		}
	}
	renderHeroImages();
 }
