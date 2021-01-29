 import React from 'react'
 import './Imagenes.css';

 class Imagenes extends React.Component{
     render(){
         return (
             <div className="row my-3">
                 {this.props.photos.map((valor, index) => {
                     return index < 6 &&
                         <div className="col-md-4 col-sm-12 cont-galeria p-2 " key={index}>
                             <img src={valor.getUrl()} alt={index} className="galeria" />
                         </div>   
                 })}
             </div>
         );
    }
 }

export default Imagenes;