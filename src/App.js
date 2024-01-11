import React, { Component } from 'react'
import Navbar from './component/Navbar'
import News from './component/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  state = {
    mode: 'light'
  }
  switchMode = () => {
    if (this.state.mode === 'light') {
      this.setState({ mode: 'dark' })
      document.body.style.backgroundColor = "#595454";
    }
    else {
      this.setState({ mode: 'light' })
      document.body.style.backgroundColor = "white"
    }
  }

  render() {
    return (
      <>
        <Router>
          <Navbar modeMethod={this.switchMode} modeVariable={this.state.mode} />
          <Routes>
            <Route exact path='/'
              element={<News key='general' category='general' country={'in'} pageSize={12} mode={this.state.mode} />}
            />
            <Route exact path='/business'
              element={<News key='business' category='business' country={'in'} pageSize={12} mode={this.state.mode} />}
            />
            <Route exact path='/sports'
              element={<News key='sports' category='sports' country={'in'} pageSize={12} mode={this.state.mode} />}
            />
            <Route
              exact path='/science' element = { <News key={'science'} category = 'science' country = 'in' pageSize = {12} mode = {this.state.mode} />}
            />
            <Route
              exact path='/entertainment' element = { <News key={'entertainment'} category = 'entertainment' country = 'in' pageSize = {12} mode = {this.state.mode} />}
            />
            <Route
              exact path='/technology' element = { <News key={'technology'} category = 'technology' country = 'in' pageSize = {12} mode = {this.state.mode} />}
            />
            <Route
              exact path='/health' element = { <News key={'health'} category = 'health' country = 'in' pageSize = {12} mode = {this.state.mode} />}
            />
          </Routes>

        </Router>
      </>
    )
  }
}
