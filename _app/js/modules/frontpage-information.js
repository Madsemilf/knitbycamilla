import { sanity } from '../sanity.js'

export default async function FrontpageInformationImage () {
	const informationImageContainer = document.querySelector('.frontpage-information');
	const query = `*[_type == 'pattern'] {
		Image {
			..., asset ->

    	}
  	}`;
 
	const patterns = await sanity.fetch(query);
