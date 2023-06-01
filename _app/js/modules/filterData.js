/**
 * Filter the patterns based on the given criteria.
 * @param {Array} patterns - The array of patterns to filter.
 * @param {string} ageGroup - The age group to filter by.
 * @param {string} difficulty - The difficulty level to filter by.
 * @param {string} category - The category slug to filter by.
 * @returns {Array} - The filtered array of patterns.
 */

export function filterPatterns(patterns, ageGroup, difficulty, category) {
	let filteredPatterns = patterns;

	if (ageGroup) {
	  filteredPatterns = filteredPatterns.filter(pattern => pattern.agegroup === ageGroup);
	}
 
	if (difficulty) {
	  filteredPatterns = filteredPatterns.filter(pattern => pattern.difficulty === difficulty);
	}

	if (category) {
      filteredPatterns = filteredPatterns.filter(pattern => pattern.category && pattern.category.slug.current === category);
    }
 
	return filteredPatterns;
}