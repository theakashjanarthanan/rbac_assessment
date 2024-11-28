import React, { useState } from 'react';

function RoleList() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'User', permissions: ['Read'] },
  ]);

  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [permissionOptions] = useState(['Read', 'Write', 'Delete']);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setNewRole({ ...newRole, [e.target.name]: e.target.value });
  };

  const handleAddRole = () => {
    if (!newRole.name) {
      setError('Role name is required!');
      return;
    }
    setError('');
    const newRoleObj = { ...newRole, id: roles.length + 1 };
    setRoles([...roles, newRoleObj]);
    setNewRole({ name: '', permissions: [] });
  };

  const handleDeleteRole = (id) => {
    const updatedRoles = roles.filter(role => role.id !== id);
    setRoles(updatedRoles);
  };

  const handleEditRole = (id) => {
    const roleToEdit = roles.find(role => role.id === id);
    setNewRole(roleToEdit);
  };

  const handleSaveEdit = () => {
    if (!newRole.name) {
      setError('Role name is required!');
      return;
    }
    setError('');
    const updatedRoles = roles.map(role => 
      role.id === newRole.id ? newRole : role
    );
    setRoles(updatedRoles);
    setNewRole({ name: '', permissions: [] });
  };

  const handlePermissionChange = (permission) => {
    const updatedPermissions = newRole.permissions.includes(permission)
      ? newRole.permissions.filter(p => p !== permission)
      : [...newRole.permissions, permission];

    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  return (
    <div className="role-list">
      <h3>Role List</h3>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(', ')}</td>
              <td>
                <button onClick={() => handleEditRole(role.id)}>Edit</button>
                <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to add or edit roles */}
      <div className="role-form">
        <h4>{newRole.id ? 'Edit Role' : 'Add New Role'}</h4>
        <input 
          type="text" 
          name="name" 
          value={newRole.name} 
          onChange={handleInputChange} 
          placeholder="Role Name" 
        />
       <div>
  <h5>Permissions</h5>
  {permissionOptions.map((permission) => (
    <label key={permission}>
      <input 
        type="checkbox" 
        checked={newRole.permissions.includes(permission)} 
        onChange={() => handlePermissionChange(permission)} 
      />
      {permission}
    </label>
  ))}
</div>
        {error && <p className="error">{error}</p>}
        {newRole.id ? (
          <button onClick={handleSaveEdit}>Save Changes</button>
        ) : (
          <button onClick={handleAddRole}>Add Role</button>
        )}
      </div>
    </div>
  );
}

export default RoleList;
