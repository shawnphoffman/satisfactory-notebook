import React, { memo } from 'react'
import { styled } from '@linaria/react'

import { getItemDefinition } from 'loaders/items'

//
const ProductListItem = ({ slug, onClick }) => {
	const product = getItemDefinition(slug)
	return (
		<ListItem onClick={() => onClick(slug)}>
			{product.name} <i className="fas fa-times fa-fw" />
		</ListItem>
	)
}
export default memo(ProductListItem)

const ListItem = styled.li`
	color: darkred;
	cursor: pointer;
`
