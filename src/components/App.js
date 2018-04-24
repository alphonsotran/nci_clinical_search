import React, { Component } from 'react'
import Sites from './Sites'
import Site from './Site'
import './App.css'
import axios from 'axios'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

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
      input: '',
      status: 200
    }

    this.updateInput = this.updateInput.bind(this)
    this.getClinicalSites = this.getClinicalSites.bind(this)
    this.getZipcode = this.getZipcode.bind(this)
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
  getZipcode(site) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${site}&key=${process.env.REACT_APP_GEOCODE_API}`
      )
      .then((response) => {
        console.log(response.data.results[0].address_components[3].short_name)
        // this.setState({
        //   state: response.data.results[0].address_components[3].short_name
        // })
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
  // <Sites getClinicalSites={this.getClinicalSites} value={this.state.input} onChange={this.updateInput} onSites={this.state.locations} />
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route exact path='/' render={(routeProps) => (
              <Sites {...routeProps} getClinicalSites={this.getClinicalSites} value={this.state.input} onChange={this.updateInput} onSites={this.state.locations} getZipcode={this.getZipcode} />
            )} />
            <Route path='/site' component={Site}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
