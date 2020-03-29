import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

import prices from './prices';

export default combineReducers({ prices, form });
