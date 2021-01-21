import memoize from 'fast-memoize'
import Fraction from 'fraction.js'

import RecipeJson from 'data/Recipes.json'

import { sortSlugsByName } from 'loaders/items'

const getRecipeName = memoize((slug: string) => {
	return (getAllRecipes() as any)[slug].name
})

export const handcraftingProducers = new Set([
	'building-build-gun',
	'building-work-bench-component',
	'building-workshop-component',
	'building-converter', // this one is here because its recipes are not complete.
])

export const getAllRecipes = memoize(() => {
	return RecipeJson
})

export const getRecipeList = memoize(() => {
	return Object.entries(getAllRecipes()).map(([slug, value]) => {
		return {
			...value,
			slug,
		}
	})
})

export const getRecipeDefinition = memoize((slug: string) => {
	return (getAllRecipes() as any)[slug]
})

export const getMachineCraftableProducts = memoize(() => {
	const allRecipes = getAllRecipes() as any
	const rawProductSlugs = Object.keys(allRecipes).reduce((memo: any, key: string) => {
		const { producedIn, products, ingredients } = allRecipes[key]

		const machineCraftable =
			producedIn.filter((item: string) => {
				return !handcraftingProducers.has(item) && ingredients.length > 0
			}).length > 0

		if (!machineCraftable) return memo

		memo.push(...products.map((p: { slug: string }) => p.slug))

		return memo
	}, [])

	return sortSlugsByName([...new Set(rawProductSlugs)] as string[])
})

export const calculateRate = memoize((amount: number, duration: number, isFluid = false) => {
	// HACK - This is trash code. I should be ashamed
	const amt = isFluid ? amount / 1000 : amount
	const decimal = Number((amt * (60 / duration)).toFixed(4))
	const fraction = new Fraction(decimal).toFraction(true)

	return {
		perCycle: amt,
		perMin: decimal,
		perMinFraction: fraction,
		perCycleLabel: isFluid ? 'm³' : 'x',
		perMinLabel: isFluid ? 'm³/min' : '/min',
	}
})

export const sortRecipesByName = memoize((slugs: string[]) => {
	const mapping = slugs.map(slug => {
		return {
			slug: slug,
			name: getRecipeName(slug),
		}
	})

	mapping.sort((a, b) => {
		const aAlt = a.name.includes('Alternate')
		const bAlt = b.name.includes('Alternate')

		if (aAlt && bAlt) {
			if (a.name > b.name) return 1
			if (b.name > a.name) return -1
			return 0
		}

		if (aAlt && !bAlt) return 1
		if (!aAlt && bAlt) return -1

		if (a.name > b.name) return 1
		if (b.name > a.name) return -1

		return 0
	})

	return mapping.map(m => m.slug)
})

export const getRecipesByItemProduct = memoize((itemSlug: string) => {
	return getRecipeList()
		.filter(({ products }) => {
			return (
				products.filter((item: any) => {
					return item.slug === itemSlug
				}).length > 0
			)
		})
		.map(item => item.slug)
})
