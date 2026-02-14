import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials');
            motion.div
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-color)'
        }}>
            <motion.div
                className="glass-panel"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ padding: '40px', width: '100%', maxWidth: '400px', textAlign: 'center' }}
            >
                <Lock size={48} color="var(--accent-color)" style={{ marginBottom: '20px' }} />
                <h2 style={{ marginBottom: '20px' }}>Admin Access</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'white',
                            fontSize: '1rem'
                        }}
                    />
                    {error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>}

                    <button type="submit" className="btn-primary">
                        Login
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
