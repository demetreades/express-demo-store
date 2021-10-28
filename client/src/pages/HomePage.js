import { useEffect, useState } from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

const HomePage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(false);
		const fetchData = async () => {
			try {
				const {
					data: { data: results },
				} = await axios.get('http://localhost:5000/products');
				console.log(results);
				setProducts(results);
				setLoading(true);
			} catch (err) {
				setLoading(false);
				console.log(err);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<Container maxWidth="md">
				<Cart />
				<Grid container>
					{loading ? (
						products
							.filter((product) => product.isActive === true)
							.map((product) => (
								<Grid items key={product._id} xs={12} md={8} lg={4}>
									<ProductCard product={product} />
								</Grid>
							))
					) : (
						<CircularProgress color="secondary" />
					)}
				</Grid>
			</Container>
		</>
	);
};

export default HomePage;
