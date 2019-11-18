/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Container, Header, Left, Body, Right, Button, Icon, Title, Content, Drawer } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, TouchableOpacity, BackHandler, AsyncStorage, StyleSheet, Text, View, Image, ListView, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PenukaranPoin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueCreate: 0
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <View style={{ flex: 9.5, backgroundColor: '#ffffff', marginTop: heightDevice * 0.1 }}>
                    <ScrollView>
                        <View style={styles.allPoint}>
                            <View style={styles.listPoint} />
                        </View>
                        <View style={styles.allPoint}>
                            <View style={styles.listPoint} />
                        </View>
                        <View style={styles.allPoint}>
                            <View style={styles.listPoint} />
                        </View>
                        <View style={styles.allPoint}>
                            <View style={styles.listPoint} />
                        </View>
                        <View style={styles.allPoint}>
                            <View style={styles.listPoint} />
                        </View>
                        <View style={styles.allPoint}>
                            <View style={styles.listPoint} />
                        </View>
                    </ScrollView>
                </View>

                <View style={{ flex: 0.7, flexDirection: 'row', width: widthDevice, marginBottom: heightDevice * 0.1 }}>
                    <View style={{ width: widthDevice * 0.5, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10, marginTop: 15 }}>
                        <Text style={{}}>Status Membership</Text>
                        <Text style={{fontWeight: 'bold', fontSize:18}}>Gold</Text>
                    </View>
                    <View style={{ width: widthDevice * 0.45, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10, marginTop: 15 }}>
                        <Text>Point Saya</Text>
                        <Text style={{fontWeight: 'bold', fontSize:18}}>1000</Text>
                    </View>
                </View>
            </Container>
        );
    }
}

var { height, width } = Dimensions.get('screen');
var widthDevice = width;
var heightDevice = height;

const styles = StyleSheet.create({
    allPoint: {
        flex: 2,
        alignContent: 'center',
        flexDirection: 'row',
        width: widthDevice * 0.95,
        marginLeft: widthDevice * 0.025,
        marginRight: widthDevice * 0.025,
        marginBottom: widthDevice * 0.005,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255, 0.5)'
    },

    listPoint: {
        alignContent: 'center',
        width: widthDevice * 0.95,
        height: heightDevice * 0.2,
        margin: widthDevice * 0.025,
        justifyContent: 'center',
        backgroundColor: '#e8e8e8',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10
    },
});
