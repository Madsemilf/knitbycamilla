export default {
	title: 'Pattern',
	name: 'pattern',
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
      	title: 'Product ID',
      	name: 'Productid',
      	type: 'string',
    },
		{
			title: 'Description',
			name: 'description',
			type: 'text',
		},
		{
			title: 'Price',
			description: 'Price in NOK',
			name: 'price',
			type: 'number',
		},
		{
			title: 'Age Group',
			name: 'agegroup',
			type: 'string',
			options: {
			  list: ['Adult','Child'],
			}
		},
		{
			title: 'Category',
			name: 'category',
			type: 'reference',
			to: { type: 'category' },
		},
		{
			title: 'Needle',
			name: 'needle',
			type: 'string',
		},
		{
			title: 'Difficulty',
			name: 'difficulty',
			type: 'string',
			options: {
				list: ['Beginner', 'Intermediate', 'Advanced'],
			 },
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image',
			options: {
			  hotspot: true,
			}
		},	
	]
}