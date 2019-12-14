import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { styles, Button, getIcon } from '../styles.js';

/*
Component representing the current location of the user in the Home screen.
*/

export default class CurrentLocation extends React.Component {
  componentDidMount() {
    this.props.askPerm();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph2}>{this.props.location} </Text>
      </View>
    );
  }
}
