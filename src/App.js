import React from 'react';
import UserList from './UserList';
import RoleList from './RoleList';
import './styles.css';

// Hacker-style Footer Component
function HackerFooter() {
  return (
    <div className="hacker-footer">
      <div className="footer-content">
        <p><span className="code-green">[System]: </span>Welcome to the RBAC System</p>
        <p><span className="code-green">[IP]: </span>192.168.1.1</p>
        <p><span className="code-green">[Status]: </span>Active - Online</p>
        <p><span className="code-green">[Info]: </span>Developed By [Akash.J]</p>
        <p><span className="code-green">[Note]: </span>Assignment Submitted To [VRV] For FrontEnd Developer Internship</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>RBAC System</h1>
      <UserManagement />
      <RoleManagement />
      <HackerFooter />  {/* Add Footer here */}
    </div>
  );
}

function UserManagement() {
  return (
    <div>
      <h2>User Management</h2>
      <UserList />
      {/* Here, we will display users */}
    </div>
  );
}

function RoleManagement() {
  return (
    <div className="role-management">
      <h2>Role Management</h2>
      <RoleList />
    </div>
  );
}

export default App;
