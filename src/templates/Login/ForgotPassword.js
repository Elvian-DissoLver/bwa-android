/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Container, Header, Left, Icon, Body, Right, Button, Fab, Input, InputGroup } from 'native-base';
import React, { Component } from 'react';
import { Linking, TouchableWithoutFeedback, ActivityIndicator, Keyboard, ImageBackground, AsyncStorage, BackHandler, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
var FloatingLabel = require('react-native-floating-labels');
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceBackground: require('./../../../images/background-home2.jpg'),
            sourceBackgroundLogin: require('./../../../images/login-background.png'),
            active: false,
        };
    }


    handleEmail = (text) => {
        this.setState({ email: text })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            Actions.Login({ 'direction': 'leftToRight' });
            return true;
        });
    }

    sendEmail() {
        this.setState({
            isLoading: true,
            email: ''
        })
        if (this.state.email == '' | this.state.email == null) {
            this.setState({
                isLoading: false
            })
            Toast.show('Email tidak boleh kosong', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: true })
        } else {
            fetch("http://202.83.120.140/api/forgot-password", {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body: "email=" + this.state.email// <-- Post parameters
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.status == 'failed') {
                        this.setState({
                            isLoading: false,
                            email: ''
                        })
                        Toast.show(responseJson.message, { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: true })
                    }
                    else {
                        this.setState({
                            isLoading: false,
                            email: '',
                        })
                        Alert.alert('Berhasil', 'Silakan periksa email Anda untuk mendapatkan password yang baru',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        Actions.Login({ 'direction': 'leftToRight' });
                                        return true;
                                    }
                                },
                            ])
                    }
                });
        }
    }


    render() {
        if (this.state.isLogin == '1') {
            return (
                <Home />
            )
        } else {
            return (
                <Container>

                    <ImageBackground source={this.state.sourceBackgroundLogin} style={styles.backgroundImage}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 15 }}>
                                <View>
                                    <Image
                                        style={{
                                            height: heightDevice * 0.2, width: widthDevice * 0.4,
                                            resizeMode: 'contain'
                                        }}
                                        source={require('./../../../images/bwaicon.png')}
                                    />
                                </View>
                                <View style={{ margin: 10 }}>
                                    <Text style={styles.fontStyleLoginQuotes}>
                                        Mohon masukkan email anda untuk melakukan proses forgot password
                                </Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                                    <View style={{ width: widthDevice * 0.7 }}>
                                        <FloatingLabel
                                            labelStyle={styles.labelInput}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            onChangeText={this.handleEmail}
                                            value={this.state.email}
                                            onBlur={this.onBlur}
                                        >Email</FloatingLabel>
                                    </View>
                                    <View style={{ width: widthDevice * 0.2 }}>
                                        <TouchableOpacity
                                            style={{
                                                borderWidth: 1,
                                                borderColor: 'rgba(255,255,255, 0.3)',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: heightDevice * 0.1,
                                                height: heightDevice * 0.1,
                                                backgroundColor: 'rgba(255,255,255, 0.5)',
                                                borderRadius: 100,
                                            }}
                                            onPress={() => {
                                                this.sendEmail(this.state.email)
                                            }
                                            }
                                        >
                                            <Icon name='ios-send' style={{ color: '#54AD64', fontWeight: 'bold', fontSize: 48 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>




                            </View>
                        </TouchableWithoutFeedback>
                        <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                    </ImageBackground>
                </Container >
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

    fontStyleLogin: {
        fontSize: 16,
        fontFamily: 'Zocial',
        color: 'white'
    },

    fontStyleLoginQuotes: {
        fontSize: 12,
        fontFamily: 'Zocial',
        color: 'white',
        textAlign: 'center'
    },

    fontStyleLoginWelcome: {
        fontSize: 42,
        fontFamily: 'Zocial',
        color: 'white',
        textAlign: 'center'
    },

    fontStyleLoginForgot: {
        fontSize: 12,
        fontFamily: 'Zocial',
        color: 'white',
        textAlign: 'center'
    },

    labelInput: {
        color: 'white',
        fontSize: 14,
    },
    formInput: {
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    input: {
        borderWidth: 0,
        color: 'white',
        height: 50,
        fontSize: 16,
    }
});
