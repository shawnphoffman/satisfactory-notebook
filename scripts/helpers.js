const Fraction = require('fraction.js')

// Original JSON
const itemsJson = require('../src/data/Items.json')
const buildingsJson = require('../src/data/Buildings.json')
const recipesJson = require('../src/data/Recipes.json')

//
const handcraftingProducers = new Set([
	'building-build-gun',
	'building-work-bench-component',
	'building-workshop-component',
	'building-converter',
])

//
const ItemType = {
	UFGBuildingDescriptor: 'Building',
	UFGConsumableDescriptor: 'Consumable',
	UFGEquipmentDescriptor: 'Equipment',
	UFGItemDescriptor: 'Item',
	UFGResourceDescriptor: 'Resource',
	UFGVehicleDescriptor: 'Vehicle',
	// Whatever
	UFGPoleDescriptor: 'Building',
	UFGItemDescriptorBiomass: 'Item',
	UFGItemDescriptorNuclearFuel: 'Item',
}

//
const ItemForm = ['Invalid', 'Solid', 'Liquid', 'Gas', 'Heat', 'Unknown']

//
const getBuildingForRecipe = buildings => {
	const validSlugs = buildings.filter(b => !handcraftingProducers.has(b))
	const slug = validSlugs[0]
	if (!slug) return
	return buildingsJson[slug].name
}

//
const calculateRate = (amount, duration, form) => {
	const isFluid = form === ItemForm[2]
	const amt = isFluid ? amount / 1000 : amount
	const decimal = Number((amt * (60 / duration)).toFixed(4))
	const fraction = new Fraction(decimal).toFraction(true)

	return {
		perMin: decimal,
		perMinFraction: fraction,
		perMinLabel: isFluid ? 'm³/min' : '/min',
		perCycle: amt,
		perCycleLabel: isFluid ? 'm³' : 'x',
	}
}

//
const processRecipeItem = (recipeItem, manufacturingDuration) => {
	const item = itemsJson[recipeItem.slug]
	return {
		name: item.name,
		slug: recipeItem.slug,
		icon: item.icon,
		rate: calculateRate(recipeItem.amount, manufacturingDuration, ItemForm[item.form]),
	}
}

//
const getRecipesForItem = search => {
	const recipeKeys = Object.keys(recipesJson)

	const filteredRecipes = recipeKeys.filter(key => {
		const recipe = recipesJson[key]
		const producesItem =
			recipe.products.filter(product => {
				return product.slug === search
			}).length > 0
		return producesItem
	})

	const fullRecipes = filteredRecipes.map(r => {
		const recipe = recipesJson[r]
		return {
			slug: r,
			name: recipe.name,
			producedIn: getBuildingForRecipe(recipe.producedIn),
			ingredients: recipe.ingredients
				.map(i => processRecipeItem(i, recipe.manufacturingDuration))
				.sort((a, b) => {
					if (a.name > b.name) return 1
					if (b.name > a.name) return -1
					return 0
				}),
			products: recipe.products
				.map(i => processRecipeItem(i, recipe.manufacturingDuration))
				.sort((a, b) => {
					if (a.slug === search) return -1
					if (b.slug === search) return 1
					if (a.name > b.name) return 1
					if (b.name > a.name) return -1
					return 0
				}),
		}
	})

	return fullRecipes.sort((a, b) => {
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
}

//
const getItem = key => {
	// Get the basic item
	const item = itemsJson[key]

	// Get the recipes
	const recipesForKey = getRecipesForItem(key)

	return {
		name: item.name,
		description: item.description,
		type: ItemType[item.itemType],
		// stackSize: item.stackSize,
		// form: ItemForm[item.form],
		icon: item.icon,
		recipes: recipesForKey,
	}
}

//
module.exports = getItem
