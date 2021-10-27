import { useContext, useState } from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useStyles from '../styles';

const Login = () => {
	const classes = useStyles();
	const history = useHistory();

	const { setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setEmailError(false);
		setPasswordError(false);

		if (email === '') {
			setEmailError(true);
		}
		if (password === '') {
			setPasswordError(true);
		}
		if (email && password) {
			console.log(email, password);
			try {
				axios
					.post('http://localhost:5000/users/login', {
						email,
						password,
					})
					.then((user) => {
						user.login = true;
						localStorage.setItem(
							'user',
							JSON.stringify({
								user,
							})
						);
						setUser(user);
						history.push('/')
					});
			} catch (err) {
				console.log('POST ERROR: ', err);
			}
		}
	};

	return (
		<>
			<Container>
				<Typography
					className={classes.mt5}
					variant="h3"
					color="primary"
					align="center">
					Create a New Contact
				</Typography>

				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<TextField
						onChange={(e) => setEmail(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="Contact email"
						fullWidth
						error={emailError}
						required
					/>
					<TextField
						onChange={(e) => setPassword(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="password"
						error={passwordError}
						fullWidth
					/>
					<Button variant="contained" onClick={() => history.push('/')}>
						Back Home
					</Button>
					<Button
						className={classes.ml5}
						type="submit"
						color="secondary"
						variant="contained"
						startIcon={<SendIcon />}
					>
						Submit
					</Button>
				</form>
			</Container>
		</>
	);
};

export default Login;
