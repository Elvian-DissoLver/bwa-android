/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, BackHandler, AsyncStorage, StyleSheet, Text, View, Image, ListView, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NumericInput from 'react-native-numeric-input';

export default class Pengaturan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueCreate: 0
        }
    }

    handleBackButton() {
        AsyncStorage.getItem('prevPage').then((value) => {
            if (value == 'home') {
                Actions.Home({ 'direction': 'leftToRight' });
                currentPage = 'Home'
            } else if (value == 'programDetail') {
                Actions.ProgramDetail({ 'direction': 'leftToRight' });
            }
        })
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.handleBackButton();
            return true;
        });
    }

    logoutApps() {
        Alert.alert('', 'Anda ingin keluar dari aplikasi?',
            [
                { text: 'Tidak', style: 'cancel' },
                {
                    text: 'YA', onPress: () => {
                        AsyncStorage.setItem('loginStatus', '0');
                        Actions.Login({ 'direction': 'leftToRight' });
                        return true;
                    }
                }
            ]
        )
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
                        <View style={{ width: widthDevice * 0.65, justifyContent: 'center', alignItems: 'center' }}><Title>Pengaturan</Title></View>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 9, backgroundColor: '#ffffff' }}>
                        <Content>
                            <List>
                                <ListItem onPress={() => { }}>
                                    {/* <Icon style={{ color: '#23acfc', fontSize: 22 }} name='ios-information-circle' /> */}
                                    <Left>
                                        <Text style={{ fontSize: 16 }}>Tentang Kami</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="ios-arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem iconLeft onPress={() => { }}>
                                    <Left>
                                        <Text style={{ fontSize: 16 }}>FAQ</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="ios-arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem iconLeft onPress={() => { }}>
                                    <Left>
                                        <Text style={{ fontSize: 16 }}>Hubungi Kami</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="ios-arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem iconLeft onPress={() => { this.logoutApps() }}>
                                    <Left>
                                        <Text style={{ fontSize: 16 }}>Logout</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="ios-arrow-forward" />
                                    </Right>
                                </ListItem>
                            </List>
                        </Content>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Content>
                            <List style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <ListItem >
                                    <Text>Version 0.0.1-A</Text>
                                </ListItem>
                            </List>
                        </Content>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
