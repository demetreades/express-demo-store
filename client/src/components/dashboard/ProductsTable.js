import { useState, useEffect, useContext } from 'react';
import MaterialTable from 'material-table';

// import { UserContext } from '../../context/UserContext';
import { ProductsContext } from '../../context/ProductsContext';

const Table = ({ title }) => {
  // const { user } = useContext(UserContext);
  const user = {
    email: 'admin@user.com',
    password: '12345678',
    isAdmin: false,
  };
  const products = [
    { name: 'eioi' },
    { name: 'eioi' },
    { name: 'eioi' },
    { name: 'eioi' },
  ];
  // const { products, setProducts } = useContext(ProductsContext);
  // const { setProducts } = useContext(ProductsContext);
  const [data, setData] = useState([]);

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${user.token}`,
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    fetch(`http://localhost:5000/products/`, {
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((resp) => setData(resp.products));
  };

  const product = [
    {
      title: 'Name',
      field: 'name',
    },
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
        editable={{
          // ADD PRODUCT
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              console.log(
                newData,
                `:: new product: ${newData.name} from table`
              );
              fetch(`http://localhost:5000/products/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ user: user._id, ...newData }),
              })
                .then((resp) => {
                  products.push(newData);
                  // na to anoiksw auto ksana!!!
                  // setProducts(products);
                  resp.json();
                })
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
