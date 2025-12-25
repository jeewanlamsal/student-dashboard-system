import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Create Account</h2>
                <input className="w-full p-2 border mb-3 rounded" placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input className="w-full p-2 border mb-3 rounded" placeholder="Email" type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input className="w-full p-2 border mb-3 rounded" placeholder="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
            </form>
        </div>
    );
};

export default Register;