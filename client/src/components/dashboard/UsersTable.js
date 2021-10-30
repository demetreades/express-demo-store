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
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getUsers = async () => {
		try {
			const {
				data: { data: results },
			} = await axios.get('http://localhost:5000/users', { headers: { Authorization: `Bearer ${user.token}` } });
			console.log(results, 'USERS TABLE');
			setData(results);
			setLoading(false);
		} catch (err) {
			setLoading(true);
			console.log(err);
		}
	};

	const userColumns = [
		{ title: 'User ID', field: '_id', editable: false },
		{ title: 'Name', field: 'name' },
		{ title: 'Email', field: 'email' },
		{ title: 'Admin', field: 'isAdmin', lookup: { true: 'yes', false: 'no' } },
		{
			title: 'Created on',
			field: 'createdAt',
			type: 'date',
			editable: false,
			render: (rowData) => dayjs(rowData.createdAt).format('HH:mm:ss DD/MM/YYYY'),
		},
	];

	return (
		<>
			<MaterialTable
				title={title}
				data={data}
				columns={userColumns}
				isLoading={loading}
				editable={{
					// DELETE USER
					onRowDelete: (oldData) =>
						new Promise((resolve, reject) => {
							if (user.email === oldData.email) {
								throw new Error('You cant delete your own account');
							}
							console.log(
								oldData,
								`:: user: ${oldData.name} deleted from table`
							);
							fetch(`http://localhost:5000/users/${oldData._id}`, {
								method: 'DELETE',
								headers,
								body: JSON.stringify({ user: user._id, ...oldData }),
							})
								.then((resp) => resp.json())
								.then((resp) => getUsers());
							resolve();
						}),

					// UPDATE USER
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							console.log(
								newData,
								`:: updated product: ${newData.name} from table`
							);
							fetch(`http://localhost:5000/users/${oldData._id}`, {
								method: 'PUT',
								headers,
								body: JSON.stringify({ user: user._id, ...newData }),
							})
								.then((resp) => resp.json())
								.then((resp) => getUsers());
							resolve();
						}),
				}}
				options={{
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
