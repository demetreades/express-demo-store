import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import MaterialTable from 'material-table';
import dayjs from 'dayjs';

import { UserContext } from '../../context/UserContext';
import { Button } from '@material-ui/core';

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

	const handleUpload = async (rowData) => {
		console.log('MPIKE HANDLEUPLOAD', rowData);
		try {
			const {
				data: { data: results },
			} = await axios.post(`http://localhost:5000/products/upload/img/${rowData._id}`, { headers });
			console.log(results, 'PRODUCT UPLOAD RESULTS ');
		} catch (err) {
			console.log('UPLOAD ERROR: ', err);
		}
	}

	const getProducts = async () => {
		try {
			const {
				data: { data: results },
			} = await axios.get('http://localhost:5000/products');
			console.log(results, 'PRODUCTS TABLE');
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
		{ title: 'Image', field: 'image' },
		{
			title: 'Upload Image', field: 'upload', editable: false, render: (rowData) =>
			(
				< Button
					variant="contained"
					component="label"
				>
					Upload
					< input
						type="file"
						name="image"
						onClick={() => handleUpload(rowData)}
						hidden
					/>
				</Button >
			)
		},
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
		{
			title: 'Created on',
			field: 'createdAt',
			type: 'date',
			editable: false,
			render: (rowData) => dayjs(rowData.createdAt).format('HH:mm:ss DD/MM/YYYY')
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
