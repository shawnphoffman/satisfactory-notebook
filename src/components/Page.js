import React, { memo, useContext } from 'react'
import { styled } from '@linaria/react'

import { ProductContext } from '../context/ProductContext'

export const Page = ({ children }) => {
	const [{ padLeftMargin, onePerPage }] = useContext(ProductContext)

	return (
		<PageBorder leftMargin={padLeftMargin} onePerPage={onePerPage}>
			<PageContent>{children}</PageContent>
		</PageBorder>
	)
}

export default memo(Page)

const PageBorder = styled.div`
	background: ${props => (props.debug ? 'lightgreen' : 'white')};
	border: ${props => (props.debug ? '1px solid black' : 'none')};
	width: 100%;
	padding: 4mm;
	padding-left: ${props => (props.leftMargin ? '12mm' : '4mm')};
	box-sizing: border-box;
	page-break-after: ${props => (props.onePerPage ? 'always' : 'inherit')};
	page-break-inside: ${props => (props.onePerPage ? 'inherit' : 'avoid')};

	@media print {
		background: none;
		border: none;
	}
`

const PageContent = styled.div`
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 4px;
`
