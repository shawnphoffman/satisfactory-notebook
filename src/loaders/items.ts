import memoize from 'fast-memoize'

import ItemJson from 'data/Items.json'

import { getBuildingImageName } from 'loaders/buildings'
import ImageMap from 'loaders/imageMap'

//
export const getItemDefinition = memoize((itemSlug: string) => {
	return (ItemJson as any)[itemSlug]
})

//
export const getItemIcon = memoize((itemSlug: string, size: number = 256) => {
	const itemImageSlug = `${getBuildingImageName(itemSlug)}.${256}.png`
	const image = ImageMap.get(itemImageSlug)
	if (!image) {
		console.log(`No image found for ${itemSlug}`)
	}
	return image
})

//
const getAllItems = memoize(() => {
	return ItemJson as Record<string, any>
})

//
const getNameSlugMapping = memoize(() => {
	const items = getAllItems() as Record<string, any>

	return Object.keys(items).reduce((memo, slug) => {
		memo[slug] = items[slug].name

		return memo
	}, {} as Record<string, any>)
})

//
export const sortSlugsByName = memoize((slugs: string[]) => {
	const mapping = getNameSlugMapping()

	return slugs.sort((a, b) => {
		if (mapping[a] > mapping[b]) return 1

		if (mapping[a] < mapping[b]) return -1

		return 0
	})
})
