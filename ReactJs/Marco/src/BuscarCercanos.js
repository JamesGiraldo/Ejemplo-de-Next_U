
import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

let max = 9;
export default class BuscarCercanos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbys: this.props.nearbys,
      placeData: this.props.placeData,
      no_filtrar: false,
      radius: 1000
    };
  };

  buscarCercanos = () => {
    this.props.requestNearby(
      this.state.placeData.geometry.location,
      this.state.radius)
  }

  buscarMasLugares = () => {
    this.setState({
      no_filtrar: true,
      radius: 2000
    })
    this.props.requestNearby(
      this.state.placeData.geometry.location,
      2000)
  }
  /////////////////////////
  // render photo
  renderFoto = (item) => {
    if (!item.photos || item.photos.length === 0) {
      return null;
    }
    let style = {
      maxWidth: 200 + 'px',
      width: 100 + '%',
    }
    return <img
      style={style} alt={item.name}
      src={item.photos[0]
        .getUrl({
          'maxWidth': 200, 'maxHeight': 120
        })} />
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

  ///////////////////////
  render() {
    let btn = (
      <div className='row col-12 d-flex justify-content-center'>
        <button className='btn btn-secondary text-center' onClick={this.buscarCercanos}>Buscar Lugares Cercanos</button>
      </div>
    )
    let btn_plus = (
      <div className='row col-12 d-flex justify-content-center'>
        <button className='btn btn-secondary text-center' onClick={this.buscarMasLugares}>Buscar Mas Lugares</button>
      </div>
    )
    if (this.state.no_filtrar)
      btn_plus = null;
    if (!this.props.nearbys)
      return btn;
    //en caso de salir
    let cercanos = this.props.nearbys
      .filter((item, index) => index < max || this.state.no_filtrar)
      .map((item, index) => {
        return (
          <div className='col-4' key={'cercano-' + index}>
            <div className="row">
              <hr className='col-12' />
              <div className='col-3'><img height='32px' src={item.icon} alt={item.icon.split('/').pop().split('.')[0]} /></div>
              <div className='col-9'>Ranking: {item.rating}</div>
              <div className='col-12'>
                <button className='row btn btn-link' onClick={(e) => this.selectItem(e, item)}>
                  {item.name}
                </button>
              </div>
              <div className='col-12'><em>{item.vicinity}</em></div>
              <div className='col-12'>{this.renderFoto(item)}</div>
            </div>
          </div>
        )
      });

    return <div className="row">{btn}{cercanos}{btn_plus}</div>;

  }
}
