import React from 'react'

const Site = (props) => {
  console.log(props)
  return (
    <div>  
      <p>{props.location.state.title}</p>
    </div>
  )
}

export default Site