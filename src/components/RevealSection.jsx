import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const RevealSection = ({ children, width = "100%", delay = 0.2 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 75 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
            transition={{ duration: 0.8, delay: delay, ease: [0.17, 0.55, 0.55, 1] }}
            style={{ width, position: 'relative' }}
        >
            {children}
        </motion.div>
    );
};

export default RevealSection;
