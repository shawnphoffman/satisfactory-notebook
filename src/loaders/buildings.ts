import memoize from 'fast-memoize'

import BuildingJson from 'data/Buildings.json'
import ConnectionsJson from 'data/Connections.json'
import ItemJson from 'data/Items.json'
import RecipeJson from 'data/Recipes.json'

import SGImageRepo from 'loaders/sgImageRepo'
import lazyFunc from 'utils/lazyFunc'

const slugToCustomMachineGroup = (slug: string) => {
	switch (slug) {
		case 'building-conveyor-attachment-merger':
		case 'building-conveyor-attachment-splitter':
		case 'building-pipeline-junction-cross':
			return 'machine-group-logistics'
		case 'building-pipe-storage-tank':
		case 'building-industrial-tank':
			return 'machine-group-liquid-storage'
		case 'building-storage-container':
			return 'machine-group-item-storage'
	}

	return slug
}

const getBuildableMachinesFn = () => {
	const buildables = new Set(Object.keys(ConnectionsJson))

	const machineByType = new Map<string, any[]>()

	Object.entries(BuildingJson)
		.filter(([key]) => {
			return buildables.has(key)
		})
		.forEach(([slug, value]) => {
			if (!machineByType.get(value.buildingType)) {
				machineByType.set(value.buildingType, [])
			}

			machineByType.get(value.buildingType)!.push(slug)
		})

	for (const value of machineByType.values()) {
		value.sort()
	}

	machineByType.delete('ITEMPASSTHROUGH')
	machineByType.delete('FLUIDPASSTHROUGH')
	machineByType.delete('TRUCKSTATION')
	machineByType.delete('TRAINSTATION')
	machineByType.delete('GENERATOR')
	machineByType.delete('SINK')

	// Stub the FLOWMANIPULATOR CLASS for now
	machineByType.set('ITEMFLOWMANIPULATOR', [
		'building-conveyor-attachment-merger',
		'building-conveyor-attachment-splitter',
	])

	const allMachines: string[] = [...machineByType.values()].flat(1)
	const machineClassMap = new Map<string, string[]>()
	const machineClassImageMap = new Map<string, string>()
	const upgradePathMap = new Map<string, string[]>()
	const reverseUpgradePathMap = new Map<string, string>()

	allMachines.forEach(machine => {
		const markRegex = /^(.*)-mk[0-9]+(-.*)?$/
		if (markRegex.test(machine)) {
			const regexResult = markRegex.exec(machine)
			const slug = `${regexResult![1] + (regexResult![2] || '')}`

			const resolvedSlug = slugToCustomMachineGroup(slug)

			if (!machineClassMap.get(resolvedSlug)) {
				machineClassMap.set(resolvedSlug, [])
			}

			if (!upgradePathMap.get(slug)) {
				upgradePathMap.set(slug, [])
			}
			machineClassMap.get(resolvedSlug)!.push(machine)
			upgradePathMap.get(slug)!.push(machine)
			upgradePathMap.get(slug)!.sort()
			reverseUpgradePathMap.set(machine, slug)
		} else {
			const resolvedSlug = slugToCustomMachineGroup(machine)
			if (!machineClassMap.get(resolvedSlug)) {
				machineClassMap.set(resolvedSlug, [])
			}
			machineClassMap.get(resolvedSlug)!.push(machine)
		}
	})

	const machineClassReverseMap = new Map<string, string>()

	for (const entry of machineClassMap.entries()) {
		const [key, value] = entry
		value.sort()
		machineClassImageMap.set(key, value[0])
		value.forEach(className => {
			machineClassReverseMap.set(className, key)
		})
	}

	//TODO: make this into a better system to allow for placing machines easier. The above is mostly cruft to remove
	// the buildables we don't want to show.
	return {
		machineClassMap,
		machineClassImageMap,
		machineClassReverseMap,
		upgradePathMap,
		reverseUpgradePathMap,
	}
}

const getBuildableMachinesByClass = memoize(getBuildableMachinesFn)

