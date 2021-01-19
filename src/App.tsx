import React, { useState } from 'react'
import styled from 'styled-components'

import { Page } from 'components/Print'
import Recipe from 'components/Recipe'
import { getMachineCraftableProducts } from 'loaders/recipes'
import { importImageManifest } from 'loaders/sgImageRepo'

import AppContext from './AppContext'

const SettingContainer = styled.div`
	margin-right: 15px;
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

	@media print {
		display: none;
	}
`

// Preload images
importImageManifest()

function App() {
	const [fractions, setFractions] = useState(false)
	const [debug, setDebug] = useState(false)

	const products = getMachineCraftableProducts() //.slice(0, 5)
	return (
		<>
			<AppContext.Provider value={{ useFractions: fractions, debug: debug }}>
				<SettingsHeader>
					<SettingContainer>
						<input
							name="fractions"
							type="checkbox"
							checked={fractions}
							onChange={e => setFractions(e.target.checked)}
						/>
						<label htmlFor="fractions">Use Fractions</label>
					</SettingContainer>
					<SettingContainer>
						<input
							name="debug"
							type="checkbox"
							checked={debug}
							onChange={e => setDebug(e.target.checked)}
						/>
						<label htmlFor="debug">Debug</label>
					</SettingContainer>
				</SettingsHeader>
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
