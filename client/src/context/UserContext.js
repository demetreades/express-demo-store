import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [localUser, setLocalUser] = useState({});
	const [enter, setEnter] = useState('');

	useEffect(() => {
		const getLocalUser = () => {
			try {
				if (!JSON.parse(localStorage.getItem('user'))) {
					return;
				} else {
					const { user: { data: { data } } } = JSON.parse(localStorage.getItem('user'));
					setLocalUser(data);
				}
			} catch (err) {
				console.log('\nUser get ERROR: ', err);
			}
		};
		getLocalUser();
	}, []);

	return (
		<UserContext.Provider
			value={{ user: localUser, setUser: setLocalUser, enter, setEnter }}>
			{children}
		</UserContext.Provider>
	);
};


