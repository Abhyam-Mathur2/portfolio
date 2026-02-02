"use client";

import { useEffect, useRef } from "react";

class Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  sway: number; // Amplitude of horizontal sway
  swaySpeed: number;
  time: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height - height; // Start above screen
    this.size = Math.random() * 5 + 5;
    this.speedX = 0;
    this.speedY = Math.random() * 1 + 0.5;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 2;
    this.color = `rgba(255, 183, 197, ${Math.random() * 0.5 + 0.3})`; // Sakura pink
    this.sway = Math.random() * 2;
    this.swaySpeed = Math.random() * 0.02 + 0.01;
    this.time = Math.random() * 100;
  }

  update(width: number, height: number) {
    this.time += this.swaySpeed;
    this.speedX = Math.sin(this.time) * this.sway;
    
    this.x += this.speedX + 0.5; // Slight wind to right
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    // Reset if out of bounds
    if (this.y > height + 20 || this.x > width + 20) {
      this.y = -20;
      this.x = Math.random() * width;
      this.time = Math.random() * 100;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    
    // Draw petal shape (oval-ish with a pinch)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
    ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
    ctx.fill();
    
    ctx.restore();
  }
}

export default function SakuraRain() {
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

    const petals: Petal[] = [];

    const init = () => {
      petals.length = 0;
      const petalCount = Math.floor(width * 0.05); // Density based on width
      for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal(width, height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((petal) => {
        petal.update(width, height);
        petal.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    window.addEventListener("resize", handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 mix-blend-screen"
    />
  );
}
