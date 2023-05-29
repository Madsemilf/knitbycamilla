import { sanity } from '../sanity.js'

export default async function FrontpageInformationImage () {
	const informationImageContainer = document.querySelector('.frontpage-information');
	const query = `*[_type == 'pattern'] {
		Image {
			..., asset ->

    	}
  	}`;
 
	const patterns = await sanity.fetch(query);

	// Randomly select one pattern
	const selectedPattern = getRandomElement(patterns, 1);

	function getRandomElement(array, count) {
		const shuffledPatterns = array.sort(() => 0.5 - Math.random());
		return shuffledPatterns.slice(0, count);
	}
