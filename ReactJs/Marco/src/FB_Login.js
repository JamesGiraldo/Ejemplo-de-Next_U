import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

export default class FB_Login extends Component {
  constructor(props) {
    super(props);
    this.state = { fbLogon: this.props.logged };
  };

  iniciarFB = () => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '747588532078113',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      window.FB.AppEvents.logPageView();
      var fbListo = new Event('FBListo');
      document.dispatchEvent(fbListo);

    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.1&appId=747588532078113';;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    document.addEventListener('FBListo', this.fbLoginStatus);
  }

  componentDidMount() {
    this.iniciarFB()
  }

  fbLoginStatus = () => {
    this.FB = window.FB;
    var logged = '';
    this.FB.getLoginStatus((response) => {
      const loginStatus = response.status;
      switch (loginStatus) {
        case 'connected':
          logged = true;
          break;
        default:
          logged = false;
          break;
      }
    });
    this.setState({ fbLogon: logged })
    this.props.loginStatus(logged);
  }

  manejoOnClick = (e) => {
    if (!this.FB) this.FB = window.FB;
    if (this.FB) {
      if (e.target.id === 'autenticar') {
        if (this.state.fbLogon) {
          this.FB.logout(this.fbLoginStatus)
        } else {
          this.FB.login(this.fbLoginStatus)
        }
      }
    }
  }

  render() {
    const nombreBtn = this.state.fbLogon ? 'Salir' : 'Ingresar con Facebook'
    return (
      <div>
        <div className='btn btn-primary' id='autenticar' onClick={this.manejoOnClick}>{nombreBtn}</div>
      </div>
    )
  }
}