const getBuildableConnectionsFn = () => {
	const buildables = new Set(Object.keys(ConnectionsJson))

	const machineByType = new Map<string, any[]>()

	Object.entries(BuildingJson)
		.filter(([key]) => {
			return buildables.has(key)
		})
		.forEach(([slug, value]) => {
			if (!machineByType.get(value.buildingType)) {
				machineByType.set(value.buildingType, [])
			}

			machineByType.get(value.buildingType)!.push(slug)
		})

	for (const value of machineByType.values()) {
		value.sort()
	}

	for (const key of machineByType.keys()) {
		if (key !== 'ITEMPASSTHROUGH' && key !== 'FLUIDPASSTHROUGH') {
			machineByType.delete(key)
		}
	}

	const allMachines: string[] = [...machineByType.values()].flat(1)
	const connectionClassMap = new Map<string, string[]>()
	const connectionClassImageMap = new Map<string, string>()
	const upgradePathMap = new Map<string, string[]>()
	const reverseUpgradePathMap = new Map<string, string>()

	allMachines.forEach(machine => {
		const markRegex = /^(.*)-mk[0-9]+(-.*)?$/
		if (markRegex.test(machine)) {
			const regexResult = markRegex.exec(machine)
			const slug = `${regexResult![1] + (regexResult![2] || '')}`

			const resolvedSlug = slugToCustomMachineGroup(slug)

			if (!connectionClassMap.get(resolvedSlug)) {
				connectionClassMap.set(resolvedSlug, [])
			}

			if (!upgradePathMap.get(slug)) {
				upgradePathMap.set(slug, [])
			}
			connectionClassMap.get(resolvedSlug)!.push(machine)
			upgradePathMap.get(slug)!.push(machine)
			upgradePathMap.get(slug)!.sort()
			reverseUpgradePathMap.set(machine, slug)
		} else {
			const resolvedSlug = slugToCustomMachineGroup(machine)
			// console.log(resolvedSlug);
			if (!connectionClassMap.get(resolvedSlug)) {
				connectionClassMap.set(resolvedSlug, [])
			}

			if (!upgradePathMap.get(resolvedSlug)) {
				upgradePathMap.set(resolvedSlug, [])
			}
			connectionClassMap.get(resolvedSlug)!.push(machine)
			upgradePathMap.get(resolvedSlug)!.push(machine)
			upgradePathMap.get(resolvedSlug)!.sort()
			reverseUpgradePathMap.set(machine, resolvedSlug)
		}
	})

	const connectionClassReverseMap = new Map<string, string>()

	for (const entry of connectionClassMap.entries()) {
		const [key, value] = entry
		value.sort()
		connectionClassImageMap.set(key, value[0])
		value.forEach(className => {
			connectionClassReverseMap.set(className, key)
		})
	}

	return {
		connectionClassMap,
		connectionClassImageMap,
		connectionClassReverseMap,
		upgradePathMap,
		reverseUpgradePathMap,
	}
}

export const getBuildableConnections = memoize(getBuildableConnectionsFn)

const getBuildableConnectionClassesFn = () => {
	return [...getBuildableConnections().connectionClassMap.keys()]
}

export const getBuildableConnectionClasses = memoize(getBuildableConnectionClassesFn)

export const getUpgradesForConnectionClass = (connectionClass: string) => {
	return getBuildableConnections().upgradePathMap.get(connectionClass)
}

export const getBuildableMachineClassNames = lazyFunc(() => {
	return [...getBuildableMachinesByClass().machineClassMap.keys()]
})

const getBuildableMachinesFromClassNameFn = (name: string) => {
	return getBuildableMachinesByClass().machineClassMap.get(name)
}

export const getBuildableMachinesFromClassName = memoize(getBuildableMachinesFromClassNameFn)

export const getClassNameFromBuildableMachines = (() => {
	const reverseClassListMap = getBuildableMachinesByClass().machineClassReverseMap
	return (name: string) => {
		return reverseClassListMap.get(name)
	}
})()

const getAllBuildableMachinesFn = () => {
	const classListMap = getBuildableMachinesByClass().machineClassMap
	return [...classListMap.values()].flat()
}

export const getAllBuildableMachines = memoize(getAllBuildableMachinesFn)

export const getBuildableMachineClassIcon = (() => {
	const classImageMap = getBuildableMachinesByClass().machineClassImageMap
	return (name: string) => {
		return classImageMap.get(name)
	}
})()

export const getBuildingName = memoize((slug: string) => {
	// console.log(slug)
	return (BuildingJson as any)[slug]?.name
})

export const getBuildingImageName = (slug: string) => {
	const itemSlug = slug.replace(/^building/g, 'item')

	return (ItemJson as any)[itemSlug].icon
}

export const getBuildingIcon = (slug: string, size: number) => {
	const itemSlug = slug.replace(/^building/g, 'item')

	const itemImageSlug = `${getBuildingImageName(itemSlug)}.${256}.png`

	const image = SGImageRepo.get(itemImageSlug)

	if (!image) {
		throw new Error('No image found: ' + itemImageSlug)
	}
	return image
}

export const getRecipesByMachineClass = (machineClass: string) => {
	const machineClasses = new Set(getBuildableMachinesFromClassName(machineClass) || [])
	const entries = Object.entries(RecipeJson).filter(([slug, recipe]) => {
		return recipe.producedIn.some(element => machineClasses.has(element))
	})

	const obj = {} as any
	Object.keys(RecipeJson).forEach((key: string) => {
		obj[key] = (RecipeJson as any)[key].name
	})
	// console.log(JSON.stringify(obj, null, 2));
	return entries
}

export const getBuildingsByType = (type: string) => {
	return Object.entries(BuildingJson)
		.filter(([key, value]) => {
			return value.buildingType === type
		})
		.map(([key]) => key)
}

export const getBuildingDefinition = (buildingSlug: string) => {
	return (BuildingJson as any)[buildingSlug]
}

export const getTier = (buildingSlug: string) => {
	const base = getBuildableMachinesByClass()
	const map = base.reverseUpgradePathMap
	if (map.get(buildingSlug)) {
		const mainClass = map.get(buildingSlug)!
		return base.upgradePathMap.get(mainClass)!.indexOf(buildingSlug) + 1
	} else {
		const connectionBase = getBuildableConnections()
		const connectionBaseMap = connectionBase.reverseUpgradePathMap
		if (connectionBaseMap.get(buildingSlug)) {
			const mainClass = connectionBaseMap.get(buildingSlug)!
			return connectionBase.upgradePathMap.get(mainClass)!.indexOf(buildingSlug) + 1
		} else {
			return 0
		}
	}
}
