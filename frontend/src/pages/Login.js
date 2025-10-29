import React, { useState } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', credentials);
      localStorage.setItem('token', data.token);
      window.location.reload();
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Login</h2>
        <input name="username" placeholder="Username" onChange={handleChange} className="block w-full p-2 mb-2 border" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block w-full p-2 mb-2 border" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
};

export default Login;