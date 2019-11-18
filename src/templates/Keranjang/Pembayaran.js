/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Container, CheckBox, ListItem, Header, Left, Body, Right, Button, Icon, Title, } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, BackHandler, AsyncStorage, StyleSheet, Text, View, Image, ListView, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
var FloatingLabel = require('react-native-floating-labels');
import Spinner from 'react-native-loading-spinner-overlay';
import { sha256 } from 'react-native-sha256';
import RNFetchBlob from 'react-native-fetch-blob'

var dataBelanja = [];
var dformat = '';
var uniqueCode;
var pricePay;
export default class Pembayaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueCreate: 0,
            dataListMenu: [],
            selectAll: false
        }
    }

    handleBackButton() {
        Actions.Checkout({ 'direction': 'leftToRight' });
        currentPage = 'Checkout'
        return true;
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }

    saveData() {
        this.setState({
            isLoading: true
        })
        var databayar = this.state.dataProdukPembayaran
        databayar = databayar.replace(/"{/g, '{').replace(/}"/g, '}')
        databayar = databayar.replace(/\\/g, "")

        databayar = JSON.parse(databayar)

        Number.prototype.padLeft = function (base, chr) {
            var len = (String(base || 10).length - String(this).length) + 1;
            return len > 0 ? new Array(len).join(chr || '0') + this : this;
        }

        var d = new Date;

        dformat = [d.getFullYear(),
        (d.getMonth() + 1).padLeft(),
        d.getDate().padLeft(),
        ].join('') +
            [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()].join('');

        var merMerchant = this.state.namaUser.toUpperCase() + '%' + pricePay + '%' + this.state.wakifEmail.toUpperCase() + '%'
            + this.state.agenKode.toUpperCase() + '%' + this.state.wakifMobile + '%' + this.state.namaUser.toUpperCase() + '%'
            + this.state.kodeUnik + '%' + 'BWA941' + '%' + 'HTTPS://WAKAFQURAN.ORG' + '%' + 'FINPAY021' + '%' + 'PAY' + '%7200%' + dformat + '%BWA2018'

        fetch("http://202.83.120.140/api/sales-order/create", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                unique_code: this.state.kodeUnik,
                company: this.state.companyID,
                customer: this.state.wakifID,
                agen: this.state.agenID,
                description: "tes",
                products: databayar,
                payment_type: 'SD',
                bank: '',
                reference: ''
            })
        })
            .then((response) => response.json())
            .then((responseJson1) => {
                this.setState({
                    isLoading: false
                })
                Alert.alert('', 'Selamat, Transaksi Anda Berhasil',
                    [
                        {
                            text: 'OK', onPress: () => {
                                AsyncStorage.setItem('proyekList', JSON.stringify([]))
                                    .then(() => {
                                        AsyncStorage.getItem('proyekList').then(() => {
                                            AsyncStorage.setItem('jumlahKeranjang', '' + 0)
                                        })
                                        Actions.Home();
                                        return true;
                                    })


                            }
                        }
                    ])
            })




    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.handleBackButton();
            return true;
        });

        fetch('http://202.83.120.140/api/bank')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataListMenu: responseJson
                })
            })

        AsyncStorage.getItem('company').then((valueCompany) => {
            AsyncStorage.getItem('agen').then((valueAgen) => {
                AsyncStorage.getItem('totalPembayaran').then((value) => {
                    AsyncStorage.getItem('proyekList').then((valueProject) => {
                        AsyncStorage.getItem('wakifName').then((valueWakifName) => {
                            AsyncStorage.getItem('wakifID').then((valueWakif) => {
                                AsyncStorage.getItem('wakifEmail').then((valueWakifEmail) => {
                                    AsyncStorage.getItem('wakifPhoneNumber').then((valueWakiMobile) => {
                                        AsyncStorage.getItem('userId').then((valueAgentID) => {
                                            AsyncStorage.getItem('quantity').then((valueQty) => {
                                                AsyncStorage.getItem('price').then((valuePrice) => {
                                                    AsyncStorage.getItem('namaUser').then((valueName) => {
                                                        AsyncStorage.getItem('kodeUnik').then((valueKodeUnik) => {
                                                            AsyncStorage.getItem('saldo').then((valueSaldo) => {
                                                                var data = (valueProject.replace(/"{/g, '{').replace(/}"/g, '}'))
                                                                data = data.replace(/\\/g, "")
                                                                var dataProduk = []
                                                                dataBelanja = JSON.parse(data);
                                                                for (i = 0; i < JSON.parse(valueQty).length; i++) {
                                                                    dataProduk.push({ "product": dataBelanja[i].id, "qty": String(JSON.parse(valueQty)[i]), "price": String(JSON.parse(valuePrice)[i]) })
                                                                }
                                                                pricePay = parseInt(value) + parseInt(valueKodeUnik) - 2500

                                                                this.setState({
                                                                    //price: parseInt(value) + parseInt(valueKodeUnik),
                                                                    price: parseInt(value),
                                                                    kodeUnik: valueKodeUnik,
                                                                    companyID: valueCompany,
                                                                    agenKode: valueAgentID,
                                                                    agenID: valueAgen,
                                                                    wakifID: valueWakif,
                                                                    wakifEmail: valueWakifEmail,
                                                                    wakifMobile: valueWakiMobile,
                                                                    wakifName: valueWakifName,
                                                                    namaUser: valueName,
                                                                    saldoSaatIni: valueSaldo,
                                                                    dataProdukPembayaran: JSON.stringify(dataProduk)
                                                                })
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        })
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
                        <View style={{ width: widthDevice * 0.65, justifyContent: 'center', alignItems: 'center' }}><Title>Pembayaran</Title></View>
                    </Body>
                    <Right />
                </Header>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>

                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Card transparent style={{ width: widthDevice, height: heightDevice * 0.1, justifyContent: 'center' }}>
                                <CardItem bordered>
                                    <Body>
                                        <Text style={{ fontSize: 14 }}>Total Donasi</Text>
                                    </Body>
                                    <Right>
                                        <Text style={{ fontSize: 14 }}>Rp {this.currencyFormat(parseInt(this.state.price))}</Text>
                                    </Right>
                                </CardItem>
                            </Card>
                        </View>
                        <View style={{ alignItems: 'center', top: 10 }}>
                            <View style={{ flexDirection: 'row', width: widthDevice * 0.9, height: heightDevice * 0.15 }}>
                                <View style={{ width: widthDevice * 0.9, height: heightDevice * 0.15, backgroundColor: 'white', flexDirection: 'row' }}>
                                    <View style={{ width: widthDevice * 0.7, height: heightDevice * 0.15, backgroundColor: 'white' }}>
                                        <View>
                                            <Text style={{ fontSize: 14 }}>Saldo</Text>
                                        </View>
                                        <View style={{ width: widthDevice * 0.7, flexDirection: 'row', left: widthDevice * 0.02, top: heightDevice * 0.01 }}>
                                            <View style={{ width: widthDevice * 0.3 }}>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>Saldo Saat Ini</Text>
                                            </View>
                                            <View style={{ width: widthDevice * 0.3 }}>
                                                <Text style={{ fontSize: 12, color: 'grey', textAlign: 'right' }}>Rp {this.currencyFormat(parseInt(this.state.saldoSaatIni))}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: widthDevice * 0.6, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey', left: widthDevice * 0.02, top: heightDevice * 0.015 }}>
                                            <View style={{ width: widthDevice * 0.3 }}>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>Saldo Terpakai</Text>
                                            </View>
                                            <View style={{ width: widthDevice * 0.3 }}>
                                                <Text style={{ fontSize: 12, color: 'grey', textAlign: 'right' }}>Rp {this.currencyFormat(parseInt(this.state.price))}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: widthDevice * 0.7, flexDirection: 'row', left: widthDevice * 0.02, top: heightDevice * 0.02 }}>
                                            <View style={{ width: widthDevice * 0.3 }}>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>Sisa Saldo</Text>
                                            </View>
                                            <View style={{ width: widthDevice * 0.3 }}>
                                                <Text style={{ fontSize: 12, color: 'grey', textAlign: 'right' }}>Rp {this.currencyFormat(parseInt(this.state.saldoSaatIni) - parseInt(this.state.price))}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: widthDevice * 0.2, padding: 10, height: heightDevice * 0.15, top: heightDevice * 0.03, backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            (parseInt(this.state.saldoSaatIni) - parseInt(this.state.price) <= 0) ? null : this.saveData();
                                        }}>
                                            <View style={{ width: widthDevice * 0.2, backgroundColor: (parseInt(this.state.saldoSaatIni) - parseInt(this.state.price) <= 0) ? 'grey' : '#92e552', justifyContent: 'center', alignItems: 'center', height: heightDevice * 0.05 }}>
                                                <Text style={{ color: 'white' }}>Donasi</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginLeft: widthDevice * 0.05, marginTop: widthDevice * 0.05 }}>
                            <Text style={{ fontSize: 14 }}>Bank Transfer</Text>
                        </View>

                        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                            {(this.state.dataListMenu.length > 0) ?
                                this.state.dataListMenu.map((e, idx) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            var imageBank = e.image;
                                            var nameBank = e.name;
                                            var accountBank = e.account_number;
                                            var desBank = e.description;
                                            var idBank = e.id;
                                            if (imageBank == null || imageBank == undefined) {
                                                imageBank = '';
                                            } else if (nameBank == null || nameBank == undefined) {
                                                nameBank = '';
                                            } else if (accountBank == null || accountBank == undefined) {
                                                accountBank = '';
                                            } else if (desBank == null || desBank == undefined) {
                                                desBank = '';
                                            } else if (idBank == null || idBank == undefined) {
                                                idBank = '';
                                            }
                                            AsyncStorage.setItem('bankImagePembayaran', '').then(() => {
                                                AsyncStorage.setItem('bankNamePembayaran', '').then(() => {
                                                    AsyncStorage.setItem('bankAccountPembayaran', '').then(() => {
                                                        AsyncStorage.setItem('bankAccountDeskripsi', '').then(() => {
                                                            AsyncStorage.setItem('bankIDPembayaran', '').then(() => {
                                                                AsyncStorage.setItem('bankImagePembayaran', imageBank)
                                                                AsyncStorage.setItem('bankNamePembayaran', nameBank)
                                                                AsyncStorage.setItem('bankAccountPembayaran', accountBank)
                                                                AsyncStorage.setItem('bankAccountDeskripsi', desBank)
                                                                AsyncStorage.setItem('bankIDPembayaran', idBank)
                                                                Actions.PembayaranFinnet();
                                                            })
                                                        })
                                                    })
                                                })
                                            })



                                        }}>
                                            <View style={{ alignItems: 'center', top: 15 }}>
                                                {/* <Card style={{ width: widthDevice * 0.9, height: heightDevice * 0.15 }}>
                                                    <CardItem>
                                                        <Body> */}
                                                <View style={{ flexDirection: 'row', width: widthDevice * 0.8, height: heightDevice * 0.12 }}>

                                                    <View style={{ width: widthDevice * 0.8, height: heightDevice * 0.12, backgroundColor: 'white', flexDirection: 'row', }}>
                                                        <View style={{ width: widthDevice * 0.2, height: heightDevice * 0.1, justifyContent: 'flex-start', backgroundColor: 'white' }}>
                                                            <Image style={{
                                                                height: heightDevice * 0.05, width: widthDevice * 0.2,

                                                                alignItems: 'flex-start',
                                                            }}
                                                                resizeMode='contain'
                                                                source={{ uri: e.image }}
                                                            />
                                                        </View>
                                                        <View style={{ width: widthDevice * 0.45, flexDirection: 'column', marginLeft: 10, height: heightDevice * 0.1, backgroundColor: 'white' }}>
                                                            <View style={{ width: widthDevice * 0.6 }}>
                                                                <Text numberOfLines={2} style={{ fontSize: 16 }}>{e.name}</Text>
                                                            </View>
                                                            <View style={{ width: widthDevice * 0.6, flexDirection: 'row', top: 10 }}>
                                                                <Text style={{ fontSize: 12, color: 'grey' }}>{e.account_name}</Text>
                                                            </View>
                                                            <View style={{ width: widthDevice * 0.6, flexDirection: 'row', top: 10 }}>
                                                                <Text style={{ fontSize: 12, color: 'grey' }}>{e.account_number}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ width: widthDevice * 0.15, flexDirection: 'column', marginLeft: 10, height: heightDevice * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Icon name='ios-arrow-forward' style={{ color: 'grey' }} />
                                                        </View>
                                                    </View>
                                                </View>
                                                {/* </Body>
                                                    </CardItem>
                                                </Card> */}
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }) :
                                null
                            }
                        </ScrollView>
                    </View>
                </ScrollView>
                <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    labelInput: {
        color: 'black',
        fontSize: 12,
    },
    formInput: {
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    input: {
        borderWidth: 0,
        color: 'black',
        height: 50,
        fontSize: 14,
    }
});
