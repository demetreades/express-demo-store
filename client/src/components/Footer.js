// import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import useStyles from '../styles';

const Footer = () => {
	const classes = useStyles();

	return (
		<footer>
			<AppBar position="static" color="primary">
				<Container maxWidth="md">
					<Toolbar>
						<a href="#nav">
							{/* <Link to="/home"> */}
							<Typography
								className={classes.ml10}
								variant="body1"
								align="center"
								gutterBottom
							>
								DEMOSTORE
							</Typography>
							{/* </Link> */}
						</a>
						<Typography
							className={classes.ml5}
							variant="subtitle1"
							align="center"
							color="textSecondary"
							gutterBottom>
							Lorem ipsum dolor sit amet consectetur adipisic
							facere quia sunt.
						</Typography>
						<Typography
							variant="body1"
							color="inherit"
							className={classes.ml5}
						>
							{`© ${new Date().getFullYear()}`}
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
		</footer>
	);
};

export default Footer;
