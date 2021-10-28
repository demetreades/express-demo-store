import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { DeleteOutlined } from '@material-ui/icons';
import { CardActionArea, IconButton } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import useStyles from '../styles';

const OrderCard = ({ order, index }) => {
	const classes = useStyles();

	return (
		<Card className={classes.card, classes.orderCard}>
			<CardHeader
				title={`${index + 1}# ${order.lastName} ${order.firstName}`}
				subheader={`id: ${order._id}, user: ${order.user}`}
			/>
			<CardActionArea>
				<CardContent>
					<Typography variant="body2">
						Shipping Address: {`${order.address}, ${order.city} : ${order.postalCode}`}
					</Typography>
					<Typography variant="body2">
						Total Price: {`${order.totalPrice}€`}
					</Typography>
					<Typography variant="body2">
						Is Paid: {order.isPaid ? 'payed' : 'not paid'}
					</Typography>
					<Typography variant="body2">
						Is Delivered: {order.isDelivered ? 'delivered' : 'not delivered'}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default OrderCard;
