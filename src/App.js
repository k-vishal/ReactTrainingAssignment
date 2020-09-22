import React,{Component} from 'react';
import logo from './logo.svg';
import Login from './component/login/login.component';
import { BrowserRouter as Router, Route ,Switch,Redirect } from "react-router-dom";
import './App.css';
import Home from './component/home/home.component';
import {Button} from 'reactstrap';


class App extends Component{

  constructor(props)
  {
    super(props)
    this.state = {
      loggedIn : false 
    }
  }

  isLoggedIn(token)
  {
    if( token)
        this.setState({loggedIn:true})
    else
        console.log(token)
  }

  render()
 {
  let {loggedIn} = this.state;

    return (
      <Router>
      <div className="App">
      <Switch>
            <Route exact path="/">
              {loggedIn ? <Home/> : <Login isLoggedIn = {this.isLoggedIn.bind(this)}></Login>}
            </Route>
            <Route path="*" render={()=>
            <div className="notFound">oops!! You lost??
              <div>
                Lets get back to home!! Click 
                &nbsp;&nbsp;
                <Button variant = 'contained' color = 'primary' onClick = {()=>this.notFound()} >
                        Here 
                         </Button>
                </div>
              </div>}/>
            </Switch>
    </div>
    </Router>
  );
}}

export default App;
