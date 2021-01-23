import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {config} from './overmind';
import {Provider} from 'overmind-react';
import {createOvermind} from 'overmind';

const overmind = createOvermind(config, {
  devtools: '192.168.1.66:3031'
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (isLoadingComplete) {
    return (
      <Provider value={overmind}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  } else {
    return null;
  }
}
