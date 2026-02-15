import React from 'react';
import { useAdmin } from '../context/AdminContext';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import VideoSection from '../components/VideoSection';
import WhyAttend from '../components/WhyAttend';
import Registration from '../components/Registration';
import RevealSection from '../components/RevealSection';
import EventHighlights from '../components/EventHighlights';
import MemoryGallery from '../components/MemoryGallery';
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

            <MemoryGallery />

            <RevealSection delay={0.3}>
                <WhyAttend />
            </RevealSection>

            <RevealSection delay={0.4}>
                <EventHighlights />
            </RevealSection>

            <RevealSection delay={0.5}>
                <footer style={{
                    textAlign: 'center',
                    padding: '50px 20px 35px',
                    marginTop: '60px',
                    position: 'relative',
                }}>
                    {/* Top gradient line */}
                    <div style={{
                        width: '180px',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)',
                        margin: '0 auto 30px auto',
                    }} />

                    {/* "Crafted by" label */}
                    <p style={{
                        color: '#64748b',
                        fontSize: '0.75rem',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        marginBottom: '18px',
                        fontWeight: '500',
                    }}>
                        Crafted with ♥ by
                    </p>

                    {/* Credits row */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        flexWrap: 'wrap',
                        marginBottom: '28px',
                    }}>
                        <span style={{
                            color: '#22d3ee',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            textShadow: '0 0 15px rgba(6, 182, 212, 0.4)',
                        }}>
                            Saad Abdullah
                        </span>

                        <span style={{ color: '#06b6d4', fontSize: '0.6rem', opacity: 0.5 }}>✦</span>

                        <span style={{
                            color: '#22d3ee',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            textShadow: '0 0 15px rgba(6, 182, 212, 0.4)',
                        }}>
                            Samia Zia
                        </span>

                        <span style={{ color: '#06b6d4', fontSize: '0.6rem', opacity: 0.5 }}>✦</span>

                        <span style={{
                            color: '#22d3ee',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            textShadow: '0 0 15px rgba(6, 182, 212, 0.4)',
                        }}>
                            Ayesha Zia
                        </span>
                    </div>

                    <p style={{
                        color: '#475569',
                        fontSize: '0.72rem',
                        letterSpacing: '1px',
                        margin: 0,
                    }}>
                        &copy; 2026 Alumni Association
                    </p>
                </footer>
            </RevealSection>
        </motion.div>
    );
};

export default Home;
