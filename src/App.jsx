import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import CreateOrganizationPage from './components/CreateOrganizationPage';
import ManageOrganizationsPage from './components/ManageOrganizationsPage';
import CreateProject from './components/CreateProject';
import CreateTask from './components/CreateTask';
import ManageProjects from './components/ManageProjects';
import Features from './components/Features';
import Chat from './components/Chat';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route
          path="/sign-in"
          element={
            <SignInPage />
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignUpPage />
          } />
        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />
        <Route
          path="/create-organization"
          element={
            <CreateOrganizationPage />
          }
        />
        <Route
          path="/manage-organizations"
          element={
            <ManageOrganizationsPage />
          }
        />
        <Route
          path="/manage-projects"
          element={
            <ManageProjects />
          }
        />
        <Route
          path="/create-project"
          element={
            <CreateProject />
          }
        />
        <Route
          path="/create-task"
          element={
            <CreateTask />
          }
        />
        <Route
          path="/chat"
          element={
            <Chat />
          }
        />
        <Route
          path="/features"
          element={
            <Features />
          }
        />
      </Routes>
      <Chatbot />
    </BrowserRouter>
  )
}

export default App