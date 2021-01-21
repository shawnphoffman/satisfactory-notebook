import React, { memo, useCallback, useContext } from 'react'
import styled from 'styled-components'

import { ActionType, AppContext } from '../AppContext'

const RemoveIcon = ({ slug }) => {
	const [, dispatch] = useContext(AppContext)

	const handleClick = useCallback(() => dispatch({ type: ActionType.REMOVE_PRODUCT, slug }), [
		dispatch,
		slug,
	])

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
