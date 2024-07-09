import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser, useOrganization } from "@clerk/clerk-react";
import {useDispatch, useSelector} from 'react-redux';
import logo from '../assets/zaptask-logo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user } = useUser();
    const { organization } = useOrganization();
    const {socket,newChatMessages} = useSelector(states => states);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (user && organization) {
            if (socket === null) {
                dispatch({ type: 'INITIALIZE_SOCKET' });
            } else {
                socket.emit('join-room', organization.id);

                const handleNewProjectCreated = (organizationID, projectName) => {
                    alert('New Project Created with Name ' + projectName + ' in organization ' + organizationID);
                };

                const handleNewTaskCreated = (organizationID, organizationName, projectID, taskTitle) => {
                    alert('New Task Created with title ' + taskTitle + ' in Project ' + projectID + ' in organization ' + organizationName + ' (' + organizationID + ')');
                };

                const handleProjectUpdated = (organizationID, organizationName, projectID, projectName) => {
                    alert('Project with name ' + projectName + ' (' + projectID + ') in organization ' + organizationName + ' (' + organizationID + ') Updated.');
                };

                const handleTaskUpdated = (organizationID, organizationName, projectID, taskTitle) => {
                    alert('Task with title ' + taskTitle + ' in project ' + projectID + ' in organization ' + organizationName + ' (' + organizationID + ') Updated.');
                };

                const handleProjectDeleted = (organizationID, organizationName, projectID, projectName) => {
                    alert('Project with name ' + projectName + ' (' + projectID + ') in organization ' + organizationName + ' (' + organizationID + ') Deleted.');
                };

                const handleTaskDeleted = (organizationID, organizationName, projectID, taskTitle) => {
                    alert('Task with title ' + taskTitle + ' in project ' + projectID + ' in organization ' + organizationName + ' (' + organizationID + ') Deleted.');
                };

                const handleRecieveMessage=(peerFullName,message)=>{
                    dispatch({
                            type: 'ADD_RECIEVED_MESSAGE',
                            payload: {
                                user: peerFullName,
                                text: message
                            }
                    });
                    if(location.href!==import.meta.env.VITE_CHAT_PAGE_URL) dispatch({type:'NEW_MESSAGE'});
                }

                socket.off('new-project-created2', handleNewProjectCreated);
                socket.off('new-task-created2', handleNewTaskCreated);
                socket.off('project-updated2', handleProjectUpdated);
                socket.off('task-updated2', handleTaskUpdated);
                socket.off('project-deleted2', handleProjectDeleted);
                socket.off('task-deleted2', handleTaskDeleted);
                socket.off('recieve-message', handleRecieveMessage);

                socket.on('new-project-created2', handleNewProjectCreated);
                socket.on('new-task-created2', handleNewTaskCreated);
                socket.on('project-updated2', handleProjectUpdated);
                socket.on('task-updated2', handleTaskUpdated);
                socket.on('project-deleted2', handleProjectDeleted);
                socket.on('task-deleted2', handleTaskDeleted);
                socket.on('recieve-message', handleRecieveMessage);
            }
        }

        return () => {
            if (socket) {
                socket.off('new-project-created2');
                socket.off('new-task-created2');
                socket.off('project-updated2');
                socket.off('task-updated2');
                socket.off('project-deleted2');
                socket.off('task-deleted2');
                socket.off('recieve-message');
            }
        };
    }, [user, socket, organization, dispatch]);
    if (user) {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary my-navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text" />
                        ZapTask
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/features">Features</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/chat">Chat{newChatMessages>0?'('+newChatMessages.toString()+')':''}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <UserButton />
            </nav>
        )
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mynavbar">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text" />
                    ZapTask
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/features">Features</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <SignInButton className="auth-btn" />
            <SignUpButton className="auth-btn" />
        </nav>
    )
}

export default Navbar