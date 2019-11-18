/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Container, Header, Left, Body, Right, Button, Icon, Title, Content, Drawer } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, ProgressBarAndroid, TouchableWithoutFeedback, BackHandler, AsyncStorage, StyleSheet, Text, View, Image, ImageBackground, ListView, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class ProyekDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueCreate: 0
        }
    }

    handleBackButton() {
        Actions.ProgramDetail({ 'direction': 'leftToRight' });
        currentPage = 'ProgramDetail'
        return true;
    }

    addToCart() {
        Alert.alert('', 'Tambahkan ke Komitmen?',
            [
                { text: 'Tidak', style: 'cancel' },
                {
                    text: 'Ya', onPress: () => {
                        Actions.Keranjang();
                        return true;
                    }
                },
            ]
        )
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.handleBackButton();
            return true;
        });
        AsyncStorage.getItem('ImageProyek').then((valueImage) => {
            AsyncStorage.getItem('nameProyek').then((valueName) => {
                this.setState({
                    imageProgram:
                        <ImageBackground style={{
                            height: heightDevice * 0.3, width: widthDevice
                        }}
                            resizeMode='stretch'
                            source={{ uri: valueImage }}
                        >
                        </ImageBackground>,
                    nameProject: valueName
                })
            });
        });

    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <View style={{ height: heightDevice * 0.4, width: widthDevice }}>
                        {this.state.imageProgram}

                        <View style={{ width: widthDevice }}>
                            <Text style={{ fontSize: 18, margin: 5 }}>{this.state.nameProject}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: widthDevice, borderWidth: 1, borderColor: '#e8e8e8', marginTop: 10, paddingBottom: 10 }}>
                        <View style={{ width: widthDevice * 0.025 }} />
                        <View style={{ width: widthDevice * 0.95 }}>
                            <Text style={{ fontSize: 16 }}>Deskripsi: </Text>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </Text>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </Text>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </Text>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </Text>
                        </View>
                    </View>
                    <View style={{ width: widthDevice, backgroundColor: 'white', height: heightDevice * 0.1 }}>
                        <Text> </Text>
                    </View>
                </ScrollView>
                {/* </View> */}
                <View style={{ width: widthDevice, flexDirection: 'row', backgroundColor: '#e8e8e8', height: heightDevice * 0.08, bottom: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => this.addToCart()}>
                        <View style={{ width: widthDevice * 0.99, flexDirection: 'row', backgroundColor: '#ff6f3f', height: heightDevice * 0.079, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Tambah ke Komitmen</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

                <View style={{ width: widthDevice, flexDirection: 'row', backgroundColor: 'transparent', height: heightDevice * 0.08, top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => this.handleBackButton()}>
                        <View style={{ width: widthDevice * 0.1, left: widthDevice*0.85, flexDirection: 'row', backgroundColor: 'transparent', height: heightDevice * 0.079, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Icon name='ios-close' style={{ color: 'white', fontSize: 28, marginLeft: 20 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{ width: widthDevice * 0.89, }} />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
