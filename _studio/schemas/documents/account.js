export default {
	title: 'Account',
	name: 'account',
	type: 'document',
	fields: [
		{
			title: 'Username',
			name: 'username',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			title: 'Email',
			name: 'email',
			type: 'string',
			validation: (Rule) => Rule.required().email(),
		},
		{
			title: 'Password',
			name: 'password',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}
	]
};