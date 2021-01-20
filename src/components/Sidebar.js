import React, { memo, useCallback, useContext } from 'react'
import styled from 'styled-components'

import { getItemDefinition } from 'loaders/items'

import { ActionType, AppContext } from '../AppContext'
import logo from './logo.png'

//
const SectionHeader = memo(({ icon, label }) => (
	<HeaderWrapper>
		<i className={`fas ${icon} fa-fw`}></i>
		<span> {label}</span>
	</HeaderWrapper>
))

//
const SettingCheckbox = memo(({ label, name, checked, onChange, hint }) => (
	<InputContainer>
		<input id={name} name={name} type="checkbox" checked={checked} onChange={onChange} />
		<label htmlFor={name}>{label}</label>
		{hint && <Hint>{hint}</Hint>}
	</InputContainer>
))

//
const Sidebar = () => {
	const [state, dispatch] = useContext(AppContext)

	const handleFractions = useCallback(e => dispatch({ type: ActionType.TOGGLE_FRACTION }), [
		dispatch,
	])
	const handleDebug = useCallback(e => dispatch({ type: ActionType.TOGGLE_DEBUG }), [dispatch])
	const handleLeftMargin = useCallback(e => dispatch({ type: ActionType.TOGGLE_LEFT_MARGIN }), [
		dispatch,
	])
	const handleOnePerPage = useCallback(e => dispatch({ type: ActionType.TOGGLE_ONE_PER_PAGE }), [
		dispatch,
	])
	const handleCycleAmounts = useCallback(e => dispatch({ type: ActionType.TOGGLE_CYCLE_AMOUNT }), [
		dispatch,
	])

	const handleReturnClick = useCallback(
		slug => {
			dispatch({ type: ActionType.RETURN_PRODUCT, slug })
		},
		[dispatch]
	)

	const handleReturnAllClick = useCallback(
		() => dispatch({ type: ActionType.RETURN_ALL_PRODUCTS }),
		[dispatch]
	)

	const { removedProducts } = state

	return (
		<SidebarWrapper>
			<AppTitle>
				<img src={logo} alt="Satisfactory Notebook" style={{ maxWidth: '100%' }} />
			</AppTitle>

			<SidebarSection>
				<SectionHeader icon="fa-cog" label="Settings" />
				<SettingCheckbox
					label="Use Fractions"
					name="fractions"
					checked={state.checked}
					onChange={handleFractions}
					hint="Conversions are hard"
				/>
				<SettingCheckbox
					label="Show Cycle Amounts"
					name="cycleAmount"
					checked={state.cycleAmount}
					onChange={handleCycleAmounts}
					hint="Include per cycle inputs/outputs"
				/>
				<SettingCheckbox
					label="Pad Left Margin"
					name="leftMargin"
					checked={state.padLeftMargin}
					onChange={handleLeftMargin}
					hint="To account for punched holes"
				/>
				<SettingCheckbox
					label="One Recipe Per Page"
					name="onePerPage"
					checked={state.onePerPage}
					onChange={handleOnePerPage}
					hint="Waste ALL the paper"
				/>
				{process.env.NODE_ENV === 'development' && (
					<SettingCheckbox
						label="Debug Mode"
						name="debug"
						checked={state.debug}
						onChange={handleDebug}
						hint="You won't find this useful"
					/>
				)}
			</SidebarSection>

			{/*  */}
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

			{removedProducts.length > 0 && (
				<SidebarSection>
					<SectionHeader icon="fa-filter" label="Filtered Items" />
					<SectionContent>
						<ul>
							<li onClick={handleReturnAllClick} style={{ cursor: 'pointer', color: 'darkred' }}>
								<strong>Reset All</strong>
							</li>
							{removedProducts.map(p => {
								const product = getItemDefinition(p)
								return (
									<li
										key={p}
										onClick={() => handleReturnClick(p)}
										style={{ cursor: 'pointer', color: 'darkred' }}
									>
										{product.name} <i className="fas fa-times fa-fw" />
									</li>
								)
							})}
						</ul>
					</SectionContent>
				</SidebarSection>
			)}
		</SidebarWrapper>
	)
}

export default memo(Sidebar)

const HeaderWrapper = styled.div`
	margin: 18px 0 12px 0;
	font-weight: bold;
`

const SidebarSection = styled.div`
	margin: 6px 0;
`

const SidebarWrapper = styled.div`
	/* width: 300px; */
	min-width: 260px;
	background: #bbb;
	position: sticky;
	top: 0;
	height: 100vh;
	padding: 10px;

	@media print {
		display: none;
	}

	/* TODO - Extract the max-width to variable */
	@media screen and (max-width: 600px) {
		width: 100%;
		position: unset;
		height: auto;
	}
`

const AppTitle = styled.div`
	/* font-weight: bold;
	font-size: 22px;
	margin-bottom: 6px; */
`

const InputContainer = styled.div`
	margin: 12px 0 12px 18px;
	font-size: 0.9em;
`

const SectionContent = styled.div`
	font-size: 0.8em;
	margin: 12px 0 12px 18px;
`

const Hint = styled.div`
	font-size: 0.8em;
	font-style: italic;
	margin-left: 18px;
	margin-top: 2px;
	color: #444;
`
