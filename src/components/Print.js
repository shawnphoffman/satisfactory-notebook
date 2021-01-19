import styled from 'styled-components'

const pixelsPerInch = 96
const pageSize = {
	a5: {
		height: 210,
		width: 148.5,
		left: 12,
	},
}

export const Inch = styled.div`
	/* width: ${pixelsPerInch}px; */
	/* height: ${pixelsPerInch}px; */
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
	background: ${props => (props.debug ? 'lightgreen' : '#EEE')};
	border: ${props => (props.debug ? '1px solid black' : 'none')};
	/* height: ${props => props.size.height}mm; */
	width: ${props => props.size.width}mm;
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

export const Page = ({ children, debug = false }) => (
	<PageBorder size={pageSize.a5} debug={debug}>
		<PageContent debug={debug}>{children}</PageContent>
	</PageBorder>
)
