import React, { useReducer } from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';

import firebase from '../../firebase';
const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty
});

const MessageForm = ({ currentChannel, currentUser }) => {
  const initialState = {
    message: '',
    loading: false,
    errors: [],
    messageRef: firebase.database().ref('messages')
  };

  const [state, setState] = useReducer(reducer, initialState);
  const { message, messageRef, errors, loading } = state;
  const handleChange = ev => setState({ [ev.target.name]: ev.target.value });

  const createMessage = () => {
    const messageDetails = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      content: message,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      }
    };
    return messageDetails;
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setState({ loading: true });
    if (message) {
      try {
        await messageRef
          .child(currentChannel.id)
          .push()
          .set(createMessage());
        setState({ message: '', loading: false, errors: [] });
      } catch (err) {
        setState({ loading: false, errors: errors.concat(err) });
      }
    } else {
      setState({
        loading: false,
        errors: errors.concat({ message: 'Please write message ... ' })
      });
    }
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        onChange={handleChange}
        value={message}
        name="message"
        style={{ marginBottom: '0.7em' }}
        label={<Button icon={'add'} />}
        labelPosition="left"
        className={
          errors.some(err => err.message.includes('message')) ? 'error' : ''
        }
        placeholder="Write your message"
      />
      <Button.Group icon widths="2">
        <Button
          disabled={loading}
          onClick={handleSubmit}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;
