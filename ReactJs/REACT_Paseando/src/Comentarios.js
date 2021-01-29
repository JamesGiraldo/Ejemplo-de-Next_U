 import React from "react"
 import "./Comentarios.css"

 class Comentarios extends React.Component {
     constructor(props){
         super(props)
         this.state = {
             isComment: true
         }
     }
     handleMostrarComment = (event) => {
         this.setState({
             isComment: false
         })
     }
     handleOcultarComment = (event) => {
         this.setState({
             isComment: true
         })
     }
     render(){
         let button
         if (this.state.isComment) {
             button = <button className="btn btn-secondary" onClick={this.handleMostrarComment}>Mostrar Comentarios</button>
         }else {
             button = <button className="btn btn-secondary" onClick={this.handleOcultarComment}>Ocultar Comentarios</button>
         }
         return (
             <div>
                 <div className="row my-4">
                     <div className="col m-0">
                         {button}
                     </div>
                 </div>                
                {
                     !this.state.isComment && 
                         <div className="row my-2">
                             <div className="col m-0">{
                                     this.props.reviews.map((valor, index) => {
                                         return<div className="row p-1 bg-light" key={index}>
                                            <div className="card" style={{"width":"100%"}}>  
                                                 <div className="card-body">
                                                     {/* <img className="card-img-left rounded-circle cont-img mx-auto" style={{'width':'20%', 'height':'20%'}} src={valor.profile_photo_url} alt={valor.author_name}/> */}
                                                     <h5 className="card-title" style = {{'color':'blue'}}>{valor.author_name}</h5>
                                                     <p className="card-text">{valor.text}</p>
                                                 </div>
                                            </div>
                                         </div>
                                        
                                     })
                                }
                             </div>
                         </div>
                 }
             </div>
        )
    }
 }

 export default Comentarios