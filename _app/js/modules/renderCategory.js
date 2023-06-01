import { sanity } from "../sanity.js";
import { readURL } from "../util/readURL.js";
import PatternProducts from "./patternProducts.js";

export default async function RenderCategory() {
	const slug = readURL();
	const query = `*[_type == 'product' && category->slug.current == '${slug}'] {
		_id,
		name,
		Image {
			..., asset->
		},
		'slug': slug.current,
		price,
		description
	}`;

	const category = await sanity.fetch(query);

	console.log(category)

	if (category) {
		// Render only the PatternProducts with the matching category slug
		PatternProducts(category);
	 } else {
		// Handle case when category is not found
		console.log(`Category with slug not found.`);
	 }

}