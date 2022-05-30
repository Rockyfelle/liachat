import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import LoginPage from '../pages/LoginPage';
import ResetPage from '../pages/ResetPage';
import { Grid, Segment } from 'semantic-ui-react';
import Dashboard from '../pages/Dashboard';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import MainView from './MainView';
import { ProgramContext, ProgramProvider } from './ProgramContext';

function App() {
	const [user, setUser] = useState({});
	const userValue = { user, setUser };

	return (
		<ProgramProvider>
			<Router>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					
					<Route path="login" element={<LoginPage />} />

					<Route path="reset/:token" element={<ResetPage />} />

					<Route path="dashboard" element={<Dashboard />} />

					<Route path="program/:program/settings" element={<MainView view="settings" />} />

					<Route path="program/:program/assignments" element={<MainView view="assignments" />} />

					<Route path="program/:program/channel/:channel" element={<MainView view="channels" />} />

					<Route path="/" />
				</Routes>
			</Router>
		</ProgramProvider>
	);
}

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}
