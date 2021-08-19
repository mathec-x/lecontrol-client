import { createStore } from 'redux';
// import thunk from 'redux-thunk';
import { persistCombineReducers, persistStore } from 'redux-persist';
import localforage from 'localforage';
import { Reducer, user } from './reducer';

const config = {
  key: 'root',
  storage: localforage,
  debug: process.env.NODE_ENV === 'development',
};

const reducers = persistCombineReducers(config, {
  user,
  products: Reducer('products', []),
  validations: Reducer('validations', []),
});

export default () => {
  const store = createStore(
    reducers,
    // applyMiddleware(thunk),
  );

  const persistor = persistStore(store);
  return { store, persistor };
};
