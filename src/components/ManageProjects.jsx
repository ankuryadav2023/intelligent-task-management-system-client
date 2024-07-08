import React, { useState, useEffect } from 'react';
import { useUser, useOrganization } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UpdateProject from './UpdateProject';
import ManageTasks from './ManageTasks';
import { useDispatch, useSelector } from 'react-redux';

const ManageProjects = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { organization } = useOrganization();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [projectDisplay, setProjectDisplay] = useState('none');
    const [projectData, setProjectData] = useState();
    const [tasks, setTasks] = useState();

    useEffect(() => {
        if (isLoaded) {
            if (!isSignedIn) {
                location.href = 'https://sunny-bass-40.accounts.dev/sign-in';
            }
        }
    }, [isSignedIn, isLoaded, navigate]);
    async function fetchProjects() {
        axios.get(import.meta.env.VITE_BACKEND_API_ROUTE + 'get-projects/?organizationID=' + organization.name+'('+organization.id+')')
            .then(data => {
                setProjects(data.data.projects);
            }).catch(error => {
                console.log(error);
                alert('Sorry! Some Error Occured. Please Refresh the Page.');
            })
    }
    useEffect(() => {
        if (user && organization) {
            fetchProjects();
        }
    }, [user, organization])

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
        <div className="d-flex flex-column justify-content-center align-items-center my-4">
            <h2 className='mt-2 mb-2'>Project List</h2>
            <table className="table table-hover my-pnt-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Project ID</th>
                        <th>Created By</th>
                        <th>Organization ID</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project._id} onClick={() => {
                            setProjectData(project);
                            setTasks(project.tasks);
                            setProjectDisplay(projectDisplay === 'none' ? 'block' : 'none');
                        }}>
                            <td>{project.name}</td>
                            <td>{project._id}</td>
                            <td>{project.createdBy}</td>
                            <td>{project.organizationID}</td>
                            <td>{project.status}</td>
                            <td>{project.dueDate}</td>
                            <td>{project.priority}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {projectDisplay === 'block' ?
                <div id="project-container" className='d-flex flex-column justify-content-center align-items-center' style={{ display: projectDisplay }}>
                    <UpdateProject projectData={projectData} />
                    <ManageTasks projectID={projectData._id} tasks={tasks} />
                </div> : <></>}
        </div>
    )
}

export default ManageProjects