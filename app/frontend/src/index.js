import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import Routes from './routes/Routes'

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import userReducer from './components/redux/reducers/userReducer'

const rootReducer = combineReducers({
  userReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>
, document.getElementById('root'));

serviceWorker.unregister();