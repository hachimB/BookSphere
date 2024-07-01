import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
        setUpdatedUser({
          name: res.data.name,
          email: res.data.email,
          age: res.data.age,
          gender: res.data.gender
        });
      } catch (err) {
        console.error('Error fetching user:', err);
        window.location.href = '/login';
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');

    try {
      const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {editMode ? (
        <form onSubmit={handleUpdate} className="profile-form">
          <label className="profile-label">
            Name:
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
              className="profile-input"
              placeholder="Name"
              required
            />
          </label>
          <label className="profile-label">
            Email:
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              className="profile-input"
              placeholder="Email"
              required
            />
          </label>
          <label className="profile-label">
            Age:
            <input
              type="number"
              name="age"
              value={updatedUser.age}
              onChange={handleInputChange}
              className="profile-input"
              placeholder="Age"
              required
            />
          </label>
          <label className="profile-label">
            Gender:
            <select
              name="gender"
              value={updatedUser.gender}
              onChange={handleInputChange}
              className="profile-input"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <div className="profile-buttons">
            <button type="submit" className="profile-submit-btn">Save</button>
            <button type="button" onClick={() => setEditMode(false)} className="profile-cancel-btn">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <h2>User Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <button onClick={() => setEditMode(true)} className="profile-edit-btn">Edit Profile</button>
          <button className="profile-library-btn">Your Library</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
