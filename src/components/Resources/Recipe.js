import React, { memo } from 'react'
import { styled } from '@linaria/react'

import Ingredient from 'components/Ingredients/Ingredient'
import { getBuildingName } from 'loaders/buildings'
import { getRecipeDefinition, handcraftingProducers } from 'loaders/recipes'

const Recipe = ({ slug }) => {
	const recipe = getRecipeDefinition(slug)

	const validProducers = React.useMemo(() => recipe.producedIn.filter(p => !handcraftingProducers.has(p)), [recipe.producedIn])
	if (validProducers.length === 0) return null

	const building = getBuildingName(validProducers[0])

	return (
		<Wrapper id={slug}>
			<Header>
				<Secondary>&nbsp;</Secondary>
				<Title>{recipe.name}</Title>
				<Secondary>{building}</Secondary>
			</Header>
			<IngredientsWrapper>
				{/* Inputs */}
				<Column>
					{recipe.ingredients.map(i => (
						<Ingredient amount={i.amount} slug={i.slug} duration={recipe.manufacturingDuration} key={`in-${i.slug}`} />
					))}
				</Column>
				<Arrow>
					<i className="fa fa-arrow-alt-right" />
				</Arrow>
				{/* Outputs */}
				<Column>
					{recipe.products.map(p => (
						<Ingredient amount={p.amount} slug={p.slug} duration={recipe.manufacturingDuration} key={`out-${p.slug}`} />
					))}
				</Column>
			</IngredientsWrapper>
		</Wrapper>
	)
}

export default memo(Recipe)

const Arrow = styled.div`
	flex: 0;
	margin: 8px;

	@media (max-width: 400px) {
		transform: rotate(90deg);
	}
`

const Wrapper = styled.div`
	display: flex;
	border: 1px solid #999;
	flex-direction: column;
	align-items: center;
	padding: 8px;
	border-radius: 5px;
	margin: 4px 0;
	page-break-inside: avoid;
	break-inside: avoid;
	max-width: 100%;
`

const Title = styled.h2`
	margin: 0;
	text-align: center;
	font-size: 16px;
	line-height: 1.2;
	width: 100%;
`

const Column = styled.div`
	flex: 1;
	width: 100%;
`

const IngredientsWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	@media (max-width: 400px) {
		flex-direction: column;
	}
`

const Secondary = styled.div`
	flex: 1 1 20%;
	text-align: right;
	font-size: 11px;
	font-style: italic;
	justify-content: flex-end;
	align-items: center;
	display: flex;
	color: #444;
`

const Header = styled.div`
	display: flex;
	margin-bottom: 4px;
	width: 100%;
`
