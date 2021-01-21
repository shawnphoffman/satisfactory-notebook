import memoize from 'fast-memoize'

import ItemJson from 'data/Items.json'

import { getBuildingImageName } from 'loaders/buildings'
import ImageMap from 'loaders/imageMap'

//
export const getResourcesByForm = memoize((resourceForm: number) => {
	return Object.entries(ItemJson)
		.filter(([, value]) => {
			return value.itemType === 'UFGResourceDescriptor' && value.form === resourceForm
		})
		.map(([key]) => key)
})

//
export const getItemDefinition = memoize((itemSlug: string) => {
	// console.log(itemSlug)
	return (ItemJson as any)[itemSlug]
})

//
export const getItemList = memoize(() => {
	return Object.entries(ItemJson).map(([slug, value]) => {
		return {
			...value,
			slug,
		}
	})
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
const getAllItemsFn = () => {
	return ItemJson as Record<string, any>
}

//
export const getAllItems = memoize(getAllItemsFn)

//
const getNameSlugMappingFn = () => {
	const items = getAllItemsFn() as Record<string, any>

	return Object.keys(items).reduce((memo, slug) => {
		memo[slug] = items[slug].name

		return memo
	}, {} as Record<string, any>)
}
// export const getNameSlugMapping = memoize(getNameSlugMappingFn)

//
//
const sortSlugsByNameFn = (slugs: string[]) => {
	const mapping = getNameSlugMappingFn()

	return slugs.sort((a, b) => {
		if (mapping[a] > mapping[b]) return 1

		if (mapping[a] < mapping[b]) return -1

		return 0
	})
}
export const sortSlugsByName = memoize(sortSlugsByNameFn)
