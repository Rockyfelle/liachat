import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from '../pages/LoginPage';
import { Grid, Segment } from 'semantic-ui-react';
import Dashboard from '../pages/Dashboard';
import {
	BrowserRouter as Router,
	Routes,
	Route,
  } from "react-router-dom";

function App() {

	return (

		<Router>
		  <Routes>
			<Route path="login" element={<LoginPage />}/>
		
			<Route path="dashboard" element={<Dashboard />} />

			<Route path="/" />
		  </Routes>
	  </Router>

	);
}

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}
