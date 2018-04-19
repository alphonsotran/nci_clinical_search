import React, { Component } from 'react'
import Sites from './Sites'
import './App.css'
import axios from 'axios'

// window.API = {
//   fetchData (city) {
//     const modifiedEntry= city.replace(/ /g, '%20');
//     const encodedURI = encodeURI(`https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?sites.org_city=${modifiedEntry}`)
//     return fetch(encodedURI)
//       .then((data) => data.json())
//       .then ((repos) => repos.items)
//       .catch((error) => {
//         console.log(error)
//         return null
//       })
//   }

// }

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      input: ''
    }

    this.updateInput = this.updateInput.bind(this)
    this.getClinicalSites = this.getClinicalSites.bind(this)
  }
  componentDidMount() {
    console.log('--componentDidMount--')
    // console.log(window.API.fetchData("San Francisco"))
  }
  getClinicalSites(site) {
    // zipcode is better to use because it's more accurate and to reduce errors
    // const modifiedEntry = site.replace(/ /g, '%20')
    return axios.get(`https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?sites.org_postal_code=${site}`)
      .then((response) => {
        console.log(response.data.trials)
        this.setState({
          locations: response.data.trials
        })
      })
      .catch((error) => {
        console.log(error)
      })
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
        <Sites getClinicalSites={this.getClinicalSites} value={this.state.input} onChange={this.updateInput} onSites={this.state.locations} />
      </div>
    )
  }
}

export default App
