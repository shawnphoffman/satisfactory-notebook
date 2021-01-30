console.log('START data files')

const jsonfile = require('jsonfile')

// Helpers
const getItem = require('./helpers')

// Original JSON
const itemsJson = require('../src/data/Items.json')

// Filenames
const outputPath = './src/data/data.json'
const outputJson = {}

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
		if (key.includes('integrated') || key.includes('terminal') || key.includes('8x4-03-steel')) return

		const item = getItem(key)

		if (['Building', 'Vehicle'].includes(item.type)) return

		outputJson[key] = item
	})

// Save the clean file
jsonfile.writeFile(outputPath, outputJson, { spaces: 2 }, function (err) {
	if (err) console.error(err)
	else console.log('FINISH src data.json')
})
jsonfile.writeFile('./public/data.json', outputJson, function (err) {
	if (err) console.error(err)
	else console.log('FINISH public data.json')
})

// End
return
