import * as React from 'react';
import { Text, View } from 'react-native';
import { styles, Button, getIcon } from '../styles.js';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer';
import ReadingList from '../components/ReadingList';

/*
Screen showing the reading list with all the saved articles.
*/
const ReadingListScreen = props => (
  <Subscribe to={[ListContainer]}>
    {list => (
      <View style={styles.container}>
        <Text style={styles.title}>Reading list</Text>
        <ReadingList />
      </View>
    )}
  </Subscribe>
);

ReadingListScreen.navigationOptions = {
  title: 'Reading list',
  tabBarIcon: ({ focused, tint }) => getIcon('ios-book', focused, tint),
};

export default ReadingListScreen;
