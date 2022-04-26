import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment } from 'semantic-ui-react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams
} from "react-router-dom";
import Program from './ProgramsBar';


function ChannelsBar(props) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [isLoading, setIsLoading] = useState(true);
	const [channels, setChannels] = useState(props.channels);
	const [channelId, setChannelId] = useState(props.channelId);
	const isMounted = useRef(false);

	//Update channels from parent
	useEffect(() => {
		setChannels(props.channels);
	}, [props.channels]);

	//Update channelId from parent
	useEffect(() => {
		setChannelId(props.channelId);
	}, [props.channelId]);

	//Load channels when switching program id
	useEffect(() => {
		if (isMounted.current) {
			fetch(`/api/program/load/${props.programId}/`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': user.token,
				},
			})
				.then(response => response.json())
				.then(data => {
					setChannels(data.channels);
					setIsLoading(false);
				});
		} else {
			isMounted.current = true;
		}
	}, [props.programId]);

	return (
		<div className="h-[100vh] align-top border-r-2">
			<div className="text-l text-black w-full pt-5 px-5 border-b-2">
				<b>Channels</b>
			</div>
			<div className="flex flex-col m-0 p-0 overflow-auto h-[87vh] pb-5 overflow-auto">
				{channels.map((channel, index) => {
					return (
						<div
							key={"message" + index}
							style={{ backgroundColor: channel.id === channelId ? '#bbbbbb' : '#ffffff' }}
							className="p-3 px-5 border-b-2 cursor-pointer"
							onClick={() => { props.onClick(channel.id) }}
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