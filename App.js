import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Navigation from './Components/Navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Store = createStore(
  applyMiddleware(thunk)
)

export default function App() {
  return (
    <Provider store={Store}>
      <Navigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
