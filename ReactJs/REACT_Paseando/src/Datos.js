import React from "react";
import "./Datos.css";

class Datos extends React.Component {
     render() {
        return (
             <div className='row py-2'>
                 <div className='col-12 text-center'>
                     <h3>{this.props.name}</h3>
                 </div>
                 <div className='col-12 text-center'>                         
                     <i className="fa fa-map-marker font-weight-bold" ></i>
                     {this.props.address}
                 </div>
             </div>
         );
     }
     }
export default Datos;