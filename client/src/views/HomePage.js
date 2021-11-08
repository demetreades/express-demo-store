import { useEffect, useState } from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ProductCard from '../components/ProductCard';
import API_ENDPOINT from '../utils/config';

import useStyles from '../styles';

const HomePage = () => {
	const classes = useStyles();

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(false);
		const fetchData = async () => {
			try {
				const {
					data: { data: results },
				} = await axios.get(`${API_ENDPOINT}/products`);
				console.log(results, 'HOMEPAGE PRODUCTS');
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
				<Grid container
					className={classes.homeGrid}
				>
					{loading ? (
						products
							.filter((product) => product.isActive === true)
							.map((product) => (
								<Grid
									items
									key={product._id}
									xs={12}
									sm={6}
									md={4}
									lg={4}
								>
									<ProductCard product={product} />
								</Grid>
							))
					) : (
						<CircularProgress color="secondary" className={classes.marginCenter} />
					)}
				</Grid>
			</Container>
		</>
	);
};

export default HomePage;
