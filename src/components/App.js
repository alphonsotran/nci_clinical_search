import React, { Component } from 'react'
import './App.css'

window.API = {
  fetchData (city) {
    const modifiedEntry= city.replace(/ /g, '%20');
    const encodedURI = encodeURI(`https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?sites.org_city=${modifiedEntry}`)
    return fetch(encodedURI)
      .then((data) => data.json())
      .then ((repos) => repos.items)
      .catch((error) => {
        console.log(error)
        return null
      })
  }

}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      input: ''
    }

    this.updateInput = this.updateInput.bind(this)
  }
  componentDidMount() {
    console.log('--componentDidMount--')
    console.log(window.API.fetchData("San Francisco"))
  }
  updateInput(e) {
    const value = e.target.value
    this.setState({
      input: value
    })
  }
  render() {
    return (
      <div>
        <input
          type='text'
          placeholder='Enter Location'
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button>Search</button>
      </div>
    )
  }
}

export default App
