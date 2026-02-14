import React from 'react';
import { motion } from 'framer-motion';
import { Network, Briefcase, GraduationCap, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        className="glass-panel"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5, background: 'rgba(255, 255, 255, 0.08)' }}
        style={{
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
    >
        <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(239, 68, 68, 0.2) 100%)',
            padding: '15px',
            borderRadius: '50%',
            marginBottom: '20px',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)'
        }}>
            <Icon size={32} color="#f59e0b" />
        </div>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', fontWeight: '600' }}>{title}</h3>
        <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '1rem' }}>{description}</p>
    </motion.div>
);

const WhyAttend = () => {
    return (
        <section style={{ padding: '80px 20px' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h2 className="gradient-heading" style={{ fontSize: '3rem', marginBottom: '20px' }}>
                        Why You Should Be Here
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto' }}>
                        Join the legacy of UET Taxila's Software Department. Connect with industry leaders and shape your future.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '30px'
                }}>
                    <FeatureCard
                        icon={Network}
                        title="Powerful Networking"
                        description="Connect with a vast network of successful alumni working in top-tier global tech giants. Your next big opportunity could be one conversation away."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={Briefcase}
                        title="Career Acceleration"
                        description="Gain mentorship, referrals, and insider insights. Attending this memorable gathering can be the catalyst that benefits your whole career trajectory."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={GraduationCap}
                        title="Legacy of Excellence"
                        description="UET Taxila's Software Department has produced industry pioneers. Be part of this prestigious lineage and celebrate our shared success."
                        delay={0.3}
                    />

                </div>
            </div>
        </section>
    );
};

export default WhyAttend;
