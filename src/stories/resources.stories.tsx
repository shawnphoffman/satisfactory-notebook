import ResourceList from 'components/other/ResourceList'
import ResourceType from 'enums/ResourceType'
import { importImageManifest } from 'loaders/imageMap'

// Preload images
importImageManifest()

const storyConfig = {
	title: 'Resources',
	argTypes: {
		type: {
			control: {
				type: 'radio',
				options: Object.keys(ResourceType),
			},
			// defaultValue: Object.keys(ResourceType)[3],
		},
	},
}

export default storyConfig

export const listByType = (args: any) => <ResourceList {...args} />
