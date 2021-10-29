import { useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { CardMedia, CardActionArea, IconButton } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { CartContext } from '../context/CartContext';
import useStyles from '../styles';

const ProductCard = ({ product }) => {
	const classes = useStyles();

	const { cart, setCart, setCount } = useContext(CartContext);

	const handleAddToCart = () => {
		console.log(`CART: items: ${cart.length + 1} :: Product: ${product.name}, ${product._id} added`);
		cart.push(product);
		setCart(cart);
		setCount(cart.length);

		localStorage.setItem(
			'cart',
			JSON.stringify({
				cart,
			})
		);
	};



	return (
		<Card className={classes.productCard}>
			<CardMedia
				component="img"
				image={product.image}
				alt="Product image"
				height="220"
				title="Product image"
			/>
			<CardHeader
				className={classes.cardTitle}
				action={
					<IconButton
						disabled={product.inStock === 0 ? true : false}
					>
						<AddIcon
							variant="body2"
							color="secondary"
							onClick={handleAddToCart}
						/>
					</IconButton>
				}
				title={
					product.name.length <= 33
						? product.name
						: `${product.name.slice(0, 33)}...`
				}
				subheader={`stock: ${product.inStock ? product.inStock : 'empty'}`}
			/>
			<CardActionArea>
				<CardContent
					action={handleAddToCart}
				>
					<Typography
						variant="body2"
						className={classes.description}
					>
						{product.description.length <= 140
							? product.description
							: `${product.description.slice(0, 140)}...`}
					</Typography>

					<br />

					<Typography
						variant="body2"
					>
						{product.brand ?? 'Please add a brand'}
					</Typography>

					<br />

					<Typography
						variant="body2"
						color="secondary"
					>
						{product.price ?? 'Please add a price'}€
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ProductCard;
