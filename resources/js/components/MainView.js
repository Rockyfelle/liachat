import React, { useState, useEffect } from 'react';
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


function MainView(props) {
	const [program, setProgram] = useState(useParams().program);
	const [channel, setChannel] = useState(useParams().channel);

	return (
		<div className="m-0">
			<Grid className="m-0">
				<Grid.Row columns={16} className="p-0">
					<Grid.Column width={2} className="p-0">
						<Segment className="h-[100vh]">
							Sidebar 1
						</Segment>
					</Grid.Column>
					<Grid.Column width={2} className="p-0">
						<Segment className="h-[100vh]">
							Sidebar 2
						</Segment>
					</Grid.Column>
					<Grid.Column width={10} className="p-0">
						<Chat />
					</Grid.Column>
					<Grid.Column width={2} className="p-0">
						<Segment className="h-[100vh]">
							Sidebar 3
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	);
}

export default MainView;

if (document.getElementById('mainview')) {
	ReactDOM.render(<MainView />, document.getElementById('mainview'));
}
