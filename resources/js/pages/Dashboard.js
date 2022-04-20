import React, { useEffect, useState, useRef } from 'react'
import { Form } from 'semantic-ui-react';
import { Grid, Segment } from 'semantic-ui-react';


function Dashboard() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [isLoading, setIsLoading] = useState(true);
	const [channel, setChannel] = useState({});
	const [messages, setMessages] = useState([]);
	const [sendMessages, setSendMessages] = useState([]);
	const [input, setInput] = useState('');
	const [tick, setTick] = useState(false);
	const [int, setInt] = useState(null);



	//const date = new Date(Date.now()).toISOString();
	const date = '2022-04-12T21:20:12.000000Z';

	useEffect(() => {
		fetch(`/api/channel/3/${date}/50`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': user.token,
			},
		})
			.then(response => response.json())
			.then(data => {
				setIsLoading(false);
				setChannel(data.channel);
				setMessages(data.messages);
			});
	}, []);

	//Post message to channel
	function postMessage() {
		setInput('');
		setSendMessages([...sendMessages, { user: {...user, token: ''} ,content: input, created_at: '2022-04-12T21:20:12.000000Z' }]);
		fetch(`/api/message/3`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': user.token,
			},
			body: JSON.stringify({
				content: input,
				mimic_user: 1
			})
		})
			.then(response => response.json())
			.then(data => {
				//setSendMessages([]);
			});
	}console.log(sendMessages)

	//Check for updates every second
	function fetchUpdates() {
		//console.log("a load");
		if (!isLoading) {
			//console.log("a tick");
			fetch(`/api/channel/new/3/${messages[0].id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': user.token,
				},
			})
				.then(response => response.json())
				.then(data => {
					setChannel(data.channel);
					const moreModdedMessages = data.messages.concat(messages);
					setMessages(moreModdedMessages);
					setSendMessages(sendMessages.filter(x => data.messages.find(y => y.content === x.content) === undefined));
				});
		}
	}

	//Set updates to be checked every second
	useInterval(fetchUpdates, 750);

	//Set updates to be checked every second
	function useInterval(callback, delay) {
		const savedCallback = useRef();

		// Remember the latest callback.
		useEffect(() => {
			savedCallback.current = callback;
		}, [callback]);

		// Set up the interval.
		useEffect(() => {
			function tick() {
				savedCallback.current();
			}
			if (delay !== null) {
				let id = setInterval(tick, delay);
				return () => clearInterval(id);
			}
		}, [delay]);
	}

	//Format date for humans
	function timeFormat(time) {
		return (time.substr(0, 10) + ' at ' + time.substr(11, 8));
	}

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
						<div className="flex flex-col-reverse m-0 p-0 overflow-auto h-[100vh] pb-5 overflow-auto">
							<div className="text-l text-black w-full px-5 mt-10">
								<Form>
									<Form.Input
										fluid
										action={{
											content: 'Post',
											onClick: postMessage
										}}
										placeholder='Message @admin'
										value={input}
										onChange={(e, { value }) => setInput(value)}
									/>
								</Form>
							</div>
							{sendMessages.reverse().map((message, index) => {
								return (
									<div key={"message" + index} className="p-3 px-5">
										<div className="text-l text-neutral-500 w-full border-b-2 pb-2">
											<p className="text-2xl">{message.user.name}</p>
											<p className="text-s">{'Just Now'}</p>
											<p className="text-xl">{message.content}</p>
										</div>
									</div>
								)
							})}
							{messages.map((message, index) => {
								return (
									<div key={"message" + index} className="p-3 px-5">
										<div className="text-l text-black w-full border-b-2 pb-2">
											<p className="text-2xl">{message.user.name}</p>
											<p className="text-s">{timeFormat(message.created_at)}</p>
											<p className="text-xl">{message.content}</p>
										</div>
									</div>
								)
							})}
							<div>

							</div>
						</div>
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