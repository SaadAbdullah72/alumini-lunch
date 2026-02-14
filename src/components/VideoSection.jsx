
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const VideoSection = ({ videoUrl, rotation = 0 }) => {
    // Helper to Convert Links to Embeds
    const getEmbedUrl = (url) => {
        if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ?mute=1&autoplay=1";

        // Handle Instagram Reels/Posts
        if (url.includes('instagram.com')) {
            // Remove query params and trailing slash, add /embed
            const cleanUrl = url.split('?')[0].replace(/\/$/, "");
            if (!cleanUrl.endsWith('/embed')) {
                return `${cleanUrl}/embed`;
            }
            return cleanUrl;
        }

        // Handle YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            if (url.includes('watch?v=')) {
                const videoId = url.split('v=')[1]?.split('&')[0];
                return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
            }
            if (url.includes('youtu.be/')) {
                const videoId = url.split('youtu.be/')[1]?.split('?')[0];
                return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
            }
        }

        return url;
    };

    const finalUrl = getEmbedUrl(videoUrl);

    // Auto-scale logic: If rotated 90 or 270, scale up to cover the 16:9 container
    // Scale factor 1.78 covers the gaps caused by 90deg rotation in a 16:9 box
    const isVertical = rotation % 180 !== 0;
    const scale = isVertical ? 1.78 : 1;

    // Custom Controls State
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            const val = (video.currentTime / video.duration) * 100;
            setProgress(val);
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, []);

    const isNativeVideo = videoUrl && videoUrl.startsWith('data:');

    return (
        <section style={{ padding: '60px 20px', background: 'rgba(0,0,0,0.2)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="gradient-heading"
                    style={{ fontSize: '2.5rem', marginBottom: '40px' }}
                >
                    Last Alumni Lunch Highlights
                </motion.h2>

                <motion.div
                    className="glass-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        maxWidth: '700px', // Reduced size
                        margin: '0 auto',
                        padding: '0', // Removed padding for sleeker look
                        overflow: 'hidden',
                        borderRadius: '16px',
                        position: 'relative'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                        {isNativeVideo ? (
                            <>
                                <video
                                    ref={videoRef}
                                    src={videoUrl}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    onClick={togglePlay}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                        objectFit: 'cover',
                                        transform: `rotate(${rotation}deg) scale(${scale})`,
                                        transition: 'transform 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                />
                                {/* Custom Overlay Controls */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)',
                                                pointerEvents: 'none', // Allow clicks to pass through to video for toggle
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-end',
                                                padding: '20px'
                                            }}
                                        >
                                            {/* Center Play Button */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                pointerEvents: 'auto',
                                                cursor: 'pointer'
                                            }} onClick={togglePlay}>
                                                <div style={{
                                                    background: 'rgba(255, 255, 255, 0.2)',
                                                    backdropFilter: 'blur(4px)',
                                                    borderRadius: '50%',
                                                    padding: '20px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" />}
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${progress}%`,
                                                    height: '100%',
                                                    background: '#f59e0b',
                                                    transition: 'width 0.1s linear'
                                                }} />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : (
                            <iframe
                                src={finalUrl}
                                title="Alumni Lunch Highlights"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                    transform: `rotate(${rotation}deg) scale(${scale})`,
                                    transition: 'transform 0.3s ease'
                                }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoSection;
