import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { UserContext } from './context/UserContext'

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import ProtectedRoute from './utils/ProtectedRoute';
import Missing404 from './pages/Missing404';

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
