import React,{useState} from 'react'
import { useOrganization, useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UpdateTask = ({projectID,taskData}) => {
    const {user}=useUser();
    const {organization,membership}=useOrganization();
    const [newTaskData, setNewTaskData] = useState(taskData);
    const socket=useSelector(states=>states.socket);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTaskData({
            ...newTaskData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!(taskData.createdBy===user.primaryEmailAddress.emailAddress || taskData.assignedTo===user.primaryEmailAddress.emailAddress)){
            if(!(membership.role==='org:super_admin' || membership.role==='org:admin')){
                alert('Sorry! You Don\'t Have Permission to Update the Task.');
                return;
            }
        }
        axios.post(import.meta.env.VITE_BACKEND_API_ROUTE+'update-task/'+projectID+'/'+taskData._id,newTaskData)
        .then(data=>{
            alert(data.data.message);
            if(socket){
                socket.emit('task-updated',organization.id,organization.name,projectID,newTaskData.title);
            }
        }).catch(error=>{
            alert(error.message);
        })
    };
    if (!user) {
        return (
            <div className="d-flex justify-content-center align-items-center my-spinner-container">
                <div className="spinner-border my-spinner" role="status">
                </div>
                <span className="ms-3 fs-3">Please Wait...</span>
            </div>
        );
    }
    return (
        <div className='conatiner mt-3 d-flex justify-content-center my-form'>
            <form onSubmit={handleSubmit} className="my-form2">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label my-form2-label">Task title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control my-form2-input"
                        value={newTaskData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label my-form2-label">Task description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control my-form2-input"
                        rows="3"
                        value={newTaskData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="createdBy" className="form-label my-form2-label">Created By</label>
                    <input
                        type="text"
                        id="createdBy"
                        name="createdBy"
                        className="form-control my-form2-input"
                        value={newTaskData.createdBy}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="assignedTo" className="form-label my-form2-label">Assigned To</label>
                    <input
                        type="email"
                        id="assignedTo"
                        name="assignedTo"
                        className="form-control my-form2-input"
                        value={newTaskData.assignedTo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="projectID" className="form-label my-form2-label">Project ID</label>
                    <input
                        type='text'
                        id="projectID"
                        name="projectID"
                        className="form-control my-form2-input"
                        value={projectID}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label my-form2-label">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="form-select my-form2-input"
                        value={newTaskData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='dueDate' className="form-label my-form2-label">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        className='form-control my-form2-input'
                        value={newTaskData.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="priority" className="form-label my-form2-label">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        className="form-select my-form2-input"
                        value={newTaskData.priority}
                        onChange={handleChange}
                        required
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary my-form2-btn">Update Task</button>
            </form>
        </div>
    );
}

export default UpdateTask