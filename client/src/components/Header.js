import { Link, useHistory } from 'react-router-dom';
import { useContext } from "react";

import { AppBar, Toolbar } from '@material-ui/core';
import { Accessibility } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

import { UserContext } from '../context/UserContext';
import useStyles from '../styles';

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
		<header id="nav">
			<AppBar position="relative">
				<Toolbar>
					<Link
						to="/home"
						className={classes.logo}
					>
						<Accessibility className={classes.icon} />
						DEMOSTORE
					</Link>
					{user && user.isAdmin ? (
						<>
							<Link className={classes.ml5} to="/dashboard/products">Products</Link>
							<Link className={classes.ml5} to="/dashboard/users">Users</Link>
							<Link className={classes.ml5} to="/dashboard/orders">Orders</Link>
						</>
					) : ('')
					}
					{!user.login ? (
						<Button
							variant="outlined"
							className={classes.ml10}
						>
							<Link to="/login"
								variant="body2"
								underline="hover">
								Login
							</Link>
						</Button>

					) : (
						<Button
							variant="outlined"
							className={classes.ml10}
						>
							< Link
								to="/profile"
							>
								Profile
							</Link>
						</Button>
					)
					}
					{!user.login ? (
						<Button
							variant="contained"
							color="secondary"
						>

							<Link to="/register" className={classes.ml5}>
								Sign Up
							</Link>
						</Button>
					) : (
						''
					)}



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
		</header >
	);
};

export default Header;
