import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ml5: {
    marginLeft: '15px',
    color: 'white',
    textDecoration: 'none',
  },
  mt5: {
    marginTop: '25px',
  },
  card: {
    marginTop: '16px',
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: '50px 0',
  },
}));

export default useStyles;
