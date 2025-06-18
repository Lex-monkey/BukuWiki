import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50; // 降低粒子数量
    
    // 设置画布尺寸为窗口大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // 创建粒子
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = `rgba(var(--ifm-color-primary-rgb), ${Math.random() * 0.7 + 0.3})`;
        this.alphaSpeed = Math.random() * 0.02 + 0.005; // 添加透明度变化速度
        this.maxAlpha = Math.random() * 0.5 + 0.5;
      }
      
      update() {
        this.x += Math.sin(Date.now() * 0.001 * (this.speedX + 0.5)) * 0.5; // 添加正弦波运动
        this.y += Math.cos(Date.now() * 0.001 * (this.speedY + 0.5)) * 0.5;
        
        // 添加颜色渐变效果
        this.alpha = (Math.sin(Date.now() * this.alphaSpeed) + 1) * this.maxAlpha / 2;
      }
    }
    
    // 初始化粒子
    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    // 在动画循环添加硬件加速优化
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // 添加will-change优化
        if (i === 0) {
          canvas.style.willChange = 'transform';
        }
      }
      
      // 粒子连线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            // 调整连线颜色为亮青色
            ctx.strokeStyle = `rgba(30, 230, 182, ${0.1 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    initParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  // 移除CSS模块引用，使用全局类名并调整z-index
  return <canvas ref={canvasRef} className="particle-canvas" style={{ zIndex: -1 }} />;
};

export default ParticleBackground;