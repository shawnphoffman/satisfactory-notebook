import { memo } from 'react'
import styled from 'styled-components'

const Cog = styled.div`
	margin-right: 5px;
	/* --fa-primary-color: #ffb94c;
	--fa-secondary-color: #606060; */
	--fa-secondary-color: #ffb94c;
	--fa-primary-color: #606060;
	--fa-secondary-opacity: 1;
`

const Wrapper = styled.span`
	/* font-size: 0.8em; */
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #231f20;
	color: white;
	font-size: 32px;
	font-weight: bold;
`

const Loading = () => {
	return (
		<Wrapper>
			<Cog>
				<i className="fad fa-cog fa-spin fa-lg" />
			</Cog>
			<div>Loading...</div>
		</Wrapper>
	)
}

export default memo(Loading)
