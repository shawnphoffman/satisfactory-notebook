import React from 'react'
import styled from 'styled-components'

import ProductList from 'components/ProductList'
import Sidebar from 'components/Sidebar'
import { importImageManifest } from 'loaders/imageMap'

import ContextProvider from './AppContext'

// Preload images
importImageManifest()

function App() {
	return (
		<ContextProvider>
			<React.Suspense fallback={<div>Loading...</div>}>
				<FlexRows>
					<Sidebar />
					<ProductList />
				</FlexRows>
			</React.Suspense>
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
