import { useContext } from 'react'
import styled from 'styled-components'

import AppContext from '../AppContext'

const pageSize = {
	a5: {
		height: 210,
		width: 148.5,
		left: 12,
	},
}

export const Inch = styled.div`
	width: 1in;
	height: 1in;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	background: lightcyan;
	border: 1px dotted black;
	box-sizing: border-box;
`

const PageBorder = styled.div`
	/* background: ${props => (props.debug ? 'lightgreen' : '#EEE')}; */
	background: ${props => (props.debug ? 'lightgreen' : 'white')};
	border: ${props => (props.debug ? '1px solid black' : 'none')};
	/* height: ${props => props.size.height}mm; */
	/* width: ${props => props.size.width}mm; */
	width: 100%;
	padding: 4mm;
	padding-left: ${props => props.size.left}mm;
	box-sizing: border-box;
	page-break-after: always;

	@media print {
		background: none;
		border: none;
	}
`

const PageContent = styled.div`
	background: ${props => (props.debug ? 'lightcoral' : 'white')};
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding-right: 4px;
	padding-top: 4px;
`

export const Page = ({ children }) => {
	const { debug } = useContext(AppContext)

	return (
		<PageBorder size={pageSize.a5} debug={debug}>
			<PageContent debug={debug}>{children}</PageContent>
		</PageBorder>
	)
}
