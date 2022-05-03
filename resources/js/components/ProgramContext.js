import React, { useState } from 'react';

export const ProgramContext = React.createContext({});

export const ProgramProvider = (props) => {
	const [progs, setProgs] = useState({
		programId: null,
		channelId: null,
		programs: [],
		channels: [],
		messages: [],
		users: [],
	});
	return (
		<ProgramContext.Provider value={[progs, setProgs]}>
			{props.children}
		</ProgramContext.Provider>
	);
}