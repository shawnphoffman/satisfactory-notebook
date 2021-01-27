/** @jsxImportSource @welldone-software/why-did-you-render */
import React, { memo } from 'react'
import * as Sentry from '@sentry/react'

import { getMachineCraftableProducts } from 'loaders/recipes'

import ResourceError from './Errors/ResourceError'
import { ProductContext } from '../context/ProductContext'

const Resource = React.lazy(() => import('components/Resources/Resource'))
// const Resource = React.lazy(() => {
// 	return Promise.all([
// 		import('components/Resource'),
// 		new Promise(resolve => {
// 			// setTimeout(() => {}, 3000)
// 			setTimeout(resolve, 3000)
// 		}),
// 	]).then(([module]) => module)
// })

const ProductList = () => {
	const [{ removedProducts }] = React.useContext(ProductContext)

	const products = React.useMemo(
		() =>
			getMachineCraftableProducts()
				.slice(0, 1)
				.filter(p => !removedProducts.includes(p)),
		[removedProducts]
	)

	return (
		<div style={{ width: '100%' }}>
			{products.map(p => (
				<Sentry.ErrorBoundary key={p} fallback={<ResourceError slug={p} />}>
					<Resource slug={p} />
				</Sentry.ErrorBoundary>
			))}
		</div>
	)
}

export default memo(ProductList)
