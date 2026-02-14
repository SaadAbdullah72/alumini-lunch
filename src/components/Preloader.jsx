import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onLoadingComplete, 500); // Wait a bit after 100%
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 150);

        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#0a0a0a',
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white'
            }}
        >
            <div style={{ width: '300px', height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
                <motion.div
                    animate={{ width: `${progress}%` }}
                    style={{
                        height: '100%',
                        background: 'var(--accent-color)',
                        boxShadow: '0 0 10px var(--accent-color)'
                    }}
                />
            </div>
            <h2 style={{
                marginTop: '20px',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                letterSpacing: '2px',
                opacity: 0.8
            }}>
                LOADING EXPERIENCE {progress}%
            </h2>
        </motion.div>
    );
};

export default Preloader;
