import {sanity} from '../sanity.js';

export default async function PatternProducts() {
	
	const query = `*[_type == 'pattern'] {
		...,
		Image {
			..., asset->
		}
	}`;

	const patterns = await sanity.fetch(query);

}