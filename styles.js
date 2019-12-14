/*
File containing all the styling properties of the application
*/

import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export const getIcon = (name, focused, tint) => {
  const color = focused ? tint : 'grey';
  return <Ionicons name={name} size={25} color={color} />;
};

export const Button = ({ title, onPress, disabled }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

export const SmallButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.smallButton}>{title}</Text>
  </TouchableOpacity>
);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 40,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  paragraph2: {
    margin: 24,
    padding: 15,
    fontSize: 25,
    textAlign: 'center',
  },
  title: {
    margin: 24,
    padding: 20,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    margin: 8,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
  },
  smallButton: {
    fontSize: 15,
    textAlign: 'center',
    width: 50,
    borderColor: 'blue',
    borderWidth: 1,
    alignSelf: 'flex-end',
  },
  distance: {
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  field: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    width: 330,
    alignSelf: 'center',
  },
});
