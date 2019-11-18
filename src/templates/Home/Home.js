/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Container, Header, Left, Icon, Body, Right, Button, Fab, Input, InputGroup } from 'native-base';
import React, { Component } from 'react';
import { Linking, ActivityIndicator, Modal, ProgressBarAndroid, Dimensions, ImageBackground, DrawerLayoutAndroid, ScrollView, AsyncStorage, BackHandler, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImageSlider from 'react-native-image-slider';
var FloatingLabel = require('react-native-floating-labels');
import Spinner from 'react-native-loading-spinner-overlay';

var navigationView;

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceBackground: require('./../../../images/background-home.jpg'),
            active: false,
            dataListProgram: [],
            isLogin: false,
            showTopupSaldo: false,
            isLoading: true
        };
    }

    exitApps() {
        BackHandler.exitApp();
        return true;
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }

    toSignOut() {
        Alert.alert('', 'Apakah Anda ingin keluar?',
            [
                { text: 'Tidak', style: 'cancel' },
                {
                    text: 'Ya', onPress: () => {
                        AsyncStorage.setItem('loginStatus', '0');
                        Actions.Login({ 'direction': 'leftToRight' });
                        return true;
                    }
                },
            ]
        )

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            currentPage = ''
            BackHandler.exitApp();
            return true;
        });
        AsyncStorage.setItem('price', '')

        AsyncStorage.getItem('namaUser').then((valueName) => {
            AsyncStorage.getItem('profilePicture').then((valuePicture) => {
                AsyncStorage.getItem('userId').then((valueUserID) => {
                    this.setState({
                        uriPicture: valuePicture
                    })
                    AsyncStorage.getItem('jumlahKeranjang').then((valueJmlKeranjang) => {
                        this.setState({
                            nameUser: valueName,
                            jumlahKeranjang: (valueJmlKeranjang != undefined) ? valueJmlKeranjang : 0,

                        })
                        fetch('http://202.83.120.140/api/program-json')
                            .then((response) => response.json())
                            .then((responseJson) => {
                                this.setState({
                                    dataListProgram: responseJson,
                                });
                            });

                        fetch('http://202.83.120.140/api/agent/detail/' + valueUserID)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                AsyncStorage.setItem('saldo', '' + responseJson[0]['saldo']);
                                this.setState({
                                    saldo: responseJson[0]['saldo']
                                })
                            })

                        fetch('http://202.83.120.140/api/banner')
                            .then((response) => response.json())
                            .then((responseJson) => {
                                // alert(JSON.stringify(responseJson))
                                this.setState({
                                    bannerImage:
                                        <View style={{ width: widthDevice, height: heightDevice * 0.25, flexDirection: 'row', backgroundColor: '#54AD64' }}>
                                            <ImageSlider
                                                autoPlayWithInterval={3000}
                                                imageStyle={{ resizeMode: 'contain' }}
                                                // images={[
                                                //     require('./../../../images/bwa_banner_1.jpg'),
                                                //     require('./../../../images/bwa_banner_2.jpg'),
                                                //     require('./../../../images/bwa_banner_3.jpg')
                                                // ]}

                                                images={responseJson}
                                            />
                                        </View>,
                                    headerProgram:
                                        <View style={styles.titleProgramKegiatan}>
                                            <View style={{ width: widthDevice * 0.8, justifyContent: 'center' }}>
                                                <Text style={styles.headerAllProgram}>Program Kami</Text>
                                                <Text style={{ fontSize: 10, fontFamily: 'Zocial', color: 'grey' }}>Program-program Unggulan Badan Wakaf Al Quran</Text>
                                            </View>
                                        </View>,
                                    topupsaldo:
                                        <View style={{ height: heightDevice * 0.2, alignContent: 'center', justifyContent: 'center', paddingBottom: heightDevice*0.15 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({
                                                    showTopupSaldo: true
                                                })
                                            }}>
                                                <View style={styles.titleProgramKegiatan}>
                                                    <View style={{ width: widthDevice * 0.15, justifyContent: 'center' }}>
                                                        <Image
                                                            style={{
                                                                height: heightDevice * 0.1, width: widthDevice * 0.1,
                                                                resizeMode: 'contain'
                                                            }}
                                                            source={require('./../../../images/wallet-icon.png')}
                                                        />
                                                    </View>
                                                    <View style={{ width: widthDevice * 0.7, justifyContent: 'center' }}>
                                                        <Text style={styles.headerAllProgram}>Topup Saldo</Text>
                                                        <Text style={{ fontSize: 10, fontFamily: 'Zocial', color: 'grey' }}>Cara melakukan Topup Saldo</Text>
                                                    </View>
                                                    <View style={{ width: widthDevice * 0.1, justifyContent: 'center' }}>
                                                        <Icon name='ios-arrow-forward' style={{ color: 'grey' }} />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                Actions.History()
                                            }}>
                                                <View style={styles.titleHistory}>
                                                    <View style={{ width: widthDevice * 0.15, justifyContent: 'center' }}>
                                                        <Image
                                                            style={{
                                                                height: heightDevice * 0.1, width: widthDevice * 0.1,
                                                                resizeMode: 'contain'
                                                            }}
                                                            source={require('./../../../images/donasi.png')}
                                                        />
                                                    </View>
                                                    <View style={{ width: widthDevice * 0.7, justifyContent: 'center' }}>
                                                        <Text style={styles.headerAllProgram}>Donasi</Text>
                                                        <Text style={{ fontSize: 10, fontFamily: 'Zocial', color: 'grey' }}>Daftar Donasi</Text>
                                                    </View>
                                                    <View style={{ width: widthDevice * 0.1, justifyContent: 'center' }}>
                                                        <Icon name='ios-arrow-forward' style={{ color: 'grey' }} />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>,
                                    isLoading: false
                                });
                            });
                    })

                })
            })
        })

    }

    render() {

        return (
            <Container>
                <Header androidStatusBarColor='black' style={{ backgroundColor: '#0EC48F' }}>
                    <Left />
                    <Body>
                        <View style={{ width: widthDevice * 0.65, justifyContent: 'center', alignItems: 'center' }}></View>
                    </Body>
                    <Right>
                        <View style={{ width: widthDevice * 0.2, marginLeft: widthDevice * 0.8, flexDirection: 'row' }}>
                            <View style={{ width: widthDevice * 0.1 }}>
                                <TouchableOpacity onPress={() => {
                                    AsyncStorage.setItem('prevPage', 'home')
                                    Actions.Keranjang()
                                }}>
                                    <Image
                                        style={{
                                            width: widthDevice * 0.1, height: widthDevice * 0.065
                                        }}
                                        source={require('./../../../images/donate-2.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: widthDevice * 0.1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        AsyncStorage.setItem('prevPage', 'home')
                                        Actions.Pengaturan()
                                    }}>
                                    <Icon name='md-more' style={{ textAlign: 'center', fontSize: 28, color: 'white', right: 10 }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: heightDevice * 0.025, flexDirection: 'row', backgroundColor: '#f47d42', height: heightDevice * 0.025, borderRadius: 100, left: widthDevice * 0.225, top: 10, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                AsyncStorage.setItem('prevPage', 'home')
                                Actions.Keranjang()
                            }}>
                                <Text style={{ color: 'white', fontSize: 10 }}>{this.state.jumlahKeranjang}</Text>
                            </TouchableOpacity>
                        </View>
                    </Right>
                </Header>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, height: heightDevice }}>

                        {this.state.bannerImage}
                        {/* <View style={{ width: widthDevice * 0.2, marginLeft: widthDevice * 0.8, flexDirection: 'row', marginTop: heightDevice * 0.015, height: heightDevice * 0.05, justifyContent: 'center', alignContent: 'center', position: 'absolute' }}>
                        <View style={{ width: widthDevice * 0.1 }}>
                            <TouchableOpacity onPress={() => {
                                AsyncStorage.setItem('prevPage', 'home')
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
                                    AsyncStorage.setItem('prevPage', 'home')
                                    Actions.Pengaturan()
                                }}>
                                <Icon name='md-more' style={{ textAlign: 'center', fontSize: 28, color: 'white', right: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </View> */}

                        <View style={{ width: widthDevice * 0.2, left: widthDevice * 0.4, height: widthDevice * 0.2, marginTop: heightDevice * 0.2, position: 'absolute', borderRadius: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

                            <Image
                                style={{
                                    height: widthDevice * 0.2, width: widthDevice * 0.2, borderWidth: 1, borderRadius: 100,
                                    resizeMode: 'contain'
                                }}
                                source={{ uri: (this.state.uriPicture == '' || this.state.uriPicture == undefined ? 'https://img.icons8.com/pastel-glyph/64/000000/gender-neutral-user.png' : this.state.uriPicture) }}
                            />
                        </View>
                        <View style={{ width: widthDevice, height: widthDevice * 0.2, marginTop: heightDevice * 0.3, position: 'absolute', justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={styles.fontStyleWelcome}>{this.state.nameUser}</Text>
                            <Text style={styles.fontStylePoint}>Saldo Rp {this.currencyFormat(parseInt(this.state.saldo))}</Text>
                        </View>

                        <View style={{ height: heightDevice * 0.35, alignContent: 'center', justifyContent: 'center', marginTop: heightDevice * 0.2 }}>
                            {/* <TouchableOpacity onPress={() => Actions.Program()}> */}
                            {this.state.headerProgram}

                            {/* </TouchableOpacity> */}


                            <View style={styles.allProgram}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {(this.state.dataListProgram.length > 0) ?
                                        this.state.dataListProgram.map((e, idx) => {
                                            return (
                                                <TouchableWithoutFeedback onPress={() => {
                                                    AsyncStorage.setItem('ImageProgram', e.image);
                                                    AsyncStorage.setItem('idProgram', e.id);
                                                    AsyncStorage.setItem('namaProgram', e.name);
                                                    AsyncStorage.setItem('deskripsiProgram', e.description);

                                                    Actions.ProgramDetail()
                                                }}>
                                                    <View style={styles.listProgram}>
                                                        <ImageBackground
                                                            style={styles.imageProgram}
                                                            imageStyle={{ borderRadius: 10 }}
                                                            //source={{ uri: 'https://www.wakafquran.org/asset/inc/timthumb.php?src=/upload/user/ngadminwq/09-Jul-2016/Diskomvis_2016_alt_berikutnya_4.jpg&w=270&h=236&zc=1' }}
                                                            source={{ uri: e.image }}
                                                        >
                                                            <Text numberOfLines={2} style={{ marginTop: heightDevice * 0.15, marginLeft: 10, marginRight: 10, fontSize: 14, color: 'white' }}>
                                                                {e.name}
                                                            </Text>
                                                        </ImageBackground>
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
                                                </TouchableWithoutFeedback>
                                            )
                                        }) : null
                                    }

                                </ScrollView>
                            </View>
                        </View>
                        {this.state.topupsaldo}


                    </View>
                </ScrollView>


                {/* {(this.state.isLoading == false && this.state.jumlahKeranjang != '0') ?
                    <TouchableWithoutFeedback onPress={() => {
                        AsyncStorage.setItem('prevPage', 'home')
                        Actions.Keranjang()
                    }}>
                        <View style={{ width: heightDevice * 0.025, flexDirection: 'row', backgroundColor: '#f47d42', height: heightDevice * 0.025, borderRadius: 100, left: widthDevice * 0.82, top: heightDevice * 0.036, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>{this.state.jumlahKeranjang}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    : null} */}

                {/* </ImageBackground> */}
                {/* </ScrollView> */}
                {/* </DrawerLayoutAndroid> */}
                <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />


                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.showTopupSaldo}
                    style={{ position: 'absolute' }}
                    onRequestClose={() => {
                        this.setState({
                            showTopupSaldo: false
                        })
                        Actions.refresh;
                    }}
                >
                    <View style={{ backgroundColor: 'black', opacity: 0.6, position: 'absolute', height: heightDevice, width: widthDevice }} />

                    <View style={{ top: 0.15 * heightDevice, height: heightDevice * 0.6, width: widthDevice * 0.9, left: widthDevice * 0.05, backgroundColor: 'white' }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ width: widthDevice * 0.9, flexDirection: 'row' }}>
                                <View style={{ width: widthDevice * 0.025 }} />
                                <View style={{ width: widthDevice * 0.85 }}>
                                    <Text style={{ fontSize: 12, lineHeight: 10, color: 'grey' }} />
                                    <Text style={{ fontSize: 16, lineHeight: 20, color: 'grey', fontWeight: 'bold', textAlign: 'center' }}>Prosedur Top-Up pada mobile apps untuk Agen BWA</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }} />
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>1. Setiap rekrutment BWA Mobile Agent akan dilengkapi dengan saldo deposit sebesar Rp. 1,000,000,- sebagai saldo awal dari agent tersebut</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }} />
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>2. Agent dapat melakukan penerimaan donasi dari pewakif dalam bentuk uang Cash dan memindahkan saldo depositnya dari deposit Agent menjadi deposit BWA, dengan demikian maka saldo deposit Agent akan terkurangi sebesar sejumlah donasi yang diberikan oleh wakif</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }} />
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>3. Untuk melakukan penerimaan donasi berikutnya, Agent harus memastikan bahwa saldo depositnya mencukupi dan saldo deposit tidak diperbolehkan minus</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }} />
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>4. Bila saldo deposit tidak mencukupi, maka agent diharuskan melakukan proses Topup dan melakukan transfer ke rekening BWA di Bank Mandiri no. Account 124.000.1000000 dan mencantumkan nomor Agent pada kolom note atau keterangan.</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }} />
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>5. Setelah itu mengirimkan bukti transfer ke nomor WA khusus yaitu: 0852 1390 0383</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }} />
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>6. Dan komunikasi dilanjutkan ke nomor WA tersebut hingga Topup Saldo Deposit dari Agent akan masuk ke dalam Saldo dari Agent ybs.</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }} />
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>7. Bila TopUp sudah masuk, maka transaksi Donasi dapat Dilanjutkan kembali</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }} />
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>8. Keuangan BWA akan mengakui donasi wakif via agent, bila sudah terjadi Top-Up dan cocok dengan angka donasi yang dikumpulkan.</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }} />
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }}>9. Pengakhiran ke agenan dgn BWA, maka agent wajib melakukan top-up sehingga deposit kembali ke saldo awal yaitu Rp. 1.000.000,-.</Text>
                                    <Text style={{ fontSize: 12, lineHeight: 20, color: 'grey' }} />
                                </View>
                            </View>

                        </ScrollView>
                        <Button full style={{ borderColor: 'transparent', backgroundColor: '#92e552', borderWidth: 1 }}
                            onPress={() => {
                                this.setState({
                                    showTopupSaldo: false,
                                })
                                Actions.refresh;
                            }}>
                            <Text style={{ color: 'white' }}>OK</Text>
                        </Button>
                    </View>
                </Modal>

            </Container >
        )
    }
}

