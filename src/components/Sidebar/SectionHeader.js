import React, { memo } from 'react'
import { styled } from '@linaria/react'

//
const SectionHeader = ({ icon, label }) => (
	<HeaderWrapper>
		<i className={`fas ${icon} fa-fw`}></i>
		<span> {label}</span>
	</HeaderWrapper>
)

export default memo(SectionHeader)

const HeaderWrapper = styled.div`
	margin: 18px 0 12px 0;
	font-weight: bold;
`
