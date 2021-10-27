import { Link } from 'react-router-dom';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import { Accessibility } from '@material-ui/icons';

import useStyles from '../styles';

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Accessibility className={classes.icon} />
          <Link to="/home">
            <Typography variant="h6">demo store</Typography>
          </Link>
          <Link
            to="/dashboard"
            className={classes.ml5}
            variant="body2"
            underline="hover">
            dashboard
          </Link>
          <Link
            to="/login"
            className={classes.ml5}
            variant="body2"
            underline="hover">
            login
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
