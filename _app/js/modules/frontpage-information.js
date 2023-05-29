import { sanity } from '../sanity.js'

export default async function FrontpageInformationImage () {
	const informationImageContainer = document.querySelector('.frontpage-information');
	const query = `*[_type == 'pattern'] {
		Image {
			..., asset ->

    	}
  	}`;
 
	const patterns = await sanity.fetch(query);

	if (document.body.classList.contains('home-page')) {
	
		// Randomly select one pattern
		const selectedPattern = getRandomElement(patterns, 1);

		function getRandomElement(array, count) {
			const shuffledPatterns = array.sort(() => 0.5 - Math.random());
			return shuffledPatterns.slice(0, count);
		}

		function createInformationImageDOM(pattern) {
		return `<div class="grid__column--6 frontpage-information-image">
			<img src="${pattern.Image.asset.url}" alt="Picture of different knitted products">
		</div>`;
		}

		function renderInformationImage () {
			for (const pattern of selectedPattern) {
				const patternImageItem = createInformationImageDOM(pattern);
				informationImageContainer.innerHTML += patternImageItem;
			}
		}
		renderInformationImage();
	}
}