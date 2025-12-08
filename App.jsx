import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
