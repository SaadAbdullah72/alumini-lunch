import React, { useEffect, useRef } from 'react';

const NetworkBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const handleMouseMove = (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        }

        class Particle {
            constructor(x, y, opacity = Math.random() * 0.5 + 0.1) {
                this.x = x;
                this.y = y;
                this.directionX = (Math.random() - 0.5) * 0.4; // Slow speed
                this.directionY = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 2 + 1;
                this.opacity = opacity;
                this.baseX = x; // Remember original for drift
                this.baseY = y;
            }

            update() {
                // Mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        // Repel
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = forceDirectionX * force * 3;
                        const directionY = forceDirectionY * force * 3;
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        // Return to base slight drift
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 100;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 100;
                        }
                    }
                }

                // Normal movement
                this.x += this.directionX;
                this.y += this.directionY;

                // Boundary check
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

                this.draw();
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`; // Accent color
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            // More particles for denser network
            const numberOfParticles = (canvas.width * canvas.height) / 8000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                particles.push(new Particle(x, y));
            }
        };

        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        let opacityValue = 1 - (distance / 20000);
                        if (opacityValue < 0) opacityValue = 0;
                        ctx.strokeStyle = `rgba(245, 158, 11, ${opacityValue * 0.3})`; // Line color
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        handleResize(); // Init
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed', // Fixed to cover whole page or absolute for section
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0, // Behind content
                background: 'transparent', // Let CSS gradients show through
                pointerEvents: 'none' // Allow clicking through
            }}
        />
    );
};

export default NetworkBackground;
