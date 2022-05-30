import React, { useState } from 'react';

export const ProgramContext = React.createContext({});

export const ProgramProvider = (props) => {
	const [progs, setProgs] = useState({
		programId: null,
		channelId: null,
		resources: [],
		programs: [],
		channels: [],
		messages: [],
		users: [],
		channel: null,
		program: null,
	});
	return (
		<ProgramContext.Provider value={[progs, setProgs]}>
			{props.children}
		</ProgramContext.Provider>
	);
}