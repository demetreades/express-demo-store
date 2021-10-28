import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const Missing404 = () => {
	return (
		<>
			<Container>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: '70vh' }}>
					<Grid item xs={3}></Grid>
					<h2>Page Not Found</h2>
					<p>Well, that's disappointing</p>
					<p>
						<Link to="/home">Visit our Homepage</Link>
					</p>
				</Grid>
			</Container>
		</>
	);
};

export default Missing404;
