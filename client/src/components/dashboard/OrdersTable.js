import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import MaterialTable from 'material-table';

import { UserContext } from '../../context/UserContext';

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getOrders = async () => {
		try {
			const {
				data: { data: results },
			} = await axios.get('http://localhost:5000/orders', { headers: { Authorization: `Bearer ${user.token}` } });
			console.log(results, 'ORDERS TABLE');
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
		{
			title: 'Total Price', field: 'totalPrice', editable: false, type: 'currency',
			currencySetting: {
				currencyCode: 'EUR',
			}
		},
		{
			title: 'Order items',
			field: 'orderItems',
			editable: false,
			render: (rowData) => {
				return rowData.orderItems ? rowData.orderItems.length : 'no items'
			}
		},
		{
			title: 'Paid',
			field: 'isPaid',
			lookup: { true: 'yes', false: 'no' }
		},
		{
			title: 'Payment Date',
			field: 'paidAt',
			type: 'date',
			render: (rowData) => rowData.paidAt ? dayjs(rowData.paidAt).format('HH:mm:ss DD/MM/YYYY') : 'not paid',
		},
		{
			title: 'Delivered',
			field: 'isDelivered',
			lookup: { true: 'yes', false: 'no' }
		},
		{
			title: 'Delivery Date',
			field: 'deliveredAt',
			type: 'date',
			render: (rowData) => rowData.deliveredAt ? dayjs(rowData.deliveredAt).format('HH:mm:ss DD/MM/YYYY') : 'not delivered',
		},
		{
			title: 'Created on',
			field: 'createdAt',
			editable: false,
			type: 'date',
			render: (rowData) => dayjs(rowData.createdAt).format('HH:mm:ss DD/MM/YYYY'),
		},
	];

	return (
		<>
			<MaterialTable
				title={title}
				data={data}
				columns={orders}
				isLoading={loading}
				editable={{
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
					grouping: true,
					actionsColumnIndex: -1,
					searchAutoFocus: true,
					pageSizeOptions: [5, 10, 25, 50],
					pageSize: 10,
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
