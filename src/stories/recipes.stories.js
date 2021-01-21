import React from 'react'

import RecipeList from 'components/other/RecipeList'
import { Page } from 'components/Page'
import Recipe from 'components/Resource'
import { getAllItems } from 'loaders/items'

const allItems = getAllItems()

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
			options: Object.keys(allItems).sort(),
		},
		// defaultValue: Object.keys(allItems).sort()[0],
	},
}

//
export const recipeList = RecipeList
