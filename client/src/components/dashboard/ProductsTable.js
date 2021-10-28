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
		getProducts();
	}, []);

	const getProducts = async () => {
		try {
			const {
				data: { data: results },
			} = await axios.get('http://localhost:5000/products');
			console.log(results);
			setData(results);
			setLoading(false);
		} catch (err) {
			setLoading(true);
			console.log(err);
		}
	};

	const product = [
		{
			title: 'Name',
			field: 'name',
		},
		{ title: 'User ID', field: 'user', editable: false },
		// { title: 'Image', field: 'image' },
		{ title: 'Brand', field: 'brand' },
		{
			title: 'Description',
			field: 'description',
			cellStyle: {
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				maxWidth: 200,
			},
		},
		{
			title: 'Price',
			field: 'price',
			type: 'currency',
			currencySetting: {
				currencyCode: 'EUR',
			},
		},
		{ title: 'Stock', field: 'inStock', type: 'numeric' },
		{
			title: 'Digital',
			field: 'isDigital',
			lookup: { true: 'yes', false: 'no' },
		},
		{
			title: 'Visibility',
			field: 'isActive',
			lookup: { true: 'yes', false: 'no' },
		},
	];

	return (
		<>
			<MaterialTable
				title={title}
				data={data}
				columns={product}
				isLoading={loading}
				editable={{
					// ADD PRODUCT
					onRowAdd: (newData) =>
						new Promise((resolve, reject) => {
							fetch(`http://localhost:5000/products/`, {
								method: 'POST',
								headers,
								body: JSON.stringify({ user: user._id, ...newData }),
							})
								.then((resp) => resp.json())
								.then((resp) => getProducts());
							resolve();
						}),

					// DELETE PRODUCT
					onRowDelete: (oldData) =>
						new Promise((resolve, reject) => {
							console.log(
								oldData,
								`:: product: ${oldData.name} deleted from table`
							);
							fetch(`http://localhost:5000/products/${oldData._id}`, {
								method: 'DELETE',
								headers,
								body: JSON.stringify({ user: user._id, ...oldData }),
							})
								.then((resp) => resp.json())
								.then((resp) => getProducts());
							resolve();
						}),

					// UPDATE PRODUCT
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							console.log(
								newData,
								`:: updated product: ${newData.name} from table`
							);
							fetch(`http://localhost:5000/products/${oldData._id}`, {
								method: 'PUT',
								headers,
								body: JSON.stringify({ user: user._id, ...newData }),
							})
								.then((resp) => resp.json())
								.then((resp) => getProducts());
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
