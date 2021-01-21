import React, { memo } from 'react'

import { getMachineCraftableProducts } from 'loaders/recipes'

import { AppContext } from '../AppContext'

const Resource = React.lazy(() => import('components/Resource'))
const Page = React.lazy(() => import('components/Page'))

// TODO - Change overall JSON strategy to async/await with useEffect

const ProductList = () => {
	const [{ removedProducts }] = React.useContext(AppContext)

	const products = React.useMemo(
		() =>
			getMachineCraftableProducts()
				// .slice(0, 15)
				.filter(p => !removedProducts.includes(p)),
		[removedProducts]
	)

	return (
		<div>
			{products.map(p => (
				<Page key={p}>
					<Resource slug={p} />
				</Page>
			))}
		</div>
	)
}

export default memo(ProductList)
