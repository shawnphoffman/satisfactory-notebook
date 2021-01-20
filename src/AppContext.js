import React, { createContext, useReducer } from 'react'

const initialState = {
	fractions: false,
	debug: false,
	padLeftMargin: false,
	onePerPage: true,
}

export const ActionType = {
	TOGGLE_FRACTION: 'TOGGLE_FRACTION',
	TOGGLE_DEBUG: 'TOGGLE_DEBUG',
	TOGGLE_LEFT_MARGIN: 'TOGGLE_LEFT_MARGIN',
	TOGGLE_ONE_PER_PAGE: 'TOGGLE_ONE_PER_PAGE',
}

export const AppContext = createContext(initialState)

const reducer = (state, action) => {
	switch (action.type) {
		case ActionType.TOGGLE_FRACTION:
			return {
				...state,
				fractions: !state.fractions,
			}
		case ActionType.TOGGLE_DEBUG:
			return {
				...state,
				debug: !state.debug,
			}
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
		default:
			return state
	}
}

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>
}

export default ContextProvider
