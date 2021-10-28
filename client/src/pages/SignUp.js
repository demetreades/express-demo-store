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

const Register = () => {
	const classes = useStyles();
	const history = useHistory();

	const { setUser } = useContext(UserContext);

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
					.then((user) => {
						user.login = true;
						localStorage.setItem(
							'user',
							JSON.stringify({
								user,
							})
						);
						setUser(user);
						history.push('/login');
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
					Sign Up
				</Typography>

				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<TextField
						onChange={(e) => setUsername(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="Username"
						fullWidth
						error={usernameError}
						required
					/>
					<TextField
						onChange={(e) => setEmail(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="Email"
						fullWidth
						error={emailError}
						required
					/>
					<TextField
						onChange={(e) => setPassword(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="Password"
						error={passwordError}
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setPasswordVerify(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="Verify Password"
						error={passwordVerifyError}
						fullWidth
						required
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
						Register
					</Button>
				</form>
			</Container>
		</>
	);
};

export default Register;
