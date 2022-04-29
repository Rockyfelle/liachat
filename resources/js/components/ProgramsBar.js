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

	return (
		<div className="h-[100vh] align-top border-r-1">
			<div className="text-l text-black w-full pt-5 px-5 border-b-2">
				<b>Programs</b>
			</div>
			<div className="flex flex-col m-0 overflow-auto h-[87vh] pb-5 overflow-auto p-2 pr-0">
				{progs.programs.map((program, index) => {
					return (
						<div
							key={"message" + index}
							className={`p-2 px-5 mb-2 rounded-l-lg cursor-pointer ${program.id === progs.programId ? 'bg-gradient-to-l from-gray-850 to-gray-600' : 'bg-gray-900'}`}
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