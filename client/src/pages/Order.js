import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
	const classes = useStyles();
	const history = useHistory();

	const { cart, setCart, setCount, totalPrice, count } = useContext(CartContext);
	const { user, setUser } = useContext(UserContext);

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
		if (firstName && lastName && address && city && postalCode) {
			try {
				axios
					.post('http://localhost:5000/orders', {
						user: user._id,
						firstName,
						lastName,
						address,
						city,
						postalCode,
						products: cart,
						totalPrice
					});

				// if (!user.orders) {
				// 	console.log('mpike !orders')
				// 	user.orders = [];
				// 	user.orders.push(cart);
				// 	axios.post(`http://localhost:5000/users/${user._id}`, { orders: cart });
				// 	setUser(user);
				// }

				// console.log(user, 'Order')
				// console.log(user.orders, 'Order .orders')

				localStorage.setItem('cart', []);
				setCart([]);
				setCount(0);
				console.log(localStorage.getItem('cart'), 'cart after ordering');
				history.push('/')

			} catch (err) {
				console.log('POST ERROR: ', err);
			}
		}
	};

	return (
		<>
			<h1>Order From</h1>
			<Link to="/home">Visit our Homepage</Link>
			<br />
			<Container>
				<Typography
					className={classes.mt5}
					variant="h3"
					color="primary"
					align="center">
					Order Form
				</Typography>

				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<TextField
						onChange={(e) => setFirstName(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="Firstname"
						fullWidth
						error={firstNameError}
						required
					/>
					<TextField
						onChange={(e) => setLastName(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="Lastname"
						error={lastNameError}
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setAddress(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="Address"
						error={addressError}
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setCity(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="City"
						error={cityError}
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setPostalCode(e.target.value)}
						className={classes.field}
						variant="outlined"
						label="Postal Code"
						error={postalCodeError}
						fullWidth
						required
					/>
					<Typography
						className={classes.mt5}
						variant="h5"
						color="primary"
						align="center">
						Total Price: {totalPrice}, Total items: {count}
					</Typography>
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
						Order now
					</Button>
				</form>
			</Container>
		</>
	);
};
export default Order;
