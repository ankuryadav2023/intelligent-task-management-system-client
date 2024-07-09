import React, { useState } from 'react'
import UpdateTask from './UpdateTask';
import { useSelector } from 'react-redux';
import { useOrganization, useUser } from '@clerk/clerk-react';
import axios from 'axios';

const ManageTasks = ({ projectID, tasks }) => {
    const {user}=useUser();
    const {organization,membership}=useOrganization();
    const socket=useSelector(states=>states.socket);
    const [taskDisplay, setTaskDisplay] = useState('none');
    const [taskData, setTaskData] = useState();

    const handleDeleteTask=(projectID,taskID,taskTitle,taskCreatedBy,taskAssignedTo)=>{
        if(!(taskCreatedBy===user.primaryEmailAddress.emailAddress || taskAssignedTo===user.primaryEmailAddress.emailAddress)){
            if(!(membership.role==='org:super_admin' || membership.role==='org:admin')){
                alert('Sorry! You Don\'t Have Permission to Update the Task.');
                return;
            }
        }
        axios.delete(import.meta.env.VITE_BACKEND_API_ROUTE+'delete-task/'+projectID+'/'+taskID)
        .then(data=>{
            alert(data.data.message);
            if(socket){
                socket.emit('task-deleted',organization.id,organization.name,projectID,taskTitle);
            }
        }).catch(error=>{
            alert(error.message);
        })
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <h2 className='mt-4 mb-2'>Task List</h2>
            <table className='table table-hover my-pnt-table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Task ID</th>
                        <th>Created By</th>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id} style={{cursor: 'pointer'}} onClick={() => {
                            setTaskData(task);
                            setTaskDisplay(taskDisplay === 'none' ? 'block' : 'none');
                        }}>
                            <td>{task.title}</td>
                            <td>{task._id}</td>
                            <td>{task.createdBy}</td>
                            <td>{task.assignedTo}</td>
                            <td>{task.status}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.priority}</td>
                            <td><span class="material-symbols-outlined" onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTask(projectID,task._id,task.title,task.createdBy,task.assignedTo);
                            }}>
                                delete
                            </span></td>
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