import React, { useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob', role: 'User', status: 'Inactive' },
  ]);
  
  const [newUser, setNewUser] = useState({ name: '', role: '', status: 'Active' });
  const [error, setError] = useState('');
  
  const roles = ['Admin', 'User'];  // You can later extend this list

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.role) {
      setError('Name and Role are required!');
      return;
    }
    setError('');
    const newUserObj = { ...newUser, id: users.length + 1 };  // Generate unique ID
    setUsers([...users, newUserObj]);  // Add the new user to the list
    setNewUser({ name: '', role: '', status: 'Active' });  // Reset the form
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setNewUser(userToEdit);  // Pre-fill form with the user's data for editing
  };

  const handleSaveEdit = () => {
    if (!newUser.name || !newUser.role) {
      setError('Name and Role are required!');
      return;
    }
    setError('');
    const updatedUsers = users.map(user => 
      user.id === newUser.id ? newUser : user
    );
    setUsers(updatedUsers);  // Update the user list with the edited user
    setNewUser({ name: '', role: '', status: 'Active' });  // Reset the form
  };

  return (
    <div className="user-list">
      <h3>User List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to add or edit users */}
      <div className="user-form">
        <h4>{newUser.id ? 'Edit User' : 'Add New User'}</h4>
        {error && <p className="error">{error}</p>}
        <input 
          type="text" 
          name="name" 
          value={newUser.name} 
          onChange={handleInputChange} 
          placeholder="Name" 
        />
        <select 
          name="role" 
          value={newUser.role} 
          onChange={handleInputChange}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <select 
          name="status" 
          value={newUser.status} 
          onChange={handleInputChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {newUser.id ? (
          <button onClick={handleSaveEdit}>Save Changes</button>
        ) : (
          <button onClick={handleAddUser}>Add User</button>
        )}
      </div>
    </div>
  );
}

export default UserList;
