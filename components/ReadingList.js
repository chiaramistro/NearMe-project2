import * as React from 'react';
import { FlatList } from 'react-native';
import { styles, Button } from '../styles.js';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer';
import SavedArticle from './SavedArticle';

/*
Component representing the reading list. The list is composed by articles
that were saved by the user.
*/
export default class ReadingList extends React.Component {
  render() {
    return (
      <Subscribe to={[ListContainer]}>
        {list => (
          <FlatList
            data={list.state.readingList}
            renderItem={({ item }) => (
              <SavedArticle
                title={item.title}
                distance={list.getDistanceOfLocations(item.lat, item.lon)}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </Subscribe>
    );
  }
}
