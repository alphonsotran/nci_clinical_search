import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapsContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        };

    onMarkerClick = (props, marker, e) =>
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
        this.setState({
        showingInfoWindow: false,
        activeMarker: null
        })
    }
    };
    render() {
        const style = {
            width: '90vw',
            height: '75vh'
        }
    return (
    <Map 
        google={this.props.google}
        onClick={this.onMapClicked} 
        zoom={14} 
        style={style}>
        <Marker
            onClick={this.onMarkerClick}
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: 37.778519, lng: -122.405640}} /> 

        <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
                <h2>{this.state.selectedPlace.name}</h2>
            </div>
        </InfoWindow>   
        </Map>
    );
  }
}

export default MapsContainer;