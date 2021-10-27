import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './components/Routes'
import { UserProvider } from './context/UserContext'

const App = () => {
	return (
		<>

			<UserProvider>
				<Router>
					<Header />
					<main>
						<Routes />
					</main>
					<Footer />
				</Router>
			</UserProvider>
		</>
	);
};

export default App;
