import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment } from 'semantic-ui-react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams
} from "react-router-dom";
import { ProgramContext } from './ProgramContext';


function ProgramsBar(props) {
	const [progs, setProgs] = useContext(ProgramContext);
	const [programs, setPrograms] = useState(props.programs);
	const [programId, setProgramId] = useState(props.programId);

	//Update channels from parent
	/*useEffect(() => {
		setPrograms(props.programs);
	}, [props.programs]);

	//Update channelId from parent
	useEffect(() => {
		setProgramId(props.programId);
	}, [props.programId]);*/

	return (
		<div className="h-[100vh] align-top border-r-2">
			<div className="text-l text-black w-full pt-5 px-5 border-b-2">
				<b>Programs</b>
			</div>
			<div className="flex flex-col m-0 p-0 overflow-auto h-[87vh] pb-5 overflow-auto">
				{progs.programs.map((program, index) => {
					return (
						<div
							key={"message" + index}
							style={{ backgroundColor: program.id === progs.programId ? '#bbbbbb' : '#ffffff' }}
							className="p-3 px-5 border-b-2 cursor-pointer"
							onClick={() => { setProgs(prevProgs => { return { ...prevProgs, programId: program.id, channelId: -1 } }); /*props.onClick(program.id)*/ }}
						>
							<p>{program.name}</p>
						</div>
					)
				})}
			</div>
		</div>
	);
}

export default ProgramsBar;