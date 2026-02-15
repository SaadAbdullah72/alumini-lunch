import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Users, Camera, Gift } from 'lucide-react';

const highlights = [
    {
        icon: <Users size={24} />,
        title: "Networking",
        description: "Connect with accomplished alumni and forge lasting bonds."
    },
    {
        icon: <Utensils size={24} />,
        title: "Gourmet Lunch",
        description: "A premium 5-course dining experience by top chefs."
    },
    {
        icon: <Camera size={24} />,
        title: "Photo Booth",
        description: "Professional studio photography to capture the moment."
    },
    {
        icon: <Gift size={24} />,
        title: "Exclusive Souvenirs",
        description: "Limited-edition alumni merchandise and surprise gifts."
    }
];

const EventHighlights = () => {
    return (
        <section style={{ padding: '80px 20px', position: 'relative' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '50px' }}
                >
                    <h2 className="shimmer-text" style={{
                        fontSize: '2.2rem',
                        fontWeight: '700',
                        letterSpacing: '-0.5px',
                        marginBottom: '0.8rem',
                    }}>
                        What to Expect
                    </h2>
                    <p style={{
                        color: '#64748b',
                        fontSize: '1rem',
                        margin: 0,
                    }}>
                        A curated experience designed for connection and celebration.
                    </p>
                </motion.div>

                {/* Cards — clean 2x2 grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                }}>
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="expect-card"
                            style={{
                                padding: '28px',
                                borderRadius: '14px',
                                background: 'rgba(255, 255, 255, 0.025)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '18px',
                                cursor: 'default',
                                transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                minWidth: '46px',
                                height: '46px',
                                borderRadius: '12px',
                                background: 'rgba(6, 182, 212, 0.08)',
                                border: '1px solid rgba(6, 182, 212, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#06b6d4',
                                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                            }} className="expect-icon">
                                {item.icon}
                            </div>

                            {/* Text */}
                            <div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: '#e2e8f0',
                                    margin: '0 0 6px 0',
                                    fontFamily: 'Inter, sans-serif',
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    color: '#64748b',
                                    fontSize: '0.88rem',
                                    lineHeight: '1.6',
                                    margin: 0,
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .expect-card:hover {
                    background: rgba(6, 182, 212, 0.03) !important;
                    border-color: rgba(6, 182, 212, 0.2) !important;
                    box-shadow: 0 8px 30px -10px rgba(0, 0, 0, 0.3);
                }
                .expect-card:hover .expect-icon {
                    background: rgba(6, 182, 212, 0.15) !important;
                    box-shadow: 0 0 15px rgba(6, 182, 212, 0.15);
                }

                @media (max-width: 600px) {
                    .expect-card {
                        flex-direction: column;
                        align-items: center !important;
                        text-align: center;
                    }
                }
            `}</style>
        </section>
    );
};

export default EventHighlights;
