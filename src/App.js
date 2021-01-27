import React, { memo } from 'react'
import { styled } from '@linaria/react'
import * as Sentry from '@sentry/react'

import Error from 'components/Errors/AppError'
import Loading from 'components/Loaders/Loading'
import ProductContext from 'context/ProductContext'
import RecipeContext from 'context/RecipeContext'
import { importImageManifest } from 'loaders/imageMap'

// const ProductList = React.lazy(() => {
// 	return Promise.all([
// 		import('components/ProductList'),
// 		new Promise(resolve => {
// 			// setTimeout(() => {}, 3000)
// 			setTimeout(resolve, 1000)
// 		}),
// 	]).then(([module]) => module)
// })
const ProductList = React.lazy(() => import('components/ProductList'))
const Sidebar = React.lazy(() => import('components/Sidebar/Sidebar'))

// Preload images
importImageManifest()

function App() {
	return (
		<ProductContext>
			<RecipeContext>
				<React.Suspense fallback={<Loading />}>
					<Sentry.ErrorBoundary fallback={<Error />} showDialog={true}>
						<FlexRows>
							<Sidebar />
							{/* <React.Suspense fallback={<div>Loading ProductList...</div>}> */}
							<ProductList />
							{/* </React.Suspense> */}
						</FlexRows>
					</Sentry.ErrorBoundary>
				</React.Suspense>
			</RecipeContext>
		</ProductContext>
	)
}

export default memo(App)

const FlexRows = styled.div`
	display: flex;
	flex-direction: row;
	background: white;

	@media (max-width: 600px) {
		flex-direction: column;
	}
`
