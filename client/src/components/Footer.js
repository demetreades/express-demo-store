import { Typography } from '@material-ui/core';

import useStyles from '../styles';

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Typography variant="h6" align="center" gutterBottom>
				demo-store example footer
			</Typography>
			<Typography
				variant="subtitle1"
				align="center"
				color="textSecondary"
				gutterBottom>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				facere quia sunt.
			</Typography>
		</footer>
	);
};

export default Footer;
