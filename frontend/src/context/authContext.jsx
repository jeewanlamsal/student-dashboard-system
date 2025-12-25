import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        // FIX: Add check for "undefined" string
        if (token && storedUser && storedUser !== "undefined") {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Auth initialization error:", error);
                localStorage.clear(); // Clear corrupt data
            }
        } else {
            // Clean up if data is partial or corrupted
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        setLoading(false);
    }, []);

    const login = (data) => {
        // Based on your backend: data usually looks like { token, name, email, _id }
        // or { token, user: { ... } }. Let's handle both.
        const userData = data.user ? data.user : { 
            name: data.name, 
            email: data.email, 
            _id: data._id 
        };

        if (data.token && userData.email) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            navigate('/dashboard');
        } else {
            console.error("Login failed: Invalid data structure received from server");
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);