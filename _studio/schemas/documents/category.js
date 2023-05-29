export default {
	title: 'Category',
	name: 'category',
	type: 'document',
	fields: [
		{
			title: 'Name',
			name: 'name',
			type: 'string',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name',
				slugify: input => input.toLowerCase().replace(/\s+/g, '-'),
			} 
		},
		{
			title: 'Preview',
			name: 'preview',
			type: 'image',
			options: {
			  hotspot: true,
			}
		},	
	]
}