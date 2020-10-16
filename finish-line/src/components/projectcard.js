import React from 'react';
import { Card, Button, Modal, Form, Row, Col} from 'react-bootstrap'
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import Task from './Task'

class ProjectCard extends React.Component {

    state= {
        show: false,
        name: "",
        comment: "",
        tasks: [],
        project_id: this.props.project.id
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let task = {
            name: this.state.name,
            comment: this.state.comment,
            project_id: this.state.project_id
        }
        this.setState({
            show: false
        })
        fetch('http://localhost:3000/tasks', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(task)
        })
        .then(resp => resp.json())
        .then(taskObj => {
            this.setState({
                ...this.state,
                tasks: [...this.state.tasks, taskObj]
            })
        })
    }

    componentDidMount(){ 
        fetch('http://localhost:3000/tasks')
        .then(resp => resp.json())
        .then(taskObj => {
            let taskArray = taskObj.filter((task) => {
                return task.project_id == this.props.project.id
            })
            this.setState({
                ...this.state,
                tasks: taskArray
            })
        })
    }

    handleDelte = () => {
        alert("Project has been deleted")
        this.props.handleDelete(this.state.project_id)
    }

    onDeleteRow = (taskObj) => {
        fetch(`http://localhost:3000/tasks/${taskObj}`, {
            method: "DELETE"
        })
        let newTaskArray = this.state.tasks.filter((task) => {
            return task.id !== taskObj;
        });
        this.setState({
            ...this.state.tasks,
            tasks: newTaskArray})
    }

    handleEdit = (value) => {
        console.log(value)
        fetch(`http://localhost:3000/tasks/${value.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(value)
        })
        .then(resp => resp.json())
        .then(data => {

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
        })
    }

    render() {
        return(
            <div className="card-container">
                <div className="project-card">
                    <Card border="primary" style={{ width: '18rem'}}>
                        <Card.Img variant="top" src={this.props.project.image} />
                        <Card.Body>
                            <Card.Title>{this.props.project.name} </Card.Title>
                            <Card.Text>{this.props.project.description}</Card.Text>
                            <div className="button">
                                <Button variant="primary" onClick={this.handleShow}>
                                    Add Task
                                </Button>
                                <br/>
                                <Button variant="danger" onClick={this.handleDelte}>
                                    Delete Project
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Create Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                    <Row>
                                        <Col>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control name="name" onChange={this.handleChange} placeholder="Gym" />
                                        </Col>
                                        <Col>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control name="comment" onChange={this.handleChange} placeholder="Shoulders and Arms" />
                                        </Col>
                                    </Row>
                                </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="task">
                    <Task tasks={this.state.tasks} onDeleteRow={this.onDeleteRow} handleEdit={this.handleEdit} />
                </div>
            </div>
        )
    }
}

export default ProjectCard