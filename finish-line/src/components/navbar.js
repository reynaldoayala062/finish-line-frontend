import React from 'react';
import { NavLink } from 'react-router-dom';

const handleLoginRender = (isLoggedIn) => {
  if(isLoggedIn){
    return (
      <a className="ui item">
        <NavLink to="/logout">Logout</NavLink>
      </a>
    )
  }else{
    return(
      <>
        <a className="ui item">
          <NavLink to="/login">Login</NavLink>
        </a>
        <a className="ui item">
          <NavLink to="/signup">Signup</NavLink>
        </a>
      </>
    )
  }
}

class Navbar extends React.Component {

  
  render() {
    return (
      <div className="ui secondary  menu">
          <a className="active item">
          <NavLink to="/home">Home</NavLink>
          </a>
          <a className="item">
          <NavLink to="/view">Projects</NavLink>
          </a>
          <a className="item" >
          <NavLink to="/calander">Calander</NavLink>
          </a>
          <div className="right menu">
            <div className="item">
                
            </div>
            {
              handleLoginRender(this.props.isLoggedIn)
            }
          </div>
      </div>
    )
  }
}

export default Navbar