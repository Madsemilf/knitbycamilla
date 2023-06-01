import { sanity } from '../sanity.js';

export default async function fetchPatterns() {
	const query = `*[_type == 'pattern'] {
		...,
		Image {
			..., asset->
		},
		category-> {
			..., 
			'slug': slug.current
		},
		difficulty,
		agegroup
	}`;
	
	const patterns = await sanity.fetch(query);
	
	console.log(patterns);
	for (const pattern of patterns) {
		console.log(pattern.slug.current)
		const category = pattern.category;
		console.log(category.name); 
		console.log(category.slug.current); 
		
		return patterns;
	}
}
