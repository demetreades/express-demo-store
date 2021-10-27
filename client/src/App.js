import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Missing404 from './pages/Missing404';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path={['/', '/home']} exact component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={Missing404} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
};

export default App;
