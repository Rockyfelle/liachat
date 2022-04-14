import React, { useEffect, useState } from 'react'
import { Grid, Segment } from 'semantic-ui-react';


function Dashboard() {
	const [isLoading, setIsLoading] = useState(true);
	const [channel, setChannel] = useState({});
	const [messages, setMessages] = useState([]);
	
	//const date = new Date(Date.now()).toISOString();
	const date = '2022-04-12T21:20:12.000000Z';

	useEffect(() => {
		fetch(`/api/channel/3/${date}/5`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				//'Authorization': userObject.token,
			},
		})
			.then(response => response.json())
			.then(data => {
				setIsLoading(false);
				setChannel(data.channel);
				setMessages(data.messages);
			});
	}, []);

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
							{messages.map((message, index) => {
								return (
									<Segment key={"msg" + index}>
										<b><p>{message.user.name}</p></b>
										<p>{message.content}</p>
										<p>({message.created_at})</p>
									</Segment>
								)
							})}
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
	)
}

export default Dashboard