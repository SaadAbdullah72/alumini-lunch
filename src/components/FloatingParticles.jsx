import React from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
    // Generate random particles
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
    }));

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
            pointerEvents: 'none'
        }}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
                    animate={{
                        y: [`${p.y}vh`, `${p.y - 20}vh`, `${p.y}vh`],
                        x: [`${p.x}vw`, `${p.x + 10}vw`, `${p.x}vw`],
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        borderRadius: '50%',
                        background: 'var(--accent-color)',
                        boxShadow: `0 0 ${p.size * 2}px var(--accent-color)`
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
