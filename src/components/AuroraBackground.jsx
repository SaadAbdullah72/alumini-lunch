import React from 'react';
import { motion } from 'framer-motion';

const AuroraBackground = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
            background: '#0f172a' // Dark base
        }}>
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.4, 0.6, 0.4]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    width: '70%',
                    height: '70%',
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(0,0,0,0) 70%)', // Gold
                    filter: 'blur(80px)',
                    borderRadius: '40%'
                }}
            />

            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '30%',
                    right: '-10%',
                    width: '60%',
                    height: '60%',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(0,0,0,0) 70%)', // Blue
                    filter: 'blur(100px)',
                    borderRadius: '50%'
                }}
            />

            <motion.div
                animate={{
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '20%',
                    width: '80%',
                    height: '50%',
                    background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, rgba(0,0,0,0) 70%)', // Warm Red/Orange
                    filter: 'blur(90px)',
                    borderRadius: '30%'
                }}
            />

            {/* Mesh overlay for texture */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.3
            }}></div>
        </div>
    );
};

export default AuroraBackground;
