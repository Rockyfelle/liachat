import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from '../pages/LoginPage';


function App() {
	return (
		<LoginPage />
	);
}

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}
