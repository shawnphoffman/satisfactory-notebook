import React, { useContext } from 'react'
import styled from 'styled-components'

import { getBuildingName } from 'loaders/buildings'
import { getItemDefinition, getItemIcon } from 'loaders/items'
import {
	calculateRate,
	getRecipeDefinition,
	getRecipesByItemProduct,
	handcraftingProducers,
	sortRecipesByName,
} from 'loaders/recipes'

import AppContext from '../AppContext'

const FractionString = ({ fraction }) => {
	if (!fraction) return null

	if (fraction.indexOf('/') < 0) return fraction

	const splits = fraction.split(' ')

	const hasWhole = fraction.includes(' ')
	const whole = hasWhole ? splits[0] : null
	const numer = hasWhole ? splits[1].split('/')[0] : splits[0].split('/')[0]
	const denom = hasWhole ? splits[1].split('/')[1] : splits[0].split('/')[1]

	return (
		<>
			{whole && `${whole} `}
			<span style={{ fontSize: '0.8em' }}>
				<sup>{numer}</sup>&frasl;<sub>{denom}</sub>&nbsp;
			</span>
		</>
	)
}

const Ingredient = ({ slug, amount, duration }) => {
	const { fractions } = useContext(AppContext)
	const itemDef = getItemDefinition(slug)
	const rate = calculateRate(amount, duration, itemDef.form === 2)
	return (
		<IngredientContainer key={slug}>
			<IngredientLabel>
				{itemDef.icon ? <IngredientIcon src={getItemIcon(slug)} /> : null}
				{/* <span>
					{rate.perCycle}{rate.perCycleLabel}
				</span> */}
				{itemDef.name}
			</IngredientLabel>
			<div style={{ whiteSpace: 'nowrap', lineHeight: 1.2 }}>
				{fractions ? (
					<strong>
						<FractionString fraction={rate.perMinFraction} />
					</strong>
				) : (
					<strong>{rate.perMin}</strong>
				)}
				<small>{rate.perMinLabel}</small>
			</div>
		</IngredientContainer>
	)
}

const Recipe = ({ slug = 'item-plastic' }) => {
	// const slug = 'item-iron-screw'
	const product = getItemDefinition(slug)

	const recipeSlugs = getRecipesByItemProduct(slug)

	const recipes = sortRecipesByName(recipeSlugs)

	return (
		<>
			<Header>
				<div style={{ width: '100%' }}>
					<RecipeTitle>{product.name}</RecipeTitle>
					<RecipeDescription>{product.description}</RecipeDescription>
				</div>
				<Icon title={product.description} src={getItemIcon(slug)} />
			</Header>
			<List>
				{recipes.map(key => {
					// HACK
					const recipe = getRecipeDefinition(key)

					// Remove ore recipes
					if (recipe.ingredients.length === 0) return null

					// Garbage
					if (recipe.name.includes('Unpackage')) return null

					const validProducers = recipe.producedIn.filter(p => !handcraftingProducers.has(p))
					if (validProducers.length === 0) return null

					const building = getBuildingName(validProducers[0])

					if (!building) {
						console.log({
							recipe,
							product,
						})
					}

					return (
						<RecipeCard key={key} id={key}>
							<div style={{ display: 'flex', width: '100%', marginBottom: 4 }}>
								<CardSecondary>&nbsp;</CardSecondary>
								<CardTitle>{recipe.name}</CardTitle>
								<CardSecondary>{building}</CardSecondary>
							</div>
							<IngredientsContainer>
								{/* Inputs */}
								<IngredientColumn>
									{recipe.ingredients.map(i => (
										<Ingredient
											amount={i.amount}
											slug={i.slug}
											duration={recipe.manufacturingDuration}
											key={`in-${i.slug}`}
										/>
									))}
								</IngredientColumn>
								<ArrowSeparator>&#10148;</ArrowSeparator>
								{/* Outputs */}
								<IngredientColumn>
									{recipe.products.map(p => (
										<Ingredient
											amount={p.amount}
											slug={p.slug}
											duration={recipe.manufacturingDuration}
											key={`out-${p.slug}`}
										/>
									))}
								</IngredientColumn>
							</IngredientsContainer>
						</RecipeCard>
					)
				})}
			</List>
		</>
	)
}

export default Recipe

const List = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

const RecipeDescription = styled.div`
	font-size: 12px;
	/* width: 85%; */
	margin-right: 16px;
	line-height: 1.5;
`

const ArrowSeparator = styled.div`
	flex: 0;
	margin: 8px;
`

const RecipeCard = styled.div`
	display: flex;
	border: 1px solid #999;
	flex-direction: column;
	align-items: center;
	padding: 8px;
	border-radius: 5px;
	margin: 4px 0;
	page-break-inside: avoid;
	break-inside: avoid;
`

const CardTitle = styled.h2`
	margin: 0;
	text-align: center;
	font-size: 16px;
	line-height: 1.2;
	width: 100%;
`

const Icon = styled.img`
	display: ${props => (props.src ? 'inherit' : 'none')};
	max-width: 100%;
	width: 100px;
	padding: 8px;
	border-radius: 5px;
	margin-bottom: 4px;
	border: 1px solid #999;
`

const IngredientIcon = styled.img`
	max-width: 100%;
	width: 30px;
	margin-right: 3px;
`

const IngredientColumn = styled.div`
	flex: 1;
`

const IngredientsContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`

const IngredientLabel = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
`

const IngredientContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 2px 0px;
	background: #ededed;
	padding: 2px 5px;
	border-radius: 5px;
`

const RecipeTitle = styled.h1`
	margin-top: 0;
	margin-bottom: 12px;
	display: block;
`

const CardSecondary = styled.div`
	flex: 1 1 20%;
	text-align: right;
	font-size: 11px;
	font-style: italic;
	justify-content: flex-end;
	align-items: center;
	display: flex;
	color: #444;
`
