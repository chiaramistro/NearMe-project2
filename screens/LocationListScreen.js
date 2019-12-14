import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { styles, Button, getIcon } from '../styles.js';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer';
import LocationList from '../components/LocationList';

/*
Screen showing the list of the past locations searched by the user.
*/

const LocationListScreen = props => (
  <Subscribe to={[ListContainer]}>
    {list => (
      <View style={styles.container}>
        <Text style={styles.paragraph2}>
          Past locations{'\n'}that you recently used
        </Text>
        <LocationList
          list={list.state.addresses}
          onUse={() => props.navigation.navigate('ArticleList')}
          forArticles={location => list.getArticlesFromLocation(location)}
        />
      </View>
    )}
  </Subscribe>
);

LocationListScreen.navigationOptions = {
  title: 'Locations',
};

export default LocationListScreen;
