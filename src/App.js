import React from 'react'
import * as Sentry from '@sentry/react'
import styled from 'styled-components'

import Error from 'components/Error'
import Loading from 'components/Loading'
import { importImageManifest } from 'loaders/imageMap'

import ContextProvider from './AppContext'

// const ProductList = React.lazy(() => {
// 	return Promise.all([
// 		import('components/ProductList'),
// 		new Promise(resolve => {
// 			setTimeout(() => {}, 3000)
// 			// setTimeout(resolve, 3000)
// 		}),
// 	]).then(([module]) => module)
// })
const ProductList = React.lazy(() => import('components/ProductList'))
const Sidebar = React.lazy(() => import('components/Sidebar'))

// Preload images
importImageManifest()

function App() {
	return (
		<ContextProvider>
			<React.Suspense fallback={<Loading />}>
				<Sentry.ErrorBoundary fallback={<Error />} showDialog={false}>
					<FlexRows>
						<Sidebar />
						<ProductList />
					</FlexRows>
				</Sentry.ErrorBoundary>
			</React.Suspense>
		</ContextProvider>
	)
}

export default App

const FlexRows = styled.div`
	display: flex;
	flex-direction: row;
	background: white;

	@media (max-width: 600px) {
		flex-direction: column;
	}
`
