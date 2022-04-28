import * as React from 'react'

const ProgramContext = React.createContext({
	user: JSON.parse(localStorage.getItem('user')) || {},
	setUser: () => {},
});

export default ProgramContext;