import memoize from 'fast-memoize'

// import produce from 'immer';
import ItemJson from 'data/Items.json'

import { getBuildingImageName } from 'loaders/buildings'
import { getMachineCraftableRecipeDefinitionList } from 'loaders/recipes'
import SGImageRepo from 'loaders/sgImageRepo'

export const getItemDefinition = (itemSlug: string) => {
	return (ItemJson as any)[itemSlug]
}

const getItemByTypeFn = (type: string) => {
	return Object.entries(ItemJson)
		.filter(([key, value]) => {
			return value.itemType === type
		})
		.map(([key]) => key)
}

const getResourcesFn = () => {
	return Object.entries(ItemJson)
		.filter(([key, value]) => {
			return value.itemType === 'UFGResourceDescriptor'
		})
		.map(([key]) => key)
}

const getResourcesByFormFn = (resourceForm: number) => {
	return Object.entries(ItemJson)
		.filter(([, value]) => {
			return value.itemType === 'UFGResourceDescriptor' && value.form === resourceForm
		})
		.map(([key]) => key)
}

const getItemListFn = () => {
	return Object.entries(ItemJson).map(([slug, value]) => {
		return {
			...value,
			slug,
		}
	})
}

export const getItemIcon = (itemSlug: string, size: number = 256) => {
	const itemImageSlug = `${getBuildingImageName(itemSlug)}.${256}.png`

	const image = SGImageRepo.get(itemImageSlug)

	if (!image) {
		// throw new Error('No image found: ' + itemImageSlug);
	}
	return image
}

const getMachineCraftableItemsFn = () => {
	return [
		...new Set(
			getMachineCraftableRecipeDefinitionList()
				.map(item => {
					return [...item.products.map((subItem: any) => subItem.slug)]
				})
				.flat()
		),
	]
}

const getAllItemsFn = () => {
	return ItemJson as Record<string, any>
}

export const getItemResourceForm = (itemSlug: string) => {
	return (getAllItemsFn() as Record<string, any>)[itemSlug].form
}

export const getItemName = (itemSlug: string) => {
	return (getAllItemsFn() as Record<string, any>)[itemSlug].name
}

export const getAllItems = memoize(getAllItemsFn)

//
//
export const getMachineCraftableItems = memoize(getMachineCraftableItemsFn)

//
//
export const getItemByType = memoize(getItemByTypeFn)

//
//
export const getResources = memoize(getResourcesFn)

//
//
export const getResourcesByForm = memoize(getResourcesByFormFn)

//
//
export const getItemList = memoize(getItemListFn)

//
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
