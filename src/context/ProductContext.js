import React, { createContext, useReducer } from 'react'

import { ItemType } from 'components/Sidebar/Sidebar'

const initialState = {
	padLeftMargin: false,
	onePerPage: true,
	removedProducts: [],
	showV3: false,
	hiddenTypes: [
		ItemType.ammo,
		// ItemType.component,
		ItemType.ficsmas,
		// ItemType.fuel,
		// ItemType.gas,
		// ItemType.liquid,
		// ItemType.material,
		ItemType.ore,
		// ItemType.special,
		// ItemType.waste,
	],
}

export const ProductAction = {
	TOGGLE_LEFT_MARGIN: 'TOGGLE_LEFT_MARGIN',
	TOGGLE_ONE_PER_PAGE: 'TOGGLE_ONE_PER_PAGE',
	TOGGLE_SHOW_V3: 'TOGGLE_SHOW_V3',
	REMOVE_PRODUCT: 'REMOVE_PRODUCT',
	RETURN_PRODUCT: 'RETURN_PRODUCT',
	RETURN_ALL_PRODUCTS: 'RETURN_ALL_PRODUCTS',
	HIDE_TYPE: 'HIDE_TYPE',
	SHOW_TYPE: 'SHOW_TYPE',
}

export const ProductContext = createContext(initialState)

const reducer = (state, action) => {
	switch (action.type) {
		case ProductAction.TOGGLE_LEFT_MARGIN:
			return {
				...state,
				padLeftMargin: !state.padLeftMargin,
			}
		case ProductAction.TOGGLE_ONE_PER_PAGE:
			return {
				...state,
				onePerPage: !state.onePerPage,
			}
		case ProductAction.TOGGLE_SHOW_V3:
			return {
				...state,
				showV3: !state.showV3,
			}
		// ITEM FILTERING
		case ProductAction.REMOVE_PRODUCT:
			return {
				...state,
				removedProducts: [...state.removedProducts, action.name],
			}
		case ProductAction.RETURN_PRODUCT:
			return {
				...state,
				removedProducts: state.removedProducts.filter(p => !(p === action.name)),
			}
		case ProductAction.RETURN_ALL_PRODUCTS:
			return {
				...state,
				removedProducts: [],
			}
		// BUILDING TYPE
		case ProductAction.HIDE_TYPE:
			// console.log('Hiding: ' + action.name)
			return {
				...state,
				hiddenTypes: [...state.hiddenTypes, action.name],
			}
		case ProductAction.SHOW_TYPE:
			// console.log('Showing: ' + action.name)
			return {
				...state,
				hiddenTypes: state.hiddenTypes.filter(p => !(p === action.name)),
			}
		default:
			return state
	}
}

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <ProductContext.Provider value={[state, dispatch]}>{children}</ProductContext.Provider>
}

export default ContextProvider
