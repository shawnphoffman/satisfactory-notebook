/** @jsxImportSource @welldone-software/why-did-you-render */
import React, { memo } from 'react'
import { styled } from '@linaria/react'

import Page from 'components/Page'

const ResourceFallback = ({ slug }) => (
	<Page>
		<ErrorWrapper>
			<i className="fa fa-bomb" />
			<span> An error occurred trying to render "{slug}". It has been reported and we will look into it.</span>
		</ErrorWrapper>
	</Page>
)

export default memo(ResourceFallback)

const ErrorWrapper = styled.div`
	color: #606060;

	@media print {
		display: none;
	}
`
