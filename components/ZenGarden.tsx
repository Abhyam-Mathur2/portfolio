"use client";

import { useEffect, useRef } from "react";

export default function ZenGarden() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let mouse = { x: 0, y: 0 };
        let targetMouse = { x: 0, y: 0 };

        // Sand particles or lines
        const lines: { y: number; offset: number }[] = [];
        const gap = 15;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            lines.length = 0;
            for (let y = 0; y < canvas.height; y += gap) {
                lines.push({ y, offset: 0 });
            }
        };

        window.addEventListener("resize", resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            targetMouse.x = e.clientX - rect.left;
            targetMouse.y = e.clientY - rect.top;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const draw = () => {
            // Smooth mouse movement
            mouse.x += (targetMouse.x - mouse.x) * 0.1;
            mouse.y += (targetMouse.y - mouse.y) * 0.1;

            ctx.fillStyle = "#0a0a0a"; // Match background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.strokeStyle = "rgba(100, 100, 100, 0.3)"; // Much more visible grey
            ctx.lineWidth = 2; // Slightly thicker

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];

                // Calculate distortion based on mouse distance
                // const dx = mouse.x - canvas.width / 2; // Center based distortion? No, local.

                ctx.moveTo(0, line.y);

                // Draw line with curve segments
                for (let x = 0; x < canvas.width; x += 30) {
                    const dist = Math.hypot(x - mouse.x, line.y - mouse.y);
                    // const maxDist = 200;
                    let offsetY = 0;

                    // if (dist < maxDist) {
                    //     const influence = (1 - dist / maxDist);
                    //     offsetY = influence * 20 * Math.sin(dist * 0.1 - Date.now() * 0.002);
                    // }

                    // Simple smooth curve
                    // Actually, simpler: just bend lines away from mouse
                    // Like parting the sand

                    if (dist < 150) {
                        const push = (1 - dist / 150) * 40; // Stronger push
                        if (line.y < mouse.y) offsetY = -push;
                        else offsetY = push;
                    }

                    ctx.lineTo(x, line.y + offsetY);
                }
            }
            ctx.stroke();

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-50 pointer-events-none" // Increased opacity
        />
    );
}
