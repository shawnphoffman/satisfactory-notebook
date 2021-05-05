import React, { memo, useCallback, useContext } from 'react'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'
import * as Sentry from '@sentry/react'

import { ProductAction, ProductContext } from 'context/ProductContext'
import { RecipeAction, RecipeContext } from 'context/RecipeContext'

import ProductListItem from './ProductListItem'
import SectionHeader from './SectionHeader'
import SettingCheckbox from './SettingCheckbox'

// TODO - TEMP
export const ItemType = {
	ammo: 'Ammo',
	component: 'Component',
	ficsmas: 'FICSMAS',
	fuel: 'Fuel',
	gas: 'Gas',
	liquid: 'Liquid',
	material: 'Material',
	ore: 'Ore',
	special: 'Special',
	waste: 'Waste',
}

//
const Sidebar = () => {
	const [stateProduct, dispatchProduct] = useContext(ProductContext)
	const [stateRecipe, dispatchRecipe] = useContext(RecipeContext)

	//
	const handleFractions = useCallback(() => {
		dispatchRecipe({ type: RecipeAction.TOGGLE_FRACTION })

		Sentry.addBreadcrumb({
			category: 'setting-change',
			message: 'Fraction changed',
			level: Sentry.Severity.Info,
		})

		Panelbear.track('Fraction_Changed')
	}, [dispatchRecipe])

	//
	const handleLeftMargin = useCallback(() => {
		dispatchProduct({ type: ProductAction.TOGGLE_LEFT_MARGIN })

		Sentry.addBreadcrumb({
			category: 'setting-change',
			message: 'Left-margin changed',
			level: Sentry.Severity.Info,
		})

		Panelbear.track('Left-Margin_Changed')
	}, [dispatchProduct])

	//
	const handleOnePerPage = useCallback(() => {
		dispatchProduct({ type: ProductAction.TOGGLE_ONE_PER_PAGE })

		Sentry.addBreadcrumb({
			category: 'setting-change',
			message: 'One-per-page changed',
			level: Sentry.Severity.Info,
		})

		Panelbear.track('One-Page_Changed')
	}, [dispatchProduct])

	//
	const handleShowV3 = useCallback(() => {
		dispatchProduct({ type: ProductAction.TOGGLE_SHOW_V3 })

		Sentry.addBreadcrumb({
			category: 'setting-change',
			message: 'Show V3 changed',
			level: Sentry.Severity.Info,
		})

		Panelbear.track('v3_Changed')
	}, [dispatchProduct])

	//
	const handleAlternates = useCallback(() => {
		dispatchRecipe({ type: RecipeAction.TOGGLE_ALTERNATES })

		Sentry.addBreadcrumb({
			category: 'setting-change',
			message: 'Show alternates changed',
			level: Sentry.Severity.Info,
		})

		Panelbear.track('Alternate-Recipes_Changed')
	}, [dispatchRecipe])

	//
	const handleCycleAmounts = useCallback(() => {
		dispatchRecipe({ type: RecipeAction.TOGGLE_CYCLE_AMOUNT })

		Sentry.addBreadcrumb({
			category: 'setting-change',
			message: 'Cycle-amounts changed',
			level: Sentry.Severity.Info,
		})

		Panelbear.track('Cycle-Amounts_Changed')
	}, [dispatchRecipe])

	//
	const handleReturnClick = useCallback(
		name => {
			dispatchProduct({ type: ProductAction.RETURN_PRODUCT, name })

			Sentry.addBreadcrumb({
				category: 'product-returned',
				message: `Returned: ${name}`,
				level: Sentry.Severity.Info,
			})

			Panelbear.track(`Product-${name.replace(/\s+/g, '-')}_Returned`)
		},
		[dispatchProduct]
	)

	//
	const handleTypeToggleClick = useCallback(
		(type, checked) => {
			dispatchProduct({
				type: checked ? ProductAction.HIDE_TYPE : ProductAction.SHOW_TYPE,
				name: type,
			})

			// Sentry.addBreadcrumb({
			// 	category: 'setting-change',
			// 	message: 'One-per-page changed',
			// 	level: Sentry.Severity.Info,
			// })

			Panelbear.track(`Type-${type}_${checked ? 'Hidden' : 'Shown'}`)
		},
		[dispatchProduct]
	)

	//
	const handleReturnAllClick = useCallback(() => {
		dispatchProduct({ type: ProductAction.RETURN_ALL_PRODUCTS })

		Sentry.addBreadcrumb({
			category: 'all-products-returned',
			message: 'Returned all products',
			level: Sentry.Severity.Info,
		})

		Panelbear.track('All-Products_Returned')
	}, [dispatchProduct])

	return (
		<>
			<VersionLabel>Early Access v0.4.2.0</VersionLabel>
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
				<SettingCheckbox
					label="Show Alternate Recipes"
					name="includeAlternates"
					checked={stateRecipe.includeAlternates}
					onChange={handleAlternates}
					hint="Find more hard drives"
				/>
				<SettingCheckbox
					label="Show v3 Recipes"
					name="showV3"
					checked={stateProduct.showV3}
					onChange={handleShowV3}
					hint="Compare the old and new"
				/>
			</SidebarSection>

			{/*  */}
			<SidebarSection>
				<SectionHeader icon="fa-check-circle" label="Categories" />
				{Object.values(ItemType).map(type => (
					<SettingCheckbox
						key={type}
						label={type}
						name={`cat-${type}`}
						checked={!stateProduct.hiddenTypes.includes(type)}
						onChange={() => handleTypeToggleClick(type, !stateProduct.hiddenTypes.includes(type))}
					/>
				))}
			</SidebarSection>

			{/*  */}
			{stateProduct.removedProducts.length > 0 && (
				<SidebarSection>
					<SectionHeader icon="fa-filter" label="Filtered Items" />
					<SectionContent>
						<ul>
							<Reset onClick={handleReturnAllClick}>Reset All</Reset>
							{stateProduct.removedProducts.map(p => (
								<ProductListItem name={p} key={p} onClick={handleReturnClick} />
							))}
						</ul>
					</SectionContent>
				</SidebarSection>
			)}

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

			{/*  */}
			<Disclaimer>
				Assets come from Satisfactory or from websites created and owned by Coffee Stain Studios. All copyright and registered trademarks
				present in the images are proprietary to Coffee Stain Studios.
			</Disclaimer>
		</>
	)
}

export default memo(Sidebar)

const VersionLabel = styled.div`
	font-size: 12px;
	margin-top: 6px;
`

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
	color: #454545;
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
