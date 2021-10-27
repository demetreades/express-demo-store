import { Link, Route, Switch, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import OrdersTable from '../components/dashboard/OrdersTable';
import ProductsTable from '../components/dashboard/ProductsTable';
import { UserContext } from '../context/UserContext'
import UsersTable from '../components/dashboard/UsersTable';
import { useContext } from 'react'

const Dashboard = () => {
	const { user, setUser } = useContext(UserContext);
	const history = useHistory();

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
		<div>
			<h1>Dashboard</h1>
			<Link to="/dashboard/products">Products...</Link>
			<Link to="/dashboard/users">Users...</Link>
			<Link to="/dashboard/orders">Orders...</Link>
			<br />
			<Link to="/home">Visit our Homepage</Link>

			<Button variant="contained" onClick={handleLogOut}>
				Logout
			</Button>

			{/* <ProductsTable title={'Products List'} />
				<UsersTable title={'Users List'} />
				<OrdersTable title={'Orders List'} /> */}

			<Switch>
				<Route
					path="/dashboard/products"
					render={(props) => (
						<ProductsTable {...props} title={'Products List'} />
					)}
				/>

				<Route
					path="/dashboard/users"
					render={(props) => <UsersTable {...props} title={'Users List'} />}
				/>
				<Route
					path="/dashboard/Orders"
					render={(props) => <OrdersTable {...props} title={'Orders List'} />}
				/>
			</Switch>
		</div>
	);
};

export default Dashboard;
