import React from 'react';
import { SidePanel, ColorPanel, Messages, MetaPanel } from './';

import './App.css';
import { Grid } from 'semantic-ui-react';

function App() {
  return (
    <Grid columns="equal" className="app" style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column style={{ width: 4 }}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}

export default App;
