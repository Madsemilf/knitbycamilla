import { sanity } from "../sanity.js";
import { getURL } from "../util/getURL.js";

export default async function RenderPatternInformationPage() {
	const slug = getURL();
	console.log('slug:', slug);
	
	const query = `*[_type == 'pattern' && slug.current == '${slug}'] {
		_id,
		title,
		'slug': slug.current,
		price,
		description,
		agegroup,
		difficulty,
	}`;
	
	const patternInformationItems = await sanity.fetch(query);
	console.log(patternInformationItems);
	
	/**
	* 
	* 
	* @todo: Create pages to insert pattern information to the DOM.
	* @todo: Add layout to all elements.
	* Create pattern information DOM elements and append them to the pattern information container.
	*/
	function createPatternInformationDOM() {
		for (const patternInformationItem of patternInformationItems) {
			const patternInformationContainer = document.getElementById('pattern-information');
			
			// Create DOM elements for pattern information
			const patternInformation = document.createElement('div');
			const patternInformationImage = document.createElement('img');
			const patternInformationName = document.createElement('h2');
			const patternInformationDescription = document.createElement('p');
			const patternInformationPrice = document.createElement('p');
			const patternInformationAgeGroup = document.createElement('p');
			const patternInformationDifficulty = document.createElement('p');
			
			// Add class names to the pattern information elements
			patternInformation.className = 'pattern-information';
			patternInformationImage.className = 'pattern-information__image';
			patternInformationName.className = 'pattern-information__title';
			patternInformationDescription.className = 'pattern-pinformation__description';
			patternInformationPrice.className = 'pattern-information__price';
			patternInformationAgeGroup.className = 'pattern-information__age-group';
			patternInformationDifficulty.className = 'pattern-information__difficulty';
			
			// Set text content and source attributes for the pattern information elements
			patternInformationName.innerText = patternInformationItem.name;
			patternInformationImage.src = patternInformationItem.image;
			patternInformationDescription.innerText = patternInformationItem.description;
			patternInformationPrice.innerText = `${patternInformationItem.price},- NOK`;
			patternInformationAgeGroup.innerText = patternInformationItem.agegroup;
			patternInformationDifficulty.innerText = patternInformationItem.difficulty;
			
			// Append the pattern information element to the container
			patternInformationContainer.appendChild(patternInformation);
			
			// Append child elements to the pattern information element
			patternInformation.append(
				patternInformationImage,
				patternInformationName,
				patternInformationDescription,
				patternInformationPrice,
				patternInformationAgeGroup,
				patternInformationDifficulty
				);
			}
		}
		
		function renderHTML() {
			createPatternInformationDOM();
		};
		
		renderHTML();
		
	}