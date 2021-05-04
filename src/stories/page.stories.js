import React from 'react'

import Page from 'components/Page'

//
const storyConfig = {
	title: 'Page',
}
export default storyConfig

export const page = () => (
	<Page>
		{[...Array(20)].map((e, i) => (
			<div>{i}</div>
		))}
	</Page>
)
