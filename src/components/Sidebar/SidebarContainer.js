import React, { memo } from 'react'
import { styled } from '@linaria/react'

import logo from './logo.png'

const Sidebar = React.lazy(() => import('components/Sidebar/Sidebar'))
// const Sidebar = React.lazy(() => {
// 	return Promise.all([
// 		import('./Sidebar'),
// 		new Promise(resolve => {
// 			// setTimeout(() => {}, 3000)
// 			setTimeout(resolve, 10000)
// 		}),
// 	]).then(([module]) => module)
// })

const SidebarContainer = () => {
	return (
		<SidebarWrapper>
			<div>
				{/* <Logo src={logo} alt="Satisfactory Notebook" width="260" height="81" /> */}
				<Logo src={`${process.env.REACT_APP_STATIC_PATH || ''}${logo}`} alt="Satisfactory Notebook" width="260" height="81" />
			</div>
			<React.Suspense fallback={<div></div>}>
				<Sidebar />
			</React.Suspense>
		</SidebarWrapper>
	)
}

export default memo(SidebarContainer)

const SidebarWrapper = styled.div`
	min-width: 280px;
	background: #bbb;
	position: sticky;
	top: 0;
	height: 100vh;
	padding: 10px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	@media print {
		display: none;
	}

	/* TODO - Extract the max-width to variable */
	@media screen and (max-width: 600px) {
		width: 100%;
		position: unset;
		height: auto;
	}
`

const Logo = styled.img`
	max-width: 100%;
	height: auto;
`
