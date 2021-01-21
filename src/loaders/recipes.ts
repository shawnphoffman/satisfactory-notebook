import memoize from 'fast-memoize'
import Fraction from 'fraction.js'
import produce from 'immer'

import RecipeJson from 'data/Recipes.json'

import { getBuildingDefinition, getBuildingsByType } from 'loaders/buildings'
import { getEnumDisplayNames } from 'loaders/enums'
import { getItemDefinition, getResourcesByForm, sortSlugsByName } from 'loaders/items'

export enum EResourcePurity {
	RP_Impure,
	RP_Normal,
	RP_Pure,
	RP_MAX,
}

export const EResourcePurityDisplayName = {
	[EResourcePurity.RP_Impure]: 'Impure',
	[EResourcePurity.RP_Normal]: 'Normal',
	[EResourcePurity.RP_Pure]: 'Pure',
	[EResourcePurity.RP_MAX]: '<RP_MAX>',
}

// TODO: find a way to make this automatic?
// const resolveDurationMultiplierForPurityNames = (name: string) => {
// 	switch (name) {
// 		case 'Impure':
// 		case 'Inpure': // :(
// 			return 2
// 		case 'Normal':
// 			return 1
// 		case 'Pure':
// 			return 0.5
// 		default:
// 			throw new Error('Unknown purity name ' + name)
// 	}
// }

export const getExtractorRecipes = memoize(() => {
	return []
	// const extractors = getBuildingsByType('EXTRACTOR')

	// const extractorsByResourceForm = new Map<number, any[]>()

	// const extractorRecipes = [] as any[]

	// const extractorResultByMachine = new Map<string, Set<any>>()

	// extractors.forEach(extractorSlug => {
	// 	const extractorDefinition = getBuildingDefinition(extractorSlug)

	// 	if (!extractorDefinition.onlyAllowCertainResources) {
	// 		extractorDefinition.allowedResourceForms.forEach((rf: number) => {
	// 			if (!extractorsByResourceForm.get(rf)) {
	// 				extractorsByResourceForm.set(rf, [])
	// 			}

	// 			extractorsByResourceForm.get(rf)!.push(extractorSlug)
	// 		})
	// 	} else {
	// 		// First process the known extractors
	// 		extractorDefinition.allowedResources.forEach((allowedResource: string) => {
	// 			if (!extractorResultByMachine.get(allowedResource)) {
	// 				extractorResultByMachine.set(allowedResource, new Set())
	// 			}

	// 			extractorResultByMachine.get(allowedResource)!.add(extractorSlug)
	// 		})
	// 	}
	// })

	// const resourcePurityNames = getEnumDisplayNames(EResourcePurity, EResourcePurityDisplayName)
	// 	.filter((item: string) => {
	// 		return !item.endsWith('MAX')
	// 	})
	// 	.map((item: string) => {
	// 		return item.replace(/^RP_/, '')
	// 	})

	// const nonPurityNodes = new Set(['item-water'])

	// for (const [resource, extractors] of extractorResultByMachine.entries()) {
	// 	// This might change. One resource might have multiple extraction methods.
	// 	for (const extractor of extractors) {
	// 		const purityNames = nonPurityNodes.has(resource) ? [''] : resourcePurityNames
	// 		for (const purity of purityNames) {
	// 			let proposedRecipeName = nonPurityNodes.has(resource)
	// 				? resource.replace(/^item-/g, `recipe-`).toLowerCase()
	// 				: resource.replace(/^item-/g, `recipe-${purity}-`).toLowerCase()

	// 			const resourceData = getItemDefinition(resource)
	// 			extractorRecipes.push({
	// 				slug: proposedRecipeName,
	// 				recipe: {
	// 					name: purity ? `${purity} ${resourceData.name}` : resourceData.name,
	// 					translation: {
	// 						namespace: purity
	// 							? 'SGCUSTOM$$' + resourceData.translation.namespace
	// 							: resourceData.translation.namespace,
	// 						key: purity
	// 							? `${purity}-${resourceData.translation.key}`
	// 							: resourceData.translation.key,
	// 					},
	// 					ingredients: [],
	// 					products: [
	// 						{
	// 							slug: resource,
	// 							amount: 1,
	// 						},
	// 					],
	// 					producedIn: [extractor],
	// 					manualMultiplier: 1,
	// 					manufacturingDuration: purity ? resolveDurationMultiplierForPurityNames(purity) : 1,
	// 				},
	// 			})
	// 		}
	// 	}
	// }

	// for (const [allowedResourceForm, whitelistedMachines] of extractorsByResourceForm.entries()) {
	// 	const resourcesWithAllowedResourceForm = getResourcesByForm(allowedResourceForm)
	// 	for (const resource of resourcesWithAllowedResourceForm) {
	// 		const resourceData = getItemDefinition(resource)
	// 		for (const purity of resourcePurityNames) {
	// 			let proposedRecipeName = resource.replace(/^item-/g, `recipe-${purity}-`).toLowerCase()
	// 			extractorRecipes.push({
	// 				slug: proposedRecipeName,
	// 				recipe: {
	// 					name: `${purity} ${resourceData.name}`,
	// 					translation: {
	// 						namespace: 'SGCUSTOM$$' + resourceData.translation.namespace,
	// 						key: `${purity}-${resourceData.translation.key}`,
	// 					},
	// 					ingredients: [],
	// 					products: [
	// 						{
	// 							slug: resource,
	// 							amount: 1,
	// 						},
	// 					],
	// 					producedIn: [...whitelistedMachines],
	// 					manualMultiplier: 1,
	// 					manufacturingDuration: resolveDurationMultiplierForPurityNames(purity),
	// 				},
	// 			})
	// 		}
	// 	}
	// }

	// return extractorRecipes
})

