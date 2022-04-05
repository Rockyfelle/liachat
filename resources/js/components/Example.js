import React from 'react';
import ReactDOM from 'react-dom';

function App() {
	return (
		<div className="text-3xl font-bold underline">Example Component</div>

	);
}

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}
