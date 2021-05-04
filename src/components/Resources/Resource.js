import { memo } from 'react'
import { styled } from '@linaria/react'

import Page from 'components/Page'

import Recipe from './Recipe'
import RemoveIcon from './RemoveIcon'

// const Recipe = lazy(() => import('components/Resources/Recipe'))

const imageSize = 100

const Resource = ({ item, slug }) => {
	// const iconSrc = getItemIcon(slug)
	const iconSrc = item.icon

	return (
		<Page>
			<Header id={slug}>
				<Details>
					<Title>
						{item.name} <RemoveIcon slug={slug} />
					</Title>
					<Description>{item.description}</Description>
				</Details>
				{iconSrc && (
					<Image
						alt={item.name}
						src={`${process.env.REACT_APP_STATIC_PATH || ''}${iconSrc}`}
						width={imageSize}
						height={imageSize}
						loading="lazy"
					/>
				)}
			</Header>
			{item.recipes.map(recipe => (
				<Recipe recipe={recipe} key={recipe.slug} />
			))}
		</Page>
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
	/* white-space: pre-line; */

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
