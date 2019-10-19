import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import createNavigation from "./src/navigation/AppNavigator";

export default function App() {
  const AppNavigator = createNavigation(false);

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
