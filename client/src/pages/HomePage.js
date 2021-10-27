import { useEffect, useState } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const fetchData = async () => {
      try {
        const {
          data: { data: results },
        } = await axios.get('http://localhost:5000/products');
        console.log(results);
        setFetchedProducts(results);
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
        <Grid container>
          {loading ? (
            fetchedProducts.map((product) => (
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
