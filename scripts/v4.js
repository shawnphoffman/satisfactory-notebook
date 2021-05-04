// console.log('START data files')
const Fraction = require('fraction.js')
const jsonfile = require('jsonfile')

// // Helpers
// const getItem = require('./helpers')
const log = args => true && console.log(args)

// Original JSON
const sourceJson = require('../raw/game-v4.json')
const itemsJson = sourceJson.itemsData
const recipesJson = sourceJson.recipesData
const buildingsJson = sourceJson.buildingsData
const toolsJson = sourceJson.toolsData

// Filenames
const outputPaths = ['./src/data/data-v4.json', './public/data-v4.json']
const outputJson = {}

// Helpers
const itemClassToSlug = Object.keys(itemsJson).reduce((memo, key) => {
	const item = itemsJson[key]
	memo[item.className] = key
	return memo
}, {})

const toolClassToSlug = Object.keys(toolsJson).reduce((memo, key) => {
	const tool = toolsJson[key]
	memo[tool.className] = key
	return memo
}, {})

const buildingClassToName = Object.keys(buildingsJson).reduce((memo, key) => {
	const building = buildingsJson[key]
	memo[building.className] = building.name
	return memo
}, {})

const processDescription = desc => desc?.replaceAll(/<br\s*\/?>/gi, '\r\n')

const processIcon = icon => icon.split('/').pop().split('?').shift()

const processBuildingName = buildings => {
	if (!buildings) return

	const list = buildings.reduce((memo, bldg) => {
		let name = buildingClassToName[bldg]

		if (name) {
			if (name.indexOf('Miner Mk.') > -1) name = 'Miner'

			if (!memo.includes(name)) memo.push(name)
		} else {
			log('')
			log('NO NAME')
			log(bldg)
			log('')
		}
		return memo
	}, [])
	return list.join(', ')
}

const calculateRate = (amount, duration, category) => {
	const isFluid = category === 'liquid'
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

const invalidRecipe = recipe => {
	const ingredientKeys = Object.keys(recipe.ingredients)
	const productKeys = Object.keys(recipe.produce)

	if (ingredientKeys.length !== productKeys.length) return false

	let invalid = true
	ingredientKeys.forEach(ing => {
		if (!productKeys.includes(ing)) invalid = false
	})

	return invalid
}

const sortRecipes = recipes =>
	recipes.sort((a, b) => {
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

// Process Recipes
const recipes = Object.keys(recipesJson).reduce((memo, key) => {
	const recipeSource = recipesJson[key]

	log(`PROCESSING RECIPE: ${key} (${recipeSource.name})`)

	// Skip recipes with the same ins and outs
	if (invalidRecipe(recipeSource)) {
		return memo
	}

	const recipeOut = {
		name: recipeSource.name,
		slug: key,
		isAlt: recipeSource.name.indexOf('Alternate: ') > -1,
		producedIn: processBuildingName(recipeSource.mProducedIn),
		ingredients: [],
		products: [],
	}

	// INGREDIENTS
	Object.keys(recipeSource.ingredients).forEach(className => {
		const itemSlug = itemClassToSlug[className] || toolClassToSlug[className]

		// TODO - Undefined names
		if (!itemSlug) return

		log(` - Recipe Requires: ${itemSlug} `)

		const item = itemsJson[itemSlug] || toolsJson[itemSlug]

		recipeOut.ingredients.push({
			name: item.name,
			slug: itemSlug,
			icon: processIcon(item.image),
			rate: calculateRate(recipeSource.ingredients[className], recipeSource.mManufactoringDuration, item.category),
		})
	})

	// PRODUCTS
	Object.keys(recipeSource.produce).forEach(className => {
		const itemSlug = itemClassToSlug[className]

		if (!itemSlug) return

		log(` - Recipe Produces: ${itemSlug} `)

		const item = itemsJson[itemSlug]

		recipeOut.products.push({
			name: item.name,
			slug: itemSlug,
			icon: processIcon(item.image),
			rate: calculateRate(recipeSource.produce[className], recipeSource.mManufactoringDuration, item.category),
		})
	})
	recipeOut.products.forEach(p => {
		if (memo[p.slug]) {
			memo[p.slug] = [...memo[p.slug], recipeOut]
		} else {
			memo[p.slug] = [recipeOut]
		}
	})

	log('')

	return memo
}, {})

// Do it
Object.keys(itemsJson)
	.sort((a, b) => {
		const aName = itemsJson[a].name
		const bName = itemsJson[b].name

		if (aName > bName) return 1
		if (bName > aName) return -1
		return 0
	})
	.forEach(key => {
		if (!recipes[key]) return

		const item = itemsJson[key]
		outputJson[key] = {
			name: item.name,
			description: processDescription(item.description),
			category: item.category,
			icon: processIcon(item.image),
			// type: 'Item',
			recipes: sortRecipes(recipes[key]),
		}
	})

// const uniqueCategories = Object.keys(outputJson)
// 	.map(o => outputJson[o].category)
// 	.filter((value, index, self) => {
// 		return self.indexOf(value) === index
// 	})
// 	.sort()

// log('')
// log('CATEGORIES')
// log(uniqueCategories)
// log('')

// Save the clean file
outputPaths.forEach(path => {
	// jsonfile.writeFile(path, outputJson, { spaces: 2 }, function (err) {
	jsonfile.writeFile(path, outputJson, {}, function (err) {
		if (err) console.error(err)
		else console.log('FINISH src ' + path)
	})
})

// End
return
