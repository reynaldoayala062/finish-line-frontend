import React from 'react';
import './App.css';
import Navbar from './components/navbar'
import Login from './components/login'
import SignUp from './components/signup'
import ProjectContainer from './components/projectcontainer'
import Calander from './components/calander'
import Home from './components/home'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

class App extends React.Component {

  state = {
    isLoggedIn: false
  }

  componentDidMount(){
    if(localStorage.getItem('auth_key')){
      this.setState({ isLoggedIn: true })
    }
  }

  handleLogin = () => {
    if(localStorage.getItem('auth_key')){
      this.setState({ isLoggedIn: true })
    }
  }

  render() {
    return (
      <div className="app-container">
        <BrowserRouter>
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        <style>{'body { background-color: #84CEEB ; }'}</style>
        <Switch>

          <Route exact path="/view" component={() => {
            if(localStorage.getItem('auth_key')){
              return <ProjectContainer/>
            }else{
              return <Redirect to="/login" />
            }
          }} />

          <Route path="/home" component={() => {
              return <Home/>
          }} />
          
          <Route path="/login" component={() => {
              return <Login handleLogin={this.handleLogin}/>
          }} />

          <Route path="/signup" component={() => {
              return <SignUp handleLogin={this.handleLogin}/>
          }} />

          <Route path="/logout" component={() => {
              localStorage.clear()
              this.setState({ isLoggedIn: false })
              return <Redirect to="/login" />
          }}/>

          <Route exact path="/calander" component={() => {
            if(localStorage.getItem('auth_key')){
              return <Calander/>
            }else{
              return <Redirect to="/login" />
            }
          }} />

        </Switch>
       
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
