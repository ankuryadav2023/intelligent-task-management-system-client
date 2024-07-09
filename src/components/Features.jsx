import React from 'react'

const Features = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className="card feature-container">
                <div className="card-header">
                </div>
                <div className="card-body">
                    <h5 className="card-title">User Authentication by Clerk</h5>
                    <p className="card-text">Ensure secure and seamless authentication for all users with Clerk's comprehensive authentication solutions. Users can sign up, log in, and manage their accounts securely. This feature leverages Clerk's robust security protocols to protect user data and enhance user experience.</p>
                </div>
            </div>
            <div className="card feature-container">
                <div className="card-header">
                </div>
                <div className="card-body">
                    <h5 className="card-title">Organization Creation and Management</h5>
                    <p className="card-text">Users can create and manage organizations, allowing them to structure their projects and teams effectively. This feature enables users to define organization details, invite members, and assign roles, fostering better collaboration and organization-wide management.

                    </p>
                </div>
            </div>
            <div className="card feature-container">
                <div className="card-header">
                </div>
                <div className="card-body">
                    <h5 className="card-title">Project Creation and Management within Organizations</h5>
                    <p className="card-text">Users can create and manage projects within their organizations. This feature allows for organizing projects under specific organizations, making it easy to track and manage project-specific tasks, deadlines, and team members.

                    </p>
                </div>
            </div>
            <div className="card feature-container">
                <div className="card-header">
                </div>
                <div className="card-body">
                    <h5 className="card-title">Task Creation and Management under Projects</h5>
                    <p className="card-text">Users can create, update, and manage tasks within their projects. Set due dates, assign priorities, and categorize tasks by status. This feature ensures that all tasks are organized and trackable within the context of a project, enhancing team productivity and project management.</p>
                </div>
            </div>
            <div className="card feature-container">
                <div className="card-header">
                </div>
                <div className="card-body">
                    <h5 className="card-title">Real-Time Chat for Seamless Collaboration</h5>
                    <p className="card-text">Enhance team collaboration with our real-time chat feature, allowing organization members to communicate instantly. Stay connected, share updates, and resolve issues quickly to ensure your projects run smoothly.</p>
                </div>
            </div>
            <div className="card feature-container">
                <div className="card-header">
                </div>
                <div className="card-body">
                    <h5 className="card-title">AI-Powered Helpful Assistant</h5>
                    <p className="card-text">Our intelligent AI assistant helps streamline your project management by suggesting names, descriptions, and much more for your projects and tasks. Enjoy a more efficient workflow and improved organization with the support of advanced AI capabilities.</p>
                </div>
            </div>
        </div>
    )
}

export default Features