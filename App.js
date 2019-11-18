import React, { Component } from 'react';
import { Dimensions, StatusBar, StyleSheet, ImageBackground, View, Image } from 'react-native';
import Index from './src/index';
import { setCustomText } from 'react-native-global-props';

var { height, width } = Dimensions.get('screen');
global.widthDevice = width;
global.heightDevice = height;

const customTextProps = {
  style: {
    fontSize: 12,
    fontFamily: 'Zocial',
    color: 'black'
  }
};

setCustomText(customTextProps);

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      sourceBackground: require('./images/background-home.jpg'),
    }
  }



  render() {
    let that = this;
    setTimeout(function () {
      that.setState({ timePassed: true });
    }, 2500);

    if (!this.state.timePassed) {
      return (
        <ImageBackground source={this.state.sourceBackground} style={styles.backgroundImage}>

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <StatusBar hidden />
            <Image
              style={{
                height: heightDevice * 0.2, width: widthDevice * 0.4, left: widthDevice * 0.3,
                resizeMode: 'contain'
              }}
              source={require('./images/bwaicon.png')}
            />
          </View>
        </ImageBackground>

      );
    } else {
      return (
        <Index />
      )
    }
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
