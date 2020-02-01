import React, { useState } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';

const UserPanel = ({ currentUser }) => {
  const [user] = useState(currentUser);

  const dropDownOptions = () => [
    {
      key: 'users',
      text: (
        <span>
          Signed in as <strong>{user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>
    },
    {
      key: 'signout',
      text: <span onClick={handleSignOut}>Sign Out</span>
    }
  ];
  const handleSignOut = async () => {
    await firebase.auth().signOut();
  };
  return (
    <Grid style={{ background: '#4c3c4c' }}>
      <Grid.Column>
        <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
          {/* App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>DevChat</Header.Content>
          </Header>
          {/* User DropDown */}
          <Header inverted style={{ padding: '0.25em' }} as="h4">
            <Dropdown
              trigger={
                <span>
                  <Image src={user.photoURL} avatar spaced="right" />
                  {user.displayName}
                </span>
              }
              options={dropDownOptions()}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
