import * as React from 'react'

const ThemeContext = React.createContext({
	user: JSON.parse(localStorage.getItem('user')) || {},
	setUser: () => {},
});

export default ThemeContext;