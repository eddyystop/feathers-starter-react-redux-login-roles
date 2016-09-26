
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import reducers from './reducers';
import middleware from './middleware';

export default function configureStore(initialState) {
  return createStore(
    combineReducers(reducers),
    initialState,
    compose(
      applyMiddleware(...middleware),
      // Redux DevTools Extension.
      // It watches reducers and logs their invocations, actions and changing state.
      // It caches activity so you can 'time travel' through state changes.
      // It runs in an extension reducing the size of your app bundle.
      // This interface can be left in prod bundles and the extension activated as needed.
      // For installation see: https://github.com/zalmoxisus/redux-devtools-extension#installation
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
