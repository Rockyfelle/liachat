import React, { useEffect, useState } from "react";
import {
	Form,
	Button,
	Grid,
	Header as SemanticHeader,
	Segment,
} from "semantic-ui-react";


function LoginPage() {
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function tryLogin() {
		fetch(`/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			})
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {

					//Update hooks
					setUser(data.user);
					setLoggedIn(true);

					//Save user and token to localstorage
					localStorage.setItem('user', JSON.stringify({...data.user, token: data.token}));

					//Redirect to dashboard
					window.location.href = '/dashboard';

				} else {

					//Set error
					setError(data.text);
				}
			});
	}

	return (
		<div>

			<Grid centered>
				<Grid.Column style={{ maxWidth: 550, marginTop: 150 }}>
					<SemanticHeader>Login to your account</SemanticHeader>

					<Segment>
						<Form>
							<p className="text-red-500">{error}</p>
							<Form.Field>
								<Form.Input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									name="email"
									placeholder="Email"
									label="Email"
								/>
							</Form.Field>

							<Form.Field>
								<Form.Input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type="password"
									name="password"
									placeholder="Password"
									label="Password"
								/>
							</Form.Field>

							<Button
								fluid
								primary
								type="submit"
								onClick={tryLogin}
							>
								Login
							</Button>

							<Segment>
								Need an account? <a href="#">this link doesn't work</a>
							</Segment>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default LoginPage;