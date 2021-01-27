import React, { memo, useCallback, useContext } from 'react'
import { styled } from '@linaria/react'
import * as Sentry from '@sentry/react'

import { ProductAction, ProductContext } from 'context/ProductContext'
import { RecipeAction, RecipeContext } from 'context/RecipeContext'

import ProductListItem from './ProductListItem'
import SectionHeader from './SectionHeader'
import SettingCheckbox from './SettingCheckbox'

//
const Sidebar = () => {
	const [stateProduct, dispatchProduct] = useContext(ProductContext)
	const [stateRecipe, dispatchRecipe] = useContext(RecipeContext)

	const handleFractions = useCallback(() => {
		dispatchRecipe({ type: RecipeAction.TOGGLE_FRACTION })

		Sentry.addBreadcrumb({
			category: 'setting-change',
			message: 'Fraction changed',
			level: Sentry.Severity.Info,
		})
	}, [dispatchRecipe])
	const handleLeftMargin = useCallback(() => {
		dispatchProduct({ type: ProductAction.TOGGLE_LEFT_MARGIN })

		Sentry.addBreadcrumb({
			category: 'setting-change',
			message: 'Left-margin changed',
			level: Sentry.Severity.Info,
		})
	}, [dispatchProduct])
	const handleOnePerPage = useCallback(() => {
		dispatchProduct({ type: ProductAction.TOGGLE_ONE_PER_PAGE })

		Sentry.addBreadcrumb({
			category: 'setting-change',
			message: 'One-per-page changed',
			level: Sentry.Severity.Info,
		})
	}, [dispatchProduct])
	const handleCycleAmounts = useCallback(() => {
		dispatchRecipe({ type: RecipeAction.TOGGLE_CYCLE_AMOUNT })

		Sentry.addBreadcrumb({
			category: 'setting-change',
			message: 'Cycle-amounts changed',
			level: Sentry.Severity.Info,
		})
	}, [dispatchRecipe])
	const handleReturnClick = useCallback(
		slug => {
			dispatchProduct({ type: ProductAction.RETURN_PRODUCT, slug })

			Sentry.addBreadcrumb({
				category: 'product-returned',
				message: `Returned: ${slug}`,
				level: Sentry.Severity.Info,
			})
		},
		[dispatchProduct]
	)
	const handleReturnAllClick = useCallback(() => {
		dispatchProduct({ type: ProductAction.RETURN_ALL_PRODUCTS })

		Sentry.addBreadcrumb({
			category: 'all-products-returned',
			message: 'Returned all products',
			level: Sentry.Severity.Info,
		})
	}, [dispatchProduct])

	return (
		<>
			<SidebarSection>
				<SectionHeader icon="fa-cog" label="Settings" />
				<SettingCheckbox
					label="Use Fractions"
					name="fractions"
					checked={stateRecipe.checked}
					onChange={handleFractions}
					hint="Conversions are hard"
				/>
				<SettingCheckbox
					label="Show Cycle Amounts"
					name="cycleAmount"
					checked={stateRecipe.cycleAmount}
					onChange={handleCycleAmounts}
					hint="Include per cycle inputs/outputs"
				/>
				<HideMobile>
					<SettingCheckbox
						label="Pad Left Margin"
						name="leftMargin"
						checked={stateProduct.padLeftMargin}
						onChange={handleLeftMargin}
						hint="To account for punched holes"
					/>
					<SettingCheckbox
						label="One Recipe Per Page"
						name="onePerPage"
						checked={stateProduct.onePerPage}
						onChange={handleOnePerPage}
						hint="Waste ALL the paper"
					/>
				</HideMobile>
			</SidebarSection>

			{/*  */}
			<HideMobile>
				<SidebarSection>
					<SectionHeader icon="fa-print" label="Print Settings" />
					<SectionContent>
						<ul>
							<li>
								<strong>Margins:</strong> None
							</li>
							<li>
								<strong>Scale:</strong> 100
							</li>
							<li>
								<strong>Background Graphics:</strong> ✅️
							</li>
						</ul>
					</SectionContent>
				</SidebarSection>
			</HideMobile>

			{stateProduct.removedProducts.length > 0 && (
				<SidebarSection>
					<SectionHeader icon="fa-filter" label="Filtered Items" />
					<SectionContent>
						<ul>
							<Reset onClick={handleReturnAllClick}>Reset All</Reset>
							{stateProduct.removedProducts.map(p => (
								<ProductListItem slug={p} key={p} onClick={handleReturnClick} />
							))}
						</ul>
					</SectionContent>
				</SidebarSection>
			)}
			<Disclaimer>
				Assets come from Satisfactory or from websites created and owned by Coffee Stain Studios. All copyright and registered trademarks
				present in the images are proprietary to Coffee Stain Studios.
			</Disclaimer>
		</>
	)
}

export default memo(Sidebar)

const SidebarSection = styled.div`
	margin: 6px 0;
`

const SectionContent = styled.div`
	font-size: 0.8em;
	margin: 12px 0 12px 18px;
`

const Reset = styled.li`
	color: darkred;
	cursor: pointer;
	font-weight: bold;
`

const HideMobile = styled.div`
	@media (max-width: 600px) {
		display: none;
	}
`

const Disclaimer = styled.div`
	width: 240px;
	font-size: 11px;
	color: #555;
	line-height: 1.4;
	font-style: italic;
	flex: 1;
	display: flex;
	justify-content: flex-end;
	flex-direction: column;

	@media print {
		display: none;
	}

	@media (max-width: 600px) {
		display: none;
	}
`
