import * as React from 'react';
import { Text, View, TextInput } from 'react-native';
import { styles, Button } from '../styles.js';
import ListContainer from '../ListContainer';
import { Subscribe } from 'unstated';

/*
Screen to enter the address the user wants to use to find the articles.
After the user enters some input data, the app navigates to the ArticleList screen
to show the results
*/
const NewAddressScreen = props => (
  <Subscribe to={[ListContainer]}>
    {list => (
      <View style={styles.container}>
        <Text style={styles.paragraph2}>
          Insert the address{'\n'}you want to use
        </Text>
        <TextInput
          style={styles.field}
          value={list.state.newAddressName}
          onChangeText={list.handleAddressNameChange}
        />
        <Button
          title="Confirm"
          disabled={!list.state.newAddressName}
          onPress={() => {
            list.addAddress(list.state.newAddressName);
            list.getArticlesFromLocation(list.state.newAddressName);
            props.navigation.navigate('ArticleList');
          }}
        />
      </View>
    )}
  </Subscribe>
);

NewAddressScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#1e88e5'
  }
};

export default NewAddressScreen;
