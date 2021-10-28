import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

import { CartContext } from '../context/CartContext';

import useStyles from '../styles';

const Cart = () => {
	const classes = useStyles();

	const history = useHistory();

	const { cart, setCart, count, setCount, totalPrice, setTotalPrice } = useContext(CartContext);

	const handleEmptyCart = () => {
		// localStorage.removeItem('cart');
		localStorage.setItem('cart', []);
		setCart([]);
		setCount(0);
		console.log(localStorage.getItem('cart'), 'cart from local after empting');
	}

	const shippingPrice = 9;

	const priceSum = cart.reduce(function (accumulator, product) {
		return accumulator + product.price;
	}, 0);

	const fixedTotalPrice = parseFloat(priceSum.toFixed(2));
	setTotalPrice(fixedTotalPrice);
	console.log('\t:: TOTAL PRICE: ', fixedTotalPrice, '€');

	return (
		<section className={classes.cart}>
			<h1>Cart</h1>
			<div className={classes.ml10}>
				items: {count}
				total price: {totalPrice}€
			</div>

			<Button
				className={classes.ml5}
				type="submit"
				color="secondary"
				variant="contained"
				startIcon={<SendIcon />}
			>
				<Link to='/order'>
					Order now
				</Link>
			</Button>
			<Button
				className={classes.ml5}
				color="primary"
				type="submit"
				variant="contained"
				onClick={handleEmptyCart}>
				EMPTY CART
			</Button>
		</section>
	)
}

export default Cart;
