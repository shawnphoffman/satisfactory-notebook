import React, { memo } from 'react'
import { styled } from '@linaria/react'

// TODO - Don't do this!
import rawData from 'data/data-v4.json'

//
const ProductListItem = ({ slug, onClick }) => {
	const product = rawData[slug]
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
