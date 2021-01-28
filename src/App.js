import React, { memo } from 'react'
import { styled } from '@linaria/react'
import * as Sentry from '@sentry/react'

import Error from 'components/Errors/AppError'
import Loading from 'components/Loaders/Loading'
import Sidebar from 'components/Sidebar/SidebarContainer'
import ProductContext from 'context/ProductContext'
import RecipeContext from 'context/RecipeContext'
import { importImageManifest } from 'loaders/imageMap'

const ProductList = React.lazy(() => import('components/ProductList'))
// const ProductList = React.lazy(() => {
// 	return Promise.all([
// 		import('components/ProductList'),
// 		new Promise(resolve => {
// 			// setTimeout(() => {}, 3000)
// 			setTimeout(resolve, 1000)
// 		}),
// 	]).then(([module]) => module)
// })

// Preload images
importImageManifest()

function App() {
	return (
		<Sentry.ErrorBoundary fallback={<Error />} showDialog={process.env.NODE_ENV === 'production'}>
			<ProductContext>
				<RecipeContext>
					<React.Profiler id="App">
						<FlexRows>
							<Sidebar />
							<React.Suspense fallback={<Loading />}>
								<ProductList />
							</React.Suspense>
						</FlexRows>
					</React.Profiler>
				</RecipeContext>
			</ProductContext>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)

const FlexRows = styled.div`
	display: flex;
	flex-direction: row;
	/* background: white; */

	@media (max-width: 600px) {
		flex-direction: column;
	}
`
