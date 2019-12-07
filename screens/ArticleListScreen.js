import * as React from 'react';
import { Text, View } from 'react-native';
import { styles} from '../styles.js';
import ArticleList from '../components/ArticleList'
import {Subscribe} from 'unstated'
import ListContainer from '../ListContainer'

const ArticleListScreen = props => (
   <Subscribe to={[ListContainer]}>
    {list => (
      <View style={styles.container}>
      <ArticleList list={list.state.data} />
      </View>
    )
    }
    </Subscribe>
)

ArticleListScreen.navigationOptions = {
  title: "Articles found"
  }

export default ArticleListScreen
