
import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

export default class BuscarRuta extends Component {
  /*
  ██╗     ██╗███████╗███████╗
  ██║     ██║██╔════╝██╔════╝
  ██║     ██║█████╗  █████╗
  ██║     ██║██╔══╝  ██╔══╝
  ███████╗██║██║     ███████╗
  ╚══════╝╚═╝╚═╝     ╚══════╝

   ██████╗██╗   ██╗ ██████╗██╗     ███████╗
  ██╔════╝╚██╗ ██╔╝██╔════╝██║     ██╔════╝
  ██║      ╚████╔╝ ██║     ██║     █████╗
  ██║       ╚██╔╝  ██║     ██║     ██╔══╝
  ╚██████╗   ██║   ╚██████╗███████╗███████╗
   ╚═════╝   ╚═╝    ╚═════╝╚══════╝╚══════╝
   */
  constructor(props) {
    super(props);
    this.state = {
      searchRoute: this.props.searchRoute
    };
  };
  /*
  ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
  ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
  █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
  ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
  ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
  ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
  */
  buscarRuta = () => {
    let medio = document.getElementById('medio').value;
    let direccion = document.getElementById('direccion').value;
    let partida = document.getElementById('partida').value;

    this.props.searchRoute(
      medio,
      direccion,
      partida,
    )
  }

  /////////////////////////
  // selectItem
  selectItem = (e, item) => {
    e.preventDefault();
    this.setState({
      no_filtrar: false,
      radius: 1000
    })
    this.props.selectItem(item);
  }

  /*
  ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗
  ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
  ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
  ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
  */
  render() {
    return (
      <div className='row col-12 d-flex justify-content-center'>
        <label htmlFor="medio">Viajar en: </label>
        <select className='selectpicker' id="medio">
          <option value="vehiculo"> vehículo </option>
          <option value="transporte"> transporte público </option>
          <option value="bicicleta"> bicicleta </option>
          <option value="caminando"> caminando </option>
        </select>
        <select className='selectpicker' id="direccion">
          <option value="desde"> desde </option>
          <option value="hasta"> hasta </option>
        </select>
        <input type="text" id="partida" />
        <button className='btn btn-secondary text-center' onClick={this.buscarRuta}><span role='img' aria-label='buscar'>🔍</span> Buscar</button>
      </div>
    )
  }
}
