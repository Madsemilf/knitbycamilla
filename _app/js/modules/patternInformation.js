import { sanity } from "../sanity.js";
import { readURL } from "../util/readURL.js";

export default async function RenderPatternInformationPage() {
	const slug = readURL();
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


	function createPatternInformationDOM() {
		for (const patternInformationItem of patternInformationItems) {

			const patternInformationContainer = document.getElementById('pattern-information');

			const patternInformation = document.createElement('div');
			const patternInformationImage = document.createElement('img');
			const patternInformationName = document.createElement('h2');
			const patternInformationDescription = document.createElement('p');
			const patternInformationPrice = document.createElement('p');
			const patternInformationAgeGroup = document.createElement('p');
			const patternInformationDifficulty = document.createElement('p');
			
			patternInformation.className = 'pattern-information';
			patternInformationImage.className = 'pattern-information__image';
			patternInformationName.className = 'pattern-information__title';
			patternInformationDescription.className = 'pattern-pinformation__description';
			patternInformationPrice.className = 'pattern-information__price';
			patternInformationAgeGroup.className = 'pattern-information__age-group';
			patternInformationDifficulty.className = 'pattern-information__difficulty';

			patternInformationName.innerText = patternInformationItem.name;
			patternInformationImage.src = patternInformationItem.image;
			patternInformationDescription.innerText = patternInformationItem.description;
			patternInformationPrice.innerText = `${patternInformationItem.price},- NOK`;
			patternInformationAgeGroup.innerText = patternInformationItem.agegroup;
			patternInformationDifficulty.innerText = patternInformationItem.difficulty;

			patternInformationContainer.appendChild(patternInformation);

			patternInformation.append(
				patternInformationImage,
				patternInformationName,
				patternInformationDescription,
				patternInformationPrice,
				patternInformationAgeGroup,
				patternInformationDifficulty
			);
		};		
	};

	function renderHTML() {
		createPatternInformationDOM();
	};

	renderHTML();

}