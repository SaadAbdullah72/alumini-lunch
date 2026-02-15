import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const RevealSection = ({ children, width = "100%", delay = 0.2 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.0, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width, position: 'relative' }}
        >
            {children}
        </motion.div>
    );
};

export default RevealSection;
