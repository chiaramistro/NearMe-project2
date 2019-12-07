import * as React from 'react';
import { Text, View, FlatList} from 'react-native';
import { styles, Button } from '../styles.js';
import Article from './Article';

export default class ArticleList extends React.Component {

  render() {

    const list = this.props.list;

    if (list.length !== 0) {
return (
    <View style={styles.container}>
   <FlatList
        data={list}
        renderItem={ ({ item }) => <Article title={item.title} distance={item.distance} /> }
        keyExtractor={item => item.id}
      />
      </View>
);

    }

    return (
        <View style={styles.container}>
        <Text style={styles.paragraph2}>...{"\n"}loading{"\n"}the{"\n"}articles{"\n"}...</Text>
      </View>
    )

}

}
