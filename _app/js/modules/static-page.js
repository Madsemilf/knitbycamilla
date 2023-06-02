import {sanity} from '../sanity.js';

export default async function StaticPage(pageSlug) {
	/**
	 * @TODO move sanity.fetch() call into a separate function
	 */
	const query = `*[_type == 'page' && slug.current == $slug && !(_id in path('drafts.**'))][0]`;

	const params = {
		slug: pageSlug
	}

	const page = await sanity.fetch(query, params);

	if (page) {
		// page is found
	} else {
		// 404 not found
	}
}