import React, { Component } from 'react'
import ReactDOM from 'react-dom'


export default class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
          locations: this.props.filteredLocations
        }
    }
  
    componentDidMount() {
      this.loadMap() 
    }
    
    loadMap() {
      const center = this.state.locations[0].location
      if (this.props && this.props.google) { 
        const {google} = this.props 
        const maps = google.maps 
        const mapRef = this.refs.map 
        const node = ReactDOM.findDOMNode(mapRef) 
        const mapConfig = Object.assign({}, {
          center: center, 
          zoom: 7, 
          mapTypeId: 'roadmap'
      })

      this.map = new maps.Map(node, mapConfig) 

      this.state.locations.forEach( location => { 
        const marker = new google.maps.Marker({ 
          position: {lat: location.location.lat, lng: location.location.lng}, 
          map: this.map, 
          title: location.organization 
        })
        var infowindow = new google.maps.InfoWindow({
          content: `<h4>${marker.title}</h4><p>${location.streetAddress}</p><p>${location.city},&nbsp${location.USstate}</p>`
        })
        marker.addListener('click', function() {
          infowindow.open(this.map, marker)
        })
      })

    }
  }

  render() {
    console.log("MapContainer Filtered", this.state.locations)
    const style = { 
      width: '90vw', 
      height: '75vh' 
    }
    return (
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}