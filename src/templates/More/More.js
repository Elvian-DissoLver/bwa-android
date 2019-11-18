/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Container, Header, Left, Body, Right, Button, Icon, Title, Content, Drawer } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, BackHandler, AsyncStorage, StyleSheet, Text, View, Image, ListView, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueCreate: 0
        }
    }

    handleBackButton() {
        Actions.Home({ 'direction': 'leftToRight' });
        currentPage= 'Home'
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
                        <Title>Lainnya</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>

                    
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
