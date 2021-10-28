import { useContext, useEffect, useState } from 'react';

import MaterialTable from 'material-table';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const Table = ({ title }) => {
	const { user } = useContext(UserContext);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const headers = {
		'Content-type': 'application/json',
		Authorization: `Bearer ${user.token}`,
	};

	useEffect(() => {
		getOrders();
	}, []);

	const getOrders = async () => {
		try {
			const {
				data: { data: results },
			} = await axios.get('http://localhost:5000/orders');
			console.log(results);
			setData(results);
			setLoading(false);
		} catch (err) {
			setLoading(true);
			console.log(err);
		}
	};

	const orders = [
		{ title: 'User ID', field: 'user', editable: false },
		{ title: 'Firstname', field: 'firstName' },
		{ title: 'Lastname', field: 'lastName' },
		{ title: 'Address', field: 'address' },
		{ title: 'City', field: 'city' },
		{ title: 'Postal Code', field: 'postalCode' },
		// { title: 'Country', field: 'country' },
		{ title: 'Total Price', field: 'totalPrice', editable: false },
		{ title: 'Paid', field: 'isPaid', lookup: { true: 'yes', false: 'no' } },
		{ title: 'Payment Date', field: 'paidAt' },
		{ title: 'Delivered', field: 'isDelivered', lookup: { true: 'yes', false: 'no' } },
		{ title: 'Delivery Date', field: 'deliveredAt' },

		// {
		//   title: 'Order items',
		//   field: 'orderItems',
		//   render: (rowData) =>
		//     rowData.orderItems ? rowData.orderItems.join() : 'mpikan!',
		// },
	];

	return (
		<>
			<MaterialTable
				title={title}
				data={data}
				columns={orders}
				isLoading={loading}
				editable={{
					// ADD ORDER
					onRowAdd: (newData) =>
						new Promise((resolve, reject) => {
							fetch(`http://localhost:5000/orders/`, {
								method: 'POST',
								headers,
								body: JSON.stringify({ user: user._id, ...newData }),
							})
								.then((resp) => resp.json())
								.then((resp) => getOrders());
							resolve();
						}),

					// DELETE ORDER
					onRowDelete: (oldData) =>
						new Promise((resolve, reject) => {
							console.log(
								oldData,
								`:: Order: ${oldData.name} deleted from table`
							);
							fetch(`http://localhost:5000/orders/${oldData._id}`, {
								method: 'DELETE',
								headers,
								body: JSON.stringify({ user: user._id, ...oldData }),
							})
								.then((resp) => resp.json())
								.then((resp) => getOrders());
							resolve();
						}),

					// UPDATE ORDER
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							console.log(
								newData,
								`:: updated Order: ${newData.name} from table`
							);
							fetch(`http://localhost:5000/orders/${oldData._id}`, {
								method: 'PUT',
								headers,
								body: JSON.stringify({ user: user._id, ...newData }),
							})
								.then((resp) => resp.json())
								.then((resp) => getOrders());
							resolve();
						}),
				}}
				options={{
					actionsColumnIndex: -1,
					searchAutoFocus: true,
					pageSizeOptions: [5, 15, 25, 50],
					pageSize: 15,
					paginationType: 'stepped',
					paginationPosition: 'both',
					addRowPosition: 'first',
					exportButton: true,
					exportAllData: true,
					tableLayout: 'auto',
				}}
			/>
		</>
	);
};

export default Table;
