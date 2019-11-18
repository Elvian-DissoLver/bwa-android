/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Item, Input, Container, List, ListItem, Header, Left, Body, Right, Button, Icon, Title, } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, Modal, TouchableWithoutFeedback, Keyboard, TouchableOpacity, BackHandler, AsyncStorage, StyleSheet, Text, TextInput, View, Image, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
var FloatingLabel = require('react-native-floating-labels');
import Autocomplete from 'react-native-autocomplete-input';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import Spinner from 'react-native-loading-spinner-overlay';

var totalBayar;
var totalBayarPlusUnik;
var optionsWakif = [];
export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueCreate: 0,
            dataListMenu: [],
            dataPrice: [],
            selectAll: false,
            wakifName: '',
            wakifId: '',
            visibleModal: false,
            visibleCreate: false,
            isLoading: true,
            optionsWakif: [],
            visibleModalListWakif: false,
            price: 3000000
        }
    }

    handleBackButton() {
        Actions.Keranjang({ 'direction': 'leftToRight' });
        currentPage = 'Keranjang'
        return true;
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }

    getSum(total, num) {
        return total + num;
    }

    openModalCreateWakif() {
        this.setState({
            newWakifPhone: '',
            wakifName: 'Hamba Allah',
            newWakifEmail: 'no@email.com',
            visibleCreate: true
        })
    }

    openModalListWakif() {
        this.setState({
            visibleModalListWakif: true
        })
    }

    saveNewWakif() {
        this.setState({
            isLoading: true
        })
        if (this.state.newWakifPhone == '' || this.state.newWakifPhone == null || this.state.newWakifPhone == undefined) {
            this.setState({
                isLoading: false
            })
            Alert.alert('', 'No. Handphone harus diisi')
        } else {
            fetch("http://202.83.120.140/api/customer/create", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.wakifName,
                    address: '',
                    city: '',
                    postal_code: '',
                    state: '',
                    country: '',
                    phone: '',
                    mobile: this.state.newWakifPhone,
                    fax: '',
                    email: this.state.newWakifEmail,
                    tax_no: ''
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.error(responseJson)
                    if (responseJson.status == true) {
                        AsyncStorage.setItem('wakifName', this.state.wakifName)
                        AsyncStorage.setItem('wakifEmail', this.state.newWakifEmail)
                        AsyncStorage.setItem('wakifPhoneNumber', this.state.newWakifPhone)
                        AsyncStorage.setItem('wakifID', responseJson.customer_id)
                        // fetch('http://202.83.120.140/api/customer/optcustomer')
                        //     .then((response) => response.json())
                        //     .then((responseJson) => {
                        //         optionsWakif = responseJson;
                        this.setState({
                            isLoading: false,
                            // optionsWakif: responseJson,
                            visibleCreate: false
                        })
                        //     })

                    } else {
                        Alert.alert('', 'Mohon untuk mengisi seluruh data')
                    }
                })
        }

    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.handleBackButton();
            return true;
        });


        fetch('http://202.83.120.140/api/unique-code/generate')
            .then((response) => response.json())
            .then((responseJson) => {
                totalBayar = 0
                AsyncStorage.getItem('proyekList').then((value) => {
                    AsyncStorage.getItem('quantity').then((valueQty) => {
                        AsyncStorage.getItem('price').then((valuePrice) => {

                            if (value == '[]' || value == '') {
                                this.setState({
                                    dataListMenu: [],
                                })
                            } else {
                                var data = (value.replace(/"{/g, '{').replace(/}"/g, '}'))
                                data = data.replace(/\\/g, "")
                                this.setState({
                                    dataListMenu: JSON.parse(data),
                                    // dataPrice:JSON.parse(data['price']),
                                    qty: JSON.parse(valueQty),
                                    priceSatuan: JSON.parse(valuePrice)
                                })
                                for (i = 0; i < JSON.parse(valueQty).length; i++) {
                                    // alert(i)
                                    totalBayar += JSON.parse(valuePrice)[i] * JSON.parse(valueQty)[i]
                                }
                                this.setState({
                                    totalPembayaran: totalBayar,
                                    kodeUnik: responseJson.unique_code,
                                    isLoading: false
                                    // totalBayarPlusUnik: parseInt(totalBayar) + parseInt(responseJson.unique_code),
                                })
                                AsyncStorage.setItem('totalPembayaran', '' + totalBayar)
                                AsyncStorage.setItem('kodeUnik', '' + responseJson.unique_code)

                            }
                        });
                    });
                });

            })

        // fetch('http://202.83.120.140/api/customer/optcustomer')
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         optionsWakif = responseJson;
        //         this.setState({
        //             optionsWakif: responseJson,
        //             isLoading: false
        //         })
        //     })

        // alert(this.state.dataPrice)
    }

    onWakifShow = (valueWakifName) => {
        if (valueWakifName.length < 3) {
            Alert.alert('Tidak Ditemukan', 'Masukkan minimal tiga karakter')
        } else {
            this.setState({
                isLoading: true
            })
            fetch('http://202.83.120.140/api/customer/optcustomer?keyword=' + valueWakifName)
                .then((response) => response.json())
                .then((responseJson) => {
                    optionsWakif = responseJson;
                    this.setState({
                        optionsWakif: responseJson,
                        isLoading: false
                    })
                    this.openModalListWakif()
                })

        }
    }

    onWakifSelect = (picked) => {
        var selected = picked.split('-');
        var idCust = selected[0];
        var nameCust = selected[1];
        fetch('http://202.83.120.140/api/customer/detail/' + idCust)
            .then((response) => response.json())
            .then((responseJson) => {
                var emailWakif = '';
                if (responseJson.email == null) {
                    emailWakif = 'null'
                } else {
                    emailWakif = responseJson.email
                }
                AsyncStorage.setItem('wakifEmail', emailWakif)
                AsyncStorage.setItem('wakifPhoneNumber', responseJson.mobile)
            })
        AsyncStorage.setItem('wakifName', nameCust)
        AsyncStorage.setItem('wakifID', idCust)
        this.setState({
            picked: picked,
            visibleModalListWakif: false,
            wakifId: idCust,
            wakifName: nameCust
        })
    }

    onWakifCancel = () => {
        this.setState({
            visibleModalListWakif: false
        });
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
                        <View style={{ width: widthDevice * 0.65, justifyContent: 'center', alignItems: 'center' }}><Title>Konfirmasi</Title></View>
                    </Body>
                    <Right />
                </Header>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>

                    <View>
                        <View style={{ marginTop: heightDevice * 0.02, justifyContent: 'center', alignItems: 'center' }}>
                            <Card transparent style={{ width: widthDevice * 0.9, height: heightDevice * 0.15, justifyContent: 'center', alignItems: 'center' }}>
                                <CardItem>
                                    <Body>

                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: widthDevice * 0.7, height: heightDevice * 0.1 }}>
                                                <Item>
                                                    {(this.state.wakifName.length != 0 ?
                                                            <TouchableOpacity onPress={() => {
                                                            this.setState({
                                                                wakifName: '',
                                                                wakifId:''
                                                            })
                                                        }}>
                                                            <Icon active name='ios-close-circle-outline' style={{ color: 'red' }} />
                                                        </TouchableOpacity>
                                                        : null)}
                                                    <Input
                                                        placeholder={'Cari data wakif'}
                                                        placeholderTextColor='grey'
                                                        value={this.state.wakifName}
                                                        onChangeText={(value) => {
                                                            this.setState({
                                                                wakifName: value
                                                            })
                                                        }}
                                                        editable={true}
                                                        style={{
                                                            color: 'black',
                                                            borderBottomWidth: 1,
                                                            borderBottomColor: '#e8e8e8'
                                                        }}
                                                    />
                                                </Item>
                                            </View>
                                            <View style={{ width: widthDevice * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => this.onWakifShow(this.state.wakifName)}>
                                                    <Icon name='ios-search' style={{ color: 'black' }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ width: widthDevice * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => this.openModalCreateWakif()}>
                                                    <Icon name='md-person-add' style={{ color: 'black' }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                        {(this.state.dataListMenu.length > 0) ?
                            this.state.dataListMenu.map((e, idx) => {
                                return (
                                    <View style={{ alignItems: 'center' }}>
                                        <Card transparent style={{ width: widthDevice * 0.9, height: heightDevice * 0.15 }}>
                                            <CardItem bordered>
                                                <Body>
                                                    <View style={{ flexDirection: 'row', width: widthDevice * 0.8, height: heightDevice * 0.12 }}>
                                                        <View style={{ width: widthDevice * 0.8, height: heightDevice * 0.12, backgroundColor: 'white', flexDirection: 'row', }}>
                                                            <View style={{ width: widthDevice * 0.2, height: heightDevice * 0.1, backgroundColor: 'white' }}>
                                                                <Image style={{
                                                                    height: heightDevice * 0.1, width: widthDevice * 0.2
                                                                }}
                                                                    resizeMode='stretch'
                                                                    source={{ uri: e.image }}
                                                                />
                                                            </View>
                                                            <View style={{ width: widthDevice * 0.6, left: 10, height: heightDevice * 0.1, backgroundColor: 'white' }}>
                                                                <Text numberOfLines={2} style={{ fontSize: 14, color: 'grey' }}>{e.name}</Text>
                                                                <Text style={{ fontSize: 14, color: 'grey' }}>{this.state.qty[idx]} unit</Text>
                                                                <Text style={{ fontSize: 14, color: 'grey' }}>Rp {this.currencyFormat(parseInt(this.state.priceSatuan[idx]))}</Text>
                                                                {/* <Text style={{ fontSize: 14, color: 'green' }}>Quantity : {numbers.reduce(getSum, 0)}</Text> */}
                                                            </View>
                                                        </View>
                                                    </View>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </View>
                                )
                            }) :
                            <View style={{ height: heightDevice * 0.6, width: widthDevice, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='hands-helping' style={{ color: '#f49842', fontSize: 72 }} />
                                <Text style={{ color: '#f49842', fontSize: 18 }}>Komitmen Anda kosong</Text>
                            </View>
                        }

                        {/* <View style={{ alignItems: 'center' }}>
                            <Card style={{ width: widthDevice * 0.9, height: heightDevice * 0.2, marginTop: heightDevice * 0.02, justifyContent: 'center' }}>
                                <CardItem>
                                    <Body>
                                        <View style={{ height: heightDevice * 0.15, flexDirection: 'column', width: widthDevice * 0.8, backgroundColor: 'white' }}>
                                            <View style={{ width: widthDevice * 0.8, height: heightDevice * 0.05, justifyContent: 'center', alignItems: 'flex-start', padding: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 1 }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Ringkasan</Text>
                                            </View>
                                            <View style={{ width: widthDevice * 0.8, height: heightDevice * 0.1, padding: 10 }}>
                                                <View style={{ width: widthDevice * 0.8, height: heightDevice * 0.05, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{ width: widthDevice * 0.4, height: heightDevice * 0.05 }}>
                                                        <Text style={{ fontSize: 18 }}>Sub Total</Text>
                                                    </View>
                                                    <View style={{ width: widthDevice * 0.4, height: heightDevice * 0.05 }}>
                                                        <Text style={{ fontSize: 18, textAlign: 'right' }}>Rp {this.currencyFormat(parseInt(totalBayar))}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View> */}
                    </View>
                </ScrollView>

                <TouchableOpacity onPress={() => {
                    if (this.state.wakifId == '') {
                        Alert.alert('', 'Mohon pilih wakif terlebih dahulu')
                    } else {
                        // alert(this.state.wakifName)
                        Actions.Pembayaran()
                    }
                }}>
                    <View style={{ height: heightDevice * 0.07, flexDirection: 'row', width: widthDevice, backgroundColor: '#92e552' }}>
                        <View style={{ width: widthDevice * 0.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ color: '#fff', fontSize: 18, left: widthDevice * 0.1 }}>Total Donasi</Text>
                        </View>
                        <View style={{ width: widthDevice * 0.5, justifyContent: 'center', alignItems: 'flex-end', height: heightDevice * 0.07 }}>
                            <Text style={{ color: '#fff', fontSize: 18, right: widthDevice * 0.08 }}>Rp {this.currencyFormat(parseInt(this.state.totalPembayaran))}</Text>
                        </View>
                    </View>
                </TouchableOpacity>


                {/* <ModalFilterPicker
                    visible={this.state.visibleModal}
                    onSelect={this.onWakifSelect}
                    onCancel={this.onWakifCancel}
                    options={this.state.optionsWakif}
                    placeholderText={'Search'}
                    cancelButtonText={'Cancel'}
                /> */}
                <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.visibleCreate}
                    style={{ position: 'absolute' }}
                    onRequestClose={() => {
                        this.setState({
                            visibleCreate: false,
                            newWakifPhone: '',
                            wakifName: '',
                            wakifId:'',
                            newWakifEmail: ''
                        })
                        Actions.refresh;
                    }}
                >
                    <Container>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ flex: 1 }}>
                                <ScrollView>
                                    <View style={{ height: heightDevice * 0.4, width: widthDevice, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={styles.imageUser}>
                                            <Icon name='ios-person' style={{ textAlign: 'center', fontSize: 100, color: 'grey' }} />
                                        </View>
                                    </View>
                                    <View style={{ height: heightDevice * 0.4, width: widthDevice, flexDirection: 'column', marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                                        <View style={{ width: widthDevice * 0.9 }}>
                                            <FloatingLabel
                                                labelStyle={styles.labelInput}
                                                inputStyle={styles.input}
                                                style={styles.formInput}
                                                onChangeText={(value) => {
                                                    this.setState({
                                                        newWakifPhone: value
                                                    })
                                                }}
                                                value={this.state.newWakifPhone}
                                                onBlur={this.onBlur}
                                            >No.Handphone</FloatingLabel>
                                        </View>
                                        <View style={{ width: widthDevice * 0.9 }}>
                                            <FloatingLabel
                                                labelStyle={styles.labelInput}
                                                inputStyle={styles.input}
                                                style={styles.formInput}
                                                onChangeText={(value) => {
                                                    this.setState({
                                                        wakifName: value
                                                    })
                                                }}
                                                value={this.state.wakifName}
                                                onBlur={this.onBlur}
                                            >Nama</FloatingLabel>
                                        </View>
                                        <View style={{ width: widthDevice * 0.9 }}>
                                            <FloatingLabel
                                                labelStyle={styles.labelInput}
                                                inputStyle={styles.input}
                                                style={styles.formInput}
                                                onChangeText={(value) => {
                                                    this.setState({
                                                        newWakifEmail: value
                                                    })
                                                }}
                                                value={this.state.newWakifEmail}
                                                onBlur={this.onBlur}
                                            >Email</FloatingLabel>
                                        </View>
                                    </View>

                                    <View style={{ height: heightDevice * 0.1, width: widthDevice, flexDirection: 'column' }}>
                                        <TouchableOpacity onPress={() => this.saveNewWakif()}>
                                            <View style={{ height: heightDevice * 0.1, width: widthDevice, backgroundColor: '#70A071', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: 'white', fontSize: 16 }}>Simpan</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ width: widthDevice, flexDirection: 'row', backgroundColor: 'transparent', height: heightDevice * 0.08, top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableWithoutFeedback onPress={() => {
                                            this.setState({
                                                visibleCreate: false,
                                                newWakifPhone: '',
                                                wakifName: '',
                                                wakifId:'',
                                                newWakifEmail: ''
                                            })
                                            Actions.refresh;
                                        }}>
                                            <View style={{ width: widthDevice * 0.1, flexDirection: 'row', backgroundColor: 'transparent', height: heightDevice * 0.079, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <Icon name='ios-close' style={{ color: 'black', marginLeft: 20 }} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <View style={{ width: widthDevice * 0.89, }} />
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </Container>
                </Modal>


                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.visibleModalListWakif}
                    style={{ position: 'absolute' }}
                    onRequestClose={() => {
                        this.setState({
                            visibleModalListWakif: false,
                        })
                        Actions.refresh;
                    }}
                >
                    <Container>
                        <Header androidStatusBarColor='black' style={{ backgroundColor: '#bcc5d1' }}>
                            <Left><View style={{ width: widthDevice * 0.2 }}><Text style={{ color: 'white', fontSize: 14, marginLeft: 10 }}>{this.state.optionsWakif.length + ' data'}</Text></View></Left>
                            <Body>
                                <View style={{ width: widthDevice * 0.65, justifyContent: 'center', alignItems: 'center' }}><Title>Pilih Wakif</Title></View>
                            </Body>
                            <Right >
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        visibleModalListWakif: false
                                    })
                                }}><Text style={{ color: 'white', marginRight: 10, fontSize: 16 }}>close</Text></TouchableOpacity>
                            </Right>
                        </Header>
                        <View style={{ flex: 1 }}>
                            <ScrollView>
                                {(this.state.optionsWakif.length > 0) ?
                                    this.state.optionsWakif.map((e, idx) => {
                                        return (
                                            <List>
                                                <ListItem onPress={() => {
                                                    this.onWakifSelect(e.key);
                                                }}>
                                                    <Left>
                                                        <Text>{e.label}</Text>
                                                    </Left>
                                                    <Right>
                                                        <Icon name="arrow-forward" />
                                                    </Right>
                                                </ListItem>
                                            </List>
                                        )
                                    }) :
                                    <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center' }}><Text >Data tidak ditemukan</Text></View>
                                }

                            </ScrollView>
                        </View>
                    </Container>
                </Modal>
            </Container>
        );
    }
}

var { height, width } = Dimensions.get('screen');
var widthDevice = width;
var heightDevice = height;

const styles = StyleSheet.create({
    labelInput: {
        color: 'black',
        fontSize: 12,
    },
    formInput: {
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
    },
    input: {
        borderWidth: 0,
        color: 'black',
        height: 50,
        fontSize: 14,
    },
    imageUser: {
        width: heightDevice * 0.15,
        height: heightDevice * 0.15,
        marginTop: heightDevice * 0.02,
        marginLeft: widthDevice * 0.02,
        marginBottom: 10,
        alignContent: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#e8e8e8',
        borderRadius: 100
    },
    labelInput: {
        color: 'grey',
        fontSize: 14,
    },
    formInput: {
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    input: {
        borderWidth: 0,
        color: 'black',
        height: 50,
        fontSize: 16,
    }
});
