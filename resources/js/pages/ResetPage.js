import React, { useEffect, useState } from "react";
import {
	Form,
	Button,
	Grid,
	Header as SemanticHeader,
	Segment,
} from "semantic-ui-react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams
} from "react-router-dom";


function LoginPage() {
	const [isUploading, setIsUploading] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [token, setToken] = useState(useParams().token);

	//Get email using token
	useEffect(() => {
		fetch(`/api/user/reset/${token}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					setIsLoading(false);
					setEmail(data.email);
				} else {
					setError(data.error)
				}
			});
	}, []);

	function tryChangePassword() {
		setIsUploading(true);
		fetch(`/api/user/reset/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
				token: token,
			}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					setIsUploading(false);
					setError('');
					window.location.href = '/login';
				} else {
					setIsUploading(false);
					setError(data.error);
				}
			});
	}

	return (
		<div>
			<Grid centered>
				<Grid.Column style={{ maxWidth: 550, marginTop: 150 }}>
					<SemanticHeader>Reset your account password</SemanticHeader>
					<Segment>
						{!isLoading &&
							<Form>
								<p className="text-red-500">{error}</p>
								<Form.Field>
									<Form.Input
										value={email}
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

								<Form.Field>
									<Form.Input
										value={passwordConfirm}
										onChange={(e) => setPasswordConfirm(e.target.value)}
										type="password"
										name="confirm password"
										placeholder="Confirm Password"
										label="Confirm Password"
									/>
								</Form.Field>

								<Button
									fluid
									primary
									type="submit"
									onClick={tryChangePassword}
								>
									Login
								</Button>

								<Segment>
									Need an account? <a href="#">this link doesn't work</a>
								</Segment>
							</Form>
						}
					</Segment>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default LoginPage;