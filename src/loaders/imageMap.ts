import entries, { manifest } from 'images/__all'

export function importImageManifest() {
	const promises: any = []

	for (const file of manifest) {
		const entryUrl = ((entries as unknown) as any)['sg' + file.replace('.256.png', '_256').replace(/-/g, '_')]

		if (entryUrl) {
			ImageMap.set(file, entryUrl)

			if (!process.env.REACT_APP_STATIC_PATH) {
				promises.push(fetch(entryUrl, { cache: 'force-cache' }))
			}
		}
	}

	return Promise.all(promises)
}

const ImageMap = new Map<string, any>()

export default ImageMap
