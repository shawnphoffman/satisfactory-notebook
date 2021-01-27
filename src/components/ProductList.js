import React, { memo } from 'react'
import * as Sentry from '@sentry/react'

import ResourceError from 'components/Errors/ResourceError'
import Resource from 'components/Resources/Resource'
import { ProductContext } from 'context/ProductContext'
import { getMachineCraftableProducts } from 'loaders/recipes'

// const Resource = React.lazy(() => import('components/Resources/Resource'))

const ProductList = () => {
	const [{ removedProducts }] = React.useContext(ProductContext)

	const products = React.useMemo(
		() =>
			getMachineCraftableProducts()
				// .slice(0, 1)
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
