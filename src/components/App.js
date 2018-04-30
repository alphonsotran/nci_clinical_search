import React, { Component } from 'react'
import Sites from './Sites'
import Site from './Site'
import Loading from './Loading'
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
      status: 200,
      state: '',
      loading: false
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
    this.setState({
      loading: true
    })
    return axios.get(`https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?sites.org_postal_code=${site}`)
      .then((response) => {
        console.log(response.data.trials)
        this.setState({
          locations: response.data.trials,
          loading: false
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  getZipcode(site) {
    let state = null
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${site}&key=${process.env.REACT_APP_GEOCODE_API}`
      )
      .then((response) => {
        // console.log(response.data.results[0].address_components.map((el) => {
        //   if (el.types[0] === "administrative_area_level_1" && el.types[1] === "political") {
        //     return el.short_name
        //   }
        // }))
        response.data.results[0].address_components.map((el) => {
          if (el.types[0] === "administrative_area_level_1" && el.types[1] === "political") {
            return state = el.short_name
          }
        })
        this.setState({
          state
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
  // <Sites getClinicalSites={this.getClinicalSites} value={this.state.input} onChange={this.updateInput} onSites={this.state.locations} />
  render() {
    return (
      <BrowserRouter>
        <div>
            {this.state.loading === true
            ? <Loading />
            : <Route exact path='/' render={(routeProps) => (
                <Sites {...routeProps} getClinicalSites={this.getClinicalSites} value={this.state.input} onChange={this.updateInput} onSites={this.state.locations} getZipcode={this.getZipcode} USstate={this.state.state}/>
              )} />
          }
          <Route path='/site' component={Site}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
