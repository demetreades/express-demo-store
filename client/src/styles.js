import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	ml5: {
		margin: ' 0 5px',
		textDecoration: 'none',
	},
	ml10: {
		margin: '0 10px',
	},
	mt5: {
		marginTop: '25px',
	},
	productCard: {
		margin: '8px',
		maxWidth: '300px',
		height: '300px',
	},
	btn: {
		fontSize: '42px',
		backgroundColor: 'violet',
		'&:hover': {
			backgroundColor: 'blue',
		},
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
		marginBottom: '80px',
		display: 'flex',
		// minHeight: '85.9vh',
		minHeight: '84vh',
		flexDirection: 'column',
	},
	footer: {
		position: 'fixed',
		width: '100%',
		bottom: '0',
	},
	child: {
		flexGrow: 1,
		minHeight: 0,
		overflow: 'scroll',
	},
	orderCard: {
		width: '25%',
		margin: '12px auto',
	},
	cart: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

export default useStyles;
