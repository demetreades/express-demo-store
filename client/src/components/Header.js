import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { Accessibility } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from "react";
import useStyles from '../styles';

const Header = () => {
	const { user } = useContext(UserContext);

	const classes = useStyles();

	return (
		<header>
			<AppBar position="relative">
				<Toolbar>
					<Accessibility className={classes.icon} />
					<Link to="/home">
						<Typography variant="h6">demo store</Typography>
					</Link>
					{user.isAdmin ? (
						<Link
							to="/dashboard"
							className={classes.ml5}
							variant="body2"
							underline="hover">
							dashboard
						</Link>
					) : ('')
					}

					{/* <Link
						to="/login"
						className={classes.ml5}
						variant="body2"
						underline="hover">
						login
					</Link> */}
					{/*  */}
					<Link to="/login"
						className={classes.ml5}
						variant="body2"
						underline="hover">
						{user.login ? 'PROFILE' : 'login'}
					</Link>
					{!user.login ? (
						<Link to="/register" className={classes.ml5}>
							Sign Up
						</Link>
					) : (
						''
					)}
				</Toolbar>
			</AppBar>
		</header>
	);
};

export default Header;
