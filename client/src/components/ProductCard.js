import axios from 'axios';

// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { CardActionArea, IconButton } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

import useStyles from '../styles';

const ProductCard = ({ product }) => {
  const classes = useStyles();

  const handleDelete = async () => {
    console.log(product._id);
    await axios.delete(`http://localhost:5000/products/${product._id}`);
    await window.location.reload();
  };

  // const TELEPHONE = 6900006675;

  // const handleAddTelephone = async () => {
  //   console.log(product._id);
  //   try {
  //     await axios.put(
  //       `http://localhost:5000/products/${product._id}/${TELEPHONE}`
  //     );
  //     await window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleRemoveTelephone = async () => {
  //   try {
  //     await axios.put(
  //       `http://localhost:5000/products/del/${product._id}/${TELEPHONE}`
  //     );
  //     await window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton>
            <DeleteOutlined onClick={handleDelete} />
          </IconButton>
        }
        title={product.name || 'name'}
        subheader={product.description || 'please add description'}
      />
      <CardActionArea>
        {/* <CardContent>
          <Typography variant="body2">
            {product.address ?? 'Lorem Address quis 122D'}
          </Typography>
          {product.telephone.map((tel) => (
            <Typography variant="body2" color="textSecondary">
              {tel}
            </Typography>
          )) ?? (
            <Typography variant="body2" color="textSecondary">
              XXXXXXXXX
            </Typography>
          )}
        </CardContent> */}
        <CardActionArea>
          <Button size="small" color="primary">
            ADD
          </Button>
          <Button size="small" color="primary">
            REMOVE
          </Button>
        </CardActionArea>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
