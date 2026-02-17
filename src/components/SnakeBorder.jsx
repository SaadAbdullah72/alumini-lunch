import React from 'react';
import '../styles/SnakeBorder.css';

const SnakeBorder = () => {
    return (
        <div className="snake-border-container">
            <svg width="100%" height="100%" preserveAspectRatio="none">
                <rect
                    x="2"
                    y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    fill="none"
                    stroke="var(--accent-color)"
                    strokeWidth="4"
                    className="snake-rect"
                />
            </svg>
        </div>
    );
};


export default SnakeBorder;
