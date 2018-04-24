import React from 'react'

const Site = (props) => {
  console.log(props.location.state.clinic)
  return (
    <div>  
      <p>{props.location.state.title}</p>
    </div>
  )
}

export default Site