import { useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea, IconButton } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
// import Button from '@material-ui/core/Button';

import { CartContext } from '../context/CartContext';
import useStyles from '../styles';

const ProductCard = ({ product }) => {
	const classes = useStyles();

	const { cart, setCart, setCount } = useContext(CartContext);

	const handleAddToCart = () => {
		console.log('Product: ', product.name, product._id, 'added');
		cart.push(product);
		setCart(cart);
		setCount(cart.length);

		localStorage.setItem(
			'cart',
			JSON.stringify({
				cart,
			})
		);
		console.log(cart, 'On cart click');
	};

	return (
		<Card className={classes.productCard}>
			<CardHeader
				action={
					<IconButton>
						{/* <AddIcon onClick={handleAddToCart} /> */}
						<DeleteOutlined onClick={handleAddToCart} />
					</IconButton>
				}
				title={product.name ?? 'name'}
				subheader={product.description ?? 'please add description'}
			/>
			<CardActionArea>
				<CardContent>
					<Typography variant="body2">
						{product.brand ?? 'please add a brand'}
					</Typography>
					<Typography variant="body2">
						{product.price ?? 'please add a price'}€
					</Typography>

				</CardContent>
				{/* <CardContent>
					<Typography variant="body2">
						{product.address ?? 'Lorem Address quis 122D'}
					</Typography>
					{product.telephone.map((tel) => (
						<Typography variant="body2" color="textSecondary">
							{tel}
						</Typography>
					)) ?? (
							<Typography variant="body2" color="textSecondary">
								XXXXXXXXX
							</Typography>
						)}
				</CardContent> */}
				{/* <CardActionArea>
					<Button size="small" color="primary" onClick={handleAddToCart}>
						ADD
					</Button>
				</CardActionArea> */}
			</CardActionArea>
		</Card>
	);
};

export default ProductCard;
