import * as React from 'react';
import { Container } from 'unstated';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {PersistContainer} from './mypersist'

export default class ListContainer extends Container {
  state = {
    addresses: ['Bolzano'],
    newAddressName: '',
    currentLatitude: 0,
    currentLongitude: 0,
    data: [],
    readingList: [],
  };

  addAddress = newAddress => {
      this.setState(state => ({
        addresses: [newAddress, ...this.state.addresses],
        newAddressName: '',
      }));
  };

  handleAddressNameChange = text => this.setState({ newAddressName: text });

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
    const add = fetchedData[0].title
    await this.setState({ data: fetchedData, newAddressName: add});
    await this.addAddress(this.state.newAddressName)
  };

  computeCoordinates = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const loc = JSON.stringify(location);
    this.setState({
      currentLatitude: location.coords.latitude,
      currentLongitude: location.coords.longitude,
    });
  };

  getArticles = async (lat, lon) => {

//Funziona
//https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=46.6712938|11.1525179&gsradius=10000&gslimit=10

  var url = 'https://en.wikipedia.org/w/api.php';

  var params = {
    action: 'query',
    list: 'geosearch',
    gscoord: lat + '|' + lon,
    gsradius: '10000',
    gslimit: '10',
    format:'json'
  };

    url = url + '?origin=*';
    Object.keys(params).forEach(function(key) {
      url += '&' + key + '=' + params[key];
    });

  const response = await fetch(url)
  const theArticles = await response.json()
  var pages = theArticles.query.geosearch;

const convertedResults = pages.map(page => {
          return {
            title: page.title,
            distance: page.dist
          };
        });


  return convertedResults

  };

  saveArticle = (articleName, articleDistance) => {

const length = this.state.readingList.length

if ((this.state.readingList.filter(el => el.title != articleName )).length === length) {
  const article = {title: articleName, distance: articleDistance}
  this.setState(state => ({
    readingList: [...this.state.readingList, article],
  }));
    alert("Article saved in the reading list")
}
else {
alert("ATTENTION: Article is already in your reading list")
}

  }

  deleteArticle = articleName => {
    this.setState(state => ({
       readingList: state.readingList.filter(el => el.title != articleName )
   }));
  }

  computeCoordinatesFromCity = async (city) => {

    let location = await Location.geocodeAsync(city)

    await this.setState({
      currentLatitude: String(location[0].latitude),
      currentLongitude: String(location[0].longitude),
    });

  }

  getArticlesFromLocation = async (city) => {
  await this.computeCoordinatesFromCity(city)
  const fetchedData = await this.getArticles(this.state.currentLatitude, this.state.currentLongitude);
  await this.setState({ data: fetchedData });
}


}
