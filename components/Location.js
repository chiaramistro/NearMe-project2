import * as React from 'react';
import { Text, View } from 'react-native';
import { styles, Button, SmallButton } from '../styles.js';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer';

/*
Component representing the location.
If a location is clicked, the articles referring to it are shown.
A location can also be deleted if it's not of interest anymore.
*/

export default class Location extends React.Component {
  render() {
    return (
      <Subscribe to={[ListContainer]}>
        {list => (
          <View>
            <Button
              title={this.props.location}
              onPress={() => {
                this.props.forArticles(this.props.location);
                this.props.onUse();
              }}
            />
            <SmallButton
              title="Delete"
              onPress={() => {
                list.deleteLocation(this.props.location);
              }}
            />
          </View>
        )}
      </Subscribe>
    );
  }
}
