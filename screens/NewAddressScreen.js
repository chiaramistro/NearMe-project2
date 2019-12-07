import * as React from 'react';
import { Text, View, TextInput } from 'react-native';
import { styles, Button } from '../styles.js';
import ListContainer from '../ListContainer';
import { Subscribe } from 'unstated';

const NewAddressScreen = props => (
  <Subscribe to={[ListContainer]}>
    {list => (
      <View style={styles.container}>
        <Text style={styles.paragraph2}>Insert the address{"\n"}you want to use</Text>
        <TextInput
          style={styles.field}
          value={list.state.newAddressName}
          onChangeText={list.handleAddressNameChange}
        />
        <Button
          title="Confirm"
          onPress={() => {
            list.addAddress(list.state.newAddressName);
            list.getArticlesFromLocation(list.state.newAddressName)
            props.navigation.navigate('ArticleList')
          }}
        />
      </View>
    )}
  </Subscribe>
);

export default NewAddressScreen;
