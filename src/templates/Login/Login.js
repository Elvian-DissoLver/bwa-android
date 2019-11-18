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
import Home from '../Home/Home';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceBackground: require('./../../../images/background-home2.jpg'),
            sourceBackgroundLogin: require('./../../../images/login-background.png'),
            active: false,
        };
    }

    state = {
        username: '',
        password: ''
    }

    exitApps() {
        BackHandler.exitApp();
        return true;
    }

    handleUsername = (text) => {
        this.setState({ username: text })
    }

    handlePassword = (text) => {
        this.setState({ password: text })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
            return true;
        });
        AsyncStorage.getItem('loginStatus').then((valueLoginStatus) => {
            if (valueLoginStatus == '1') {
                this.setState({
                    isLoading: false,
                    isLogin: '1'
                })
            } else {
                this.setState({
                    isLoading: false,
                    isLogin: '0'
                })
            }
        });
    }

    login = (username, pass) => {
        Keyboard.dismiss();
        this.setState({ isLoading: true });
        if (this.state.username == '' | this.state.username == null) {
            this.setState({
                isLoading: false
            })
            Toast.show('Username tidak boleh kosong', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: true })
        } else if (this.state.password == '' | this.state.password == null) {
            this.setState({
                isLoading: false
            })
            Toast.show('Password tidak boleh kosong', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: true })
        } else {
            fetch("http://202.83.120.140/api/login-json", {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body: "username=" + username + "&password=" + pass // <-- Post parameters
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        username: '',
                        password: ''
                    })
                    if (responseJson.status == true) {
                        this.setState({
                            isLoading: false,
                            username: '',
                            password: ''
                        })
                        AsyncStorage.setItem('loginStatus', '1');
                        AsyncStorage.setItem('namaUser', responseJson.name);
                        AsyncStorage.setItem('company', responseJson.company['id']);
                        AsyncStorage.setItem('agen', responseJson.id);
                        AsyncStorage.setItem('username', username);
                        AsyncStorage.setItem('userId', responseJson.id);
                        AsyncStorage.setItem('profilePicture', responseJson.pict);
                        currentPage = 'Home'
                         Actions.Home()
                    }
                    else {
                        this.setState({
                            isLoading: false,
                            username: '',
                            password: ''
                        })
                        Toast.show(responseJson.message, { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: true })
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
                                    {/* <Text style={styles.fontStyleLoginWelcome}>
                                        L O G I N
                                </Text> */}
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
                                        Salurkan wakaf Anda melalui BWA, untuk memberi manfaat yang akan terus mengalir pahala dan keberkahannya
                                </Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                                    <View style={{ width: widthDevice * 0.9 }}>
                                        <FloatingLabel
                                            labelStyle={styles.labelInput}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            onChangeText={this.handleUsername}
                                            value={this.state.username}
                                            onBlur={this.onBlur}
                                        >Username</FloatingLabel>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 10, marginRight: 10 }}>
                                    <View style={{ width: widthDevice * 0.9 }}>
                                        <FloatingLabel
                                            secureTextEntry={true}
                                            labelStyle={styles.labelInput}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            onChangeText={this.handlePassword}
                                            value={this.state.password}
                                            onBlur={this.onBlur}
                                        >Password</FloatingLabel>
                                    </View>
                                </View>

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
                                        this.login(this.state.username, this.state.password)
                                    }
                                    }
                                >
                                    <Icon name='ios-checkmark' style={{ color: '#54AD64', fontWeight: 'bold', fontSize: 72 }} />
                                </TouchableOpacity>

                                <View style={{ marginTop: 35 }}>
                                    <TouchableOpacity onPress={() => Actions.ForgotPassword()}
                                    >
                                        <Text style={styles.fontStyleLoginForgot}>
                                            FORGOT PASSWORD
                                </Text>
                                    </TouchableOpacity>
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
