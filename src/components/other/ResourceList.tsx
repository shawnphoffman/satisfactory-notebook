import React from 'react'
import styled from 'styled-components'

import ResourceType from 'enums/ResourceType'
import { getAllItems, getItemIcon, sortSlugsByName } from 'loaders/items'

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const ResourceList = ({ type }: { type: string }) => {
	// Get the items
	const items = getAllItems()

	// Sort items by their display names
	const itemSlugsSorted = sortSlugsByName(Object.keys(items))

	return (
		<>
			<h1>Resources {type ? `(${type})` : null}</h1>
			<Wrapper>
				{itemSlugsSorted.map((key: string) => {
					const item = items[key]

					if (!item) return null

					// Don't render other types
					if (type && item.itemType !== ResourceType[type]) return null

					// Don't render items without images
					// TODO add a flag?
					if (!item.icon) return null

					return (
						<Card key={key} title={item.description} id={key}>
							<CardTitle>{item.name}</CardTitle>
							{item.icon ? <Icon src={getItemIcon(key)} /> : null}
						</Card>
					)
				})}
			</Wrapper>
		</>
	)
}

export default ResourceList

const Card = styled.div`
	display: flex;
	border: 1px solid #999;
	flex-direction: column;
	align-items: center;
	width: 100px;
	padding: 0.5em 1em;
	border-radius: 5px;
	margin: 0.25em;
`

const CardTitle = styled.h2`
	margin: 0.25em 0;
	text-align: center;
	font-size: 1em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
`

const Icon = styled.img`
	max-width: 100%;
	width: 200px;
`
