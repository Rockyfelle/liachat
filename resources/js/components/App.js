import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment } from 'semantic-ui-react';

function App() {
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
						<Segment className="h-[100vh]">
							Main Area
						</Segment>
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

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}
