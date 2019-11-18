/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Container, CheckBox, ListItem, Header, Left, Body, Right, Button, Icon, Title, } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, TextInput, TouchableOpacity, BackHandler, AsyncStorage, StyleSheet, Text, View, Image, ListView, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import NumericInput from 'react-native-numeric-input';
import Toast from 'react-native-root-toast';
import Swipeable from 'react-native-swipeable';


var pembayaran;
export default class Keranjang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueCreate: 0,
            dataListMenu: [],
            textInputs: [],
            hargaSatuan: [],
            priceChanged: [],
            selectAll: false,
            price: 0,
            checkAll: 'none',
            buttonCheckout: 'none'
        }
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
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
// alert(this.state.priceChanged.length)
        AsyncStorage.getItem('proyekList').then((value) => {
            var data = value

            if (data == '[]' || data == '') {
                this.setState({
                    dataListMenu: [],
                    checkAll: 'none',
                    buttonCheckout: 'none'
                })
            } else {
                data = data.replace(/"{/g, "{").replace(/}"/g, "}")
                data = data.replace(/\\/g, "")
                this.setState({
                    dataListMenu: JSON.parse(data),
                    checkAll: 'none',
                    buttonCheckout: null
                })
            }
        });
    }

    toCheckOut() {
        // alert(this.state.textInputs[1])
        

        if (this.state.textInputs.length != this.state.dataListMenu.length) {
            Alert.alert('', 'Quantity tidak boleh 0')
        } else {
            Actions.Checkout()
        }
    }

    deleteCart(e) {
        Alert.alert('', 'Apakah Anda ingin menghapus item ini?',
            [
                { text: 'TIDAK', style: 'cancel' },
                {
                    text: 'YA', onPress: () => {
                        this.setState({ isLoading: true })
                        var array = this.state.dataListMenu;
                        var harga = array[e].harga;
                        array.splice(e, 1);
                        this.setState({
                            dataListMenu: array,
                            textInputs: this.state.textInputs.splice(e, 1),
                            price: this.state.price - harga
                        })
                        if (JSON.stringify(this.state.dataListMenu) == '[]') {
                            AsyncStorage.setItem('proyekList', '')
                                .then(() => {
                                    this.setState({
                                        buttonCheckout: 'none',
                                        checkAll: 'none',
                                        isLoading: false
                                    })
                                    Toast.show('Item berhasil dihapus', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: false });
                                })
                                .then(() => {
                                    AsyncStorage.getItem('proyekList').then(() => {
                                        AsyncStorage.setItem('jumlahKeranjang', '' + 0)
                                    })
                                })
                        } else {
                            AsyncStorage.setItem('proyekList', JSON.stringify(this.state.dataListMenu))
                                .then(() => {
                                    Toast.show('Item berhasil dihapus', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: false });
                                })
                                .then(() => {
                                    AsyncStorage.getItem('proyekList').then((value1) => {
                                        var jmlkrjg = JSON.parse(value1).length;
                                        AsyncStorage.setItem('jumlahKeranjang', '' + jmlkrjg)
                                    })
                                })
                        }

                    }
                },
            ],
            { cancelable: false }
        )

    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor='black' style={{ backgroundColor: '#bcc5d1' }}>
                    <Left>
                        <Button transparent onPress={() => this.handleBackButton()}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <View style={{ width: widthDevice * 0.65, justifyContent: 'center', alignItems: 'center' }}><Title>Komitmen</Title></View>
                    </Body>
                    <Right>
                        <TouchableOpacity style={{ display: this.state.buttonCheckout }} onPress={() => {
                            Alert.alert('', 'Apakah Anda ingin membersihkan komitmen?',
                                [
                                    { text: 'TIDAK', style: 'cancel' },
                                    {
                                        text: 'YA', onPress: () => {
                                            this.setState({ isLoading: true })
                                            AsyncStorage.setItem('proyekList', JSON.stringify([]))
                                                .then(() => {
                                                    this.setState({
                                                        isLoading: false,
                                                        dataListMenu: [],
                                                        buttonCheckout: 'none',
                                                        checkAll: 'none',
                                                        price: 'Rp 0'
                                                    })
                                                })
                                                .then(() => {
                                                    AsyncStorage.getItem('proyekList').then(() => {
                                                        AsyncStorage.setItem('jumlahKeranjang', '' + 0)
                                                    })
                                                })

                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}>
                            <Icon name='ios-trash' style={{ color: 'white' }} />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                    <View style={{ flex: 9 }}>
                        <Card style={{ width: widthDevice, height: heightDevice * 0.07, justifyContent: 'center', display: this.state.checkAll }}>
                            <CardItem>
                                <Body>
                                    <TouchableOpacity onPress={() => {
                                        if (this.state.selectAll == false)
                                            this.setState({ selectAll: true });
                                        else
                                            this.setState({ selectAll: false });
                                    }
                                    }>
                                        <View style={{ flexDirection: 'row' }}>
                                            <CheckBox checked={this.state.selectAll} onPress={() => {
                                                if (this.state.selectAll == false)
                                                    this.setState({ selectAll: true });
                                                else
                                                    this.setState({ selectAll: false });
                                            }
                                            } />
                                            <Text style={{ marginLeft: 20 }}>Pilih semua produk</Text>
                                        </View>
                                    </TouchableOpacity>

                                </Body>
                            </CardItem>
                        </Card>
                        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                            {(this.state.dataListMenu.length > 0) ?
                                this.state.dataListMenu.map((e, idx) => {
                                    return (
                                        <Swipeable rightButtons={
                                            [
                                                <TouchableOpacity onPress={() => this.deleteCart(idx)}>
                                                    <View style={{ backgroundColor: 'red', height: heightDevice * 0.153, width: widthDevice * 0.2, marginTop: heightDevice * 0.0073, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: 'white' }}>Delete</Text>
                                                    </View>
                                                </TouchableOpacity>

                                            ]

                                        }>
                                            <View style={{ alignItems: 'center' }}>
                                                <Card transparent style={{ width: widthDevice, height: heightDevice * 0.15 }}>
                                                    <CardItem bordered>
                                                        <Body>
                                                            <View style={{ flexDirection: 'row', width: widthDevice * 0.8, height: heightDevice * 0.12 }}>
                                                                {/* <View style={{ width: widthDevice * 0.1, height: heightDevice * 0.12, backgroundColor: 'white', justifyContent: 'center' }}>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <CheckBox checked={this.state.selectAll} onPress={() => {
                                                                            if (this.state.selectAll == false)
                                                                                this.setState({ selectAll: true });
                                                                            else
                                                                                this.setState({ selectAll: false });
                                                                        }} />
                                                                    </View>
                                                                </View> */}
                                                                <View style={{ width: widthDevice * 0.9, height: heightDevice * 0.12, backgroundColor: 'white', flexDirection: 'row', }}>
                                                                    <View style={{ width: widthDevice * 0.2, borderRadius: 10, height: heightDevice * 0.1, backgroundColor: 'white' }}>
                                                                        <Image style={{
                                                                            height: heightDevice * 0.1, width: widthDevice * 0.2,
                                                                            borderRadius: 10
                                                                        }}
                                                                            resizeMode='stretch'
                                                                            source={{ uri: e.image }}
                                                                        />
                                                                    </View>
                                                                    <View style={{ width: widthDevice * 0.7, flexDirection: 'column', marginLeft: 10, height: heightDevice * 0.1, backgroundColor: 'white' }}>
                                                                        <View style={{ width: widthDevice * 0.7 }}>
                                                                            <Text numberOfLines={2} style={{ fontSize: 16 }}>{e.name}</Text>
                                                                        </View>
                                                                        <View style={{ width: widthDevice * 0.7, flexDirection: 'row' }}>
                                                                            <View style={{ width: widthDevice * 0.3, marginTop: 8 }}>
                                                                                <NumericInput
                                                                                    initValue={0}
                                                                                    minValue={1}
                                                                                    valueType='real'
                                                                                    rounded={true}
                                                                                    editable={false}
                                                                                    totalWidth={widthDevice * 0.2}
                                                                                    totalHeight={heightDevice * 0.03}
                                                                                    value={this.state.textInputs[idx]}
                                                                                    borderColor='white'
                                                                                    rightButtonBackgroundColor='grey'
                                                                                    leftButtonBackgroundColor='grey'
                                                                                    textColor='transparent'
                                                                                    onChange={value => {
                                                                                        let { textInputs } = this.state;
                                                                                        textInputs[idx] = value;
                                                                                        this.setState({ textInputs })
                                                                                        AsyncStorage.setItem('quantity', JSON.stringify(this.state.textInputs))

                                                                                        let { hargaSatuan } = this.state;
                                                                                        hargaSatuan[idx] = e.price;
                                                                                        this.setState({ hargaSatuan })

                                                                                        AsyncStorage.setItem('price', JSON.stringify(hargaSatuan))
                                                                                    }} />
                                                                            </View>
                                                                            <View style={{ width: widthDevice * 0.4}}>
                                                                                <TextInput
                                                                                    ref={idx}
                                                                                    style={{ height: 40, textAlign: 'right', borderBottomColor: 'gray', borderBottomWidth: 1 }}
                                                                                    onChangeText={value => {

                                                                                        let { hargaSatuan, priceChanged } = this.state;
                                                                                        hargaSatuan[idx] = value;
                                                                                        priceChanged[idx] = value;
                                                                                        if(hargaSatuan[idx] == undefined){
                                                                                            hargaSatuan[idx] = e.price
                                                                                            priceChanged[idx] = e.price
                                                                                        }
                                                                                        this.setState({ hargaSatuan, priceChanged })

                                                                                        AsyncStorage.setItem('price', JSON.stringify(hargaSatuan))
                                                                                    }}
                                                                                    keyboardType={'numeric'}
                                                                                    value={(this.state.textInputs[idx]!= undefined || this.state.textInputs[idx]!= null) ? ''+this.state.hargaSatuan[idx] : '' + e.price}
                                                                                />
                                                                                {/* <Text style={{ fontSize: 14, color: 'grey', textAlign: 'right' }}>Rp {
                                                                                    this.currencyFormat(parseInt((this.state.textInputs[idx] != undefined) ? parseInt(e.price) : parseInt(e.price)))
                                                                                }</Text> */}
                                                                            </View>
                                                                        </View>

                                                                    </View>
                                                                    <View style={{ marginTop: heightDevice * 0.06, marginLeft: widthDevice * 0.284, position: 'absolute', backgroundColor: 'transparent', width: widthDevice * 0.0836, height: heightDevice * 0.028, justifyContent: 'center', alignItems: 'center' }}>
                                                                        <Text style={{ fontSize: 10, textAlign: 'center', color: 'grey' }}>{(this.state.textInputs[idx] != undefined) ? this.state.textInputs[idx] : 0}</Text>
                                                                    </View>
                                                                    {/* <View style={{ width: widthDevice * 0.1, height: heightDevice * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                                                                    <TouchableOpacity onPress={() => { this.deleteCart(idx) }}>
                                                                        <Icon name='ios-trash' />
                                                                    </TouchableOpacity>
                                                                </View> */}
                                                                </View>
                                                            </View>
                                                            {/* <View style={{ flexDirection: 'row', width: widthDevice * 0.8, height: heightDevice * 0.06 }}>
                                                            <View style={{ width: widthDevice * 0.1, height: heightDevice * 0.06, backgroundColor: 'white' }}>
                                                            </View>
                                                            <View style={{ width: widthDevice * 0.7, height: heightDevice * 0.06, backgroundColor: 'white' }}>
                                                                <View style={{ marginTop: heightDevice * 0.0155, marginLeft: widthDevice * 0.512, position: 'absolute', backgroundColor: 'white', width: widthDevice * 0.08 }}>
                                                                    <Text style={{ fontSize: 16, textAlign: 'center' }}>{this.state.textInputs[idx]}</Text>
                                                                </View>
                                                                <View style={{ alignItems: 'flex-end' }}>
                                                                    <NumericInput
                                                                        initValue={0}
                                                                        minValue={1}
                                                                        valueType='real'
                                                                        editable={false}
                                                                        totalWidth={widthDevice * 0.3}
                                                                        value={this.state.textInputs[idx]}
                                                                        textColor='transparent'
                                                                        onChange={value => {
                                                                            let { textInputs } = this.state;
                                                                            textInputs[idx] = value;
                                                                            this.setState({ textInputs })
                                                                            AsyncStorage.setItem('quantity', JSON.stringify(this.state.textInputs))
                                                                        }} />
                                                                </View>
                                                            </View>
                                                        </View> */}
                                                        </Body>
                                                    </CardItem>
                                                </Card>
                                            </View>
                                        </Swipeable>
                                    )
                                }) :
                                <View style={{ height: heightDevice * 0.8, width: widthDevice, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name='ios-sad' style={{ color: '#f49842', fontSize: 72 }} />
                                    <Text style={{ color: '#f49842', fontSize: 18 }}>Komitmen Anda kosong</Text>
                                </View>
                            }
                        </ScrollView>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', width: widthDevice, backgroundColor: 'white', borderTopColor: '#e8e8e8', display: this.state.buttonCheckout }}>
                        {/* <View style={{ width: widthDevice * 0.5, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}> */}
                        {/* <Text style={{}}>Total Harga</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.state.price}</Text> */}
                        {/* </View> */}
                        <View style={{ width: widthDevice, padding: 10, justifyContent: 'center', alignItems: 'center', height: heightDevice * 0.1 }}>
                            <TouchableOpacity onPress={() => { this.toCheckOut() }}>
                                <View style={{ width: widthDevice * 0.99, backgroundColor: '#92e552', justifyContent: 'center', alignItems: 'center', height: heightDevice * 0.08 }}>
                                    <Text style={{ color: '#fff', fontSize: 18 }}>Konfirmasi</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
