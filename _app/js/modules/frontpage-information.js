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
		
		const selectedPattern = getRandomElement(patterns, 1);
		
		function getRandomElement(array, count) {
			const shuffledPatterns = array.sort(() => 0.5 - Math.random());
			return shuffledPatterns.slice(0, count);
		}
		
		function createInformationImageDOM(pattern) {
			const informationImageItem = document.createElement('div');
			const informationImage = document.createElement('img');
			
			informationImageItem.classList.add('grid__column--6', 'frontpage-information-image');
			
			informationImage.src = pattern.Image.asset.url;
			informationImage.alt = 'Picture of different knitted products';
			
			informationImageItem.appendChild(informationImage);
			return informationImageItem;
		}
		
		function renderInformationImage() {
			for (const pattern of selectedPattern) {
				const patternImageItem = createInformationImageDOM(pattern);
				informationImageContainer.appendChild(patternImageItem);
			}
		}
		
		renderInformationImage();
	}
}