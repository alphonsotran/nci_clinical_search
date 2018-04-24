import React from 'react'

const Site = (props) => {
  console.log("Site", props.location.state.USstate)
 
  const filterStates =
    props.location.state.clinic.filter((el) => {
      return el.org_state_or_province === props.location.state.USstate
    })

  console.log(filterStates)
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
    </div>
  )
}

export default Site