import * as React from 'react';
import { Text, View} from 'react-native';
import { styles, Button, SmallButton} from '../styles.js';
import { Linking } from 'expo';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer'

export default class SavedArticle extends React.Component {

  handleArticleClick = articleName => {
      const link = "https://www.google.com/search?q="+articleName
      Linking.openURL(link)
    }

render() {
  return (
    <Subscribe to={[ListContainer]}>
     {
       list => (
     <View style={styles.container}>
      <Button title={this.props.title} onPress={()=>{this.handleArticleClick(this.props.title)}} />
      <Text style={styles.distance}>With distance of {this.props.distance}</Text>
      <SmallButton title="Delete" onPress={()=>{list.deleteArticle(this.props.title)}} />

      </View>
  )
}
</Subscribe>
)
}

}
