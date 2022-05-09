import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment } from 'semantic-ui-react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams
} from "react-router-dom";
import ProgramsBar from './ProgramsBar';
import ChannelsBar from './ChannelsBar';
import Settings from './Settings'
import Chat from './Chat';
import { ProgramContext } from './ProgramContext';
import UserContext from './UserContext';


function MainView(props) {
	const { user, setUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [channelId, setChannelId] = useState(parseInt(useParams().channel));
	const [programId, setProgramId] = useState(parseInt(useParams().program));
	const [channel, setChannel] = useState({});
	const [messages, setMessages] = useState([]);
	const [updateChat, setUpdateChat] = useState(false);
	const [progs, setProgs] = useContext(ProgramContext);

	//Perform initial fetch
	useEffect(() => {
		fetch(`/api/program/init/${programId}/${channelId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': user.token,
			},
		})
			.then(response => response.json())
			.then(data => {
				setIsLoading(false);
				setProgs({
					programId: programId,
					channelId: channelId,
					resources: data.resources,
					programs: data.programs,
					channels: channelId !== 0 ? data.program.channels : [...progs.channels],
					messages: channelId !== 0 ? data.messages : [...progs.messages],
					users: data.users,
				});
			});
	
	}, []);

	useEffect(() => {
		if(!isLoading){
			window.history.replaceState(null, '',`/program/${progs.programId}/channel/${progs.channelId}`)
		}
	  
	  }, [progs.channelId])

	function changeChannel(channelId) {
		setChannelId(channelId);
		setUpdateChat(!updateChat);
	}

	function changeProgram(programId) {
		setProgramId(programId);
	}

	return (
		<div className="m-0">
			<Grid className="m-0">
				{!isLoading &&
					<Grid.Row columns={16} className="p-0 bg-gray-900 text-gray-200">
						<Grid.Column width={2} className="p-0 bg-gray-950">
							<ProgramsBar />
						</Grid.Column>
						<Grid.Column width={2} className="p-0 bg-gray-850">
							<ChannelsBar />
						</Grid.Column>
						<Grid.Column width={10} className="p-0 bg-gray-750">
							{progs.channelId !== 0 &&
							<Chat
								initMessages={messages}
								channelId={channelId}
								channel={channel}
								update={updateChat}
							/>}
							{progs.channelId === 0 &&
								<Settings />
							}
						</Grid.Column>
						<Grid.Column width={2} className="p-0">
							<Segment className="h-[100vh]" inverted>
								Sidebar 3
							</Segment>
						</Grid.Column>
					</Grid.Row>
				}
			</Grid>
		</div>
	);
}

export default MainView;
