import React from 'react'

const Site = (props) => {
  console.log(props)
  return (
    <div>  
      <p>{props.location.state.title}</p>
      <p>{props.location.state.summary}</p>
    </div>
  )
}

export default Site