import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';

import useStyles from '../styles';

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === '') {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }
    if (email && password) {
      console.log(email, password);
      try {
        axios
          .post('http://localhost:5000/users/login', {
            email,
            password,
          })
          .then(() => history.push('/'));
      } catch (err) {
        console.log('POST ERROR: ', err);
      }
    }
  };

  return (
    <>
      <Container>
        <Typography
          className={classes.mt5}
          variant="h3"
          color="primary"
          align="center">
          Create a New Contact
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            className={classes.field}
            variant="outlined"
            label="Contact email"
            fullWidth
            error={emailError}
            required
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            className={classes.field}
            variant="outlined"
            label="password"
            error={passwordError}
            fullWidth
          />
          <Button variant="contained" onClick={() => history.push('/')}>
            Back Home
          </Button>
          <Button
            className={classes.ml5}
            type="submit"
            color="secondary"
            variant="contained"
            startIcon={<SendIcon />}
            onClick={() => console.log('you clicked me')}>
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Login;
