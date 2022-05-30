import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Grid, Segment, Icon } from "semantic-ui-react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams,
} from "react-router-dom";
import { ProgramContext } from "./ProgramContext";

function ChannelsBar(props) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const navigate = useNavigate();
	const [progs, setProgs] = useContext(ProgramContext);
	const [isLoading, setIsLoading] = useState(true);

	const isMounted = useRef(false);


	return (
		<div className="h-[100vh] align-top border-r-1">
			<div className="text-l text-black w-full pt-5 px-5 border-b-2">
				<b>Channels</b>
			</div>
			<div className="flex flex-col overflow-auto m-5 text-xl">
				<p className="text-gray-400 text-lg">Admins</p>
				{progs.users.filter(x => x.role === 'admin').map((user, index) => {
					return (
						<div key={"users" + index}>
							{user.name}
						</div>
					);
				})}
				<p className="text-gray-400 text-lg mt-8">Teachers</p>
				{progs.users.filter(x => x.role === 'teacher').map((user, index) => {
					return (
						<div key={"users" + index} className="mt-3">
							{user.name}
						</div>
					);
				})}
				<p className="text-gray-400 text-lg mt-8">Students</p>
				{progs.users.filter(x => x.role === 'student').map((user, index) => {
					return (
						<div key={"users" + index} className="mt-3">
							{user.name}
						</div>
					);
				})}
			</div>
		</div >
	);
}

export default ChannelsBar;
