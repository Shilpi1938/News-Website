import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import New from './components/New';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={progress:0};
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
          <Routes>
            <Route exact path="/" element={<New  setProgress={this.setProgress} country="us" pageSize={12} category="general" key="general"/>}></Route>
            <Route exact path="/business" element={<New  setProgress={this.setProgress} country="us" pageSize={12} category="business" key="business"/>}></Route>
            <Route exact path="/entertainment" element={<New  setProgress={this.setProgress} country="us" pageSize={12} category="entertainment" key="entertainment"/>}></Route>
            <Route exact path="/health" element={<New  setProgress={this.setProgress} country="us" pageSize={12} category="health" key="health"/>}></Route>
            <Route exact path="/science" element={<New  setProgress={this.setProgress} country="us" pageSize={12} category="science" key="science"/>}></Route>
            <Route exact path="/sports" element={<New  setProgress={this.setProgress} country="us" pageSize={12} category="sports" key="sports"/>}></Route>
            <Route exact path="/technology" element={<New  setProgress={this.setProgress} country="us" pageSize={12} category="technology"key="technology"/>}></Route>
            
          </Routes>
        </Router>
      </div>
    )
  }
}




