import React, { useState, useEffect } from 'react';
import { useOrganization, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CreateTask = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const navigate = useNavigate();
    const { organization } = useOrganization();
    const socket = useSelector(states => states.socket);

    useEffect(() => {
        if (isLoaded) {
            if (!isSignedIn) {
                location.href = 'https://sunny-bass-40.accounts.dev/sign-in';
            } else {
                setTaskData({
                    title: '',
                    description: '',
                    createdBy: user.primaryEmailAddress.emailAddress,
                    assignedTo: '',
                    projectID: '',
                    status: 'Pending',
                    dueDate: '',
                    priority: 'Medium',
                })
            }
        }
    }, [isSignedIn, isLoaded, navigate]);
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        createdBy: '',
        assignedTo: '',
        projectID: '',
        status: 'Pending',
        dueDate: '',
        priority: 'Medium',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(import.meta.env.VITE_BACKEND_API_ROUTE + 'create-task', taskData)
            .then(data => {
                alert(data.data.message);
                if (socket) {
                    socket.emit('new-task-created', organization.id, organization.name, taskData.projectID, taskData.title);
                }
            }).catch(error => {
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
        <div className="d-flex justify-content-center my-4">
            <div className="row justify-content-center my-form">
                <div className="col-md-6 my-form2">
                    <form onSubmit={handleSubmit} >
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label my-form2-label">Task title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control my-form2-input"
                                value={taskData.title}
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
                                value={taskData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="createdBy" className="form-label my-form2-label">Created by</label>
                            <input
                                type="text"
                                id="createdBy"
                                name="createdBy"
                                className="form-control my-form2-input"
                                value={taskData.createdBy}
                                onChange={handleChange}
                                required
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="assignedTo" className="form-label my-form2-label">Assigned to</label>
                            <input
                                type="email"
                                id="assignedTo"
                                name="assignedTo"
                                className="form-control my-form2-input"
                                value={taskData.assignedTo}
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
                                value={taskData.projectID}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label my-form2-label">Status</label>
                            <select
                                id="status"
                                name="status"
                                className="form-select my-form2-input"
                                value={taskData.status}
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
                            <label htmlFor='dueDate' className="form-label my-form2-label">Due date</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                className="form-control my-form2-input"
                                value={taskData.dueDate}
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
                                value={taskData.priority}
                                onChange={handleChange}
                                required
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary my-form2-btn">Create Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;
