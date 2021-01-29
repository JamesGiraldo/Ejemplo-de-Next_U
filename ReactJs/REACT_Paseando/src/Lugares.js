 import React from "react";
 import "./Lugares.css";
 class Lugares extends React.Component {
     constructor(props){
         super(props)
         this.state = {
             morePlaces: false
         }
     }
     veces = 0;
     dife = 0;
     total = 0;
     parcial = 0;
     contador = 0;
     htmlLista = '';
     filterPlaces = [];
     handleClick = (name, e) => {
         this.inicializar()
         this.props.buscar(name, e)
     }
     handleLugares = async () => {
         this.inicializar()
         const respuesta = await this.props.buscarLugaresCercanos()
         if(respuesta === "ok"){
             if(this.contador === this.props.lugares.length){
                 this.setState({
                     morePlaces: false
                 })
             }else{
                 this.veces = Math.ceil(this.props.lugares.length / 10)
                 this.parcial = this.props.lugares.length
                 this.calcularVerMas()
             }
         } 
     }
     calcularVerMas = () => {
         if(this.veces > 0){
             if(this.parcial >= 10){
                 this.dife = this.parcial - 10
                 this.total = this.parcial - this.dife
                 this.parcial = this.dife
             }else{
                 this.total = this.parcial
             }
             for(let index = 0 ; index < this.total ; index++){
                 this.filterPlaces.push(this.props.lugares[this.contador])
                 this.contador++
             }
             this.veces--
             if(this.veces === 0){
                 this.setState({
                     morePlaces: false
                 })
             }else{
                 this.setState({
                     morePlaces: true
                 })
             }
         }
     }

     inicializar = () => {
         this.htmlLista = ''
         this.veces = 0
         this.contador = 0
         this.parcial = 0
         this.total = 0
         this.dife = 0
         this.filterPlaces = []
     }
     render(){
        return (
             <div>
                 <div className="row my-2">
                     <div className="col-12">
                         <button className="btn btn-secondary" onClick={this.handleLugares}>Lugares Cercanos</button>
                     </div>
                 </div>                
                 <div className="row my-0">                   
                     <div className='' style={{'marginLeft':'auto','marginRight':'auto','width':'70%'}}>{
                          this.props.mostrar &&
                          this.filterPlaces.map((valor, index) =>{
                                 return(
                                     <a href="#" onClick={(e) => this.handleClick(valor.name, e)} className="mb-2 card list-group-item-action" key={index}>
                                         <div className="car-body">
                                             <div className="row">
                                                 <div className="col m-2">
                                                     <img src={valor.hasOwnProperty('photos') ? valor.photos[0].getUrl() : ''} alt="" style={{width: '10rem', height: '6rem'}} />
                                                 </div>
                                                 <div className="col">
                                                         <p className="card-text"> {valor.name} </p>
                                                 </div>
                                                 <div className="col">
                                                     {valor.hasOwnProperty('rating') ? 
                                                         <small className="star">{valor.rating}</small>
                                                         :''
                                                     }
                                                 </div>
                                              </div>
                                         </div>                                           
                                     </a>
                                  )
                          })

                     }
                     {this.props.mostrar &&                             
                         this.state.morePlaces &&
                             <div className="card-body">
                                 <button className="btn btn-secondary" onClick={this.calcularVerMas}>Ver mas lugares</button>
                             </div>
                     }                      
                     </div>                                         
                 </div>                   
             </div>
         )
     }
 }
 export default Lugares;