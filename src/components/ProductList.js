import React, { memo, unstable_useTransition as useTransition } from 'react'
import { styled } from '@linaria/react'
import * as Sentry from '@sentry/react'

// import { getMachineCraftableProducts } from 'loaders/recipes'
// import rawData from 'data/data.json'
import ResourceError from 'components/Errors/ResourceError'
import Resource from 'components/Resources/Resource'
import { ProductContext } from 'context/ProductContext'

import Loading from './Loaders/Loading'

// const Resource = React.lazy(() => import('components/Resources/Resource'))

const ProductList = () => {
	const [{ removedProducts, hiddenTypes }] = React.useContext(ProductContext)

	const [data, setData] = React.useState({})
	const [startTransition /*, isPending*/] = useTransition({
		// TODO
		timeoutMs: 3000,
	})

	//
	React.useEffect(() => {
		// console.log('data.json loading...')
		// setTimeout(() => {
		fetch('/data.json')
			.then(res => res.json())
			.then(data => {
				// console.log('data.json loaded')
				return startTransition(() => {
					setData(data)
				})
			})
			.catch(e => console.error(e))
		// }, 3000)
	}, [])

	//
	const filteredProducts = React.useMemo(() => {
		// console.log('memo.filteredProducts')

		const newData = Object.keys(data).reduce((memo, slug) => {
			// filtered items
			if (removedProducts.includes(slug)) return memo

			// hidden types
			if (hiddenTypes.includes(data[slug].type)) return memo

			// items without recipes (reference in ingredients)
			if (data[slug].recipes.length === 0) return memo

			memo[slug] = data[slug]
			return memo
		}, {})

		return newData
	}, [data, hiddenTypes, removedProducts])

	if (Object.keys(filteredProducts).length === 0) {
		// console.log('ProductList.loading')
		return <Loading />
	}

	// console.log('ProductList.render')

	return (
		<Wrapper>
			{Object.keys(filteredProducts).map(p => (
				<Sentry.ErrorBoundary key={p} fallback={<ResourceError slug={p} />}>
					<Resource slug={p} item={data[p]} />
				</Sentry.ErrorBoundary>
			))}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	max-width: 700px;
	background: white;
`

export default memo(ProductList)
