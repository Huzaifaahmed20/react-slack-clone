import React, { useState } from 'react';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    errors: [],
    loading: false
  });

  const { email, password, errors, loading } = state;

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const isFormEmpty = ({ email, password }) => email && password;

  const handleSubmit = async event => {
    event.preventDefault();
    setState({ errors: [], loading: true });

    if (isFormEmpty(state)) {
      try {
        const signedInUser = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log('TCL: Login -> signedInUser', signedInUser);

        setState({ errors: [], loading: false });
      } catch (error) {
        setState({ errors: errors.concat(error), loading: false });
      }
    }
  };

  const displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="purple" textAlign="center">
          <Icon name="code branch" color="purple" />
          Login for DevChat
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              type="email"
              value={email}
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              type="password"
              value={password}
            />

            <Button
              disabled={loading}
              className={loading ? 'loading' : ''}
              onClick={handleSubmit}
              color="purple"
              fluid
              size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h5>Error</h5>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
