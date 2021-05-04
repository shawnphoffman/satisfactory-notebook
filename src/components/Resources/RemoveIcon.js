import { memo, useCallback, useContext } from 'react'
import { styled } from '@linaria/react'
import * as Sentry from '@sentry/react'

import { ProductAction, ProductContext } from '../../context/ProductContext'

const RemoveIcon = ({ slug }) => {
	const [, dispatch] = useContext(ProductContext)

	const handleClick = useCallback(() => {
		dispatch({ type: ProductAction.REMOVE_PRODUCT, slug })

		Sentry.addBreadcrumb({
			category: 'product-removed',
			message: `Removed: ${slug}`,
			level: Sentry.Severity.Info,
		})
	}, [dispatch, slug])

	return (
		<Wrapper onClick={handleClick}>
			<i className="fas fa-times-circle" title="Remove" />
		</Wrapper>
	)
}

export default memo(RemoveIcon)

const Wrapper = styled.span`
	font-size: 16px;
	margin-left: 8px;
	margin-right: 8px;
	:hover {
		color: red;
	}
	@media (max-width: 400px) {
		display: none;
	}

	@media print {
		display: none;
	}
`
