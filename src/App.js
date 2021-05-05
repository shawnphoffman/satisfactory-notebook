import React, { lazy, memo, useContext } from 'react'
import { styled } from '@linaria/react'
import * as Sentry from '@sentry/react'

import Error from 'components/Errors/AppError'
import Loading from 'components/Loaders/Loading'
import Sidebar from 'components/Sidebar/SidebarContainer'
import ProductContext, { ProductContext as ProductCtx } from 'context/ProductContext'
import RecipeContext from 'context/RecipeContext'

const ProductList = lazy(() => import('components/ProductList'))
// const ProductList = lazy(() => {
// 	return Promise.all([
// 		import('components/ProductList'),
// 		new Promise(resolve => {
// 			// setTimeout(() => {}, 3000)
// 			setTimeout(resolve, 1000)
// 		}),
// 	]).then(([module]) => module)
// })

function App() {
	return (
		<Sentry.ErrorBoundary fallback={<Error />} showDialog={process.env.NODE_ENV === 'production'}>
			<ProductContext>
				<RecipeContext>
					<React.Profiler id="App">
						<FlexRows>
							<Sidebar />
							<ProductListWrapper />
						</FlexRows>
					</React.Profiler>
				</RecipeContext>
			</ProductContext>
		</Sentry.ErrorBoundary>
	)
}

const ProductListWrapper = () => {
	const [{ showV3 }] = useContext(ProductCtx)
	return (
		<React.Suspense fallback={<Loading />}>
			{showV3 && <ProductList version="v3" />}
			<ProductList />
		</React.Suspense>
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
