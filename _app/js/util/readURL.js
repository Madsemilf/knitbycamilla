export function readURL() {
	
	/**
	 * Extracts a slug from the current URL's query string.
	 * @returns {string | undefined} The extracted slug or undefined if not found.
	 */
	const allURL = window.location.href;

	if (allURL.includes('')) {
		const slug = window.location.search;
		return slug.slice(1);
	}
	return undefined;
}