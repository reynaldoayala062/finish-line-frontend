import React from 'react';
import ScrollArea from '@xico2k/react-scroll-area';
import ProjectForm from './projectform'
import ProjectCard from './projectcard'

class ProjectContainer extends React.Component {

    state = {
        projects: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/projects')
        .then(resp => resp.json())
        .then(projects => {

            const userProjects = projects.filter((project) => {
                return project.user_id == localStorage.getItem('user_id')
            })

            this.setState({
                projects: userProjects
            })
        }
            
        )
    }

    handleNewProject = (project) => {
        this.setState({
            ...this.state,
            projects: [...this.state.projects, project]
        })
        alert("Project has been created")
    }

    handleDelete = (id) => {
        fetch(`http://localhost:3000/projects/${id}`, {
            method: "DELETE"
        })
        let newProjectArray = this.state.projects.filter((project) => {
            return project.id !== id
        })
        this.setState({
            projects: newProjectArray
        })
    }


    render() {
        console.log(this.state.projects)
        return (
            <div className="project-container">
                <div className="view-project">
                    <ScrollArea 
                    height="465px"
                    width="500"
                    trackHidden>
                        <h1> Create Project </h1>
                        <ProjectForm handleNewProject={this.handleNewProject} />
                        <br/>
                        {this.state.projects.map(project => <ProjectCard key={project.id} project={project} handleDelete={this.handleDelete} />)}
                    </ScrollArea>
                </div>
            </div>
        )
    }
}

export default ProjectContainer