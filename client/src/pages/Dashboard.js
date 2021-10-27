// import { Link } from 'react-router-dom';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

import OrdersTable from '../components/dashboard/OrdersTable';
import ProductsTable from '../components/dashboard/ProductsTable';
import UsersTable from '../components/dashboard/UsersTable';

const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<main>
				<Link to="/home">Visit our Homepage</Link>
				<Link to="/dashboard/products">Products</Link>
				<Link to="/dashboard/users">Users</Link>
				<Link to="/dashboard/orders">Orders</Link>

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
			</main>
		</div>
	);
};

export default Dashboard;
