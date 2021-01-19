import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { Page } from 'components/Print'
import Recipe from 'components/Recipe'
import { getMachineCraftableProducts } from 'loaders/recipes'
import { importImageManifest } from 'loaders/sgImageRepo'

import AppContext from './AppContext'

const Instructions = styled.div`
	height: 60px;
	padding: 5px;
	box-sizing: border-box;
	background: lightsalmon;
	display: flex;
	align-items: center;

	@media print {
		display: none;
	}
`

const AppTitle = styled.div`
	font-weight: bold;
	margin-right: 25px;
	font-size: 18px;
`

const SettingContainer = styled.div`
	margin-right: 25px;
`

const SettingsHeader = styled.div`
	height: 60px;
	display: flex;
	align-items: center;
	padding: 5px;
	box-sizing: border-box;
	background: lightblue;
	position: sticky;
	top: 0;
	z-index: 1;

	@media print {
		display: none;
	}
`

// Preload images
importImageManifest()

function App() {
	const [fractions, setFractions] = useState(false)
	const [debug, setDebug] = useState(false)
	const [leftMargin, setLeftMargin] = useState(true)

	const products = getMachineCraftableProducts() //.slice(0, 15)

	const handleFractions = useCallback(e => setFractions(e.target.checked), [])
	const handleDebug = useCallback(e => setDebug(e.target.checked), [])
	const handleLeftMargin = useCallback(e => setLeftMargin(e.target.checked), [])

	return (
		<>
			<AppContext.Provider value={{ fractions, debug, leftMargin }}>
				<SettingsHeader>
					<AppTitle>Satisfactory Notebook 📓️</AppTitle>
					<SettingContainer>
						<input
							id="fractions"
							name="fractions"
							type="checkbox"
							checked={fractions}
							onChange={handleFractions}
						/>
						<label htmlFor="fractions">Use Fractions</label>
					</SettingContainer>
					<SettingContainer>
						<input
							id="leftMargin"
							name="leftMargin"
							type="checkbox"
							checked={leftMargin}
							onChange={handleLeftMargin}
						/>
						<label htmlFor="leftMargin">Pad Left Margin</label>
					</SettingContainer>
					<SettingContainer>
						<input id="debug" name="debug" type="checkbox" checked={debug} onChange={handleDebug} />
						<label htmlFor="debug">Debug</label>
					</SettingContainer>
				</SettingsHeader>
				<Instructions>
					Instructions for print dialog: Set "Margins" to "None", "Scale" to "100", and "Background
					Graphics" to enabled
				</Instructions>
				{products.map(p => (
					<Page key={p}>
						<Recipe slug={p} />
					</Page>
				))}
			</AppContext.Provider>
		</>
	)
}

export default App
