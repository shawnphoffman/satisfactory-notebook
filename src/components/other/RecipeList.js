import React from 'react'
import styled from 'styled-components'

import { getItemDefinition, getItemIcon } from 'loaders/items'
import { getMachineCraftableProducts } from 'loaders/recipes'

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const RecipeList = () => {
	// Get all the products we can make in machines
	const products = getMachineCraftableProducts()

	// TODO - This is sorting by key, not by name
	// const itemNames = Object.keys(items).sort()

	return (
		<Wrapper>
			{products.map(key => {
				const item = getItemDefinition(key)

				// // Don't render other types
				// if (item.itemType !== ItemType[type]) return null

				// Don't render items without images
				// TODO add a flag?
				// if (!item.icon) return null

				return (
					<Card key={key} title={item.description} id={key}>
						<CardTitle>{item.name}</CardTitle>
						{item.icon ? <Icon src={getItemIcon(key)} /> : null}
					</Card>
				)
			})}
		</Wrapper>
	)
}

export default RecipeList

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
