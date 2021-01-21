import React, { memo } from 'react'
import styled from 'styled-components'

import { getItemDefinition, getItemIcon } from 'loaders/items'
import { getRecipeDefinition, getRecipesByItemProduct, handcraftingProducers, sortRecipesByName } from 'loaders/recipes'

import Recipe from './Recipe'
import RemoveIcon from './RemoveIcon'

const imageSize = 100

const Resource = ({ slug }) => {
	// const slug = 'item-iron-screw'
	const product = getItemDefinition(slug)

	const recipeSlugs = getRecipesByItemProduct(slug)

	const sortedSlugs = sortRecipesByName(recipeSlugs)

	// TODO REDUCE THIS!!!
	// Why do it once when you can do it TWICE!!!
	const recipes = React.useMemo(() => {
		return sortedSlugs.filter(slug => {
			const recipe = getRecipeDefinition(slug)

			const validProducers = recipe.producedIn.filter(p => !handcraftingProducers.has(p))
			if (validProducers.length === 0) {
				return false
			}

			return true
		})
	}, [sortedSlugs])

	if (recipes.length === 0) return null

	const iconSrc = getItemIcon(slug)

	return (
		<>
			<Header id={slug}>
				<Details>
					<Title>
						{product.name} <RemoveIcon slug={slug} />
					</Title>
					<Description>{product.description}</Description>
				</Details>
				{iconSrc && <Image alt={product.name} src={iconSrc} width={imageSize} height={imageSize} />}
			</Header>
			<div>
				{recipes.map(key => (
					<Recipe slug={key} key={key} />
				))}
			</div>
		</>
	)
}

export default memo(Resource)

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

const Details = styled.div`
	width: 100%;
`

const Title = styled.h1`
	margin-top: 0;
	margin-bottom: 12px;
	display: block;
	line-height: 1.2;
	display: flex;
	align-items: center;

	@media (max-width: 400px) {
		font-size: 24px;
	}
`

const Description = styled.div`
	font-size: 12px;
	margin-right: 16px;
	line-height: 1.5;

	@media (max-width: 400px) {
		display: none;
	}
`

const Image = styled.img`
	display: ${props => (props.src ? 'inherit' : 'none')};
	max-width: 100%;
	width: ${imageSize}px;
	height: ${imageSize}px;
	padding: 8px;
	border-radius: 5px;
	margin-bottom: 4px;
	border: 1px solid #999;
`
