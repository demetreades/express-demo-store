import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import useStyles from '../styles';

const Order = () => {
	const history = useHistory();
	const classes = useStyles();

	const { cart, setCart, setCount, totalPrice, count } = useContext(CartContext);
	const { user } = useContext(UserContext);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');

	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [addressError, setAddressError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [postalCodeError, setPostalCodeError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setFirstNameError(false);
		setLastNameError(false);
		setAddressError(false);
		setCityError(false);
		setPostalCodeError(false);

		if (firstName === '') {
			setFirstNameError(true);
		}
		if (lastName === '') {
			setLastNameError(true);
		}
		if (address === '') {
			setAddressError(true);
		}
		if (city === '') {
			setCityError(true);
		}
		if (postalCode === '') {
			setPostalCodeError(true);
		}
		if (firstName && lastName && address && city && postalCode && !(totalPrice === 0)) {
			try {
				axios
					.post('http://localhost:5000/orders', {
						user: user._id,
						firstName,
						lastName,
						address,
						city,
						postalCode,
						orderItems: cart,
						totalPrice
					});

				localStorage.setItem('cart', []);
				setCart([]);
				setCount(0);
				console.log(cart, 'cart at checkout');
				history.push('/')

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
						variant="h3"
						color="primary"
						align="center">
						Order Form
					</Typography>
					<Typography
						variant="body2"
						color="secondary"
						align="center">
						Total Price: {totalPrice}€, Total items: {count}
					</Typography>
					<TextField
						onChange={(e) => setFirstName(e.target.value)}
						className={classes.field}
						variant="filled"
						label="Firstname"
						error={firstNameError}
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setLastName(e.target.value)}
						className={classes.field}
						variant="filled"
						label="Lastname"
						error={lastNameError}
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setAddress(e.target.value)}
						className={classes.field}
						variant="filled"
						label="Address"
						error={addressError}
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setCity(e.target.value)}
						className={classes.field}
						variant="filled"
						label="City"
						error={cityError}
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setPostalCode(e.target.value)}
						className={classes.field}
						variant="filled"
						label="Postal Code"
						error={postalCodeError}
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
						className={classes.ml5}
						type="submit"
						size="large"
						color="secondary"
						variant="contained"
						startIcon={<SendIcon />}
					>
						Checkout
					</Button>
				</form>
			</Container>
		</>
	);
};

export default Order;
