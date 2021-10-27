import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Missing404 from '../pages/Missing404';
import ProtectedRoute from './dashboard/ProtectedRoute';
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const Routes = () => {
	const { user } = useContext(UserContext)
	console.log(user, '\n\nhomepage');

	return (
		<>

			<Switch>
				<Route path={['/', '/home']} exact component={HomePage} />
				<Route path="/login" component={Login} />
				{/* <Route path="/dashboard" component={Dashboard} /> */}
				<ProtectedRoute
					path="/dashboard"
					auth={user.isAdmin}
					login={user.login}
					component={Dashboard}
				/>
				<Route path="*" component={Missing404} />
			</Switch>

		</>
	)
}

export default Routes
