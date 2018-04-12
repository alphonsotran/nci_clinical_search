import React, { Component } from 'react';
import './App.css';

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
    );
  }
}

export default App;
