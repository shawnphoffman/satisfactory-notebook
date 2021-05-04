import { memo } from 'react'
import { styled } from '@linaria/react'

const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	background: #231f20;
	color: white;
	font-size: 18px;
	font-weight: bold;
	flex-direction: column;
	margin-top: 60px;
`

const Hero = styled.div`
	font-size: 7em;
	text-transform: uppercase;
	font-weight: bold;
	color: #ffb94c;
`

const Error = () => {
	return (
		<Wrapper>
			<Hero>Oh no!!!</Hero>
			<h1>Something went wrong</h1>
			<div>Please reload the page to try again.</div>
		</Wrapper>
	)
}

export default memo(Error)
