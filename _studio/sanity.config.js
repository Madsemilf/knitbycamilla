import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './schemas/schemas.js';

export default {
	title: 'knitByCamilla',

	projectId: '40xf8jbi',
	dataset: 'production',

	plugins: [
		deskTool(), 
		visionTool()
	],

	schema: {
		types: schemas,
	},
};
