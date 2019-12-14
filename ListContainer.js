import * as React from 'react';
import { Container } from 'unstated';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { PersistContainer } from 'unstated-persist';
import { AsyncStorage } from 'react-native';
import { getDistance } from 'geolib';

export default class ListContainer extends PersistContainer {

  state = {
    addresses: [],
    newAddressName: '',
    currentLatitude: 0,
    currentLongitude: 0,
    data: [],
    readingList: [],
    city: '',
  };

  /*
  Delete the collected data after the ArticleList component has unmounted
  */
  deleteData = () => {
    this.setState({data: []});
  }

  /*
  Get the distances between two locations and save the distance in each SavedArticle in the reading list
  */
  getDistanceOfLocations = (lat, lon) => {
    var dis = getDistance(
      { latitude: lat, longitude: lon },
      {
        latitude: this.state.currentLatitude,
        longitude: this.state.currentLongitude,
      }
    );
    return dis;
  };

  /*
  Add address to the addresses' list
  */
  addAddress = newAddress => {
    this.setState(state => ({
      addresses: [newAddress, ...this.state.addresses],
      newAddressName: '',
    }));
  };

  /*
  Handle address name input field change
  */
  handleAddressNameChange = text => this.setState({ newAddressName: text });

  /*
  Ask initial permission to retrieve current location
  */
  askInitialPerm = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    await this.computeCoordinates();
    await this.computeCityFromCoordinates(
      this.state.currentLatitude,
      this.state.currentLongitude
    );
  };

  /*
  Ask initial permission to retrieve current location and show the retrieved articles
  */
  askPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    await this.computeCoordinates();
    const lat = this.state.currentLatitude;
    const lon = this.state.currentLongitude;
    const fetchedData = await this.getArticles(lat, lon);
    const add = fetchedData[0].title;
    await this.setState({ data: fetchedData, newAddressName: add });
    await this.addAddress(this.state.newAddressName);
  };

  /*
  Compute coordinates (latitude and longitude) of the current location
  */
  computeCoordinates = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const loc = JSON.stringify(location);
    this.setState({
      currentLatitude: location.coords.latitude,
      currentLongitude: location.coords.longitude,
    });
  };

  /*
  Compute the name of the city based on some coordinates (latitude and longitude)
  through reverse geocoding
  */
  computeCityFromCoordinates = async (lat, lon) => {
    console.log(lat);
    console.log(lon);
    const loc = { latitude: lat, longitude: lon };
    let location = await Location.reverseGeocodeAsync(loc);
    this.setState({ currentCity: location[0].city });
  };

  /*
  Get the articles concerning a location (with latitudine and longitude)
  */
  getArticles = async (lat, lon) => {
    //https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=46.6712938|11.1525179&gsradius=10000&gslimit=10
    var url = 'https://en.wikipedia.org/w/api.php';

    var params = {
      action: 'query',
      list: 'geosearch',
      gscoord: lat + '|' + lon,
      gsradius: '10000',
      gslimit: '10',
      format: 'json',
    };

    url = url + '?origin=*';
    Object.keys(params).forEach(function(key) {
      url += '&' + key + '=' + params[key];
    });

    const response = await fetch(url);
    const theArticles = await response.json();
    var pages = theArticles.query.geosearch;

    const convertedResults = pages.map(page => {
      return {
        title: page.title,
        distance: page.dist,
        lat: page.lat,
        lon: page.lon,
      };
    });

    return convertedResults;
  };

  /*
  Save the article in the reading list, with its name, distance, latitude and longitude
  */
  saveArticle = (articleName, articleDistance, articleLat, articleLon) => {
    const length = this.state.readingList.length;

    if (
      this.state.readingList.filter(el => el.title != articleName).length ===
      length
    ) {
      const article = {
        title: articleName,
        distance: articleDistance,
        lat: articleLat,
        lon: articleLon,
      };
      this.setState({
        readingList: [...this.state.readingList, article],
      });

      alert('Article saved in the reading list');
    } else {
      alert('ATTENTION: Article is already in your reading list');
    }
  };

  /*
  Delete an article from the reading list
  */
  deleteArticle = articleName => {
    this.setState(state => ({
      readingList: state.readingList.filter(el => el.title != articleName),
    }));
  };

  /*
  Delete a location from the location list
  */
  deleteLocation = locationName => {
    this.setState(state => ({
      addresses: state.addresses.filter(el => el != locationName),
    }));
  };

  /*
  Compute the coordinates (latitude and longitude) of the city based on its name
  through geocoding
  */
  computeCoordinatesFromCity = async city => {
    let location = await Location.geocodeAsync(city);

    await this.setState({
      currentLatitude: String(location[0].latitude),
      currentLongitude: String(location[0].longitude),
    });
  };

  /*
  Get the articles from a location based on its name
  */
  getArticlesFromLocation = async city => {
    await this.computeCoordinatesFromCity(city);
    const fetchedData = await this.getArticles(
      this.state.currentLatitude,
      this.state.currentLongitude
    );
    await this.setState({ data: fetchedData });
  };

  /*
  PersistContainer ensuring persistency in the application
  */
  persist = {
    key: 'counter',
    version: 1,
    storage: AsyncStorage,
  };
}
