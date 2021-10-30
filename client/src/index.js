import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

import { UserProvider } from './context/UserContext'
import { CartProvider } from './context/CartContext'

ReactDOM.render(
	<React.StrictMode>
		<UserProvider>
			<CartProvider>
				<App />
			</CartProvider>
		</UserProvider >
	</React.StrictMode>,
	document.getElementById('root')
);
