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
    </div>
  )
}

export default Site