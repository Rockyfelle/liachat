import React, { useEffect, useState, useRef } from 'react'
import { Form } from 'semantic-ui-react';
import { Grid, Segment } from 'semantic-ui-react';
import Pusher from 'pusher-js';


function Chat(props) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [isLoading, setIsLoading] = useState(true);
	const [channel, setChannel] = useState(props.channel);
	const [channelId, setChannelId] = useState(props.channelId);
	const [messages, setMessages] = useState(props.initMessages);
	const [sendMessages, setSendMessages] = useState([]);
	const [input, setInput] = useState('');
	const [tick, setTick] = useState(false);
	const [int, setInt] = useState(null);
	const [pusher, setPusher] = useState(undefined);
	const [broadcast, setBroadcast] = useState(undefined);
	const isMounted = useRef(false);

	//Load messages when switching channel id
	useEffect(() => {
		if (isMounted.current) {
			fetch(`/api/channel/load/${props.channelId}/`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': user.token,
				},
			})
				.then(response => response.json())
				.then(data => {
					setMessages(data.messages);
					setIsLoading(false);
				});
		} else {
			isMounted.current = true;
		}
	}, [props.channelId]);

	//const date = new Date(Date.now()).toISOString();
	const date = '2022-04-12T21:20:12.000000Z';

	/*useEffect(() => {
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
	}, []);*/

	function postMessage() {
		if (input.length > 0) {
			setInput('');
			setSendMessages([...sendMessages, { content: input, created_at: '2022-04-12T21:20:12.000000Z' }]);
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
		}
	}

	function fetchUpdates() {
		console.log("a load");
		if (!isLoading) {
			console.log("a tick");
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

	//When in a new channel, bind new websocket
	useEffect(() => {
		if (channel !== undefined) {
			const pusher = new Pusher('eee151f95c1c086f4dc8', {
				cluster: 'eu'
			});
			const broadcastChannel = pusher.subscribe('channel' + channel.id);
			broadcastChannel.bind('new_message', function (data) {

				const parsed = data.message;
				setSendMessages(prevMessages => prevMessages.filter(x => parsed.messages.find(y => y.content === x.content) === undefined));
				setMessages(prevMessages => (parsed.messages.concat(prevMessages)));
			});

			setPusher(pusher);
			setBroadcast(broadcastChannel);
		}

		return (() => {
			if (broadcast) broadcast.unbind('broadcaster')
		});

	}, [channel.id]);

	//useInterval(fetchUpdates, 750);

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

	return (
		<div className="h-[100vh] align-top">
			<div className="text-l text-black w-full pt-5 px-5 border-b-2">
				testing
			</div>
			<div className="flex flex-col-reverse m-0 p-0 overflow-auto h-[87vh] pb-5 overflow-auto">
				{sendMessages.reverse().map((message, index) => {
					return (
						<div key={"message" + index} className="p-3 px-5">
							<div className="text-l text-neutral-500 w-full border-b-2 pb-2">
								<p className="text-2xl">{'me'}</p>
								<p className="text-s">{message.created_at.substr(0, 10)} at {message.created_at.substr(11, 8)}</p>
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
								<p className="text-s">{message.created_at.substr(0, 10)} at {message.created_at.substr(11, 8)}</p>
								<p className="text-xl">{message.content}</p>
							</div>
						</div>
					)
				})}
				<div>

				</div>
			</div>
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
		</div>
	)
}

export default Chat;