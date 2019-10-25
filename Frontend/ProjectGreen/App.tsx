import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import createNavigation from "./src/navigation/AppNavigator";
import Providers from './src/providers/Providers';
import { NavigationService } from './src/services/NavigationService';

export default function App() {
  const AppNavigator = createNavigation();

  return (
    <View style={styles.container}>
      <Providers>
        <AppNavigator ref={navigation => NavigationService.setNavigation(navigation)} />
      </Providers>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
