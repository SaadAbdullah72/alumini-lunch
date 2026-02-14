import React from 'react';
import { useAdmin } from '../context/AdminContext';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import VideoSection from '../components/VideoSection';
import WhyAttend from '../components/WhyAttend';
import Registration from '../components/Registration';
import RevealSection from '../components/RevealSection';
import { motion } from 'framer-motion';

const Home = () => {
    const { settings } = useAdmin();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Hero title={settings.eventTitle} />

            <RevealSection delay={0.1}>
                <Countdown targetDate={settings.eventDate} />
            </RevealSection>

            <RevealSection delay={0.2}>
                <VideoSection videoUrl={settings.videoUrl} rotation={settings.videoRotation} />
            </RevealSection>

            <RevealSection delay={0.3}>
                <WhyAttend />
            </RevealSection>

            <RevealSection delay={0.4}>
                <Registration link={settings.registrationLink} />
            </RevealSection>

            <RevealSection delay={0.5}>
                <footer style={{
                    textAlign: 'center',
                    padding: '40px',
                    marginTop: '80px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.5), transparent)'
                    }} />

                    <p style={{
                        color: '#94a3b8',
                        fontSize: '0.9rem',
                        letterSpacing: '1px',
                        marginBottom: '10px'
                    }}>
                        &copy; 2026 Alumni Association
                    </p>

                    <p style={{
                        background: 'linear-gradient(to right, #cbd5e1, #fff, #cbd5e1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1rem',
                        fontWeight: '500',
                        letterSpacing: '0.5px'
                    }}>
                        Developed by <span style={{ fontWeight: '700', color: '#f59e0b', WebkitTextFillColor: '#f59e0b' }}>SAAD ABDULLAH</span> (23-SE-30)
                    </p>
                </footer>
            </RevealSection>
        </motion.div>
    );
};

export default Home;
