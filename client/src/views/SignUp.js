import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

import useStyles from '../styles';

const Register = () => {
	const classes = useStyles();
	const history = useHistory();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVerify, setPasswordVerify] = useState('');

	const [usernameError, setUsernameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [passwordVerifyError, setPasswordVerifyError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		setUsernameError(false);
		setEmailError(false);
		setPasswordError(false);
		setPasswordVerifyError(false);

		if (username === '') {
			setUsernameError(true);
		}
		if (email === '') {
			setEmailError(true);
		}
		if (password === '') {
			setPasswordError(true);
		}
		if (passwordVerify === '') {
			setPasswordVerifyError(true);
		}
		if (username && email && password && (password === passwordVerify)) {
			try {
				axios
					.post('http://localhost:5000/users', {
						name: username,
						email,
						password,
					})
				history.push('/login');
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
						Sign Up
					</Typography>
					<TextField
						onChange={(e) => setUsername(e.target.value)}
						className={classes.field}
						variant="filled"
						label="Username"
						fullWidth
						error={usernameError}
						required
					/>
					<TextField
						onChange={(e) => setEmail(e.target.value)}
						className={classes.field}
						variant="filled"
						label="Email"
						fullWidth
						error={emailError}
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
					<TextField
						onChange={(e) => setPasswordVerify(e.target.value)}
						className={classes.field}
						variant="filled"
						label="Verify Password"
						type="password"
						error={passwordVerifyError}
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
						Register
					</Button>
				</form>
			</Container>
		</>
	);
};

export default Register;
