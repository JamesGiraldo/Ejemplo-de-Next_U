import React, {Component} from "react"
import "./Destino.css"

class Destino extends Component {
    constructor(props){
        super(props)
        this.state = {
            travel: 'DRIVING'
        }
    }

    calcDestino = (mode, e) => {
        this.props.calcularDestino(mode, e)
    }

    handleSelect = (event) => {
        this.setState({
            travel: event.target.value
        })
    }

    render(){
        return (
            <div>
                <div className="row my-2">
                    <div className="col-5">
                         <button className="btn btn-secondary" onClick={(e) => this.calcDestino(this.state.travel, e)}>Ir al Destino</button>
                    </div>
                    <div className="col-7">
                        <select className="form-control" onChange={this.handleSelect} value={this.state.travel}>
                            <option value="DRIVING">Vehiculo</option>
                            <option value="TRANSIT">Transporte Publico</option>
                            <option value="WALKING">A pie</option>
                            <option value="BICYCLING">Bicicleta</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default Destino