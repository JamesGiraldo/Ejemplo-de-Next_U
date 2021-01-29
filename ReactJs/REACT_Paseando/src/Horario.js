import React, { Component } from 'react'

export default class Horario extends Component {
  constructor(props){
    super(props);
    this.state={mostrar:props.mostrarHorario}
  }

  manejoOnClick = (e) => {
    if (e.target.id='horario'){
      this.setState((prevState) => {
        return {mostrarHorario:!prevState.mostrarHorario}
      })
    }
  }

  render() {
    var horarios='';
    const btnName = this.state.mostrarHorario ? 'Ocultar horario' : 'Mostrar horario';
    const mostrar = this.state.mostrarHorario ? 'd-block' : 'd-none'
    if (this.props.hours){
      const abierto = this.props.hours.map((horario,index) => {
          return <div key={index} className='card'>
                   <ul class = 'list-group list-group-flush'>
                       <li class="list-group-item">{horario}</li>
                   </ul>                   
                 </div>;
      })
      horarios=<div className='row'>
                <div className='col-3'><button class="btn btn-secondary" id='horario' onClick={this.manejoOnClick}>{btnName}</button></div>
                <div className={'col-6 '+(this.state.mostrarHorario ? 'd-block' : 'd-none')}>{abierto}</div>
               </div>
    }else
      horarios=<div className='row'>
                  <strong>Horario no disponible</strong>
                </div>;
    return (
      <div className='container my-2' >
          {horarios}
      </div>
    )
  }
}







