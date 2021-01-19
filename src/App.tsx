import React from 'react'

import { Page } from 'components/Print'
import Recipe from 'components/Recipe'
import { getMachineCraftableProducts } from 'loaders/recipes'
import { importImageManifest } from 'loaders/sgImageRepo'

// Preload images
importImageManifest()

function App() {
	const products = getMachineCraftableProducts() //.slice(0, 5)
	return (
		<>
			{products.map(p => (
				<Page key={p}>
					<Recipe slug={p} />
				</Page>
			))}
		</>
	)
}

export default App
