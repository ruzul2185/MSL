import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import authReducers from './stores/reducers/auth';
import WebNavigation from "./navigation/WebNavigation";

const rootReducer = combineReducers({
    auth: authReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
      <Provider store={store}>
          <WebNavigation />
      </Provider>
  );
}

export default App;
