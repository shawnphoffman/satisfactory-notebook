import { memo, useContext } from 'react'
import styled from 'styled-components'

import { AppContext } from '../AppContext'

export const Page = ({ children }) => {
	const [{ padLeftMargin, onePerPage }] = useContext(AppContext)

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
	${props => (props.leftMargin ? 'padding-left: 12mm' : null)};
	box-sizing: border-box;

	${props => (props.onePerPage ? 'page-break-after: always' : 'page-break-inside: avoid')};

	@media print {
		background: none;
		border: none;
	}
`

const PageContent = styled.div`
	/* background: ${props => (props.debug ? 'lightcoral' : 'white')}; */
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 4px;
`
