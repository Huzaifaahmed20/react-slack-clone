import React, { useReducer, useEffect } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { setCurrentChannel } from '../../actions/ChannelActions';
import firebase from '../../firebase';


const Channels = ({ currentUser, setCurrentChannel }) => {
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  });

  //in this case in which we have multiple states, solution is that wehther initialize different state for each, or use useReducer
  const initialState = {
    channels: [],
    isModalOpen: false,
    channelName: '',
    channelDescription: '',
    firstLoad: true
  };

  const [state, setState] = useReducer(reducer, initialState);

  const {
    channels,
    isModalOpen,
    channelName,
    channelDescription,
    firstLoad
  } = state;
  const channelRef = firebase.database().ref('channels');

  const handleClose = () => setState({ isModalOpen: false });
  const handleOpen = () => setState({ isModalOpen: true });
  const handleChange = ev =>
    setState({ [ev.target.name]: ev.target.value });

  const setFirstChannel = () => {
    if (firstLoad && channels && channels.length > 0) {
      const firstChannel = channels[0];
      setCurrentChannel(firstChannel);
    }
    setState({ firstLoad: false });
  };

  const fetchChannels = () => {
    const loadedChannels = [];
    channelRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      setState({ channels: loadedChannels });
    });
  };



  useEffect(() => {
    fetchChannels();
  }, [channels.length]);


  const addChannel = () => {
    const { displayName, photoURL } = currentUser;
    const key = channelRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDescription,
      createdBy: {
        name: displayName,
        avatar: photoURL
      }
    };
    channelRef.child(key).update(newChannel);
    setState({ channelName: '', channelDescription: '' });
    handleClose();
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    if (channelName && channelDescription) {
      addChannel();
    }
  };

  const changeChannel = channel => {
    setCurrentChannel(channel);
  };

  const displayChannels = channels =>
    channels &&
    channels.length &&
    channels.map(channel => (
      <Menu.Item
        name={channel.name}
        key={channel.id}
        onClick={() => changeChannel(channel)}
        style={{ opacity: 0.7 }}>
        # {channel.name}
      </Menu.Item>
    ));

  return (
    <React.Fragment>
      <Menu.Menu style={{ paddingBottom: '2em' }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{' '}
          ({channels && channels.length}){' '}
          <Icon onClick={handleOpen} name="add" />
        </Menu.Item>
        {displayChannels(channels)}
      </Menu.Menu>

      <Modal basic open={isModalOpen} onClose={handleClose}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDescription"
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleSubmit} color="green" inverted>
            <Icon name="checkmark" /> Add
          </Button>
          <Button onClick={handleClose} color="red" inverted>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default connect(null, { setCurrentChannel })(Channels);
