import React, { useEffect, useState, useRef, useContext } from "react";
import { Grid, Segment, Form, Input, Menu, Button } from "semantic-ui-react";
import Pusher from "pusher-js";
import { ProgramContext } from "./ProgramContext";
import styled from 'styled-components';

const DFormInput = styled(Form.Input)`
	> * {
		color: white !important;
	}
	input {
		background-color: #3C4F69 !important;
		color: white !important;
	}
`;

function SettingsChannels(props) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [progs, setProgs] = useContext(ProgramContext);
	const [email, setEmail] = useState('');



	return (
		<div className="h-[100%] align-top grid place-items-center">
			<Grid className="w-[50%]">
				<Grid.Row>
				</Grid.Row>
				<Grid.Row
					columns="equal"
				>
					<Grid.Column>
						<Form>
							<DFormInput
								label="Email"
								fluid
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row className="mb-10">
					<Grid.Column>
						<Button
							color="green"
							fluid
						>
							Add Student
						</Button>
					</Grid.Column>
				</Grid.Row>
				{progs.users.map((channel, index) => {
					return (
						<Grid.Row key={'channe' + index}>
							<Grid.Column
								width={10}
								className="text-2xl"
							>
								<h1>{channel.name}</h1>
							</Grid.Column>
							<Grid.Column width={6}>
								<Button
									color="red"
									fluid
								>
									Remove
								</Button>
							</Grid.Column>
						</Grid.Row>
					);
				})}
			</Grid>



		</div >
	);
}

export default SettingsChannels;
