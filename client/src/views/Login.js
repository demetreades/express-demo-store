import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

import { UserContext } from '../context/UserContext';
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
			try {
				axios
					.post('http://localhost:5000/users/login', {
						email,
						password,
					})
					.then((user) => {
						user.data.data.login = true;
						localStorage.setItem(
							'user',
							JSON.stringify({
								user,
							})
						);
						setUser(user.data.data);
						console.log(
							`LOGIN :: ${user.data.data.name} ======================== `,
							user.data.data
						);

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
				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<Typography
						className={classes.mt5Header}
						variant="h4"
						color="primary"
						align="center">
						Login
					</Typography>
					<TextField
						onChange={(e) => setEmail(e.target.value)}
						className={classes.field}
						variant="filled"
						label="Email"
						error={emailError}
						type="email"
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setPassword(e.target.value)}
						className={classes.field}
						variant="filled"
						label="Password"
						type="password"
						error={passwordError}
						fullWidth
						required
					/>
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={() => history.push('/')}
					>
						Back Home
					</Button>
					<Button
						className={classes.ml10}
						type="submit"
						color="secondary"
						variant="contained"
						size="large"
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
