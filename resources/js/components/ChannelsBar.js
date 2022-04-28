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


function ChannelsBar(props) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [progs, setProgs] = useContext(ProgramContext);
	const [isLoading, setIsLoading] = useState(true);
	const [channels, setChannels] = useState(props.channels);
	const [channelId, setChannelId] = useState(props.channelId);
	const isMounted = useRef(false);

	//Update channels from parent
	/*useEffect(() => {
		//setChannels(props.channels);
		setProgs(prevProgs => { return {...prevProgs, channels: props.channels} });
	}, [props.channels]);

	//Update channelId from parent
	useEffect(() => {
		//setChannelId(props.channelId);
		setProgs(prevProgs => { return {...prevProgs, channelId: data.channelId} });
	}, [props.channelId]);*/

	//Load channels when switching program id
	useEffect(() => {
		if (isMounted.current) {
			fetch(`/api/program/load/${progs.programId}/`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': user.token,
				},
			})
				.then(response => response.json())
				.then(data => {
					//setChannels(data.channels);
					setProgs(prevProgs => { return { ...prevProgs, channels: data.channels } });
					setIsLoading(false);
				});
		} else {
			isMounted.current = true;
		}
	}, [progs.programId]);

	return (
		<div className="h-[100vh] align-top border-r-2">
			<div className="text-l text-black w-full pt-5 px-5 border-b-2">
				<b>Channels</b>
			</div>
			<div className="flex flex-col m-0 p-0 overflow-auto h-[87vh] pb-5 overflow-auto">
				{progs.channels.map((channel, index) => {
					return (
						<div
							key={"message" + index}
							style={{ backgroundColor: channel.id === progs.channelId ? '#bbbbbb' : '#ffffff' }}
							className="p-3 px-5 border-b-2 cursor-pointer"
							onClick={() => { setProgs(prevProgs => { return { ...prevProgs, channelId: channel.id } }); /*props.onClick(channel.id)*/ }}
						>
							<p>{channel.name}</p>
						</div>
					)
				})}
			</div>
		</div>
	);
}

export default ChannelsBar;