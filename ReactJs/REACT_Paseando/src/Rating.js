 import React, {Component} from "react"
 import "./Rating.css"

 class Rating extends Component {
     valorFinal = 0;

     componentDidMount(){
         this.calcRating()
         document.querySelector('.stars-inner').style.width = this.valorFinal
     }
     componentDidUpdate(){
         this.calcRating()
         document.querySelector('.stars-inner').style.width = this.valorFinal
     }

     calcRating = () => {
         let porcentaje = (this.props.rating / 5) * 100
         this.valorFinal = `${(Math.round(porcentaje / 10) * 10 )}%`
     }

     render(){
         return (
             <div className="row my-2 d-flex align-items-center">
                 <div className="col-md-3 text-center">
                     <p className="lead font-weight-bold m-0">Rating : </p> 
                 </div>
                 <div className="col-md-9 text-center">
                     <p className="font-italic my-0 mr-2 d-inline-block">{this.props.rating}</p>
                     <div className="stars-outer"><div className="stars-inner"></div></div>    
                 </div>
             </div>
         )
    }
}

export default Rating