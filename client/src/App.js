import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { UserContext } from './context/UserContext'

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './views/HomePage';
import Login from './views/Login';
import Profile from './views/Profile';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import Order from './views/Order';
import Missing404 from './views/Missing404';
import ProtectedRoute from './utils/ProtectedRoute';

import { useContext } from 'react'

import useStyles from './styles';

const App = () => {
	const classes = useStyles();

	const { user } = useContext(UserContext);

	return (
		<>
			<Router>
				<Header />
				<main className={classes.main}>
					<Switch>
						<Route path={['/', '/home']} component={HomePage} exact />
						<Route path="/register" component={SignUp} />
						<Route path="/login" component={Login} />
						<Route path="/profile" component={Profile} />
						<Route path="/order" component={Order} />
						<ProtectedRoute
							path="/dashboard"
							auth={user.isAdmin}
							login={user.login}
							component={Dashboard}
						/>
						<Route path="*" component={Missing404} />
					</Switch>
				</main>
				<Footer />
			</Router>
		</>
	);
};

export default App;
