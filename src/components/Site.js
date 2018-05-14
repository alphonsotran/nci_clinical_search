import React from 'react'
import MapContainer from './MapContainer'
import { GoogleApiWrapper } from 'google-maps-react';

const Site = (props) => {
  console.log("Site", props.location.state.USstate)
  
  //uses JSON data to filter by state and truthy and cuts down cliincal site to 20
  const filterStates =
    props.location.state.clinic.filter((el) => {
      return el.org_state_or_province === props.location.state.USstate && el.org_coordinates
    })
    .slice(0, 20)

  //Adding in name and phone number to incorporate in the future.
  const filteredLocations = filterStates.map((el) => (
    { name: el.contact_name, 
      location: {
        lat: el.org_coordinates.lat,
        lng: el.org_coordinates.lon
      },
      streetAddress: el.org_address_line_1,
      city: el.org_city,
      USstate: el.org_state_or_province,
      organization: el.org_name,
      phone: el.contact_phone
    }
  ))

  console.log("filterlocation", filterStates)

  return (
    <div>  
      <h2>{props.location.state.title}</h2>
      <p>{props.location.state.summary}</p>
      <h3>Participating Clinical Sites</h3>
      {filterStates.map((el, idx) => (
      <ul key={idx}>
        <li>{el.org_name}</li>
        <li>{el.org_address_line_1}</li>
        <li>{el.org_city}, {el.org_state_or_province}, {el.org_postal_code}</li>
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