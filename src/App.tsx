import React from 'react'
import styled from 'styled-components'

import { Page } from 'components/Print'
import Recipe from 'components/Recipe'
import Sidebar from 'components/Sidebar'
import { getMachineCraftableProducts } from 'loaders/recipes'
import { importImageManifest } from 'loaders/sgImageRepo'

import ContextProvider from './AppContext'

// Preload images
importImageManifest()

function App() {
	const products = getMachineCraftableProducts().slice(0, 15)

	return (
		<ContextProvider>
			<FlexRows>
				<Sidebar />
				<div>
					{products.map(p => (
						<Page key={p}>
							<Recipe slug={p} />
						</Page>
					))}
				</div>
			</FlexRows>
		</ContextProvider>
	)
}

export default App

const FlexRows = styled.div`
	display: flex;
	flex-direction: row;
`
