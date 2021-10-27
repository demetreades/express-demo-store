import { useContext, useEffect, useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ProductCard from '../components/ProductCard';
import { UserContext } from '../context/UserContext'
import axios from 'axios';

const HomePage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(UserContext);

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

	console.log(user, '\n\nHOMEPAGE!!!!!!!!!\n\n')

	return (
		<>
			<Container maxWidth="md">
				<Grid container>
					{loading ? (
						products.map((product) => (
							<Grid items key={product._id} xs={12} lg={10}>
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
