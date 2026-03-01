import React from 'react';
import { motion } from 'framer-motion';

const RuleBook = () => {
    return (
        <section style={{
            padding: '100px 20px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '900px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h2 className="shimmer-text" style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '800',
                        letterSpacing: '-1px',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                    }}>
                        Official Rulebook
                    </h2>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        marginBottom: '1.5rem',
                    }}>
                        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, #06b6d4)' }} />
                        <div style={{
                            width: '6px', height: '6px',
                            borderRadius: '50%',
                            background: '#06b6d4',
                            boxShadow: '0 0 10px #06b6d4',
                        }} />
                        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, #06b6d4)' }} />
                    </div>

                    <p style={{
                        color: '#94a3b8',
                        fontSize: '1.1rem',
                        maxWidth: '500px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                    }}>
                        Please review the guidelines before attending the lunch.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        padding: '8px',
                        borderRadius: '24px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(6, 182, 212, 0.1)',
                        position: 'relative'
                    }}
                >
                    {/* Top action bar */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: '10px 15px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        marginBottom: '10px'
                    }}>
                        <a
                            href="/gallery/rulebook.pdf"
                            download="Alumni-Lunch-Rulebook.pdf"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: '#06b6d4',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 16px',
                                borderRadius: '100px',
                                background: 'rgba(6, 182, 212, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.2)';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                                e.currentTarget.style.color = '#06b6d4';
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download PDF
                        </a>
                    </div>

                    <div style={{
                        width: '100%',
                        height: '70vh',
                        minHeight: '500px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <iframe
                            src="/gallery/rulebook.pdf#toolbar=0&navpanes=0&scrollbar=0"
                            title="Rulebook PDF"
                            width="100%"
                            height="100%"
                            style={{
                                border: 'none',
                                background: '#f8fafc' // Slightly light background for PDF contrast
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default RuleBook;
