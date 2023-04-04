import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Navigation from './Components/Navigation';

export default function App() {
  return (
    <View style={styles.container}>
    <StatusBar barStyle='dark-content' backgroundColor='white'/>
    <Navigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
