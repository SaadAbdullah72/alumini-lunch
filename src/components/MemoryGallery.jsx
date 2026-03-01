import React from 'react';
import { motion } from 'framer-motion';

const galleryItems = [
    { src: "/gallery/1.jpg.jpg", height: '320px' },
    { src: "/gallery/2.jpg.jpg", height: '260px' },
    { src: "/gallery/3.jpg.jpg", height: '350px' },
    { src: "/gallery/4.jpg.jpg", height: '290px' },
    { src: "/gallery/5.jpg.jpg", height: '340px' },
    { src: "/gallery/6.jpg.jpg", height: '280px' },
    { src: "/gallery/7.jpg.jpg", height: '310px' },
    { src: "/gallery/8.jpg.jpg", height: '270px' },
    { src: "/gallery/9.jpg.jpeg", height: '330px' },
    { src: "/gallery/10.jpg.jpeg", height: '275px' },
    { src: "/gallery/11.jpg.jpeg", height: '345px' },
    { src: "/gallery/12.jpg.jpeg", height: '265px' },
    { src: "/gallery/13.jpg.jpeg", height: '420px', objectPosition: 'top' },
    { src: "/gallery/14.jpg.jpeg", height: '335px' },
    { src: "/gallery/18.jpg.jpeg", height: '420px', objectPosition: 'top' },
    { src: "/gallery/19.jpg.jpeg", height: 'auto' },
    { src: "/gallery/20.jpg.jpeg", height: '420px', objectPosition: 'top' },
    { src: "/gallery/22.jpg.jpeg", height: '420px', objectPosition: 'top' },
    { src: "/gallery/23.jpg.jpeg", height: '420px', objectPosition: 'top' },
    { src: "/gallery/24.jpg.jpeg", height: '420px', objectPosition: 'top' },
    { src: "/gallery/25.jpg.jpeg", height: '420px', objectPosition: 'top' },
    { src: "/gallery/26.jpg.jpeg", height: '420px', objectPosition: 'top' },
    { src: "/gallery/27.jpg.jpeg", height: 'auto' }
];

const MemoryCard = ({ src, index, height, objectPosition = 'center', objectFit = 'cover' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -8 }}
            className="memory-card"
            style={{
                position: 'relative',
                width: '100%',
                height: height,
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '2px solid rgba(6, 182, 212, 0.6)',
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.4), 0 0 35px rgba(6, 182, 212, 0.2), 0 0 60px rgba(6, 182, 212, 0.1), inset 0 0 20px rgba(6, 182, 212, 0.08)',
                animation: 'glowPulse 3s ease-in-out infinite',
                animationDelay: `${index * 0.3}s`,
            }}
        >
            <img
                src={src}
                alt={`Memory ${index + 1}`}
                loading="lazy"
                className="memory-card-img"
                style={{
                    width: '100%',
                    height: height === 'auto' ? 'auto' : '100%',
                    objectFit: height === 'auto' ? 'contain' : objectFit,
                    objectPosition: objectPosition,
                    display: 'block',
                    transition: 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), filter 0.5s ease',
                    filter: 'brightness(0.85)',
                }}
            />

            {/* Top-left ambient light reflection */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(160deg, rgba(6,182,212,0.08) 0%, transparent 50%)',
                pointerEvents: 'none',
            }} />

            {/* Bottom hover overlay */}
            <div className="memory-card-overlay" style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 35%, transparent 60%)',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '18px',
                pointerEvents: 'none',
            }}>
                <div className="memory-card-line" style={{
                    width: '25px',
                    height: '2px',
                    background: '#06b6d4',
                    marginBottom: '8px',
                    transition: 'width 0.5s ease',
                    boxShadow: '0 0 6px #06b6d4',
                }} />
                <p style={{
                    color: '#e0f2fe',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    margin: 0,
                    transform: 'translateY(6px)',
                    transition: 'transform 0.4s ease',
                }} className="memory-card-label">
                    Alumni 2026
                </p>
            </div>
        </motion.div>
    );
};

const MemoryGallery = () => {
    return (
        <section style={{
            padding: '100px 0',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <h2 className="shimmer-text" style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '800',
                        letterSpacing: '-1px',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                    }}>
                        Moments that Matter
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
                        A glimpse into the laughter and legacy of last year.
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="memory-gallery-grid">
                    {galleryItems.map((item, i) => (
                        <MemoryCard key={i} src={item.src} index={i} height={item.height} objectPosition={item.objectPosition} objectFit={item.objectFit} />
                    ))}
                </div>
            </div>

            <style>{`
                .memory-gallery-grid {
                    columns: 4;
                    column-gap: 16px;
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .memory-gallery-grid > * {
                    break-inside: avoid;
                    margin-bottom: 16px;
                }
                @media (max-width: 1024px) {
                    .memory-gallery-grid { columns: 3; }
                }
                @media (max-width: 768px) {
                    .memory-gallery-grid { columns: 2; column-gap: 12px; }
                    .memory-gallery-grid > * { margin-bottom: 12px; }
                }
                @media (max-width: 480px) {
                    .memory-gallery-grid { columns: 1; }
                }

                /* Glow Pulse: subtle breathing shine on the border */
                @keyframes glowPulse {
                    0%, 100% {
                        box-shadow: 
                            0 0 15px rgba(6, 182, 212, 0.4),
                            0 0 35px rgba(6, 182, 212, 0.2),
                            0 0 60px rgba(6, 182, 212, 0.1),
                            inset 0 0 20px rgba(6, 182, 212, 0.08);
                        border-color: rgba(6, 182, 212, 0.6);
                    }
                    50% {
                        box-shadow: 
                            0 0 20px rgba(6, 182, 212, 0.6),
                            0 0 50px rgba(6, 182, 212, 0.35),
                            0 0 80px rgba(6, 182, 212, 0.15),
                            inset 0 0 30px rgba(6, 182, 212, 0.12);
                        border-color: rgba(6, 182, 212, 0.85);
                    }
                }

                /* Hover: Intensify glow */
                .memory-card:hover {
                    border-color: rgba(6, 182, 212, 1) !important;
                    box-shadow: 
                        0 0 25px rgba(6, 182, 212, 0.7),
                        0 0 60px rgba(6, 182, 212, 0.4),
                        0 0 100px rgba(6, 182, 212, 0.15),
                        0 20px 50px -15px rgba(0, 0, 0, 0.5),
                        inset 0 0 30px rgba(6, 182, 212, 0.15) !important;
                    animation: none !important;
                }

                .memory-card:hover .memory-card-img {
                    transform: scale(1.08);
                    filter: brightness(1) !important;
                }

                .memory-card:hover .memory-card-overlay {
                    opacity: 1 !important;
                }

                .memory-card:hover .memory-card-label {
                    transform: translateY(0) !important;
                }

                .memory-card:hover .memory-card-line {
                    width: 45px !important;
                }
            `}</style>
        </section>
    );
};

export default MemoryGallery;
