import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, LogOut, Upload } from 'lucide-react';

const AdminDashboard = () => {
    const { settings, updateSettings, isAuthenticated, logout } = useAdmin();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(settings);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };



    const handleSave = () => {
        updateSettings(formData);
        alert('Settings Saved Successfully!');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ padding: '100px 20px', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1>Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                <motion.div
                    className="glass-panel"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ padding: '40px' }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Event Title</label>
                            <input
                                type="text"
                                name="eventTitle"
                                value={formData.eventTitle}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Event Date & Time</label>
                            <input
                                type="datetime-local"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Event Highlights Video</label>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
                                <p style={{ fontSize: '0.8rem', color: '#f59e0b' }}>Note: Upload video files (max 10MB). Saved securely to database.</p>
                                <label style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    border: '1px dashed rgba(255,255,255,0.3)'
                                }}>
                                    <Upload size={20} />
                                    {formData.videoUrl && formData.videoUrl.startsWith('data:') ? 'Change Video File' : 'Upload Video File'}
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const maxSize = 10 * 1024 * 1024; // 10MB
                                                if (file.size > maxSize) {
                                                    alert("File is too large! Please choose a video under 10MB.");
                                                    return;
                                                }
                                                // Show loading or processing state if needed
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData(prev => ({ ...prev, videoUrl: reader.result }));
                                                    alert("Video loaded! Click 'Save Changes' to store it.");
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                                {formData.videoUrl && formData.videoUrl.startsWith('data:') && (
                                    <p style={{ color: '#22c55e', fontSize: '0.9rem' }}>✓ Video selected</p>
                                )}
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>Video Rotation:</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {[0, 90, 180, 270].map(deg => (
                                        <button
                                            key={deg}
                                            onClick={() => setFormData(prev => ({ ...prev, videoRotation: deg }))}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '6px',
                                                border: `1px solid ${formData.videoRotation === deg ? '#f59e0b' : 'rgba(255,255,255,0.2)'}`,
                                                background: formData.videoRotation === deg ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                                                color: formData.videoRotation === deg ? '#f59e0b' : 'white',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {deg}°
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <p style={{ marginBottom: '5px', fontSize: '0.9rem', color: '#94a3b8' }}>OR Paste URL (YouTube Embed):</p>
                            <input
                                type="text"
                                name="videoUrl"
                                value={!formData.videoUrl?.startsWith('data:') ? formData.videoUrl : ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                                placeholder="https://www.youtube.com/embed/..."
                                style={inputStyle}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '10px', color: '#94a3b8' }}>Registration Link</label>
                            <input
                                type="text"
                                name="registrationLink"
                                value={formData.registrationLink}
                                onChange={handleChange}
                                placeholder="https://docs.google.com/forms/..."
                                style={inputStyle}
                            />
                        </div>



                        <button onClick={handleSave} className="btn-primary" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                            <Save size={20} /> Save Changes
                        </button>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--glass-border)',
    background: 'rgba(0,0,0,0.2)',
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'inherit'
};

export default AdminDashboard;
