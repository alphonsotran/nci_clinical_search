import React, { Component } from 'react';
import ReactDOM from 'react-dom'


export default class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
          locations: this.props.filteredLocations
        }
    }
  
    
    componentDidMount() {
      this.loadMap(); 
    }
    
    loadMap() {
      const center = this.state.locations[0].location
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: center, // sets center of google map to NYC.
        zoom: 7, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

  // ==================
  // ADD MARKERS TO MAP
  // ==================
      this.state.locations.forEach( location => { // iterate through locations saved in state
        const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
          position: {lat: location.location.lat, lng: location.location.lng}, // sets position of marker to specified location
          map: this.map, // sets markers to appear on the map we just created on line 35
          title: location.name // the title of the marker is set to the name of the location
        });
        var infowindow = new google.maps.InfoWindow({
          content: `<h3>${marker.title}</h3>`
        });
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });
      })

    }
  }

  render() {
    console.log("MapContainer Filtered", this.state.locations)
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '90vw', // 90vw basically means take up 90% of the width screen. px also works.
      height: '75vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
    }

    return ( // in our return function you must return a div with ref='map' and style.
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}