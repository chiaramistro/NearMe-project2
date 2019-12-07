import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { styles, Button} from '../styles.js';

const HomeScreen = props => {
  return (

      <View style={styles.homeContainer}>
  <Text style={styles.title}>Welcome to{"\n"}NearMe</Text>
<Image
    style={{width: 100, height: 100, alignSelf: 'center', padding: 20}}
    source={{uri: 'https://cdn.onlinewebfonts.com/svg/img_465157.png'}}
  />
  <View style={styles.container}>
  <Button title="Past locations"
  onPress={() => props.navigation.navigate("LocationList")} />
  <Button title="New location"
  onPress={() => props.navigation.navigate("InsertLocation")} />
  </View>
</View>

)

}

HomeScreen.navigationOptions = {
 title: 'Home'
  }

export default HomeScreen
