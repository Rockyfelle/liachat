import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment } from 'semantic-ui-react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams
} from "react-router-dom";
import Program from './ProgramsBar';


function MainView(props) {
	const [channels, setChannels] = useState(props.channels);

	//Update channels from parent
	useEffect(() => {
		setChannels(props.channels);
	}, [props.channels]);

	return (
		<div className="m-0">
			<Grid className="m-0">
				<Grid.Row columns={16} className="p-0">
					<Grid.Column width={2} className="p-0">
						<Segment className="h-[100vh]">
							Sidebar 1
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
