import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
            <div className="container" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {timeUnits.map((unit, index) => (
                    <TiltCard
                        key={unit.label}
                        className="glass-panel"
                        style={{
                            padding: '30px',
                            minWidth: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                fontSize: '3.5rem',
                                fontWeight: '700',
                                fontFamily: 'var(--font-heading)',
                                lineHeight: 1
                            }}
                        >
                            {unit.value || '0'}
                        </motion.span>
                        <span style={{
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            letterSpacing: '2px',
                            marginTop: '10px',
                            opacity: 0.7
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
