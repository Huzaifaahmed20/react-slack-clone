import React, { useReducer, useEffect } from 'react';
import { Segment, Comment } from 'semantic-ui-react';

import MessagesHeader from './MessageHeader';
import MessageForm from './MessageForm';
import Message from './Message';
import firebase from '../../firebase';

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty
});

const Messages = ({ currentChannel, currentUser }) => {
  const initialState = {
    messages: [],
    loading: false
  };

  const [state, setState] = useReducer(reducer, initialState);
  const { messages } = state;

  const fetchMessages = () => {
    setState({ loading: true });
    const loadedMessages = [];
    if (currentChannel && currentUser) {
      firebase
        .database()
        .ref('messages')
        .child(currentChannel.id)
        .on('child_added', snap => {
          loadedMessages.push(snap.val());
          setState({ messages: loadedMessages, loading: false });
        });
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [messages.length]);

  const displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message key={message.timestamp} message={message} user={currentUser} />
    ));

  return (
    <React.Fragment>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="messages">
          {displayMessages(messages)}
        </Comment.Group>
      </Segment>

      <MessageForm currentChannel={currentChannel} currentUser={currentUser} />
    </React.Fragment>
  );
};
export default Messages;
