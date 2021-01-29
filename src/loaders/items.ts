import memoize from 'fast-memoize'

import { getBuildingImageName } from 'loaders/buildings'
import ImageMap from 'loaders/imageMap'

//
export const getItemIcon = memoize((itemSlug: string, size: number = 256) => {
	const itemImageSlug = `${getBuildingImageName(itemSlug)}.${256}.png`
	const image = ImageMap.get(itemImageSlug)
	if (!image) {
		console.log(`No image found for ${itemSlug}`)
	}
	return image
})
