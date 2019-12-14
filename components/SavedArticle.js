import * as React from 'react';
import { Text, View } from 'react-native';
import { styles, Button, SmallButton } from '../styles.js';
import { Linking } from 'expo';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer';

/*
Component representing the article saved in the reading list.
If an article is clicked, the browser is opened.
An article can also be deleted if it's not of interest anymore.
*/
export default class SavedArticle extends React.Component {
  handleArticleClick = articleName => {
    const link = 'https://www.google.com/search?q=' + articleName;
    Linking.openURL(link);
  };

  render() {
    return (
      <Subscribe to={[ListContainer]}>
        {list => (
          <View style={styles.container}>
            <Button
              title={this.props.title}
              onPress={() => {
                this.handleArticleClick(this.props.title);
              }}
            />
            <Text style={styles.distance}>
              With distance of {this.props.distance} m
            </Text>
            <SmallButton
              title="Delete"
              onPress={() => {
                list.deleteArticle(this.props.title);
              }}
            />
          </View>
        )}
      </Subscribe>
    );
  }
}
