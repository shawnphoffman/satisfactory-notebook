import React from 'react'

const initialState = {
	fractions: false,
	debug: false,
	leftMargin: true,
}

const AppContext = React.createContext(initialState)

export default AppContext

// export const AppContextProvider = props => {

// 	return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
// }

// AppContextProvider.propTypes = {
// 	children: PropTypes.any,
// }

// export default AppContext
