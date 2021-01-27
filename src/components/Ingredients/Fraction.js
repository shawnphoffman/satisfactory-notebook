import { memo } from 'react'
import { styled } from '@linaria/react'

const SmallPart = styled.span`
	font-size: 0.8em;
`

const Fraction = ({ fraction }) => {
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
			<SmallPart>
				<sup>{numer}</sup>&frasl;<sub>{denom}</sub>&nbsp;
			</SmallPart>
		</>
	)
}

export default memo(Fraction)
