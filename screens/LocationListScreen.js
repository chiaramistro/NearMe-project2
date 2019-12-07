import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { styles, Button, getIcon} from '../styles.js';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer'

const LocationListScreen = props => (
   <Subscribe to={[ListContainer]}>
    {
      list => (
      <View style={styles.container}>
      <Text style={styles.paragraph2}>Past locations{"\n"}that you recently used</Text>
      {
        list.state.addresses.map(function(add) {
          return (
          <Button title={add} onPress={() => {
            list.getArticlesFromLocation(add)
            props.navigation.navigate('ArticleList')
        } }/>
          )
      })
      }
      </View>
    )
    }
    </Subscribe>
)

LocationListScreen.navigationOptions = {
 title: 'Locations'
  }


export default LocationListScreen
