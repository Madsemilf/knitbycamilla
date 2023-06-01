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