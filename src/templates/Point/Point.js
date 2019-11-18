/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Container, Header, Left, Body, Right, Button, Icon, Title, } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, BackHandler, AsyncStorage, StyleSheet, Text, View, Image, ListView, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import PenukaranPoin from './PenukaranPoin';

export default class More extends Component {
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
                        <View style={{ width: widthDevice * 0.65, justifyContent: 'center', alignItems: 'center' }}><Title>Point</Title></View>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                    <ScrollableTabView
                        initialPage={0}
                        locked={false}
                        ref={(tabView) => { this.tabView = tabView; }}
                        tabBarUnderlineStyle={{ backgroundColor: '#70A071' }}
                        tabBarActiveTextColor={'#70A071'}
                        tabBarBackgroundColor={'#fff'}
                        tabBarTextStyle={{ fontSize: 14, color: '#70A071' }}
                        renderTabBar={() => <ScrollableTabBar />}
                    >

                        <View
                            tabLabel='Penukaran Points'
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white'
                            }}>
                            <PenukaranPoin />
                        </View>
                        <View
                            tabLabel='Kupon Milik Saya'
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white'
                            }}>

                        </View>
                    </ScrollableTabView>

                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
