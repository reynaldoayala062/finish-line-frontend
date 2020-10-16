import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {
    withRouter
  } from 'react-router';

class Signup extends React.Component {

    state = {
        username: "",
        password: "",
        errors: {}
    }

    handleinput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.username) {
          formIsValid = false;
          errors["username"] = "*Please enter your username.";
        }
        if (typeof this.state.username !== "undefined") {
          if (!this.state.username.match(/^[a-zA-Z]*$/)) {
            formIsValid = false;
            errors["username"] = "*Please enter alphabet characters only.";
          }
        }
        if (!this.state.password) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }
        
        if (typeof this.state.password !== "undefined") {
            if (!this.state.password.match(/^[a-zA-Z0-9].*$/)) {
              formIsValid = false;
              errors["password"] = "*Please use letters and numbers only.";
            }
        }

        this.setState({
          errors: errors
        });
        return formIsValid;

    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('hello')
        if (this.validateForm()) {
            this.setState({
                username: "",
                password: ""
            });
            console.log('b')
            alert("Form submitted");
            const newUser = {
                user: {
                    username: this.state.username,
                    password: this.state.password
                }
            }
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(token => {
                localStorage.setItem('auth_key',token['auth_key'])
                localStorage.setItem('user_id',token['user_id'])
                this.props.handleLogin()
                this.props.history.push('/')
                console.log(token['auth_key'])
                console.log(token.user_id)
            })
        }
    }

    render() {
        return (
            <div className="background">
                <div className="container">
                    <div className="login-form">
                        <Form className="form" onSubmit={this.handleSubmit}>
                            <h2>Become a Member </h2>
                            <Form.Field>
                                <h5>Username</h5>
                                <input value={this.state.username} onChange={this.handleinput} name="username" placeholder='Username' />
                                <div className="errorMsg">{this.state.errors.username}</div>
                            </Form.Field>
                            <Form.Field>
                                <h5>Password</h5>
                                <input value={this.state.password} onChange={this.handleinput} type="password" name="password" placeholder='Password' />
                                <div className="errorMsg">{this.state.errors.password}</div>
                            </Form.Field>
                            <Button type='submit'> Sign up </Button>
                        </Form>
                        <br/>
                        <Button><Link to="/login">  Already a Member </Link></Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signup)