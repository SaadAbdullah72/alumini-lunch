import React from 'react';
import { motion } from 'framer-motion';

const Shape = ({ type, style, delay, duration }) => {
    return (
        <motion.div
            initial={{ y: 0, rotate: 0 }}
            animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
            style={{
                position: 'absolute',
                ...style
            }}
        >
            {/* Glassmorphism Shape */}
            <div style={{
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                transform: type === 'cube' ? 'rotate(45deg)' : 'none',
                borderRadius: type === 'circle' ? '50%' : type === 'cube' ? '10px' : '0',
                clipPath: type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
            }} />
        </motion.div>
    );
};

const GeometricBackground = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
            background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)' // Dark depth
        }}>
            {/* Add grid pattern for architectural feel */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                opacity: 0.2
            }}></div>

            {/* Floating Shapes */}
            <Shape
                type="cube"
                duration={8}
                delay={0}
                style={{ width: '150px', height: '150px', top: '15%', left: '10%', opacity: 0.4 }}
            />

            <Shape
                type="triangle"
                duration={12}
                delay={2}
                style={{ width: '200px', height: '200px', top: '60%', right: '15%', opacity: 0.3 }}
            />

            <Shape
                type="circle"
                duration={10}
                delay={1}
                style={{ width: '100px', height: '100px', bottom: '20%', left: '20%', opacity: 0.2 }}
            />

            <Shape
                type="cube"
                duration={15}
                delay={3}
                style={{ width: '80px', height: '80px', top: '10%', right: '25%', opacity: 0.2 }}
            />

            <Shape
                type="triangle"
                duration={9}
                delay={1.5}
                style={{ width: '120px', height: '120px', top: '40%', left: '5%', opacity: 0.15 }}
            />

            {/* Ambient Glows */}
            <div style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
            }} />
        </div>
    );
};

export default GeometricBackground;
