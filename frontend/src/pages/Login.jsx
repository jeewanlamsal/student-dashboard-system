import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import the hook

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth(); // Destructure login function from context
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', formData);
            // res.data contains { token, user: { id, name, email } }
            login(res.data); // This saves token/user to LocalStorage & updates Context
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Student Login</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        type="email" 
                        required
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        type="password" 
                        required
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    />
                </div>

                <button className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition duration-200">
                    Login
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;