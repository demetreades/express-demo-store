import { Link } from 'react-router-dom';

import ProductsTable from '../components/dashboard/ProductsTable';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/home">Visit our Homepage</Link>
      <ProductsTable title={'Products List'} />
    </div>
  );
};

export default Dashboard;
