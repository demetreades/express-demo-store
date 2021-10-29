import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

import useStyles from '../styles';

const Cart = () => {
	const classes = useStyles();

	const { cart, setCart, count, setCount, totalPrice, setTotalPrice } = useContext(CartContext);
	const { user } = useContext(UserContext);

	const handleEmptyCart = () => {
		console.log('clearing cart');
		localStorage.setItem('cart', []);
		setCart([]);
		setCount(0);
	}

	const priceSum = cart.reduce((accumulator, product) => {
		return accumulator + product.price;
	}, 0);

	const fixedTotalPrice = parseFloat(priceSum.toFixed(2));
	setTotalPrice(fixedTotalPrice);

	return (
		<section className={classes.cart}>
			<Typography
				variant="h5"
				className={classes.ml10}
			>
				Cart
			</Typography>
			<Typography
				className={classes.ml5}
				variant="body2"
			>
				items: {count}
			</Typography>
			<Typography
				className={classes.ml5}
				variant="body2"
			>
				total price: {totalPrice}€
			</Typography>
			{user && user.login ? (
				<Button
					className={classes.ml5}
					type="submit"
					color="secondary"
					variant="contained"
					disabled={totalPrice === 0 ? true : false}
					startIcon={<SendIcon />}
				>
					<Link to='/order'>
						Order now
					</Link>
				</Button>
			) : (
				<Button
					className={classes.ml5}
					type="submit"
					color="secondary"
					variant="contained"
				>
					<Link to='/login'>
						LOGIN TO ORDER
					</Link>
				</Button>
			)}
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
