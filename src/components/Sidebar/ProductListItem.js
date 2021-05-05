import React, { memo } from 'react'
import { styled } from '@linaria/react'

//
const ProductListItem = ({ name, onClick }) => {
	return (
		<ListItem onClick={() => onClick(name)}>
			{name} <i className="fas fa-times fa-fw" />
		</ListItem>
	)
}
export default memo(ProductListItem)

const ListItem = styled.li`
	color: darkred;
	cursor: pointer;
`
