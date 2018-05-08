import React from 'react'
import MapsContainer from './MapsContainer'
import MapContainer from './MapContainer'
import { GoogleApiWrapper } from 'google-maps-react';

const Site = (props) => {
  console.log("Site", props.location.state.USstate)
  
  //uses JSON data to filter by state and truthy 
  const filterStates =
    props.location.state.clinic.filter((el) => {
      return el.org_state_or_province === props.location.state.USstate && el.org_coordinates
    })

  const filteredLocations = filterStates.map((el, idx)=>(
    { name: el.contact_name, 
      location: {
        lat: el.org_coordinates.lat,
        lng: el.org_coordinates.lon
      }
    }
  ))

  console.log("filterlocation", filterStates)

  return (
    <div>  
      <p>{props.location.state.title}</p>
      {filterStates.map((el, idx) => (
      <ul key={idx}>
        <li>{el.contact_name}</li>
        <li>{el.org_address_line_1}</li>
        <li>{el.org_city}, {el.org_state_or_province}, {el.org_postal_code}</li>
        <li>{el.contact_phone}</li>
      </ul>
      ))}
      <MapContainer 
        google={props.google} 
        filteredLocations={filteredLocations}
        />
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_JS_API,
})(Site)