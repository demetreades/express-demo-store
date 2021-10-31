import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import useStyles from '../styles';

const OrderCard = ({ order, index }) => {
	const classes = useStyles();

	const fullTitle = `${index + 1}. ${order.lastName} ${order.firstName}`

	return (
		<Card className={classes.orderCard}>
			<CardHeader className={classes.orderTitle}
				title={
					fullTitle.length <= 20
						? fullTitle
						: `${fullTitle.slice(0, 20)}...`
				}
				subheader={`id: ${order._id}`}
			/>
			<CardContent>
				<Typography
					variant="body2"
					className={classes.orderAddress}
				>
					Shipping Address: <br />{`${order.address}, ${order.city} : ${order.postalCode}`}
				</Typography>
				<Typography
					variant="body2"
					className={classes.orderPrice}
				>
					Items: {order.orderItems.length}
				</Typography>
				<Typography
					variant="body2"
					className={classes.orderPrice}
				>
					Total Price: {`${order.totalPrice}€`}
				</Typography>
				<Typography variant="body2" color={'secondary'}>
					Is Delivered: {order.isDelivered ? 'delivered' : 'not delivered'}
				</Typography>
				<Typography variant="body2" color={'textSecondary'}>
					Is Paid: {order.isPaid ? 'payed' : 'not paid'}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default OrderCard;
