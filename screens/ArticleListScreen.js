import * as React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles.js';
import ArticleList from '../components/ArticleList';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer';

/*
Screen showing the list of the articles resulting after the search.
*/
const ArticleListScreen = props => (
  <Subscribe to={[ListContainer]}>
    {list => (
      <View style={styles.container}>
        <ArticleList list={list.state.data} deleteData={list.deleteData} />
      </View>
    )}
  </Subscribe>
);

ArticleListScreen.navigationOptions = {
  title: 'Articles found',
  headerTintColor: '#ffffff',
  headerStyle: {
    backgroundColor: '#1e88e5'
  }
};

export default ArticleListScreen;
