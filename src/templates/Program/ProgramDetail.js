/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Card, CardItem, Container, Header, Left, Body, Right, Button, Icon, Title, Content, Drawer } from 'native-base';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, ProgressBarAndroid, Modal, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, BackHandler, AsyncStorage, StyleSheet, Text, View, Image, ImageBackground, ListView, Alert, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NumericInput from 'react-native-numeric-input';
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import HTMLView from 'react-native-htmlview';

// import {Icon} from 'react-native-vector-icons';

export default class ProgramDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueCreate: 0,
            dataListProyek: [],
            isLoading: true,
            visibleDetail: false
        }
    }

    handleBackButton() {
        Actions.Home({ 'direction': 'leftToRight' });
        currentPage = 'Home'
        return true;
    }

    addToCart(val) {
        Alert.alert('', 'Tambahkan ke Komitmen?',
            [
                { text: 'Tidak', style: 'cancel' },
                {
                    text: 'Ya', onPress: () => {
                        this.setState({
                            visibleDetail: false
                        })
                        Actions.refresh;
                        const projectToBeSaved = JSON.stringify(this.state.dataListProyek[val])
                        AsyncStorage.getItem('proyekList').then((value) => {
                            let newProject = JSON.parse(value);
                            if (newProject == null || newProject == undefined || newProject == 'null') {
                                newProject = []
                            }
                            newProject.push(projectToBeSaved)
                            AsyncStorage.setItem('proyekList', JSON.stringify(newProject)).then(() => {
                                Toast.show('Berhasil menambahkan ke Komitmen', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: false });
                            })
                                .catch(() => {
                                    Toast.show('Gagal menambahkan ke keranjang', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: false });
                                })
                        }).then(() => {
                            AsyncStorage.getItem('proyekList').then((value1) => {
                                var jmlkrjg = JSON.parse(value1).length;
                                AsyncStorage.setItem('jumlahKeranjang', '' + jmlkrjg)
                                this.setState({
                                    jumlahKeranjang: jmlkrjg
                                })
                            })
                        })
                    }
                },
            ]
        )
    }

    toProyekDetail(val, valName, valIdx, valDesc) {
        this.setState({
            visibleDetail: true,
            imageProject:
                <Image style={{
                    height: heightDevice * 0.35, width: widthDevice,
                    backgroundColor: '#e8e8e8'
                }}
                    resizeMode='contain'
                    source={{ uri: val }}
                >
                </Image>,
            nameProject: valName,
            deskripsiKegiatan: valDesc,
            buttonKeranjang:
                <TouchableOpacity onPress={() => this.addToCart(valIdx)}>
                    <View style={{ width: widthDevice, backgroundColor: '#92e552', height: heightDevice * 0.08, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Tambah ke Komitmen</Text>
                    </View>
                </TouchableOpacity>
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.handleBackButton();
            return true;
        });
        AsyncStorage.getItem('ImageProgram').then((valueImage) => {
            AsyncStorage.getItem('idProgram').then((valueID) => {
                AsyncStorage.getItem('namaProgram').then((valueNama) => {
                    AsyncStorage.getItem('deskripsiProgram').then((valueDesc) => {
                        AsyncStorage.getItem('jumlahKeranjang').then((valueJmlKeranjang) => {
                            fetch('http://202.83.120.140/api/product-json?id_program=' + valueID)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    this.setState({
                                        dataListProyek: responseJson.data,
                                        imageProgram:
                                            <ImageBackground style={{
                                                height: heightDevice * 0.35, width: widthDevice
                                            }}
                                                resizeMode='contain'
                                                source={{ uri: valueImage }}
                                            >
                                            </ImageBackground>,
                                        namaProgram: valueNama,
                                        deskripsiProgram: valueDesc,
                                        headerProyek:
                                            <View style={styles.titleProgramKegiatan}>
                                                <View style={{ width: widthDevice * 0.6, justifyContent: 'center' }}>
                                                    <Text style={styles.headerAllProgram}>Kegiatan-Kegiatan</Text>
                                                </View>
                                            </View>,
                                        jumlahKeranjang: (valueJmlKeranjang != undefined) ? valueJmlKeranjang : 0,
                                        isLoading: false
                                    });
                                });
                        });
                    });
                });
            });
        });

    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor='black' style={{ backgroundColor: '#0EC48F' }}>
                    <Left>
                        <Button transparent onPress={() => this.handleBackButton()}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <View style={{ width: widthDevice * 0.65, justifyContent: 'center', alignItems: 'center' }}><Title></Title></View>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => {
                            AsyncStorage.setItem('prevPage', 'programDetail')
                            Actions.Keranjang()
                        }}>
                            <View style={{ width: heightDevice * 0.2, alignItems: 'flex-end' }}>
                                {/* <Icon name='hands-helping' style={{ textAlign: 'center', fontSize: 28, color: 'white', right: 10 }} /> */}
                                <Image
                                    style={{
                                        width: widthDevice * 0.1, height: widthDevice * 0.065
                                    }}
                                    source={require('./../../../images/donate-2.png')}
                                />
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: heightDevice * 0.025, flexDirection: 'row', backgroundColor: '#f47d42', height: heightDevice * 0.025, borderRadius: 100, left: widthDevice * 0.333, top: 10, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                AsyncStorage.setItem('prevPage', 'programDetail')
                                Actions.Keranjang()
                            }}>
                                <Text style={{ color: 'white', fontSize: 10 }}>{this.state.jumlahKeranjang}</Text>
                            </TouchableOpacity>
                        </View>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 7, width: widthDevice }}>
                            {this.state.imageProgram}

                            <View style={{ width: widthDevice }}>
                                <Text style={{ fontSize: 18, marginTop: 10, marginLeft: 10 }}>{this.state.namaProgram}</Text>
                                {/* <Text numberOfLines={4} style={{ fontSize: 12, marginLeft: 10, marginTop: 15, lineHeight: 20, color: 'grey' }}>{this.state.deskripsiProgram}</Text> */}
                                {(this.state.deskripsiProgram == undefined) ? null : <HTMLView style={{ paddingLeft: 10, marginTop: 10 }} value={this.state.deskripsiProgram} />}
                            </View>
                        </View>

                        <View style={{ flex: 3, width: widthDevice }}>
                            {this.state.headerProyek}
                            <View style={styles.allKegiatan}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                                    {(this.state.dataListProyek.length > 0) ?
                                        this.state.dataListProyek.map((e, idx) => {
                                            return (
                                                // <View style={{ height: heightDevice * 0.1, width: widthDevice * 0.95, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8', flexDirection: 'row' }}>
                                                //     <TouchableWithoutFeedback onPress={() => this.toProyekDetail('1')}>
                                                //         <View style={{ height: heightDevice * 0.08, width: widthDevice * 0.25, marginLeft: widthDevice * 0.025, marginTop: heightDevice * 0.01 }}>
                                                //             <Image
                                                //                 style={{
                                                //                     height: heightDevice * 0.08, width: widthDevice * 0.25,
                                                //                     resizeMode: 'contain'
                                                //                 }}
                                                //                 source={{ uri: e.image }}
                                                //             />
                                                //         </View>
                                                //     </TouchableWithoutFeedback>
                                                //     <TouchableWithoutFeedback onPress={() => this.toProyekDetail(e.image, e.name)}>
                                                //         <View style={{ height: heightDevice * 0.08, width: widthDevice * 0.5, marginLeft: widthDevice * 0.025, marginTop: heightDevice * 0.01 }}>
                                                //             <Text style={{ fontSize: 12, color: 'black' }}>{e.name}</Text>
                                                //         </View>
                                                //     </TouchableWithoutFeedback>

                                                //     <View style={{ height: heightDevice * 0.1, width: widthDevice * 0.2, justifyContent: 'center', alignItems: 'center', left: 10 }}>
                                                //         <Button transparent onPress={() => this.addToCart(idx)}>
                                                //             <Icon name='hands-helping' style={{ color: '#70A071', fontSize: 32 }} />
                                                //         </Button>
                                                //     </View>

                                                // </View>
                                                <View style={styles.listKegiatan}>
                                                    <TouchableWithoutFeedback onPress={() => this.toProyekDetail(e.image, e.name, idx, e.description)}>
                                                        <ImageBackground
                                                            style={styles.imageKegiatan}
                                                            imageStyle={{ borderRadius: 10 }}
                                                            source={{ uri: e.image }}
                                                        >
                                                            <Text numberOfLines={2} style={{ marginTop: heightDevice * 0.13, marginLeft: 10, marginRight: 10, fontSize: 12, color: 'white' }}>
                                                                {e.name}
                                                            </Text>
                                                        </ImageBackground>
                                                    </TouchableWithoutFeedback>
                                                    {/* <View style={{ backgroundColor: 'white', height: heightDevice * 0.1 }}>
                                                        <ProgressBarAndroid
                                                            styleAttr="Horizontal"
                                                            indeterminate={false}
                                                            progress={0.5}
                                                        />
                                                        <View style={{ width: widthDevice * 0.7, flexDirection: 'row' }}>
                                                            <View style={{ width: widthDevice * 0.4 }}>
                                                                <Text style={{ fontSize: 10 }}>{e.terhimpun}</Text>
                                                            </View>
                                                            <View style={{ width: widthDevice * 0.3 }}>
                                                                <Text style={{ fontSize: 10, textAlign: 'center' }}>{e.target}</Text>
                                                            </View>
                                                        </View>
                                                    </View> */}
                                                </View>
                                            )
                                        }) : null
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </View>

                    {/* <View style={{ width: widthDevice * 0.2, marginLeft: widthDevice * 0.8, flexDirection: 'row', marginTop: heightDevice * 0.02, height: heightDevice * 0.05, justifyContent: 'center', alignContent: 'center', position: 'absolute' }}>
                        <View style={{ width: widthDevice * 0.1 }}>
                            <TouchableOpacity onPress={() => {
                                AsyncStorage.setItem('prevPage', 'programDetail')
                                Actions.Keranjang()
                            }}>
                                <Image
                                    style={{
                                        width: widthDevice * 0.06, height:widthDevice * 0.06
                                    }}
                                    source={require('./../../../images/donate-2.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: widthDevice * 0.1 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    AsyncStorage.setItem('prevPage', 'programDetail')
                                    Actions.Pengaturan()
                                }}>
                                <Icon name='md-more' style={{ textAlign: 'center', fontSize: 28, color: 'white', right: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </View> */}

                    {/* <View style={{ width: widthDevice * 0.1, flexDirection: 'row', backgroundColor: 'transparent', height: heightDevice * 0.08, top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => this.handleBackButton()}>
                            <View style={{ width: widthDevice * 0.1, flexDirection: 'row', backgroundColor: 'transparent', height: heightDevice * 0.079, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Icon name='ios-arrow-back' style={{ color: 'white', fontSize: 28, marginLeft: 20 }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View> */}

                    {/* {(this.state.isLoading == false && this.state.jumlahKeranjang != '0') ?
                        <TouchableWithoutFeedback onPress={() => {
                            AsyncStorage.setItem('prevPage', 'programDetail')
                            Actions.Keranjang()
                        }}>
                            <View style={{ width: heightDevice * 0.025, flexDirection: 'row', backgroundColor: '#f47d42', height: heightDevice * 0.025, borderRadius: 100, left: widthDevice * 0.9, top: heightDevice * 0.036, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 10 }}>{this.state.jumlahKeranjang}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        : null} */}

                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.visibleDetail}
                        style={{ position: 'absolute' }}
                        onRequestClose={() => {
                            this.setState({
                                visibleDetail: false
                            })
                            Actions.refresh;
                        }}
                    >
                        <Container>
                            <ScrollView>
                                <View style={{ height: heightDevice * 1.1, width: widthDevice }}>
                                    {this.state.imageProject}

                                    <View style={{ width: widthDevice }}>
                                        <Text style={{ fontSize: 18, margin: 5, textAlign: 'left' }}>{this.state.nameProject}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: widthDevice, marginTop: 10, height: heightDevice }}>
                                        <View style={{ width: widthDevice * 0.025 }} />
                                        <View style={{ width: widthDevice * 0.95 }}>
                                            <HTMLView style={{ padding: 5 }} value={this.state.deskripsiKegiatan} />
                                            {/* <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>{this.state.deskripsiKegiatan}</Text> */}
                                        </View>
                                    </View>
                                </View>


                            </ScrollView>

                            {this.state.buttonKeranjang}

                            <View style={{ width: widthDevice, flexDirection: 'row', backgroundColor: 'transparent', height: heightDevice * 0.08, top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.setState({
                                        visibleDetail: false,
                                    })
                                    Actions.refresh;
                                }}>
                                    <View style={{ width: widthDevice * 0.1, left: widthDevice * 0.85, flexDirection: 'row', backgroundColor: 'transparent', height: heightDevice * 0.079, justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Icon name='ios-close' style={{ color: 'white', fontSize: 28, marginLeft: 20 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{ width: widthDevice * 0.89, }} />
                            </View>
                        </Container>
                    </Modal>
                    <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                </ScrollView>
            </Container>
        );
    }
}

var { height, width } = Dimensions.get('screen');
var widthDevice = width;
var heightDevice = height;

const styles = StyleSheet.create({

    titleProgramKegiatan: {
        flexDirection: 'row',
        height: heightDevice * 0.08,
        width: widthDevice * 0.95,
        marginTop: widthDevice * 0.05,
        marginLeft: widthDevice * 0.025,
        marginRight: widthDevice * 0.025,
        marginBottom: widthDevice * 0.005,
        backgroundColor: '#f9f9f9',
    },

    headerAllProgram: {
        fontSize: 14,
        fontFamily: 'Zocial',
        color: 'black',
        fontWeight: 'bold',
    },

    listKegiatan: {
        alignContent: 'center',
        height: heightDevice * 0.2,
        width: heightDevice * 0.2,
        margin: widthDevice * 0.025,
        justifyContent: 'center',
        backgroundColor: '#e8e8e8',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10
    },

    imageKegiatan: {
        height: heightDevice * 0.2, width: heightDevice * 0.2,
        resizeMode: 'stretch',
        borderRadius: 10
    },

    allKegiatan: {
        height: heightDevice * 0.3,
        //flex: 2,
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
});
