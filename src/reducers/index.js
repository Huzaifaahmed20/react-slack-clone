import { combineReducers } from 'redux';
import { user_reducer } from './UserReducers';
import { channel_reducer } from './ChannelReducer';

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
});

export default rootReducer;
