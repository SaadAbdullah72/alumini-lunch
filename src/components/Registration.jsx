import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Registration = ({ link }) => {
    return (
        <section style={{ padding: '100px 20px', textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="gradient-heading" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    Ready to Reconnect?
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '40px' }}>
                    Secure your spot for the most anticipated alumni event of the year.
                </p>

                <motion.div
                    initial={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ display: 'inline-block' }}
                >
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            textDecoration: 'none',
                            fontSize: '1.2rem',
                            padding: '16px 32px',
                            boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
                        }}
                    >
                        Register Now <ArrowRight size={20} />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Registration;
