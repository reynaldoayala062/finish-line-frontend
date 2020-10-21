import React from 'react';
import { Card, Button, Modal, Form, Row, Col} from 'react-bootstrap'
import 'react-bootstrap-table/css/react-bootstrap-table.css'
import Task from './Task'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css"
import moment from 'moment';

class ProjectCard extends React.Component {

    state= {
        show: false,
        title: "",
        comment: "",
        start: "",
        end: "",
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
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let task = {
            title: this.state.title,
            comment: this.state.comment,
            start: this.state.start,
            end: this.state.end,
            project_id: this.state.project_id
        }
        console.log(this.state.title)
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
            this.props.handleNewTask(taskObj)
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
            tasks: newTaskArray
        })
        this.props.handleDeleteTask(taskObj)
    }

    handleEdit = (value) => {
        console.log(this.state.tasks)
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

            this.props.handleEditTask(data)
        })
        
    }

    handleStartDate = (e) => {
        this.setState({
            ...this.state,
            start: moment(e._d).format()
        })
    }

    handleEndDate = (e) => {
        this.setState({
            ...this.state,
            end: moment(e._d).format()
        })
    }

    render() {
        console.log(this.state.tasks)
        return(
            <div className="card-container">
                <div className="project-card">
                    <Card border="primary" style={{ width: '18rem'}}>
                        <Card.Img variant="top" src={this.props.project.image} />
                        <Card.Body>
                            <Card.Title>{this.props.project.name} </Card.Title>
                            <Card.Text>{this.props.project.description}</Card.Text>
                            <div className="button">
                                <Button variant="primary" className="add-button" onClick={this.handleShow}>
                                    Add Task
                                </Button>
                                <br/>
                                <Button variant="danger" className="delete-button" onClick={this.handleDelte}>
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
                                        <Form.Control name="title" onChange={this.handleChange} placeholder="Gym" />
                                        </Col>
                                        <Col>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control name="comment" onChange={this.handleChange} placeholder="Shoulders and Arms" />
                                        </Col>
                                        <Col>
                                        <Form.Label>Start Date</Form.Label>
                                        <Datetime name="start" onChange={(e) => this.handleStartDate(e) } />
                                        </Col>
                                        <Col>
                                        <Form.Label>End Date</Form.Label>
                                        <Datetime name="end" onChange={(e) => this.handleEndDate(e) } />
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