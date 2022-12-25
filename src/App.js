
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
export default class App extends Component {
  // c= 'Ak';
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress :0
  }
  setProgress = (progress)=> {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        {/* hello my first class based react ap {this.c} */}
      <Router>
      <Navbar title ="News Now"/>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
   
  
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={6} country={'in'} category={"General"}/>}> </Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={6} country={'in'} category={"Entertainment"}/>}> </Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={6} country={'in'} category={"Business"}/>}> </Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={6} country={'in'} category={"Health"}/>}> </Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={6} country={'in'} category={"Science"}/>}> </Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={6} country={'in'} category={"Sports"}/>}> </Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={6} country={'in'} category={"Technology"}/>}> </Route>
   
          </Routes>        


    </Router>
      </div>
    )
  }
}
