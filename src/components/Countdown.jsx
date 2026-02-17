import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const tl = calculateTimeLeft();
            setTimeLeft(tl);
            if (Object.keys(tl).length === 0) {
                setIsLive(true);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    if (isLive) {
        return (
            <section style={{ padding: '80px 20px', textAlign: 'center' }}>
                <motion.h2
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                        fontSize: '3rem',
                        color: 'var(--accent-color)',
                        textShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
                    }}
                >
                    We Are Live 🎉
                </motion.h2>
            </section>
        );
    }

    return (
        <section style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
            <div className="container" style={{
                display: 'flex',
                gap: '24px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                perspective: '1000px'
            }}>
                {timeUnits.map((unit, index) => (
                    <TiltCard
                        key={unit.label}
                        className="glass-panel"
                        style={{
                            padding: '40px 20px',
                            minWidth: '150px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '24px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        {/* Glow effect */}
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: `radial-gradient(circle at center, var(--accent-color) 0%, transparent 70%)`,
                            opacity: 0.05,
                            pointerEvents: 'none'
                        }} />

                        <div style={{
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            width: '100%'
                        }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={unit.value}
                                    initial={{ y: 40, opacity: 0, scale: 0.8 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: -40, opacity: 0, scale: 0.8 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                        duration: 0.4
                                    }}
                                    style={{
                                        fontSize: '4.5rem',
                                        fontWeight: '800',
                                        fontFamily: 'var(--font-heading)',
                                        lineHeight: 1,
                                        color: 'white',
                                        textShadow: '0 0 30px rgba(245, 158, 11, 0.4)',
                                        display: 'block'
                                    }}
                                >
                                    {String(unit.value || '0').padStart(2, '0')}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <span style={{
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            letterSpacing: '3px',
                            marginTop: '15px',
                            color: 'var(--accent-color)',
                            opacity: 0.8,
                            background: 'linear-gradient(to right, #94a3b8, #fff, #94a3b8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundSize: '200% auto',
                            animation: 'shine 3s linear infinite',
                        }}>
                            {unit.label}
                        </span>
                    </TiltCard>
                ))}
            </div>
        </section>
    );
};


export default Countdown;
