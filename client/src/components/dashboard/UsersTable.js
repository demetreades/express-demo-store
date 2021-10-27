import { useContext, useEffect, useState } from 'react';

import MaterialTable from 'material-table';
// import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Table = ({ title }) => {
	// const { user } = useContext(UserContext);
	const user = {
		email: 'admin@user.com',
		password: '12345678',
		isAdmin: false,
	};
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const headers = {
		'Content-type': 'application/json',
		Authorization: `Bearer ${user.token}`,
	};

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		try {
			const {
				data: { data: results },
			} = await axios.get('http://localhost:5000/users');
			console.log(results);
			setData(results);
			setLoading(false);
		} catch (err) {
			setLoading(true);
			console.log(err);
		}
	};

	const userColumns = [
		{ title: 'Name', field: 'name' },
		{ title: 'Email', field: 'email' },
		// { title: 'Password', field: 'password' },
		// { title: 'Orders', field: 'orders' },
		{ title: 'Admin', field: 'isAdmin', lookup: { true: 'yes', false: 'no' } },
	];

	return (
		<>
			<MaterialTable
				title={title}
				data={data}
				columns={userColumns}
				isLoading={loading}
				editable={{
					// ADD USER
					onRowAdd: (newData) =>
						new Promise((resolve, reject) => {
							console.log(newData, `:: new user: ${newData.name} from table`);
							fetch(`http://localhost:5000/api/users/`, {
								method: 'POST',
								headers,
								body: JSON.stringify({ user: user._id, ...newData }),
							})
								.then((resp) => resp.json())
								.then((resp) => getUsers());
							resolve();
						}),

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
							fetch(`http://localhost:5000/api/users/${oldData._id}`, {
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
							fetch(`http://localhost:5000/api/users/profile/${oldData._id}`, {
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
					// selection: true,
					actionsColumnIndex: -1,
					searchAutoFocus: true,
					// filtering: true,
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
