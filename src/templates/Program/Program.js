/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Container, Header, Left, Body, Right, Button, Icon, Title, Content, Drawer } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, ProgressBarAndroid, TouchableWithoutFeedback, BackHandler, AsyncStorage, StyleSheet, Text, View, Image, ListView, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NumericInput from 'react-native-numeric-input';

export default class Program extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueCreate: 0
        }
    }

    handleBackButton() {
        Actions.Home({ 'direction': 'leftToRight' });
        currentPage = 'Home'
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.handleBackButton();
            return true;
        });
    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor='black' style={{ backgroundColor: '#70A071' }}>
                    <Left>
                        <Button transparent onPress={() => this.handleBackButton()}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <View style={{ width: widthDevice * 0.65, justifyContent: 'center', alignItems: 'center' }}><Title>Program</Title></View>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>

                    <ScrollView>
                        <TouchableWithoutFeedback onPress={() => {
                            AsyncStorage.setItem('ImageProgram', '1');
                            Actions.ProgramDetail()
                        }}>
                            <View style={{ flexDirection: 'column', width: widthDevice * 0.95, height: heightDevice * 0.4, padding: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 1 }}>
                                <View style={{ flexDirection: 'row', width: widthDevice * 0.95, height: heightDevice * 0.3 }}>
                                    <View style={{ width: widthDevice * 0.95, height: heightDevice * 0.3 }}>
                                        <Image style={{
                                            height: heightDevice * 0.3, width: widthDevice * 0.95
                                        }}
                                            resizeMode='stretch'
                                            source={require('./../../../images/program1.jpg')}
                                        />
                                        {/* <Text style={{ textAlign: 'center' }}>Paket Donasi @ Rp115.000 </Text> */}
                                        <Text style={{ fontSize: 18 }}>Sedekah Kesehatan | Penghimpunan Agustus 2018 - Juli 2019</Text>
                                    </View>
                                    {/* <View style={{ width: widthDevice * 0.65, height: heightDevice * 0.2, margin: 20 }}>
                                    <Text style={{ fontSize: 18 }}>Sedekah Kesehatan |</Text>
                                    <Text style={{ fontSize: 18 }}>Penghimpunan Agustus</Text>
                                    <Text style={{ fontSize: 18 }}>2018 - Juli 2019</Text>

                                    <View style={{ width: widthDevice * 0.5, marginTop: 20 }}> */}
                                    {/* <Text style={{ fontSize: 10, color:'grey' }}>Terhimpun: Rp 81.500.000</Text> */}
                                    {/* <ProgressBarAndroid
                                            styleAttr="Horizontal"
                                            indeterminate={false}
                                            progress={0.5}
                                        /> */}
                                    {/* <Text style={{ fontSize: 10, color:'grey', textAlign:'right' }}>Target: Rp 161.500.000</Text> */}
                                    {/* </View> */}
                                    {/* </View> */}
                                </View>

                                {/* <View style={{ flexDirection: 'row', margin: 10, width: widthDevice * 0.95, height: heightDevice * 0.1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: widthDevice * 0.05, height: heightDevice * 0.1 }} />
                                <View style={{ width: widthDevice * 0.35, height: heightDevice * 0.1 }}>
                                    <NumericInput onChange={value => console.log(value)} />
                                </View>
                                <View style={{ width: widthDevice * 0.6, height: heightDevice * 0.1, margin: 10 }}>
                                    <TouchableWithoutFeedback>
                                        <Image style={{
                                            height: heightDevice * 0.08, width: widthDevice * 0.6
                                        }}
                                            resizeMode='contain'
                                            source={require('./../../../images/donasi-button.png')}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View> */}
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => {
                            AsyncStorage.setItem('ImageProgram', '2');
                            Actions.ProgramDetail()
                        }}>
                            <View style={{ flexDirection: 'column', width: widthDevice * 0.95, height: heightDevice * 0.4, padding: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 1 }}>
                                <View style={{ flexDirection: 'row', width: widthDevice * 0.95, height: heightDevice * 0.3 }}>
                                    <View style={{ width: widthDevice * 0.95, height: heightDevice * 0.3 }}>
                                        <Image style={{
                                            height: heightDevice * 0.3, width: widthDevice * 0.95
                                        }}
                                            resizeMode='stretch'
                                            source={require('./../../../images/program2.jpg')}
                                        />
                                        <Text style={{ fontSize: 18 }}>Sedekah Kesehatan | Penghimpunan Agustus 2018 - Juli 2019</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => {
                            AsyncStorage.setItem('ImageProgram', '3');
                            Actions.ProgramDetail()
                        }}>
                            <View style={{ flexDirection: 'column', width: widthDevice * 0.95, height: heightDevice * 0.4, padding: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 1 }}>
                                <View style={{ flexDirection: 'row', width: widthDevice * 0.95, height: heightDevice * 0.3 }}>
                                    <View style={{ width: widthDevice * 0.95, height: heightDevice * 0.3 }}>
                                        <Image style={{
                                            height: heightDevice * 0.3, width: widthDevice * 0.95
                                        }}
                                            resizeMode='stretch'
                                            source={require('./../../../images/program3.png')}
                                        />
                                        <Text style={{ fontSize: 18 }}>Sedekah Kesehatan | Penghimpunan Agustus 2018 - Juli 2019</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
