export default {
	title: 'Settings',
	name: 'settings',
	type: 'document',
	fields: [
		{
			title: 'Frontpage',
			name: 'frontpage',
			type: 'object',
			fields: [
				{
					title: 'Images at top',
					name: 'heroImages',
					type: 'array',
					of: [{ type: 'image' }]
				},
			]
		},
		{
			title: 'Social media links',
			name: 'socialMediaLinks',
			type: 'array',
			of: [
				{
					type:'object',
					fields: [
						{
							title: 'Name',
							name: 'name',
							type: 'string',
						},
						{
							title: 'URL',
							name: 'url',
							type: 'url',
						}
					]
				}
			]
		}
	]
}