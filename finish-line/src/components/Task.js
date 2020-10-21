import React from 'react';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

let ReactBsTable  = require('react-bootstrap-table');
let BootstrapTable = ReactBsTable.BootstrapTable;
let TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class Task extends React.Component {

    onDeleteRow = (e) => {
        this.props.onDeleteRow(e[0])
    }

    handleClick = (value) => {
        this.props.handleEdit(value)
    }

    render() {
        let itemDatas = this.props.tasks !== undefined ? this.props.tasks.map(task => task) : null
        const cellEditProp = {
            mode: 'click',
            afterSaveCell: this.handleClick
        }
        return (
            <div className="task-container">
                <BootstrapTable data={itemDatas} cellEdit={ cellEditProp } deleteRow={ true } selectRow={ { mode: 'radio' } } options={ { onDeleteRow: this.onDeleteRow } } striped hover > 
                            <TableHeaderColumn isKey={true} dataField='id' dataAlign='left' width='0' >Id</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' dataAlign='left' width='40' >Task</TableHeaderColumn>
                            <TableHeaderColumn dataField='comment' dataSort={true} headerAlign='right' dataAlign='right' width='80' >Comment</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default Task