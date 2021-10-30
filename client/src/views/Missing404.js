import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import useStyles from '../styles';

const Missing404 = () => {
	const classes = useStyles();

	return (
		<>
			<Container className={classes.missing}>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: '70vh' }}
				>
					<Typography
						variant="h2"
						color="textSecondary"
						align="center">
						Page Not Found
					</Typography>
					<Typography
						variant="p"
						color="textSecondary"
						align="center">
						Well, that's disappointing
					</Typography>
					<Typography
						variant="p"
						color="textSecondary"
						align="center">
						<Link
							to="/home"
						>
							Visit our Homepage
						</Link>
					</Typography>
				</Grid>
			</Container>
		</>
	);
};

export default Missing404;