export const getAllRecipes = memoize(() => {
	return RecipeJson
	// return produce(RecipeJson, draftState => {
	// 	getExtractorRecipes().forEach(({ slug, recipe }) => {
	// 		;(draftState as any)[slug] = recipe
	// 	})
	// })
})

export const getRecipeList = memoize(() => {
	return Object.entries(getAllRecipes()).map(([slug, value]) => {
		return {
			...value,
			slug,
		}
	})
})

export const handcraftingProducers = new Set([
	'building-build-gun',
	'building-work-bench-component',
	'building-workshop-component',
	'building-converter', // this one is here because its recipes are not complete.
])

const getMachineCraftableRecipeDefinitionListFn = () => {
	return getRecipeList().filter(({ producedIn }) => {
		return (
			producedIn.filter((item: string) => {
				return !handcraftingProducers.has(item)
			}).length > 0
		)
	})
}

const getRecipesByMachineFn = (machineSlug: string) => {
	return getRecipeList()
		.filter(({ producedIn }) => {
			return (
				producedIn.filter((item: string) => {
					return item === machineSlug
				}).length > 0
			)
		})
		.map(item => item.slug)
}

export const getRecipesByMachine = memoize(getRecipesByMachineFn)

const getRecipesByItemProductFn = (itemSlug: string) => {
	return getRecipeList()
		.filter(({ products }) => {
			return (
				products.filter((item: any) => {
					return item.slug === itemSlug
				}).length > 0
			)
		})
		.map(item => item.slug)
}

export const getRecipesByItemProduct = memoize(getRecipesByItemProductFn)

const getRecipesByItemIngredientFn = (itemSlug: string) => {
	return getRecipeList()
		.filter(({ ingredients }) => {
			return (
				ingredients.filter((item: any) => {
					return item.slug === itemSlug
				}).length > 0
			)
		})
		.map(item => item.slug)
}

export const getRecipesByItemIngredient = memoize(getRecipesByItemIngredientFn)

export const getMachinesFromMachineCraftableRecipe = (slug: string) => {
	return (getAllRecipes() as any)[slug].producedIn.filter((item: string) => !handcraftingProducers.has(item))
}

export const getRecipeIngredients = (slug: string) => {
	return (getAllRecipes() as any)[slug].ingredients
}

export const getRecipeProducts = (slug: string) => {
	return (getAllRecipes() as any)[slug].products
}

export const getRecipeName = (slug: string) => {
	return (getAllRecipes() as any)[slug].name
}

export const getRecipeDefinition = memoize((slug: string) => {
	// console.log(slug)
	return (getAllRecipes() as any)[slug]
})

const getMachineCraftableRecipeListFn = () => {
	return getMachineCraftableRecipeDefinitionList().map(({ slug }) => slug)
}

export const getMachineCraftableRecipeList = memoize(getMachineCraftableRecipeListFn)

export const getMachineCraftableRecipeDefinitionList = memoize(getMachineCraftableRecipeDefinitionListFn)

//
//
const getMachineCraftableProductsFn = () => {
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
}
export const getMachineCraftableProducts = memoize(getMachineCraftableProductsFn)

//
//
const calculateRateFn = (amount: number, duration: number, isFluid = false) => {
	// TODO - Change this to handle non-machines
	// if (duration === 1) {
	// 	return {
	// 		perCycle: amount,
	// 		perMin: amount,
	// 		perCycleLabel: '',
	// 		perMinLabel: '',
	// 	}
	// }

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
}
export const calculateRate = memoize(calculateRateFn)

//
//
const sortRecipesByNameFn = (slugs: string[]) => {
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
}
export const sortRecipesByName = memoize(sortRecipesByNameFn)
