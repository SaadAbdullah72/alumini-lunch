import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
    const { settings } = useAdmin();

    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            margin: '20px',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', gap: '10px' }}>
                {settings.logo ? (
                    <img src={settings.logo} alt="Logo" style={{ height: '40px', borderRadius: '50%' }} />
                ) : (
                    <GraduationCap size={32} color="var(--accent-color)" />
                )}
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                    Alumni Lunch
                </span>
            </Link>
            <div>
                <Link to="/admin" style={{ color: 'var(--text-color)', textDecoration: 'none', opacity: 0.7, fontSize: '0.9rem' }}>
                    Admin Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
