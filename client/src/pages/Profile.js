import { useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';

// import Button from '@material-ui/core/Button';

import { UserContext } from '../context/UserContext';
import OrderCard from '../components/OrderCard';

const Profile = () => {
	// const history = useHistory();

	const { user, setUser } = useContext(UserContext);

	// const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	const headers = {
		'Content-type': 'application/json',
		Authorization: `Bearer ${user.token}`,
	};


	useEffect(() => {
		// setLoading(false);
		const fetchData = async () => {
			try {
				const {
					data: { data: results },
				} = await axios.get(`http://localhost:5000/orders/user/${user._id}`, headers);
				console.log(results);
				setOrders(results);
				// setLoading(true);
			} catch (err) {
				// setLoading(false);
				console.log(err);
			}
		};
		fetchData();
	}, []);

	// const handleLogOut = () => {
	// 	console.log(
	// 		`LOGOUT :: ${user.name} ======================== `,
	// 		user
	// 	);

	// 	localStorage.removeItem('user');
	// 	setUser({});
	// 	history.push('/');
	// };

	return (
		<>
			<h1>User Profile</h1>

			<br />

			<ul>
				<li>ID: {user._id}</li>
				<li>{user.name}</li>
				<li>{user.email}</li>
				<li>admin: {user.isAdmin ? 'yes' : 'no'}</li>
				<li>
					{/* <Button variant="contained" onClick={handleLogOut}>
						Logout
					</Button> */}
				</li>
				<ul>{orders && orders.length !== 0 ? (
					orders.map((order, index) => {
						return <OrderCard key={order._id} order={order} index={index} />
					})
				) : (
					<p>no orders</p>
				)}</ul>
			</ul>
		</>


	)
}

export default Profile
