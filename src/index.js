import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import { Container } from 'native-base';
import { Scene, Reducer, Router } from 'react-native-router-flux';

//Home and Other Menu
import Home from './templates/Home/Home';
import History from './templates/Home/History';
import Program from './templates/Program/Program';
import ProgramDetail from './templates/Program/ProgramDetail';
import ProyekDetail from './templates/Program/ProyekDetail';
import Kegiatan from './templates/Kegiatan/Kegiatan';
import Login from './templates/Login/Login';
import ForgotPassword from './templates/Login/ForgotPassword';
import Pengaturan from './templates/Pengaturan/Pengaturan';
import More from './templates/More/More';
import Point from './templates/Point/Point';
import Keranjang from './templates/Keranjang/Keranjang';
import Checkout from './templates/Keranjang/Checkout';
import Pembayaran from './templates/Keranjang/Pembayaran';
import PembayaranFinnet from './templates/Keranjang/PembayaranFinnet';
import FooterPage from './FooterPage';
import FooterPageHome from './FooterPageHome';


const TabIcon = ({ title }) => {
  return (
    <Text>{title}</Text>
  );
}

global.currentPage = '';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footer: <FooterPage />,
    };
  }

  render() {
    const reducerCreate = params => {
      const defaultReducer = Reducer(params);
      return (state, action) => {
        if (action.key == 'Home') {
          currentPage = 'Home'
          this.setState({
            footer: <FooterPageHome />,
          });
        } else if (action.key == 'History') {
          currentPage = 'History'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == 'Program') {
          currentPage = 'Program'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == 'ProgramDetail') {
          currentPage = 'ProgramDetail'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == 'ProyekDetail') {
          currentPage = 'ProyekDetail'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == 'Kegiatan') {
          currentPage = 'Kegiatan'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == 'More') {
          currentPage = 'More'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == 'Keranjang') {
          currentPage = 'Keranjang'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == 'Checkout') {
          currentPage = 'Checkout'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == 'Pembayaran') {
          currentPage = 'Pembayaran'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == 'PembayaranFinnet') {
          currentPage = 'Pembayaran Finnet'
          this.setState({
            footer: <FooterPage />,
          });
        }
        else if (action.key == 'Login') {
          currentPage = 'Login'
          this.setState({
            footer: null,
          });
        } else if (action.key == 'ForgotPassword') {
          currentPage = 'ForgotPassword'
          this.setState({
            footer: null,
          });
        } else if (action.key == undefined && currentPage == 'Home') {
          currentPage = 'Home'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == undefined && currentPage == 'History') {
          currentPage = 'History'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == undefined && currentPage == 'Program') {
          currentPage = 'Program'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == undefined && currentPage == 'ProgramDetail') {
          currentPage = 'ProgramDetail'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == undefined && currentPage == 'ProyekDetail') {
          currentPage = 'ProyekDetail'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == undefined && currentPage == 'Kegiatan') {
          currentPage = 'Kegiatan'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == undefined && currentPage == 'More') {
          currentPage = 'More'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == undefined && currentPage == 'Keranjang') {
          currentPage = 'Keranjang'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == undefined && currentPage == 'Checkout') {
          currentPage = 'Checkout'
          this.setState({
            footer: <FooterPage />,
          });
        } else if (action.key == undefined && currentPage == 'Pembayaran') {
          currentPage = 'Pembayaran'
          this.setState({
            footer: <FooterPage />,
          });
        } else {
          currentPage = ''
          this.setState({
            footer: null,
          });
        }
        return defaultReducer(state, action);
      }
    };
    return (
      <Container>
        <Router
          createReducer={reducerCreate}
        >
          <Scene key="root">

            <Scene
              key="Login"
              initial={true}
              panHandlers={null}
              component={Login}
              title="Login"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="ForgotPassword"
              panHandlers={null}
              component={ForgotPassword}
              title="Forgot Password"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="Home"
              panHandlers={null}
              component={Home}
              title="Home"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="Program"
              panHandlers={null}
              component={Program}
              title="Program"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="ProgramDetail"
              panHandlers={null}
              component={ProgramDetail}
              title="ProgramDetail"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="ProyekDetail"
              panHandlers={null}
              component={ProyekDetail}
              title="ProyekDetail"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="Kegiatan"
              panHandlers={null}
              component={Kegiatan}
              title="Kegiatan"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="More"
              panHandlers={null}
              component={More}
              title="More"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="Pengaturan"
              panHandlers={null}
              component={Pengaturan}
              title="Pengaturan"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="Point"
              panHandlers={null}
              component={Point}
              title="Point"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="Keranjang"
              panHandlers={null}
              component={Keranjang}
              title="Keranjang"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="Checkout"
              panHandlers={null}
              component={Checkout}
              title="Checkout"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="History"
              panHandlers={null}
              component={History}
              title="History"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="Pembayaran"
              panHandlers={null}
              component={Pembayaran}
              title="Pembayaran"
              icon={TabIcon}
              hideNavBar={true}
            />

            <Scene
              key="PembayaranFinnet"
              panHandlers={null}
              component={PembayaranFinnet}
              title="Pembayaran Finnet"
              icon={TabIcon}
              hideNavBar={true}
            />


          </Scene>
        </Router>
        {/* {this.state.footer} */}
      </Container>
    )
  }
}