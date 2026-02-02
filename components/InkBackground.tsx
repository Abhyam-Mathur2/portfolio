"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  vx: number;
  vy: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 20 + 10;
    this.maxLife = Math.random() * 50 + 50;
    this.life = this.maxLife;
    // Random reddish/black ink colors
    const isRed = Math.random() > 0.8;
    this.color = isRed 
      ? `hsla(345, 100%, 30%, ${Math.random() * 0.5 + 0.1})` 
      : `hsla(0, 0%, 5%, ${Math.random() * 0.2 + 0.05})`;
    
    this.vx = (Math.random() - 0.5) * 1;
    this.vy = (Math.random() - 0.5) * 1;
  }

  update() {
    this.life--;
    this.x += this.vx;
    this.y += this.vy;
    this.size += 0.2; // Expand like diffusing ink
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function InkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Add multiple particles per move for density
      for(let i=0; i<3; i++) {
        particles.push(new Particle(mouse.x + (Math.random()-0.5)*20, mouse.y + (Math.random()-0.5)*20));
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-multiply opacity-80"
      style={{ filter: "blur(8px)" }} // Blur makes it look like liquid/smoke
    />
  );
}
