import * as React from 'react';
import { FlatList} from 'react-native';
import { styles, Button } from '../styles.js';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer'
import SavedArticle from './SavedArticle'

export default class ReadingList extends React.Component {

render() {
  return (
    <Subscribe to={[ListContainer]}>
     {
       list => (
          <FlatList
    data={list.state.readingList}
     renderItem={ ({ item }) => <SavedArticle title={item.title} distance={item.distance}/> }
     keyExtractor={item => item.id}
   />
 )
}
</Subscribe>
)
}

}
