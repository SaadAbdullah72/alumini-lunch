import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import NetworkBackground from './NetworkBackground';

const Hero = ({ title }) => {
    const { settings } = useAdmin();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        setMousePosition({ x, y });
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <NetworkBackground />

            {/* Spotlight Effect */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.08) 0%, transparent 40%)`,
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                background: 'var(--accent-color)',
                filter: 'blur(150px)',
                opacity: 0.1,
                borderRadius: '50%',
                top: '-10%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 0
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ zIndex: 2, textAlign: 'center' }}
            >
                {settings.logo && (
                    <motion.img
                        src={settings.logo}
                        alt="Society Logo"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            height: '120px',
                            marginBottom: '2rem',
                            borderRadius: '50%',
                            boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
                        }}
                    />
                )}

                <h1 className="shimmer-text" style={{
                    fontSize: '4rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    letterSpacing: '-1px'
                }}>
                    {title}
                </h1>

                <p className="gradient-heading" style={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    background: 'linear-gradient(to right, #94a3b8, #f8fafc, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% auto',
                    animation: 'shine 3s linear infinite'
                }}>
                    Join us for an afternoon of networking, nostalgia, and celebration.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                style={{ position: 'absolute', bottom: '40px' }}
            >
                <div style={{
                    width: '30px',
                    height: '50px',
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderRadius: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '10px'
                }}>
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{
                            width: '6px',
                            height: '6px',
                            background: 'white',
                            borderRadius: '50%'
                        }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
