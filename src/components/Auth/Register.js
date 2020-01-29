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

const Register = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    project_images: [],
    project_files: [],
    errors: [],
    loading: false
  });

  const {
    username,
    email,
    password,
    passwordConfirmation,
    errors,
    loading
  } = state;

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 4 || passwordConfirmation.length < 4) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  const isFormValid = () => {
    let error;

    if (isFormEmpty(state)) {
      error = { message: 'Fill in all fields' };
      setState({ errors: state.errors.concat(error) });
      return false;
    } else if (!isPasswordValid(state)) {
      error = { message: 'Passwords are invalid' };
      setState({ errors: state.errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // const data = new FormData();
    // console.log(state.project_images);
    // console.log(state.project_files);
    // data.append('project_images', state.project_images);
    // data.append('project_files', state.project_files);
    // if (state.project_images.length) {
    //   for (var x = 0; x < state.project_images.length; x++) {
    //     data.append('project_images', state.project_images[x]);
    //   }
    // }
    // if (state.project_files.length) {
    //   for (var i = 0; i < state.project_files.length; i++) {
    //     data.append('project_files', state.project_files[i]);
    //   }
    // }

    // const myData = {
    //   title: 'new project',
    //   location: 'karachi',
    //   categories: [
    //     { main: '5e2ef3291eb12211e4ddb6a3', sub: '5e2ef3661eb12211e4ddb6a4' }
    //   ],
    //   description: 'this is new project',
    //   beginning_date: Date(),
    //   ending_date: Date(),
    //   valid_until: '5 days'
    // };
    // Object.keys(myData).forEach(item => {
    //   data.append(item, JSON.stringify(myData[item]));
    // });

    // // }

    // console.log(data.values());
    // const response = await axios.post(
    //   'http://localhost:8080/api/projects/add',
    //   data,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // );
    // console.log('TCL: response', response);
    setState({ errors: [], loading: true });
    if (isFormValid()) {
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        console.log('TCL: Register -> createdUser', createdUser);
        setState({ errors: [], loading: false });
      } catch (error) {
        setState({ errors: state.errors.concat(error), loading: false });
      }
    }
  };

  const displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  // const handleImage = ev => {
  //   const myFile = ev.target.files[0];
  //   setState(prevState => ({
  //     ...prevState,
  //     project_images: [...prevState.project_images, myFile]
  //   }));
  // };

  // const handleFile = ev => {
  //   const myFile = ev.target.files[0];
  //   setState(prevState => ({
  //     ...prevState,
  //     project_files: [...prevState.project_files, myFile]
  //   }));
  // };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="laptop" color="orange" />
          Register for DevChat
        </Header>
        <Form encType="multipart/form-data" size="large">
          <Segment stacked>
            {/* <Form.Input
              multiple
              type="file"
              onChange={handleImage}
              name="project_images"
              placeholder="UPLOAD IMAGE"
            />
            <Form.Input
              multiple
              type="file"
              onChange={handleFile}
              name="project_files"
            /> */}
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              type="text"
              value={username}
            />

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

            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              type="password"
              value={passwordConfirmation}
            />

            <Button
              disabled={loading}
              className={loading ? 'loading' : ''}
              onClick={handleSubmit}
              color="orange"
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
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
