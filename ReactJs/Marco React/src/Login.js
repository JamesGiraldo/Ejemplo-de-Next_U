/**
* Es un psuedo login
*/

import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { logon: this.props.logged };
  };

  login() {
    this.props.loginStatus(true);
  }

  logout() {
    this.props.loginStatus(false);
  }

  manejoOnClick = (e) => {
    if (e.target.id = 'autenticar') {
      if (this.state.logon) {
        this.logout()
      } else {
        this.login()
      }
    }
  }

  render() {
    const nombreBtn = this.state.logon ? 'Salir' : 'Ingresar'
    return (
      <div>
        <div className='btn btn-primary' id='autenticar' onClick={this.manejoOnClick}>{nombreBtn}</div>
      </div>
    )
  }
}
