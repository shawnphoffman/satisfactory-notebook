import memoize from 'fast-memoize'

import data from 'data/data.json'

// TODO
export const getBuildingImageName = memoize((slug: string) => {
	const itemSlug = slug.replace(/^building/g, 'item')
	return (data as any)[itemSlug].icon
})
