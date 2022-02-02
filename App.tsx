import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
