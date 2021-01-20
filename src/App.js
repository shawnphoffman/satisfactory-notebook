import React from 'react'
import styled from 'styled-components'

import { Page } from 'components/Print'
import Recipe from 'components/Recipe'
import Sidebar from 'components/Sidebar'
import { getMachineCraftableProducts } from 'loaders/recipes'
import { importImageManifest } from 'loaders/sgImageRepo'

import ContextProvider, { AppContext } from './AppContext'

// Preload images
importImageManifest()

const ProductList = React.memo(() => {
	const [{ removedProducts }] = React.useContext(AppContext)

	const products = getMachineCraftableProducts()
		// .slice(0, 15)
		.filter(p => !removedProducts.includes(p))

	return (
		<div>
			{products.map(p => (
				<Page key={p}>
					<Recipe slug={p} />
				</Page>
			))}
		</div>
	)
})

function App() {
	return (
		<ContextProvider>
			<FlexRows>
				<Sidebar />
				<ProductList />
			</FlexRows>
		</ContextProvider>
	)
}

export default App

const FlexRows = styled.div`
	display: flex;
	flex-direction: row;

	@media (max-width: 600px) {
		flex-direction: column;
	}
`
