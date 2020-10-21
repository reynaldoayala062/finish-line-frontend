import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

class Calendar extends React.Component {

    state = {
        tasks: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/tasks')
        .then(resp => resp.json())
        .then(tasks => {

        const userTasks = tasks.filter((task) => {
            return task.project.user_id == localStorage.getItem('user_id')
        })

        let events = []

        userTasks.map(event => (
            events.push({title: event.title, start: event.start, end: event.end})
        ))
        this.setState({
            tasks: events
        })
    })
    }

    render() {
        return(
            <div className="calendar-container">
                <div className="filler">
                    <h1>Calendar</h1>
                    <div className="calendar">
                        <FullCalendar
                            plugins={[ dayGridPlugin]}
                            initialView="dayGridWeek"
                            events={
                                this.state.tasks
                            }
                            eventClick= {function(info) {
                                alert('Event: ' + info.event.title);
                                console.log(info.event.title)
                            }}
                            
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Calendar