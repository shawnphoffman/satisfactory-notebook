import { memo, unstable_useTransition as useTransition, useContext, useEffect, useMemo, useState } from 'react'
import { styled } from '@linaria/react'
import * as Sentry from '@sentry/react'

// import rawData from 'data/data-v4.json'
import ResourceError from 'components/Errors/ResourceError'
import Resource from 'components/Resources/Resource'
import { ProductContext } from 'context/ProductContext'

import Loading from './Loaders/Loading'

// const Resource = lazy(() => import('components/Resources/Resource'))

const ProductList = () => {
	const [{ removedProducts, hiddenTypes }] = useContext(ProductContext)

	const [data, setData] = useState({})
	// const [data, setData] = useState(rawData)
	const [startTransition] = useTransition({
		// TODO
		timeoutMs: 3000,
	})

	//
	useEffect(() => {
		// console.log('data.json loading...')
		// setTimeout(() => {
		fetch('/data-v4.json')
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
	const filteredProducts = useMemo(() => {
		// console.log('memo.filteredProducts')

		const newData = Object.keys(data).reduce((memo, slug) => {
			// filtered items
			if (removedProducts.includes(slug)) return memo

			// hidden types
			const isHidden = hiddenTypes.filter(type => {
				return type.toLowerCase() === data[slug].category
			})
			if (isHidden.length > 0) return memo

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
	background: white;

	@media screen {
		max-width: 700px;
	}
`

export default memo(ProductList)
