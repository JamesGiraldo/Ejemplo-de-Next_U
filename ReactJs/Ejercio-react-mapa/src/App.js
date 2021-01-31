import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Place from './Place';

class App extends Component {
  constructor(props){
    super(props);
    this.state={photo:''}
  }

  map=''

  componentDidMount(){
    const googlePlaceAPILoad = setInterval(() => {
      if (window.google){
        this.google=window.google;
        clearInterval(googlePlaceAPILoad);
        console.log('Load Place API');
        const mapCenter = new this.google.maps.LatLng(4.624335,-74.064644);
        this.map = new this.google.maps.Map(document.getElementById('gmapContainer'), {
          center: mapCenter,
          zoom: 15
        });
        var marcador = new this.google.maps.Marker({position:mapCenter, map:this.map})
        this.showMap(mapCenter);
      };
    },100);
  }

  showMap(mapCenter) {
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    var map = new window.google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: mapCenter});
    // The marker, positioned at Uluru
    var marker = new window.google.maps.Marker({position: mapCenter, map: map});
  }

  manejoOnClick = (e) => {
    const request = {
      query: document.getElementById('origen').value ,
      fields: ['photos', 'formatted_address', 'name','place_id'],
    };
    this.service = new this.google.maps.places.PlacesService(this.map);
    this.service.findPlaceFromQuery(request, this.findPlaceResult);
  }

  findPlaceResult = (results, status) => {
    var placesTemp=[]
    var placeId = ''
    if (status ===  'OK') {
      results.map((place) => {
        var placePhotos=['']
        const placeTemp = {id:place.place_id, name:place.name,
          address:place.formatted_address,photos:placePhotos}
          placeId = place.place_id;
        placesTemp.push(<Place placeData={placeTemp}/>);
      })
    }
    if (placesTemp.length>0)
      this.findPlaceDetail(placeId);
    else{
      const placeTemp = {id:'N/A', name:<div className='mt-5'><strong className='text-center'>
          No hay resultados</strong></div>,
        address:'',photos:['']}
      placesTemp.push(<Place placeData={placeTemp}/>);
      this.setState({places:placesTemp})
    }
  }

  findPlaceDetail = (placeIdFound) => {
    var request = {
      placeId: placeIdFound,
      fields: ['address_component', 'adr_address', 'alt_id', 'formatted_address',
       'icon', 'id', 'name', 'permanently_closed', 'photo', 'place_id', 'plus_code', 'scope', 
       'type', 'url', 'utc_offset', 'vicinity','geometry']
    };
    this.service.getDetails(request, this.foundPlaceDatail);
  }

  foundPlaceDatail = (place, status) => {
    if (status === 'OK'){
      var placePhotos=['']
      if (place.photos){
        place.photos.map((placePhoto, index) => {
          placePhotos[index]=placePhoto.getUrl({'maxWidth': 160, 'maxHeight': 120})
          if (index === 2) return;
        })
      }
      const placeTemp = {id:place.place_id, name:place.name,
        address:place.formatted_address,photos:placePhotos}
      const placesTemp = <Place placeData={placeTemp}/>;
      console.log('address_component: '+ place.address_component, 
      'adr_address: '+place.adr_address, 'alt_id', 'formatted_address', 'geometry: '+place.geometry,
      'icon: '+place.icon, 'permanently_closed', 'photo',
      'type: '+place.type, 'url: '+place.url, 'utc_offset', 'vicinity')
      this.setState({places:placesTemp})
      this.showMap(place.geometry.location);
    }
  }

  render() {
    return (
      <div className="App" >
        
        <div className='container border rounded p-3 mt-4' style={{width:'50%'}}>
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 text-center'>
              <label><strong>Indica el lugar</strong></label>
            </div>
            <div className='col-4'></div>
          </div>
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 py-2'><input id='origen' type='text'/></div>
            <div className='col-4'></div>
          </div>
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 text-center'>
              <div className='btn btn-primary text-center' onClick={this.manejoOnClick}>Buscar Lugar</div>
            </div>
            <div className='col-4'></div>
          </div>
          {this.state.places}
          <div id='map' className='mt-2' ></div>
        </div>
      </div>
    );
  }
}

export default App;
