import React,{useState} from 'react'
import { useOrganization, useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const UpdateProject = ({projectData}) => {
    const {user}=useUser();
    const [newProjectData, setNewProjectData] = useState(projectData);
    const socket=useSelector(states=>states.socket);
    const {organization,membership}=useOrganization();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProjectData({
            ...newProjectData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!(projectData.createdBy===user.primaryEmailAddress.emailAddress)){
            if(!(membership.role==='org:super_admin' || membership.role==='org:admin')){
                alert('Sorry! You Don\'t Have Permission to Update the Project.');
                return;
            }
        }
        axios.post(import.meta.env.VITE_BACKEND_API_ROUTE+'update-project',newProjectData)
        .then(data=>{
            alert(data.data.message);
            if(socket){
                socket.emit('project-updated',organization.id,organization.name,projectData._id,projectData.name);
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
                    <label htmlFor="name" className="form-label my-form2-label">Project name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control my-form2-input"
                        value={newProjectData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label my-form2-label">Project description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control my-form2-input"
                        rows="3"
                        value={newProjectData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="createdBy" className="form-label my-form2-label">Created By</label>
                    <input
                        type="text"
                        id="createdBy"
                        name="createdBy"
                        className="form-control my-form2-input"
                        value={newProjectData.createdBy}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="organizationID" className="form-label my-form2-label">Organization ID</label>
                    <select
                        id="organizationID"
                        name="organizationID"
                        className="form-select my-form2-input"
                        value={newProjectData.organizationID}
                        onChange={handleChange}
                        required
                    >
                        {user.organizationMemberships.map(organization => {
                            return (
                                <option value={organization.organization.id}>{organization.organization.name + '(' + organization.organization.id + ')'}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label my-form2-label">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="form-select my-form2-input"
                        value={newProjectData.status}
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
                    <label htmlFor="dueDate" className="form-label my-form2-label">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        className="form-control my-form2-input"
                        value={newProjectData.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="priority" className="form-label my-form2-label">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        className='form-select my-form2-input'
                        value={newProjectData.priority}
                        onChange={handleChange}
                        required
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary my-form2-btn">Update Project</button>
            </form>
        </div>
    );
}

export default UpdateProject