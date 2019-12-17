import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { styles, Button } from '../styles.js';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer';
import CurrentLocation from '../components/CurrentLocation';

/*
Screen showing the name of the app and the current location of the user.
The user can also navigate to the past locations or insert a new position.
*/
const HomeScreen = props => (
  <Subscribe to={[ListContainer]}>
    {list => (
      <View style={styles.homeContainer}>
        <Text style={styles.title}>Welcome to{'\n'}NearMe</Text>
        <Image
          style={{ width: 100, height: 100, alignSelf: 'center', padding: 10 }}
          source={{ uri: 'https://cdn.onlinewebfonts.com/svg/img_465157.png' }}
        />
        <CurrentLocation
          askPerm={() => list.askInitialPerm()}
          location={list.state.currentCity}
        />
        <View style={styles.container}>
          <Button
            title="Past locations"
            onPress={() => props.navigation.navigate('LocationList')}
          />
          <Button
            title="New location"
            onPress={() => props.navigation.navigate('InsertLocation')}
          />
        </View>
      </View>
    )}
  </Subscribe>
);

HomeScreen.navigationOptions = {
  title: 'Home',
  headerTintColor: '#ffffff',
  headerStyle: {
    backgroundColor: '#1e88e5'
  }
};

export default HomeScreen;
