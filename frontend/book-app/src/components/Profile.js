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
    age: '',  // Ensure age is initialized
    gender: ''  // Ensure gender is initialized
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
          age: res.data.age,  // Set age in updatedUser state
          gender: res.data.gender  // Set gender in updatedUser state
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
      setUser(res.data); // Update user state with the updated user data
      setEditMode(false); // Exit edit mode after successful update
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
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="number"
            name="age"
            value={updatedUser.age}
            onChange={handleInputChange}
            placeholder="Age"
            required
          />
          <select
            name="gender"
            value={updatedUser.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
          <p>Gender: {user.gender}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
          <button class='library-btn'>Your Library</button>
        </>
      )}
    </div>
  );
}

export default Profile;
