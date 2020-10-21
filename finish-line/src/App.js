import React from 'react';
import './App.css';
import Navbar from './components/navbar'
import Login from './components/login'
import SignUp from './components/signup'
import ProjectContainer from './components/projectcontainer'
import Calendar from './components/calendar'
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
    isLoggedIn: false,
    tasks: []
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

  handleNewTask = (taskObj) => {
    this.setState({
      ...this.state,
      tasks: [...this.state.tasks, taskObj]
    })
    console.log(taskObj)
  }

  handleEditTask = (data) => {
    const updatedTask = [...this.state.tasks].map(task => {
      if( task.id === data.id){
        return data
      } else {
        return task
      }
    })

    this.setState({
      ...this.state,
      tasks: updatedTask
    })
  }

  handleDeleteTask = (taskObj) => {
    let newTaskArray = this.state.tasks.filter((task) => {
      return task.id !== taskObj;
    });

    this.setState({
      ...this.state,
      tasks: newTaskArray
    })
  }

  handleDeleteProject = (projectObj) => {
    let newProjectArr = this.state.tasks.filter((task) => {
      return task.project_id !== projectObj
    })
    this.setState({
      tasks: newProjectArr
    })
  }

  render() {
    return (
      <div className="app-container">
        <BrowserRouter>
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        <style>{'body { background-color: #84CEEB ; }'}</style>
        <Switch>

          <Route exact path="/projects" component={() => {
            if(localStorage.getItem('auth_key')){
              return <ProjectContainer handleNewTask={this.handleNewTask} handleEditTask={this.handleEditTask} handleDeleteTask={this.handleDeleteTask} handleDeleteProject={this.handleDeleteProject} />
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
              this.setState({ 
                isLoggedIn: false,
                tasks: [] })
              return <Redirect to="/login" />
          }}/>

          <Route exact path="/calendar" component={() => {
            if(localStorage.getItem('auth_key')){
              return <Calendar tasks={this.state.tasks} />
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
