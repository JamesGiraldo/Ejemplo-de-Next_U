 import React from "react"
 import './Busqueda.css';
 import Imagenes from "./Imagenes";
 import Horario from "./Horario";
 import Rating from "./Rating"
 import Comentarios from "./Comentarios";
 import Datos from "./Datos";
 import Lugares from "./Lugares";
 import Destino from "./Destino";

 class Busqueda extends React.Component {
     constructor(props){
         super(props)
         this.state = {
             name: '',
             address: '',
             location: '',
             hours: '',
             rating: '',
             places: '',
             viewPlaces: false,
             photos: '',
             reviews: ''
         }
     }

     map = ''
     service = ''
     directionsService = ''
     directionsRender = ''
     start = ''
     marker = []

     componentDidMount(){
         const googlePlaceAPILoad = setInterval(() => {
             if (window.google){
                 this.google=window.google;
                 clearInterval(googlePlaceAPILoad);
                 console.log('Load Place API');
                 this.map = new this.google.maps.Map(
                     document.getElementById('map'), {
                     center: new this.google.maps.LatLng(this.props.lat,this.props.lng),
                     zoom: 14 });
                 this.marker = []
                 this.addMarker(this.props.lat, this.props.lng)    
                 this.service = new this.google.maps.places.PlacesService(this.map)
                 this.directionsService = new this.google.maps.DirectionsService()
                 this.directionsRender = new this.google.maps.DirectionsRenderer()
                 this.start = new this.google.maps.LatLng(this.props.lat, this.props.lng)
             };
         },100)
     }

     addMarker = (lat, lng) => {
         let defineMarker = new this.google.maps.Marker({
             position: new this.google.maps.LatLng(lat, lng),
             map: this.map
         })
         this.marker.push(defineMarker)
     }

     buscar = (name, e) => {
         const request = {
             query: name,
             fields: ['place_id']
         };
         this.service.findPlaceFromQuery(request, (result, status) => {
             if(status === this.google.maps.places.PlacesServiceStatus.OK){
                 const request_details = {
                     placeId: result[0].place_id,
                     fields: ['name', 'photo', 'formatted_address', 'rating', 'opening_hours', 'review', 'geometry'] 
                 }
                 this.service.getDetails(request_details, (results, status) => {
                     if(status === this.google.maps.places.PlacesServiceStatus.OK){
                         this.setState({
                             name: results.name,
                             address: results.formatted_address,
                             location: results.geometry.location,
                             hours: results.hasOwnProperty('opening_hours') ? results.opening_hours.weekday_text : "",
                             rating: results.rating,
                             reviews: results.reviews,
                             photos: results.photos,
                             places: '',
                             viewPlaces: false
                         })
                         this.addMarker(this.state.location.lat(), this.state.location.lng())
                         this.clearMarker()
                     }
                 })
             }
         });
     }

     clearMarker = () => {
         let length
         if(this.marker.length > 2){
             length = this.marker.length-2
             this.marker[length].visible = false
             this.marker.splice(length, 1)
         }
     }

     buscarLugaresCercanos = () => {
         const request = {
             location: this.state.location ? this.state.location : new this.google.maps.LatLng(this.props.lat,this.props.lng),
             radius: '1000'
         }
         return new Promise((resolve => {
             this.service.nearbySearch(request, (results, status) => {
                 if(status === this.google.maps.places.PlacesServiceStatus.OK){
                     this.setState({
                         places: results,
                         viewPlaces: true
                     })
                     resolve("ok")
                 }
             })
         }))
        
     }

     calcDestino = (mode, e) => {
         this.directionsRender.setMap(this.map)
         const end = this.state.location
         const request = {
             origin: this.start,
             destination: end,
             travelMode: mode
         }
         this.directionsService.route(request, (result, status) => {
             if(status === "OK"){
                 this.directionsRender.setDirections(result)
             }
         })
     }

     render(){
         let datos, galeria, horario, comentarios, rating, destino
         if (this.state.name){
             datos = <Datos name={this.state.name} address={this.state.address} />
         }
         if (this.state.photos){
             galeria = <Imagenes photos={this.state.photos} />
         }
         if (this.state.hours){
             horario = <Horario hours={this.state.hours} />
         }
         if(this.state.rating){
             rating = <Rating rating={this.state.rating} />
         }
         if(this.state.reviews){
             comentarios = <Comentarios reviews={this.state.reviews} />
         }
         if(this.state.location){
             destino = <Destino calcularDestino={this.calcDestino}/>
         }
         return (
             <div className="container">
                 <div className="input-group">
                    <input type="text" id = 'ciudad' className="form-control" placeholder="Bucar en Google Place"/>
                       <div className="input-group-append">
                           <button className="btn btn-secondary" onClick={(e) => this.buscar(document.getElementById('ciudad').value, e)} type="button">
                               <i className="fa fa-search"/>
                           </button>
                       </div>
                </div>                 
                 {datos}
                 {galeria}
                 {horario}
                 {rating}
                 {comentarios}
                 <Lugares 
                     mostrar={this.state.viewPlaces} 
                     lugares={this.state.places} 
                     buscar={this.buscar} 
                     buscarLugaresCercanos ={this.buscarLugaresCercanos}
                 />
                 {destino}                
                 <div id="map" className='mt-2'></div>
             </div>
         );
     }
 }

 export default Busqueda;