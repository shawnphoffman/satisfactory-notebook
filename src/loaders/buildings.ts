import memoize from 'fast-memoize'

import BuildingJson from 'data/Buildings.json'
import ItemJson from 'data/Items.json'

export const getBuildingName = memoize((slug: string) => {
	return (BuildingJson as any)[slug]?.name
})

export const getBuildingImageName = memoize((slug: string) => {
	const itemSlug = slug.replace(/^building/g, 'item')
	return (ItemJson as any)[itemSlug].icon
})

export const getBuildingsByType = memoize((type: string) => {
	return Object.entries(BuildingJson)
		.filter(([key, value]) => {
			return value.buildingType === type
		})
		.map(([key]) => key)
})

export const getBuildingDefinition = memoize((buildingSlug: string) => {
	return (BuildingJson as any)[buildingSlug]
})
