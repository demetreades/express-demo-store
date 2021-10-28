import { Link, useHistory } from 'react-router-dom';
import { useContext } from "react";

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Accessibility } from '@material-ui/icons';

import { UserContext } from '../context/UserContext';
import useStyles from '../styles';

import Button from '@material-ui/core/Button';

const Header = () => {
	const history = useHistory();

	const classes = useStyles();

	const { user, setUser } = useContext(UserContext);

	const handleLogOut = () => {
		console.log(
			`LOGOUT :: ${user.name} ======================== `,
			user
		);

		localStorage.removeItem('user');
		setUser({});
		history.push('/');
	};

	return (
		<header>
			<AppBar position="relative">
				<Toolbar>
					<Link to="/home">
						<Accessibility className={classes.icon} />
						{/* <Typography variant="h6">demo store</Typography> */}
					</Link>

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
						{user.login ? (
							<Link to="/profile" className={classes.ml5}>
								Profile
							</Link>
						) : 'login'}
					</Link>
					{!user.login ? (
						<Link to="/register" className={classes.ml5}>
							Sign Up
						</Link>
					) : (
						''
					)}

					{user && user.isAdmin ? (
						<>
							<Link className={classes.ml5} to="/dashboard/products">Products</Link>
							<Link className={classes.ml5} to="/dashboard/users">Users</Link>
							<Link className={classes.ml5} to="/dashboard/orders">Orders</Link>
							{/* <Link to="/home">Visit our Homepage</Link> */}
						</>
					) : ('')
					}

					{user && user.login ? (
						<Button
							variant="contained"
							onClick={handleLogOut}
							className={classes.ml5}
						>
							Logout
						</Button>
					) : ('')}
				</Toolbar>
			</AppBar>
		</header>
	);
};

export default Header;
