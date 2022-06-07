import React, { useEffect, useState, useRef, useContext } from "react";
import { Grid, Segment, Form, Input, Menu, Button } from "semantic-ui-react";
import Pusher from "pusher-js";
import { ProgramContext } from "../ProgramContext";
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

		<p className="text-2xl">no support for this &#128532;</p>
		</div >
	);
}

export default SettingsChannels;