var { height, width } = Dimensions.get('screen');
var widthDevice = width;
var heightDevice = height;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },

    helloUser: {
        width: heightDevice * 0.05,
        height: heightDevice * 0.05,
        marginTop: heightDevice * 0.02,
        marginLeft: widthDevice * 0.02,
        marginBottom: 10,
        alignContent: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 100
    },

    helloUserSidebar: {
        width: heightDevice * 0.12,
        height: heightDevice * 0.12,
        alignContent: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 100
    },

    fontStyleWelcome: {
        fontSize: 18,
        fontFamily: 'Zocial',
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    fontStylePoint: {
        fontSize: 12,
        fontFamily: 'Zocial',
        color: 'grey',
        textAlign: 'center'
    },

    fontStyleWelcomeSidebar: {
        fontSize: 18,
        fontFamily: 'Zocial',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    fontStylePointSidebar: {
        fontSize: 12,
        fontFamily: 'Zocial',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },

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

    titleHistory: {
        flexDirection: 'row',
        height: heightDevice * 0.08,
        width: widthDevice * 0.95,
        marginTop: widthDevice * 0.01,
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

    allProgram: {
        //flex: 3,
        height: heightDevice * 0.4,
        alignContent: 'center',
        flexDirection: 'row',
        width: widthDevice * 0.95,
        marginLeft: widthDevice * 0.025,
        marginRight: widthDevice * 0.025,
        //marginBottom: widthDevice * 0.005,
        //justifyContent: 'center',
        backgroundColor: '#fcfcfc',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255, 0.5)'
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

    listProgram: {
        alignContent: 'center',
        height: heightDevice * 0.2,
        width: widthDevice * 0.7,
        margin: widthDevice * 0.025,
        justifyContent: 'center',
        backgroundColor: '#e8e8e8',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10
    },

    listKegiatan: {
        alignContent: 'center',
        height: heightDevice * 0.2,
        width: widthDevice * 0.4,
        margin: widthDevice * 0.025,
        justifyContent: 'center',
        backgroundColor: '#e8e8e8',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10
    },

    imageProgram: {
        height: heightDevice * 0.2, width: widthDevice * 0.7,
        resizeMode: 'cover',
        borderRadius: 10
    },

    imageKegiatan: {
        height: heightDevice * 0.25, width: widthDevice * 0.4,
        resizeMode: 'stretch',
        borderRadius: 10
    }
});
