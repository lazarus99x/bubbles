import React, { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

const FloatingBubbles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create more bubbles with higher opacity
    const bubbles: Bubble[] = [];
    const bubbleColors = ["#FF6B9D", "#1A1F2C", "#FFFFFF"];

    // Increase number of bubbles from 40 to 60
    for (let i = 0; i < 60; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 10,
        speed: Math.random() * 1.17 + 0.13,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        // Increased opacity range from (0.1-0.4) to (0.2-0.6)
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with partial transparency to create trail effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update bubbles
      bubbles.forEach((bubble) => {
        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle =
          bubble.color +
          Math.floor(bubble.opacity * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        // Move bubble
        bubble.y -= bubble.speed;

        // Reset bubble if it goes off screen
        if (bubble.y < -bubble.size) {
          bubble.y = canvas.height + bubble.size;
          bubble.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      // Increased opacity from 0.6 to 0.85
      style={{ opacity: 0.85 }}
    />
  );
};

export default FloatingBubbles;
