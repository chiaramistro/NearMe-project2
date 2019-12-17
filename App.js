import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ArticleListScreen from './screens/ArticleListScreen';
import InsertLocationScreen from './screens/InsertLocationScreen';
import LocationListScreen from './screens/LocationListScreen';
import NewAddressScreen from './screens/NewAddressScreen';
import ReadingListScreen from './screens/ReadingListScreen';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'unstated';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { getIcon } from './styles.js';

/*
Setting the navigation
*/

const routes = {
  Home: HomeScreen,
  LocationList: LocationListScreen,
  ArticleList: ArticleListScreen,
  InsertLocation: InsertLocationScreen,
  NewAddress: NewAddressScreen,
};

const options = {
  initialRouteName: 'Home'
 };

const AppNavigator = createStackNavigator(routes, options);

const tabRoutes = {
  Home: AppNavigator,
  ReadingList: ReadingListScreen,
};

AppNavigator.navigationOptions = {
  tabBarIcon: ({ focused, tint }) => getIcon('ios-home', focused, tint),
};

const TabNavigator = createBottomTabNavigator(tabRoutes, {
    tabBarOptions: {
        activeTintColor: '#ffffff',
        inactiveTintColor: '#000000',
        style: {
            backgroundColor: '#1e88e5'
        }
    }
});

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <AppContainer />
      </Provider>
    );
  }
}
