import React, { useState } from 'react'
import UpdateTask from './UpdateTask';

const ManageTasks = ({ projectID, tasks }) => {
    const [taskDisplay, setTaskDisplay] = useState('none');
    const [taskData, setTaskData] = useState();
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <h2 className='mt-4 mb-2'>Task List</h2>
            <table className='table table-hover my-pnt-table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Task ID</th>
                        <th>Created By</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id} onClick={() => {
                            setTaskData(task);
                            setTaskDisplay(taskDisplay === 'none' ? 'block' : 'none');
                        }}>
                            <td>{task.title}</td>
                            <td>{task._id}</td>
                            <td>{task.createdBy}</td>
                            <td>{task.status}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.priority}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {taskDisplay === 'block' ?
                <div id="task-container" className='d-flex flex-column justify-content-center align-items-center' style={{ display: taskDisplay }}>
                    <UpdateTask projectID={projectID} taskData={taskData} />
                </div> : <></>}
        </div>
    )
}

export default ManageTasks