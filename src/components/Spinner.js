import React, { Component } from 'react'
import spinner from './images/spinner.gif'
export class Spinner extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
            <img src={spinner} alt={"loading"} style={{width : "100px"}} />
        </div>
      </div>
    )
  }
}

export default Spinner
