/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Container, CheckBox, ListItem, Header, Left, Body, Right, Button, Icon, Title, } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, Picker, TouchableOpacity, BackHandler, AsyncStorage, StyleSheet, Text, View, Image, ListView, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-datepicker';


var dateString = Date().split(' ');
var day = dateString[2];
var month = dateString[1];
if (month == 'Jan') {
    var month = '01';
} else if (month == 'Feb') {
    var month = '02';
} else if (month == 'Mar') {
    var month = '03';
} else if (month == 'Apr') {
    var month = '04';
} else if (month == 'May') {
    var month = '05';
} else if (month == 'Jun') {
    var month = '06';
} else if (month == 'Jul') {
    var month = '07';
} else if (month == 'Aug') {
    var month = '08';
} else if (month == 'Sep') {
    var month = '09';
} else if (month == 'Oct') {
    var month = '10';
} else if (month == 'Nov') {
    var month = '11';
} else if (month == 'Dec') {
    var month = '12';
}
var year = dateString[3];
var dateNow = year + '/' + month + '/' + day;

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataListMenu: [],
            date: dateNow,
            dateEnd: dateNow,
            statusPembayaran: 'Lunas',
            isLoading: true
        }
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }

    handleBackButton() {
        AsyncStorage.getItem('prevPage').then((value) => {
            Actions.Home({ 'direction': 'leftToRight' });
            currentPage = 'Home'
        })

        return true;
    }

    searchHistory() {
        this.setState({
            isLoading: true
        })
        fetch("http://202.83.120.140/api/sales-order?user=" + this.state.userID + "&start_date=" + this.state.date + "&end_date=" + this.state.dateEnd + "&status=" + this.state.statusPembayaran)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataListMenu: responseJson.data,
                    grandTotal: responseJson.grand_total,
                    isLoading: false
                })
            })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.handleBackButton();
            return true;
        });


        AsyncStorage.getItem('userId').then((valueAgentID) => {
            fetch("http://202.83.120.140/api/sales-order?user=" + valueAgentID + "&start_date=" + this.state.date + "&end_date=" + this.state.dateEnd + "&status=" + this.state.statusPembayaran)
                .then((response) => response.json())
                .then((responseJson) => {

                    this.setState({
                        userID: valueAgentID,
                        dataListMenu: responseJson.data,
                        grandTotal: responseJson.grand_total,
                        isLoading: false
                    })
                })

            // fetch('http://202.83.120.140/api/sales-order/history/' + valueAgentID)
            //     .then((response) => response.json())
            //     .then((responseJson) => {
            //         // alert(JSON.stringify(responseJson.data))
            //         this.setState({
            //             dataListMenu: responseJson.data,
            //             isLoading: false
            //         })
            //     })
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
                        <View style={{ width: widthDevice * 0.65, justifyContent: 'center', alignItems: 'center' }}><Title>Donasi</Title></View>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>

                        <View style={{ flex: 3, width: widthDevice * 0.99, alignItems: 'center' }}>
                            {/* <Text style={{ fontSize: 16 }}>Periode</Text> */}
                            <View style={{ flexDirection: 'row', top: 5, bottom: 10 }}>
                                <View style={{ width: widthDevice * 0.49, left: 20 }}>
                                    <DatePicker
                                        style={{ width: 150 }}
                                        date={this.state.date}
                                        mode="date"
                                        placeholder='Pilih Tanggal'
                                        format="YYYY/MM/DD"
                                        minDate="1999/01/01"
                                        confirmBtnText="Ok"
                                        cancelBtnText='Batal'
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 36
                                            }
                                        }}
                                        onDateChange={(date) => { this.setState({ date: date }) }}
                                    />
                                </View>
                                <View style={{ width: 20, height: 40, justifyContent: 'center' }}><Text>s/d</Text></View>
                                <View style={{ width: widthDevice * 0.49, left: 20 }}>
                                    <DatePicker
                                        style={{ width: 150 }}
                                        date={this.state.dateEnd}
                                        mode="date"
                                        placeholder='Pilih Tanggal'
                                        format="YYYY/MM/DD"
                                        minDate="1999/01/01"
                                        confirmBtnText="OK"
                                        cancelBtnText='Batal'
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 36
                                            }
                                        }}
                                        onDateChange={(dateEnd) => { this.setState({ dateEnd: dateEnd }) }}
                                    />
                                </View>

                            </View>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e8e8e8', width: widthDevice * 0.9 }}>
                                <Picker
                                    selectedValue={this.state.statusPembayaran}
                                    style={{ width: widthDevice * 0.9, alignItems: 'center' }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ statusPembayaran: itemValue })
                                    }>
                                    <Picker.Item label="Lunas" value="Lunas" />
                                    <Picker.Item label="Belum Lunas" value="Belum Lunas" />
                                    <Picker.Item label="Expired" value="Expired" />
                                </Picker>
                            </View>

                            <TouchableOpacity onPress={() => this.searchHistory()}>
                                <View style={{ marginTop: 15, width: widthDevice * 0.9, height: heightDevice * 0.05, backgroundColor: '#039AE6', justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ color: 'white', fontSize: 16 }}>Cari</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 7 }}>
                            {(this.state.dataListMenu.length > 0) ?
                                this.state.dataListMenu.map((e, idx) => {
                                    return (
                                        <View style={{ alignItems: 'center' }}>
                                            <Card transparent style={{ width: widthDevice, height: heightDevice * 0.15 }}>
                                                <CardItem bordered>
                                                    <Body>
                                                        <View style={{ flexDirection: 'row', width: widthDevice * 0.8, height: heightDevice * 0.12 }}>
                                                            <View style={{ width: widthDevice, height: heightDevice * 0.12, backgroundColor: 'white', flexDirection: 'row', }}>
                                                                <View style={{ width: widthDevice * 0.2, borderWidth: 1, borderColor: 'grey', borderRadius: 100, height: widthDevice * 0.2, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Image style={{
                                                                        height: widthDevice * 0.1, width: widthDevice * 0.1,
                                                                        borderRadius: 100
                                                                    }}
                                                                        resizeMode='contain'
                                                                        source={{ uri: (e.picture == '' ? 'https://img.icons8.com/pastel-glyph/64/000000/gender-neutral-user.png' : e.picture) }}
                                                                    />
                                                                </View>
                                                                <View style={{ width: widthDevice * 0.75, flexDirection: 'column', marginLeft: 10, height: heightDevice * 0.1, backgroundColor: 'white' }}>
                                                                    <View style={{ width: widthDevice * 0.75 }}>
                                                                        <Text numberOfLines={2} style={{ fontSize: 16, lineHeight: 20 }}>{e.customer_name}</Text>
                                                                        <Text numberOfLines={2} style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>Kode Donasi {e.code}</Text>
                                                                        <Text numberOfLines={2} style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>Total Donasi Rp {this.currencyFormat(parseInt(e.total_price))}</Text>
                                                                    </View>
                                                                    <View style={{ width: widthDevice * 0.75, flexDirection: 'row', marginTop: 15 }}>
                                                                        <View style={{ width: widthDevice * 0.3525 }}>
                                                                            <Text numberOfLines={2} style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>{e.status}</Text>
                                                                        </View>
                                                                        <View style={{ width: widthDevice * 0.3525 }}>
                                                                            <Text numberOfLines={2} style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>{e.date}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </Body>
                                                </CardItem>
                                            </Card>
                                        </View>
                                    )
                                }) :
                                <View style={{ height: heightDevice * 0.8, width: widthDevice, alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <Icon name='md-sad' style={{ color: '#f49842', fontSize: 72 }} /> */}
                                    {/* <Text style={{ color: '#f49842', fontSize: 18 }}>Anda belum mempunyai riwayat donasi</Text> */}
                                </View>
                            }
                        </View>
                    </ScrollView>
                    <View style={{ height: heightDevice * 0.07, flexDirection: 'row', width: widthDevice, backgroundColor: '#92e552' }}>
                        <View style={{ width: widthDevice * 0.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ color: '#fff', fontSize: 18, left: widthDevice * 0.1 }}>Grand Total</Text>
                        </View>
                        <View style={{ width: widthDevice * 0.5, justifyContent: 'center', alignItems: 'flex-end', height: heightDevice * 0.07 }}>
                            <Text style={{ color: '#fff', fontSize: 18, right: widthDevice * 0.08 }}>Rp {this.currencyFormat(parseInt(this.state.grandTotal))}</Text>
                        </View>
                    </View>
                </View>
                <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
