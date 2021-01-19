import React from 'react'

import { Inch, Page } from 'components/Print'

//
const storyConfig = {
	title: 'Print',
}
export default storyConfig

export const page = () => (
	<Page>
		{[...Array(20)].map((e, i) => (
			<Inch>{i}</Inch>
		))}
	</Page>
)
