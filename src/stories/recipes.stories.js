import React from 'react'

import { Page } from 'components/Page'
import Recipe from 'components/Resource'

//
const storyConfig = {
	title: 'Recipes',
}
export default storyConfig

//
export const recipe = args => (
	<Page>
		<Recipe {...args} />
	</Page>
)

recipe.argTypes = {
	slug: {
		control: {
			type: 'select',
			// options: Object.keys(allItems).sort(),
		},
		// defaultValue: Object.keys(allItems).sort()[0],
	},
}
