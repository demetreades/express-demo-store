import { Route, Switch } from 'react-router-dom'

import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Missing404 from './pages/Missing404';
import ProtectedRoute from './utils/ProtectedRoute';
import { BrowserRouter as Router } from 'react-router-dom'
import SignUp from './pages/SignUp';
import { UserContext } from './context/UserContext'
import { useContext } from 'react'

const App = () => {
	const { user } = useContext(UserContext);

	return (
		<>
			<Router>
				<Header />
				<main>
					<Switch>
						<Route path={['/', '/home']} exact component={HomePage} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={SignUp} />
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
