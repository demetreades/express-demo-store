import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { AppBar, Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { UserContext } from '../context/UserContext';
import OrderCard from '../components/OrderCard';

import useStyles from '../styles';

const Profile = () => {
	const classes = useStyles();

	const { user } = useContext(UserContext);

	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	const headers = {
		'Content-type': 'application/json',
		Authorization: `Bearer ${user.token}`,
	};


	useEffect(() => {
		setLoading(false);
		const fetchData = async () => {
			try {
				const {
					data: { data: results },
				} = await axios.get(`http://localhost:5000/orders/user/${user._id}`, headers);
				console.log(results, 'Profile results');
				setOrders(results);
				setLoading(true);
			} catch (err) {
				setLoading(false);
				console.log(err);
			}
		};
		fetchData();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Container maxWidth="md">
				<AppBar position="relative"
					color="primary"
					className={classes.mtb16}
				>
					<Toolbar>
						<div className={classes.cart}>
							<Typography
								variant="h4"
								color="initial"
							>
								User Profile
							</Typography>
							<ul>
								<li>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										id: {user._id}
									</Typography>
								</li>
								<li>
									<Typography
										variant="body2"
										color="initial"
									>
										email: {user.email}
									</Typography>
								</li>
								<li>
									<Typography
										variant="body2"
										color="initial"
									>
										name: {user.name}
									</Typography>
								</li>
								<li>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										admin: {user.isAdmin ? 'yes' : 'no'}
									</Typography>
								</li>
							</ul>
						</div>
					</Toolbar>
				</AppBar>

				<AppBar position="relative"
					color="primary"
					className={classes.mtb8}
				>
					<Toolbar>
						<Typography
							variant="h5"
							color="initial"
						>
							Orders:
						</Typography>
					</Toolbar>
				</AppBar>

				<Grid container
					className={classes.grid}
				>

					{loading ? (
						orders
							.map((order, index) => (
								<Grid
									items
									key={order._id}
									xs={12}
									sm={6}
									md={4}
									lg={4}
								>
									<OrderCard order={order} index={index} />
								</Grid>
							))
					) : (
						<CircularProgress color="secondary" className={classes.marginCenter} />
					)}
				</Grid>

			</Container>
		</>


	)
}

export default Profile
