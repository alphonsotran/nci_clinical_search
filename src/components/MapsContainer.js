import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapsContainer extends Component {
  render() {
    const style = {
        width: '90vw',
        height: '75vh'
    }
    return (
      <Map 
        google={this.props.google} 
        zoom={14} 
        style={style}>
        <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: 37.778519, lng: -122.405640}} />    
        </Map>
    );
  }
}

export default MapsContainer;