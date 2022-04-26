import * as React from 'react'

const ProgramContext = React.createContext({
	user: {},
	setUser: () => {},
});

export default ProgramContext;