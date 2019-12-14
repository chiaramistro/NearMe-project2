import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { styles, Button, getIcon } from '../styles.js';
import Location from './Location';

/*
Component representing the list of past locations. The list is composed by locations
that were previously searched by the user.
*/

export default class LocationList extends React.Component {
  addKeys = (val, index) => ({ ...val, key: index });

  render() {
    const displayLocationList = this.props.list.map(location => {
      return (
        <Location location={location} onUse={this.props.onUse} forArticles={this.props.forArticles} />
      );
    });

    const locationList = displayLocationList.map(this.addKeys);

    return <View>{locationList}</View>;
  }
}
