import React, { createContext, useReducer } from 'react'

const initialState = {
	fractions: false,
	// debug: false,
	padLeftMargin: false,
	onePerPage: true,
	cycleAmount: false,
	removedProducts: [],
}

export const ActionType = {
	TOGGLE_FRACTION: 'TOGGLE_FRACTION',
	// TOGGLE_DEBUG: 'TOGGLE_DEBUG',
	TOGGLE_CYCLE_AMOUNT: 'TOGGLE_CYCLE_AMOUNT',
	TOGGLE_LEFT_MARGIN: 'TOGGLE_LEFT_MARGIN',
	TOGGLE_ONE_PER_PAGE: 'TOGGLE_ONE_PER_PAGE',
	REMOVE_PRODUCT: 'REMOVE_PRODUCT',
	RETURN_PRODUCT: 'RETURN_PRODUCT',
	RETURN_ALL_PRODUCTS: 'RETURN_ALL_PRODUCTS',
}

export const AppContext = createContext(initialState)

const reducer = (state, action) => {
	switch (action.type) {
		case ActionType.TOGGLE_FRACTION:
			return {
				...state,
				fractions: !state.fractions,
			}
		// case ActionType.TOGGLE_DEBUG:
		// 	return {
		// 		...state,
		// 		debug: !state.debug,
		// 	}
		case ActionType.TOGGLE_LEFT_MARGIN:
			return {
				...state,
				padLeftMargin: !state.padLeftMargin,
			}
		case ActionType.TOGGLE_ONE_PER_PAGE:
			return {
				...state,
				onePerPage: !state.onePerPage,
			}
		case ActionType.TOGGLE_CYCLE_AMOUNT:
			return {
				...state,
				cycleAmount: !state.cycleAmount,
			}
		// FILTERING
		case ActionType.REMOVE_PRODUCT:
			return {
				...state,
				removedProducts: [...state.removedProducts, action.slug],
			}
		case ActionType.RETURN_PRODUCT:
			return {
				...state,
				removedProducts: state.removedProducts.filter(p => !(p === action.slug)),
			}
		case ActionType.RETURN_ALL_PRODUCTS:
			return {
				...state,
				removedProducts: [],
			}
		default:
			return state
	}
}

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>
}

export default ContextProvider
