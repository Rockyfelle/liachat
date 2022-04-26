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
import Chat from './Chat';
import ProgramContext from './ProgramContext';


function MainView(props) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [isLoading, setIsLoading] = useState(true);
	const [channelId, setChannelId] = useState(parseInt(useParams().channel));
	const [programId, setProgramId] = useState(parseInt(useParams().program));
	const [program, setProgram] = useState({});
	const [channel, setChannel] = useState({});
	const [channels, setChannels] = useState([]);
	const [programs, setPrograms] = useState([]);
	const [messages, setMessages] = useState([]);
	const [updateChat, setUpdateChat] = useState(false);
	const { progs, setProgs } = useContext(ProgramContext);

	setTimeout(() => setProgs('ijwdoiawjdawd'), 1000);

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
				setPrograms(data.programs);
				setChannels(data.program.channels);
				setProgram(data.program);
				setChannel(data.channel);
				setMessages(data.messages);
				setIsLoading(false);
			});
	}, []);

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
				{!isLoading && <Grid.Row columns={16} className="p-0">
					<Grid.Column width={2} className="p-0">
						<ProgramsBar
							programs={programs}
							onClick={changeProgram}
							programId={programId}
						/>
					</Grid.Column>
					<Grid.Column width={2} className="p-0">
						<ChannelsBar
							channels={channels}
							onClick={changeChannel}
							channelId={channelId}
							programId={programId}
						/>
					</Grid.Column>
					<Grid.Column width={10} className="p-0">
						<Chat
							initMessages={messages}
							channelId={channelId}
							channel={channel}
							update={updateChat}
						/>
					</Grid.Column>
					<Grid.Column width={2} className="p-0">
						<Segment className="h-[100vh]">
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