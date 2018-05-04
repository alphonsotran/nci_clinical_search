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
        google={this.props.google} zoom={14} 
        style={style}
        
        />
    );
  }
}

export default MapsContainer;