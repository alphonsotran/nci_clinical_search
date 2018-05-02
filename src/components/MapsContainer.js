import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapsContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14} />
    );
  }
}

export default MapsContainer;