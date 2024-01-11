import React, { Component } from 'react'
import Navbar from './component/Navbar'
import News from './component/News'

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <News category={'sports'} country={'in'} pageSize = {12} />
      </>
    )
  }
}
