import React, { memo } from 'react'
import * as Sentry from '@sentry/react'
import styled from 'styled-components'

import Page from 'components/Page'
import { getMachineCraftableProducts } from 'loaders/recipes'

import { AppContext } from '../AppContext'
// import Resource from 'components/Resource'
// const Page = React.lazy(() => import('components/Page'))
const Resource = React.lazy(() => import('components/Resource'))
// const Resource = React.lazy(() => {
// 	return Promise.all([
// 		import('components/Resource'),
// 		new Promise(resolve => {
// 			// setTimeout(() => {}, 3000)
// 			setTimeout(resolve, 3000)
// 		}),
// 	]).then(([module]) => module)
// })

// TODO - Change overall JSON strategy to async/await with useEffect

const ResourceFallback = ({ slug }) => (
	<ErrorWrapper>
		<i className="fa fa-bomb" />
		<span> An error occurred trying to render "{slug}". It has been reported and we will look into it.</span>
	</ErrorWrapper>
)

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
		<div style={{ width: '100%' }}>
			{products.map(p => (
				<Page key={p} id="page">
					<React.Suspense fallback={<Skeleton />}>
						<Sentry.ErrorBoundary fallback={<ResourceFallback slug={p} />}>
							<Resource slug={p} />
						</Sentry.ErrorBoundary>
					</React.Suspense>
				</Page>
			))}
		</div>
	)
}

export default memo(ProductList)

const Skeleton = styled.div`
	position: relative;
	overflow: hidden;
	height: 150px;
	border: 1px solid #999;
	border-radius: 5px;
	margin-top: 80px;

	::before {
		content: '';
		display: block;
		position: absolute;
		left: -150px;
		top: 0;
		height: 100%;
		width: 150px;
		background: linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);
		animation: load 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}
`

const ErrorWrapper = styled.div`
	color: #606060;

	@media print {
		display: none;
	}
`
