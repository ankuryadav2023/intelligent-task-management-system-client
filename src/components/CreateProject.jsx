import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CreateProject = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const navigate = useNavigate();
    const socket = useSelector(states => states.socket);

    useEffect(() => {
        if (isLoaded) {
            if (!isSignedIn) {
                location.href = 'https://sunny-bass-40.accounts.dev/sign-in';
            }
            else {
                setProjectData({
                    name: '',
                    description: '',
                    createdBy: user.primaryEmailAddress.emailAddress,
                    organizationID: user.organizationMemberships[0].organization.name + '(' + user.organizationMemberships[0].organization.id + ')',
                    status: 'Pending',
                    dueDate: '',
                    priority: 'Medium',
                })
            }
        }
    }, [isSignedIn, isLoaded, navigate]);
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        createdBy: '',
        organizationID: '',
        status: 'Pending',
        dueDate: '',
        priority: 'Medium',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(import.meta.env.VITE_BACKEND_API_ROUTE + 'create-project', projectData)
            .then(data => {
                alert(data.data.message);
                if (socket) {
                    socket.emit('new-project-created', projectData.organizationID, projectData.name)
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
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label my-form2-label">Project name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={projectData.name}
                                onChange={handleChange}
                                className="form-control my-form2-input"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label my-form2-label">Project description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                value={projectData.description}
                                onChange={handleChange}
                                className="form-control my-form2-input"
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="createdBy" className="form-label my-form2-label">Created by</label>
                            <input
                                type="text"
                                id="createdBy"
                                name="createdBy"
                                value={projectData.createdBy}
                                onChange={handleChange}
                                className="form-control my-form2-input"
                                required
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="organizationID" className="form-label my-form2-label">Organization ID</label>
                            <select
                                id="organizationID"
                                name="organizationID"
                                value={projectData.organizationID}
                                onChange={handleChange}
                                className="form-select my-form2-input"
                                required
                            >
                                {user.organizationMemberships.map((organization) => (
                                    <option key={organization.organization.id} value={organization.organization.id}>
                                        {organization.organization.name} ({organization.organization.id})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label my-form2-label">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={projectData.status}
                                onChange={handleChange}
                                className="form-select my-form2-input"
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label my-form2-label">Due date</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={projectData.dueDate}
                                onChange={handleChange}
                                className="form-control my-form2-input"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="priority" className="form-label my-form2-label">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={projectData.priority}
                                onChange={handleChange}
                                className="form-select my-form2-input"
                                required
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary my-form2-btn">Create Project</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;
