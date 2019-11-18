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
import RNFetchBlob from 'react-native-fetch-blob';
import HTMLView from 'react-native-htmlview';


var dataBelanja = [];
var dformat = '';
var uniqueCode;
var pricePay;


export default class PembayaranFinnet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueCreate: 0,
            dataListMenu: [],
            selectAll: false
        }
    }

    handleBackButton() {
        Actions.Pembayaran({ 'direction': 'leftToRight' });
        currentPage = 'Pembayaran'
        return true;
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }

    saveData() {
        var no_transaksi = Math.floor(100000000000 + Math.random() * 900000000000)

        this.setState({
            isLoading: true
        })

        var databayar = (this.state.dataProdukPembayaran.replace(/"{/g, '{').replace(/}"/g, '}'))
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

        var merMerchant = this.state.wakifName.toUpperCase() + '%' + pricePay + '%' + this.state.wakifEmail.toUpperCase() + '%'
            + this.state.agenKode.toUpperCase() + '%' + this.state.wakifMobile + '%' + this.state.namaUser.toUpperCase() + '%'
            + no_transaksi + '%' + 'BWA2209' + '%' + 'HTTPS://WAKAFQURAN.ORG' + '%' + 'FINPAY021' + '%' + 'PAY' + '%7200%' + dformat + '%102BWKFA195'

        var merMerchantCheck = this.state.wakifName.toUpperCase() + '%' + pricePay + '%' + this.state.wakifEmail.toUpperCase() + '%'
            + this.state.agenKode.toUpperCase() + '%' + this.state.wakifMobile + '%' + this.state.namaUser.toUpperCase() + '%'
            + no_transaksi + '%' + 'BWA2209' + '%' + 'HTTPS://WAKAFQURAN.ORG' + '%' + 'FINPAY021' + '%' + 'CHECK' + '%7200%' + dformat + '%102BWKFA195'



        sha256(merMerchant).then(shaMerchant => {
            var merchantSign = shaMerchant.toUpperCase()
            var paramPay = JSON.stringify({
                add_info1: this.state.wakifName,
                amount: pricePay,
                cust_email: this.state.wakifEmail,
                cust_id: this.state.agenKode,
                cust_msisdn: this.state.wakifMobile,
                cust_name: this.state.namaUser,
                invoice: no_transaksi,
                mer_signature: merchantSign,
                merchant_id: "BWA2209",
                return_url: "https://wakafquran.org",
                sof_id: "finpay021",
                sof_type: "pay",
                timeout: 7200,
                trans_date: dformat
            })
            RNFetchBlob.config({ trusty: true }).fetch('POST', "https://billhosting.finnet-indonesia.com/prepaidsystem/api/apiFinpay.php", {
                'Content-Type': 'application/json'
            }, paramPay
            ).then((response) => response.json())
                .then((responseJson2) => {
                    sha256(merMerchantCheck).then(shaMerchantCheck => {
                        var merchantSignCheck = shaMerchantCheck.toUpperCase()
                        var paramCheck = JSON.stringify({
                            add_info1: this.state.wakifName,
                            amount: pricePay,
                            cust_email: this.state.wakifEmail,
                            cust_id: this.state.agenKode,
                            cust_msisdn: this.state.wakifMobile,
                            cust_name: this.state.namaUser,
                            invoice: no_transaksi,
                            mer_signature: merchantSignCheck,
                            merchant_id: "BWA2209",
                            return_url: "https://wakafquran.org",
                            sof_id: "finpay021",
                            sof_type: "check",
                            timeout: 7200,
                            trans_date: dformat
                        })
                        // this.setState({
                        //     isLoading: false
                        // })
                        // alert(responseJson2.payment_code)
                        // console.error(JSON.stringify({
                        //     unique_code: this.state.kodeUnik,
                        //     company: this.state.companyID,
                        //     customer: this.state.agenKode,
                        //     agen: this.state.agenID,
                        //     description: "tes",
                        //     products: databayar,
                        //     payment_type: 'TB',
                        //     reference: responseJson2.payment_code,
                        //     bank: this.state.bankID,
                        //     api_pay: "https://billhosting.finnet-indonesia.com/prepaidsystem/api/apiFinpay.php" + "|" + paramPay,
                        //     api_check: "https://billhosting.finnet-indonesia.com/prepaidsystem/api/apiFinpay.php" + "|" + paramCheck
                        // }))

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
                                payment_type: 'TB',
                                reference: responseJson2.payment_code,
                                bank: this.state.bankID,
                                api_pay: "https://billhosting.finnet-indonesia.com/prepaidsystem/api/apiFinpay.php" + "|" + paramPay,
                                api_check: "https://billhosting.finnet-indonesia.com/prepaidsystem/api/apiFinpay.php" + "|" + paramCheck
                            })
                        })
                            .then((response) => response.json())
                            .then((responseJson1) => {
                                this.setState({
                                    isLoading: false
                                })
                                if (responseJson1.status == true) {
                                    Alert.alert('Berhasil', 'Transaksi berhasil dengan kode pembayaran: ' + responseJson2.payment_code,
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
                                }
                            })
                    })
                })
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.handleBackButton();
            return true;
        });

        AsyncStorage.getItem('company').then((valueCompany) => {
            AsyncStorage.getItem('agen').then((valueAgen) => {
                AsyncStorage.getItem('totalPembayaran').then((value) => {
                    AsyncStorage.getItem('proyekList').then((valueProject) => {
                        AsyncStorage.getItem('wakifID').then((valueWakif) => {
                            AsyncStorage.getItem('wakifName').then((valueWakifName) => {
                                AsyncStorage.getItem('wakifEmail').then((valueWakifEmail) => {
                                    AsyncStorage.getItem('wakifPhoneNumber').then((valueWakiMobile) => {
                                        AsyncStorage.getItem('userId').then((valueAgentID) => {
                                            AsyncStorage.getItem('quantity').then((valueQty) => {
                                                AsyncStorage.getItem('price').then((valuePrice) => {
                                                    AsyncStorage.getItem('namaUser').then((valueName) => {
                                                        AsyncStorage.getItem('kodeUnik').then((valueKodeUnik) => {
                                                            AsyncStorage.getItem('bankIDPembayaran').then((valueBankID) => {
                                                                AsyncStorage.getItem('bankImagePembayaran').then((valueBankImage) => {
                                                                    AsyncStorage.getItem('bankNamePembayaran').then((valueBankName) => {
                                                                        AsyncStorage.getItem('bankAccountPembayaran').then((valueBankAccount) => {
                                                                            AsyncStorage.getItem('bankAccountDeskripsi').then((valueBankDeskripsi) => {
                                                                                var data = (valueProject.replace(/"{/g, '{').replace(/}"/g, '}'))
                                                                                data = data.replace(/\\/g, "")
                                                                                var dataProduk = []
                                                                                dataBelanja = JSON.parse(data);
                                                                                for (i = 0; i < JSON.parse(valueQty).length; i++) {
                                                                                    dataProduk.push({ "product": dataBelanja[i].id, "qty": String(JSON.parse(valueQty)[i]), "price": String(JSON.parse(valuePrice)[i]) })
                                                                                }

                                                                                pricePay = parseInt(value) + parseInt(valueKodeUnik) - 2500
                                                                                this.setState({
                                                                                    price: parseInt(value) + parseInt(valueKodeUnik),
                                                                                    // price: parseInt(value),
                                                                                    kodeUnik: valueKodeUnik,
                                                                                    companyID: valueCompany,
                                                                                    agenKode: valueAgentID,
                                                                                    agenID: valueAgen,
                                                                                    wakifID: valueWakif,
                                                                                    wakifName: valueWakifName,
                                                                                    wakifEmail: valueWakifEmail,
                                                                                    wakifMobile: valueWakiMobile,
                                                                                    namaUser: valueName,
                                                                                    dataProdukPembayaran: JSON.stringify(dataProduk),
                                                                                    bankImage: valueBankImage,
                                                                                    bankName: valueBankName,
                                                                                    bankAccount: valueBankAccount,
                                                                                    bankID: valueBankID,
                                                                                    dataDeskripsi: valueBankDeskripsi
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
                            <Card style={{ width: widthDevice * 0.9, height: heightDevice * 0.1, justifyContent: 'center' }}>
                                <CardItem>
                                    <Body>
                                        <Text style={{ fontSize: 16 }}>Total Tagihan</Text>
                                    </Body>
                                    <Right>
                                        <Text style={{ fontSize: 16 }}>Rp {this.currencyFormat(parseInt(this.state.price))}</Text>
                                    </Right>
                                </CardItem>
                            </Card>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Card style={{ width: widthDevice * 0.9, height: heightDevice * 0.6 }}>
                                <CardItem>
                                    <Body>
                                        <View style={{ flexDirection: 'row', width: widthDevice * 0.8, height: heightDevice * 0.12 }}>
                                            <View style={{ width: widthDevice * 0.8, height: heightDevice * 0.12, backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e8e8e8' }}>
                                                <View style={{ width: widthDevice * 0.2, height: heightDevice * 0.1, backgroundColor: 'white' }}>
                                                    <Image style={{
                                                        height: heightDevice * 0.1, width: widthDevice * 0.2
                                                    }}
                                                        resizeMode='contain'
                                                        source={{ uri: this.state.bankImage }}
                                                    />
                                                </View>
                                                <View style={{ width: widthDevice * 0.6, padding: 10, height: heightDevice * 0.1, backgroundColor: 'white' }}>
                                                    <View style={{ width: widthDevice * 0.6 }}>
                                                        <Text style={{ fontSize: 14 }}>{this.state.bankName}</Text>
                                                    </View>
                                                    <View style={{ width: widthDevice * 0.6, flexDirection: 'row', top: 10 }}>
                                                        <Text style={{ fontSize: 12, color: 'grey' }}>Badan Wakaf Al Quran</Text>
                                                    </View>
                                                    <View style={{ width: widthDevice * 0.6, flexDirection: 'row', top: 10 }}>
                                                        <Text style={{ fontSize: 12, color: 'grey', top: 10 }}>{this.state.bankAccount}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ height: heightDevice * 0.4, width: widthDevice * 0.8, backgroundColor: 'white' }}>
                                            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                                                {/* <View style={{ flexDirection: 'row', width: widthDevice * 0.8, backgroundColor: 'white' }}>
                                                <View style={{ width: widthDevice * 0.1, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                                                    <Icon name='ios-checkmark' />
                                                </View>
                                                <View style={{ width: widthDevice * 0.7, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                                                    <Text>Pembayaran dapat dilakukan melalui rekening yang terdaftar atas nama Badan Wakaf Al Quran.</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: widthDevice * 0.8, backgroundColor: 'white' }}>
                                                <View style={{ width: widthDevice * 0.1, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                                                    <Icon name='ios-checkmark' />
                                                </View>
                                                <View style={{ width: widthDevice * 0.7, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                                                    <Text>Pembayaran melalui bank transfer membutuhkan 3 angka terakhir sebagai kode Unik.</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: widthDevice * 0.8, backgroundColor: 'white' }}>
                                                <View style={{ width: widthDevice * 0.1, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                                                    <Icon name='ios-checkmark' />
                                                </View>
                                                <View style={{ width: widthDevice * 0.7, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                                                    <Text>Kode unik diperlukan untuk mempermudah pengenalan donasi Anda secara otomatis.</Text>
                                                </View>
                                            </View> */}
                                                <HTMLView style={{ padding: 12 }} value={this.state.dataDeskripsi} />
                                            </ScrollView>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.saveData()}>
                    <View style={{ height: heightDevice * 0.07, flexDirection: 'row', width: widthDevice, backgroundColor: '#92e552', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Bayar</Text>
                    </View>
                </TouchableOpacity>
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
