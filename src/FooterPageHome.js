import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body } from 'native-base';
import { Actions, Scene } from 'react-native-router-flux';


export default class FooterPageHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceHome: require('./../images/IconFooter/IconHomeGreen.png'),
      sourceProgram: require('./../images/IconFooter/IconProgram.png'),
      sourceKegiatan: require('./../images/IconFooter/IconKegiatan.png'),
      sourceMore: require('./../images/IconFooter/IconMore.png'),
      colorHome: "red",
      colorProgram: "black",
      colorKegiatan: "black",
      colorMore: "black",
    };
  }

  componentDidMount() {
    // AsyncStorage.getItem('isHome').then((value) => {
    //   alert(value)
    // })
    this.init()
  }

  init() {
    if (currentPage == 'More') {
      this.toMore()
    } else if (currentPage == 'Program') {
      this.toProgram()
    } else if (currentPage == 'Kegiatan') {
      this.toKegiatan()
    } else if (currentPage == 'Home'){
      this.toHome()
    }
  }


  toHome() {
    Actions.Home();
    this.setState({
      sourceHome: require('./../images/IconFooter/IconHomeGreen.png'),
      sourceProgram: require('./../images/IconFooter/IconProgram.png'),
      sourceKegiatan: require('./../images/IconFooter/IconKegiatan.png'),
      sourceMore: require('./../images/IconFooter/IconMore.png'),
    });
  }

  toProgram() {
    AsyncStorage.setItem('tabActive', '' + 0)
    Actions.Program();
    this.setState({
      sourceHome: require('./../images/IconFooter/IconHome.png'),
      sourceProgram: require('./../images/IconFooter/IconProgramGreen.png'),
      sourceKegiatan: require('./../images/IconFooter/IconKegiatan.png'),
      sourceMore: require('./../images/IconFooter/IconMore.png'),
    });
  }

  toKegiatan() {
    Actions.Kegiatan();
    this.setState({
      sourceHome: require('./../images/IconFooter/IconHome.png'),
      sourceProgram: require('./../images/IconFooter/IconProgram.png'),
      sourceKegiatan: require('./../images/IconFooter/IconKegiatanGreen.png'),
      sourceMore: require('./../images/IconFooter/IconMore.png'),
    });
  }

  toMore() {
    Actions.More();
    this.setState({
      sourceHome: require('./../images/IconFooter/IconHome.png'),
      sourceProgram: require('./../images/IconFooter/IconProgram.png'),
      sourceKegiatan: require('./../images/IconFooter/IconKegiatan.png'),
      sourceMore: require('./../images/IconFooter/IconMoreGreen.png'),
    });
  }

  render() {
    return (
      <Footer androidStatusBarColor='black'>
        <FooterTab style={{ backgroundColor: 'white', borderTopColor: '#ddd', borderTopWidth: 1 }}>
          <Button onPress={() => this.toHome()} horizontal>
            <Image
              style={{ width: 40, height: 40 }}
              source={this.state.sourceHome}
            />
          </Button>
          <Button onPress={() => this.toProgram()} horizontal>
            <Image
              style={{ width: 30, height: 30 }}
              source={this.state.sourceProgram}
            />
          </Button>
          <Button onPress={() => this.toKegiatan()} horizontal>
            <Image
              style={{ width: 40, height: 40 }}
              source={this.state.sourceKegiatan}
            />
          </Button>
          <Button onPress={() => this.toMore()} horizontal>
            <Image
              style={{ width: 30, height: 30 }}
              source={this.state.sourceMore}
            />
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}