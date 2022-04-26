import * as React from 'react'

const ProgramContext = React.createContext({
	progs: 'ee',
	setProgs: () => {},
});

export default ProgramContext;