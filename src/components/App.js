import React from 'react';
import { SidePanel, ColorPanel, Messages, MetaPanel } from './';

import './App.css';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

function App({ currentUser }) {
  return (
    <Grid columns="equal" className="app" style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel currentUser={currentUser} />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column style={{ width: 4 }}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(App);
