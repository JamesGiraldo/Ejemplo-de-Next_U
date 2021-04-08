import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import Place from './Place';
import Rating from './Rating';
import Horario from './Horario';
import BuscarCercanos from './BuscarCercanos'
import BuscarRuta from './BuscarRuta'
let testing = true;
let fields = ['photos', 'formatted_address', 'name', 'place_id', 'geometry']
let maxPhotos = 6;
class App extends Component {
  map;
  mapRender;
  placeService;
  directionService;
  stepDisplay;
  marker;
  markers;
  /*
  ██╗     ██╗███████╗███████╗
  ██║     ██║██╔════╝██╔════╝
  ██║     ██║█████╗  █████╗
  ██║     ██║██╔══╝  ██╔══╝
  ███████╗██║██║     ███████╗
  ╚══════╝╚═╝╚═╝     ╚══════╝

   ██████╗██╗   ██╗ ██████╗██╗     ███████╗
  ██╔════╝╚██╗ ██╔╝██╔════╝██║     ██╔════╝
  ██║      ╚████╔╝ ██║     ██║     █████╗
  ██║       ╚██╔╝  ██║     ██║     ██╔══╝
  ╚██████╗   ██║   ╚██████╗███████╗███████╗
   ╚═════╝   ╚═╝    ╚═════╝╚══════╝╚══════╝
   */
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      logged: false || testing,
      cercanos: null
    }
  }
  componentDidMount() {
    const googlePlaceAPILoad = setInterval(() => {
      if (window.google) {
        this.google = window.google;
        clearInterval(googlePlaceAPILoad);
        console.log('Load Place API');
        const mapCenter = new this.google.maps.LatLng(4.624335, -74.064644);
        this.map = new this.google.maps.Map(
          document.getElementById('map'), {
            center: mapCenter,
            zoom: 15
          });
        this.mapRender = new this.google.maps
          .DirectionsRenderer();
        this.placeService = new this.google.maps.places
          .PlacesService(this.map);
        this.directionService = new this.google.maps
          .DirectionsService(this.map);
        this.stepDisplay = new this.google.maps
          .InfoWindow();
        this.showMap(mapCenter);
      };
    }, 100);
  }
  /*
  ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
  ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
  █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
  ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
  ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
  ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
  */

  showMap = (mapCenter) => {
    this.map = new window.google.maps
      .Map(document.getElementById('map'),
        { zoom: 15, center: mapCenter });
    this.marker = new window.google.maps
      .Marker(
        { position: mapCenter, map: this.map });
  }

  loginStatus = (login) => {
    this.setState({ logged: login })
  }

  buscarLugarFromInput = (e) => {
    this.buscarLugar(
      document.getElementById('origen').value)
  }

  buscarLugarFromItem = (item) => {
    this.buscarLugar(
      item.name)
  }

  buscarLugar = (lugar) => {
    const request = {
      query: lugar,
      fields: fields,
    };
    this.placeService.findPlaceFromQuery(
      request, this.findPlaceResult);
  }

  requestNearby = (placeLocation, placeRadius) => {
    const request = {
      location: placeLocation,
      radius: placeRadius,
      fields: fields,
    };
    this.placeService.nearbySearch(
      request, this.findNearby);
  }

  requestRoute = (medio, direccion, destino) => {
    console.log("findRoute", medio, direccion, destino);
    let origen = document.getElementById('origen').value;
    let orig = (direccion === 'desde') ? destino : origen;
    let dest = (direccion === 'desde') ? origen : destino;
    let modes = {
      'vehiculo': this.google.maps.TravelMode.DRIVING,
      'bicicleta': this.google.maps.TravelMode.BICYCLING,
      'transporte': this.google.maps.TravelMode.TRANSIT,
      'caminando': this.google.maps.TravelMode.WALKING,
    }

    const request = {
      destination: dest,
      origin: orig,
      travelMode: modes[medio]
    }
    this.directionService.route(
      request, this.findRoute
    )
  }
  //
  //

  findPlaceResult = (results, status) => {
    this.setState({
      place: null,
      placeRating: null,
      placeHorarios: null,
      cercanos: null,
      ruta: null,
    })
    if (status !== 'OK' || results.length === 0) {
      console.error("No se pudo encontra el lugar");
      let d = {
        id: 'N/A', name: <div className='mt-5'><strong className='text-center'>
          No hay resultados</strong></div>,
        address: '', photos: []
      }
      let placesTemp = <Place placeData={d} />
      this.setState({
        places: placesTemp,
      });
      return;
    }
    //si encontro un lugar
    this.findPlaceDetail(results[0].place_id);
  }

  findPlaceDetail = (placeIdFound) => {
    this.setState({
      place: null,
      placeRating: null,
      placeHorarios: null,
      cercanos: null,
      ruta: null,
    })
    var request = {
      placeId: placeIdFound,
      fields: ['address_component', 'adr_address', 'alt_id', 'formatted_address',
        'icon', 'id', 'name', 'business_status', 'photo', 'place_id', 'plus_code', 'scope',
        'type', 'url', 'utc_offset_minutes', 'vicinity', 'geometry', 'rating', 'reviews', 'opening_hours']
    };
    this.placeService.getDetails(
      request, this.foundPlaceDatail);
  }

  foundPlaceDatail = (place, status) => {
    if (status !== 'OK' || !place) return;

    //sobrescribe el cuadro de dialogo
    document.getElementById('origen').value = place.name;

    let placePhotos = ['']
    if (place.photos) {
      placePhotos = place.photos
        .filter((item, index) => index < maxPhotos)
        .map(item => item.getUrl({ 'maxWidth': 160, 'maxHeight': 120 }))
    }

    const placeTemp = {
      id: place.place_id, name: place.name,
      address: place.formatted_address,
      photos: placePhotos
    }
    const placesTemp = <Place
      placeData={placeTemp} />;
    const placeHorarios = <Horario
      horarios={place.opening_hours} />
    let rating = ''
    if (place.rating) {
      rating = <Rating
        placeRating={place.rating} placeReviews={place.reviews} />
    } else {
      rating = <div
        key={1} className='row mt-2 mb-1 pl-3' >
        <strong>No hay comentarios</strong>
      </div>;
    }
    this.setState({
      place: place,
      places: placesTemp,
      placeRating: rating,
      placeHorarios: placeHorarios,
      cercanos: null
    })
    this.showMap(place.geometry.location);
  }

  findNearby = (result) => {
    this.setState({ cercanos: result })
  }

  findRoute = (result, status) => {
    if (!result || status !== 'OK') {
      this.setState({ ruta: "No se encontro ninguna ruta" })
      this.showMap(this.marker.position)
      return;
    }
    this.setState({ ruta: "Se Encontro la siguiente ruta" })
    this.mapRender.setMap(this.map);
    // mapRender.setPanel(document.getElementById('directionsPanel'));
    this.mapRender.setOptions({ suppressMarkers: true })
    this.mapRender.setDirections(result)
    this.addEventToRouteMarker(result);
  }
  selectMarker = (e) => {
    console.log("e", e);
  }

  addEventToRouteMarker = (result) => {
    let route = result.routes[0].legs[0];
    if (!this.markers) this.markers = [];
    //borramos todos los markadores previos
    this.markers.forEach((item, i) => {
      item.setMap(null);
    });
    //ahora creamos marcadores nuevos
    let steps = [0, 1];
    this.markers = steps.map((step, i) => {
      let point = (step === 0) ?
        route.start_location :
        route.end_location;
      let label = (step === 0) ? "A" : "B"
      let address = (step === 0) ?
        route.start_address : route.end_address
      let extra = (step === 0) ? ''
        : '' + route.distance.text + '<br/>' + route.duration.text

      console.log("route", route);
      let marker = new this.google.maps.Marker({
        position: new this.google.maps.LatLng(point.lat(), point.lng()),
        map: this.map,
        label: label,
      })
      this.google.maps.event.addListener(
        marker, 'click', () => {
          this.stepDisplay.setContent(address + '<br/>' + extra);
          this.stepDisplay.open(this.map, marker);
        }
      )
      return marker;
    });
  }


  /*
  ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗
  ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
  ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
  ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
  */
  render() {
    if (this.state.logged) {
      return (
        <div className="App" >

          <div className='container border rounded p-3 mt-4'>
            <div className='row'>
              <div className='col-4 offset-4 text-center'>
                <label><strong>Indica el lugar</strong></label>
              </div>
            </div>
            <div className='row'>
              <div className='col-4 offset-4 py-2'>
                <input className='col-12' id='origen' type='text' />
              </div>
            </div>
            <div className='row py-2'>
              <div className='col-4 offset-4 text-center'>
                <button className='btn btn-primary text-center' onClick={this.buscarLugarFromInput}>Buscar Lugar</button>
              </div>
            </div>
            <div className='row py-2'>
              {this.state.placeRating &&
                <BuscarRuta
                  searchRoute={this.requestRoute} />
              }
              <div className='col-6 offset-3 text-center'>
                {this.state.ruta}
              </div>
            </div>
            <div id="map"></div>
            <div className='row py-2'>
              {this.state.places}
              {this.state.placeHorarios}
              {this.state.placeRating}
            </div>
            <div className='row py-2 col-12'>
              {this.state.placeRating &&
                <BuscarCercanos
                  placeData={this.state.place}
                  nearbys={this.state.cercanos}
                  requestNearby={this.requestNearby}
                  selectItem={this.buscarLugarFromItem} />
              }
            </div>
          </div>

        </div>
      );
    }
    return <div>Nada que Mostrar</div>
  }
}

export default App;
