import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid var(--accent-color)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    translateX: '-50%',
                    translateY: '-50%',
                    mixBlendMode: 'difference'
                }}
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    scale: isHovering ? 2.5 : 1,
                    backgroundColor: isHovering ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-color)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 50 }}
            />
        </>
    );
};

export default CustomCursor;
