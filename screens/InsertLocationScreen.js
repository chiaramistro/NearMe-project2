import * as React from 'react';
import { Text, View } from 'react-native';
import { styles, Button } from '../styles.js';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer';

const InsertLocationScreen = props => (
  <Subscribe to={[ListContainer]}>
    {list => (
      <View style={styles.container}>
        <Text style={styles.paragraph2}>
          {' '}
          Which location do you want to use?
        </Text>

        <Button title="Current location" onPress={() => {
          list.askPermission()
          props.navigation.navigate('ArticleList')
          }
         } />
        <Button
          title="New address"
          onPress={() => props.navigation.navigate('NewAddress')}
        />
      </View>
    )}
  </Subscribe>
);

InsertLocationScreen.navigationOptions = {
 title: 'Insert location'
  }

export default InsertLocationScreen;
