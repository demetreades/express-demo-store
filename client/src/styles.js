import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	ml5: {
		margin: ' 0 5px',
		textDecoration: 'none',
	},
	ml10: {
		margin: '0 10px',
	},
	mt5: {
		marginTop: '85px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	mt5Header: {
		marginTop: '22px',
	},
	mt8: {
		marginTop: '12px',
	},
	productCard: {
		margin: '8px',
		height: '520px',
	},
	title: {
		marginBottom: '20px',
	},
	field: {
		marginTop: '20px',
		marginBottom: '20px',
		display: 'block',
	},
	main: {
		display: 'flex',
		minHeight: '86.4vh',
		flexDirection: 'column',
	},
	orderCard: {
		margin: '8px',
	},
	orderTitle: {
		height: '38px',
	},
	description: {
		height: '80px'
	},
	cardTitle: {
		height: '90px'
	},
	orderAddress: {
		height: '65px'
	},
	orderPrice: {
		height: '25px'
	},
	test: {
		backgroundColor: 'azure',
	},
	cart: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '16px 0 8px 0',
		marginRight: '16px',
		flex: '1',
	},
	mtb8: {
		margin: '8px 0',
	},
	mtb16: {
		margin: '16px 0',
	},
	marginCenter: {
		margin: '0 auto',
	},
	fixedHeight: {
		height: '75vh',
		backgroundColor: 'purple',
	},
	flexNav: {
		marginRight: '16px',
		flex: '1'
	},
	homeGrid: {
		margin: '24px 0',
	},
	ordersGrid: {
		marginBottom: '24px',
	},
	missing: {
		display: 'flex',
		flexDirection: 'row'
	}
}));

export default useStyles;
