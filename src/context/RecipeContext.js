import React, { createContext, useReducer } from 'react'

const initialState = {
	fractions: false,
	cycleAmount: false,
}

export const RecipeAction = {
	TOGGLE_FRACTION: 'TOGGLE_FRACTION',
	TOGGLE_CYCLE_AMOUNT: 'TOGGLE_CYCLE_AMOUNT',
}

export const RecipeContext = createContext(initialState)

const reducer = (state, action) => {
	switch (action.type) {
		case RecipeAction.TOGGLE_FRACTION:
			return {
				...state,
				fractions: !state.fractions,
			}
		case RecipeAction.TOGGLE_CYCLE_AMOUNT:
			return {
				...state,
				cycleAmount: !state.cycleAmount,
			}
		default:
			return state
	}
}

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <RecipeContext.Provider value={[state, dispatch]}>{children}</RecipeContext.Provider>
}

export default ContextProvider
