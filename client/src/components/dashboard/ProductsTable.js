import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';

import { UserContext } from '../../context/UserContext';
import API_ENDPOINT from '../../utils/config';

const Table = ({ title }) => {
	const { user } = useContext(UserContext);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getProducts();
	}, []);

	const handleUpload = async (rowData, file) => {
		const tokenHeaders = { 'Authorization': `Bearer ${user.token}` };

		const data = new FormData();
		data.append('image', file);

		const requestOptions = {
			method: 'POST',
			headers: tokenHeaders,
			body: data,
			redirect: 'follow'
		};

		fetch(`${API_ENDPOINT}/products/upload/img/${rowData._id}`, requestOptions)
			.then(response => response.text())
			.then(result => console.log(result, 'image upload results'))
			.catch(err => console.log('PRODUCT-TABLE UPLOAD ERROR: ', err));
	}

	const getProducts = async () => {
		try {
			const {
				data: { data: results },
			} = await axios.get('/products');
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
		{
			title: 'User ID',
			field: 'user',
			editable: false,
		},
		{
			title: 'Image',
			field: 'image',
			editable: false,
		},
		{
			title: 'Upload Image',
			field: 'upload',
			editable: false,
			render: (rowData) =>
			(
				<Button
					variant="contained"
					component="label"
				>
					Upload
					<input
						type="file"
						name="image"
						onChange={e => {
							const file = e.target.files[0];
							handleUpload(rowData, file);
						}}
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
			title: 'Visibility',
			field: 'isActive',
			lookup: { true: 'yes', false: 'no' },
		},
		{
			title: 'Created on',
			field: 'createdAt',
			type: 'date',
			editable: false,
			render: (rowData) => dayjs(rowData.createdAt).format('HH:mm:ss DD/MM/YYYY'),
		},
	];

	const headers = {
		'Content-type': 'application/json',
		Authorization: `Bearer ${user.token}`,
	};

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
							fetch(`${API_ENDPOINT}/products`, {
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
							fetch(`${API_ENDPOINT}/products/${oldData._id}`, {
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
							fetch(`${API_ENDPOINT}/products/${oldData._id}`, {
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
