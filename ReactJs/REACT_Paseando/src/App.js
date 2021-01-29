import React, { Component } from "react";
import "./App.css";
import Busqueda from "./Busqueda";

class App extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            latOrigin: -17.78409225285828,
            lngOrigin: -63.16666733634299
        };
    }
    componentDidMount() {
        if ( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition( position => {
                this.setState( { latOrigin: position.coords.latitude, lngOrigin: position.coords.longitude } );
            } );
        }
    }
    render() {
        return (<div className="container border rounded p-3 mt-4" style={{width:'100%'}}> {" "}
            <h1 id='title'>Conozcamos el Mundo</h1>
            {" "}
            <Busqueda lat={
                    this.state.latOrigin
                }
                lng={
                    this.state.lngOrigin
                }/>{" "} </div>);
    }
}
export default App;
