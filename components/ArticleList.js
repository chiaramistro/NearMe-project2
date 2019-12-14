import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles, Button } from '../styles.js';
import Article from './Article';

/*
Component representing the list of articles. The list is composed by articles
that are the result of the search based on the current position or on
a inserted city.
While loading, another screen is shown to make the user understand what is happening.
If the loading takes too much, it can be that no results are available (for example,
if the city inserted is not valid/does not exist)
*/

export default class ArticleList extends React.Component {

  componentWillUnmount() {
    this.props.deleteData();
  }

  render() {
    const list = this.props.list;

    if (list.length !== 0) {
      return (
        <View style={styles.container}>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <Article
                title={item.title}
                distance={item.distance}
                lat={item.lat}
                lon={item.lon}
              />
            )}
            keyExtractor={item => item.title}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph2}>
          ...{'\n'}l o a d i n g{'\n'}...
        </Text>
        <Text style={styles.paragraph}>
          {'\n'}{'\n'}Attention:{'\n'}if loading takes too much time,{'\n'}no results are available{'\n'}
          or the city is not valid.
        </Text>
      </View>
    );
  }
}
