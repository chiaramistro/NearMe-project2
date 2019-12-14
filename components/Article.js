import * as React from 'react';
import { View, Text } from 'react-native';
import { styles, Button, SmallButton } from '../styles.js';
import { Linking } from 'expo';
import { Subscribe } from 'unstated';
import ListContainer from '../ListContainer';

/*
Component representing the article.
If an article is clicked, the browser is opened.
An article can also be saved in the reading list.
*/
export default class Article extends React.Component {
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
            <View>
              <Text style={styles.distance}>
                Distance: {this.props.distance}
              </Text>
              <SmallButton
                title="Save"
                onPress={() => {
                  list.saveArticle(
                    this.props.title,
                    this.props.distance,
                    this.props.lat,
                    this.props.lon
                  );
                }}
              />
            </View>
          </View>
        )}
      </Subscribe>
    );
  }
}
