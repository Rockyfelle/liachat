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

function Assigntments(props) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [progs, setProgs] = useContext(ProgramContext);
	const [email, setEmail] = useState('');

	return (
		<div className="h-[100vh] align-top grid place-items-center overflow-auto">
			<Grid className="w-[50%]">
				<Grid.Row>
				</Grid.Row>
				<Grid.Row
					columns="equal"
				>
					<Grid.Column>

					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>

					</Grid.Column>
				</Grid.Row>
				{progs.resources.map((file, index) => {
					return (
						<Grid.Row key={'channe' + index}>
							<Grid.Column
								width={10}
								className="text-sm"
							>
								<h1 className="text-2xl">{file.file_name}</h1>
								<a href={file.stringyboi} target="_blank">{file.stringyboi}</a>
							</Grid.Column>
							<Grid.Column width={6}>

							</Grid.Column>
						</Grid.Row>
					);
				})}
			</Grid>



		</div >
	);
}

export default Assigntments;
