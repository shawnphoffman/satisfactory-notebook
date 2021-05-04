import { memo, useContext } from 'react'
import { styled } from '@linaria/react'

import { RecipeContext } from 'context/RecipeContext'

//
const CycleRate = ({ perCycle, perCycleLabel }) => {
	const [{ cycleAmount }] = useContext(RecipeContext)
	if (!cycleAmount) return null
	return (
		<CycleAmount>
			{perCycle}
			{perCycleLabel}
		</CycleAmount>
	)
}

export default memo(CycleRate)

const CycleAmount = styled.span`
	margin-right: 5px;
`
