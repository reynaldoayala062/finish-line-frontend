import React from 'react';
import { Form, Modal, Button, Show, Col } from 'react-bootstrap'

class ProjectForm extends React.Component {

    state = {
        name: "",
        image: "",
        description: "",
        user_id: localStorage.getItem('user_id')
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/projects', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(projectObj => {
            this.props.handleNewProject(projectObj)
        })

    }
    
    render() {
        return(
            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control name="name" onChange={this.handleChange} type="text" placeholder="Project Name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="image" onChange={this.handleChange} type="text" placeholder="Image" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" onChange={this.handleChange} as="textarea" rows="1"/>
                        </Form.Group>
                    </Form.Row>

                    <Button onClick={this.handleSubmit} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default ProjectForm