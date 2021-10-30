import { Route, Switch } from 'react-router-dom';

import UsersTable from '../components/dashboard/UsersTable';
import ProductsTable from '../components/dashboard/ProductsTable';
import OrdersTable from '../components/dashboard/OrdersTable';

import useStyles from '../styles';

const Dashboard = () => {
	const classes = useStyles();

	return (
		<>
			<section className={classes.child}>
				<Switch>
					<Route
						path="/dashboard/products"
						render={(props) => (
							< ProductsTable
								{...props}
								title={'Products List'}
							/>
						)}
					/>
					<Route
						path="/dashboard/users"
						render={(props) => (
							<UsersTable
								{...props}
								title={'Users List'}
							/>
						)}
					/>
					<Route
						path="/dashboard/Orders"
						render={(props) => (
							<OrdersTable
								{...props}
								title={'Orders List'}
							/>
						)}
					/>
				</Switch>
			</section>
		</>
	);
};

export default Dashboard;
