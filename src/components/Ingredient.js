import React, { memo, useContext } from 'react'
import styled from 'styled-components'

import { getItemDefinition, getItemIcon } from 'loaders/items'
import { calculateRate } from 'loaders/recipes'

import { AppContext } from '../AppContext'
import Fraction from './Fraction'

const imageSize = 30

//
const Rate = memo(({ perMinFraction, perMin }) => {
	const [{ fractions }] = useContext(AppContext)
	return <strong>{fractions ? <Fraction fraction={perMinFraction} /> : perMin}</strong>
})

//
const CycleRate = memo(({ perCycle, perCycleLabel }) => {
	const [{ cycleAmount }] = useContext(AppContext)
	if (!cycleAmount) return null
	return (
		<CycleAmount>
			{perCycle}
			{perCycleLabel}
		</CycleAmount>
	)
})

//
const Ingredient = ({ slug, amount, duration }) => {
	const itemDef = getItemDefinition(slug)
	const rate = calculateRate(amount, duration, itemDef.form === 2)

	return (
		<Wrapper key={slug}>
			<Header>
				{itemDef.icon ? <Image src={getItemIcon(slug)} alt={itemDef.name} width={imageSize} height={imageSize} /> : null}
				<CycleRate perCycleLabel={rate.perCycleLabel} perCycle={rate.perCycle} />
				<Name href={`#${slug}`}>{itemDef.name}</Name>
			</Header>
			<Quantity>
				<Rate perMin={rate.perMin} perMinFraction={rate.perMinFraction} />
				<small>{rate.perMinLabel}</small>
			</Quantity>
		</Wrapper>
	)
}

export default memo(Ingredient)

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 2px 0px;
	background: #ededed;
	padding: 4px 5px;
	border-radius: 5px;
`

const Header = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
	line-height: 1.2;
`

const Image = styled.img`
	max-width: 100%;
	width: ${imageSize}px;
	height: ${imageSize}px;
	margin-right: 3px;
`

const Name = styled.a`
	padding-right: 3px;
`

const CycleAmount = styled.span`
	margin-right: 5px;
`

const Quantity = styled.div`
	line-height: 1.2;
	white-space: nowrap;
`
